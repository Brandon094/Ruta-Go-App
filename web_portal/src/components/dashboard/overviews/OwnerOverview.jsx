import React from 'react';
import { Activity, Bus, Calendar, Info, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { RouteProgressCard } from '../RouteProgressCard';
import { ExecutiveHeader } from '../ExecutiveHeader';
import { FeatureCard } from '../FeatureCard';
import { MetricGrid } from '../MetricGrid';
import { InfoTip } from '../InfoTip';

/**
 * 💼 Component: OwnerOverview
 * Vista ejecutiva para el Socio/Dueño de Flota.
 */
export function OwnerOverview({ stats, routeStats, role }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🏛️ ORGANISMO: ExecutiveHeader (DRY) */}
      <ExecutiveHeader
        icon={Briefcase}
        title="Dashboard Corporativo"
        subtitle="Socio del Holding"
        badgeText="Cuenta Premium"
        badgeVariant="info"
      >
        {/* ⚛️ Molecule: MetricGrid (Atomic Refactor) */}
        <MetricGrid cols={3}>
          <SummaryMetric label="Mis Vehículos" value={stats.totalVehicles} icon={<Bus size={18} className="text-primary-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <SummaryMetric label="Reservas Hoy" value={stats.todayReservations} icon={<Calendar size={18} className="text-purple-500 mb-1"/>} color="text-[#061426] dark:text-white" />
          <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 pt-4 md:pt-0 md:pl-4 lg:pl-8">
            <SummaryMetric label="Ingresos de Flota" value={stats.totalRevenue} icon={<Activity size={18} className="text-green-500 mb-1"/>} color="text-green-600 dark:text-green-400" isCurrency={true} />
          </div>
        </MetricGrid>
      </ExecutiveHeader>

      <div className="max-w-7xl mx-auto pt-6 px-2 lg:px-0 space-y-12">

        {/* 🛣️ SECCIÓN: OCUPACIÓN POR RUTA */}
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Activity className="text-primary-500" size={20} />
                  <h3 className="text-lg font-black text-[#061426] dark:text-white uppercase italic tracking-tight">Ocupación de mi Flota</h3>
               </div>
               <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest italic">Live Sync</span>
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
          icon={TrendingUp}
          title="Rendimiento de Activos"
          description="Estamos integrando el motor de Contabilidad Premium para que gestiones gastos de combustible y mantenimiento directamente."
          tags={["Utilidad", "Gastos"]}
        />

        {/* ⚛️ Molecule: InfoTip (Atomic Refactor) */}
        <InfoTip
          title="Sugerencia Operativa"
          message="Mantén tus vehículos al día en la pestaña 'Mi Flota' para asegurar que la disponibilidad en la App sea siempre del 100%."
        />
      </div>
    </div>
  );
}
