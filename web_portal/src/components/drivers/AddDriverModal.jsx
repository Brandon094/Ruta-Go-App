import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Bus, Save, Loader2, AlertCircle, CheckCircle2, Search, User, Mail, Hash, Settings, Clock, RotateCw, MapPin } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🚛 Component: AddDriverModal (Atomic Refactor v2.0.1-BETA)
 * Permite registrar un nuevo conductor con asignación de turnos por ruta.
 */
export function AddDriverModal({ onClose, users, owners, vehicles, currentUser, role }) {
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [useExistingVehicle, setUseExistingVehicle] = useState(true);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('Nátaga ➔ La Plata');

  const isAdmin = role?.type === 'ADMIN';

  const [formData, setFormData] = useState({
    email: '',
    placa: '',
    modelo: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.type === 'OWNER' ? currentUser.uid : '',
    posicionEscalafon: 0
  });

  // 1. Extraer Rutas Disponibles
  const availableRoutes = useMemo(() => {
    const routeSet = new Set(['Nátaga ➔ La Plata']);
    allSchedules.forEach(s => {
      const r = s.route || s.ruta;
      if (r) {
        routeSet.add(r.replace(/->/g, '➔').trim());
      }
    });
    return Array.from(routeSet);
  }, [allSchedules]);

  // 2. Filtrar Socios Aprobados
  const approvedOwners = useMemo(() => {
    return (owners || [])
      .filter(o => {
        if (o.status === true || o.status === 'approved' || o.status === 'active') return true;
        if (typeof o.status === 'object' && o.status !== null) return true;
        return false;
      })
      .map(o => {
        const u = (users || []).find(u => u.id === o.id);
        return { id: o.id, nombre: u?.nombre || u?.email || `Socio (${o.id.substring(0, 8)})` };
      });
  }, [owners, users]);

  // 3. Filtrar Vehículos del Socio seleccionado
  const myVehicles = useMemo(() => {
    if (!formData.ownerId) return [];
    return (vehicles || []).filter(v => v.ownerId === formData.ownerId);
  }, [vehicles, formData.ownerId]);

  useEffect(() => {
    driverService.getAllSchedules().then(setAllSchedules);
  }, []);

  const norm = (str) => (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const isNatagaEscalafon = useMemo(() => {
    const n = norm(selectedRoute);
    return n.includes('nataga') && n.includes('la plata');
  }, [selectedRoute]);

  // Horarios filtrados para rutas adicionales
  const activeRouteSchedules = useMemo(() => {
    return FormatUtils.filterSchedulesByRoute(allSchedules, selectedRoute);
  }, [allSchedules, selectedRoute]);

  const toggleDynamicSchedule = (scheduleId) => {
    setSelectedSchedules(prev =>
      prev.includes(scheduleId) ? prev.filter(id => id !== scheduleId) : [...prev, scheduleId]
    );
  };

  const toggleSchedulePair = (group) => {
    const ids = group.ids;
    setSelectedSchedules(prev => {
      const hasAll = ids.length > 0 && ids.every(id => prev.includes(id));
      if (hasAll) {
        return prev.filter(id => !ids.includes(id));
      } else {
        if (group.shiftIndex !== undefined && group.shiftIndex !== null) {
          const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
          const pos = (group.shiftIndex - (dayCounter % 9) + 9) % 9;
          setFormData(prev => ({ ...prev, posicionEscalafon: pos }));
        } else {
          // Turno Fijo Dedicado (No Rota)
          setFormData(prev => ({ ...prev, posicionEscalafon: -1 }));
        }
        return [...ids];
      }
    });
  };

  const getMinutes = (hStr) => {
    try {
      if (!hStr) return 0;
      const [time, ampm] = hStr.trim().split(" ");
      let [hrs, mins] = time.split(":").map(Number);
      if (ampm === "PM" && hrs < 12) hrs += 12;
      if (ampm === "AM" && hrs === 12) hrs = 0;
      return hrs * 60 + (mins || 0);
    } catch (e) { return 0; }
  };

  // 🧠 Lógica Maestra de Agrupamiento de Turnos Nátaga ➔ La Plata (Coincidencia por Hora Real NoSQL v2.0)
  const scheduleGroups = useMemo(() => {
    if (!allSchedules.length) return [];

    const norm = (str) => (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    const findByTime = (routePrefix, timeStr) => {
      const targetTime = timeStr.trim().toLowerCase();
      return allSchedules.find(s => {
        const normR = norm(s.route || s.ruta || "");
        const normT = (s.time || s.hora || "").trim().toLowerCase();
        return normR.startsWith(routePrefix) && normT === targetTime;
      });
    };

    // Mapeo Canónico de Horarios Operativos de Nátaga
    const canonicalPairs = [
      { natagaTime: "06:15 AM", laPlataTime: "09:15 AM", label: "Turno 1", shiftIndex: 7, legacyIds: ["h001", "h011"] },
      { natagaTime: "07:15 AM", laPlataTime: "10:30 AM", label: "Turno 2", shiftIndex: 6, legacyIds: ["h002", "h012"] },
      { natagaTime: "08:30 AM", laPlataTime: "11:45 AM", label: "Turno 3", shiftIndex: 5, legacyIds: ["h003", "h013"] },
      { natagaTime: "09:30 AM", laPlataTime: "01:00 PM", label: "Turno 4", shiftIndex: 4, legacyIds: ["h004", "h014"] },
      { natagaTime: "10:00 AM", laPlataTime: "02:00 PM", label: "Turno 5 (Fijo / Dedicado)", shiftIndex: null, legacyIds: ["h005", "h015"] },
      { natagaTime: "11:00 AM", laPlataTime: "03:30 PM", label: "Turno 6", shiftIndex: 3, legacyIds: ["h006", "h016"] },
      { natagaTime: "01:00 PM", laPlataTime: "05:00 PM", label: "Turno 7", shiftIndex: 2, legacyIds: ["h007", "h017"] },
    ];

    const groups = [];

    // 1. Resolver Turnos Estándar (1 al 7)
    canonicalPairs.forEach(pair => {
      const ida = findByTime('nataga', pair.natagaTime) || allSchedules.find(s => pair.legacyIds.includes(s.id));
      const vuelta = findByTime('la plata', pair.laPlataTime) || allSchedules.find(s => pair.legacyIds.includes(s.id));

      const foundIds = [ida?.id, vuelta?.id].filter(Boolean);
      if (foundIds.length > 0) {
        groups.push({
          ids: foundIds,
          label: pair.label,
          display: `${pair.natagaTime} (Nátaga) ➔ ${pair.laPlataTime} (La Plata)`,
          shiftIndex: pair.shiftIndex
        });
      }
    });

    // 2. Resolver Turno 8 (Triple Especial: 03:30 PM Nátaga + 06:00 PM LP + 07:30 AM LP)
    const t8Ida = findByTime('nataga', "03:30 PM") || allSchedules.find(s => s.id === "h008");
    const t8Vuelta1 = findByTime('la plata', "06:00 PM") || allSchedules.find(s => s.id === "h018");
    const t8Vuelta2 = findByTime('la plata', "07:30 AM") || allSchedules.find(s => s.id === "h010");
    const t8Ids = [t8Ida?.id, t8Vuelta1?.id, t8Vuelta2?.id].filter(Boolean);
    if (t8Ids.length > 0) {
      groups.push({
        ids: t8Ids,
        label: "Turno 8 (Triple Especial)",
        display: "03:30 PM (Nátaga) ➔ 06:00 PM (La Plata) (+ 07:30 AM AM)",
        shiftIndex: 1
      });
    }

    // 3. Resolver Turno 9 (Entrada Única: 05:00 PM Nátaga)
    const t9Ida = findByTime('nataga', "05:00 PM") || allSchedules.find(s => s.id === "h009");
    if (t9Ida) {
      groups.push({
        ids: [t9Ida.id],
        label: "Turno 9 (Entrada)",
        display: "05:00 PM (Nátaga - Trayecto Único)",
        shiftIndex: 0
      });
    }

    // 4. Descanso
    groups.push({
      ids: [],
      label: "Descanso (Día de Descanso)",
      display: "Mañana fuera de servicio (Sin turnos asignados)",
      shiftIndex: 8
    });

    // 5. Salidas Adicionales (Fallback)
    const matchedIds = new Set(groups.flatMap(g => g.ids));
    const unassignedSchedules = allSchedules.filter(s => {
      const normR = norm(s.route || s.ruta || "");
      return normR.includes('nataga') && normR.includes('la plata') && !matchedIds.has(s.id);
    });

    unassignedSchedules.forEach(s => {
      groups.push({
        ids: [s.id],
        label: `Salida Adicional (${s.time || s.hora})`,
        display: `${s.time || s.hora} — ${s.route || s.ruta}`,
        shiftIndex: null
      });
    });

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
        horariosAsignados: selectedSchedules,
        posicionEscalafon: formData.posicionEscalafon
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

              {/* Turnos por Ruta (Paso 2) */}
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                    <Clock size={16}/> 2. Asignar Horarios por Ruta
                  </h4>
                  <Badge variant="info" className="text-[9px]">
                    {selectedSchedules.length} Seleccionados
                  </Badge>
                </div>

                {/* 🎛️ Pestañas de Selección de Ruta */}
                <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5">
                  {availableRoutes.map((routeName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRoute(routeName)}
                      className={`flex-1 min-w-[110px] px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        selectedRoute === routeName
                          ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                          : 'text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/5'
                      }`}
                    >
                      {routeName}
                    </button>
                  ))}
                </div>

                {/* Lista de Turnos/Horarios de la Ruta Activa */}
                <div className="grid grid-cols-1 gap-2.5 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar shadow-inner bg-slate-50 dark:bg-black/20 rounded-[1.5rem] p-3 border border-slate-100 dark:border-white/5">
                  {isNatagaEscalafon ? (
                    /* Rueda de Escalafón Nátaga ➔ La Plata */
                    scheduleGroups.map((group, idx) => {
                      const isSelected = (group.ids.length === 0 && selectedSchedules.length === 0) ||
                                       (group.ids.length > 0 && group.ids.every(id => selectedSchedules.includes(id)));
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleSchedulePair(group)}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                            isSelected
                            ? 'bg-primary-500 border-primary-600 text-[#061426] shadow-lg'
                            : 'bg-white dark:bg-[#061929] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-primary-500/40'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xs uppercase">{group.label}</span>
                              {group.shiftIndex !== null && group.shiftIndex !== undefined && (
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${isSelected ? 'bg-black/20 text-[#061426]' : 'bg-primary-500/10 text-primary-500'}`}>
                                  Pos #{group.shiftIndex}
                                </span>
                              )}
                            </div>
                            <p className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-[#061426]/80' : 'text-slate-400 dark:text-white/40'}`}>
                              {group.display}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#061426] bg-[#061426] text-primary-500' : 'border-slate-300 dark:border-white/20'}`}>
                            {isSelected && <CheckCircle2 size={14} />}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    /* Horarios Dinámicos para Rutas Adicionales */
                    activeRouteSchedules.length > 0 ? (
                      activeRouteSchedules.map((s) => {
                        const isChecked = selectedSchedules.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleDynamicSchedule(s.id)}
                            className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                              isChecked
                              ? 'bg-primary-500 border-primary-600 text-[#061426] shadow-lg'
                              : 'bg-white dark:bg-[#061929] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-primary-500/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Clock size={14} className={isChecked ? 'text-[#061426]' : 'text-primary-500'} />
                                <span className="font-black text-xs uppercase">{s.time || s.hora}</span>
                              </div>
                              <p className={`text-[10px] font-bold mt-0.5 ${isChecked ? 'text-[#061426]/80' : 'text-slate-400 dark:text-white/40'}`}>
                                {s.route || s.ruta} — Tarifa: ${FormatUtils.formatPrice(s.price || s.precio || 12000)}
                              </p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? 'border-[#061426] bg-[#061426] text-primary-500' : 'border-slate-300 dark:border-white/20'}`}>
                              {isChecked && <CheckCircle2 size={14} />}
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-center text-xs text-slate-400 py-6 italic">No hay horarios registrados para esta ruta.</p>
                    )
                  )}
                </div>
              </div>

              {/* Ajuste de Escalafón (v1.9.9.6) */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
                  <Settings size={16}/> 3. Ajuste de Escalafón
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      label="Posición Base (0-8)"
                      type="number"
                      min="0"
                      max="8"
                      value={formData.posicionEscalafon}
                      onChange={(val) => setFormData({...formData, posicionEscalafon: parseInt(val)})}
                    />
                  </div>
                  <div className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-[8px] font-bold text-primary-400 max-w-[140px] leading-tight">
                    CALCULADO AUTOMÁTICAMENTE AL ELEGIR TURNO. AJUSTA MANUALMENTE SOLO SI ES NECESARIO.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activos */}
          <div className="space-y-8 text-left">
            <h4 className="text-[11px] font-black text-[#061426] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
              <div className="w-2 h-4 bg-primary-500 rounded-full"></div> 4. Datos del Vehículo
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
