import React from 'react';
import { ArrowLeft, ShieldCheck, Database, Trash2, Mail } from 'lucide-react';

export default function Privacy({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-black text-secondary-900 tracking-tight">Política de Privacidad</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify">
        <section className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protección de Datos</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Habeas Data & Seguridad</h2>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed italic">
            Estamos comprometidos con la seguridad de sus datos en cumplimiento de la <strong className="text-secondary-900">Ley 1581 de 2012</strong> de la República de Colombia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataPoint icon={<Database size={18}/>} title="Operación" desc="Recolectamos nombres, correos y placas para la gestión logística." />
            <DataPoint icon={<Mail size={18}/>} title="Contacto" desc="El teléfono es esencial para la coordinación real entre chofer y pasajero." />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4">3. Eliminación de Datos (Derecho al Olvido)</h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para la eliminación de su cuenta y datos personales:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-xs font-bold text-slate-500">
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0">1</span>
                  Desde la App Móvil: Perfil &gt; Editar Perfil &gt; Eliminar Cuenta.
                </li>
                <li className="flex gap-3 text-xs font-bold text-slate-500">
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0">2</span>
                  Desde el Portal Web: Mi Perfil &gt; Solicitar borrar cuenta.
                </li>
                <li className="flex gap-3 text-xs font-bold text-slate-500">
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0">3</span>
                  Vía Email: Enviando solicitud desde el correo registrado a <strong className="text-secondary-900">dazace94@gmail.com</strong>.
                </li>
              </ul>
              <div className="p-4 bg-amber-50 rounded-xl flex items-center gap-3">
                <Trash2 className="text-amber-500" size={18} />
                <p className="text-[10px] text-amber-700 font-black uppercase">Periodo de gracia: 30 días antes del borrado definitivo.</p>
              </div>
            </div>

            <h3 className="text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4">4. Seguridad y Segregación</h3>
            <p className="text-slate-600 leading-relaxed">
              Implementamos una arquitectura de <strong className="text-secondary-900">Segregación Total de Roles</strong>.
              Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación.
            </p>
          </div>
        </section>

        <footer className="text-center pb-10">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            ChopCode Solutions © 2026 • Privacidad Blindada
          </p>
        </footer>
      </main>
    </div>
  );
}

function DataPoint({ icon, title, desc }) {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
      <div className="text-primary-500">{icon}</div>
      <h4 className="font-black text-secondary-900 text-xs uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
