import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { Lock, Mail, User, Phone, TrendingUp, Users } from 'lucide-react';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { AuthLayout } from './components/auth/AuthLayout';
import { RoleBenefit } from './components/auth/RoleBenefit';
import { RegisterSuccess } from './components/auth/RegisterSuccess';

/**
 * 📝 Register Component - Registro Universal NoSQL v2.0 (Pasajeros & Socios)
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

      const userRef = ref(db, `users/${user.uid}`);
      const userData = {
        id: user.uid,
        name: name,
        email: email,
        phone: phone,
        role: mode === 'owner' ? 'owner' : 'passenger',
        registrationDate: Date.now(),
        status: 'active'
      };

      await set(userRef, userData);

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

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userRef = ref(db, `users/${user.uid}`);
      const userSnap = await get(userRef);

      const targetRole = mode === 'owner' ? 'owner' : 'passenger';

      if (!userSnap.exists()) {
        const userData = {
          id: user.uid,
          name: user.displayName || name || (mode === 'owner' ? 'Socio Google' : 'Pasajero Google'),
          email: user.email || email || '',
          phone: user.phoneNumber || phone || '',
          photoUrl: user.photoURL || '',
          role: user.email === 'dazace94@gmail.com' ? 'admin' : targetRole,
          registrationDate: Date.now(),
          status: 'active'
        };
        await set(userRef, userData);
      } else {
        const existingData = userSnap.val();
        if (!existingData.role || (existingData.role === 'passenger' && targetRole === 'owner')) {
          await set(userRef, { ...existingData, role: targetRole });
        }
      }

      setName(user.displayName || name || (mode === 'owner' ? 'Socio' : 'Pasajero'));
      setSuccess(true);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Error al registrarse con Google: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-secondary-900 flex items-center justify-center p-4 transition-colors duration-300">
        <RegisterSuccess name={name} onBack={onBack} />
      </div>
    );
  }

  return (
    <AuthLayout
      onBack={onBack}
      heroIcon={mode === 'owner' ? TrendingUp : Users}
      heroTitle={mode === 'owner' ? 'Únete a la' : 'Viaja con'}
      heroHighlight="revolución"
      heroSubtitle={mode === 'owner' ? 'del transporte.' : 'del Huila.'}
    >
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="space-y-1 text-left">
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
             <ul className="space-y-2 text-left">
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

        {/* Separador Google */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
            o regístrate con
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
        </div>

        {/* Botón de Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleRegister}
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
          <span>
            {mode === 'owner' ? 'Registrarse como Socio con Google' : 'Registrarse con Google'}
          </span>
        </button>

        <p className="text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]">
           Ruta-Go Portal © 2026
        </p>
      </div>
    </AuthLayout>
  );
}
