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

- [x] **[AuthLogo](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/AuthLogo.kt)**: Logo circular adaptativo.
- [x] **[GoogleButton](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/GoogleButton.kt)**: Botón de login social.
- [x] **[PagerIndicator](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/PagerIndicator.kt)**: Puntos dinámicos para el tutorial.
- [x] **[UserAvatar](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/UserAvatar.kt)**: Imagen de perfil circular con Coil.
- [x] **[StatusBadge](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/StatusBadge.kt)**: Etiqueta de estado del usuario.
- [x] **[RutaGoButton](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/RutaGoButton.kt)**: Botón principal estandarizado.
- [x] **[RutaGoTextField](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/RutaGoTextField.kt)**: Campo de texto premium.
- [x] **[RatingStars](../../app/src/main/java/com/chopcode/rutago/app/ui/components/atoms/RatingStars.kt)**: Visualización de estrellas interactiva.

### 🧪 Moléculas (Molecules)
- [x] **[LegalConsent](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/LegalConsent.kt)**: Checkbox de términos y privacidad.
- [x] **[AuthHeader](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/AuthHeader.kt)**: Logo + Título + Subtítulo.
- [x] **[AuthFooter](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/AuthFooter.kt)**: Enlaces de navegación inferior.
- [x] **[OnboardingSlide](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/OnboardingSlide.kt)**: Estructura visual de cada paso del tutorial.
- [x] **[WelcomeHeader](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/WelcomeHeader.kt)**: Saludo personalizado + Avatar + Status.
- [x] **[StatItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/StatItem.kt)**: Ítem de estadística individual.
- [x] **[ScheduleItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ScheduleItem.kt)**: Card de turno de despacho premium.
- [x] **[ReservationItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ReservationItem.kt)**: Tiquete resumido con acciones (Chat/Ver).
- [x] **[TicketInfoItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TicketInfoItem.kt)**: Detalle clave del tiquete.
- [x] **[ChatMessageItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ChatMessageItem.kt)**: Burbuja de mensaje estilizada.
- [x] **[RutaGoBottomBar](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/RutaGoBottomBar.kt)**: Barra de navegación inferior compartida.
- [x] **[JornadaCompletadaCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/JornadaCompletadaCard.kt)**: Feedback visual de fin de día (Paridad Web).
- [x] **[LogoutDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/LogoutDialog.kt)**: Diálogo de confirmación de salida.
- [x] **[TutorialDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TutorialDialog.kt)**: Guías interactivas para nuevos usuarios (MVVM Driven).
- [x] **[ReservationSuccessDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ReservationSuccessDialog.kt)**: Feedback premium de reserva exitosa (Pendiente).
- [x] **[DeleteAccountDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/DeleteAccountDialog.kt)**: Diálogo de advertencia para borrado de cuenta.
- [x] **[RatingDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/RatingDialog.kt)**: Diálogo de feedback para conductores.
- [x] **[SeatItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/SeatItem.kt)**: Representación visual de un asiento.
- [x] **[TravelInfoCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TravelInfoCard.kt)**: Resumen del trayecto seleccionado.
- [x] **[VehicleInfoCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/VehicleInfoCard.kt)**: Datos del conductor y vehículo.

### 🧬 Organisms (Organisms)
- [x] **[AuthCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/AuthCard.kt)**: Contenedor tipo tarjeta para formularios.
- [x] **[StatsCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/StatsCard.kt)**: Tarjeta de estadísticas con indicadores y leyenda expandible.
- [x] **[ScheduleList](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/ScheduleList.kt)**: Listado reactivo de horarios con estados de carga.
- [x] **[TicketCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/TicketCard.kt)**: Comprobante digital con efecto de perforación.
- [x] **[SeatGrid](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/SeatGrid.kt)**: Distribución visual del bus para selección.

