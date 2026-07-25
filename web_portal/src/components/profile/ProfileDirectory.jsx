import React, { useState, useEffect } from 'react';
import {
  User, Phone, Mail, Lock, Hash, Star, Car, Palette, Users, Calendar,
  CheckCircle2, X, Pencil, AlertCircle
} from 'lucide-react';
import { ref, update } from "firebase/database";
import { db } from '../../firebase';
import { ProfileInfoItem } from './ProfileInfoItem';
import { ProfileHeader } from './ProfileHeader';
import { ProfileCard } from './ProfileCard';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export function ProfileDirectory({ user: currentUser, role }) {
  const name = role?.name || currentUser?.displayName || 'Usuario Ruta-Go';
  const phone = role?.phone || '---';
  const roleLabel = role?.type === 'ADMIN' ? 'Administrador Maestro' :
                    role?.type === 'OWNER' ? 'Socio de Flota' :
                    role?.type === 'DRIVER' ? 'Conductor Activo' :
                    'Pasajero Activo';

  const [isEditing, setIsEditing] = useState(false);
  const [editTab, setEditTab] = useState('PERSONAL');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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

  useEffect(() => {
    if (isEditing) {
      setNewName(role?.name && role.name !== 'Socio Ruta-Go' ? role.name : '');
      setNewPhone(role?.phone && role.phone !== '---' ? role.phone : '');

      if (role?.vehicle) {
        setVPlaca(role.vehicle.placa || role.vehicle.id || '');
        setVMarca(role.vehicle.marca || '');
        setVModelo(role.vehicle.modelo || '');
        setVColor(role.vehicle.color || '');
        setVAno(role.vehicle.año || role.vehicle.ano || '');
        setVCapacidad(role.vehicle.capacidad?.toString() || '');
      }
    }
  }, [isEditing, role]);

  const handleSavePersonal = async () => {
    if (!role?.uid) return;
    setLoading(true);
    setMessage(null);
    try {
      await update(ref(db, `usuarios/${role.uid}`), {
        nombre: newName || name,
        telefono: newPhone || phone
      });

      if (role.type === 'DRIVER') {
        await update(ref(db, `conductores/${role.uid}`), {
          nombre: newName || name,
          telefono: newPhone || phone
        });
      }

      setMessage({ type: 'success', text: 'Perfil actualizado con éxito' });
      setTimeout(() => { setIsEditing(false); setMessage(null); }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: Sin permisos' });
    } finally { setLoading(false); }
  };

  const handleSaveVehicle = async () => {
    const vehicleId = role.vehicle?.id || vPlaca;
    if (!vehicleId) return;
    setLoading(true);
    setMessage(null);
    try {
      const updatesMap = {
        marca: vMarca,
        modelo: vModelo,
        color: vColor,
        año: vAnio,
        ano: vAnio,
        capacidad: parseInt(vCapacidad)
      };
      await update(ref(db, `vehiculos/${vehicleId}`), updatesMap);
      setMessage({ type: 'success', text: 'Vehículo actualizado correctamente' });
      setTimeout(() => { setIsEditing(false); setMessage(null); }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al actualizar vehículo' });
    } finally { setLoading(false); }
  };

  return (
    <div className="animate-in fade-in duration-700 -m-4 lg:-m-8 flex flex-col min-h-full">

      {/* 🏛️ Organism: ProfileHeader (Atomic Refactor) */}
      <ProfileHeader name={name} roleLabel={roleLabel} avatarUrl={currentUser?.photoURL} />

      <div className="max-w-xl mx-auto -mt-10 relative z-10 px-4 pb-20 space-y-8 w-full">

        {/* ⚛️ Molecule: ProfileCard Personal (Atomic Refactor) */}
        <ProfileCard title="Información Personal">
          <div className="space-y-8">
            <ProfileInfoItem icon={<Mail size={22} />} label="Email" value={currentUser?.email} />
            <ProfileInfoItem icon={<Phone size={22} />} label="Teléfono" value={phone} />
          </div>
        </ProfileCard>

        {/* ⚛️ Molecule: ProfileCard Vehicle (Atomic Refactor) */}
        {role.type === 'DRIVER' && role.vehicle && (
          <ProfileCard title="Detalles del Vehículo">
            <div className="grid grid-cols-2 gap-8">
               <ProfileInfoItem icon={<Car size={20}/>} label="Modelo" value={role.vehicle.modelo} />
               <ProfileInfoItem icon={<Hash size={20}/>} label="Placa" value={role.vehicle.id} />
               <ProfileInfoItem icon={<Users size={20}/>} label="Capacidad" value={role.vehicle.capacidad} />
               <ProfileInfoItem icon={<Calendar size={20}/>} label="Año" value={role.vehicle.año} />
            </div>
          </ProfileCard>
        )}

        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          size="full"
          icon={Pencil}
          className="rounded-[2rem] shadow-xl"
        >
          Editar Perfil
        </Button>

        <div className="text-center pt-4">
           <button className="text-red-500/60 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-colors">
              Solicitar borrar cuenta
           </button>
        </div>
      </div>

      {/* 🏛️ Organism: Edit Profile Modal (Atomic Refactor) */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title={role.type === 'DRIVER' ? 'Configuración de Perfil' : 'Editar Perfil'}
      >
        {role.type === 'DRIVER' && (
          <div className="flex bg-[#0A1F30] border-b border-white/5">
            <button
              onClick={() => setEditTab('PERSONAL')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${editTab === 'PERSONAL' ? 'bg-primary-500 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              Personal
            </button>
            <button
              onClick={() => setEditTab('VEHICULO')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${editTab === 'VEHICULO' ? 'bg-primary-500 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              Vehículo
            </button>
          </div>
        )}

        <div className="p-8 space-y-8">
          {message && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in-95 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <AlertCircle size={18}/>
              <p className="text-xs font-black uppercase tracking-tight">{message.text}</p>
            </div>
          )}

          {editTab === 'PERSONAL' ? (
            <div className="space-y-6">
              <Input placeholder="Nuevo nombre" icon={<User size={20} />} value={newName} onChange={setNewName} />
              <Input placeholder="Nuevo teléfono" icon={<Phone size={20} />} value={newPhone} onChange={setNewPhone} />
            </div>
          ) : (
            <div className="space-y-4">
              <Input icon={<Hash size={20}/>} placeholder="Placa" value={vPlaca} onChange={setVPlaca} />
              <Input icon={<Star size={20}/>} placeholder="Marca" value={vMarca} onChange={setVMarca} />
              <Input icon={<Car size={20}/>} placeholder="Modelo" value={vModelo} onChange={setVModelo} />
              <Input icon={<Users size={20}/>} placeholder="Capacidad" value={vCapacidad} onChange={setVCapacidad} />
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={editTab === 'PERSONAL' ? handleSavePersonal : handleSaveVehicle} isLoading={loading} size="full" icon={CheckCircle2}>
              Guardar Cambios
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="ghost" size="full" className="text-slate-500">
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
