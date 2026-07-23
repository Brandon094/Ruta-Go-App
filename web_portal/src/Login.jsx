import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from './components/ui/Input';

/**
 * 🔐 Login Component - Acceso Administrativo & Dueños
 */
function Login({ onShowRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Email o contraseña incorrectos. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (err) {
      setError("Error al enviar el correo de recuperación. Verifica el email ingresado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100 transition-colors duration-300">

      {/* Lado Izquierdo: Branding & Context (Oculto en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#061426] to-[#0B2B3F] p-20 flex-col justify-between relative border-r border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <ShieldCheck size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-12 h-12 object-contain" />
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Ruta-Go</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight tracking-tight uppercase">
            Acceso <br />
            <span className="text-primary-500 text-7xl italic">Inteligente</span> <br />
            Universal.
          </h2>
          <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6">
            Una sola llave para todo el Holding. <br />
            El sistema detectará tu rol automáticamente.
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          ChopCode Solutions • Secure Access Gateway
        </div>
      </div>

      {/* Lado Derecho: Formulario de Login */}
      <div className="flex-1 bg-transparent p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500">

        {/* Botón Volver */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 lg:left-20 p-3 text-slate-400 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">Iniciar Sesión</h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <p className="text-slate-400 dark:text-white/40 font-bold text-[10px] uppercase tracking-widest">Puerta de Enlace Única (SSO)</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Correo Corporativo"
              type="email"
              placeholder="tu@rutago.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={setEmail}
              required
            />

            <div className="space-y-2">
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                value={password}
                onChange={setPassword}
                required
              />
              <div className="flex justify-end px-1">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-[10px] font-black text-slate-400 dark:text-white/20 hover:text-primary-500 uppercase tracking-widest transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase flex items-center gap-3 animate-shake">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {error}
              </div>
            )}

            {message && (
              <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 text-[10px] font-black uppercase flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-800 dark:bg-primary-500 hover:bg-black dark:hover:bg-primary-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 dark:shadow-primary-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Entrar a Ruta-Go"
              )}
            </button>
          </form>

          {/* Registro Link */}
          <div className="pt-8 border-t border-slate-50 dark:border-white/5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-tight">
              ¿Aún no eres socio? {' '}
              <button
                onClick={onShowRegister}
                className="text-primary-500 hover:text-primary-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5"
              >
                Registrar mi Flota
              </button>
            </p>
          </div>

          <p className="text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]">
             Ruta-Go Portal © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
