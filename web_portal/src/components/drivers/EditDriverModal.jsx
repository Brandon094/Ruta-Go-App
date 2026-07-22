import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Trash2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { driverService } from '../../services/driverService';

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
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Editar Conductor</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID Operativo: {driver.id.substring(0,8)}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all">
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
              <InputField label="Nombre Legal" value={formData.nombre} onChange={(v) => setFormData({...formData, nombre: v})} />
              <InputField label="Placa Asignada" value={formData.placaVehiculo} onChange={(v) => setFormData({...formData, placaVehiculo: v.toUpperCase()})} />

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">Estado</label>
                <select
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">🟢 En Ruta (Activo)</option>
                  <option value="inactive">🟡 Descanso (Inactivo)</option>
                  <option value="blocked">🔴 Bloqueado (Sin Acceso)</option>
                </select>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12}/> Escalafón de Hoy
              </h4>
              <div className="bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center">
                {allSchedules.length > 0 ? (
                  allSchedules.map(s => (
                    <label key={s.id} className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer"
                        checked={selectedSchedules.includes(s.id)}
                        onChange={() => toggleSchedule(s.id)}
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-slate-800 leading-none">{s.hora}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]">{s.ruta}</span>
                      </div>
                    </label>
                  ))
                ) : (
                  <div className="py-10 flex flex-col items-center gap-2 opacity-30">
                    <Loader2 className="animate-spin" size={24} />
                    <p className="text-[10px] font-bold uppercase italic">Sincronizando horarios...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-amber-700 font-bold leading-relaxed uppercase">
              Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group"
          >
            <Trash2 size={16} className="group-hover:scale-110 transition-transform" /> Eliminar
          </button>

          <div className="flex items-center gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Guardar Cambios</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">{label}</label>
      <input
        type="text"
        required
        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
