import React, { useState, useEffect, useMemo } from 'react';
import { onValue } from 'firebase/database';
import { Clock, Bus, ChevronRight, Info, Zap, MapPin, Tag } from 'lucide-react';
import firebaseManager from '../../firebase';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🚌 Component: LandingSchedules (Lead Magnet - Atomic Organism)
 * Muestra los horarios disponibles en tiempo real con selector dinámico por ruta.
 * Sigue Atomic Design, DRY y responsive UX.
 */
export function LandingSchedules({ onReserve }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRoute, setActiveRoute] = useState('Nátaga ➔ La Plata');

  useEffect(() => {
    const schedulesRef = firebaseManager.getRef('schedules');
    const unsub = onValue(schedulesRef, (snap) => {
      let data = [];
      if (snap.exists()) {
        data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
      } else {
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

  // Extraer las rutas disponibles dinámicamente
  const availableRoutes = useMemo(() => {
    const routeSet = new Set(['Nátaga ➔ La Plata', 'La Plata ➔ Nátaga']);
    schedules.forEach(s => {
      const r = s.route || s.ruta;
      if (r) {
        routeSet.add(r.replace(/->/g, '➔').trim());
      }
    });
    return Array.from(routeSet);
  }, [schedules]);

  // Filtrar los horarios según la ruta activa
  const filteredSchedules = useMemo(() => {
    return FormatUtils.filterSchedulesByRoute(schedules, activeRoute);
  }, [schedules, activeRoute]);

  // Fallback si la lista está vacía
  const fallbackSchedules = [
    { id: 'fb1', time: '06:15 AM', route: 'Nátaga -> La Plata', price: '12000' },
    { id: 'fb2', time: '07:30 AM', route: 'Nátaga -> La Plata', price: '12000' },
    { id: 'fb3', time: '08:30 AM', route: 'Nátaga -> La Plata', price: '12000' },
    { id: 'fb4', time: '11:00 AM', route: 'Nátaga -> La Plata', price: '12000' }
  ];

  const displayList = filteredSchedules.length > 0 ? filteredSchedules : fallbackSchedules;

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] dark:bg-transparent relative overflow-hidden transition-colors duration-300">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <header className="max-w-3xl space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20">
            <Zap size={12} fill="currentColor" /> Disponibilidad en Tiempo Real
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#061426] dark:text-white tracking-tight uppercase italic leading-[0.95]">
            Tu viaje comienza <br /> <span className="text-primary-500">aquí y ahora.</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 font-medium text-base md:text-lg leading-relaxed border-l-4 border-primary-500 pl-6">
            Selecciona la ruta de tu interés para consultar los próximos despachos disponibles y asegura tu puesto en segundos.
          </p>
        </header>

        {/* 🎛️ SELECTOR ATÓMICO DE RUTAS (TABS CHIPS) */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#061929] p-2 rounded-3xl border border-slate-200 dark:border-white/5 shadow-md">
          {availableRoutes.map((routeName, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveRoute(routeName)}
              className={`flex-1 min-w-[140px] px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeRoute === routeName
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 scale-[1.02]'
                  : 'text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {routeName}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveRoute('all')}
            className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              activeRoute === 'all'
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 scale-[1.02]'
                : 'text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Todas las Rutas
          </button>
        </div>

        {/* 🕒 GRID DE HORARIOS ORGANIZADOS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Bus className="text-primary-500" size={20} />
              <span className="text-xs font-black uppercase tracking-widest text-[#061426] dark:text-white italic">
                {activeRoute === 'all' ? 'Todas las Salidas del Día' : `Despachos para: ${activeRoute}`}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">
              {displayList.length} Salidas Registradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-100 dark:bg-white/5 animate-pulse rounded-[2.5rem]"></div>
              ))
            ) : (
              displayList.map((s, idx) => {
                const timeStr = s.time || s.hora || '08:00 AM';
                const routeName = (s.route || s.ruta || 'Nátaga ➔ La Plata').replace(/->/g, '➔');
                const price = s.price || s.precio || 12000;
                const hasDriver = !!(s.driverId || s.conductorId);

                return (
                  <div
                    key={s.id || idx}
                    className="flex flex-col justify-between p-6 bg-white dark:bg-[#061929] rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-primary-500/50 transition-all duration-300 group shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 space-y-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-inner group-hover:scale-110 transition-transform">
                          <Clock size={24} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-2xl font-black text-[#061426] dark:text-white tracking-tight uppercase italic">{timeStr}</span>
                          <span className="text-[10px] font-black uppercase text-primary-500 tracking-wider truncate max-w-[150px]">
                            {routeName}
                          </span>
                        </div>
                      </div>

                      <Badge variant={hasDriver ? 'success' : 'warning'}>
                        {hasDriver ? 'Disponible' : 'Sin Conductor'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-1.5 font-black text-[#061426] dark:text-white text-sm">
                        <Tag size={16} className="text-primary-500" />
                        <span>{FormatUtils.formatPrice(price)}</span>
                      </div>

                      <Button
                        onClick={onReserve}
                        size="sm"
                        variant="primary"
                        className="!rounded-2xl px-6 py-3 text-xs shadow-lg shadow-primary-500/20"
                      >
                        Reservar <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* FOOTER LEAD MAGNET */}
        <footer className="mt-16 p-8 md:p-12 bg-[#061426] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-primary-500 shadow-inner">
                 <Info size={32} />
              </div>
              <div className="text-left">
                 <h4 className="text-xl font-black uppercase italic tracking-tight">¿Planeas un viaje especial o grupal?</h4>
                 <p className="text-white/50 text-sm font-medium mt-1">Regístrate en Ruta-Go para acceder a reservaciones preferenciales y beneficios corporativos.</p>
              </div>
           </div>
           <Button onClick={onReserve} variant="primary" className="!bg-white !text-[#061426] !rounded-2xl px-12 py-5 text-xs font-black uppercase tracking-wider relative z-10 shadow-none hover:!scale-105 shrink-0">
              Registrarme Gratis
           </Button>
        </footer>
      </div>
    </section>
  );
}
