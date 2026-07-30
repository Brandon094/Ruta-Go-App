# 🤖 Manual de Ingeniería y Estándares de Código (Senior Edition)

Este documento establece las directrices técnicas obligatorias para mantener la excelencia en el desarrollo del Ecosistema Go. Está diseñado para garantizar la consistencia, seguridad y escalabilidad de Ruta-Go en todas sus plataformas.

---

## 🏛️ 1. Filosofías de Arquitectura

### 📱 Android (MVVM Reactivo)
*   **View**: Observadores puros de estado. Prohibida la lógica de negocio en Activities/Fragments.
*   **ViewModel**: Gestiona el estado de la UI. Transición gradual a Jetpack Compose para UI declarativa.
*   **Engines**: Algoritmos puros desacoplados del SDK de Android.

### 🖥️ Web (Atomic Design & Singleton)
*   **Componentes**: Estructura basada en **Atoms, Molecules y Organisms**.
*   **Hooks**: Centralización de la reactividad mediante Custom Hooks especializados.
*   **Singleton**: Acceso a infraestructura vía `FirebaseManager` para evitar múltiples instancias de Firebase.

---

## 📝 2. Estándares de Codificación (Clean Code)

### 2.1 Nomenclatura y Bilingüismo
*   **Código**: El 100% del código fuente (clases, métodos, variables y comentarios) debe escribirse en **Inglés**.
*   **Interfaz**: Los textos de usuario deben estar en **Español** (fuente única en `strings.xml` para Android y constantes para Web).
*   **Data Mapping**: Respeto al mapeo dual (DB en Español vs Modelos en Inglés) mediante anotaciones o transformaciones en la capa de servicios.

### 2.2 Atomicidad y DRY (Don't Repeat Yourself)
*   **Transacciones**: Toda operación sobre inventarios de asientos o finanzas debe usar `runTransaction()`.
*   **Reutilización**: Si una lógica visual se repite más de 2 veces, debe extraerse a un Átomo o Molécula.

---

## 🎨 3. UI/UX: Estándares Premium

### 3.1 Identidad Visual Unificada (Mirror)
*   **Branding**: Uso obligatorio del átomo `BrandLogo` (Web) y assets vectoriales oficiales (Android) para mantener la consistencia 1:1.
*   **Feedback**: Todo elemento interactivo debe tener estados visuales claros (Hover, Active, Disabled).

### 3.2 Rendimiento y Accesibilidad
*   **Lighthouse**: El desarrollo web debe mantener una puntuación mínima de 90 en todas las categorías.
*   **Accesibilidad AA**: Uso de `aria-labels`, contrastes legibles y targets táctiles mínimos de 48dp.
*   **Optimización**: Implementación obligatoria de **Lazy Loading** para activos pesados y módulos de ruta.

---

## 🛡️ 4. Gestión de Calidad

### 4.1 Resiliencia
*   Manejo proactivo de estados de carga (`Loading`) y error mediante componentes estandarizados (`SplashScreen`, `ErrorBoundary`).

### 4.2 Seguridad Cloud
*   Vigilancia permanente de las **Reglas de Seguridad** para evitar fugas de datos y asegurar el aislamiento por `ownerId`.

---

## 📦 5. Flujo de Git
*   **Mensajes Semánticos**: Uso de prefijos `feat:`, `fix:`, `docs:`, `refactor:`, `optimize:`.
*   **Gobernanza**: El Orquestador Maestro valida la integridad del Master Plan antes de cada merge a `master`.

---
**ChopCode Solutions - Engineering Excellence v1.9.10**
