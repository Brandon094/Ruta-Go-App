# 🚀 Bitácora de Refactorización Premium: Ruta-Go Mobile v2.0

Este documento registra el progreso de la migración a **Kotlin + Jetpack Compose**, siguiendo los estándares de **Atomic Design**, **DRY** y **MVVM**.

---

## 🏗️ 1. Infraestructura Core
- **Lenguaje**: Kotlin 1.9.10.
- **UI Framework**: Jetpack Compose (Material 3).
- **JVM Target**: 17 (Sincronizado con el ecosistema moderno).
- **Branch**: `feature/premium-refactor-compose`.

---

## 🎨 2. Sistema de Diseño (Atomic Design)

- [x] **[AuthLogo](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/AuthLogo.kt)**: Logo circular con fondo Navy.
- [x] **[GoogleButton](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/GoogleButton.kt)**: Botón de login social.
- [x] **[PagerIndicator](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/PagerIndicator.kt)**: Puntos dinámicos para el tutorial.

### 🛠️ Utilidades (Utils)
- [x] **[ValidatorUtils](../../app/src/main/java/com/chopcode/rutago/app/ui/utils/ValidatorUtils.kt)**: Centralización de reglas de validación (DRY).

### 🧪 Moléculas (Molecules)
- [x] **[LegalConsent](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/LegalConsent.kt)**: Checkbox de términos y privacidad.
- [x] **[AuthHeader](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/AuthHeader.kt)**: Logo + Título + Subtítulo.
- [x] **[AuthFooter](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/AuthFooter.kt)**: Enlaces de navegación inferior.
- [x] **[OnboardingSlide](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/OnboardingSlide.kt)**: Estructura visual de cada paso del tutorial.

### 🧬 Organismos (Organisms)
- [x] **[AuthCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/AuthCard.kt)**: Contenedor tipo tarjeta para formularios.

### 📱 Pantallas (Screens)
- [x] **[LoginScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/LoginScreen.kt)**: Interfaz premium de inicio de sesión con soporte para Google Login.
- [x] **[RegistrationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/RegistrationScreen.kt)**: Pantalla de registro de pasajeros con validaciones visuales.
- [x] **[ForgotPasswordScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/ForgotPasswordScreen.kt)**: Flujo de recuperación de contraseña con estados de éxito y carga.
- [x] **[OnboardingScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/OnboardingScreen.kt)**: Tutorial interactivo con transiciones fluidas.
- [x] **[OnboardingActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/OnboardingActivity.kt)**: Migración completa a Kotlin/Compose.
- [x] **[SplashActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/SplashActivity.kt)**: Migración a Kotlin y uso de la **Android Splash API** oficial.

---

## 💾 3. Capa de Datos (Data Layer)
- [x] **[AuthRepository](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/auth/AuthRepository.kt)**: Interfaz de contrato para autenticación.
- [x] **[AuthRepositoryImpl](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/auth/AuthRepositoryImpl.kt)**: Implementación real con **FirebaseAuth**.
- [x] **[SettingsRepository](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/settings/SettingsRepository.kt)**: Gestión de preferencias locales (Onboarding status).

---

## 🧠 4. Arquitectura MVVM (Kotlin)
- [x] **Auth ViewModels**: Implementación de lógica centralizada con `UiState` y `StateFlow`.
    - [x] **[LoginViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/LoginViewModel.kt)**: Conectado al repositorio real.
    - [x] **[RegistrationViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/RegistrationViewModel.kt)**: Conectado al repositorio real.
    - [x] **[ForgotPasswordViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/ForgotPasswordViewModel.kt)**: Conectado al repositorio real.
- [x] **UI State Driven**: Las pantallas ahora son componentes puros que reaccionan al estado del ViewModel.

---

## 🛡️ 5. Control de Fallos y Lecciones Aprendidas
- **Error #001**: *Unknown Kotlin JVM target: 21*. 
    - **Causa**: Desajuste entre el compilador de Kotlin y la configuración de Java en el build.gradle.
    - **Solución**: Se forzó el `jvmTarget = '17'` y `sourceCompatibility = VERSION_17`.
- **Error #002**: *Preview Render Fail*.
    - **Causa**: Falta de Gradle Sync tras añadir dependencias de Compose.
    - **Solución**: Realizar Sync y Build antes de usar el modo Design.
- **Error #003**: *Crossfade lambda type mismatch*.
    - **Causa**: Problema de inferencia de tipos en lambdas Composables complejas.
    - **Solución**: Se simplificó el flujo condicional para asegurar la compilación estable.
- **Error #004**: *Duplicate SplashActivity*.
    - **Causa**: Coexistencia de versión Java y Kotlin.
    - **Solución**: Eliminación física de la versión legacy tras migrar la lógica.
- **Error #005**: *Redundant Local State in Screens*.
    - **Causa**: Se estaban usando `remember { mutableStateOf }` dentro de las pantallas para campos que ya existían en el `UiState`.
    - **Solución**: Se eliminaron los estados locales y ahora las pantallas son 100% reactivas al `UiState` del ViewModel, centralizando la validación (Silicon Valley UX).


---
**ChopCode Solutions - Mobile Refactor 2026**