### 📱 Pantallas (Screens)
- [x] **[LoginScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/LoginScreen.kt)**: Interfaz premium de inicio de sesión con soporte para Google Login.
- [x] **[RegistrationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/RegistrationScreen.kt)**: Pantalla de registro de pasajeros con validaciones visuales.
- [x] **[ForgotPasswordScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/ForgotPasswordScreen.kt)**: Flujo de recuperación de contraseña con estados de éxito y carga.
- [x] **[OnboardingScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/OnboardingScreen.kt)**: Tutorial interactivo con transiciones fluidas.
- [x] **[PassengerHomeScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/PassengerHomeScreen.kt)**: Dashboard principal con **Sticky Headers** y scroll profesional.
- [x] **[ReservationHistoryScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/ReservationHistoryScreen.kt)**: Listado de viajes con filtros por estado y búsqueda.
- [x] **[UserProfileScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/UserProfileScreen.kt)**: Gestión de perfil, foto y estadísticas de fidelización.
- [x] **[EditProfileScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/EditProfileScreen.kt)**: Formulario de actualización de datos con validación reactiva.
- [x] **[CreateReservationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/CreateReservationScreen.kt)**: Selección de asientos interactiva.
- [x] **[ConfirmReservationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/ConfirmReservationScreen.kt)**: Pasarela de confirmación final.
- [x] **[TicketScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/TicketScreen.kt)**: Visualización premium del tiquete con animaciones de entrada.
- [x] **[ChatScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/ChatScreen.kt)**: Mensajería en tiempo real con soporte IME.
- [x] **[PassengerHomeActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/PassengerHomeActivity.kt)**: Migración completa a Kotlin/Compose.
- [x] **[ReservationHistoryActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/history/ReservationHistoryActivity.kt)**: Orquestador del historial.
- [x] **[UserProfileActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/profile/UserProfileActivity.kt)**: Gestión de identidad del usuario.
- [x] **[EditProfileActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/editProfile/EditProfileActivity.kt)**: Formulario de edición de contacto.
- [x] **[CreateReservationActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/reservation/createReservation/CreateReservationActivity.kt)**: Selección de asientos.
- [x] **[ConfirmReservationActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/passenger/reservation/confirmReservation/ConfirmReservationActivity.kt)**: Confirmación de tiquete.
- [x] **[TicketActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/TicketActivity.kt)**: Punto de entrada para tiquetes digitales.
- [x] **[ChatActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/ChatActivity.kt)**: Puente de comunicación contextual.
- [x] **[OnboardingActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/OnboardingActivity.kt)**: Migración completa a Kotlin/Compose.
- [x] **[SplashActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/SplashActivity.kt)**: Migración a Kotlin y uso de la **Android Splash API** oficial.

---

## 💾 3. Capa de Datos (Data Layer)
- [x] **[AuthRepository](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/auth/AuthRepository.kt)**: Interfaz de contrato para autenticación.
- [x] **[AuthRepositoryImpl](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/auth/AuthRepositoryImpl.kt)**: Implementación real con **FirebaseAuth**.
- [x] **[ReservationRepository]**: (En progreso) Gestión de reservas en tiempo real.
- [x] **[SettingsRepository](../../app/src/main/java/com/chopcode/rutago/app/data/repositories/settings/SettingsRepository.kt)**: Gestión de preferencias locales (Onboarding status).

---

## 🧠 4. Arquitectura MVVM (Kotlin)
- [x] **Auth ViewModels**: Implementación de lógica centralizada con `UiState` y `StateFlow`.
    - [x] **[LoginViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/LoginViewModel.kt)**: Conectado al repositorio real.
    - [x] **[RegistrationViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/RegistrationViewModel.kt)**: Conectado al repositorio real.
    - [x] **[ForgotPasswordViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/auth/ForgotPasswordViewModel.kt)**: Conectado al repositorio real.
- [x] **Passenger ViewModels**:
    - [x] **[PassengerHomeViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/PassengerHomeViewModel.kt)**: Dashboard reactivo con Firebase Realtime Database.
    - [x] **[ReservationHistoryViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/ReservationHistoryViewModel.kt)**: Lógica para filtrado y visualización de viajes pasados.
- [x] **[UserProfileViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/UserProfileViewModel.kt)**: Gestión de perfil y estadísticas premium.
- [x] **[EditProfileViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/EditProfileViewModel.kt)**: Lógica de actualización de datos personales.
- [x] **[TicketViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/common/TicketViewModel.kt)**: Lógica para generación y validación de tiquetes digitales.
- [x] **[ChatViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/common/ChatViewModel.kt)**: Comunicación bidireccional reactiva.
- [x] **[CreateReservationViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/CreateReservationViewModel.kt)**: Motor de orquestación de asientos.
- [x] **[ConfirmReservationViewModel](../../app/src/main/java/com/chopcode/rutago/app/ui/viewmodels/passenger/ConfirmReservationViewModel.kt)**: Cierre transaccional de reservas.
- [x] **UI State Driven**: Las pantallas ahora son componentes puros que reaccionan al estado del ViewModel.

---

## 📅 9. Flujo de Reservas (UI) - COMPLETADO
- [x] **Seat Selector**: Cuadrícula dinámica adaptada a la capacidad del vehículo.
- [x] **Transactional Summary**: Pantalla de revisión final antes de la persistencia.

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
    - **Solución**: Se eliminaron los estados locales y ahora las pantallas son 100% reactivas al `UiState` del ViewModel.
- **Error #006**: *Gradle OutOfMemoryError (:app:packageDebug)*.
    - **Causa**: Insuficiencia de memoria JVM para procesar los recursos de Compose.
    - **Solución**: Se aumentó el heap de Gradle a `4096m` en `gradle.properties`.
- **Error #007**: *FragmentStateAdapter Compatibility*.
    - **Causa**: Se cambió la Activity a `ComponentActivity` rompiendo adaptadores legacy.
    - **Solución**: Se restauró la herencia a `AppCompatActivity` y se añadieron puentes de compatibilidad.

---

