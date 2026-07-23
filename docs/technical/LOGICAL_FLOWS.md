# ⚙️ Mapeo de Flujos Lógicos y Coreografías de Datos v1.5.0

Este documento detalla la lógica de bajo nivel y las secuencias técnicas que gobiernan los procesos críticos de Ruta-Go en el ecosistema móvil y web.

---

## 🚀 1. Flujo de Inicialización y Resolución de Rol (Móvil vs Web)
Determina el punto de entrada y los privilegios del usuario.

### En la App Android:
1.  **Splash Start**: Consulta `FirebaseAuth`.
2.  **Consulta RTDB**: Verifica existencia en `/conductores/` y `/usuarios/`.
3.  **Prioridad**: Si existe en conductores, carga `DriverHome`. Si no, `PassengerHome`.

### En el Web Portal:
1.  **Auth Check**: `useRealtimeStats` escucha el estado de Firebase Auth.
2.  **Resolución Maestra**:
    *   Verifica en `/admins/{uid}`. Si es `true` -> Rango `ADMIN`.
    *   Verifica en `/dueños/{uid}`. Si es `true` -> Rango `OWNER`.
3.  **Filtrado de Suscripción**: El sistema suscribe listeners solo a los datos permitidos por el rol resuelto.

---

## 🎫 2. Flujo Transaccional de Reserva (Atomic Booking Engine)
Garantiza la exclusividad de los asientos bajo condiciones de alta concurrencia.

1.  **Confirmación**: El usuario invoca la reserva.
2.  **runTransaction()**: Se abre una transacción sobre `/disponibilidadAsientos/{horarioId}`.
3.  **Validación Server-Side**: Si `asientosOcupados/{seatId}` ya es `true`, la transacción aborta.
4.  **Commit**: Se marca el asiento y se decrementa el contador global de cupos.
5.  **Post-Commit**: Se crea el registro en `/reservas` y se dispara FCM v1 al conductor asignado.

---

## 🔄 3. Algoritmo de Rotación Nocturna (Cloud Strategy)
Proceso serverless programado (`automatedRotation` a las 19:00 COT).

1.  **Universo de Datos**: La función carga conductores activos, horarios y capacidad de vehículos.
2.  **Shift Index**: Calcula la rotación equitativa diaria incluyendo el día de descanso compensatorio.
3.  **Sincronización de Capacidad**: Recupera el valor `capacidad` de `/vehiculos/` para resetear el inventario de asientos del día siguiente.
4.  **Limpieza de Huérfanos**: Resetea turnos sin conductor asignado para evitar visualizaciones erróneas.

---

## 💼 4. Lógica de Aislamiento Comercial (RBAC Web)
Asegura que el portal sea un entorno multi-inquilino seguro.

1.  **Identificación de Activos**: El Socio carga sus placas vinculadas mediante el campo `ownerId` en el nodo de vehículos.
2.  **Filtrado en Cliente**: Los hooks de React filtran la lista de `/reservas` y `/estadisticas` comparando el `vehicleId` con las placas del socio.
3.  **Anonimización Competitiva**: En la planilla global, si un vehículo no pertenece al socio logueado, los datos de `asientosDisponibles` se reemplazan visualmente por la etiqueta "Privado".

---

## 🧹 5. Protocolo de Borrado en Cascada (Compliance)
Cumplimiento técnico del "Derecho al Olvido".

1.  **Marcado**: Usuario activa `solicitudBorrado: true` (App o Web).
2.  **Gracia**: 30 días de espera.
3.  **Cascada Cloud**:
    *   **Nivel 1**: Borrado de activos en `/vehiculos/` (si es conductor).
    *   **Nivel 2**: Remoción de perfiles en `/usuarios/`, `/conductores/` y `/dueños/`.
    *   **Nivel 3**: `admin.auth().deleteUser(uid)`.

---
**ChopCode Solutions - Arquitectura de Sistemas 2026**
