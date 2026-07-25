# ⚙️ Mapeo de Flujos Lógicos y Coreografías de Datos v1.9.9.5

Este documento detalla la lógica de bajo nivel y las secuencias técnicas que gobiernan los procesos críticos de Ruta-Go en el ecosistema móvil y web.

---

## 🚀 1. Flujo de Inicialización y Resolución de Identidad
Determina el punto de entrada y los privilegios del usuario garantizando una transición sin fallos visuales.

### Proceso Unificado (React/Android):
1.  **Auth Check**: Escucha el estado de `FirebaseAuth`.
2.  **Splash Guard**: Mientras se resuelve el rol, se muestra el `SplashScreen` para evitar renderizar dashboards sin datos (Glitches).
3.  **Resolución Maestra**:
    *   Prioridad 1: Nodo `/admins/{uid}`.
    *   Prioridad 2: Nodo `/dueños/{uid}`.
    *   Prioridad 3: Nodo `/conductores/{uid}`.
    *   Prioridad 4: Nodo `/usuarios/{uid}` (Pasajero por defecto).
4.  **Signal**: Una vez resuelto, se levantan los listeners de tiempo real específicos para el rol.

---

## 🎫 2. Flujo Transaccional de Reserva (Atomic Booking Engine)
Garantiza la exclusividad de los asientos bajo condiciones de alta concurrencia.

1.  **runTransaction()**: Se abre una transacción atómica sobre `/disponibilidadAsientos/{horarioId}`.
2.  **Validación de Ocupación**: Si el asiento solicitado ya está marcado como ocupado, la transacción se cancela y se notifica al usuario.
3.  **Sincronización de Inventario**: Al confirmar el asiento, se decrementa `asientosDisponibles`.
4.  **Persistencia**: Se crea el registro en `/reservas` y se actualiza el nodo de `/estadisticas` del conductor para reflejar el nuevo ingreso.

---

## 🔄 3. Algoritmo de Rotación y Agrupamiento (Escalafón)
Gobernanza de la planilla operativa automatizada.

### Lógica de Agrupamiento (Speed Mode):
*   **Standard Pairs**: Mapeo lógico de trayectos de ida y vuelta (ej: h001 + h011).
*   **Special Triple**: Agrupamiento operativo de h008, h018 y h010 (Regreso al día siguiente).
*   **Solo Entry**: h009 se trata como trayecto único de inicio de jornada.

### Rotación Cloud:
*   Ejecución diaria 19:00 COT.
*   Cálculo de `shiftIndex` basado en `posicionEscalafon` para asegurar equidad en los turnos.

---

## 💰 4. Inteligencia Analítica 360° (Contabilidad)
Motor de cálculo de ingresos para dueños y administradores.

1.  **Lookups en Tiempo Real**: El sistema cruza los datos de `/disponibilidadAsientos` con la tabla de `/precios`.
2.  **Fórmula Integral**: `Ingresos = (Total Asientos - Asientos Disponibles) * Precio de Ruta`.
3.  **Hibridación**: Esta lógica suma automáticamente las ventas por App y las ventas físicas realizadas por el conductor en el bus, eliminando fugas de capital.
4.  **Detección de Trayecto**: El sistema extrae el destino final de la cadena de ruta para clasificar los ingresos por sentido (Nátaga -> La Plata vs La Plata -> Nátaga).

---

## 🧹 5. Protocolo de Borrado en Cascada (Compliance)
Cumplimiento técnico del "Derecho al Olvido" y políticas de Google Play.

1.  **Solicitud**: El usuario activa el flag en su perfil.
2.  **Periodo de Gracia**: 30 días bloqueados mediante Cloud Functions.
3.  **Borrado Atómico**:
    *   Remoción de vehículos vinculados.
    *   Eliminación de perfiles en todos los nodos de la RTDB.
    *   Eliminación definitiva de la cuenta en Firebase Auth.

---
**ChopCode Solutions - Arquitectura de Sistemas 2026**
