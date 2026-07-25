import React from 'react';
import { ShieldCheck, Users, Bus, Calendar, Activity } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ExecutiveHeader } from '../ExecutiveHeader';
import { FeatureCard } from '../FeatureCard';
import { MetricGrid } from '../MetricGrid';
import { RouteProgressCard } from '../RouteProgressCard';
import { InfoTip } from '../InfoTip';
import { MapPin } from 'lucide-react';

/**
 * 👑 Component: AdminOverview
 * Vista analítica maestra para el Administrador Root.
 */
export function AdminOverview({ stats, routeStats }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🏛️ ORGANISMO: ExecutiveHeader (DRY) */}
      <ExecutiveHeader
        icon={ShieldCheck}
        badgeText="Sistema Operativo"
        badgeVariant="warning"
      >
        {/* ⚛️ Molecule: MetricGrid (Atomic Refactor) */}
        <MetricGrid cols={5}>
          <SummaryMetric label="Usuarios" value={stats.totalUsers} icon={<Users size={18} className="text-blue-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <SummaryMetric label="Socios" value={stats.totalOwners} icon={<Users size={18} className="text-amber-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <SummaryMetric label="En Ruta" value={stats.activeDrivers} icon={<Bus size={18} className="text-green-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <SummaryMetric label="Reservas" value={stats.todayReservations} icon={<Calendar size={18} className="text-purple-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 pt-4 md:pt-0 md:pl-4 lg:pl-8">
            <SummaryMetric label="Ingresos Totales" value={stats.totalRevenue} icon={<Activity size={18} className="text-primary-500 mb-1"/>} color="text-green-600 dark:text-green-400" isCurrency={true} />
          </div>
        </MetricGrid>
      </ExecutiveHeader>

      <div className="max-w-7xl mx-auto pt-6 px-2 lg:px-0 space-y-12">

        {/* 🛣️ SECCIÓN: OCUPACIÓN GLOBAL (DRY con Owner) */}
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Activity className="text-primary-500" size={20} />
                  <h3 className="text-lg font-black text-[#061426] dark:text-white uppercase italic tracking-tight">Ocupación Global</h3>
               </div>
               <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest italic">Consolidado Total</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              <RouteProgressCard
                name="Nátaga → La Plata"
                reservations={routeStats.toLaPlata.reservations}
                available={routeStats.toLaPlata.seats}
                icon={<MapPin className="text-orange-500" size={20} />}
                color="bg-orange-500"
              />
              <RouteProgressCard
                name="La Plata → Nátaga"
                reservations={routeStats.toNataga.reservations}
                available={routeStats.toNataga.seats}
                icon={<MapPin className="text-blue-500" size={20} />}
                color="bg-blue-500"
              />
            </div>
         </div>

        {/* 🏛️ ORGANISMO: FeatureCard */}
        <FeatureCard
          icon={Activity}
          title="Inteligencia de Datos"
          description="Estamos procesando los modelos predictivos para habilitar el motor de analítica avanzada. Próximamente podrás visualizar flujos de demanda y mapas de calor."
          tags={["Predicción", "Ocupación", "Finanzas"]}
        />

        {/* ⚛️ Molecule: InfoTip (Atomic Refactor) */}
        <InfoTip
          title="Estado del Sistema"
          message="La base de datos se encuentra sincronizada. Todos los nodos operativos (RTDB) están respondiendo en menos de 200ms."
        />
      </div>
    </div>
  );
}
