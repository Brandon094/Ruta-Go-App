import { useState, useEffect } from 'react';
import { get, onValue } from "firebase/database";
import firebaseManager from '../../firebase';

/**
 * 🔐 Hook: useRoleResolver (v2.0 Clean English Schema)
 * Resuelve el rol del usuario únicamente desde el nodo unificado /users/{uid} (por atributo role).
 */
export const useRoleResolver = (user) => {
  const [role, setRole] = useState({ type: null, uid: null, ownedPlates: [], name: '', phone: '', loading: true });

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const unsubs = [];

    const resolveRole = async () => {
      try {
        if (user.getIdToken) {
          await user.getIdToken(false).catch(() => {});
        }

        // 1. Obtener datos del usuario desde /users/{uid}
        const userSnap = await get(firebaseManager.getRef(`users/${user.uid}`));
        const userData = userSnap.exists() ? userSnap.val() : {};

        const profileName = userData.name || user.displayName || 'Usuario Ruta-Go';
        const profilePhone = userData.phone || '---';

        // 2. Determinar el rol por email maestro o atributo 'role'
        const isAdminEmail = user.email === 'dazace94@gmail.com' || user.email === 'brandon.daza.c@uniautonoma.edu.co';
        const rawRole = (userData.role || '').toLowerCase();
        const userRole = (isAdminEmail || rawRole === 'admin') ? 'admin' : rawRole || 'passenger';

        let resolvedRole = null;

        if (userRole === 'admin') {
          resolvedRole = {
            type: 'ADMIN',
            uid: user.uid,
            ownedPlates: [],
            name: profileName || 'Administrador Maestro',
            phone: profilePhone
          };
        } else if (userRole === 'owner') {
          const vSnap = await get(firebaseManager.getRef('vehicles'));
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
        } else if (userRole === 'driver') {
          const plate = userData.vehiclePlate || userData.vehicleId;
          let vehicleDetails = null;
          if (plate) {
            const vSnap = await get(firebaseManager.getRef(`vehicles/${plate}`));
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
        } else {
          resolvedRole = {
            type: 'PASSENGER',
            uid: user.uid,
            ownedPlates: [],
            name: profileName || 'Pasajero Ruta-Go',
            phone: profilePhone
          };
        }

        if (isMounted) {
          setRole({ ...resolvedRole, loading: false });

          // Sincronización en tiempo real del perfil desde /users/{uid}
          const profileSub = onValue(firebaseManager.getRef(`users/${user.uid}`), (snap) => {
            if (snap.exists() && isMounted) {
              const data = snap.val();
              setRole(prev => ({
                ...prev,
                name: data.name || prev.name,
                phone: data.phone || prev.phone
              }));
            }
          });
          unsubs.push(profileSub);
        }
      } catch (err) {
        console.warn("⚠️ Error en resolveRole:", err.message);
        if (isMounted) {
          const isAdminEmail = user.email === 'dazace94@gmail.com' || user.email === 'brandon.daza.c@uniautonoma.edu.co';
          setRole({
            type: isAdminEmail ? 'ADMIN' : 'PASSENGER',
            uid: user.uid,
            ownedPlates: [],
            name: user.displayName || (isAdminEmail ? 'Administrador Maestro' : 'Usuario Ruta-Go'),
            phone: '---',
            loading: false
          });
        }
      }
    };

    resolveRole();
    return () => { isMounted = false; unsubs.forEach(unsub => unsub()); };
  }, [user]);

  return role;
};
