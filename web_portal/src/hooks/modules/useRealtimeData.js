import { useState, useEffect, useMemo } from 'react';
import { onValue } from "firebase/database";
import firebaseManager from '../../firebase';

/**
 * 🛰️ Hook: useRealtimeData
 * Sincroniza todos los nodos de RTDB y deriva el estado filtrado por rol.
 */
export const useRealtimeData = (user, role) => {
  const [raw, setRaw] = useState({
    users: [],
    drivers: [],
    owners: [],
    vehicles: [],
    schedules: [],
    reservations: [],
    prices: {},
    loading: true
  });

  useEffect(() => {
    if (!user || role.loading) return;

    let isMounted = true;
    const unsubs = [];

    // --- 👥 USUARIOS ---
    if (role.type === 'ADMIN' || role.type === 'OWNER') {
      const uSub = onValue(firebaseManager.getRef('usuarios'), (snap) => {
        if (snap.exists() && isMounted) {
          setRaw(prev => ({ ...prev, users: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })) }));
        }
      });
      unsubs.push(uSub);
    }

    // --- 💼 DUEÑOS ---
    if (role.type === 'ADMIN' || role.type === 'OWNER') {
      const dOwnersSub = onValue(firebaseManager.getRef('dueños'), (snap) => {
        if (snap.exists() && isMounted) {
          setRaw(prev => ({ ...prev, owners: Object.entries(snap.val()).map(([id, status]) => ({ id, status })) }));
        }
      });
      unsubs.push(dOwnersSub);
    }

    // --- 👨‍✈️ CONDUCTORES ---
    const driversSub = onValue(firebaseManager.getRef('conductores'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, drivers: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })) }));
      }
    });
    unsubs.push(driversSub);

    // --- 🚗 VEHÍCULOS ---
    const vSub = onValue(firebaseManager.getRef('vehiculos'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, vehicles: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })) }));
      }
    });
    unsubs.push(vSub);

    // --- 🎫 RESERVAS ---
    const rSub = onValue(firebaseManager.getRef('reservas'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, reservations: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })), loading: false }));
      } else if (isMounted) {
        setRaw(prev => ({ ...prev, loading: false }));
      }
    });
    unsubs.push(rSub);

    // --- 🕒 HORARIOS ---
    const hSub = onValue(firebaseManager.getRef('horarios'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, schedules: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })) }));
      }
    });
    unsubs.push(hSub);

    // --- 💰 PRECIOS ---
    const pSub = onValue(firebaseManager.getRef('precios'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, prices: snap.val() }));
      }
    });
    unsubs.push(pSub);

    return () => { isMounted = false; unsubs.forEach(unsub => unsub()); };
  }, [user, role.loading]);

  // --- 🧠 Lógica de Filtrado y Derivación (Memoized) ---
  return useMemo(() => {
    const defaultStats = {
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
    };

    const defaultRouteStats = {
      toLaPlata: { reservations: 0, seats: 0 },
      toNataga: { reservations: 0, seats: 0 }
    };

    if (!user || role.loading || raw.loading) {
      return { ...raw, stats: defaultStats, routeStats: defaultRouteStats };
    }

    const userType = role.type;
    const ownedPlates = role.ownedPlates || [];
    const myScheduleIds = raw.schedules.filter(s => s.conductorId === user.uid).map(s => s.id);

    // 1. Filtrar Conductores
    const filteredDrivers = userType === 'ADMIN' ? raw.drivers :
                           userType === 'DRIVER' ? raw.drivers.filter(d => d.id === user.uid) :
                           raw.drivers.filter(d => ownedPlates.includes(d.placaVehiculo || d.vehiculoId));

    // 2. Filtrar Vehículos
    const filteredVehicles = userType === 'ADMIN' ? raw.vehicles :
                            raw.vehicles.filter(v => v.ownerId === user.uid);

    // 3. Filtrar Reservas
    const filteredReservations = raw.reservations.filter(res => {
      const resPlate = res.vehiculoId || res.vehiculoPlaca;
      const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);
      const resScheduleId = res.scheduleId || res.idHorario || res.horarioId;
      const isDriverMatch = userType === 'DRIVER' && (
        res.conductorId === user.uid ||
        res.driverId === user.uid ||
        (resScheduleId && myScheduleIds.includes(resScheduleId))
      );
      const isMyPassengerRes = userType === 'PASSENGER' && res.usuarioId === user.uid;
      return isOwned || isDriverMatch || isMyPassengerRes;
    });

    // 4. Calcular Estadísticas
    let totalRev = 0, confirmed = 0, canceled = 0, totalUserRes = 0;
    filteredReservations.forEach(res => {
      const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
      const isOwned = userType === 'ADMIN' || ownedPlates.includes(res.vehiculoId || res.vehiculoPlaca);
      const isMyPassengerRes = userType === 'PASSENGER' && res.usuarioId === user.uid;

      if (isOwned && (status === "confirmada" || status === "completada")) {
        totalRev += Number(res.precio || res.price || 0);
      }
      if (isMyPassengerRes) {
        totalUserRes++;
        if (status === "confirmada" || status === "completada") confirmed++;
        else if (status === "cancelada") canceled++;
      }
    });

    // 5. Estadísticas de Rutas y Horarios
    let lpRes = 0, lpSeats = 0, ntRes = 0, ntSeats = 0, totalResHoy = 0;
    raw.schedules.forEach(s => {
      const ruta = s.ruta.toLowerCase();
      const driver = raw.drivers.find(d => d.id === s.conductorId);
      const vId = s.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
      const vehicle = raw.vehicles.find(v => v.id === vId || v.placa === vId);
      const capacity = vehicle?.capacidad || 13;

      const dbTotal = s.totalAsientos || 0;
      const avail = (dbTotal > 0) ? (s.asientosDisponibles ?? s.asientosLibres ?? capacity) : capacity;
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
      ...raw,
      drivers: filteredDrivers,
      vehicles: filteredVehicles,
      reservations: filteredReservations,
      stats: {
        totalUsers: raw.users.filter(u => !u.solicitudBorrado).length,
        activeDrivers: filteredDrivers.filter(d => d.status === 'active').length,
        totalVehicles: filteredVehicles.length,
        totalOwners: raw.owners.length,
        todayReservations: totalResHoy,
        totalFreeSeats: lpSeats + ntSeats,
        totalRevenue: totalRev,
        confirmedReservations: confirmed,
        canceledReservations: canceled,
        totalUserReservations: totalUserRes,
        loading: false
      },
      routeStats: {
        toLaPlata: { reservations: lpRes, seats: lpSeats },
        toNataga: { reservations: ntRes, seats: ntSeats }
      }
    };
  }, [raw, role, user?.uid]);
};
