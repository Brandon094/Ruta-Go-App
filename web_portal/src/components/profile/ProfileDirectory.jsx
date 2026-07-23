import React, { useState } from 'react';
import {
  ChevronLeft, User, Phone, Mail, Lock, Hash, Star, Car, Palette, Users, Calendar,
  Loader2, CheckCircle2, X, Camera, Pencil
} from 'lucide-react';
import { ref, update } from "firebase/database";
import { db } from '../../firebase';
import { ProfileInfoItem } from './ProfileInfoItem';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

export function ProfileDirectory({ user: currentUser, role }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTab, setEditTab] = useState('PERSONAL'); // 'PERSONAL' | 'VEHICULO'
  const [loading, setLoading] = useState(false);

  // Form States
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Vehicle Form States
  const [vPlaca, setVPlaca] = useState('');
  const [vMarca, setVMarca] = useState('');
  const [vModelo, setVModelo] = useState('');
  const [vColor, setVColor] = useState('');
  const [vAnio, setVAno] = useState('');
  const [vCapacidad, setVCapacidad] = useState('');

  const name = role?.name || currentUser?.displayName || 'Usuario Ruta-Go';
  const phone = role?.phone || '---';
  const roleLabel = role?.type === 'ADMIN' ? 'Administrador Maestro' :
                    role?.type === 'OWNER' ? 'Socio de Flota' :
                    role?.type === 'DRIVER' ? 'Conductor Activo' :
                    'Pasajero Activo';

  const handleSavePersonal = async () => {
    if (!newName && !newPhone) return;
    setLoading(true);
    try {
      const updates = {};
      const node = role.type === 'ADMIN' ? 'admins' :
                   role.type === 'OWNER' ? 'dueños' :
                   role.type === 'DRIVER' ? 'conductores' : 'usuarios';

      if (newName) updates[`${node}/${role.uid}/nombre`] = newName;
      if (newPhone) updates[`${node}/${role.uid}/telefono`] = newPhone;

      await update(ref(db), updates);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVehicle = async () => {
    const vehicleId = role.vehicle?.id || vPlaca;
    if (!vehicleId) return;
    setLoading(true);
    try {
      const vehicleUpdates = {};
      if (vMarca) vehicleUpdates.marca = vMarca;
      if (vModelo) vehicleUpdates.modelo = vModelo;
      if (vColor) vehicleUpdates.color = vColor;
      if (vAnio) vehicleUpdates.año = vAnio;
      if (vCapacidad) vehicleUpdates.capacidad = parseInt(vCapacidad);

      await update(ref(db, `vehiculos/${vehicleId}`), vehicleUpdates);

      if (vPlaca && vPlaca !== role.vehicle?.id) {
        await update(ref(db, `conductores/${role.uid}`), {
          placaVehiculo: vPlaca,
          vehiculoId: vPlaca
        });
      }

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="animate-in fade-in duration-500 bg-secondary-50 dark:bg-[#061426] fixed inset-0 z-[50] overflow-y-auto transition-colors duration-300">
        {/* Header Naranja */}
        <div className="bg-primary-500 p-6 flex items-center gap-4 text-white sticky top-0 z-10 shadow-lg">
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black uppercase italic tracking-tight">
            {role.type === 'DRIVER' ? 'Editar Perfil Conductor' : 'Editar Perfil'}
          </h2>
        </div>

        {/* Tabs for Driver */}
        {role.type === 'DRIVER' && (
          <div className="flex bg-primary-500 border-t border-white/10 sticky top-[76px] z-10 shadow-md">
            <button
              onClick={() => setEditTab('PERSONAL')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${editTab === 'PERSONAL' ? 'border-b-4 border-white text-white' : 'text-white/60'}`}
            >
              Personal
            </button>
            <button
              onClick={() => setEditTab('VEHICULO')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${editTab === 'VEHICULO' ? 'border-b-4 border-white text-white' : 'text-white/60'}`}
            >
              Vehículo
            </button>
          </div>
        )}

        <div className="max-w-xl mx-auto p-6 space-y-10 pb-32 mt-4">
          {editTab === 'PERSONAL' ? (
            <>
              {/* Información Actual */}
              <div className="space-y-4">
                <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest ml-2 italic">Información actual</h3>
                <div className="card-base rounded-[2rem] p-6 space-y-5 shadow-xl bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none transition-colors duration-300">
                  <div className="flex items-center gap-4 text-slate-700 dark:text-white/80">
                    <div className="p-2 bg-primary-500/5 dark:bg-white/5 rounded-lg transition-colors"><User size={18} className="text-orange-500" /></div>
                    <span className="text-sm font-bold">{name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 dark:text-white/80">
                    <div className="p-2 bg-primary-500/5 dark:bg-white/5 rounded-lg transition-colors"><Phone size={18} className="text-orange-500" /></div>
                    <span className="text-sm font-bold">{phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 dark:text-white/80">
                    <div className="p-2 bg-primary-500/5 dark:bg-white/5 rounded-lg transition-colors"><Mail size={18} className="text-orange-500" /></div>
                    <span className="text-sm font-bold">{currentUser?.email}</span>
                  </div>
                </div>
              </div>

              {/* Nuevos Datos */}
              <div className="space-y-6">
                <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest ml-2 italic">Nuevos datos</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Nuevo nombre completo"
                    icon={<User size={20} />}
                    value={newName}
                    onChange={setNewName}
                  />
                  <Input
                    placeholder="Nuevo número de teléfono"
                    icon={<Phone size={20} />}
                    value={newPhone}
                    onChange={setNewPhone}
                  />

                  <div className="p-6 bg-white dark:bg-[#0A1F30]/50 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 shadow-lg transition-colors">
                     <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-tight">El correo electrónico no se puede modificar por seguridad.</p>
                     <div className="flex items-center gap-4 text-slate-300 dark:text-white/20 transition-colors">
                        <Lock size={18} />
                        <span className="text-sm font-bold">{currentUser?.email}</span>
                     </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Información Vehículo Actual */}
              <div className="space-y-4">
                <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest ml-2 italic">Datos del Vehículo Actuales</h3>
                <div className="card-base rounded-[2rem] p-8 grid grid-cols-2 gap-8 shadow-xl bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none transition-colors">
                   <div className="flex items-center gap-3">
                      <Hash size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Placa</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.id || '---'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Star size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Marca</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.marca || '---'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Car size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Modelo</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.modelo || '---'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Palette size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Color</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.color || '---'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Users size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Capacidad</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.capacidad || '---'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-orange-500" />
                      <div>
                        <p className="text-[8px] text-slate-400 dark:text-white/30 uppercase font-bold">Año</p>
                        <p className="text-xs text-slate-800 dark:text-white font-black uppercase truncate">{role.vehicle?.año || '---'}</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Nuevos Datos Vehículo */}
              <div className="space-y-4">
                <Input icon={<Hash size={20}/>} placeholder="Nueva placa" value={vPlaca} onChange={setVPlaca} />
                <Input icon={<Star size={20}/>} placeholder="Marca" value={vMarca} onChange={setVMarca} />
                <Input icon={<Car size={20}/>} placeholder="Modelo" value={vModelo} onChange={setVModelo} />
                <Input icon={<Palette size={20}/>} placeholder="Color" value={vColor} onChange={setVColor} />
                <Input icon={<Calendar size={20}/>} placeholder="Año" value={vAnio} onChange={setVAno} />
                <Input icon={<Users size={20}/>} placeholder="Capacidad" value={vCapacidad} onChange={setVCapacidad} />
              </div>
            </>
          )}

          {/* Botones de Acción */}
          <div className="space-y-4 pt-6">
            <button
              onClick={editTab === 'PERSONAL' ? handleSavePersonal : handleSaveVehicle}
              disabled={loading}
              className="w-full py-5 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-primary-500/30 active:scale-95 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={20}/> : <><CheckCircle2 size={20}/> Guardar Cambios</>}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-5 border-2 border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/60 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <X size={20}/> Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 -m-4 lg:-m-8">

      {/* 🟠 HEADER NARANJA (Estilo Mobile) */}
      <div className="bg-primary-500 pt-12 pb-20 relative overflow-hidden flex flex-col items-center text-center transition-colors duration-300">
        <div className="relative group">
          <div className="w-40 h-40 bg-amber-400 rounded-full border-4 border-slate-900/10 dark:border-[#061426] flex items-center justify-center text-[#061426] shadow-2xl relative transition-all duration-300">
            <User size={80} strokeWidth={1.5} />

            {/* Botón Cámara */}
            <button className="absolute bottom-1 right-1 bg-slate-900 dark:bg-[#061426] p-2.5 rounded-full border-2 border-white text-white hover:bg-black transition-all shadow-xl">
               <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Chip de Estado en Header */}
        <div className="mt-6 space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">{name}</h2>
          <Badge variant="success" className="!bg-white/10 dark:!bg-[#061426]/40 !border-white/20 dark:!border-green-500/50 backdrop-blur-md !px-6 shadow-xl text-white">
             {roleLabel}
          </Badge>
        </div>
      </div>

      <div className="max-w-xl mx-auto -mt-10 relative z-10 px-4 pb-20 space-y-8">

        {/* Card de Información Personal */}
        <div className="card-base rounded-[2.5rem] p-8 lg:p-10 shadow-2xl bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none transition-colors">
          <h3 className="text-orange-500 font-black uppercase text-sm tracking-widest italic">Información Personal</h3>

          <div className="space-y-8">
            <ProfileInfoItem icon={<Mail size={22} />} label="Email" value={currentUser?.email} />
            <ProfileInfoItem icon={<Phone size={22} />} label="Teléfono" value={phone} />
          </div>
        </div>

        {/* Card de Información Vehículo (Solo Conductores) */}
        {role.type === 'DRIVER' && role.vehicle && (
          <div className="card-base rounded-[2.5rem] p-8 lg:p-10 shadow-2xl bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none transition-colors">
            <h3 className="text-orange-500 font-black uppercase text-sm tracking-widest italic">Detalles del Vehículo</h3>

            <div className="grid grid-cols-2 gap-8">
               <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 transition-colors"><Car size={20}/></div>
                  <div className="min-w-0">
                     <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase">Modelo</p>
                     <p className="text-xs font-black text-slate-800 dark:text-white truncate">{role.vehicle.modelo}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 transition-colors"><Hash size={20}/></div>
                  <div className="min-w-0">
                     <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase">Placa</p>
                     <p className="text-xs font-black text-slate-800 dark:text-white truncate">{role.vehicle.id}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 transition-colors"><Users size={20}/></div>
                  <div className="min-w-0">
                     <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase">Capacidad</p>
                     <p className="text-xs font-black text-slate-800 dark:text-white truncate">{role.vehicle.capacidad}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 transition-colors"><Calendar size={20}/></div>
                  <div className="min-w-0">
                     <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase">Año</p>
                     <p className="text-xs font-black text-slate-800 dark:text-white truncate">{role.vehicle.año}</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsEditing(true)}
          className="w-full py-5 border-2 border-orange-500 rounded-[2rem] flex items-center justify-center gap-3 text-orange-500 font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-orange-500/10 active:scale-95"
        >
           <Pencil size={20} />
           Editar Perfil
        </button>

        {/* Link de Borrado */}
        <div className="text-center pt-4">
           <button className="text-red-500/60 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-colors">
              Solicitar borrar cuenta
           </button>
        </div>
      </div>
    </div>
  );
}
