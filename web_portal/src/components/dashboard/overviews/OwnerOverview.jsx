import React from 'react';
import { Activity, Bus, Calendar, Info, MapPin } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { OwnerRouteProgressCard } from '../OwnerRouteProgressCard';
import { Badge } from '../../ui/Badge';

export function OwnerOverview({ stats, routeStats, role }) {
  const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🏙️ HEADER EJECUTIVO (Adaptativo) */}
      <div className="bg-white dark:bg-[#061426] -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-500/20 rounded-[2rem] border-2 border-primary-500/30 p-1 flex items-center justify-center shadow-inner">
               <div className="w-full h-full bg-primary-500 rounded-[1.8rem] flex items-center justify-center text-white font-black text-xl lg:text-2xl shadow-sm">
                 {role?.uid?.substring(0, 1).toUpperCase() || 'S'}
               </div>
            </div>
            <div className="text-[#061426] dark:text-white">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60 italic">Socio de Flota</p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">Dashboard Corporativo</h2>
            </div>
          </div>
          <Badge variant="info" className="!bg-slate-100 dark:!bg-white/5 !text-primary-500 !border-slate-200 dark:!border-white/10 shadow-xl hidden sm:block">
             Sesión Premium
          </Badge>
        </div>

        {/* 📊 KPI BAR (Glassmorphism Adaptativo) */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 lg:p-8 shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Vehículos" value={stats.totalVehicles} icon={<Bus size={18} className="text-primary-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Reservas" value={stats.todayReservations} icon={<Calendar size={18} className="text-purple-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Ganancias" value={formatCurrency(stats.totalRevenue)} icon={<Activity size={18} className="text-green-500 mb-1"/>} color="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-6 space-y-12 pb-10">
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Activity className="text-primary-500" size={20} />
                  <h3 className="text-lg font-black text-[#061426] dark:text-white uppercase italic tracking-tight">Ocupación por Ruta</h3>
               </div>
               <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">En tiempo real</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              <OwnerRouteProgressCard
                name="Nátaga → La Plata"
                reservations={routeStats.toLaPlata.reservations}
                available={routeStats.toLaPlata.seats}
                icon={<MapPin className="text-orange-500" size={20} />}
                color="bg-orange-500"
              />
              <OwnerRouteProgressCard
                name="La Plata → Nátaga"
                reservations={routeStats.toNataga.reservations}
                available={routeStats.toNataga.seats}
                icon={<MapPin className="text-blue-500" size={20} />}
                color="bg-blue-500"
              />
            </div>
         </div>

         {/* Tip de Valor para el Owner */}
         <div className="mx-2 p-6 bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/10 dark:border-primary-500/20 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shrink-0">
               <Info size={24} />
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-white/60">
               <span className="font-black text-primary-500 uppercase mr-1">Sugerencia Operativa:</span>
               Monitorea el porcentaje de ocupación para ajustar tus despachos. Una ocupación superior al <span className="font-bold text-[#061426] dark:text-white">80%</span> indica necesidad de reforzar la ruta.
            </p>
         </div>
      </div>
    </div>
  );
}
