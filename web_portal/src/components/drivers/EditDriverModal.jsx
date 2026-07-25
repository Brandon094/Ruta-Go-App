import React, { useState, useEffect } from 'react';
import { Save, Clock, Trash2, AlertCircle, Loader2, User, Briefcase, Bus } from 'lucide-react';
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
    ownerId: ''
  });

  const isAdmin = role?.type === 'ADMIN';

  // Obtener perfiles de dueños aprobados
  const approvedOwners = owners
    .filter(o => o.status === true)
    .map(o => ({
      id: o.id,
      nombre: users.find(u => u.id === o.id)?.nombre || 'Socio sin nombre'
    }));

  const myVehicles = formData.ownerId
    ? vehicles.filter(v => v.ownerId === formData.ownerId)
    : (isAdmin ? [] : vehicles.filter(v => v.ownerId === role?.uid));

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

  const toggleSchedule = (id) => {
    setSelectedSchedules(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await driverService.updateDriver(driver.id, {
        nombre: formData.nombre,
        placaVehiculo: formData.placaVehiculo,
        vehiculoId: formData.placaVehiculo,
        status: formData.status,
        horariosAsignados: selectedSchedules
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
    <Modal isOpen={true} onClose={onClose} title="Configuración de Operador">
      <div className="p-8 space-y-10 overflow-y-auto max-h-[75vh]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Columna Izquierda: Datos */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2 italic">
              <div className="w-1.5 h-3 bg-primary-500 rounded-full"></div> Información Maestra
            </h4>

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

          {/* Columna Derecha: Horarios */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2 italic">
              <Clock size={14}/> Escalafón de Ruta
            </h4>
            <div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-5 border border-slate-100 dark:border-white/5 max-h-[320px] overflow-y-auto space-y-2 custom-scrollbar">
              {allSchedules.length > 0 ? (
                allSchedules.map(s => (
                  <label key={s.id} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedSchedules.includes(s.id) ? 'bg-primary-500 border-transparent shadow-lg shadow-orange-500/20' : 'bg-white dark:bg-secondary-700 border-slate-100 dark:border-white/5 hover:border-primary-500/30'}`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSchedules.includes(s.id)}
                      onChange={() => toggleSchedule(s.id)}
                    />
                    <div className="flex flex-col text-left">
                      <span className={`text-xs font-black italic ${selectedSchedules.includes(s.id) ? 'text-[#061426]' : 'text-slate-800 dark:text-white'}`}>{s.hora}</span>
                      <span className={`text-[9px] font-bold uppercase truncate max-w-[140px] ${selectedSchedules.includes(s.id) ? 'text-[#061426]/60' : 'text-slate-400 dark:text-white/30'}`}>{s.ruta}</span>
                    </div>
                  </label>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center gap-2 opacity-30">
                  <Loader2 className="animate-spin text-primary-500" size={24} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col gap-4">
           <div className="flex gap-4">
              <Button onClick={handleSubmit} isLoading={loading} size="full" icon={Save} className="!rounded-2xl">
                 Guardar Cambios
              </Button>
              <Button onClick={onClose} variant="ghost" className="text-slate-400 !px-8">
                 Cerrar
              </Button>
           </div>
           <Button onClick={handleDelete} variant="ghost" size="sm" icon={Trash2} className="!text-red-500/60 hover:!text-red-500 !py-2 self-center font-black uppercase text-[10px] tracking-widest">
              Eliminar Conductor del Sistema
           </Button>
        </div>
      </div>
    </Modal>
  );
}
