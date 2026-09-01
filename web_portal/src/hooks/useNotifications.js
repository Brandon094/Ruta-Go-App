import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import firebaseManager from '../firebase';

/**
 * 🔔 Hook: useNotifications
 * Gestiona el ciclo de vida de las notificaciones Push en la web con manejo seguro de errores.
 */
export const useNotifications = (user, role) => {
  useEffect(() => {
    if (!user || role.loading) return;

    const messaging = firebaseManager.getMessaging();
    if (!messaging) return;

    // 1. Solicitar Permisos y Obtener Token
    const requestPermission = async () => {
      try {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          try {
            const token = await getToken(messaging, {
              vapidKey: 'BAq-S8bthzR18EdgK6lzrZhdSxMqaJhON_EZ-FkbfK9LGjQRl6oJMTdSc87RfE0uKQqBJYkZWK0RWzGoxfL5l6I'
            });

            if (token) {
              await saveTokenToDb(user.uid, token, role.type);
            }
          } catch (tokenErr) {
            console.warn('⚠️ Token FCM Web no disponible temporalmente:', tokenErr.message);
          }
        }
      } catch (error) {
        console.warn('⚠️ Notificaciones web no activadas:', error.message);
      }
    };

    // 2. Guardar Token en Realtime Database
    const saveTokenToDb = async (uid, token, type) => {
      try {
        const updates = {};
        updates[`users/${uid}/fcmTokenWeb`] = token;
        updates[`usuarios/${uid}/tokenFCM_Web`] = token;
        if (type === 'DRIVER') {
          updates[`conductores/${uid}/tokenFCM_Web`] = token;
        }
        await update(ref(db), updates);
      } catch (e) {
        console.warn('⚠️ Error al guardar FCM token:', e.message);
      }
    };

    // 3. Escuchar Mensajes en Primer Plano
    let unsubOnMessage = () => {};
    try {
      unsubOnMessage = onMessage(messaging, (payload) => {
        if (payload?.notification) {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon || '/assets/logo_icon.png',
            badge: payload.notification.badge || '/assets/logo_icon.png'
          });
        }
      });
    } catch (e) {
      console.warn('⚠️ Listener FCM en primer plano omitido.');
    }

    requestPermission();

    return () => {
      if (typeof unsubOnMessage === 'function') unsubOnMessage();
    };
  }, [user, role.loading, role.type]);
};
