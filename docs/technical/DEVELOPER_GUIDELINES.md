# 🤖 Manual de Ingeniería y Estándares de Código (Senior Edition)

Este documento establece las directrices técnicas obligatorias para mantener la excelencia en el desarrollo del Ecosistema Go. Está diseñado para garantizar la consistencia, seguridad y escalabilidad de Ruta-Go hacia su Fase Premium.

---

## 🏛️ 1. Filosofía de Arquitectura (MVVM Reactivo)
Ruta-Go se rige por el desacoplamiento total entre lógica y representación.

*   **View**: `Activities` y `Fragments` actúan solo como observadores de estado. Está prohibido realizar cálculos de negocio o formateo de datos en esta capa.
*   **ViewModel**: Gestiona el estado de la UI mediante `LiveData`. Debe heredar de `BaseViewModel` (si aplica) y gestionar el ciclo de vida de los listeners.
*   **Engines**: Componentes puros (POJO) que encapsulan algoritmos complejos (ej: `Seat Engine`). No deben tener dependencias de Android (`Context`, `View`).

---

## 📝 2. Estándares de Codificación (Clean Code)

### 2.1 Nomenclatura y Bilingüismo
*   **Código**: El 100% del código fuente (clases, métodos, variables y comentarios técnicos) debe escribirse en **Inglés**.
*   **Recursos**: Los textos de usuario deben residir en `strings.xml` (Español por defecto) para facilitar la internacionalización futura.
*   **Firebase Mapping**: Se reconoce y respeta el mapeo dual (DB en Español vs Modelos en Inglés) mediante el uso de `@PropertyName` o transformaciones manuales en los servicios.

### 2.2 Inmutabilidad y Flujos
*   **Mutable vs. Immutable**: Exponer siempre `LiveData` (Inmutable) hacia la vista y mantener `MutableLiveData` (Privado) dentro del ViewModel.
*   **Atomicidad**: Toda operación que afecte inventarios (asientos) o saldos debe ejecutarse mediante `runTransaction()` en el servidor para evitar condiciones de carrera.

---

## 🎨 3. UI/UX: Estándares Premium

### 3.1 La Regla del "Feedback Instantáneo"
*   Todo botón o elemento interactivo debe implementar `UIAnimationUtils.setClickAnimation()` para simular una respuesta física.
*   Las transiciones entre pantallas deben ser imperceptibles (Efecto Duolingo en la barra de navegación) para simular una App unificada.

### 3.2 Adaptabilidad y Accesibilidad
*   **Edge-to-Edge**: Las pantallas deben configurarse para usar el 100% de la superficie (incluyendo barras de sistema) bajo los estándares de Android 15.
*   **Targets Táctiles**: Ningún elemento interactivo debe medir menos de **48dp**.

---

## 🛡️ 4. Gestión de Errores y Calidad

### 4.1 Resiliencia de Red
*   Es obligatorio el uso de `NetworkMonitor` antes de iniciar transacciones críticas para informar al usuario sobre micro-desconexiones rurales.

### 4.2 Integridad de Lanzamiento (Release Integrity)
*   **ProGuard**: Al añadir librerías externas (ej: Google Auth), es mandatorio actualizar `proguard-rules.pro` para evitar la eliminación de código en compilaciones de producción.
*   **Firmas SHA**: Asegurar que las llaves SHA-1 de Debug y Release (Play Store) estén siempre registradas en Firebase para no interrumpir el flujo de notificaciones y login social.

### 4.3 Logging y Telemetría
*   **Crashlytics**: Todo bloque `catch` de una excepción crítica debe ser reportado vía `MyApp.logError()`.
*   **Analytics**: Cada paso del embudo de conversión (Reserva) debe registrarse mediante los `AnalyticsHelpers` correspondientes.

---

## 📦 5. Flujo de Git (Senior)
*   **Commits Semánticos**: `feat:`, `fix:`, `docs:`, `refactor:`.
*   **Rama Activa**: Toda mejora debe desarrollarse en `feature/premium` antes de fusionarse a la rama principal de producción.

---
**Chop Code Solutions - Engineering Excellence v1.3.0**
