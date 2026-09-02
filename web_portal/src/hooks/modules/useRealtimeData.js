import { useState, useEffect, useMemo } from 'react';
import { onValue } from "firebase/database";
import firebaseManager from '../../firebase';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🛰️ Hook: useRealtimeData (v2.0 Normalized + Legacy Fallback)
 * Sincroniza los nodos NoSQL v2.0 (/users, /schedules, /vehicles, /reservations, /seatAvailability, /prices)
 * con soporte pasivo a los nodos legados.
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
    routes: [],
    driverStats: {},
    reservations: [],
    allDrivers: [],
    loading: true
  });

  useEffect(() => {
    if (!user || role.loading) return;

    let isMounted = true;
    const unsubs = [];
    const today = new Date().toISOString().split('T')[0];

    // --- 👥 USUARIOS (/users) ---
    const usersSub = onValue(firebaseManager.getRef('users'), (usersSnap) => {
      if (!isMounted) return;
      const usersMap = {};
      if (usersSnap.exists()) {
        Object.entries(usersSnap.val()).forEach(([id, val]) => { usersMap[id] = { id, ...val }; });
      }

      const allUsersList = Object.values(usersMap);
      const driversList = allUsersList.filter(u => {
        const r = (u.role || u.rol || "").toLowerCase();
        return r === "driver" || r === "conductor";
      });

      const ownersList = allUsersList.filter(u => {
        const r = (u.role || u.rol || "").toLowerCase();
        return r === "owner" || r === "dueño" || r === "socio";
      });

      setRaw(prev => ({
        ...prev,
        users: allUsersList,
        drivers: driversList.length > 0 ? driversList : prev.drivers,
        owners: ownersList
      }));
    });
    unsubs.push(usersSub);

    // --- 📊 ESTADÍSTICAS OPERATIVAS (Driver Money) ---
    if (role.type === 'DRIVER') {
      const statsSub = onValue(firebaseManager.getRef(`estadisticas/${user.uid}/${today}`), (snap) => {
        if (snap.exists() && isMounted) {
          setRaw(prev => ({ ...prev, driverStats: snap.val() }));
        }
      });
      unsubs.push(statsSub);
    }

    // --- 🚗 VEHÍCULOS (/vehicles) ---
    const vSub = onValue(firebaseManager.getRef('vehicles'), (vSnap) => {
      if (!isMounted) return;
      const vMap = {};
      if (vSnap.exists()) {
        Object.entries(vSnap.val()).forEach(([id, val]) => { vMap[id] = { id, ...val }; });
      }
      setRaw(prev => ({ ...prev, vehicles: Object.values(vMap) }));
    });
    unsubs.push(vSub);

    // --- 🎫 RESERVAS (/reservations) ---
    const rSub = onValue(firebaseManager.getRef('reservations'), (rSnap) => {
      if (!isMounted) return;
      const rMap = {};
      if (rSnap.exists()) {
        Object.entries(rSnap.val()).forEach(([id, val]) => { rMap[id] = { id, ...val }; });
      }
      setRaw(prev => ({ ...prev, reservations: Object.values(rMap), loading: false }));
    });
    unsubs.push(rSub);

    // --- 🕒 HORARIOS (/schedules) ---
    const hSub = onValue(firebaseManager.getRef('schedules'), (sSnap) => {
      if (!isMounted) return;
      const hMap = {};
      if (sSnap.exists()) {
        Object.entries(sSnap.val()).forEach(([id, val]) => { hMap[id] = { id, ...val }; });
      }
      setRaw(prev => ({ ...prev, schedules: Object.values(hMap), loading: false }));
    });
    unsubs.push(hSub);

    // --- 💺 DISPONIBILIDAD (/seatAvailability) ---
    const dispSub = onValue(firebaseManager.getRef('seatAvailability'), (sSnap) => {
      if (!isMounted) return;
      const dispData = sSnap.exists() ? sSnap.val() : {};
      setRaw(prev => ({ ...prev, availability: dispData }));
    });
    unsubs.push(dispSub);

    // --- 💰 PRECIOS (/prices) ---
    const pSub = onValue(firebaseManager.getRef('prices'), (pSnap) => {
      if (!isMounted) return;
      const pData = pSnap.exists() ? pSnap.val() : {};
      setRaw(prev => ({ ...prev, prices: pData }));
    });
    unsubs.push(pSub);

    // --- 🗺️ RUTAS MAESTRAS (/routes) ---
    const routesSub = onValue(firebaseManager.getRef('routes'), (rSnap) => {
      if (!isMounted) return;
      const routesList = rSnap.exists() ? Object.values(rSnap.val()) : [];
      setRaw(prev => ({ ...prev, routes: routesList }));
    });
    unsubs.push(routesSub);

    // --- ⭐ CALIFICACIONES (/driverRatings) ---
    const ratingsSub = onValue(firebaseManager.getRef('driverRatings'), (rSnap) => {
      if (!isMounted) return;
      const rData = rSnap.exists() ? rSnap.val() : {};
      setRaw(prev => ({ ...prev, driverRatings: rData }));
    });
    unsubs.push(ratingsSub);

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
    const myScheduleIds = raw.schedules.filter(s => (s.driverId || s.conductorId) === user.uid).map(s => s.id);

    // 1. Enriquecer y Filtrar Conductores con Calificaciones NoSQL v2.0
    const enrichedDriversList = (raw.drivers || []).map(d => {
      const myRatingsMap = raw.driverRatings?.[d.id] || {};
      const ratingsList = Object.values(myRatingsMap);
      const totalCount = ratingsList.length;
      const avg = totalCount > 0
        ? (ratingsList.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / totalCount).toFixed(1)
        : '5.0';

      return {
        ...d,
        avgRating: avg,
        totalRatings: totalCount,
        ratingsList
      };
    });

    const filteredDrivers = userType === 'ADMIN' ? enrichedDriversList :
                           userType === 'DRIVER' ? enrichedDriversList.filter(d => d.id === user.uid) :
                           enrichedDriversList.filter(d => ownedPlates.includes(d.vehiclePlate || d.placaVehiculo || d.vehiculoId));

    // 2. Filtrar Vehículos
    const filteredVehicles = userType === 'ADMIN' ? raw.vehicles :
                            raw.vehicles.filter(v => v.ownerId === user.uid);

    // 3. Filtrar Reservas (Personal vs Negocio)
    const personalReservations = raw.reservations.filter(res => {
      const resUserId = res.userId || res.usuarioId || res.idUsuario;
      return resUserId === user.uid;
    });

    const businessReservations = raw.reservations.filter(res => {
      const resPlate = res.vehiclePlate || res.vehicleId || res.vehiculoId || res.vehiculoPlaca || res.plate;
      const isOwned = userType === 'ADMIN' || ownedPlates.includes(resPlate);
      const resScheduleId = res.scheduleId || res.idHorario || res.horarioId;
      const resDriverId = res.driverId || res.conductorId;
      const isDriverMatch = userType === 'DRIVER' && (
        resDriverId === user.uid ||
        (resScheduleId && myScheduleIds.includes(resScheduleId))
      );
      return isOwned || isDriverMatch;
    });

    // 4. Calcular Estadísticas y Rutas
    let totalRev = 0, confirmed = 0, canceled = 0, totalUserRes = 0;
    let lpRes = 0, lpSeats = 0, ntRes = 0, ntSeats = 0, totalResHoy = 0;

    const enrichedSchedules = raw.schedules.map(s => {
      const driverId = s.driverId || s.conductorId;
      const driver = raw.drivers.find(d => d.id === driverId);
      const vId = s.vehicleId || s.vehiculoId || driver?.vehicleId || driver?.vehiculoId || driver?.placaVehiculo;
      const vehicle = raw.vehicles.find(v => v.id === vId || v.plate === vId || v.placa === vId);
      const capacity = vehicle?.capacity || vehicle?.capacidad || 13;

      // Unir datos de disponibilidad en tiempo real
      const dInfo = raw.availability[s.id] || {};
      const dbTotal = dInfo.totalSeats || dInfo.totalAsientos || 0;
      const avail = (dbTotal > 0) ? (dInfo.availableSeats ?? dInfo.asientosDisponibles ?? capacity) : capacity;
      const total = dbTotal > 0 ? dbTotal : capacity;
      const resCount = Math.max(0, total - avail);

      const isMine = userType === 'DRIVER' && driverId === user.uid;
      const isOwned = userType === 'ADMIN' || (userType === 'OWNER' && ownedPlates.includes(vId));

      const rutaNorm = FormatUtils.normalizeText(s.route || s.ruta || "").replace(/➔/g, '->');
      const parts = rutaNorm.split('->');

      if (isOwned || isMine) {
        const destination = parts[1]?.trim() || "";
        const isToLaPlata = destination.includes("la plata");
        const isToNataga = destination.includes("nataga");

        if (isToLaPlata) { lpRes += resCount; lpSeats += avail; }
        else if (isToNataga) { ntRes += resCount; ntSeats += avail; }

        totalResHoy += resCount;

        const price = (parts.length === 2)
          ? (raw.prices[parts[0].trim()]?.[parts[1].trim()] || 12000)
          : 12000;

        totalRev += (resCount * price);
      }

      return {
        ...s,
        asientosDisponibles: avail,
        totalAsientos: total,
        reservasCount: resCount
      };
    });

    // Estadísticas Personales
    personalReservations.forEach(res => {
      const status = (res.status || res.reservationStatus || res.estadoReserva || "").toLowerCase();
      totalUserRes++;
      if (status === "confirmed" || status === "confirmada" || status === "completada" || status === "confirmado") confirmed++;
      else if (status === "cancelled" || status === "cancelada") canceled++;
    });

    return {
      ...raw,
      allDrivers: raw.drivers,
      schedules: enrichedSchedules,
      drivers: filteredDrivers,
      vehicles: filteredVehicles,
      reservations: businessReservations,
      personalReservations: personalReservations,
      stats: {
        totalUsers: raw.users.filter(u => !(u.deletionRequested || u.solicitudBorrado)).length,
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
