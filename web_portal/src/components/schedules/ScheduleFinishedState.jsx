import React from 'react';
import { Clock } from 'lucide-react';

/**
 * ⚛️ Molecule: ScheduleFinishedState
 * Pantalla de feedback visual cuando todos los horarios del día han finalizado.
 * Paridad 1:1 con fragment_horarios.xml de Android.
 */
export function ScheduleFinishedState() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-2 animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-white dark:bg-[#061929] rounded-[2.5rem] border border-primary-500/30 p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
        <div className="flex flex-col items-center max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-inner">
            <Clock size={44} />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-primary-500 uppercase italic tracking-tight">
            ¡Jornada Completada!
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
            Todos los horarios de hoy han finalizado. Las reservas para mañana estarán disponibles a partir de las <span className="font-bold text-primary-500">7:00 PM</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
