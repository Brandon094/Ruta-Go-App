import { ref, push, onValue, off, set } from "firebase/database";
import { db } from "../firebase";

/**
 * 💬 Service: chatService (v2.0 Clean English Schema)
 * Motor de mensajería instantánea en tiempo real.
 */
export const chatService = {
  /**
   * Envía un mensaje vinculado a una reserva.
   */
  sendMessage: async (reservationId, senderId, text) => {
    if (!reservationId || !text.trim()) return;

    // 1. Escribir en /chats/{reservationId}/messages (NoSQL v2.0)
    const messagesRef = ref(db, `chats/${reservationId}/messages`);
    const newMessageRef = push(messagesRef);

    const messageData = {
      id: newMessageRef.key,
      senderId: senderId,
      text: text.trim(),
      timestamp: Date.now()
    };

    try {
      await set(newMessageRef, messageData);
      return { success: true };
    } catch (error) {
      console.error("Error enviando mensaje en /chats/:", error);
      // Fallback pasivo a /chats/{reservationId}/mensajes si se requiere
      try {
        const legacyRef = push(ref(db, `chats/${reservationId}/mensajes`));
        await set(legacyRef, { ...messageData, id: legacyRef.key });
        return { success: true };
      } catch (legacyErr) {
        throw error;
      }
    }
  },

  /**
   * Escucha mensajes en tiempo real (Soporta /messages y /mensajes).
   */
  listenMessages: (reservationId, callback) => {
    if (!reservationId) return () => {};

    const messagesRef = ref(db, `chats/${reservationId}/messages`);
    const legacyRef = ref(db, `chats/${reservationId}/mensajes`);

    const parseMsgs = (snap) => {
      const messages = [];
      if (snap.exists()) {
        Object.entries(snap.val()).forEach(([id, val]) => {
          messages.push({ id, ...val });
        });
      }
      return messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    };

    const unsub = onValue(messagesRef, (snap) => {
      if (snap.exists()) {
        callback(parseMsgs(snap));
      } else {
        onValue(legacyRef, (legSnap) => {
          callback(parseMsgs(legSnap));
        }, { onlyOnce: true });
      }
    });

    return () => off(messagesRef);
  }
};
