import React from 'react';
import { ShieldCheck, Users, Bus, Calendar, Activity } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { Badge } from '../../ui/Badge';

export function AdminOverview({ stats }) {
  const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 👑 HEADER MAESTRO (Adaptativo) */}
      <div className="bg-white dark:bg-[#061426] -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-500/10 rounded-[2.5rem] border-2 border-primary-500/20 p-1 flex items-center justify-center shadow-inner">
               <div className="w-full h-full bg-secondary-900 dark:bg-white/10 rounded-[2.3rem] flex items-center justify-center text-primary-500 font-black text-xl lg:text-2xl shadow-sm">
                 <ShieldCheck size={32} />
               </div>
            </div>
            <div className="text-[#061426] dark:text-white">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60 italic">Administrador Root</p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">Panel de Control Maestro</h2>
            </div>
          </div>
          <Badge variant="warning" className="!bg-primary-500 !text-white !border-transparent shadow-xl shadow-primary-500/20 hidden sm:flex items-center gap-3 !px-5 !py-2">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
             Sistema Operativo
          </Badge>
        </div>

        {/* 📊 GLOBAL KPI BAR */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 lg:p-8 shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-8">
              <SummaryMetric label="Usuarios" value={stats.totalUsers} icon={<Users size={18} className="text-blue-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Socios" value={stats.totalOwners} icon={<Users size={18} className="text-amber-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="En Ruta" value={stats.activeDrivers} icon={<Bus size={18} className="text-green-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Reservas" value={stats.todayReservations} icon={<Calendar size={18} className="text-purple-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 pt-4 md:pt-0 md:pl-4 lg:pl-8">
                <SummaryMetric label="Ingresos Totales" value={formatCurrency(stats.totalRevenue)} icon={<Activity size={18} className="text-primary-500 mb-1"/>} color="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 px-2 lg:px-0">
        <div className="grid grid-cols-1 gap-8">
          {/* Módulo de Gráficas Estilizado */}
          <div className="card-base p-12 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center space-y-6 group hover:border-primary-500/50 transition-all duration-500 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-white/5">
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform duration-500">
              <Activity size={40} className="animate-pulse" />
            </div>
            <div className="max-w-md space-y-2">
              <h4 className="text-xl font-black text-[#061426] dark:text-white uppercase italic tracking-tight">Inteligencia de Datos</h4>
              <p className="text-sm font-medium text-slate-500 dark:text-white/40">
                Estamos procesando los modelos predictivos para habilitar el motor de analítica avanzada.
                Próximamente podrás visualizar flujos de demanda y mapas de calor.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest border border-slate-200 dark:border-white/5">Predicción</div>
              <div className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest border border-slate-200 dark:border-white/5">Ocupación</div>
              <div className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest border border-slate-200 dark:border-white/5">Finanzas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
