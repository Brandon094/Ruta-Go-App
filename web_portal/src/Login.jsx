import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Lock, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { AuthLayout } from './components/auth/AuthLayout';

/**
 * 🔐 Login Component - Acceso Administrativo, Dueños, Conductores & Pasajeros
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Error al iniciar sesión con Google: " + err.message);
      }
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
    <AuthLayout
      onBack={onBack}
      heroIcon={ShieldCheck}
      heroTitle="Acceso"
      heroHighlight="Inteligente"
      heroSubtitle="Universal."
      footerText="ChopCode Solutions • Secure Access Gateway"
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">Iniciar Sesión</h3>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <p className="text-slate-400 dark:text-white/40 font-bold text-[10px] uppercase tracking-widest">Puerta de Enlace Única (SSO)</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="tu@correo.com"
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

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            size="full"
            className="py-5 text-sm"
          >
            Entrar a Ruta-Go
          </Button>
        </form>

        {/* Separador u Or */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
            o con tu cuenta
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
        </div>

        {/* Botón de Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Registro Link */}
        <div className="pt-6 border-t border-slate-50 dark:border-white/5 text-center">
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
    </AuthLayout>
  );
}

export default Login;
