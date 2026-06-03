# Implementación de Gestión de Asientos para Conductores (Reservas Físicas)

Este plan detalla los cambios necesarios para permitir que los conductores marquen asientos como vendidos físicamente desde la aplicación. Esto evitará que pasajeros reserven el mismo asiento a través de la app.

## Proposed Changes

### [Recursos y Estilos]

#### [asiento_fisico.xml](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/res/drawable/asiento_fisico.xml)
- [NEW] Crear un nuevo drawable para representar asientos reservados físicamente (color naranja).

### [Adaptadores]

#### [RutaAdapter.java](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/java/com/chopcode/trasnportenataga_laplata/adapters/rutas/RutaAdapter.java)
- Añadir interface `OnRutaClickListener`.
- Implementar el listener en el constructor y llamar a `onRutaClick` en el `onBindViewHolder`.

### [Managers y Servicios]

#### [SeatManager.java](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/java/com/chopcode/trasnportenataga_laplata/managers/seats/SeatManager.java)
- Añadir el nuevo icono `VECTOR_ASIENTO_FISICO`.
- Añadir un método `actualizarEstadoAsientosConTipo(Set<Integer> ocupadosApp, Set<Integer> ocupadosFisico)` para diferenciar visualmente los tipos de ocupación.

### [Actividades y Layouts]

#### [activity_gestionar_asientos.xml](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/res/layout/activity_gestionar_asientos.xml)
- [NEW] Crear el layout para la nueva actividad. Incluirá:
    - Información del viaje (Ruta, Hora, Placa).
    - Mapa de asientos (reutilizando IDs de `activity_crear_reservas`).
    - Leyenda que incluya "Reserva Física" (Naranja).

#### [GestionarAsientosActivity.java](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/java/com/chopcode/trasnportenataga_laplata/activities/driver/GestionarAsientosActivity.java)
- [NEW] Crear la actividad que permitirá al conductor:
    1. Cargar los asientos ocupados desde Firebase.
    2. Cargar las reservas de la app para el horario seleccionado.
    3. Identificar cuáles asientos están ocupados por la app y cuáles físicamente (comparando `asientosOcupados` vs `reservas`).
    4. Al hacer click en un asiento **DISPONIBLE**: Mostrar diálogo para marcar como "Vendido Físicamente".
    5. Al hacer click en un asiento **FÍSICO**: Mostrar diálogo para "Liberar Asiento".
    6. Al hacer click en un asiento **APP**: Mostrar detalles del pasajero (opcional).

#### [InicioConductorActivity.java](file:///D:/Documentos/Desarrollo/Desarrollo Movil/Ruta-Go-App/app/src/main/java/com/chopcode/trasnportenataga_laplata/activities/driver/InicioConductorActivity.java)
- Implementar `OnRutaClickListener` de `RutaAdapter`.
- Al hacer click en una ruta, navegar a `GestionarAsientosActivity` pasando el `horarioId` y datos de la ruta.

## Verification Plan

### Manual Verification
1.  **Navegación:** Abrir la app como conductor y hacer click en una de las rutas próximas. Verificar que se abre la pantalla de "Gestionar Asientos".
2.  **Visualización:** Verificar que los asientos ya reservados por pasajeros (vía app) aparecen en rojo y no se pueden modificar.
3.  **Reserva Física:** Seleccionar un asiento disponible (verde), confirmar la reserva física.
    -   Verificar que el asiento cambia a color naranja.
    -   Verificar en Firebase que el asiento aparece en `asientosOcupados` del horario y `asientosDisponibles` disminuye.
4.  **Liberación:** Seleccionar un asiento naranja y elegir "Liberar".
    -   Verificar que vuelve a estar disponible (verde).
5.  **Conflicto App:** Mientras un asiento está marcado como físico (naranja), intentar reservar ese mismo asiento desde la app de pasajero. Verificar que aparece como ocupado y no se puede seleccionar.
