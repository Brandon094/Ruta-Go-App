import React, { useState } from 'react';
import { Briefcase, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ContactInfo } from '../ui/ContactInfo';
import { ownerService } from '../../services/ownerService';

/**
 * ⚛️ Molecule: OwnerCard
 * Permite gestionar el estatus de un Socio de Flota.
 * Diseño expansible para optimizar espacio.
 */
export function OwnerCard({ owner, userProfile }) {
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isApproved = owner.status === true;

  const handleToggleStatus = async (e) => {
    e.stopPropagation(); // Evitar que el click en el botón active el toggle del card
    setLoading(true);
    try {
      await ownerService.toggleOwnerStatus(owner.id, isApproved);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar estado del socio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none cursor-pointer"
    >

      {/* Identidad - Siempre visible */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-colors ${
            isApproved ? 'bg-green-50 dark:bg-green-500/10 text-green-600' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'
          }`}>
            <Briefcase size={28} />
          </div>
          <div className="min-w-0 text-left">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {userProfile?.nombre || 'Socio sin nombre'}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">
                ID: {owner.id.substring(0, 8)}...
              </p>
              {isExpanded ? <ChevronUp size={14} className="text-primary-500" /> : <ChevronDown size={14} className="text-slate-300" />}
            </div>
          </div>
        </div>
        <Badge variant={isApproved ? 'success' : 'warning'} className="shrink-0">
          {isApproved ? 'Activo' : 'Pendiente'}
        </Badge>
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
          {/* Información de Contacto (DRY) */}
          <ContactInfo
            email={userProfile?.email}
            phone={userProfile?.telefono}
            className="text-left border-t border-slate-50 dark:border-white/5 pt-6"
          />

          {/* Acción Administrativa */}
          <Button
            onClick={handleToggleStatus}
            isLoading={loading}
            variant={isApproved ? 'danger' : 'primary'}
            size="full"
            icon={isApproved ? XCircle : CheckCircle2}
            className="!rounded-2xl shadow-lg"
          >
            {isApproved ? 'Revocar Acceso' : 'Aprobar Socio'}
          </Button>
        </div>
      )}
    </div>
  );
}
