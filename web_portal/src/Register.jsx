import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Lock, Mail, User, Loader2, ArrowLeft, Phone, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';

/**
 * 📝 Register Component - Registro Universal (Pasajeros & Socios)
 */
export default function Register({ onBack, initialMode = 'owner' }) {
  const [mode, setMode] = useState(initialMode); // 'passenger' | 'owner'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userRef = ref(db, `usuarios/${user.uid}`);
      const userData = {
        id: user.uid,
        nombre: name,
        email: email,
        telefono: phone,
        rol: mode === 'owner' ? 'dueño' : 'pasajero',
        fechaRegistro: Date.now(),
        status: 'active'
      };

      await set(userRef, userData);

      if (mode === 'owner') {
        const ownerRef = ref(db, `dueños/${user.uid}`);
        await set(ownerRef, true);
      }

      setSuccess(true);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Este correo ya está registrado en Ruta-Go.");
      } else {
        setError("Ocurrió un error al procesar tu solicitud.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-secondary-900 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-secondary-800 rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-white/5">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-3xl flex items-center justify-center text-green-600 dark:text-green-500 mx-auto animate-bounce shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">
              ¡Bienvenido!
            </h2>
            <p className="text-slate-500 dark:text-white/60 font-medium leading-relaxed">
              Hola <span className="text-primary-500 font-bold">{name}</span>, tu cuenta ha sido creada exitosamente.
            </p>
            <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl border border-primary-100 dark:border-primary-500/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Ya puedes iniciar sesión y explorar el portal.
            </div>
          </div>
          <Button
            onClick={onBack}
            variant="primary"
            size="full"
          >
            Ir al Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex flex-col lg:flex-row overflow-hidden transition-colors duration-300">

      {/* Lado Izquierdo: Branding & Value (Oculto en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-secondary-800 p-20 flex-col justify-between relative border-r border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          {mode === 'owner' ? (
            <TrendingUp size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />
          ) : (
            <Users size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />
          )}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-12 h-12 object-contain" />
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Ruta-Go</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight tracking-tight uppercase">
            {mode === 'owner' ? 'Únete a la' : 'Viaja con'} <br />
            <span className="text-primary-500 text-7xl italic">revolución</span> <br />
            {mode === 'owner' ? 'del transporte.' : 'del Huila.'}
          </h2>
          <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6">
            {mode === 'owner'
              ? 'Gestión de flota, contabilidad en vivo y control operativo total.'
              : 'Reservas en tiempo real, puntos de fidelidad y la mejor experiencia.'}
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          ChopCode Solutions • Engineering for Productivity
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="flex-1 bg-transparent p-6 lg:p-20 flex flex-col justify-center relative animate-in slide-in-from-right-4 duration-500">
        <div className="absolute top-8 left-8 lg:left-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            icon={ArrowLeft}
            className="!p-3 rounded-full group"
          >
          </Button>
        </div>

        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">
                {mode === 'owner' ? 'Registro de Socio' : 'Nuevo Pasajero'}
              </h3>
              <p className="text-slate-400 dark:text-white/40 font-bold text-[10px] uppercase tracking-widest">
                {mode === 'owner' ? 'Registra tus datos para afiliar tu flota' : 'Únete gratis y reserva tus viajes en segundos'}
              </p>
            </div>

            {/* Selector de Modo */}
            <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl transition-colors border border-slate-200 dark:border-white/5">
              <button
                onClick={() => setMode('passenger')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                  mode === 'passenger' ? 'bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-lg' : 'text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40'
                }`}
              >
                <Users size={14} /> Soy Pasajero
              </button>
              <button
                onClick={() => setMode('owner')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                  mode === 'owner' ? 'bg-white dark:bg-primary-500 text-secondary-900 dark:text-white shadow-lg' : 'text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40'
                }`}
              >
                <TrendingUp size={14} /> Soy Socio
              </button>
            </div>

            {/* Info Box de Rol */}
            <div className="p-5 bg-primary-500/5 dark:bg-primary-500/10 rounded-[1.5rem] border border-primary-500/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary-500 rounded-lg text-white">
                    {mode === 'owner' ? <TrendingUp size={14} /> : <Users size={14} />}
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">Beneficios del Perfil</h4>
               </div>
               <ul className="space-y-2">
                  {mode === 'owner' ? (
                    <>
                      <RoleBenefit text="Control room total de tus vehículos e ingresos." />
                      <RoleBenefit text="Gestión de conductores por correo corporativo." />
                      <RoleBenefit text="Métricas de ocupación y rendimiento en tiempo real." />
                    </>
                  ) : (
                    <>
                      <RoleBenefit text="Reserva tu asiento favorito desde Safari o Chrome." />
                      <RoleBenefit text="Acumula Puntos Go y sube de nivel para beneficios PRO." />
                      <RoleBenefit text="Historial unificado de viajes y tiquetes digitales." />
                    </>
                  )}
               </ul>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <Input
              label="Nombre Completo"
              placeholder="Ej: Juan Pérez"
              icon={<User size={18} />}
              value={name}
              onChange={setName}
              required
            />

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={setEmail}
              required
            />

            <Input
              label="Teléfono / WhatsApp"
              placeholder="321 000 0000"
              icon={<Phone size={18} />}
              value={phone}
              onChange={setPhone}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={setPassword}
              required
            />

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase flex items-center gap-3 animate-shake">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {error}
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading}
              variant="primary"
              size="full"
              className="py-5 text-sm"
            >
              {mode === 'owner' ? "Crear Cuenta de Socio" : "Crear Cuenta de Pasajero"}
            </Button>
          </form>

          <p className="text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]">
             Ruta-Go Portal © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleBenefit({ text }) {
  return (
    <li className="flex gap-3 text-[10px] font-bold text-slate-500 dark:text-white/40 leading-relaxed uppercase">
       <CheckCircle2 size={12} className="text-primary-500 shrink-0 mt-0.5" />
       {text}
    </li>
  );
}
