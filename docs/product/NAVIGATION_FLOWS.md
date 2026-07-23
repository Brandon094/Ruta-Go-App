# 🗺️ Mapa de Navegación y Experiencia de Usuario (UX) v1.5.0

Este documento describe la arquitectura de navegación del ecosistema Ruta-Go, integrando los flujos de la App móvil y el nuevo Portal Web.

---

## 🚀 1. Punto de Entrada Web (Landing Page)
La vitrina comercial del Holding.
1.  **Exploración**: Revisión de propuesta de valor por rol (Pasajero/Conductor/Socio).
2.  **Conversión B2C**: Redirección a Play Store para usuarios móviles.
3.  **Conversión B2B**: Acceso a "Registrar mi Flota" o "Iniciar Sesión" para socios.

---

## 💼 2. Flujo Administrativo (Portal Web)
Diseñado para la toma de decisiones basada en datos.
1.  **Gateway de Acceso**: Login centralizado para Admins y Owners.
2.  **Dashboard de Mando**: Resumen de KPIs financieros y operativos.
3.  **Gestión de Flota**:
    *   Directorio de conductores con vinculación por Email.
    *   Visualización de planilla de despachos en tiempo real.
4.  **Legal Hub**: Navegación interna hacia Términos y Privacidad.

---

## 🚶 3. Flujo del Pasajero (App Android)
Bucle de reserva optimizado.
1.  **Selección**: Pestañas de ruta (**Nátaga ↔ La Plata**).
2.  **Reserva**: Selección de asiento en Grid dinámico.
3.  **Confirmación**: Pasarela de pago (Efectivo/Digital) y emisión de tiquete.

---

## 👨‍✈️ 4. Flujo del Conductor (App Android)
Gestión operativa en ruta.
1.  **Planilla**: Visualización de turnos del día.
2.  **Venta Física**: Botón (+) para bloqueo de asientos en calle.
3.  **Validación**: Check-in de pasajeros mediante lista de reservas.

---

## 🛠️ 5. Estándares Transversales (UX)
*   **Identidad SSO**: Navegación fluida entre App y Web con una sola cuenta.
*   **Responsive Pro**: Navegación optimizada para tacto (Móvil) y puntero (Web).
*   **Deep Linking**: Notificaciones Push que abren directamente la reserva o el chat relevante.

---
**ChopCode Solutions - Arquitectura de Producto 2026**
