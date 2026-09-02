# 🖥️ Arquitectura y Ecosistema Web - Ruta-Go v2.0.1-BETA

Este documento constituye la especificación técnica profunda y exhaustiva del **Ruta-Go Web Portal**, el motor centralizado de gestión para el holding tecnológico de transporte intermunicipal que conecta Nátaga, La Plata, Neiva y municipios del Huila.

---

## 🏗️ 1. Stack Tecnológico y Principios de Diseño

### A. Core Engine
* **Framework**: React 18 (Single Page Application - SPA).
* **Build Tool**: Vite 8 (Hot Module Replacement instantáneo, bundling optimizado).
* **Styling**: Tailwind CSS 3 bajo la metodología **Atomic Design System** (Atoms, Molecules, Organisms).
* **Backend Integration**: Firebase SDK v10 (Realtime Database, Authentication, Cloud Storage, Cloud Functions).
* **Iconografía**: Lucide React.
* **Canvas Export**: `html2canvas` para renderizado y descarga HD de tiquetes digitales en formato PNG.

### B. Patrones de Arquitectura Web
1. **Singleton Firebase Manager (`firebase.js`)**: Encapsula las referencias y llamadas a la base de datos `/users`, `/vehicles`, `/schedules`, `/seatAvailability`, `/reservations`, `/prices`, `/routes`, `/chats`.
2. **Subscripciones Reactivas Desacopladas (`useRealtimeData.js`)**: Mantiene listeners `onValue` en la raíz de los nodos NoSQL v2.0 para evitar renders redundantes o fuga de memoria (memory leaks).
3. **Resolución Unificada de Rol (`useRoleResolver.js`)**: Resuelve en tiempo real los datos del usuario en `/users/{uid}`, asignando privilegios `ADMIN`, `OWNER`, `DRIVER` o `PASSENGER` con re-sincronización automática de perfil y vehículo.
4. **Services Layer (Patrón Singleton)**:
   - `scheduleService.js`: CRUD de horarios e itinerarios (`addSchedule`, `updateSchedule`, `deleteSchedule`, `getAllSchedules`).
   - `reservationService.js`: Motor de reservas (`createReservation`, `confirmReservation`, `cancelReservation`, `blockSeatManual`).
   - `driverService.js`: Sincronización de operadores (`assignSchedules`, `updateDriver`, `linkVehicle`).
   - `vehicleService.js`: Gestión de activos y asignación bidireccional (`addVehicle`, `updateVehicle`, `assignOwnerAndDriver`).
   - `ownerService.js`: Promoción directa de socios (`promoteUserToOwnerByEmail`, `getOwners`).
   - `chatService.js`: Mensajería instantánea NoSQL v2.0 (`sendMessage`, `listenMessages` sobre `/chats/{id}/messages`).

---

## 🧩 2. Desglose Exhaustivo de Módulos y Componentes

### A. Vistas Principales y Shell
* **`App.jsx`**: Orquestador principal de la aplicación. Maneja el ruteo dinámico por pestañas (`activeTab`), estado de sesión de Firebase Auth, detección de rol mediante `useRoleResolver` y renderizado condicional de vistas según el perfil.
* **`LandingPage.jsx`**: Portal de bienvenida público con embudo de conversión, tabla interactiva de horarios (`LandingSchedules.jsx`), calculadora de precios, buscador por trayecto y acceso rápido a inicio de sesión.
* **`Login.jsx` & `Register.jsx`**: Pantallas de autenticación con soporte para inicio con correo/contraseña y **Google Sign-In nativo** con asignación automática de rol (`passenger` u `owner`).
* **`Sidebar.jsx`**: Menú de navegación lateral adaptativo para roles de gestión (`ADMIN` y `OWNER`) con colapso responsivo y badges de conteo.

### B. Módulos de Operación y Pasajeros
* **`PassengerOverview.jsx` (Centro de Reservas)**:
  - Selector dinámico de Origen y Destino con **Barra Flotante Sticky de Chips de Ruta (`sticky top-0 z-20 backdrop-blur-md bg-white/95`)**.
  - Renderizado de tarjetas de salida (`ScheduleCard.jsx`) con badges de estado, precios formateados y número de cupos disponibles.
  - **Validación de Candado (🔒)**: Bloqueo automático del botón de reserva cuando un turno no tiene conductor asignado (`!driverId`).
