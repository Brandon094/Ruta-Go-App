import { useState, useEffect } from 'react';
import { onValue } from "firebase/database";
import firebaseManager from '../../firebase';

/**
 * 🛰️ Hook: useRealtimeData
 * Sincroniza todos los nodos de RTDB aplicando filtros por rol.
 * Centralizado a través de FirebaseManager (Singleton).
 */
export const useRealtimeData = (user, role) => {
  const [data, setData] = useState({
    users: [],
    drivers: [],
    owners: [],
    vehicles: [],
    schedules: [],
    reservations: [],
    prices: {},
    stats: {
      totalUsers: 0,
      activeDrivers: 0,
      totalVehicles: 0,
      totalOwners: 0,
      todayReservations: 0,
      totalRevenue: 0,
      confirmedReservations: 0,
      canceledReservations: 0,
      totalUserReservations: 0,
      loading: true
    },
    routeStats: {
      toLaPlata: { reservations: 0, seats: 0 },
      toNataga: { reservations: 0, seats: 0 }
    }
  });

  useEffect(() => {
    if (!user || role.loading) return;

    let isMounted = true;
    const unsubs = [];
    const userType = role.type;
    const ownedPlates = role.ownedPlates || [];

    // --- 👥 USUARIOS (ADMIN y DUEÑOS para búsqueda operativa) ---
    if (userType === 'ADMIN' || userType === 'OWNER') {
      const uSub = onValue(firebaseManager.getRef('usuarios'), (snap) => {
        if (snap.exists() && isMounted) {
          const list = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
          setData(prev => ({
            ...prev,
            users: list,
            stats: { ...prev.stats, totalUsers: list.filter(u => !u.solicitudBorrado).length }
          }));
        }
      });
      unsubs.push(uSub);

      const dOwnersSub = onValue(firebaseManager.getRef('dueños'), (snap) => {
        if (snap.exists() && isMounted) {
          const list = Object.entries(snap.val()).map(([id, status]) => ({ id, status }));
          setData(prev => ({
            ...prev,
            owners: list,
            stats: { ...prev.stats, totalOwners: list.length }
          }));
        }
      });
      unsubs.push(dOwnersSub);
    }

    // --- 👨‍✈️ CONDUCTORES ---
    const driversSub = onValue(firebaseManager.getRef('conductores'), (snap) => {
      if (snap.exists() && isMounted) {
        const allD = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
        const filteredD = userType === 'ADMIN'
          ? allD
          : userType === 'DRIVER'
            ? allD.filter(d => d.id === user.uid)
            : allD.filter(d => ownedPlates.includes(d.placaVehiculo || d.vehiculoId));

        setData(prev => ({
          ...prev,
          drivers: filteredD,
          stats: { ...prev.stats, activeDrivers: filteredD.filter(d => d.status === 'active').length }
        }));
      }
    });
    unsubs.push(driversSub);

    // --- 🚗 VEHÍCULOS ---
    const vSub = onValue(firebaseManager.getRef('vehiculos'), (snap) => {
      if (snap.exists() && isMounted) {
        const all = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
        const filtered = userType === 'ADMIN' ? all : all.filter(v => v.ownerId === user.uid);
        setData(prev => ({
          ...prev,
          vehicles: all,
          stats: { ...prev.stats, totalVehicles: filtered.length }
        }));
      }
    });
    unsubs.push(vSub);

    // --- 🎫 RESERVAS & FINANZAS ---
    const rSub = onValue(firebaseManager.getRef('reservas'), (snap) => {
      let totalRev = 0, confirmed = 0, canceled = 0, totalUserRes = 0;
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
      }

      if (isMounted) {
        setData(prev => ({
          ...prev,
          reservations: resList,
          stats: {
            ...prev.stats,
            totalRevenue: totalRev,
            confirmedReservations: confirmed,
            canceledReservations: canceled,
            totalUserReservations: totalUserRes,
            loading: false
          }
        }));
      }
    });
    unsubs.push(rSub);

    // --- 🕒 HORARIOS ---
    const hSub = onValue(firebaseManager.getRef('horarios'), (snap) => {
      if (snap.exists() && isMounted) {
        const list = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));

        setData(prev => {
          let lpRes = 0, lpSeats = 0, ntRes = 0, ntSeats = 0, totalResHoy = 0;

          list.forEach(s => {
            const ruta = s.ruta.toLowerCase();
            const driver = prev.drivers.find(d => d.id === s.conductorId);

            // Buscar capacidad real: Priorizar horario, fallback al vehículo del conductor
            const vId = s.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
            const vehicle = prev.vehicles.find(v => v.id === vId || v.placa === vId);
            const capacity = vehicle?.capacidad || 13;

            const dbTotal = s.totalAsientos || 0;
            const avail = (dbTotal > 0)
              ? (s.asientosDisponibles !== undefined ? s.asientosDisponibles : s.asientosLibres)
              : capacity;

            const total = dbTotal > 0 ? dbTotal : capacity;
            const resCount = Math.max(0, total - avail);

            const isMine = userType === 'DRIVER' && s.conductorId === user.uid;
            const isOwned = userType === 'ADMIN' || (userType === 'OWNER' && ownedPlates.includes(s.placaVehiculo || s.vehiculoId));

            if (isOwned || isMine) {
              if (ruta.includes("la plata")) { lpRes += resCount; lpSeats += avail; }
              else if (ruta.includes("nátaga") || ruta.includes("nataga")) { ntRes += resCount; ntSeats += avail; }
              totalResHoy += resCount;
            }
          });

          return {
            ...prev,
            schedules: list,
            routeStats: {
              toLaPlata: { reservations: lpRes, seats: lpSeats },
              toNataga: { reservations: ntRes, seats: ntSeats }
            },
            stats: { ...prev.stats, todayReservations: totalResHoy }
          };
        });
      }
    });
    unsubs.push(hSub);

    // --- 💰 PRECIOS ---
    const pSub = onValue(firebaseManager.getRef('precios'), (snap) => {
      if (snap.exists() && isMounted) {
        setData(prev => ({ ...prev, prices: snap.val() }));
      }
    });
    unsubs.push(pSub);

    return () => { isMounted = false; unsubs.forEach(unsub => unsub()); };
  }, [user, role.loading, role.type, role.ownedPlates]);

  return data;
};
