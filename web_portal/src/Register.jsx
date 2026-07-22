import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Lock, Mail, User, Loader2, ArrowLeft } from 'lucide-react';

/**
 * 📝 Register Component - Registro de Administradores
 *
 * Permite la creación de nuevas identidades administrativas en el ecosistema Ruta-Go.
 */
function Register({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

      // 3. (Opcional) Registrar en un nodo de solicitudes de admin o usuarios
      await set(ref(db, `usuarios/${user.uid}`), {
        id: user.uid,
        nombre: name,
        email: email,
        rol: 'admin_pending', // Por seguridad, queda pendiente de aprobación
        fechaRegistro: Date.now(),
        status: 'active'
      });

    } catch (err) {
      setError("Error al crear la cuenta. Verifica los datos o si el correo ya existe.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border border-white/10 relative">

        {/* Botón Volver */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center font-black text-3xl text-white mx-auto mb-4 shadow-lg shadow-primary-500/30 transform -rotate-3">
            R
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Nueva Cuenta</h1>
          <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">Portal Administrativo</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Campo Nombre */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-semibold text-sm"
                placeholder="Ej: Brandon Daza"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Email */}
          <div className="space-y-1.5">
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

          {/* Campo Contraseña */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                minLength="6"
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-semibold text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Crear Cuenta Admin"}
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400 mt-10 font-bold uppercase tracking-widest">
          ChopCode Solutions © 2026
        </p>
      </div>
    </div>
  );
}

export default Register;
