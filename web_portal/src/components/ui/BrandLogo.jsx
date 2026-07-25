import React from 'react';

/**
 * ⚛️ Atom: BrandLogo
 * El identificador visual central del ecosistema.
 * @param {string} size - Clase de Tailwind para el tamaño del contenedor (p.ej. 'w-12 h-12')
 * @param {string} imgSize - Clase de Tailwind para el tamaño de la imagen (p.ej. 'w-8 h-8')
 * @param {boolean} animate - Si debe tener la animación de rebote suave
 */
export function BrandLogo({
  size = "w-12 h-12",
  imgSize = "w-8 h-8",
  animate = true,
  className = "",
  variant = "default" // 'default' | 'glass'
}) {
  const bgBase = variant === 'glass'
    ? 'bg-white/10 backdrop-blur-sm'
    : 'bg-secondary-900 dark:bg-white/10';

  return (
    <div className={`${size} ${bgBase} rounded-xl flex items-center justify-center shadow-lg transition-colors border border-transparent dark:border-white/10 shrink-0 ${className}`}>
      <img
        src="/assets/logo_icon.png"
        alt="Ruta-Go"
        className={`${imgSize} object-contain ${animate ? 'animate-bounce-slow' : ''}`}
      />
    </div>
  );
}
