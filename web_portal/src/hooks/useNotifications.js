import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import firebaseManager from '../firebase';

/**
 * 🔔 Hook: useNotifications
 * Gestiona el ciclo de vida de las notificaciones Push en la web.
 */
export const useNotifications = (user, role) => {
  useEffect(() => {
    if (!user || role.loading) return;

    const messaging = firebaseManager.getMessaging();

    // 1. Solicitar Permisos y Obtener Token
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('✅ Permiso de notificaciones concedido.');

          // Obtener el token de FCM
          // NOTA: Reemplazar con la VAPID KEY real desde la consola de Firebase
          const token = await getToken(messaging, {
            validKey: 'BAq-S8bthzR18EdgK6lzrZhdSxMqaJhON_EZ-FkbfK9LGjQRl6oJMTdSc87RfE0uKQqBJYkZWK0RWzGoxfL5l6I'
          });

          if (token) {
            console.log('🔑 Token FCM Web:', token);
            await saveTokenToDb(user.uid, token, role.type);
          }
        }
      } catch (error) {
        console.error('❌ Error al configurar notificaciones:', error);
      }
    };

    // 2. Guardar Token en Realtime Database
    const saveTokenToDb = async (uid, token, type) => {
      const updates = {};
      const nodo = (type === 'DRIVER') ? 'conductores' : 'usuarios';
      updates[`${nodo}/${uid}/tokenFCM_Web`] = token;
      await update(ref(db), updates);
    };

    // 3. Escuchar Mensajes en Primer Plano
    const unsubOnMessage = onMessage(messaging, (payload) => {
      console.log('📩 Mensaje recibido en primer plano:', payload);
      // Aquí podrías mostrar un Toast personalizado o una alerta
      if (payload.notification) {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon || '/assets/logo_icon.png',
          badge: payload.notification.badge || '/assets/logo_icon.png'
        });
      }
    });

    requestPermission();

    return () => {
      unsubOnMessage();
    };
  }, [user, role.loading, role.type]);
};
