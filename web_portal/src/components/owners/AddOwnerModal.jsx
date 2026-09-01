import React, { useState } from 'react';
import { Mail, UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ownerService } from '../../services/ownerService';

/**
 * ⚛️ Component: AddOwnerModal
 * Permite al Admin Root ascender súper-poderes a cualquier usuario existente ingresando su correo o seleccionándolo de la lista.
 */
export function AddOwnerModal({ isOpen, onClose, users = [], onSuccess }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  // Filtrar lista de usuarios candidatos (que no sean admin ni ya sean owners)
  const candidateUsers = users.filter(u => {
    const r = (u.role || u.rol || "").toLowerCase();
    return r !== "admin" && r !== "owner";
  });

  const handleSelectUser = (uId) => {
    setSelectedUserId(uId);
    const u = candidateUsers.find(candidate => candidate.id === uId);
    if (u && u.email) {
      setEmail(u.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Por favor selecciona un usuario o ingresa un correo electrónico.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await ownerService.promoteUserToOwnerByEmail(email.trim());
      setSuccessMsg(`¡El usuario ${res.userName} ha sido ascendido exitosamente a Socio de Flota!`);
      setEmail('');
      setSelectedUserId('');
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ascender Usuario a Socio de Flota">
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">

        <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
            <ShieldCheck size={16} /> Permiso de Administrador Maestro
          </div>
          <p className="text-[11px] text-slate-500 dark:text-white/60 leading-relaxed font-medium">
            Selecciona un usuario registrado o ingresa su correo. El sistema otorgará inmediatamente el rol de <strong className="text-slate-800 dark:text-white">Socio (`role: owner`)</strong> y habilitará su panel de gestión de flota.
          </p>
        </div>

        {/* SELECTOR DESPLEGABLE DIRECTO DE USUARIOS */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60">
            Seleccionar Usuario Registrado ({candidateUsers.length} disponibles)
          </label>
          <select
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
            value={selectedUserId}
            onChange={(e) => handleSelectUser(e.target.value)}
          >
            <option value="">-- Seleccionar Usuario de la Lista --</option>
            {candidateUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.nombre || 'Usuario sin Nombre'} - {u.email} (Rol: {u.role || u.rol || 'pasajero'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
            O ingresar Correo Electrónico
          </label>
          <Input
            type="email"
            icon={<Mail size={18} className="text-primary-500" />}
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(val) => setEmail(val)}
            list="users-email-list"
            required
          />
          <datalist id="users-email-list">
            {candidateUsers.map((u) => (
              <option key={u.id} value={u.email}>
                {u.name || u.nombre || 'Usuario'} ({u.email})
              </option>
            ))}
          </datalist>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase flex items-center gap-3 animate-shake">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 text-[10px] font-black uppercase flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
            {successMsg}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="px-8 shadow-lg shadow-[#FF7A1A]/20">
            <UserPlus size={18} className="mr-2" />
            Ascender a Socio
          </Button>
        </div>
      </form>
    </Modal>
  );
}
