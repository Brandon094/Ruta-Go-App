import { ref, push, onValue, off, serverTimestamp, set } from "firebase/database";
import { db } from "../firebase";

/**
 * 💬 Service: chatService
 * Motor de mensajería instantánea (Mirror ChatService.java).
 */
export const chatService = {
  /**
   * Envía un mensaje vinculado a una reserva.
   */
  sendMessage: async (reservationId, senderId, text) => {
    if (!reservationId || !text.trim()) return;

    const messagesRef = ref(db, `chats/${reservationId}/mensajes`);
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
      console.error("Error enviando mensaje:", error);
      throw error;
    }
  },

  /**
   * Escucha mensajes en tiempo real.
   */
  listenMessages: (reservationId, callback) => {
    const messagesRef = ref(db, `chats/${reservationId}/mensajes`);
    onValue(messagesRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((child) => {
        messages.push({ id: child.key, ...child.val() });
      });
      callback(messages);
    });
    return () => off(messagesRef);
  }
};
