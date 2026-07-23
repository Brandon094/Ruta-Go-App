import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Lock, Mail, User, Loader2, ArrowLeft, Phone, CheckCircle2, TrendingUp, Users } from 'lucide-react';

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
        await set(ownerRef, "pendiente");
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
              {mode === 'owner' ? '¡Solicitud Recibida!' : '¡Bienvenido!'}
            </h2>
            <p className="text-slate-500 dark:text-white/60 font-medium leading-relaxed">
              Hola <span className="text-primary-500 font-bold">{name}</span>, tu cuenta ha sido creada exitosamente.
            </p>
            {mode === 'owner' ? (
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider">
                Nuestro equipo administrativo activará tu dashboard en breve.
              </div>
            ) : (
              <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl border border-primary-100 dark:border-primary-500/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Ya puedes iniciar sesión y reservar tu primer viaje.
              </div>
            )}
          </div>
          <button
            onClick={onBack}
            className="w-full py-4 bg-[#061426] dark:bg-primary-500 text-white font-black rounded-2xl shadow-xl hover:bg-black dark:hover:bg-primary-600 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            Ir al Inicio
          </button>
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
        <button
          onClick={onBack}
          className="absolute top-8 left-8 lg:left-20 p-3 text-slate-400 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

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
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <InputField
              label="Nombre Completo"
              placeholder="Ej: Juan Pérez"
              icon={<User size={18} />}
              value={name}
              onChange={setName}
              required
            />

            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={setEmail}
              required
            />

            <InputField
              label="Teléfono / WhatsApp"
              placeholder="321 000 0000"
              icon={<Phone size={18} />}
              value={phone}
              onChange={setPhone}
              required
            />

            <InputField
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest ${
                mode === 'owner' ? 'bg-[#061426] dark:bg-primary-500 hover:bg-black dark:hover:bg-primary-600 shadow-slate-900/30' : 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/30'
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                mode === 'owner' ? "Enviar Solicitud de Socio" : "Crear mi Cuenta de Pasajero"
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]">
             Ruta-Go Portal © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder, icon, required = false }) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 dark:text-white/20 transition-colors group-focus-within:text-primary-500">
          {icon}
        </div>
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
