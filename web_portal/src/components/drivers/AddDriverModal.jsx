import React, { useState, useEffect } from 'react';
import { X, UserPlus, Bus, Save, Loader2, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import { driverService } from '../../services/driverService';

/**
 * 🚛 Component: AddDriverModal (Versión Humana por Email)
 *
 * Permite registrar un nuevo conductor buscando su perfil previo en la base de usuarios.
 */
export function AddDriverModal({ onClose, users, currentUser, role }) {
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
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Vincular Operador</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Gestión de Flota por Email</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all">
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

              <div className="space-y-2">
                <InputField
                  label="Correo Electrónico"
                  placeholder="conductor@gmail.com"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({...formData, email: v})}
                  required
                />

                {/* Feedback de Búsqueda */}
                <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                  foundUser
                    ? 'bg-green-50 border-green-100 text-green-700'
                    : formData.email.includes('@')
                      ? 'bg-red-50 border-red-100 text-red-600'
                      : 'bg-slate-50 border-slate-100 text-slate-400'
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
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Teléfono Registrado</p>
                     <p className="text-sm font-bold text-slate-700">{foundUser.telefono || 'No proporcionado'}</p>
                   </div>
                </div>
              )}
            </div>

            {/* Sección 2: Datos del Vehículo */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-secondary-900 rounded-full"></div> 2. Datos del Bus
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Placa" placeholder="ABC-123" value={formData.placa} onChange={(v) => setFormData({...formData, placa: v.toUpperCase()})} required />
                <InputField label="Año" type="number" value={formData.ano} onChange={(v) => setFormData({...formData, ano: v})} required />
              </div>

              <InputField label="Modelo" placeholder="Ej: Nissan Frontier" value={formData.modelo} onChange={(v) => setFormData({...formData, modelo: v})} required />
              <InputField label="Capacidad" type="number" value={formData.capacidad} onChange={(v) => setFormData({...formData, capacidad: v})} required />

              {role?.type === 'ADMIN' && (
                 <InputField label="ID del Dueño (Opcional)" placeholder="UID del dueño" value={formData.ownerId} onChange={(v) => setFormData({...formData, ownerId: v})} />
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
          <button type="button" onClick={onClose} className="px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !foundUser}
            className="flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Vincular Conductor</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder, required = false }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
