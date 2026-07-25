import React from 'react';

/**
 * ⚛️ Molecule: MetricGrid
 * Layout estandarizado para grillas de métricas en Dashboards.
 */
export function MetricGrid({ children, cols = 3 }) {
  const colMap = {
    2: "grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5"
  };

  return (
    <div className={`grid ${colMap[cols]} gap-4 lg:gap-8`}>
      {children}
    </div>
  );
}
