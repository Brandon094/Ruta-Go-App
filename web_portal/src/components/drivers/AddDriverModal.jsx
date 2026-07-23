import React, { useState, useEffect } from 'react';
import { X, UserPlus, Bus, Save, Loader2, AlertCircle, CheckCircle2, Search, User, Mail, Hash, Calendar, Settings } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';

/**
 * 🚛 Component: AddDriverModal (Versión Humana por Email)
 *
 * Permite registrar un nuevo conductor buscando su perfil previo en la base de usuarios.
 */
export function AddDriverModal({ onClose, users, owners, currentUser, role }) {
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    placa: '',
    modelo: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.type === 'OWNER' ? currentUser.uid : ''
  });

  const isAdmin = role?.type === 'ADMIN';

  // Obtener perfiles de dueños aprobados para el selector
  const approvedOwners = owners
    .filter(o => o.status === true)
    .map(o => ({
      id: o.id,
      nombre: users.find(u => u.id === o.id)?.nombre || 'Socio sin nombre'
    }));

  // Efecto de búsqueda en tiempo real
  useEffect(() => {
    if (formData.email.includes('@')) {
      const match = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      setFoundUser(match || null);
    } else {
      setFoundUser(null);
    }
  }, [formData.email, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foundUser) {
      alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");
      return;
    }

    setLoading(true);
    try {
      const driverData = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        email: foundUser.email,
        telefono: foundUser.telefono || 'N/A',
        placaVehiculo: formData.placa,
        vehiculoId: formData.placa,
        horariosAsignados: []
      };

      const vehicleData = {
        id: formData.placa,
        placa: formData.placa,
        modelo: formData.modelo,
        ano: formData.ano,
        capacidad: parseInt(formData.capacidad),
        ownerId: formData.ownerId,
        driverId: foundUser.id
      };

      await driverService.registerDriverAndVehicle(driverData, vehicleData);
      alert("✅ Conductor vinculado y vehículo registrado exitosamente.");
      onClose();
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-secondary-800 w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-transparent dark:border-white/5 transition-colors duration-300">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Vincular Operador</h3>
              <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest mt-1">Gestión de Flota por Email</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 dark:text-white/20 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sección 1: Identificación */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-primary-500 rounded-full"></div> 1. Buscar Conductor
              </h4>

              <div className="space-y-4">
                <Input
                  label="Correo Electrónico"
                  placeholder="conductor@gmail.com"
                  type="email"
                  icon={<Mail size={18} />}
                  value={formData.email}
                  onChange={(val) => setFormData({...formData, email: val})}
                  required
                />

                {/* Feedback de Búsqueda */}
                <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                  foundUser
                    ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400'
                    : formData.email.includes('@')
                      ? 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400 dark:text-white/20'
                }`}>
                  {foundUser ? <CheckCircle2 size={18} /> : formData.email.includes('@') ? <AlertCircle size={18} /> : <Search size={18} />}
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-tight">
                      {foundUser ? 'Usuario Encontrado' : formData.email.includes('@') ? 'Usuario no registrado' : 'Esperando correo...'}
                    </p>
                    <p className="text-xs font-bold leading-none mt-1">
                      {foundUser ? foundUser.nombre : formData.email.includes('@') ? 'Dile que se registre en la App' : 'Escribe el email corporativo'}
                    </p>
                  </div>
                </div>
              </div>

              {foundUser && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                   <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 transition-colors duration-300">
                     <p className="text-[10px] text-slate-400 dark:text-white/40 font-black uppercase mb-1">Teléfono Registrado</p>
                     <p className="text-sm font-bold text-slate-700 dark:text-white">{foundUser.telefono || 'No proporcionado'}</p>
                   </div>
                </div>
              )}
            </div>

            {/* Sección 2: Datos del Vehículo */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-secondary-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-secondary-900 dark:bg-primary-500 rounded-full"></div> 2. Datos del Bus
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Placa" icon={<Hash size={18} />} placeholder="ABC-123" value={formData.placa} onChange={(val) => setFormData({...formData, placa: val.toUpperCase()})} required />
                <Input label="Año" icon={<Calendar size={18} />} type="number" value={formData.ano} onChange={(val) => setFormData({...formData, ano: val})} required />
              </div>

              <Input label="Modelo" icon={<Bus size={18} />} placeholder="Ej: Nissan Frontier" value={formData.modelo} onChange={(val) => setFormData({...formData, modelo: val})} required />
              <Input label="Capacidad" icon={<Settings size={18} />} type="number" value={formData.capacidad} onChange={(val) => setFormData({...formData, capacidad: val})} required />

              {isAdmin && (
                 <div className="space-y-1.5 group">
                   <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500">Asignar Dueño de Flota</label>
                   <div className="relative">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform pointer-events-none flex items-center justify-center">
                       <User size={18} />
                     </div>
                     <select
                       className="block w-full pl-14 pr-6 py-5 rounded-2xl font-bold border transition-all shadow-inner outline-none bg-slate-50 dark:bg-[#0A1F30] text-slate-800 dark:text-white border-slate-100 dark:border-white/5 focus:ring-2 ring-orange-500/20 focus:border-orange-500 appearance-none text-sm"
                       value={formData.ownerId}
                       onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
                       required
                     >
                       <option value="">Seleccionar Socio...</option>
                       {approvedOwners.map(owner => (
                         <option key={owner.id} value={owner.id} className="bg-white dark:bg-[#0A1F30]">{owner.nombre}</option>
                       ))}
                     </select>
                   </div>
                 </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-4 transition-colors duration-300">
          <button type="button" onClick={onClose} className="px-8 py-4 font-black text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-widest hover:text-slate-600 dark:hover:text-white transition-all">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !foundUser}
            className="flex items-center gap-3 px-12 py-4 bg-secondary-900 dark:bg-primary-500 hover:bg-black dark:hover:bg-primary-600 text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Vincular Conductor</>}
          </button>
        </div>
      </div>
    </div>
  );
}
