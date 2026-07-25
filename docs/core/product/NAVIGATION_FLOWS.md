# 🗺️ Mapa de Navegación y Experiencia de Usuario (UX) v1.9.9.5

Este documento describe la arquitectura de navegación del ecosistema Ruta-Go, integrando los flujos de la App móvil y el Portal Web de alta fidelidad.

---

## 🚀 1. Punto de Entrada Web (Landing Page)
La vitrina comercial del Holding optimizada para conversión.
1.  **Value Propositions**: Carrusel de soluciones para Pasajeros, Conductores y Socios.
2.  **Conversion**: Acceso directo a descarga (Android) o portal interactivo (Web/iPhone).
3.  **Performance**: Carga instantánea mediante Code Splitting.

---

## 🖥️ 2. Patrones de Navegación Web (RBAC)
El portal adapta su estructura de navegación según el privilegio del usuario:

### A. Modo Operativo (Pasajero & Conductor)
*   **Patrón**: "Mobile Mirror" (Copia fiel de la App móvil).
*   **Estructura**: Navegación mediante **Bottom Nav** (Barra Inferior).
*   **Vistas**: Inicio (Dashboard), Historial (Reservas/Despachos), Perfil.

### B. Modo Administrativo (Socio & Admin Root)
*   **Patrón**: "Dashboard Pro" (Enfoque en gestión masiva).
*   **Estructura**: Navegación mediante **Administrative Sidebar** colapsable.
*   **Vistas**: Vista General, Mi Flota, Conductores, Despachos, Planilla Maestra, Tarifas.

---

## 🚶 3. Flujo del Pasajero (Bucle de Reserva)
Bucle optimizado para mínima fricción:
1.  **Descubrimiento**: Selección de ruta y horario (Badge "SIGUIENTE" para urgencia).
2.  **Transacción**: Selección atómica de asiento en mapa visual.
3.  **Post-Venta**: Acceso a Tiquete Digital, Chat con conductor y Calificación.

---

## 👨‍✈️ 4. Flujo del Conductor (Gestión en Tiempo Real)
1.  **Monitor de Ruta**: Seguimiento de ocupación vía barras de progreso.
2.  **Acción Rápida**: Botón flotante (+) para ventas en calle con un solo toque.
3.  **Despacho**: Confirmación de abordaje y cierre de planilla diaria.

---

## 🛠️ 5. Estándares de Fluidez
*   **Suspense Transitions**: Pantalla de carga `SplashScreen` durante cambios de contexto pesados.
*   **Deferred UI**: El sistema espera a que los datos estén listos antes de mostrar los paneles, evitando "saltos" de contenido.
*   **Zero Glitch**: Garantía de que no se visualizan componentes de otros roles durante la resolución de identidad.

---
**ChopCode Solutions - Arquitectura de Producto 2026**
