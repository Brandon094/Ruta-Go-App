import React, { useState, useEffect } from 'react';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * ⚛️ Molecule: SummaryMetric
 * Visualiza una métrica con soporte para conteo animado y formateo de moneda.
 */
export function SummaryMetric({ label, value, icon, color, isCurrency = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = typeof value === 'number' ? value : 0;

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = targetValue;
    const duration = 1000;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, targetValue]);

  const formattedValue = isCurrency
    ? FormatUtils.formatPrice(displayValue)
    : displayValue;

  return (
    <div className="flex flex-col items-center text-center space-y-1 group">
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className={`text-xl lg:text-2xl font-black transition-all duration-500 ${color}`}>
        {formattedValue}
      </span>
      <span className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest leading-none">
        {label}
      </span>
    </div>
  );
}