## 🌓 6. Soporte Multi-Tema (Light/Dark)
- [x] **Implementación de Temas**: Configuración de `LightColorScheme` y `DarkColorScheme` en `Theme.kt`.
- [x] **Componentes Semánticos**: Todos los átomos y moléculas consumen colores desde el sistema de Material 3, eliminando hardcoding de colores Navy.
- [x] **Auto-Detección**: La app ahora respeta la configuración global del sistema operativo del usuario.
- [x] **Sticky Headers**: Implementación de cabeceras fijas en el scroll para una navegación fluida en el Dashboard.
- [x] **UX Feedback**: Implementación de la "Regla de Oro" (7 PM Reset), banner "Siguiente" estilo web y autoscroll animado.
- [x] **Tutorial System**: Guías interactivas persistentes para cada fase de la reserva y gestión de perfil.
- [x] **Rating System**: Integración de calificaciones nativas vinculadas a reservas de Firebase.
- [x] **Navigation Cleanup**: Eliminación de barras de navegación duplicadas y unificación de flujo Compose.

---

## 🎟️ 7. Experiencia de Tiquete y Chat
- [x] **Ticket Digital**: Recreación de tiquete con efecto "punched" y QR simulado (v2.0).
- [x] **Chat Contextual**: Mensajería vinculada a reservas con estados de carga y error.
- [x] **SocialSharing**: Implementación de compartir tiquete como imagen (Powered by Compose Capture).

---

## 📅 9. Flujo de Reservas (UI)
- [ ] **[CreateReservationScreen]**: Interfaz interactiva para selección de asientos y ruta.
- [ ] **[ConfirmReservationScreen]**: Resumen premium antes de la persistencia en Firebase.

---

## 🚀 Phase 1: Authentication & Onboarding (COMPLETED)
- [x] **[LoginActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/LoginActivity.kt)**: Migrado a Kotlin + Compose con soporte One Tap.
- [x] **[RegistrationActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/RegistrationActivity.kt)**: Registro de usuarios con validaciones reactivas.
- [x] **[ForgotPasswordActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/ForgotPasswordActivity.kt)**: Recuperación de cuenta con estados de éxito.
- [x] **[OnboardingActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/OnboardingActivity.kt)**: Tutorial premium inicial.
- [x] **Auth Repository**: Centralización de lógica en `AuthRepositoryImpl.kt`.

---

## 🚀 Phase 2: Core Application & Profiles (COMPLETED)
- [x] **[ReservationHistoryScreen]**: Historial de viajes.
- [x] **[UserProfileScreen]**: Gestión de perfil.
- [x] **[TicketScreen]**: Detalle de tiquete.
- [x] **[ChatScreen]**: Mensajería.

---

## 🚀 Phase 3: Driver Experience & Unified Dashboards
- [x] **Unified Dashboard**: Implementación de `HomeScreen` dinámico que conmuta entre Pasajero y Conductor según el rol de Firebase.
- [x] **Unified History**: Pantalla de `HistoryActivity` compartida con lógica de filtrado por rol.
- [x] **Unified Profile**: Pantalla de `ProfileActivity` y `EditProfileActivity` unificadas (gestión de vehículos para conductores).
- [x] **[HomeActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/common/HomeActivity.kt)**: Punto de entrada único.
- [x] **Driver Modules**:
    - [x] **Real-time Stats**: Agregación de ingresos y cupos libres para conductores.
    - [x] **Pending Management**: Confirmación y cancelación rápida de reservas desde el Home.
    - [x] **Route Breakdown**: Visualización de ocupación por turno asignado.
- [x] **[ManageSeatsScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/driver/ManageSeatsScreen.kt)**: Interfaz para bloqueo de asientos (Venta Física).
- [x] **[ManageSeatsActivity](../../app/src/main/java/com/chopcode/rutago/app/activities/driver/manager/ManageSeatsActivity.kt)**: Orquestador de gestión táctica de cupos.
- [x] **Role Management Logic**: Inyección de lógica condicional en ViewModels centralizados.

---

## 📊 8. Ingeniería de Datos & Motores (Normalización)
- [x] **Model Migration**: Migración completa de todos los modelos a Kotlin con **Legacy Bridge** (Paridad Java/Firebase).
- [x] **Service Migration**: Todos los servicios operativos migrados a Kotlin con Corrutinas.
- [x] **Architecture Cleanup**: Eliminación de +20 archivos legacy (Adapters, ViewModels y Activities duplicadas).
- [ ] **Database Physical Normalization**: (Pendiente) Script de migración para renombrar llaves en Firebase.

---

## 🚀 Phase 4: Owner Panel & Final Polish
- [ ] **[OwnerDashboard]**: Panel para dueños de flotas (Gestión de conductores y vehículos).
- [ ] **[AdminTools]**: Herramientas de administración global.
- [ ] **Legacy Cleanup**: Eliminación definitiva de puentes de compatibilidad tras normalización de DB.

**ChopCode Solutions - Mobile Refactor 2026**

