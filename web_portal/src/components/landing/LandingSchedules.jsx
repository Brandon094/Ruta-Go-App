import React, { useState, useEffect } from 'react';
import { onValue } from 'firebase/database';
import { Clock, Bus, ChevronRight, Info, Zap, Lock } from 'lucide-react';
import firebaseManager from '../../firebase';
import { Button } from '../ui/Button';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🚌 Component: LandingSchedules (Lead Magnet)
 * Muestra los horarios disponibles en tiempo real para captar el interés.
 * v1.9.9.5 - Optimización SEO y UX.
 */
export function LandingSchedules({ onReserve }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const schedulesRef = firebaseManager.getRef('schedules');
    const unsub = onValue(schedulesRef, (snap) => {
      let data = [];
      if (snap.exists()) {
        data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
      } else {
        // Fallback legado si no hay datos en /schedules/
        onValue(firebaseManager.getRef('horarios'), (legSnap) => {
          if (legSnap.exists()) {
            data = Object.entries(legSnap.val()).map(([id, val]) => ({ id, ...val }));
          }
        }, { onlyOnce: true });
      }

      const getMinutes = (hStr) => {
        if (!hStr) return 0;
        const [time, ampm] = hStr.split(' ');
        if (!time || !ampm) return 0;
        let [hrs, mins] = time.split(':').map(Number);
        if (ampm === 'PM' && hrs < 12) hrs += 12;
        if (ampm === 'AM' && hrs === 12) hrs = 0;
        return hrs * 60 + (mins || 0);
      };

      const sorted = data.sort((a, b) => getMinutes(a.time || a.hora) - getMinutes(b.time || b.hora));
      setSchedules(sorted);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const groupedRoutes = React.useMemo(() => {
    const map = {};
    schedules.forEach(s => {
      const routeName = (s.route || s.ruta || 'Nátaga ➔ La Plata').replace(/->/g, '➔').trim();
      if (!map[routeName]) map[routeName] = [];
      map[routeName].push(s);
    });

    if (!map['Nátaga ➔ La Plata']) map['Nátaga ➔ La Plata'] = [];
    if (!map['La Plata ➔ Nátaga']) map['La Plata ➔ Nátaga'] = [];

    return Object.entries(map);
  }, [schedules]);

  // Fallbacks si no hay datos vivos para las rutas principales
  const fallbackSchedules = [{ time: "05:00 AM" }, { time: "08:00 AM" }, { time: "10:30 AM" }, { time: "01:00 PM" }, { time: "03:00 PM" }];

  const renderList = (title, list, isReverse = false) => (
    <div key={title} className="flex flex-col gap-6">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border w-fit ${isReverse ? 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-500/5 dark:border-orange-500/20 dark:text-orange-400' : 'bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-500/5 dark:border-blue-500/20 dark:text-blue-400'}`}>
        <Bus size={18} />
        <h3 className="text-sm font-black uppercase italic tracking-widest">{title}</h3>
      </div>

      <div className="grid gap-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-white/5 animate-pulse rounded-[2rem]"></div>
          ))
        ) : (list.length > 0 ? list : fallbackSchedules).map((s, idx) => {
          const hasDriver = !!(s.driverId || s.conductorId);
          return (
            <div
              key={s.id || idx}
              className="flex items-center justify-between p-4 md:p-5 bg-white dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-primary-500/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary-500/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 border border-slate-100 dark:border-white/10 group-hover:rotate-12 transition-all">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-[#061426] dark:text-white tracking-tighter uppercase italic">{s.time || s.hora}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                     <div className={`w-1.5 h-1.5 rounded-full ${hasDriver ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       {hasDriver ? 'Disponible' : 'Sin Conductor'}
                     </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (!hasDriver) {
                    alert("⚠️ Este horario aún no tiene un conductor asignado. Por favor selecciona otro horario.");
                    return;
                  }
                  onReserve();
                }}
                disabled={!hasDriver}
                size="sm"
                variant={isReverse ? 'primary' : 'outline'}
                className="!rounded-xl px-6 py-3 text-[10px] disabled:opacity-40"
              >
                {hasDriver ? (
                  <>Reservar <ChevronRight size={14} className="ml-1" /></>
                ) : (
                  <>Bloqueado <Lock size={12} className="ml-1" /></>
                )}
              </Button>
            </div>
          );
        })}
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
          {groupedRoutes.map(([routeName, routeSchedules], idx) =>
            renderList(routeName, routeSchedules, idx % 2 !== 0)
          )}
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
