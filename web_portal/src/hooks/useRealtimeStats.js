import { useState, useEffect } from 'react';
import { ref, onValue, get } from "firebase/database";
import { db } from '../firebase';

/**
 * 🛰️ Hook: useRealtimeStats
 *
 * Centraliza la lógica de sincronización con Firebase RTDB con soporte para Roles (Admin/Owner).
 * El sistema identifica el rol mediante la presencia del UID en los nodos maestros.
 */
export const useRealtimeStats = (user) => {
  const [role, setRole] = useState({ type: null, ownedPlates: [] });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDrivers: 0,
    totalVehicles: 0,
    totalOwners: 0, // Nueva métrica para Admin
    todayReservations: 0,
    totalRevenue: 0,
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

    let isMounted = true;
    const unsubs = [];

    const initializePortal = async () => {
      try {
        // 1. Resolver Rol (Prioridad Admin -> Dueño)
        const adminSnap = await get(ref(db, `admins/${user.uid}`));
        if (adminSnap.exists() && adminSnap.val() === true) {
          if (isMounted) {
            setRole({ type: 'ADMIN', ownedPlates: [] });
            setupSync('ADMIN', []);
          }
          return;
        }

        const ownerSnap = await get(ref(db, `dueños/${user.uid}`));
        if (ownerSnap.exists()) {
          // Buscamos vehículos del dueño para tener las placas
          const vSnap = await get(ref(db, 'vehiculos'));
          let ownedPlates = [];
          if (vSnap.exists()) {
            ownedPlates = Object.entries(vSnap.val())
              .filter(([id, v]) => v.ownerId === user.uid)
              .map(([id, v]) => id);
          }

          if (isMounted) {
            setRole({ type: 'OWNER', ownedPlates });
            setupSync('OWNER', ownedPlates);
          }
        } else {
          if (isMounted) {
            setRole({ type: null, ownedPlates: [] });
            setStats(prev => ({ ...prev, loading: false }));
          }
        }
      } catch (err) {
        console.error("Error resolviendo rol:", err);
        if (isMounted) setStats(prev => ({ ...prev, loading: false }));
      }
    };

    const setupSync = (userType, ownedPlates) => {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const todayISO = new Date(now.getTime() - offset).toISOString().split('T')[0];

      // --- 👥 USUARIOS (Solo para el Jefe) ---
      if (userType === 'ADMIN') {
        const uSub = onValue(ref(db, 'usuarios'), (snap) => {
          if (snap.exists()) {
            const list = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
            setUsers(list);
            setStats(prev => ({ ...prev, totalUsers: list.filter(u => !u.solicitudBorrado).length }));
          }
        });
        unsubs.push(uSub);

        // --- 💼 DUEÑOS (Solo para el Jefe) ---
        const dOwnersSub = onValue(ref(db, 'dueños'), (snap) => {
          if (snap.exists()) {
            const count = Object.keys(snap.val()).length;
            setStats(prev => ({ ...prev, totalOwners: count }));
          }
        });
        unsubs.push(dOwnersSub);
      }

      // --- 🚗 VEHÍCULOS (Filtrado de Propiedad) ---
      const vSub = onValue(ref(db, 'vehiculos'), (snap) => {
        if (snap.exists()) {
          const all = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          const filtered = userType === 'ADMIN' ? all : all.filter(v => v.ownerId === user.uid);

          setStats(prev => ({ ...prev, totalVehicles: filtered.length }));

          // --- 👨‍✈️ CONDUCTORES (Puente por Placa) ---
          onValue(ref(db, 'conductores'), (dSnap) => {
            if (dSnap.exists()) {
              const allD = Object.entries(dSnap.val()).map(([id, val]) => ({ id, ...val }));
              const filteredD = userType === 'ADMIN' ? allD : allD.filter(d => ownedPlates.includes(d.placaVehiculo || d.vehiculoId));
              setDrivers(filteredD);
              setStats(prev => ({ ...prev, activeDrivers: filteredD.filter(d => d.status === 'active').length }));
            }
          }, { onlyOnce: true });
        }
      });
      unsubs.push(vSub);

      // --- 🎫 RESERVAS & FINANZAS ---
      const rSub = onValue(ref(db, 'reservas'), (snap) => {
        let tCount = 0, lpCount = 0, ntCount = 0, totalRev = 0;
        if (snap.exists()) {
          Object.values(snap.val()).forEach(res => {
            const resPlate = res.vehiculoId || res.vehiculoPlaca;
            const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);

            // Solo sumamos ingresos si le pertenece
            if (isOwned) {
              const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
              if (status === "confirmada" || status === "completada") totalRev += Number(res.precio || res.price || 0);
            }

            // Estadísticas de ruta de hoy (Cualquier ruta, el dueño ve demanda general)
            const rawDate = res.fechaViaje || res.travelDate || res.reservationDate || res.fechaReserva;
            let resDate = typeof rawDate === 'number' ? new Date(rawDate - offset).toISOString().split('T')[0] : rawDate;

            if (resDate === todayISO) {
              tCount++;
              const dest = (res.destino || res.destination || "").toLowerCase();
              if (dest.includes("la plata")) lpCount++;
              else if (dest.includes("nátaga") || dest.includes("nataga")) ntCount++;
            }
          });
          if (isMounted) {
            setStats(prev => ({ ...prev, todayReservations: tCount, totalRevenue: totalRev, loading: false }));
            setRouteStats({ toLaPlata: lpCount, toNataga: ntCount });
          }
        } else if (isMounted) {
          setStats(prev => ({ ...prev, loading: false }));
        }
      });
      unsubs.push(rSub);

      // --- 🕒 HORARIOS (Todos para el escalafón) ---
      const hSub = onValue(ref(db, 'horarios'), (snap) => {
        if (snap.exists()) {
          const list = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          setSchedules(list);
        }
      });
      unsubs.push(hSub);
    };

    initializePortal();

    return () => {
      isMounted = false;
      unsubs.forEach(unsub => unsub());
    };
  }, [user]);

  return { role, stats, drivers, users, schedules, routeStats };
};
