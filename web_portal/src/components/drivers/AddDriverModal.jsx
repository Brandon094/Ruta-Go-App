import React, { useState, useEffect } from 'react';
import { UserPlus, Bus, Save, Loader2, AlertCircle, CheckCircle2, Search, User, Mail, Hash, Settings } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

/**
 * 🚛 Component: AddDriverModal (Atomic Refactor v1.7.0)
 * Permite registrar un nuevo conductor buscando su perfil previo.
 */
export function AddDriverModal({ onClose, users, owners, vehicles, currentUser, role }) {
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [useExistingVehicle, setUseExistingVehicle] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    placa: '',
    modelo: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.type === 'OWNER' ? currentUser.uid : ''
  });

  const isAdmin = role?.type === 'ADMIN';

  const approvedOwners = owners
    .filter(o => o.status === true)
    .map(o => ({
      id: o.id,
      nombre: users.find(u => u.id === o.id)?.nombre || 'Socio sin nombre'
    }));

  const myVehicles = formData.ownerId
    ? vehicles.filter(v => v.ownerId === formData.ownerId)
    : (isAdmin ? [] : vehicles.filter(v => v.ownerId === currentUser.uid));

  useEffect(() => {
    if (formData.email.includes('@')) {
      const match = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      setFoundUser(match || null);
    } else {
      setFoundUser(null);
    }
  }, [formData.email, users]);

  const handleVehicleSelect = (placa) => {
    const v = vehicles.find(item => (item.id === placa || item.placa === placa));
    if (v) {
      setFormData({
        ...formData,
        placa: v.placa || v.id,
        modelo: v.modelo || '',
        ano: v.ano || v.año || '',
        capacidad: v.capacidad || 13
      });
    } else {
      setFormData({ ...formData, placa: '' });
    }
  };

  const handleSubmit = async () => {
    if (!foundUser) {
      alert("⚠️ Error: El conductor debe registrarse primero en la App móvil.");
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
      onClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Vincular Nuevo Operador">
      <div className="p-8 space-y-10 overflow-y-auto max-h-[75vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Identificación */}
          <div className="space-y-6 text-left">
            <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2 italic">
              <div className="w-1.5 h-3 bg-primary-500 rounded-full"></div> 1. Buscar Conductor
            </h4>

            <Input
              label="Correo Electrónico"
              placeholder="conductor@gmail.com"
              type="email"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={(val) => setFormData({...formData, email: val})}
            />

            <div className={`p-5 rounded-[2rem] border transition-all flex items-center gap-4 ${
              foundUser ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400'
            }`}>
              {foundUser ? <CheckCircle2 size={22} /> : <Search size={22} />}
              <div>
                <p className="text-[10px] font-black uppercase tracking-tight">{foundUser ? 'Usuario Encontrado' : 'Esperando correo...'}</p>
                <p className="text-sm font-bold leading-tight">{foundUser ? foundUser.nombre : 'Ingresa el email'}</p>
              </div>
            </div>
          </div>

          {/* Activos */}
          <div className="space-y-6 text-left">
            <h4 className="text-[10px] font-black text-[#061426] dark:text-white uppercase tracking-widest flex items-center gap-2 italic">
              <div className="w-1.5 h-3 bg-primary-500 rounded-full"></div> 2. Datos del Vehículo
            </h4>

            {isAdmin && (
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1">Socio Responsable</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"><User size={18} /></div>
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white outline-none appearance-none text-sm italic"
                    value={formData.ownerId}
                    onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
                  >
                    <option value="">Seleccionar Dueño...</option>
                    {approvedOwners.map(owner => (
                      <option key={owner.id} value={owner.id} className="bg-white dark:bg-[#0A1F30]">{owner.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
              <button type="button" onClick={() => setUseExistingVehicle(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${useExistingVehicle ? 'bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-md' : 'text-slate-400 dark:text-white/20'}`}>Existente</button>
              <button type="button" onClick={() => setUseExistingVehicle(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${!useExistingVehicle ? 'bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-md' : 'text-slate-400 dark:text-white/20'}`}>Nuevo</button>
            </div>

            {useExistingVehicle ? (
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"><Bus size={18} /></div>
                <select
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white outline-none appearance-none text-sm italic"
                  value={formData.placa}
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                >
                  <option value="">Seleccionar placa...</option>
                  {myVehicles.map(v => (
                    <option key={v.id || v.placa} value={v.id || v.placa} className="bg-white dark:bg-[#0A1F30]">{v.placa || v.id} - {v.modelo}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Placa" icon={<Hash size={18}/>} value={formData.placa} onChange={(v) => setFormData({...formData, placa: v.toUpperCase()})} />
                  <Input placeholder="Año" type="number" value={formData.ano} onChange={(v) => setFormData({...formData, ano: v})} />
                </div>
                <Input placeholder="Modelo (Ej: Toyota Hilux)" icon={<Bus size={18}/>} value={formData.modelo} onChange={(v) => setFormData({...formData, modelo: v})} />
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose} className="text-slate-400">Cancelar</Button>
          <Button onClick={handleSubmit} isLoading={loading} disabled={!foundUser || !formData.placa} icon={UserPlus} className="!px-10">Vincular Operador</Button>
        </div>
      </div>
    </Modal>
  );
}
