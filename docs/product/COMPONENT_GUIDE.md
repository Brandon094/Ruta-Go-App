# 🎨 Guía de Componentes e Identidad Visual (UI/UX) v1.5.0

Este documento detalla el catálogo de componentes de interfaz y el sistema de diseño utilizado en el ecosistema Ruta-Go, unificando los estándares de **Material Design 3 (Android)** y **Glassmorphism (Web)**.

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
### Cards de Operación:
*   **Estilo**: Elevación de 4dp, esquinas redondeadas de 24dp.
*   **Animación**: Efecto "Overshoot" (Rebote) en la carga de listas.
### Motor de Asientos:
*   **Interactividad**: Feedback táctil y visual al seleccionar puestos. Sincronización en tiempo real con RTDB.

---

## 🖥️ 3. Componentes Web (Glassmorphism & Tailwind)
### Estética Business:
*   **Filtros**: Uso de `backdrop-blur-md` para efectos de transparencia en Navbars y Modales.
*   **Bordes**: `rounded-[3rem]` para tarjetas de Dashboard, transmitiendo modernidad corporativa.
### Tablas Dinámicas:
*   **Planilla**: Visualización compacta con scroll horizontal protegido y estados de ocupación anonimizados.

---

## 🔘 4. Botonería y Call to Action (CTA)
### Botón Primario:
*   **Android**: `MaterialButton` con escala 0.95x al presionar.
*   **Web**: Botón Tailwind con sombra `shadow-primary-500/40` y efecto `hover:bg-orange-600`.
### Botón de Socio:
*   **Web**: Estilo Navy (`bg-secondary-900`) con tipografía Bold para denotar autoridad empresarial.

---

## ✨ 5. Estándares de Experiencia (UX)
*   **Edge-to-Edge**: Pantalla total en Android 15.
*   **Responsive Pro**: Adaptación automática de Grid (3 col) a Slider (1 col) en la web.
*   **Shimmer Loaders**: Cargas progresivas en ambas plataformas para evitar el parpadeo de datos.

---
**ChopCode Solutions - Dirección de Arte y UI/UX 2026**
