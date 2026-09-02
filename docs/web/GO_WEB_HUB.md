# 🌐 Hub Web Centralizado: Ruta-Go Web Portal (v2.0.1-BETA)

Este documento detalla la totalidad de la funcionalidad, arquitectura de componentes y mapa de servicios del **Ruta-Go Web Portal**, el punto de anclaje de la plataforma de transporte intermunicipal.

---

## 🎯 1. Resumen Ejecutivo y URL de Producción
* **URL Oficial**: [https://trasnporte-nataga---la-plata.web.app](https://trasnporte-nataga---la-plata.web.app)
* **Proveedor de Hosting**: Firebase Hosting (SSL HTTPS + CDN Global).
* **Versión del Core**: React 18 + Vite 8 + Tailwind CSS 3.
* **Sincronización**: Esquema NoSQL v2.0 Clean English con latencia < 50ms.

---

## 🧩 2. Directorio Exhaustivo de Componentes por Capas

### A. Capa de Átomos (`src/components/ui/`)
1. **`Button.jsx`**: Botón polimórfico con variantes `primary`, `secondary`, `outline`, `ghost`, tamaños `sm`, `md`, `lg`, `full`, soporte para íconos Lucide e indicador de carga `Loader2`.
2. **`Badge.jsx`**: Insignia de estado con variantes `success` (verde), `warning` (naranja/amarillo), `error` (rojo) y `dark` (azul nocturno).
3. **`Input.jsx`**: Campo de entrada accesible con ícono de encabezado, soporte para datalist autocompletado y estilos dark mode nativos.
4. **`Modal.jsx`**: Ventana modal sobrepuesta con backdrop desenfocado, animación `fade-in zoom-in-95` e interacción ESC/overlay.
5. **`BrandLogo.jsx`**: Logo vectorial oficial de Ruta-Go en alta resolución.

### B. Capa de Moléculas (`src/components/`)
1. **`SummaryMetric.jsx`**: Bloque de métrica de rendimiento con etiqueta en minúscula de alta visibilidad, valor numérico o moneda $ COP.
2. **`IconRow.jsx`**: Fila de detalle con ícono, título y subtítulo en contraste.
3. **`ScheduleCard.jsx`**: Tarjeta atómica de horario con reloj circular de salida, trayecto, cupos libres, precio formateado, badge "Siguiente" animado, botón **Candado (🔒)** cuando no hay conductor asignado, y botón de acción según rol.
4. **`ContactInfo.jsx`**: Fila informativa con enlaces directos a WhatsApp, llamada y correo.
5. **`StatsCard.jsx`**: Tarjeta contenedor de resumen diario con bordes redondeados y vidrio esmerilado.
6. **`RouteProgressCard.jsx`**: Tarjeta de indicador de avance por ruta para conductores.
7. **`PricingCard.jsx`**: Tarjeta de tarifa con edición directa de precios por origen y destino.
8. **`PendingReservationCard.jsx`**: Tarjeta de solicitud de reserva para conductor con datos del pasajero, asiento, teléfono y botones de acción ("Confirmar" / "Rechazar").
9. **`ReservationHistoryCard.jsx`**: Tarjeta expansible de historial de viajes con insignias de estado NoSQL v2.0, fecha, hora, valor y botones para Tiquete o Chat.
10. **`ProfileInfoItem.jsx`**: Ítem informativo de perfil de usuario.

### C. Capa de Organismos (`src/components/`)
1. **`ExecutiveHeader.jsx` & `MirrorHeader.jsx`**: Encabezados superiores para Administradores, Socios, Conductores y Pasajeros.
2. **`ScheduleTable.jsx`**: Grilla interactiva de itinerarios en la vista de reservas.
3. **`PricingDirectory.jsx`**: Directorio de tarifas regionales sin duplicaciones.
4. **`ScheduleDirectory.jsx`**: Planilla maestra de despachos con pestañas por ruta y modal de creación/edición.
5. **`VehicleDirectory.jsx` & `VehicleModal.jsx`**: Módulo de flota de vehículos con selección interactiva de Socio (`ownerId`) y Conductor (`driverId`).
6. **`DriverDirectory.jsx`, `AddDriverModal.jsx` & `EditDriverModal.jsx`**: Módulo de gestión de conductores con asignación en 2 pasos y rueda de 9 turnos de Nátaga.
7. **`OwnerDirectory.jsx` & `AddOwnerModal.jsx`**: Directorio de Socios con herramienta de ascenso directo por correo o selección.
8. **`SeatManagementModal.jsx`**: Mapa interactivo en forma de chasis de camioneta de 13 asientos.
9. **`TicketModal.jsx`**: Tiquete digital HD exportable a PNG con `html2canvas`.
10. **`ChatModal.jsx`**: Ventana de chat en tiempo real en `/chats/{id}/messages`.
11. **`ProfileDirectory.jsx`**: Perfil del usuario con ficha técnica completa de vehículo.
12. **`UserManual.jsx`**: Centro de ayuda y manuales operacionales por rol.
13. **`Sidebar.jsx`**: Menú lateral navegable para Admin/Owner.

---

## 🔒 3. Seguridad y Control de Acceso (RBAC)
* **Pasajeros**: Acceso a Home, Reservas, Tiquete Digital, Chat e Historial.
* **Conductores**: Acceso a Dashboard de Conductor, Solicitudes Entrantes, Confirmación de Abordajes, Bloqueo de Puestos (Calle), Chat e Historial.
* **Socios (Owners)**: Acceso a Dashboard Pro de Flota, Directorio de Buses, Monitored de Despachos, Conductores e Ingresos.
* **Admin Root**: Control total sobre Usuarios, Socios (promoción directa), Rutas, Tarifas, Planilla y Moderación.

---
**ChopCode Solutions - Web Division 2026**
