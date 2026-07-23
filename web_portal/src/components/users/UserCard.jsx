import React, { useState } from 'react';
import { User, Mail, Phone, Trash2, Award, Ban, ShieldOff, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ref, update, remove } from "firebase/database";
import { db } from '../../firebase';

export function UserCard({ user, adminRole }) {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const isAdmin = adminRole?.type === 'ADMIN';
  const hasRequestedDeletion = user.solicitudBorrado === true;
  const isInactive = user.status === 'inactive';
  const isBanned = user.status === 'banned';

  const handleUpdateStatus = async (newStatus) => {
    if (!window.confirm(`¿Seguro que deseas cambiar el estado de ${user.nombre} a ${newStatus}?`)) return;
    setLoading(true);
    try {
      await update(ref(db, `usuarios/${user.id}`), { status: newStatus });
    } catch (error) {
      console.error(error);
      alert("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm(`⚠️ ADVERTENCIA: ¿Estás TOTALMENTE SEGURO de eliminar a ${user.nombre}? Esta acción es irreversible.`)) return;
    setLoading(true);
    try {
      await remove(ref(db, `usuarios/${user.id}`));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group ${hasRequestedDeletion ? 'opacity-60 grayscale-[0.5]' : ''} bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none shadow-xl transition-all duration-300`}>

      <div className="flex gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
          hasRequestedDeletion ? 'bg-red-50 dark:bg-red-500/10 text-red-400' :
          isBanned ? 'bg-black text-white' :
          isInactive ? 'bg-slate-100 text-slate-400' :
          'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
        }`}>
          <User size={28} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate leading-tight uppercase italic">
              {user.nombre || user.name || 'Usuario sin nombre'}
            </h4>
            <div className="flex gap-1 shrink-0">
              {isBanned && <Badge variant="error">Baneado</Badge>}
              {isInactive && <Badge variant="warning">Inactivo</Badge>}
              {hasRequestedDeletion ? (
                <Badge variant="error" icon={Trash2}>Borrado</Badge>
              ) : (
                !isBanned && !isInactive && <Badge variant="success">Activo</Badge>
              )}
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">
            {user.rol === 'dueño' ? 'Socio de Flota' : user.rol === 'conductor' ? 'Operador' : 'Pasajero'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
          <Mail size={14} className="text-primary-500" />
          <span className="truncate font-medium">{user.email || 'Sin correo'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
            <Phone size={14} className="text-primary-500" />
            <span className="font-medium">{user.telefono || user.phone || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 rounded-full border border-amber-100 dark:border-amber-500/20 shadow-sm">
            <Award size={12} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase tracking-tighter">{user.puntosGo || 0} pts</span>
          </div>
        </div>
      </div>

      {/* Admin Moderation Actions */}
      {isAdmin && (
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-50 dark:border-white/5 mt-2">
          {isBanned ? (
            <Button variant="success" size="sm" icon={CheckCircle2} onClick={() => handleUpdateStatus('active')} isLoading={loading}>
              Unban
            </Button>
          ) : (
            <Button variant="danger" size="sm" icon={Ban} onClick={() => handleUpdateStatus('banned')} isLoading={loading}>
              Ban
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={isInactive ? CheckCircle2 : ShieldOff}
            onClick={() => handleUpdateStatus(isInactive ? 'active' : 'inactive')}
            isLoading={loading}
          >
            {isInactive ? 'Activar' : 'Inactivar'}
          </Button>

          <Button variant="ghost" size="sm" icon={Trash2} onClick={handleDeleteUser} isLoading={loading} className="text-red-400 hover:text-red-600">
            Borrar
          </Button>
        </div>
      )}
    </div>
  );
}
