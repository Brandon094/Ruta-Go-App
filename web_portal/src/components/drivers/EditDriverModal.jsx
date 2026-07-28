import React, { useState, useEffect } from 'react';
import { Save, Clock, Trash2, AlertCircle, Loader2, User, Briefcase, Bus, RotateCw, CheckCircle2, Settings } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ref, get, update } from "firebase/database";
import { db } from '../../firebase';

/**
 * 🛠️ Component: EditDriverModal (Atomic Refactor v1.7.0)
 * Interfaz de gestión avanzada para administradores.
 */
export function EditDriverModal({ driver, onClose, onRefresh, role, owners = [], users = [], vehicles = [] }) {
  const [loading, setLoading] = useState(false);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState(driver?.horariosAsignados || []);
  const [formData, setFormData] = useState({
    nombre: driver?.nombre || '',
    placaVehiculo: driver?.placaVehiculo || '',
    status: driver?.status || 'active',
    ownerId: '',
    posicionEscalafon: driver?.posicionEscalafon || 0
  });

  const isAdmin = role?.type === 'ADMIN';

  // 1. Obtener perfiles de dueños aprobados (v1.9.9.6 Robust Fix)
  const approvedOwners = React.useMemo(() => {
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

  // 2. Filtrar Vehículos por dueño
  const myVehicles = React.useMemo(() => {
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

        const vehicleId = driver.vehiculoId || driver.placaVehiculo;
        if (vehicleId) {
          const vSnap = await get(ref(db, `vehiculos/${vehicleId}`));
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

  const toggleSchedulePair = (group) => {
    const ids = group.ids;
    setSelectedSchedules(prev => {
      const hasAll = ids.length > 0 && ids.every(id => prev.includes(id));
      if (hasAll) {
        return prev.filter(id => !ids.includes(id));
      } else {
        // 🧠 Lógica de Auto-Calculo de Escalafón (v1.9.9.6)
        if (group.shiftIndex !== undefined && group.shiftIndex !== null) {
          const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
          const pos = (group.shiftIndex - (dayCounter % 9) + 9) % 9;
          setFormData(prev => ({ ...prev, posicionEscalafon: pos }));
        }
        return [...ids];
      }
    });
  };

  // 🧠 Lógica de Agrupamiento de Horarios (Sincronizada con Cloud Functions v1.9.7)
  const scheduleGroups = React.useMemo(() => {
    if (!allSchedules.length) return [];

    const find = (id) => allSchedules.find(s => s.id === id);
    const groups = [];

    // 1. Turnos Estándar (shiftIndex según index.js)
    const standardPairs = [
      { ids: ["h001", "h011"], label: "Turno 1", shiftIndex: 7 },
      { ids: ["h002", "h012"], label: "Turno 2", shiftIndex: 6 },
      { ids: ["h003", "h013"], label: "Turno 3", shiftIndex: 5 },
      { ids: ["h004", "h014"], label: "Turno 4", shiftIndex: 4 },
      { ids: ["h005", "h015"], label: "Turno Fijo (Dedicado)", shiftIndex: null },
      { ids: ["h006", "h016"], label: "Turno 6", shiftIndex: 3 },
      { ids: ["h007", "h017"], label: "Turno 7", shiftIndex: 2 },
    ];

    standardPairs.forEach(group => {
      const items = group.ids.map(find).filter(Boolean);
      if (items.length === group.ids.length) {
        groups.push({
          ids: group.ids,
          label: group.label,
          display: `${items[0].hora} ➔ ${items[1].hora}`,
          shiftIndex: group.shiftIndex
        });
      }
    });

    // 2. El Combo Especial (Triple): h008 + h018 + h010
    const tripleIds = ["h008", "h018", "h010"];
    const tripleItems = tripleIds.map(find).filter(Boolean);
    if (tripleItems.length === tripleIds.length) {
      groups.push({
        ids: tripleIds,
        label: "Turno 8 (Triple Especial)",
        display: `${tripleItems[0].hora} ➔ ${tripleItems[1].hora} (+ ${tripleItems[2].hora} AM)`,
        shiftIndex: 1
      });
    }

    // 3. El Turno Solo (Entrada): h009
    const soloId = "h009";
    const soloItem = find(soloId);
    if (soloItem) {
      groups.push({
        ids: [soloId],
        label: "Turno 9 (Entrada)",
        display: `${soloItem.hora} (Trayecto Único)`,
        shiftIndex: 0
      });
    }

    // 4. Descanso
    groups.push({
      ids: [],
      label: "Descanso (Día 9)",
      display: "Mañana fuera de servicio",
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

      if (isAdmin && formData.ownerId) {
        await update(ref(db, `vehiculos/${formData.placaVehiculo}`), { ownerId: formData.ownerId });
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

          {/* Columna Derecha: Horarios Agrupados */}
          <div className="space-y-8 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
                <Clock size={16}/> Grupos de Horarios (Escalafón)
              </h4>
              <div className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-[8px] font-black text-primary-500 uppercase tracking-widest animate-pulse">Sync Active</div>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-6 lg:p-8 border border-slate-100 dark:border-white/5 max-h-[480px] overflow-y-auto space-y-4 custom-scrollbar shadow-inner">
              {scheduleGroups.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {scheduleGroups.map((group, idx) => {
                    const isSelected = (group.ids.length === 0 && selectedSchedules.length === 0) ||
                                     (group.ids.length > 0 && group.ids.every(id => selectedSchedules.includes(id)));

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSchedulePair(group)}
                        className={`w-full p-5 lg:p-6 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${
                          isSelected
                          ? 'bg-primary-500 border-primary-600 shadow-xl shadow-orange-500/20'
                          : 'bg-white dark:bg-secondary-700 border-slate-100 dark:border-white/5 hover:border-primary-500/40 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`p-3 rounded-2xl transition-colors ${isSelected ? 'bg-[#061426] text-primary-500 shadow-lg' : 'bg-primary-500/10 text-primary-500'}`}>
                             <RotateCw size={20} className={isSelected ? 'animate-spin-slow' : ''} />
                          </div>
                          <div className="text-left">
                             <p className={`text-sm lg:text-base font-black italic tracking-tight ${isSelected ? 'text-[#061426]' : 'text-slate-800 dark:text-white'}`}>
                               {group.display}
                             </p>
                             <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isSelected ? 'text-[#061426]/60' : 'text-slate-400 dark:text-white/30'}`}>
                               {group.label}
                             </p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#061426] border-[#061426] text-primary-500 scale-110 shadow-lg' : 'border-slate-200 dark:border-white/10 text-transparent'}`}>
                           <CheckCircle2 size={18} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center gap-4 opacity-30 italic font-bold text-slate-400">
                  <Loader2 className="animate-spin text-primary-500" size={32} />
                  <p className="text-xs uppercase tracking-widest">Sincronizando Planilla...</p>
                </div>
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
