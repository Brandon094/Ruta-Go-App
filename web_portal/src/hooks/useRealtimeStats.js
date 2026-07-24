import { useRoleResolver } from './modules/useRoleResolver';
import { useRealtimeData } from './modules/useRealtimeData';

/**
 * 🛰️ Hook: useRealtimeStats (Orquestador Modularizado v1.5.1)
 *
 * Centraliza la lógica de sincronización con Firebase RTDB con soporte para Roles.
 * Delega la resolución de roles a useRoleResolver y la sincronización a useRealtimeData.
 */
export const useRealtimeStats = (user) => {

  // 1. Resolver el Rol y Perfil del usuario
  const role = useRoleResolver(user);

  // 2. Sincronizar datos basados en el rol resuelto
  const {
    users,
    drivers,
    owners,
    vehicles,
    schedules,
    reservations,
    prices,
    stats,
    routeStats
  } = useRealtimeData(user, role);

  // Unificar el estado de carga
  const combinedStats = {
    ...stats,
    loading: stats.loading || role.loading
  };

  return {
    role,
    stats: combinedStats,
    drivers,
    users,
    owners,
    schedules,
    reservations,
    prices,
    routeStats,
    vehicles
  };
};
