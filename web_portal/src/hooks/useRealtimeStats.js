import { useState, useEffect } from 'react';
import { ref, onValue, get } from "firebase/database";
import { db } from '../firebase';

/**
 * 🛰️ Hook: useRealtimeStats
 *
 * Centraliza la lógica de sincronización con Firebase RTDB con soporte para Roles (Admin/Owner/Driver/Passenger).
 */
export const useRealtimeStats = (user) => {
  const [role, setRole] = useState({ type: null, uid: null, ownedPlates: [] });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDrivers: 0,
    totalVehicles: 0,
    totalOwners: 0,
    todayReservations: 0,
    totalRevenue: 0,
    // Estadísticas específicas para Pasajeros
    confirmedReservations: 0,
    canceledReservations: 0,
    totalUserReservations: 0,
    loading: true
  });

  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [routeStats, setRouteStats] = useState({
    toLaPlata: { reservations: 0, seats: 0 },
    toNataga: { reservations: 0, seats: 0 }
  });

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const unsubs = [];

    const initializePortal = async () => {
      try {
        // 1. Resolver Admin
        const adminSnap = await get(ref(db, `admins/${user.uid}`));
        if (adminSnap.exists() && adminSnap.val() === true) {
          if (isMounted) {
            setRole({ type: 'ADMIN', uid: user.uid, ownedPlates: [] });
            setupSync('ADMIN', []);
          }
          return;
        }

        // 2. Resolver Dueño
        const ownerSnap = await get(ref(db, `dueños/${user.uid}`));
        if (ownerSnap.exists()) {
          const vSnap = await get(ref(db, 'vehiculos'));
          let ownedPlates = [];
          if (vSnap.exists()) {
            ownedPlates = Object.entries(vSnap.val())
              .filter(([id, v]) => v.ownerId === user.uid)
              .map(([id, v]) => id);
          }

          if (isMounted) {
            setRole({ type: 'OWNER', uid: user.uid, ownedPlates });
            setupSync('OWNER', ownedPlates);
          }
          return;
        }

        // 3. Resolver Conductor
        const driverSnap = await get(ref(db, `conductores/${user.uid}`));
        if (driverSnap.exists()) {
          if (isMounted) {
            const dData = driverSnap.val();
            const plate = dData.placaVehiculo || dData.vehiculoId;
            setRole({ type: 'DRIVER', uid: user.uid, ownedPlates: plate ? [plate] : [] });
            setupSync('DRIVER', plate ? [plate] : []);
          }
          return;
        }

        // 4. Resolver Pasajero
        const userSnap = await get(ref(db, `usuarios/${user.uid}`));
        if (userSnap.exists()) {
          if (isMounted) {
            setRole({ type: 'PASSENGER', uid: user.uid, ownedPlates: [] });
            setupSync('PASSENGER', []);
          }
        } else if (isMounted) {
          setRole({ type: null, uid: null, ownedPlates: [] });
          setStats(prev => ({ ...prev, loading: false }));
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

        const dOwnersSub = onValue(ref(db, 'dueños'), (snap) => {
          if (snap.exists()) {
            const count = Object.keys(snap.val()).length;
            setStats(prev => ({ ...prev, totalOwners: count }));
          }
        });
        unsubs.push(dOwnersSub);
      }

      // --- 👨‍✈️ CONDUCTORES ---
      const driversSub = onValue(ref(db, 'conductores'), (snap) => {
        if (snap.exists()) {
          const allD = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          const filteredD = userType === 'ADMIN'
            ? allD
            : userType === 'DRIVER'
              ? allD.filter(d => d.id === user.uid)
              : allD.filter(d => ownedPlates.includes(d.placaVehiculo || d.vehiculoId));

          setDrivers(filteredD);
          setStats(prev => ({ ...prev, activeDrivers: filteredD.filter(d => d.status === 'active').length }));
        }
      });
      unsubs.push(driversSub);

      // --- 🚗 VEHÍCULOS ---
      const vSub = onValue(ref(db, 'vehiculos'), (snap) => {
        if (snap.exists()) {
          const all = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          const filtered = userType === 'ADMIN' ? all : all.filter(v => v.ownerId === user.uid);
          setStats(prev => ({ ...prev, totalVehicles: filtered.length }));
        }
      });
      unsubs.push(vSub);

      // --- 🎫 RESERVAS & FINANZAS ---
      const rSub = onValue(ref(db, 'reservas'), (snap) => {
        let totalRev = 0;
        let confirmed = 0;
        let canceled = 0;
        let totalUserRes = 0;
        const resList = [];

        if (snap.exists()) {
          Object.entries(snap.val()).forEach(([id, res]) => {
            const resPlate = res.vehiculoId || res.vehiculoPlaca;
            const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);
            const isDriverMatch = userType === 'DRIVER' && (res.conductorId === user.uid);
            const isMyPassengerRes = userType === 'PASSENGER' && res.usuarioId === user.uid;

            if (isOwned || isDriverMatch || isMyPassengerRes) {
              resList.push({ id, ...res });
              const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();

              if (isOwned && (status === "confirmada" || status === "completada")) {
                totalRev += Number(res.precio || res.price || 0);
              }

              if (isMyPassengerRes) {
                totalUserRes++;
                if (status === "confirmada" || status === "completada") confirmed++;
                else if (status === "cancelada") canceled++;
              }
            }
          });

          if (isMounted) {
            setReservations(resList);
            setStats(prev => ({
              ...prev,
              totalRevenue: totalRev,
              confirmedReservations: confirmed,
              canceledReservations: canceled,
              totalUserReservations: totalUserRes,
              loading: false
            }));
          }
        } else if (isMounted) {
          setReservations([]);
          setStats(prev => ({ ...prev, loading: false }));
        }
      });
      unsubs.push(rSub);

      // --- 🕒 HORARIOS ---
      const hSub = onValue(ref(db, 'horarios'), (snap) => {
        if (snap.exists()) {
          const list = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          setSchedules(list);

          let lpRes = 0, lpSeats = 0;
          let ntRes = 0, ntSeats = 0;
          let totalResHoy = 0;

          list.forEach(s => {
            const ruta = s.ruta.toLowerCase();
            const total = s.totalAsientos || 0;
            const avail = s.asientosDisponibles || 0;
            const res = Math.max(0, total - avail);

            const isMine = userType === 'DRIVER' && s.conductorId === user.uid;

            if (ruta.includes("la plata")) {
              lpRes += res;
              lpSeats += avail;
            } else if (ruta.includes("nátaga") || ruta.includes("nataga")) {
              ntRes += res;
              ntSeats += avail;
            }

            if (userType === 'DRIVER') {
              if (isMine) totalResHoy += res;
            } else {
              totalResHoy += res;
            }
          });

          if (isMounted) {
            setRouteStats({
              toLaPlata: { reservations: lpRes, seats: lpSeats },
              toNataga: { reservations: ntRes, seats: ntSeats }
            });
            setStats(prev => ({ ...prev, todayReservations: totalResHoy }));
          }
        }
      });
      unsubs.push(hSub);
    };

    initializePortal();
    return () => { isMounted = false; unsubs.forEach(unsub => unsub()); };
  }, [user]);

  return { role, stats, drivers, users, schedules, reservations, routeStats };
};
