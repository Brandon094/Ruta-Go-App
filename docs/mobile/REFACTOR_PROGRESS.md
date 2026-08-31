# 🚀 Bitácora de Refactorización Premium: Ruta-Go Mobile v2.0 (Última actualización: 31 de Agosto de 2026)

Este documento registra el progreso de la migración a **Kotlin + Jetpack Compose**, siguiendo los estándares de **Atomic Design**, **DRY** y **MVVM**.

---

## 📊 1. Resumen de Estado Actual del Proyecto
- **Lenguaje**: **100% Kotlin** (0 archivos Java en producción).
- **UI Framework**: **100% Jetpack Compose (Material 3)**.
- **Navegación & Flujos**: **100% integrados** (Onboarding → Auth/Google One Tap → Home → Selección de Asientos → Confirmación de Reserva → Tiquete / Chat / Historial).
- **Persistencia de Sesión**: **Corregida & Centralizada** (Unificación en `SessionManager` + `SettingsRepositoryImpl` sobre `"rutago_prefs"`).
- **Normalización NoSQL**: **100% Inglés en Escritura + Deserialización Pasiva** (`Reservation`, `User`, `Driver`, `Vehicle`, `Schedule`, `Rating`).
- **Arquitectura**: **MVVM + Clean Architecture + Single-Activity Architecture** (`MainActivity.kt`) + Navigation Compose.
- **Patrón UI**: **Atomic Design puro** (`ui/components/atoms`, `molecules`, `organisms`) con UIs totalmente desacopladas e impulsadas por `UiState` y `StateFlow`.
- **Adapters**: **0 Adapters de RecyclerView** (removidos en su totalidad al migrar a componentes Composable puros).
- **Compilación**: ✅ **Verde (`Build finished successfully` - APK assembleDebug)**.
- **Progreso Estimado del Refactor**: **98% Completado**.

---

## 📂 2. Estructura Limpia de Paquetes (`com.chopcode.rutago.app`)

```text
com.chopcode.rutago.app/
├── config/                  # MyApp.kt (Singleton e inicialización de Firebase)
├── data/
│   ├── models/              # User, Reservation, Schedule, Route, Driver, Passenger, Vehicle, ChatMessage, Rating, RouteStat
│   └── repositories/        # AuthRepository, SettingsRepository
├── engines/
│   └── seats/               # SeatDataProcessor.kt, SeatManager.kt (Motor de asientos y transacciones)
├── managers/
│   └── core/
│       ├── analytics/       # DashboardAnalyticsHelper.kt, ReservationAnalyticsHelper.kt
│       ├── auth/            # AuthManager.kt
│       ├── notifications/   # NotificationManager.kt
│       ├── permissions/     # PermissionManager.kt
│       ├── ratings/         # RatingManager.kt
│       └── settings/        # SessionManager.kt
├── services/                # UserService, ScheduleService, NotificationService, PassengerReservationService, StorageService, ArchiveService, etc.
├── ui/
│   ├── components/          # Atomic Design (100% Composables reactivos):
│   │   ├── atoms/           # AuthLogo, GoogleButton, PagerIndicator, UserAvatar, StatusBadge, RutaGoButton, RutaGoTextField, RatingStars
│   │   ├── molecules/       # ScheduleItem, ReservationItem, TicketInfoItem, ChatMessageItem, OnboardingSlide, TravelInfoCard, VehicleInfoCard, SeatItem, etc.
│   │   └── organisms/       # ScheduleList, TicketCard, SeatGrid, StatsCard, AuthCard
│   ├── nav/                 # RutaGoNavHost, Destinations
│   ├── screens/             # HomeScreen, CreateReservationScreen, ProfileScreen, HistoryScreen, TicketScreen, ChatScreen, ManageSeatsScreen, etc.
│   ├── theme/               # Color.kt, Theme.kt
│   └── viewmodels/          # HomeViewModel, CreateReservationViewModel, UserProfileViewModel, ManageSeatsViewModel, etc.
└── utils/                   # FormatUtils, WindowUtils, NetworkMonitor, ImageUtils, UIAnimationUtils, SecurityUtils
```

---

## 🎨 3. Sistema de Diseño (Atomic Design)

