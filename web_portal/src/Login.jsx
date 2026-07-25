import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Lock, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { AuthLayout } from './components/auth/AuthLayout';

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
    <AuthLayout
      onBack={onBack}
      heroIcon={ShieldCheck}
      heroTitle="Acceso"
      heroHighlight="Inteligente"
      heroSubtitle="Universal."
      footerText="ChopCode Solutions • Secure Access Gateway"
    >
      <div className="space-y-10">
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
    </AuthLayout>
  );
}

export default Login;
