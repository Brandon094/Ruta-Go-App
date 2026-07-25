# 🎨 Manual de Identidad Visual - Ruta-Go v1.9.9.5

Este documento define las directrices estéticas, paleta de colores y el uso de marca para garantizar una experiencia visual coherente en todo el ecosistema (Android Nativo y Portal Web).

---

## 1. Concepto de Marca
Ruta-Go proyecta **agilidad, seguridad y modernidad**. La combinación del naranja vibrante con el azul marino (Navy) transmite energía y seriedad corporativa. La identidad es "Mirror", lo que significa que el usuario debe sentir la misma marca sin importar el dispositivo que use.

---

## 2. Paleta de Colores Oficial

### 🟠 Colores Primarios (Energía)
| Nombre | Hexadecimal | Uso |
|:---|:---|:---|
| **Naranja Ruta-Go** | `#FF7A1A` | Botones, Iconos de acento, Selección de asientos. |
| **Naranja Vibrante** | `#FF7D00` | Branding de marketing y alertas. |

### 🔵 Colores Secundarios (Estructura)
| Nombre | Hexadecimal | Uso |
|:---|:---|:---|
| **Navy Deep** | `#061426` | Fondos de App (Dark), Sidebar Web, Botones Admin. |
| **Navy Card** | `#061929` | Contenedores y tarjetas oscuras. |
| **Navy Text** | `#B5C5CD` | Textos secundarios y descripciones. |

---

## ⚛️ 3. Implementación Atómica (Single Source of Truth)
Para garantizar la consistencia, el branding se centraliza en componentes base:

### Átomo `BrandLogo` (Web)
*   **Contenedor**: Siempre utiliza fondos Navy (`#061426`) o variantes traslúcidas con borde para asegurar legibilidad.
*   **Animación**: Rebote suave (`animate-bounce-slow`) para denotar dinamismo.
*   **Variante Glass**: Uso de `backdrop-blur-sm` para integraciones en pies de página o cabeceras flotantes.

---

## ✨ 4. Estética de Interfaz
*   **Glassmorphism**: Utilizado en el Portal Web para denotar exclusividad empresarial (dueños y administradores).
*   **Material Design 3**: Estándar para la aplicación Android, con bordes redondeados de 28dp a 32dp.
*   **Transiciones**: Navegación fluida sin parpadeos, utilizando el `SplashScreen` como puente visual entre estados.

---

## 🌓 5. Adaptabilidad (Responsive & Theme)
*   **Móvil (Android 15)**: Soporte Edge-to-Edge integral.
*   **Web (Responsive)**: Layout que utiliza **Code Splitting** para optimizar la carga y se adapta de 1 a 3 columnas según el dispositivo.
*   **Accesibilidad AA**: Contraste optimizado y nombres accesibles en todos los elementos interactivos.

---
**ChopCode Solutions - Branding Department 2026**
