import React, { useState } from 'react';
import { Star, X, Loader2, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { reservationService } from '../../services/reservationService';

/**
 * ⭐ Organism: RatingModal
 * UI Espejo del diálogo 'dialog_calificar_viaje.xml' de Android.
 */
export function RatingModal({ reservation, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Por favor selecciona una puntuación.");
      return;
    }

    setLoading(true);
    try {
      await reservationService.rateReservation(reservation, rating, comment);
      onClose();
    } catch (error) {
      alert("Error al calificar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#061426]/95 backdrop-blur-xl" onClick={onClose} />

      <div className="relative max-w-sm w-full bg-[#0A1F30] rounded-[3rem] p-8 text-center space-y-8 animate-in zoom-in-95 duration-300 border border-white/5 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">¿Cómo fue tu viaje?</h2>
          <p className="text-slate-400 text-sm font-medium">Califica a tu conductor <span className="text-primary-500 font-bold">{reservation.driver || "Conductor"}</span></p>
        </div>

        {/* Stars Selector (Átomo Interactivo) */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transform transition-all active:scale-90"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              <Star
                size={36}
                className={`transition-colors duration-200 ${
                  (hover || rating) >= star
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-700'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment Molecule */}
        <div className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comentarios opcionales..."
            className="w-full bg-[#061426] border border-white/5 rounded-2xl p-4 text-white text-sm focus:border-primary-500 outline-none transition-all resize-none min-h-[100px]"
          />
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="full"
            className="rounded-2xl py-5 uppercase font-black tracking-widest"
            onClick={handleSubmit}
            disabled={loading || rating === 0}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" size={24} />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send size={18} /> Enviar Calificación
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
