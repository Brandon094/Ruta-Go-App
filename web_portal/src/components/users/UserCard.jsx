import React, { useState } from 'react';
import { User, Trash2, Award, Ban, ShieldOff, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ContactInfo } from '../ui/ContactInfo';
import { userService } from '../../services/userService';

/**
 * ⚛️ Molecule: UserCard
 * Tarjeta de gestión de usuarios con diseño expansible y cumplimiento DRY.
 * Sincronizada con el ecosistema administrativo v1.7.9
 */
export function UserCard({ user, adminRole }) {
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!user) return null;

  const isAdmin = adminRole?.type === 'ADMIN';
  const hasRequestedDeletion = user.solicitudBorrado === true;
  const isInactive = user.status === 'inactive';
  const isBanned = user.status === 'banned';

  const handleUpdateStatus = async (e, newStatus) => {
    e.stopPropagation();
    if (!window.confirm(`¿Seguro que deseas cambiar el estado de ${user.nombre} a ${newStatus}?`)) return;
    setLoading(true);
    try {
      await userService.updateStatus(user.id, newStatus);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`⚠️ ADVERTENCIA: ¿Estás TOTALMENTE SEGURO de eliminar a ${user.nombre}? Esta acción es irreversible.`)) return;
    setLoading(true);
    try {
      await userService.deleteUser(user.id);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none cursor-pointer ${hasRequestedDeletion ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >

      {/* Identidad - Siempre visible */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
            hasRequestedDeletion ? 'bg-red-50 dark:bg-red-500/10 text-red-400' :
            isBanned ? 'bg-black text-white' :
            isInactive ? 'bg-slate-100 text-slate-400' :
            'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
          }`}>
            <User size={28} />
          </div>

          <div className="min-w-0 text-left">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate leading-tight uppercase italic">
              {user.nombre || user.name || 'Usuario sin nombre'}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">
                {user.rol === 'dueño' ? 'Socio de Flota' : user.rol === 'conductor' ? 'Operador' : 'Pasajero'}
              </p>
              {isExpanded ? <ChevronUp size={14} className="text-primary-500" /> : <ChevronDown size={14} className="text-slate-300" />}
            </div>
          </div>
        </div>

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

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300 border-t border-slate-50 dark:border-white/5 pt-6">
          <div className="flex justify-between items-center">
            <ContactInfo
              email={user.email}
              phone={user.telefono || user.phone}
              className="flex-1 text-left"
            />

            <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 rounded-full border border-amber-100 dark:border-amber-500/20 shadow-sm shrink-0">
              <Award size={12} className="text-amber-500" />
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase tracking-tighter">{user.puntosGo || 0} pts</span>
            </div>
          </div>

          {/* Admin Moderation Actions */}
          {isAdmin && (
            <div className="grid grid-cols-3 gap-3">
              {isBanned ? (
                <Button variant="success" size="sm" icon={CheckCircle2} onClick={(e) => handleUpdateStatus(e, 'active')} isLoading={loading} className="!py-3 !rounded-xl">
                  Unban
                </Button>
              ) : (
                <Button variant="danger" size="sm" icon={Ban} onClick={(e) => handleUpdateStatus(e, 'banned')} isLoading={loading} className="!py-3 !rounded-xl">
                  Ban
                </Button>
              )}

              <Button
                variant="secondary"
                size="sm"
                icon={isInactive ? CheckCircle2 : ShieldOff}
                onClick={(e) => handleUpdateStatus(e, isInactive ? 'active' : 'inactive')}
                isLoading={loading}
                className="!py-3 !rounded-xl"
              >
                {isInactive ? 'Activar' : 'Inactivar'}
              </Button>

              <Button variant="ghost" size="sm" icon={Trash2} onClick={handleDeleteUser} isLoading={loading} className="text-red-400 hover:text-red-600 !py-3 !rounded-xl">
                Borrar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
