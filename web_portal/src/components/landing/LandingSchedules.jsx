import React, { useState, useEffect } from 'react';
import { onValue } from 'firebase/database';
import { Clock, Bus, ChevronRight, Info, Zap } from 'lucide-react';
import firebaseManager from '../../firebase';
import { Button } from '../ui/Button';

/**
 * 🚌 Component: LandingSchedules (Lead Magnet)
 * Muestra los horarios disponibles en tiempo real para captar el interés.
 * v1.9.9.5 - Optimización SEO y UX.
 */
export function LandingSchedules({ onReserve }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const schedulesRef = firebaseManager.getRef('horarios');
    const unsub = onValue(schedulesRef, (snap) => {
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));

        const getMinutes = (h) => {
          if (!h) return 0;
          const [time, ampm] = h.split(' ');
          if (!time || !ampm) return 0;
          let [hrs, mins] = time.split(':').map(Number);
          if (ampm === 'PM' && hrs < 12) hrs += 12;
          if (ampm === 'AM' && hrs === 12) hrs = 0;
          return hrs * 60 + mins;
        };

        const sorted = data.sort((a, b) => getMinutes(a.hora) - getMinutes(b.hora));
        setSchedules(sorted);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filterRoute = (from, to) => schedules.filter(s => {
    const r = s.ruta?.toLowerCase() || "";
    return r.includes(from) && r.includes(to) && r.split(/➔|->/)[1]?.includes(to);
  });

  const routeA = filterRoute('nataga', 'la plata');
  const routeB = filterRoute('la plata', 'nataga');

  // Fallbacks si no hay datos vivos
  const fallbackA = [{ hora: "05:00 AM" }, { hora: "08:00 AM" }, { hora: "10:30 AM" }, { hora: "01:00 PM" }, { hora: "03:00 PM" }];
  const fallbackB = [{ hora: "06:30 AM" }, { hora: "09:30 AM" }, { hora: "12:00 PM" }, { hora: "02:30 PM" }, { hora: "05:00 PM" }];

  const renderList = (title, list, isReverse = false) => (
    <div className="flex flex-col gap-6">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border w-fit ${isReverse ? 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-500/5 dark:border-orange-500/20 dark:text-orange-400' : 'bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-500/5 dark:border-blue-500/20 dark:text-blue-400'}`}>
        <Bus size={18} />
        <h3 className="text-sm font-black uppercase italic tracking-widest">{title}</h3>
      </div>

      <div className="grid gap-3">
        {(list.length > 0 ? list : (isReverse ? fallbackB : fallbackA)).map((s, idx) => (
          <div
            key={s.id || idx}
            className="flex items-center justify-between p-4 md:p-5 bg-white dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-primary-500/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary-500/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 border border-slate-100 dark:border-white/10 group-hover:rotate-12 transition-all">
                <Clock size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#061426] dark:text-white tracking-tighter uppercase italic">{s.hora}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Disponible</span>
                </div>
              </div>
            </div>

            <Button onClick={onReserve} size="sm" variant={isReverse ? 'primary' : 'outline'} className="!rounded-xl px-6 py-3 text-[10px]">
               Reservar <ChevronRight size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] dark:bg-transparent relative overflow-hidden transition-colors duration-300">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20">
            <Zap size={12} fill="currentColor" /> Disponibilidad Hoy
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#061426] dark:text-white tracking-tight uppercase italic leading-[0.95]">
            Tu viaje comienza <br /> <span className="text-primary-500">aquí y ahora.</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 font-medium text-base md:text-lg leading-relaxed border-l-4 border-primary-500 pl-6">
            No pierdas más tiempo esperando en la calle. Consulta los próximos despachos y asegura tu lugar antes de que se agoten.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {renderList("Nátaga ➔ La Plata", routeA)}
          {renderList("La Plata ➔ Nátaga", routeB, true)}
        </div>

        <footer className="mt-20 md:mt-28 p-8 md:p-12 bg-[#061426] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-primary-500 shadow-inner">
                 <Info size={32} />
              </div>
              <div className="text-left">
                 <h4 className="text-xl font-black uppercase italic tracking-tight">¿Necesitas un viaje especial?</h4>
                 <p className="text-white/50 text-sm font-medium mt-1">Regístrate para acceder a servicios personalizados y puntos de fidelidad.</p>
              </div>
           </div>
           <Button onClick={onReserve} variant="primary" className="!bg-white !text-[#061426] !rounded-2xl px-12 py-6 text-sm relative z-10 shadow-none hover:!scale-105">
              Registrarme Ahora
           </Button>
        </footer>
      </div>
    </section>
  );
}
