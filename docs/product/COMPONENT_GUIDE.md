# 🎨 Guía de Componentes e Identidad Visual (UI/UX)

Este documento detalla el catálogo de componentes de interfaz y el sistema de diseño utilizado en Ruta-Go, basado en los estándares de **Material Design 3 (Material You)** adaptados para el ecosistema rural.

---

## 🌈 1. Paleta de Colores (Branding)
El sistema utiliza un esquema de contraste alto optimizado para legibilidad en exteriores y bajo luz solar directa.

| Color | Token | Hex | Uso Principal |
|:---|:---|:---|:---|
| **Naranja Go** | `primary_500` | `#FF7A1A` | Acciones principales, botones, acentos de marca. |
| **Navy Deep** | `secondary_900` | `#061426` | Fondos de pantalla, textos primarios, navegación. |
| **Gris Navy** | `secondary_400` | `#2C5C76` | Textos secundarios, iconos desactivados. |
| **Verde Éxito** | `success_500` | `#10B981` | Estados confirmados, asientos disponibles. |
| **Rojo Error** | `error_500` | `#EF4444` | Alertas, cancelaciones, estados críticos. |
| **Amarillo Warning** | `warning_500` | `#F59E0B` | Estados pendientes, alertas de precaución. |

---

## 🔘 2. Botones y Acciones
Implementados mediante `MaterialButton` con estados visuales claros.

### Botón Primario (`ButtonStyle`)
*   **Estilo**: Fondo sólido naranja, texto blanco, esquinas redondeadas (16dp).
*   **Uso**: "Confirmar Reserva", "Ingresar", "Venta Física".
*   **Feedback**: Animación de escala (0.95x) al presionar.

### Botón Secundario (`ButtonStyleSecondary`)
*   **Estilo**: Outlined (Borde naranja), fondo transparente, texto naranja.
*   **Uso**: Acciones alternativas, "Cancelar", "Volver".

### Botón de Texto (`ButtonStyleText`)
*   **Estilo**: Sin bordes, solo texto.
*   **Uso**: "Olvidaste tu contraseña", "Registrarse".

---

## 📇 3. Contenedores (Cards)
Utilizamos `MaterialCardView` para agrupar información lógica.

*   **Estilo**: Fondo blanco, elevación de 4dp, radio de esquina de 24dp.
*   **Animación**: Todas las tarjetas principales entran con un efecto de "Overshoot" (Rebote) al cargar la pantalla.
*   **Uso**: Items de horarios, estadísticas de ingresos, detalles de reserva.

---

## ⌨️ 4. Entradas de Texto (Input Fields)
Basados en `TextInputLayout` con el estilo `OutlinedBox`.

*   **Validación**: Borde rojo dinámico para errores y verde/naranja para enfoque activo.
*   **Control de Seguridad**: Incluyen icono de "Ojo" para alternar visibilidad en contraseñas.
*   **Uso**: Formularios de registro, login y edición de perfil.

---

## 🏷️ 5. Badges de Estado (Indicadores)
Componentes compactos para lectura rápida de estados operativos.

*   **Confirmado**: Fondo verde con borde.
*   **Pendiente**: Fondo amarillo/naranja.
*   **Finalizado/Cancelado**: Fondo rojo o gris oscuro.
*   **Próximo Viaje**: Incluye una animación de **Pulse** (Latido) infinita para captar la atención.

---

## 💺 6. Motor Visual de Asientos (Grid)
Componente personalizado de alta complejidad visual.

*   **Disponible**: Icono de asiento verde.
*   **Seleccionado**: Icono naranja con animación de escalado.
*   **Ocupado (App)**: Icono rojo (bloqueado para selección).
*   **Bloqueado (Físico)**: Icono naranja/grisáceo (exclusivo para conductores).

---

## ✨ 7. Estándares de Experiencia (UX)
*   **Shimmer Effects**: Uso de `ShimmerFrameLayout` durante la carga de datos para evitar saltos bruscos de UI.
*   **Micro-interacciones**: Cada elemento clicable tiene una respuesta visual instantánea.
*   **Edge-to-Edge**: Las vistas se extienden detrás de la barra de estado y de navegación (Android 15 Ready).

---
**Chop Code Solutions - Dirección de Arte y UI/UX v1.3.0**