* **`SeatManagementModal.jsx` (Selección de Asientos)**:
  - **Chasis de Vehículo Interactivo**: Renderizado en 3D de la silueta metálica de la camioneta/minibus (`#040D1A`), parabrisas azul con luces frontales, retrovisores laterales y 4 llantas de caucho.
  - **Distribución de 13 Asientos**: Cabina frontal (Timón + Copilotos 1, 2 y Fila 3-5), Zona Trasera con pasillo central (6, 7 \| 10, 11 y 8, 9 \| 12, 13) y banca trasera.
  - Modos de interacción dual: Selección para pasajero o bloqueo/liberación manual para conductor (ventas en calle).
* **`HistoryDirectory.jsx` & `ReservationHistoryCard.jsx`**:
  - Historial de viajes personales y despachos de flota.
  - Mapeo de estados NoSQL v2.0 (`status: "confirmed"`, `"pending"`, `"cancelled"`) con insignias de color.
  - Despliegue de datos de pasajero, conductor, hora, tarifa, asiento y ruta.
* **`TicketModal.jsx` (Tiquete Digital)**:
  - Generación de tiquete visual HD con logotipo, trayecto, fecha, hora, número de asiento, valor $ COP, nombre del pasajero, nombre del conductor, placa del vehículo, modelo e ID único de reserva.
  - Captura y exportación en PNG mediante `html2canvas` para compartir por WhatsApp o redes sociales.
* **`ChatModal.jsx` & `chatService.js`**:
  - Canal de comunicación bidireccional entre pasajero y conductor.
  - Cabecera dinámica que identifica a la contraparte según el UID de la sesión activa (`"Chat con [Conductor]"` o `"Chat con [Pasajero]"`).
  - Escritura atómica en `/chats/${reservationId}/messages/${messageId}` con listener en tiempo real.

### C. Módulos de Administración y Flota (Admin / Socio)
* **`AdminOverview.jsx` & `OwnerOverview.jsx`**: Dashboards Pro con analítica en tiempo real de ingresos acumulados (App + Calle), ocupación por ruta y flota activa.
* **`ScheduleDirectory.jsx` (Planilla de Despachos)**:
  - Pestañas de navegación por ruta para supervisión de salidas.
  - Modales de gestión: `AddScheduleModal.jsx` y `EditScheduleModal.jsx` para la creación, edición en tiempo real de horas, tarifas, buses y eliminación de salidas.
* **`DriverDirectory.jsx`, `AddDriverModal.jsx` & `EditDriverModal.jsx`**:
  - Asignación de conductores en 2 pasos: Selección previa de Ruta y asignación de horarios.
  - **Rueda Canónica de Nátaga (9 Turnos)**:
    - Turno 1: `06:15 AM ➔ 07:30 AM`
    - Turno 2: `07:15 AM ➔ 09:15 AM`
    - Turno 3: `08:30 AM ➔ 10:30 AM`
    - Turno 4: `09:30 AM ➔ 11:45 AM`
    - Turno 5: `10:00 AM ➔ 02:00 PM` *(Fijo / Dedicado - No rota)*
    - Turno 6: `11:00 AM ➔ 03:30 PM`
    - Turno 7: `01:00 PM ➔ 05:00 PM`
    - Turno 8: `03:30 PM ➔ 06:00 PM + 07:30 AM` *(Triple Especial con pernocta)*
    - Turno 9: `05:00 PM` *(Entrada)*
    - Descanso: *Mañana fuera de servicio*.
* **`VehicleDirectory.jsx` & `VehicleModal.jsx`**: Directorio de vehículos con asignación bidireccional de Socio (`ownerId`) y Conductor (`driverId`).
* **`OwnerDirectory.jsx` & `AddOwnerModal.jsx`**: Herramienta de super-poderes del Admin Root para promover usuarios al rol de Socio por correo o datalist desplegable.
* **`ProfileDirectory.jsx`**: Perfil del usuario con ficha técnica completa del vehículo vinculado (Modelo, Placa, Marca, Capacidad, Año, Color) para conductores y formulario de edición.

---

## ⚙️ 3. Flujo de Datos y Sincronización NoSQL v2.0

```mermaid
graph TD
    A[Usuario / App.jsx] -->|useRoleResolver| B[Firebase Auth + /users/{uid}]
    B -->|useRealtimeData| C[NoSQL v2.0 Realtime Database]
    C -->|/schedules| D[Planilla / ScheduleTable]
    C -->|/reservations| E[Historial / DriverOverview]
    C -->|/chats| F[ChatModal / chatService]
    C -->|/vehicles| G[Directorio de Vehículos]
    C -->|/routes & /prices| H[Motor de Rutas y Tarifas]
```

---
**ChopCode Solutions - Web Architecture Division 2026**
