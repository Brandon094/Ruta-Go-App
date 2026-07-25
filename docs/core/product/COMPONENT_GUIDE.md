# 🎨 Guía de Componentes e Identidad Visual (UI/UX) v1.9.9.5

Este documento detalla el catálogo de componentes de interfaz y el sistema de diseño utilizado en el ecosistema Ruta-Go, unificando los estándares de **Material Design 3 (Android)** y **Atomic Design (Web)**.

---

## 🌈 1. Paleta de Colores (Branding Unificado)
| Color | Token | Hex | Uso Principal |
|:---|:---|:---|:---|
| **Naranja Go** | `primary_500` | `#FF7A1A` | Botones FAB, acentos, selección de asientos. |
| **Navy Deep** | `secondary_900` | `#061426` | Fondos de App (Dark), Sidebar Web, Textos primarios. |
| **Navy Card** | `secondary_800` | `#061929` | Tarjetas en modo oscuro y contenedores de login. |
| **Verde Éxito** | `success_500` | `#10B981` | Disponibilidad, estados confirmados. |

---

## 📱 2. Componentes Móviles (Material 3)
*   **Contenedores**: Elevación de 4dp, esquinas redondeadas de 24dp a 32dp.
*   **Inmersión**: Soporte Edge-to-Edge integral (Android 15 Ready).
*   **Interactividad**: Feedback hápitico y visual (Ripple Effect) en cada acción.

---

## 🖥️ 3. Sistema Atómico Web (React + Tailwind)
El portal web se rige bajo una jerarquía de diseño atómico para garantizar la reutilización total del código:

### ⚛️ Átomos (Core UI)
*   `Button`, `Badge`, `Input`, `Modal`, `BrandLogo`.
*   Propiedades: Estilos de borde `rounded-2xl`, sombras dinámicas y tipografía `font-black` para títulos.

### 🧪 Moléculas (Compuestos)
*   `StatsCard`: Contenedor con métrica e icono.
*   `RouteProgressCard`: Barra de progreso animada con porcentaje de ocupación.
*   `ContactInfo`: Bloque estandarizado de Email/WhatsApp.
*   `SplashScreen`: Experiencia de carga brandeada.

### 🧬 Organismos (Vistas)
*   `Sidebar`, `Header` (TopBar), `ScheduleTable`, `AuthLayout`.
*   Comportamiento: Orquestan la lógica de navegación y seguridad (RBAC).

---

## ✨ 4. Estándares de Experiencia (UX)
*   **Transiciones Suaves**: Uso de `useTransition` para evitar saltos bruscos entre vistas.
*   **Carga Diferida**: Implementación de `Suspense` y `lazy` para cargar componentes solo bajo demanda.
*   **Accesibilidad AA**: Nombres accesibles (ARIA) y contrastes optimizados según auditoría Lighthouse.

---
**ChopCode Solutions - Dirección de Arte y UI/UX 2026**
