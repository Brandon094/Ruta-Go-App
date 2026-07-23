import React, { useState } from 'react';
import { Briefcase, Mail, Phone, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ref, set, update } from "firebase/database";
import { db } from '../../firebase';

/**
 * 💼 Component: OwnerCard
 * Permite gestionar el estatus de un Socio de Flota.
 */
export function OwnerCard({ owner, userProfile }) {
  const [loading, setLoading] = useState(false);
  const isApproved = owner.status === true;
  const isPending = owner.status === 'pendiente' || !isApproved;

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = !isApproved;

      // 1. Actualizar en el nodo /dueños
      await set(ref(db, `dueños/${owner.id}`), newStatus);

      // 2. Sincronizar el rol en /usuarios para que el login detecte el cambio
      await update(ref(db, `usuarios/${owner.id}`), {
        rol: newStatus ? 'dueño' : 'dueño_pendiente'
      });

    } catch (error) {
      console.error("Error cambiando estado del dueño:", error);
      alert("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-base p-6 rounded-[2rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none">

      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-colors ${
            isApproved ? 'bg-green-50 dark:bg-green-500/10 text-green-600' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'
          }`}>
            <Briefcase size={28} />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {userProfile?.nombre || 'Socio sin nombre'}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest mt-1">
              ID: {owner.id.substring(0, 8)}...
            </p>
          </div>
        </div>
        <Badge variant={isApproved ? 'success' : 'warning'}>
          {isApproved ? 'Activo' : 'Pendiente'}
        </Badge>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
          <Mail size={14} className="text-primary-500" />
          <span className="truncate font-medium">{userProfile?.email || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
          <Phone size={14} className="text-primary-500" />
          <span className="font-medium">{userProfile?.telefono || '---'}</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={handleToggleStatus}
        isLoading={loading}
        variant={isApproved ? 'danger' : 'primary'}
        size="full"
        icon={isApproved ? XCircle : CheckCircle2}
      >
        {isApproved ? 'Revocar Acceso Socio' : 'Aprobar como Socio'}
      </Button>
    </div>
  );
}
