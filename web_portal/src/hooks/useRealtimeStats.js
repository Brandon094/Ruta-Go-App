import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';

/**
 * 🛰️ Hook: useRealtimeStats
 *
 * Centraliza la lógica de sincronización con Firebase RTDB para obtener
 * métricas operativas en tiempo real.
 */
export const useRealtimeStats = (user) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDrivers: 0,
    totalVehicles: 0,
    todayReservations: 0,
    totalRevenue: 0, // Nueva métrica de ingresos
    loading: true
  });

  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [routeStats, setRouteStats] = useState({
    toLaPlata: 0,
    toNataga: 0
  });

  useEffect(() => {
    if (!user) return;

    // 1. Usuarios Activos (Filtro Habeas Data)
    const usersRef = ref(db, 'usuarios');
    const unsubUsers = onValue(usersRef, (snapshot) => {
      let activeCount = 0;
      let usersList = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Mapeo ultra-robusto para soportar cualquier estructura (Objeto o Array)
        usersList = Object.entries(data)
          .filter(([id, val]) => val !== null) // Limpiamos nulos
          .map(([id, val]) => {
            const u = typeof val === 'object' ? val : {};
            return {
              id,
              nombre: u.nombre || u.name || `Usuario (${id.substring(0, 5)})`,
              email: u.email || 'Sin correo',
              telefono: u.telefono || u.phone || 'N/A',
              puntosGo: u.puntosGo || 0,
              solicitudBorrado: u.solicitudBorrado === true,
              ...u
            };
          });
        activeCount = usersList.filter(u => !u.solicitudBorrado).length;
      }
      setUsers(usersList);
      setStats(prev => ({ ...prev, totalUsers: activeCount, loading: false }));
    });

    // 2. Conductores y Flota
    const driversRef = ref(db, 'conductores');
    const unsubDrivers = onValue(driversRef, (snapshot) => {
      if (snapshot.exists()) {
        const list = Object.entries(snapshot.val()).map(([id, val]) => ({ id, ...val }));
        setDrivers(list);
        setStats(prev => ({ ...prev, activeDrivers: list.filter(d => d.status === 'active').length }));
      }
    });

    const vehiclesRef = ref(db, 'vehiculos');
    const unsubVehicles = onValue(vehiclesRef, (snapshot) => {
      setStats(prev => ({ ...prev, totalVehicles: snapshot.exists() ? Object.keys(snapshot.val()).length : 0 }));
    });

    // 3. Reservas y Demanda por Ruta
    const reservationsRef = ref(db, 'reservas');
    const unsubReservations = onValue(reservationsRef, (snapshot) => {
      let todayCount = 0, lpCount = 0, ntCount = 0, totalRevenue = 0;
      if (snapshot.exists()) {
        // Obtenemos la fecha actual en formato local (Colombia) para evitar errores de UTC
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISODate = new Date(now.getTime() - offset).toISOString().split('T')[0];

        Object.values(snapshot.val()).forEach(res => {
          // Cálculo de Ingresos Totales (Solo confirmadas/completadas)
          const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
          if (status === "confirmada" || status === "completada") {
            totalRevenue += Number(res.precio || res.price || 0);
          }

          // Intentamos capturar la fecha desde múltiples posibles nombres de campo (bilingüe)
          const rawDate = res.fechaViaje || res.travelDate || res.reservationDate || res.fechaReserva;
          let resDateString = null;

          if (typeof rawDate === 'number') {
            // Si es un timestamp, lo convertimos a YYYY-MM-DD local
            resDateString = new Date(rawDate - offset).toISOString().split('T')[0];
          } else if (typeof rawDate === 'string') {
            resDateString = rawDate; // Asumimos que ya viene en formato compatible
          }

          if (resDateString === localISODate) {
            todayCount++;
            // Clasificación por ruta (Mapeo dual: destino / destination)
            const destino = (res.destino || res.destination || "").toLowerCase();
            if (destino.includes("la plata")) lpCount++;
            else if (destino.includes("natagá") || destino.includes("nataga")) ntCount++;
          }
        });
      }
      setStats(prev => ({ ...prev, todayReservations: todayCount, totalRevenue: totalRevenue }));
      setRouteStats({ toLaPlata: lpCount, toNataga: ntCount });
    });

    // 4. Horarios y Disponibilidad (Cruce de Datos)
    const schedulesRef = ref(db, 'horarios');
    const seatsRef = ref(db, 'disponibilidadAsientos');

    const unsubSchedules = onValue(schedulesRef, (schedSnap) => {
      onValue(seatsRef, (seatsSnap) => {
        if (schedSnap.exists()) {
          const schedData = schedSnap.val();
          const seatsData = seatsSnap.exists() ? seatsSnap.val() : {};

          const combined = Object.entries(schedData).map(([id, val]) => {
            const seats = seatsData[id] || { asientosDisponibles: 0, totalAsientos: 0 };
            return {
              id,
              ...val,
              ...seats,
              // Calculamos porcentaje de ocupación
              occupancy: seats.totalAsientos > 0
                ? Math.round(((seats.totalSeats || seats.totalAsientos - (seats.asientosDisponibles || 0)) / (seats.totalSeats || seats.totalAsientos)) * 100)
                : 0
            };
          });
          setSchedules(combined);
        }
      }, { onlyOnce: true }); // Solo necesitamos los asientos una vez por cada cambio de horario para no crear bucles
    });

    return () => {
      unsubUsers();
      unsubDrivers();
      unsubVehicles();
      unsubReservations();
      unsubSchedules();
    };
  }, [user]);

  return { stats, drivers, users, schedules, routeStats };
};
