import React, { useState, useEffect, useMemo } from 'react';
import { Save, Clock, Trash2, AlertCircle, Loader2, User, Briefcase, Bus, RotateCw, CheckCircle2, Settings } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ref, get, update } from "firebase/database";
import { db } from '../../firebase';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🛠️ Component: EditDriverModal (Atomic Refactor v2.0.1-BETA)
 * Interfaz de gestión avanzada para administradores con asignación de horarios por ruta.
 */
export function EditDriverModal({ driver, onClose, onRefresh, role, owners = [], users = [], vehicles = [] }) {
  const [loading, setLoading] = useState(false);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState(driver?.horariosAsignados || []);
  const [selectedRoute, setSelectedRoute] = useState('Nátaga ➔ La Plata');
  const [formData, setFormData] = useState({
    nombre: driver?.nombre || '',
    placaVehiculo: driver?.placaVehiculo || '',
    status: driver?.status || 'active',
    ownerId: '',
    posicionEscalafon: driver?.posicionEscalafon || 0
  });

  const isAdmin = role?.type === 'ADMIN';

  // 1. Extraer Rutas Disponibles dinámicamente
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

  // 2. Obtener perfiles de dueños aprobados
  const approvedOwners = useMemo(() => {
    return (owners || [])
      .filter(o => {
        if (o.status === true || o.status === 'approved' || o.status === 'active') return true;
        if (typeof o.status === 'object' && o.status !== null) return true;
        return false;
      })
      .map(o => {
        const u = (users || []).find(u => u.id === o.id);
        return {
          id: o.id,
          nombre: u?.nombre || u?.email || `Socio (${o.id.substring(0, 8)})`
        };
      });
  }, [owners, users]);

  // 3. Filtrar Vehículos por dueño
  const myVehicles = useMemo(() => {
    if (formData.ownerId) {
      return vehicles.filter(v => v.ownerId === formData.ownerId);
    }
    return isAdmin ? [] : vehicles.filter(v => v.ownerId === role?.uid);
  }, [vehicles, formData.ownerId, isAdmin, role?.uid]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const schedules = await driverService.getAllSchedules();
        if (isMounted) setAllSchedules(schedules);

        const vehicleId = driver.vehicleId || driver.vehiclePlate || driver.vehiculoId || driver.placaVehiculo;
        if (vehicleId) {
          const vSnap = await get(ref(db, `vehicles/${vehicleId}`));
          if (vSnap.exists() && isMounted) {
            setFormData(prev => ({ ...prev, ownerId: vSnap.val().ownerId || '' }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [driver]);

  if (!driver) return null;

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

    return groups;
  }, [allSchedules]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await driverService.updateDriver(driver.id, {
        nombre: formData.nombre,
        placaVehiculo: formData.placaVehiculo,
        vehiculoId: formData.placaVehiculo,
        status: formData.status,
        horariosAsignados: selectedSchedules,
        posicionEscalafon: formData.posicionEscalafon
      }, driver.vehiculoId || driver.placaVehiculo);

      if (isAdmin && formData.ownerId && formData.placaVehiculo) {
        await update(ref(db, `vehicles/${formData.placaVehiculo}`), { ownerId: formData.ownerId });
      }

      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas ELIMINAR a ${driver.nombre}?`)) return;
    setLoading(true);
    try {
      await driverService.deleteDriver(driver.id);
      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Configuración de Operador" maxWidth="max-w-5xl">
      <div className="p-8 lg:p-12 space-y-10 overflow-y-auto max-h-[85vh]">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Columna Izquierda: Datos */}
          <div className="space-y-8 text-left">
            <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
              <div className="w-2 h-4 bg-primary-500 rounded-full"></div> Información Maestra
            </h4>

            <div className="space-y-6">
              <Input
                label="Nombre del Conductor"
                icon={<User size={18} />}
                value={formData.nombre}
                onChange={(val) => setFormData({...formData, nombre: val})}
              />

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1">Vehículo Asignado</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-500">
                    <Bus size={18} />
                  </div>
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none appearance-none transition-all text-sm italic"
                    value={formData.placaVehiculo}
                    onChange={(e) => setFormData({...formData, placaVehiculo: e.target.value})}
                  >
                    <option value="">Seleccionar Placa...</option>
                    {myVehicles.map(v => (
                      <option key={v.id || v.placa} value={v.placa || v.id} className="bg-white dark:bg-secondary-800">
                        {v.placa || v.id} - {v.modelo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1">Estado del Operador</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-500">
                    <Clock size={18} />
                  </div>
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none appearance-none transition-all text-sm italic"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">🟢 En Ruta (Activo)</option>
                    <option value="inactive">🟡 Descanso (Inactivo)</option>
                    <option value="blocked">🔴 Bloqueado</option>
                  </select>
                </div>
              </div>

              {isAdmin && (
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest ml-1">Dueño de Flota</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-500">
                      <Briefcase size={18} />
                    </div>
                    <select
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none appearance-none transition-all text-sm italic"
                      value={formData.ownerId}
                      onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
                    >
                      <option value="">Asignar Socio...</option>
                      {approvedOwners.map(owner => (
                        <option key={owner.id} value={owner.id} className="bg-white dark:bg-secondary-800">{owner.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Horarios Agrupados por Ruta */}
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                <Clock size={16}/> Asignación por Ruta
              </h4>
              <Badge variant="info" className="text-[9px]">
                {selectedSchedules.length} Asignados
              </Badge>
            </div>

            {/* 🎛️ Pestañas de Ruta */}
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

            {/* Contenedor de Horarios para la Ruta Activa */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-6 lg:p-8 border border-slate-100 dark:border-white/5 max-h-[420px] overflow-y-auto space-y-3 custom-scrollbar shadow-inner">
              {isNatagaEscalafon ? (
                /* Rueda de Escalafón Nátaga ➔ La Plata */
                <div className="grid grid-cols-1 gap-3">
                  {scheduleGroups.map((group, idx) => {
                    const isSelected = (group.ids.length === 0 && selectedSchedules.length === 0) ||
                                     (group.ids.length > 0 && group.ids.every(id => selectedSchedules.includes(id)));

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSchedulePair(group)}
                        className={`w-full p-4 lg:p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${
                          isSelected
                          ? 'bg-primary-500 border-primary-600 shadow-xl shadow-orange-500/20'
                          : 'bg-white dark:bg-secondary-700 border-slate-100 dark:border-white/5 hover:border-primary-500/40 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-2xl transition-colors ${isSelected ? 'bg-[#061426] text-primary-500 shadow-lg' : 'bg-primary-500/10 text-primary-500'}`}>
                             <RotateCw size={18} className={isSelected ? 'animate-spin-slow' : ''} />
                          </div>
                          <div className="text-left">
                             <div className="flex items-center gap-2">
                               <p className={`text-sm font-black italic tracking-tight ${isSelected ? 'text-[#061426]' : 'text-slate-800 dark:text-white'}`}>
                                 {group.display}
                               </p>
                               {group.shiftIndex !== null && group.shiftIndex !== undefined && (
                                 <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${isSelected ? 'bg-[#061426]/20 text-[#061426]' : 'bg-primary-500/10 text-primary-500'}`}>
                                   Pos #{group.shiftIndex}
                                 </span>
                               )}
                             </div>
                             <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isSelected ? 'text-[#061426]/60' : 'text-slate-400 dark:text-white/30'}`}>
                               {group.label}
                             </p>
                          </div>
                        </div>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#061426] border-[#061426] text-primary-500 scale-110 shadow-lg' : 'border-slate-200 dark:border-white/10 text-transparent'}`}>
                           <CheckCircle2 size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Horarios Dinámicos para Rutas Adicionales */
                activeRouteSchedules.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {activeRouteSchedules.map((s) => {
                      const isChecked = selectedSchedules.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleDynamicSchedule(s.id)}
                          className={`w-full p-4 lg:p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${
                            isChecked
                            ? 'bg-primary-500 border-primary-600 shadow-xl shadow-orange-500/20 text-[#061426]'
                            : 'bg-white dark:bg-secondary-700 border-slate-100 dark:border-white/5 hover:border-primary-500/40 hover:shadow-lg text-slate-800 dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-2xl ${isChecked ? 'bg-[#061426] text-primary-500' : 'bg-primary-500/10 text-primary-500'}`}>
                              <Clock size={18} />
                            </div>
                            <div className="text-left">
                              <span className="text-sm font-black italic tracking-tight">{s.time || s.hora}</span>
                              <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isChecked ? 'text-[#061426]/70' : 'text-slate-400 dark:text-white/30'}`}>
                                {s.route || s.ruta} — Tarifa: ${FormatUtils.formatPrice(s.price || s.precio || 12000)}
                              </p>
                            </div>
                          </div>
                          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-[#061426] border-[#061426] text-primary-500 scale-110' : 'border-slate-200 dark:border-white/10 text-transparent'}`}>
                            <CheckCircle2 size={16} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center italic text-xs text-slate-400 dark:text-white/40">
                    No hay horarios registrados para esta ruta.
                  </div>
                )
              )}
            </div>

            {/* Ajuste de Escalafón Manual (v1.9.9.6) */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
                <Settings size={16}/> Ajuste Manual de Escalafón
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
                  SE SINCRONIZA AL ELEGIR TURNO. USA ESTO PARA CORRECCIONES MANUALES.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
           <Button onClick={handleDelete} variant="ghost" size="sm" icon={Trash2} className="!text-red-500/40 hover:!text-red-500 !py-3 font-black uppercase text-[10px] tracking-[0.2em] order-2 sm:order-none">
              Eliminar Operador
           </Button>
           <div className="flex gap-4 w-full sm:w-auto">
              <Button onClick={onClose} variant="ghost" className="text-slate-400 !px-8 hover:bg-white/5">
                 Cancelar
              </Button>
              <Button onClick={handleSubmit} isLoading={loading} size="full" icon={Save} className="!rounded-2xl !px-12 !py-5 shadow-2xl shadow-primary-500/20">
                 Guardar Configuración
              </Button>
           </div>
        </div>
      </div>
    </Modal>
  );
}
