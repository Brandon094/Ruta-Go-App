import { useState, useEffect } from 'react';
import { get, onValue } from "firebase/database";
import firebaseManager from '../../firebase';

/**
 * 🔐 Hook: useRoleResolver
 * Resuelve el rol del usuario y mantiene su perfil básico sincronizado.
 * Utiliza FirebaseManager (Singleton) para centralizar el acceso.
 */
export const useRoleResolver = (user) => {
  const [role, setRole] = useState({ type: null, uid: null, ownedPlates: [], name: '', phone: '', loading: true });

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const unsubs = [];

    const resolveRole = async () => {
      try {
        // 0. Obtener datos base del usuario (Nombre/Teléfono) desde /usuarios usando FirebaseManager
        const userSnap = await get(firebaseManager.getRef(`usuarios/${user.uid}`));
        const userData = userSnap.exists() ? userSnap.val() : {};
        const profileName = userData.nombre || user.displayName || '';
        const profilePhone = userData.telefono || '---';

        let resolvedRole = null;

        // 1. Resolver Admin
        const adminSnap = await get(firebaseManager.getRef(`admins/${user.uid}`));
        if (adminSnap.exists() && adminSnap.val() === true) {
          resolvedRole = {
            type: 'ADMIN',
            uid: user.uid,
            ownedPlates: [],
            name: profileName || 'Administrador Maestro',
            phone: profilePhone
          };
        }
        // 2. Resolver Dueño
        else {
          const ownerSnap = await get(firebaseManager.getRef(`dueños/${user.uid}`));
          if (ownerSnap.exists()) {
            const vSnap = await get(firebaseManager.getRef('vehiculos'));
            let ownedPlates = [];
            if (vSnap.exists()) {
              ownedPlates = Object.entries(vSnap.val())
                .filter(([id, v]) => v.ownerId === user.uid)
                .map(([id, v]) => id);
            }
            resolvedRole = {
              type: 'OWNER',
              uid: user.uid,
              ownedPlates,
              name: profileName || 'Socio Ruta-Go',
              phone: profilePhone
            };
          }
          // 3. Resolver Conductor
          else {
            const driverSnap = await get(firebaseManager.getRef(`conductores/${user.uid}`));
            if (driverSnap.exists()) {
              const driverData = driverSnap.val();
              const plate = driverData.placaVehiculo || driverData.vehiculoId;
              let vehicleDetails = null;
              if (plate) {
                const vSnap = await get(firebaseManager.getRef(`vehiculos/${plate}`));
                if (vSnap.exists()) vehicleDetails = { id: plate, ...vSnap.val() };
              }
              resolvedRole = {
                type: 'DRIVER',
                uid: user.uid,
                ownedPlates: plate ? [plate] : [],
                name: driverData.nombre || profileName || 'Conductor Ruta-Go',
                phone: driverData.telefono || profilePhone,
                vehicle: vehicleDetails
              };
            }
            // 4. Resolver Pasajero (Default)
            else {
              resolvedRole = {
                type: 'PASSENGER',
                uid: user.uid,
                ownedPlates: [],
                name: profileName || 'Pasajero Ruta-Go',
                phone: profilePhone
              };
            }
          }
        }

        if (isMounted) {
          setRole({ ...resolvedRole, loading: false });

          // Sincronización en tiempo real del perfil base
          const profileSub = onValue(firebaseManager.getRef(`usuarios/${user.uid}`), (snap) => {
            if (snap.exists()) {
              const data = snap.val();
              setRole(prev => ({
                ...prev,
                name: data.nombre || prev.name,
                phone: data.telefono || prev.phone
              }));
            }
          });
          unsubs.push(profileSub);
        }
      } catch (err) {
        firebaseManager.logError(err, "useRoleResolver");
        if (isMounted) setRole(prev => ({ ...prev, loading: false }));
      }
    };

    resolveRole();
    return () => { isMounted = false; unsubs.forEach(unsub => unsub()); };
  }, [user]);

  return role;
};
