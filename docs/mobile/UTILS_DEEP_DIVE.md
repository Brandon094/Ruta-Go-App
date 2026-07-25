# 🛠️ Inmersión Técnica: Capa de Utilidades (Utils) v1.9.9.5

Este documento detalla la caja de herramientas transversal de la App Android, diseñada para centralizar lógicas repetitivas y asegurar estándares de calidad en UI, red y seguridad.

---

## 🏛️ 1. Filosofía de Utilidades
Las clases en el paquete `utils` son apátridas (stateless) y estáticas. Siguen el principio de "Única Fuente de Verdad":
*   **Centralización**: Los cálculos de formato se delegan a Utils para evitar inconsistencias entre pantallas.
*   **Abstracción**: Facilitan el reemplazo de librerías externas (ej. Glide, Firebase) sin afectar la lógica de negocio.
*   **Robustez**: Implementan manejo de errores defensivo para garantizar la estabilidad en condiciones extremas.

---

## 🎨 2. Utilidades de Interfaz (UI)
*   **`FormatUtils`**: Motor de transformación de datos sincronizado con el Portal Web. Maneja moneda (COP), abreviaciones financieras (K/M) y normalización de cadenas de texto.
*   **`UIAnimationUtils`**: Orquestador de micro-interacciones. Incluye efectos de rebote, transiciones de tarjetas y el motor de conteo progresivo para métricas.
*   **`WindowUtils`**: Gestor de insets para el soporte **Edge-to-Edge** nativo de Android 15.
*   **`ImageUtils`**: Gestión eficiente de carga de imágenes (WebP preferido) y optimización de memoria en listas largas.

---

## 🌐 3. Infraestructura y Red
*   **`NetworkMonitor`**: Observador reactivo de la calidad de señal. Vital para la operación en zonas con baja conectividad intermunicipal.
*   **`SecurityUtils`**: Herramientas de ofuscación visual y validación de integridad de inputs.

---

## 🔄 4. Reglas de Oro para Utils
1.  **Pureza Funcional**: Preferencia por tipos de datos primitivos para facilitar pruebas.
2.  **Manejo de Nulos**: Retorno sistemático de valores por defecto seguros (ej. "---").
3.  **Consistencia de Plataforma**: Las utilidades deben comportarse de forma idéntica a sus contrapartes en el Portal Web para mantener la integridad de los datos presentados.

---
**Chop Code Solutions - Mobile Engineering 2026**
