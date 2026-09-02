import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Clock, User } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { chatService } from '../../services/chatService';

/**
 * 💬 Organism: ChatModal
 * UI Espejo 1:1 del chat de la App nativa (v1.6.0 Atomic).
 */
export function ChatModal({ reservation, role, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const reservationId = reservation.id || reservation.idReservation || reservation.idReserva;

  // Determinar la otra parte del chat según quién inició sesión (Pasajero vs Conductor)
  const isPassengerUser = (role?.uid === (reservation.userId || reservation.usuarioId)) ||
                          (role?.type === 'PASSENGER' && role?.uid !== (reservation.driverId || reservation.conductorId));

  const otherPartyName = isPassengerUser
    ? (reservation.driverName || reservation.driver || "Conductor")
    : (reservation.passengerName || reservation.name || "Pasajero");

  useEffect(() => {
    if (!reservationId) return;
    const unsub = chatService.listenMessages(reservationId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });
    return () => unsub();
  }, [reservationId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    setLoading(true);
    try {
      await chatService.sendMessage(reservationId, role.uid, inputText);
      setInputText('');
    } catch (error) {
      alert("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Chat con ${otherPartyName}`}
      maxWidth="max-w-md"
      className="!bg-[#061426] h-[80vh] flex flex-col"
    >
      <div className="flex flex-col h-full bg-[#061426]">

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-40 space-y-4">
              <MessageSquare size={48} />
              <p className="text-sm font-bold uppercase tracking-widest">Sin mensajes aún</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                isMe={msg.senderId === role.uid}
              />
            ))
          )}
        </div>

        {/* Input Area (Android Style) */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-[#0A1F30] border-t border-white/5 flex items-center gap-3 shrink-0"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full bg-[#061426] border border-white/10 rounded-full py-3 px-6 text-white text-sm focus:border-primary-500 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-[#061426] shadow-lg shadow-primary-500/20 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </Modal>
  );
}

/** ⚛️ Molecule: ChatMessageItem */
function ChatMessageItem({ message, isMe }) {
  const formatTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} w-full animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`max-w-[80%] space-y-1`}>
        <div className={`
          px-4 py-3 rounded-2xl text-sm font-medium
          ${isMe
            ? 'bg-primary-500 text-[#061426] rounded-tr-none shadow-lg shadow-primary-500/10'
            : 'bg-[#0A1F30] text-white border border-white/5 rounded-tl-none'}
        `}>
          {message.text}
        </div>
        <div className={`flex items-center gap-1.5 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
          <Clock size={10} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
