import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Lock, Mail, User, Loader2, ArrowLeft, Phone, CheckCircle2, TrendingUp } from 'lucide-react';

/**
 * 📝 Register Component - Registro de Dueños de Flota
 */
export default function Register({ onBack }) {
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
      // 1. Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Actualizar perfil con el nombre
      await updateProfile(user, { displayName: name });

      // 3. Registrar en el nodo de usuarios con rol de dueño
      const userRef = ref(db, `usuarios/${user.uid}`);
      await set(userRef, {
        id: user.uid,
        nombre: name,
        email: email,
        telefono: phone,
        rol: 'dueño', // Acceso inmediato
        fechaRegistro: Date.now(),
        status: 'active'
      });

      // 4. ✅ REGISTRO EN NODO DUEÑOS (Activación Instantánea)
      const ownerRef = ref(db, `dueños/${user.uid}`);
      await set(ownerRef, true);

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
      <div className="min-h-screen bg-secondary-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">¡Solicitud Enviada!</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Hola <span className="text-primary-500 font-bold">{name}</span>, hemos recibido tu solicitud para ser dueño de flota.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Nuestro equipo administrativo revisará tu perfil y activará tu dashboard en breve.
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden">

      {/* Lado Izquierdo: Branding & Value (Oculto en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <TrendingUp size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform -rotate-3">R</div>
          <span className="text-3xl font-black tracking-tighter text-white">Ruta-Go</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight tracking-tight">
            Únete a la <br />
            <span className="text-primary-500 text-7xl italic">revolución</span> <br />
            del transporte.
          </h2>
          <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6">
            Gestión de flota, contabilidad en vivo <br /> y control operativo total.
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          ChopCode Solutions • Engineering for Productivity
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Crea tu cuenta de Socio</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Registra tus datos para afiliar tu flota</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <InputField
              label="Nombre del Propietario"
              placeholder="Nombre y Apellidos"
              icon={<User size={18} />}
              value={name}
              onChange={setName}
              required
            />

            <InputField
              label="Email de Socio"
              type="email"
              placeholder="tu@correo.com"
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
              label="Contraseña de Acceso"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={setPassword}
              required
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Enviar Solicitud de Socio"}
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
             Ruta-Go Business 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder, icon, required = false }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500">
          {icon}
        </div>
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
