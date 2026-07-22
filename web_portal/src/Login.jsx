import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, Mail, Loader2 } from 'lucide-react';

/**
 * 🔐 Login Component - Acceso Administrativo
 *
 * Gestiona la autenticación de administradores para el acceso al portal de Ruta-Go.
 */
function Login({ onShowRegister }) {
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
      setError("Credenciales inválidas o acceso no autorizado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border border-white/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center font-black text-3xl text-white mx-auto mb-4 shadow-lg shadow-primary-500/30 transform -rotate-3">
            R
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ruta-Go Admin</h1>
          <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">Portal de Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-semibold text-sm"
                placeholder="admin@rutago.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-semibold text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Ingresar al Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            ¿Eres nuevo admin? {' '}
            <button
              onClick={onShowRegister}
              className="text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5"
            >
              Registrate aquí
            </button>
          </p>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-4 border-t border-slate-100">
            ChopCode Solutions © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
