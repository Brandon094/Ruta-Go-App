# 🗺️ Mapa de Navegación y Experiencia de Usuario (UX)

Este documento describe la arquitectura de navegación de Ruta-Go, detallando los caminos que recorren pasajeros y conductores dentro del ecosistema.

---

## 🚀 1. Flujo de Entrada (Onboarding)
Punto de partida para todos los usuarios. El sistema decide el destino basándose en el estado de la sesión y el rol persistido.

1.  **Splash Screen**: Branding inicial y validación de sesión (Firebase Auth).
2.  **Onboarding**: Carrusel educativo (solo la primera vez).
3.  **Login / Selección de Rol**: Entrada vía Email o Google.
4.  **Registro**: Formulario diferenciado para Pasajeros y Conductores (con validación de vehículo).

---

## 🚶 2. Flujo del Pasajero (Bucle de Reserva)
Diseñado para la eficiencia y velocidad en la toma de asientos.

1.  **Dashboard Principal**: Visualización de estadísticas y pestañas de trayectos (Natagá ↔ La Plata).
2.  **Planilla de Horarios**: Lista reactiva con enfoque automático en el próximo viaje.
3.  **Creación de Reserva**:
    *   Selección táctil de asiento en el Grid interactivo.
    *   Visualización de datos del conductor y el vehículo.
4.  **Confirmación**: Resumen ejecutivo y selección de método de pago.
5.  **Tiquete Digital**: Generación de tiquete con opción de compartir como imagen.

---

## 👨‍✈️ 3. Flujo del Conductor (Gestión Operativa)
Optimizado para el uso en campo y la toma de decisiones rápida.

1.  **Dashboard de Control**: Indicadores financieros, asientos disponibles y reservas por confirmar.
2.  **Gestión de Turnos**: Carrusel de rutas asignadas para el día actual.
3.  **Gestión de Asientos (Venta Física)**:
    *   Bloqueo manual de asientos para pasajeros de calle.
    *   Visualización de ocupación híbrida (App vs. Físico).
4.  **Confirmación de Pasajeros**: Lista de tiquetes digitales para validar abordajes.

---

## 💬 4. Flujos Transversales (Comunes)
Acciones disponibles para ambos roles mediante la barra de navegación persistente.

*   **Historial de Viajes**: Listado cronológico de reservas pasadas con estados y detalles.
*   **Gestión de Perfil**: Edición de datos personales, foto y cierre de sesión.
*   **Centro de Mensajería (Chat)**: Comunicación directa 1-a-1 entre conductor y pasajero vinculada a una reserva activa.
*   **Sistema de Notificaciones**: Recepción de avisos Push con Deep Linking hacia la pantalla relevante.

---

## 🛠️ 5. Estándares de Navegación (UX)
*   **Barra Persistente**: Uso de `BottomNavFragment` con efecto de barra fija (Transiciones instantáneas).
*   **Navegación de Retroceso**: Los Managers controlan el botón "Atrás" para evitar cierres accidentales durante transacciones.
*   **Deep Linking**: Los mensajes Push inyectan el destino directamente en el stack de navegación.

---
**Chop Code Solutions - Arquitectura de Producto v1.3.0**
