import { useState, useEffect } from 'react';
import { get, onValue } from "firebase/database";
import firebaseManager from '../../firebase';

/**
 * 🔐 Hook: useRoleResolver (v2.0 Normalized + Legacy Fallback)
 * Resuelve el rol del usuario desde el nodo unificado /users/{uid} (por atributo role)
 * con fallback pasivo a /admins, /dueños, /conductores y /usuarios.
 */
export const useRoleResolver = (user) => {
  const [role, setRole] = useState({ type: null, uid: null, ownedPlates: [], name: '', phone: '', loading: true });

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const unsubs = [];

    const resolveRole = async () => {
      try {
        // 0. Obtener datos base del usuario desde /users/{uid} o /usuarios/{uid}
        let userSnap = await get(firebaseManager.getRef(`users/${user.uid}`));
        if (!userSnap.exists()) {
          userSnap = await get(firebaseManager.getRef(`usuarios/${user.uid}`));
        }

        const userData = userSnap.exists() ? userSnap.val() : {};
        const profileName = userData.name || userData.nombre || user.displayName || '';
        const profilePhone = userData.phone || userData.telefono || '---';
        const userRole = (userData.role || userData.rol || "").toLowerCase();

        let resolvedRole = null;

        // --- 1. RESOLUCIÓN V2.0 POR ATRIBUTO 'role' EN /users/{uid} ---
        if (userRole === 'admin') {
          resolvedRole = {
            type: 'ADMIN',
            uid: user.uid,
            ownedPlates: [],
            name: profileName || 'Administrador Maestro',
            phone: profilePhone
          };
        } else if (userRole === 'owner' || userRole === 'dueño') {
          let vSnap = await get(firebaseManager.getRef('vehicles'));
          if (!vSnap.exists()) vSnap = await get(firebaseManager.getRef('vehiculos'));

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
        } else if (userRole === 'driver' || userRole === 'conductor') {
          const plate = userData.vehiclePlate || userData.vehicleId || userData.placaVehiculo || userData.vehiculoId;
          let vehicleDetails = null;
          if (plate) {
            let vSnap = await get(firebaseManager.getRef(`vehicles/${plate}`));
            if (!vSnap.exists()) vSnap = await get(firebaseManager.getRef(`vehiculos/${plate}`));
            if (vSnap.exists()) vehicleDetails = { id: plate, ...vSnap.val() };
          }
          resolvedRole = {
            type: 'DRIVER',
            uid: user.uid,
            ownedPlates: plate ? [plate] : [],
            name: profileName || 'Conductor Ruta-Go',
            phone: profilePhone,
            vehicle: vehicleDetails
          };
        }

        // --- 2. FALLBACK LEGADO A NODOS SEPARADOS (/admins, /dueños, /conductores) ---
        if (!resolvedRole) {
          const adminSnap = await get(firebaseManager.getRef(`admins/${user.uid}`));
          if (adminSnap.exists() && adminSnap.val() === true) {
            resolvedRole = {
              type: 'ADMIN',
              uid: user.uid,
              ownedPlates: [],
              name: profileName || 'Administrador Maestro',
              phone: profilePhone
            };
          } else {
            const ownerSnap = await get(firebaseManager.getRef(`dueños/${user.uid}`));
            if (ownerSnap.exists()) {
              let vSnap = await get(firebaseManager.getRef('vehicles'));
              if (!vSnap.exists()) vSnap = await get(firebaseManager.getRef('vehiculos'));
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
            } else {
              const driverSnap = await get(firebaseManager.getRef(`conductores/${user.uid}`));
              if (driverSnap.exists()) {
                const driverData = driverSnap.val();
                const plate = driverData.vehiclePlate || driverData.placaVehiculo || driverData.vehiculoId;
                let vehicleDetails = null;
                if (plate) {
                  let vSnap = await get(firebaseManager.getRef(`vehicles/${plate}`));
                  if (!vSnap.exists()) vSnap = await get(firebaseManager.getRef(`vehiculos/${plate}`));
                  if (vSnap.exists()) vehicleDetails = { id: plate, ...vSnap.val() };
                }
                resolvedRole = {
                  type: 'DRIVER',
                  uid: user.uid,
                  ownedPlates: plate ? [plate] : [],
                  name: driverData.name || driverData.nombre || profileName || 'Conductor Ruta-Go',
                  phone: driverData.phone || driverData.telefono || profilePhone,
                  vehicle: vehicleDetails
                };
              } else {
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
        }

        if (isMounted) {
          setRole({ ...resolvedRole, loading: false });

          // Sincronización en tiempo real del perfil base desde /users o /usuarios
          const uPath = userSnap.ref.path.toString();
          const profileSub = onValue(firebaseManager.getRef(uPath), (snap) => {
            if (snap.exists()) {
              const data = snap.val();
              setRole(prev => ({
                ...prev,
                name: data.name || data.nombre || prev.name,
                phone: data.phone || data.telefono || prev.phone
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
