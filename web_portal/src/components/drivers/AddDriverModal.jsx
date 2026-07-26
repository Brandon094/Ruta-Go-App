import React, { useState, useEffect } from 'react';
import { UserPlus, Bus, Save, Loader2, AlertCircle, CheckCircle2, Search, User, Mail, Hash, Settings, Clock, RotateCw } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

/**
 * 🚛 Component: AddDriverModal (Atomic Refactor v1.9.5)
 * Permite registrar un nuevo conductor con asignación de turnos por parejas.
 */
export function AddDriverModal({ onClose, users, owners, vehicles, currentUser, role }) {
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [useExistingVehicle, setUseExistingVehicle] = useState(true);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const [formData, setFormData] = useState({
    email: '',
    placa: '',
    modelo: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.type === 'OWNER' ? currentUser.uid : ''
  });

  // 1. Filtrar Socios Aprobados (ADMIN ONLY) - v1.9.9.5 Fix
  const approvedOwners = React.useMemo(() => {
    return (owners || [])
      .filter(o => o.status === 'approved')
      .map(o => {
        const u = (users || []).find(u => u.id === o.id);
        return { id: o.id, nombre: u?.nombre || 'Socio Desconocido' };
      });
  }, [owners, users]);

  // 2. Filtrar Vehículos del Socio seleccionado
  const myVehicles = React.useMemo(() => {
    if (!formData.ownerId) return [];
    return (vehicles || []).filter(v => v.ownerId === formData.ownerId);
  }, [vehicles, formData.ownerId]);

  const isAdmin = role?.type === 'ADMIN';

  useEffect(() => {
    driverService.getAllSchedules().then(setAllSchedules);
  }, []);

  const toggleSchedulePair = (pair) => {
    const ids = pair.ids;
    setSelectedSchedules(prev => {
      const hasAll = ids.every(id => prev.includes(id));
      if (hasAll) {
        return prev.filter(id => !ids.includes(id));
      } else {
        return [...new Set([...prev, ...ids])];
      }
    });
  };

  // 🧠 Lógica de Agrupamiento de Horarios (Sincronizada con Cloud Functions v1.9.7)
  const scheduleGroups = React.useMemo(() => {
    if (!allSchedules.length) return [];

    const find = (id) => allSchedules.find(s => s.id === id);
    const groups = [];

    // 1. Turnos Estándar
    const standardPairs = [
      { ids: ["h001", "h011"], label: "Turno 1" },
      { ids: ["h002", "h012"], label: "Turno 2" },
      { ids: ["h003", "h013"], label: "Turno 3" },
      { ids: ["h004", "h014"], label: "Turno 4" },
      { ids: ["h005", "h015"], label: "Turno Fijo (Dedicado)" },
      { ids: ["h006", "h016"], label: "Turno 6" },
      { ids: ["h007", "h017"], label: "Turno 7" },
    ];

    standardPairs.forEach(group => {
      const items = group.ids.map(find).filter(Boolean);
      if (items.length === group.ids.length) {
        groups.push({
          ids: group.ids,
          label: group.label,
          display: `${items[0].hora} ➔ ${items[1].hora}`
        });
      }
    });

    // 2. El Combo Especial (Triple)
    const tripleIds = ["h008", "h018", "h010"];
    const tripleItems = tripleIds.map(find).filter(Boolean);
    if (tripleItems.length === tripleIds.length) {
      groups.push({
        ids: tripleIds,
        label: "Turno 8 (Triple Especial)",
        display: `${tripleItems[0].hora} ➔ ${tripleItems[1].hora} (+ ${tripleItems[2].hora} AM)`
      });
    }

    // 3. El Turno Solo
    const soloId = "h009";
    const soloItem = find(soloId);
    if (soloItem) {
      groups.push({
        ids: [soloId],
        label: "Turno 9 (Entrada)",
        display: `${soloItem.hora} (Trayecto Único)`
      });
    }

    return groups;
  }, [allSchedules]);

  // ... (rest of search logic)
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
      if (!formData.ownerId) {
        throw new Error("Debes seleccionar un Socio Responsable.");
      }

      const driverData = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        email: foundUser.email,
        telefono: foundUser.telefono || 'N/A',
        placaVehiculo: formData.placa,
        vehiculoId: formData.placa,
        horariosAsignados: selectedSchedules
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
    <Modal isOpen={true} onClose={onClose} title="Vincular Nuevo Operador" maxWidth="max-w-5xl">
      <div className="p-8 lg:p-12 space-y-10 overflow-y-auto max-h-[85vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Identificación */}
          <div className="space-y-8 text-left">
            <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
              <div className="w-2 h-4 bg-primary-500 rounded-full"></div> 1. Buscar Conductor
            </h4>

            <div className="space-y-6">
              <Input
                label="Correo Electrónico"
                placeholder="conductor@gmail.com"
                type="email"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={(val) => setFormData({...formData, email: val})}
              />

              <div className={`p-6 rounded-[2rem] border transition-all flex items-center gap-5 ${
                foundUser ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-lg shadow-green-500/5' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400'
              }`}>
                <div className={`p-3 rounded-2xl ${foundUser ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-white/5'}`}>
                  {foundUser ? <CheckCircle2 size={24} /> : <Search size={24} />}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{foundUser ? 'Usuario Encontrado' : 'Esperando correo...'}</p>
                  <p className="text-base font-black leading-tight mt-0.5">{foundUser ? foundUser.nombre : 'Ingresa el email'}</p>
                </div>
              </div>

              {/* Turnos (Inyectados en la creación) */}
              <div className="space-y-6 pt-6 border-t border-white/5">
                <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
                  <Clock size={16}/> 2. Asignar Turnos (Parejas)
                </h4>
                <div className="grid grid-cols-1 gap-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar shadow-inner bg-black/10 rounded-[1.5rem] p-4">
                  {scheduleGroups.map((group, idx) => {
                    const isSelected = group.ids.every(id => selectedSchedules.includes(id));
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSchedulePair(group)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                          isSelected
                          ? 'bg-primary-500 border-primary-600 text-[#061426] shadow-lg'
                          : 'bg-white dark:bg-secondary-700 border-slate-100 dark:border-white/5 text-slate-400 hover:border-primary-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RotateCw size={14} className={isSelected ? 'animate-spin-slow' : 'opacity-20'} />
                          <span className="text-xs font-black italic">{group.display}</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">{group.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Activos */}
          <div className="space-y-8 text-left">
            <h4 className="text-[11px] font-black text-[#061426] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
              <div className="w-2 h-4 bg-primary-500 rounded-full"></div> 3. Datos del Vehículo
            </h4>

            <div className="space-y-6">
              {isAdmin && (
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1">Socio Responsable</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"><User size={18} /></div>
                    <select
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none appearance-none transition-all text-sm italic"
                      value={formData.ownerId}
                      onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
                    >
                      <option value="">Seleccionar Dueño...</option>
                      {approvedOwners.map(owner => (
                        <option key={owner.id} value={owner.id} className="bg-white dark:bg-secondary-800">{owner.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner">
                <button type="button" onClick={() => setUseExistingVehicle(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${useExistingVehicle ? 'bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-md' : 'text-slate-400 dark:text-white/20 hover:text-white'}`}>Vehículo Existente</button>
                <button type="button" onClick={() => setUseExistingVehicle(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${!useExistingVehicle ? 'bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-md' : 'text-slate-400 dark:text-white/20 hover:text-white'}`}>Nuevo Registro</button>
              </div>

              {useExistingVehicle ? (
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"><Bus size={18} /></div>
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none appearance-none transition-all text-sm italic"
                    value={formData.placa}
                    onChange={(e) => handleVehicleSelect(e.target.value)}
                  >
                    <option value="">Seleccionar placa...</option>
                    {myVehicles.map(v => (
                      <option key={v.id || v.placa} value={v.id || v.placa} className="bg-white dark:bg-secondary-800">{v.placa || v.id} - {v.modelo}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Placa" placeholder="ABC-123" icon={<Hash size={18}/>} value={formData.placa} onChange={(v) => setFormData({...formData, placa: v.toUpperCase()})} />
                    <Input label="Año" placeholder="2024" type="number" value={formData.ano} onChange={(v) => setFormData({...formData, ano: v})} />
                  </div>
                  <Input label="Referencia / Modelo" placeholder="Ej: Toyota Hilux" icon={<Bus size={18}/>} value={formData.modelo} onChange={(v) => setFormData({...formData, modelo: v})} />
                  <Input label="Cupos del Bus" placeholder="13" type="number" value={formData.capacidad} onChange={(v) => setFormData({...formData, capacidad: v})} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose} className="text-slate-400 !px-8 hover:bg-white/5">Cancelar</Button>
          <Button onClick={handleSubmit} isLoading={loading} disabled={!foundUser || !formData.placa || !formData.ownerId} icon={UserPlus} className="!px-12 !py-5 shadow-2xl shadow-primary-500/20">Vincular Operador</Button>
        </div>
      </div>
    </Modal>
  );
}
