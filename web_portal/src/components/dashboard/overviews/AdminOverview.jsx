import React from 'react';
import { ShieldCheck, Users, Bus, Calendar, Activity } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ExecutiveHeader } from '../ExecutiveHeader';
import { FeatureCard } from '../FeatureCard';
import { MetricGrid } from '../MetricGrid';

/**
 * 👑 Component: AdminOverview
 * Vista analítica maestra para el Administrador Root.
 */
export function AdminOverview({ stats }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🏛️ ORGANISMO: ExecutiveHeader (DRY) */}
      <ExecutiveHeader
        icon={ShieldCheck}
        title="Panel de Control Maestro"
        subtitle="Administrador Root"
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

      <div className="max-w-7xl mx-auto pt-6 px-2 lg:px-0">
        {/* 🏛️ ORGANISMO: FeatureCard (DRY) */}
        <FeatureCard
          icon={Activity}
          title="Inteligencia de Datos"
          description="Estamos procesando los modelos predictivos para habilitar el motor de analítica avanzada. Próximamente podrás visualizar flujos de demanda y mapas de calor."
          tags={["Predicción", "Ocupación", "Finanzas"]}
        />
      </div>
    </div>
  );
}
