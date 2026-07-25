import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';

/**
 * 🏛️ Organism: HistoryHeader
 * Cabecera del historial con búsqueda y filtros integrados.
 * Estilo espejo de Android v1.6.5
 */
export function HistoryHeader({ searchTerm, setSearchTerm, filter, setFilter }) {
  const filters = ['Todos', 'Confirmados', 'Cancelados', 'Este Mes'];

  return (
    <div className="bg-primary-500 p-6 lg:p-8 pb-20 relative overflow-hidden shadow-2xl transition-all duration-300 shrink-0">
      <div className="max-w-5xl mx-auto space-y-6 relative z-10">

        {/* Barra de Búsqueda */}
        <div className="px-2 md:px-0">
          <Input
            placeholder="Buscar por pasajero, ruta o placa..."
            icon={Search}
            value={searchTerm}
            onChange={setSearchTerm}
            className="!bg-white/10 !border-white/20 !text-white !placeholder:text-white/40 focus:!ring-white/20 shadow-lg"
          />
        </div>

        {/* Chips de Filtro (Molécula integrada) */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 w-full justify-start px-2 md:px-0">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-lg border ${
                filter === f
                ? 'bg-secondary-900 text-white border-transparent'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
