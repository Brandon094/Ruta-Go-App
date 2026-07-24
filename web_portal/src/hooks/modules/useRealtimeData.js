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
    availability: {},
    prices: {},
    driverStats: {},
    reservations: [],
    loading: true
  });

  useEffect(() => {
    if (!user || role.loading) return;

    let isMounted = true;
    const unsubs = [];
    const today = new Date().toISOString().split('T')[0];

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

    // --- 📊 ESTADÍSTICAS OPERATIVAS (Para el money del conductor) ---
    if (role.type === 'DRIVER') {
      const statsSub = onValue(firebaseManager.getRef(`estadisticas/${user.uid}/${today}`), (snap) => {
        if (snap.exists() && isMounted) {
          setRaw(prev => ({ ...prev, driverStats: snap.val() }));
        }
      });
      unsubs.push(statsSub);
    }

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

    // --- 💺 DISPONIBILIDAD (Vital para actualización de cupos en tiempo real) ---
    const dispSub = onValue(firebaseManager.getRef('disponibilidadAsientos'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => ({ ...prev, availability: snap.val() }));
      }
    });
    unsubs.push(dispSub);

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
      const resPlate = res.vehiculoId || res.vehiculoPlaca || res.vehicleId;
      const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);
      const resScheduleId = res.scheduleId || res.idHorario || res.horarioId;
      const resDriverId = res.driverId || res.conductorId;
      const isDriverMatch = userType === 'DRIVER' && (
        resDriverId === user.uid ||
        (resScheduleId && myScheduleIds.includes(resScheduleId))
      );
      const resUserId = res.userId || res.usuarioId || res.idUsuario;
      const isMyPassengerRes = userType === 'PASSENGER' && (resUserId === user.uid);
      return isOwned || isDriverMatch || isMyPassengerRes;
    });

    // 4. Calcular Estadísticas
    let totalRev = 0, confirmed = 0, canceled = 0, totalUserRes = 0;

    // Si es conductor, priorizamos el nodo oficial de estadísticas del día
    if (userType === 'DRIVER') {
      totalRev = raw.driverStats?.ingresosDiarios || 0;
    }

    filteredReservations.forEach(res => {
      const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
      const resPlate = res.vehiculoId || res.vehiculoPlaca || res.vehicleId || res.plate;
      const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);

      const resUserId = res.userId || res.usuarioId || res.idUsuario;
      const isMyPassengerRes = userType === 'PASSENGER' && (resUserId === user.uid);

      // Si es Admin/Owner, sumamos de las reservas filtradas
      if ((userType === 'ADMIN' || userType === 'OWNER') && isOwned && (status === "confirmada" || status === "completada")) {
        totalRev += Number(res.precio || res.price || 0);
      }

      if (isMyPassengerRes) {
        totalUserRes++;
        if (status === "confirmada" || status === "completada" || status === "confirmado") confirmed++;
        else if (status === "cancelada") canceled++;
      }
    });

    // 5. Estadísticas de Rutas y Horarios con Mezcla de Datos
    let lpRes = 0, lpSeats = 0, ntRes = 0, ntSeats = 0, totalResHoy = 0;

    const enrichedSchedules = raw.schedules.map(s => {
      const ruta = s.ruta.toLowerCase();
      const driver = raw.drivers.find(d => d.id === s.conductorId);
      const vId = s.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
      const vehicle = raw.vehicles.find(v => v.id === vId || v.placa === vId);
      const capacity = vehicle?.capacidad || 13;

      // Unir datos de disponibilidad en tiempo real
      const dInfo = raw.availability[s.id] || {};
      const dbTotal = dInfo.totalAsientos || 0;
      const avail = (dbTotal > 0) ? (dInfo.asientosDisponibles ?? capacity) : capacity;
      const total = dbTotal > 0 ? dbTotal : capacity;
      const resCount = Math.max(0, total - avail);

      const isMine = userType === 'DRIVER' && s.conductorId === user.uid;
      const isOwned = userType === 'ADMIN' || (userType === 'OWNER' && ownedPlates.includes(s.placaVehiculo || s.vehiculoId));

      if (isOwned || isMine) {
        if (ruta.includes("la plata")) { lpRes += resCount; lpSeats += avail; }
        else if (ruta.includes("nátaga") || ruta.includes("nataga")) { ntRes += resCount; ntSeats += avail; }
        totalResHoy += resCount;
      }

      return {
        ...s,
        asientosDisponibles: avail,
        totalAsientos: total,
        reservasCount: resCount
      };
    });

    return {
      ...raw,
      schedules: enrichedSchedules,
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
