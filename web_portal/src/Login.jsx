import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

/**
 * 🔐 Login Component - Acceso Administrativo & Dueños
 */
function Login({ onShowRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Email o contraseña incorrectos. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100">

      {/* Lado Izquierdo: Branding & Context (Oculto en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <ShieldCheck size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-12 h-12 object-contain" />
          <span className="text-3xl font-black tracking-tighter text-white">Ruta-Go</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight tracking-tight">
            Acceso al <br />
            <span className="text-primary-500 text-7xl italic">centro de</span> <br />
            control.
          </h2>
          <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6">
            Ingresa para gestionar tu flota, <br />
            monitorear rutas y revisar ingresos.
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          ChopCode Solutions • Secure Access Gateway
        </div>
      </div>

      {/* Lado Derecho: Formulario de Login */}
      <div className="flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500">

        {/* Botón Volver */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Iniciar Sesión</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Portal de Administradores y Socios</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <LoginInput
              label="Correo Corporativo"
              type="email"
              placeholder="tu@rutago.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={setEmail}
            />

            <LoginInput
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={setPassword}
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
              className="w-full bg-secondary-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Ingresar al Dashboard"
              )}
            </button>
          </form>

          {/* Registro Link */}
          <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
              ¿Aún no eres socio? {' '}
              <button
                onClick={onShowRegister}
                className="text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5"
              >
                Registrar mi Flota
              </button>
            </p>
          </div>

          <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
             Ruta-Go Portal © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginInput({ label, type, placeholder, icon, value, onChange }) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500">
          {icon}
        </div>
        <input
          type={type}
          required
          className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Login;
