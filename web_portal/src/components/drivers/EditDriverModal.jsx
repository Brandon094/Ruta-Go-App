import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Trash2, AlertCircle, Loader2, User, Hash, Shield } from 'lucide-react';
import { driverService } from '../../services/driverService';
import { Input } from '../ui/Input';

/**
 * 🛠️ Component: EditDriverModal
 *
 * Interfaz de gestión avanzada para administradores.
 */
export function EditDriverModal({ driver, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState(driver?.horariosAsignados || []);
  const [formData, setFormData] = useState({
    nombre: driver?.nombre || '',
    placaVehiculo: driver?.placaVehiculo || '',
    status: driver?.status || 'active'
  });

  useEffect(() => {
    let isMounted = true;
    const fetchSchedules = async () => {
      try {
        const data = await driverService.getAllSchedules();
        if (isMounted) setAllSchedules(data);
      } catch (err) {
        console.error("Error cargando horarios:", err);
      }
    };
    fetchSchedules();
    return () => { isMounted = false; };
  }, []);

  if (!driver) return null;

  const toggleSchedule = (id) => {
    setSelectedSchedules(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await driverService.updateDriver(driver.id, {
        ...formData,
        horariosAsignados: selectedSchedules
      });
      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que deseas ELIMINAR a ${driver.nombre}? Esta acción no se puede deshacer.`)) {
      setLoading(true);
      try {
        await driverService.deleteDriver(driver.id);
        if (onRefresh) onRefresh();
        onClose();
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white dark:bg-secondary-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-transparent dark:border-white/5 transition-colors duration-300">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 transition-colors duration-300">
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight italic uppercase">Editar Conductor</h3>
            <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest mt-1">ID Operativo: {driver.id.substring(0,8)}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 dark:text-white/20 hover:text-primary-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-3 bg-primary-500 rounded-full"></div> Perfil Básico
              </h4>
              <Input
                label="Nombre Legal"
                icon={User}
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              <Input
                label="Placa Asignada"
                icon={Hash}
                value={formData.placaVehiculo}
                onChange={(e) => setFormData({...formData, placaVehiculo: e.target.value.toUpperCase()})}
              />

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500">Estado</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 dark:text-white/20 transition-colors group-focus-within:text-primary-500">
                    <Shield size={18} />
                  </div>
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active" className="bg-white dark:bg-secondary-800">🟢 En Ruta (Activo)</option>
                    <option value="inactive" className="bg-white dark:bg-secondary-800">🟡 Descanso (Inactivo)</option>
                    <option value="blocked" className="bg-white dark:bg-secondary-800">🔴 Bloqueado (Sin Acceso)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12}/> Escalafón de Hoy
              </h4>
              <div className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-5 border border-slate-100 dark:border-white/5 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center transition-colors">
                {allSchedules.length > 0 ? (
                  allSchedules.map(s => (
                    <label key={s.id} className="flex items-center gap-3 p-3.5 bg-white dark:bg-secondary-700 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary-500/40 dark:hover:border-primary-500/40 cursor-pointer transition-all group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded-lg border-slate-300 dark:border-white/10 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer"
                        checked={selectedSchedules.includes(s.id)}
                        onChange={() => toggleSchedule(s.id)}
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-slate-800 dark:text-white leading-none italic">{s.hora}</span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase mt-1 truncate max-w-[150px]">{s.ruta}</span>
                      </div>
                    </label>
                  ))
                ) : (
                  <div className="py-10 flex flex-col items-center gap-2 opacity-30">
                    <Loader2 className="animate-spin text-primary-500" size={24} />
                    <p className="text-[10px] text-slate-400 dark:text-white font-bold uppercase italic">Sincronizando horarios...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 dark:border-amber-500/20 flex items-start gap-3 transition-colors">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-amber-700 dark:text-amber-500 font-bold leading-relaxed uppercase italic">
              Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors">
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-[10px] uppercase disabled:opacity-50 group"
          >
            <Trash2 size={16} className="group-hover:scale-110 transition-transform" /> Eliminar
          </button>

          <div className="flex items-center gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3.5 font-black text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-widest hover:text-slate-600 dark:hover:text-white transition-colors">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70 italic"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Guardar Cambios</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