### ⚛️ Átomos (Atoms)
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
- [x] **[ScheduleItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ScheduleItem.kt)**: Componente desacoplado para representar un turno de despacho.
- [x] **[ReservationItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ReservationItem.kt)**: Tiquete resumido con acciones (Chat/Ver).
- [x] **[TicketInfoItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TicketInfoItem.kt)**: Detalle clave del tiquete.
- [x] **[ChatMessageItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ChatMessageItem.kt)**: Burbuja de mensaje estilizada.
- [x] **[RutaGoBottomBar](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/RutaGoBottomBar.kt)**: Barra de navegación inferior compartida.
- [x] **[JornadaCompletadaCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/JornadaCompletadaCard.kt)**: Feedback visual de fin de día (Paridad Web).
- [x] **[LogoutDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/LogoutDialog.kt)**: Diálogo de confirmación de salida.
- [x] **[TutorialDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TutorialDialog.kt)**: Guías interactivas para nuevos usuarios (MVVM Driven).
- [x] **[ReservationSuccessDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/ReservationSuccessDialog.kt)**: Feedback premium de reserva exitosa.
- [x] **[DeleteAccountDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/DeleteAccountDialog.kt)**: Diálogo de advertencia para borrado de cuenta.
- [x] **[RatingDialog](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/RatingDialog.kt)**: Diálogo de feedback para conductores.
- [x] **[SeatItem](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/SeatItem.kt)**: Representación visual de un asiento.
- [x] **[TravelInfoCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/TravelInfoCard.kt)**: Resumen del trayecto seleccionado.
- [x] **[VehicleInfoCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/molecules/VehicleInfoCard.kt)**: Datos del conductor y vehículo.

### 🧬 Organismos (Organisms)
- [x] **[AuthCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/AuthCard.kt)**: Contenedor tipo tarjeta para formularios.
- [x] **[StatsCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/StatsCard.kt)**: Tarjeta de estadísticas con indicadores y leyenda expandible.
- [x] **[ScheduleList](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/ScheduleList.kt)**: Listado reactivo de horarios con `LazyColumn` y estados de carga.
- [x] **[TicketCard](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/TicketCard.kt)**: Comprobante digital con efecto de perforación.
- [x] **[SeatGrid](../../app/src/main/java/com/chopcode/rutago/app/ui/components/organisms/SeatGrid.kt)**: Distribución visual del bus para selección.

### 📱 Pantallas (Screens)
- [x] **[LoginScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/LoginScreen.kt)**: Inicio de sesión con soporte Google Login.
- [x] **[RegistrationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/RegistrationScreen.kt)**: Registro de pasajeros.
- [x] **[ForgotPasswordScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/ForgotPasswordScreen.kt)**: Recuperación de contraseña.
- [x] **[OnboardingScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/auth/OnboardingScreen.kt)**: Tutorial interactivo con `HorizontalPager`.
- [x] **[HomeScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/HomeScreen.kt)**: Dashboard unificado Pasajero/Conductor con **Sticky Headers**.
- [x] **[HistoryScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/HistoryScreen.kt)**: Listado de viajes con filtros por estado y búsqueda.
- [x] **[ProfileScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/ProfileScreen.kt)**: Perfil, avatar y estadísticas.
- [x] **[EditProfileScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/EditProfileScreen.kt)**: Formulario de actualización de datos.
- [x] **[CreateReservationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/CreateReservationScreen.kt)**: Selección interactiva de asientos.
- [x] **[ConfirmReservationScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/passenger/ConfirmReservationScreen.kt)**: Pasarela de confirmación final.
- [x] **[TicketScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/TicketScreen.kt)**: Tiquete digital animado.
- [x] **[ChatScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/common/ChatScreen.kt)**: Mensajería en tiempo real.
- [x] **[ManageSeatsScreen](../../app/src/main/java/com/chopcode/rutago/app/ui/screens/driver/ManageSeatsScreen.kt)**: Bloqueo táctico de asientos para el conductor.

---

## 🧹 4. Reemplazo de Adapters e Interfaz Stateless

- [x] **Eliminación Total del Paquete `adapters/`**: Todos los `RecyclerView.Adapter` (`ScheduleAdapter`, `RouteAdapter`, `RouteStatAdapter`, `SelectRouteAdapter`, `OnboardingAdapter`) fueron completamente removidos.
- [x] **Molecules & Organisms**: Las listas de elementos ahora son representadas mediante componentes puros en `ui/components/molecules/` y `ui/components/organisms/` manejados mediante `LazyColumn`, `LazyRow` y `HorizontalPager`.
- [x] **UIs "Tontas" (Stateless)**: Las pantallas reciben su estado a través de datos inmutables `UiState` expedidos por los `ViewModel`s correspondientes, manteniendo cumplimiento estricto de **MVVM**, **DRY** y **Atomic Design**.

---

**ChopCode Solutions - Mobile Refactor 2026**
