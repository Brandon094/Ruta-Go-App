# 🤖 Manual de Ingeniería y Estándares de Código - Ruta-Go

Este documento establece las directrices técnicas obligatorias para mantener la excelencia en el desarrollo de **Ruta-Go**. Está diseñado para garantizar la consistencia, seguridad y escalabilidad del ecosistema.

---

## 1. Estándares de Codificación (Clean Code)

### 1.1 Nomenclatura Profesional
*   **Idioma Técnico**: Todo el código fuente (clases, variables, métodos, comentarios de desarrollo) debe escribirse en **Inglés**.
*   **Variables**: Usar CamelCase descriptivo (ej: `currentVehiclePlate` en lugar de `placa`).
*   **Constantes**: UPPER_SNAKE_CASE (ej: `MIN_PASSWORD_LENGTH`).
*   **Paquetes**: Seguir la jerarquía modular definida en la arquitectura.

### 1.2 Principio de Responsabilidad Única (SRP)
*   **Activities**: Solo inflan la UI y delegan todo el procesamiento al ViewModel.
*   **Engines**: Contienen algoritmos de negocio complejos. Prohibido incluir referencias a `View` o `Context` dentro de un Engine.
*   **Utils**: Funciones puras que no mantienen estado.

---

## 2. Gestión de Datos y Firebase

### 2.1 Reactividad y Listeners
*   **Real-time First**: Priorizar `addValueEventListener` sobre consultas de un solo disparo para garantizar una UX reactiva.
*   **Lifecycle Awareness**: Es obligatorio limpiar los listeners en `onCleared()` (ViewModels) o `onDestroy()` (Activities).
    ```java
    @Override
    protected void onCleared() {
        super.onCleared();
        databaseRef.removeEventListener(myListener);
    }
    ```

### 2.2 Integridad Transaccional
*   Toda modificación de inventario (asientos, cupos, saldos) **debe** usar `runTransaction()`. Prohibido el uso de `setValue()` para incrementos o decrementos de contadores concurrentes.

---

## 3. UI/UX: La "Regla del 8%" y Guías Visuales

### 3.1 Layouts Responsivos
*   **Guidelines**: Uso obligatorio de guías porcentuales al **8%** y **92%** en formularios para garantizar consistencia visual en diferentes densidades de pantalla.
*   **Barriers**: Utilizar barreras para evitar que elementos dinámicos (nombres largos, descripciones) se superpongan con botones de acción.
*   **Min-Height**: Todos los elementos interactivos deben tener un `minHeight` de al menos **48dp** para accesibilidad táctil.

### 3.2 Animaciones de Marca
*   **Feedback Inmediato**: Uso de `UIAnimationUtils.setClickAnimation()` en todos los botones para simular presión física.
*   **Transiciones**: Implementar `playCardEntryAnimation()` para dar una sensación de fluidez al cargar listas de horarios o tiquetes.

---

## 4. Gestión de Recursos (Clean Resources)

### 4.1 Centralización de Textos
*   **Prohibido** el uso de strings literales ("hardcoded"). El 100% de la información textual debe residir en `strings.xml`.
*   **Prefijos**: Organizar por módulo (ej: `tut_dr_...`, `auth_err_...`).

### 4.2 Iconografía y Colores
*   Utilizar siempre los alias de color definidos en `BRANDING.md` (ej: `?attr/colorPrimary`). Evitar llamar directamente a colores hexadecimales en los layouts.

---

## 5. Protocolo de Calidad (QA Senior Standards)

### 5.1 Manejo de Excepciones
*   No dejar bloques `catch` vacíos. Loguear errores mediante `Log.e()` y reportar excepciones críticas a Firebase Crashlytics.
*   **Sanity Checks**: Validar siempre el estado del objeto antes de llamar a un getter (ej: `if (driver != null)`).

### 5.2 Analíticas
*   Cada acción clave del usuario debe disparar un evento analítico mediante `registrarEventoAnalitico()`.

---
**Chop Code Solutions - Engineering Excellence 2026**
