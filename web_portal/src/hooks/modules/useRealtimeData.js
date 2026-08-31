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

    // --- 👥 USUARIOS (Carga v2.0 de /users y /usuarios) ---
    const usersSub = onValue(firebaseManager.getRef('users'), (usersSnap) => {
      onValue(firebaseManager.getRef('usuarios'), (legacySnap) => {
        if (!isMounted) return;
        const usersMap = {};

        if (legacySnap.exists()) {
          Object.entries(legacySnap.val()).forEach(([id, val]) => { usersMap[id] = { id, ...val }; });
        }
        if (usersSnap.exists()) {
          Object.entries(usersSnap.val()).forEach(([id, val]) => { usersMap[id] = { ...usersMap[id], id, ...val }; });
        }

        const allUsersList = Object.values(usersMap);
        const driversList = allUsersList.filter(u => {
          const r = (u.role || u.rol || "").toLowerCase();
          return r === "driver" || r === "conductor";
        });

        setRaw(prev => ({
          ...prev,
          users: allUsersList,
          drivers: driversList.length > 0 ? driversList : prev.drivers
        }));
      });
    });
    unsubs.push(usersSub);

    // --- 👨‍✈️ FALLBACK CONDUCTORES LEGADO ---
    const driversSub = onValue(firebaseManager.getRef('conductores'), (snap) => {
      if (snap.exists() && isMounted) {
        setRaw(prev => {
          if (prev.drivers.length > 0) return prev; // Priorizar /users/
          return { ...prev, drivers: Object.entries(snap.val()).map(([id, val]) => ({ id, ...val })) };
        });
      }
    });
    unsubs.push(driversSub);

    // --- 📊 ESTADÍSTICAS OPERATIVAS (Driver Money) ---
    if (role.type === 'DRIVER') {
      const statsSub = onValue(firebaseManager.getRef(`estadisticas/${user.uid}/${today}`), (snap) => {
        if (snap.exists() && isMounted) {
          setRaw(prev => ({ ...prev, driverStats: snap.val() }));
        }
      });
      unsubs.push(statsSub);
    }

    // --- 🚗 VEHÍCULOS (/vehicles y /vehiculos) ---
    const vSub = onValue(firebaseManager.getRef('vehicles'), (vSnap) => {
      onValue(firebaseManager.getRef('vehiculos'), (legacyVSnap) => {
        if (!isMounted) return;
        const vMap = {};
        if (legacyVSnap.exists()) {
          Object.entries(legacyVSnap.val()).forEach(([id, val]) => { vMap[id] = { id, ...val }; });
        }
        if (vSnap.exists()) {
          Object.entries(vSnap.val()).forEach(([id, val]) => { vMap[id] = { ...vMap[id], id, ...val }; });
        }
        setRaw(prev => ({ ...prev, vehicles: Object.values(vMap) }));
      });
    });
    unsubs.push(vSub);

    // --- 🎫 RESERVAS (/reservations y /reservas) ---
    const rSub = onValue(firebaseManager.getRef('reservations'), (rSnap) => {
      onValue(firebaseManager.getRef('reservas'), (legacyRSnap) => {
        if (!isMounted) return;
        const rMap = {};
        if (legacyRSnap.exists()) {
          Object.entries(legacyRSnap.val()).forEach(([id, val]) => { rMap[id] = { id, ...val }; });
        }
        if (rSnap.exists()) {
          Object.entries(rSnap.val()).forEach(([id, val]) => { rMap[id] = { ...rMap[id], id, ...val }; });
        }
        setRaw(prev => ({ ...prev, reservations: Object.values(rMap), loading: false }));
      });
    });
    unsubs.push(rSub);

    // --- 🕒 HORARIOS (/schedules y /horarios) ---
    const hSub = onValue(firebaseManager.getRef('schedules'), (sSnap) => {
      onValue(firebaseManager.getRef('horarios'), (legacyHSnap) => {
        if (!isMounted) return;
        const hMap = {};
        if (legacyHSnap.exists()) {
          Object.entries(legacyHSnap.val()).forEach(([id, val]) => { hMap[id] = { id, ...val }; });
        }
        if (sSnap.exists()) {
          Object.entries(sSnap.val()).forEach(([id, val]) => { hMap[id] = { ...hMap[id], id, ...val }; });
        }
        setRaw(prev => ({ ...prev, schedules: Object.values(hMap) }));
      });
    });
    unsubs.push(hSub);

    // --- 💺 DISPONIBILIDAD (/seatAvailability y /disponibilidadAsientos) ---
    const dispSub = onValue(firebaseManager.getRef('seatAvailability'), (sSnap) => {
      onValue(firebaseManager.getRef('disponibilidadAsientos'), (legacySnap) => {
        if (!isMounted) return;
        const dispData = {
          ...(legacySnap.exists() ? legacySnap.val() : {}),
          ...(sSnap.exists() ? sSnap.val() : {})
        };
        setRaw(prev => ({ ...prev, availability: dispData }));
      });
    });
    unsubs.push(dispSub);

    // --- 💰 PRECIOS (/prices y /precios) ---
    const pSub = onValue(firebaseManager.getRef('prices'), (pSnap) => {
      onValue(firebaseManager.getRef('precios'), (legacySnap) => {
        if (!isMounted) return;
        const pData = {
          ...(legacySnap.exists() ? legacySnap.val() : {}),
          ...(pSnap.exists() ? pSnap.val() : {})
        };
        setRaw(prev => ({ ...prev, prices: pData }));
      });
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
    const myScheduleIds = raw.schedules.filter(s => (s.driverId || s.conductorId) === user.uid).map(s => s.id);

    // 1. Filtrar Conductores
    const filteredDrivers = userType === 'ADMIN' ? raw.drivers :
                           userType === 'DRIVER' ? raw.drivers.filter(d => d.id === user.uid) :
                           raw.drivers.filter(d => ownedPlates.includes(d.vehiclePlate || d.placaVehiculo || d.vehiculoId));

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
