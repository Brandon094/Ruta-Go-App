import React from 'react';
import { ArrowLeft, ShieldAlert, FileText, Scale } from 'lucide-react';

export default function Terms({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-black text-secondary-900 tracking-tight">Términos y Condiciones</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner">
              <Scale size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acuerdo Legal</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reglas de Operación Ruta-Go</h2>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed italic">
            Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026.
            Al utilizar la plataforma (App o Web), usted acepta estos términos.
          </p>

          <div className="space-y-6">
            <h3 className="text-lg font-black text-secondary-900 flex items-center gap-2 italic">1. Naturaleza del Servicio</h3>
            <p className="text-slate-600 leading-relaxed">
              Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal.
              Actuamos como un motor de gestión de cupos y horarios.
              <strong className="text-secondary-900"> Chop Code Solutions no es una empresa de transportes</strong> ni posee flota vehicular propia.
            </p>

            <h3 className="text-lg font-black text-secondary-900 flex items-center gap-2 italic">2. Responsabilidad de Socios y Dueños</h3>
            <p className="text-slate-600 leading-relaxed">
              Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines
              estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata.
            </p>

            <h3 className="text-lg font-black text-secondary-900 flex items-center gap-2 italic">3. Compromisos de Seguridad</h3>
            <p className="text-slate-600 leading-relaxed">
              Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y
              se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos.
            </p>

            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
              <ShieldAlert className="text-red-500 shrink-0" size={24} />
              <p className="text-xs text-red-700 font-bold leading-relaxed uppercase">
                Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes,
                retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma.
              </p>
            </div>

            <h3 className="text-lg font-black text-secondary-900 flex items-center gap-2 italic">4. Propiedad Intelectual</h3>
            <p className="text-slate-600 leading-relaxed">
              Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad
              exclusiva de <strong className="text-primary-500">Chop Code Solutions</strong>.
            </p>
          </div>
        </section>

        <footer className="text-center pb-10">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            ChopCode Solutions © 2026 • Natagá - La Plata, Huila
          </p>
        </footer>
      </main>
    </div>
  );
}
