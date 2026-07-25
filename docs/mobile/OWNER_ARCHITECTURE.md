# 🏗️ Arquitectura del Módulo de Dueños y Aislamiento de Activos (v1.9.9.5)

Este documento detalla la implementación del modelo multi-inquilino que permite la gestión escalable de flota, separando la propiedad de los activos de su operación diaria.

---

## ✅ 1. Estado de Implementación
El modelo de Dueños ha evolucionado hacia una **Inteligencia Analítica 360°**, integrando la operación móvil con la gestión web de forma transparente.

### Hitos Logrados:
*   Desacoplamiento total entre Vehículo y Conductor.
*   Lanzamiento del **Go Business Dashboard** (Web Portal) con soporte para iPhone.
*   **Contabilidad Integral (v1.9.0)**: Sumatoria automática de ventas por App y ventas físicas.
*   Aislamiento de datos mediante reglas de seguridad de Firebase basadas en `ownerId`.

---

## 🛠️ 2. Estructura NoSQL y Sincronización

### 2.1 Nodo Maestro: `/dueños/`
Controla el acceso administrativo al ecosistema.
*   `uid`: `true` (Habilitado para gestionar activos y ver finanzas).
*   `uid`: `"pendiente"` (Esperando validación por el Admin Root).

### 2.2 Nodo: `/vehiculos/` (El Activo Central)
*   `ownerId`: UID del socio propietario (Filtro maestro para reportes).
*   `driverId`: UID del conductor asignado.
*   `capacidad`: Define el límite de ventas para el Seat Engine.

---

## 📈 3. Inteligencia Analítica 360° (Refactor v1.9.0)
El sistema ya no depende únicamente del nodo de reservas para calcular ingresos:

1.  **Cálculo por Ocupación**: El Dashboard cruza la capacidad total contra los asientos disponibles en tiempo real.
2.  **Unificación de Caja**: `Ingresos = (Cupos Vendidos) * Tarifa`. Esto incluye pasajeros que pagan en el bus y los que reservan por la App.
3.  **Detección de Trayecto**: Clasificación automática por destino (Nátaga vs La Plata) extrayendo el hito final de la cadena de ruta.

---

## 🔐 4. Seguridad de Datos
*   **Aislamiento Comercial**: Los socios solo tienen visibilidad sobre su propia flota. El acceso a `/estadisticas` y `/vehiculos` está restringido por reglas de Firebase.
*   **Protección de Conductores**: El socio gestiona a sus operadores, pero la identidad digital de los mismos está protegida bajo el estándar SSO del Holding.

---

## 🚀 5. Próximos Pasos (Fase 4 - Proyectos Especiales)
1.  **Ruta-Go In-Car (Android Auto)**: Extender el control de la flota al tablero del vehículo.
2.  **Gestión de Gastos**: Módulo para reportar consumo de combustible y mantenimiento preventivo.
3.  **Telemetría Legal**: Alertas automáticas de vencimiento de SOAT y tecnomecánica.

---
**ChopCode Solutions - Mobile & Business Engineering 2026**
