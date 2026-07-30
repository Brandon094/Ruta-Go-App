import React from 'react';
import { Clock } from 'lucide-react';

/**
 * ⚛️ Molecule: ScheduleFinishedState
 * Pantalla de feedback visual cuando todos los horarios del día han finalizado.
 * Paridad 1:1 con fragment_horarios.xml de Android.
 */
export function ScheduleFinishedState() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-2 animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-white dark:bg-secondary-800 rounded-[2.5rem] border border-primary-500 p-12 md:p-20 text-center shadow-lg">
        <div className="flex flex-col items-center max-w-lg mx-auto">
          <Clock size={80} className="text-primary-500" />

          <h3 className="text-2xl md:text-3xl font-black text-primary-500 mt-8 uppercase italic tracking-tighter">
            ¡Jornada Completada!
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-4 leading-relaxed font-medium">
            Todos los horarios de hoy han finalizado. Las reservas para mañana estarán disponibles a partir de las <span className="font-bold text-primary-500">7:00 PM</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
