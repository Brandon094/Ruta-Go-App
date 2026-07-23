import React from 'react';

/**
 * ⚛️ Molecule: Input
 * Unifica el estilo de todos los inputs del portal (Login, Perfil, Registro, etc.)
 * Soporta tanto elementos de icono como componentes de icono.
 */
export function Input({ label, icon: Icon, placeholder, value, onChange = () => {}, type = "text", disabled = false, required = false }) {

  // Renderizado seguro del icono (Atomic Style)
  const renderIcon = () => {
    if (!Icon) return null;

    // Si es un elemento de React (ej: <User />)
    if (React.isValidElement(Icon)) return Icon;

    // Si es un componente (ej: User)
    const IconComponent = Icon;
    return <IconComponent size={20} />;
  };

  return (
    <div className="space-y-1.5 group">
      {label && (
        <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform pointer-events-none flex items-center justify-center">
            {renderIcon()}
          </div>
        )}
        <input
          type={type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            block w-full pr-6 py-5 rounded-2xl font-bold border transition-all shadow-inner outline-none
            bg-slate-50 dark:bg-[#0A1F30] text-slate-800 dark:text-white border-slate-100 dark:border-white/5
            focus:ring-2 ring-orange-500/20 focus:border-orange-500 placeholder:opacity-30
            ${Icon ? 'pl-14' : 'pl-6'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
          `}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
