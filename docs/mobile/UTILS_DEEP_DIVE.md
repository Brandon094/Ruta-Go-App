# 🛠️ Inmersión Técnica: Capa de Utilidades (Utils)

Este documento detalla la caja de herramientas transversal de Ruta-Go, diseñada para centralizar lógicas repetitivas y asegurar estándares de calidad en UI, red y seguridad.

---

## 🏛️ 1. Filosofía de Utilidades
Las clases en el paquete `utils` son apátridas (stateless) y estáticas. Siguen el principio de "Single Source of Truth":
*   **Centralización**: Ningún Adapter o Activity debe calcular lógica de formato; deben delegar a Utils.
*   **Desacoplamiento**: Permiten que el núcleo del app sea independiente de las librerías de terceros (ej: Glide se centraliza en ImageUtils).
*   **Robustez**: Implementan manejo de errores (try-catch) para evitar que fallos menores (como un mal formato de precio) cierren el app.

---

## 🎨 2. Utilidades de Interfaz (UI)
Ubicadas en `com.chopcode.rutago.app.utils.ui`:

*   **`FormatUtils`**: El motor de transformación de datos. Maneja precios (COP), fechas, horas 12h/24h y normalización de texto para comparaciones lógicas.
*   **`UIAnimationUtils`**: Centraliza todas las micro-interacciones. Incluye animaciones de tarjetas, conteos progresivos de dinero y el "baile" de los asientos.
*   **`WindowUtils`**: El guardián de la experiencia inmersiva. Gestiona la aplicación de insets del sistema para el soporte Edge-to-Edge, asegurando que los componentes respiren correctamente bajo las barras de estado y navegación sin deformarse.
*   **`ImageUtils`**: Fachada para Glide. Gestiona el caché de fotos de perfil y el motor de captura de pantalla para compartir tiquetes.

---

## 🌐 3. Infraestructura y Seguridad
Ubicadas en los paquetes `network` y `security`:

*   **`NetworkMonitor`**: Un observador reactivo de conectividad. Incluye un periodo de gracia de 3 segundos para ignorar micro-cortes de señal comunes en zonas rurales.
*   **`SecurityUtils`**: Gestiona comportamientos de seguridad en la UI, como el toggle de visibilidad de contraseñas.

---

## 🔄 4. Reglas de Oro para Utils
1.  **Sin Referencias a Contexto**: A menos que sea estrictamente necesario (ej: cargar animaciones), las utilidades deben preferir tipos primitivos.
2.  **Manejo de Nulos**: Cada método de formato debe devolver un valor por defecto seguro (ej: "$0" o "--:--") en lugar de lanzar excepciones.
3.  **Bilingüismo NoSQL**: Las utilidades de texto son las encargadas de mediar entre los nombres en español de la base de datos y la lógica en inglés del código.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**
