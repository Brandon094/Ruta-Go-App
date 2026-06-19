# 🤖 Agente de Desarrollo Ruta-Go - Manual de Instrucciones

Este documento define los estándares técnicos, arquitectónicos y de proceso para el desarrollo de la aplicación **Ruta-Go (Transporte Natagá - La Plata)** por parte de **Chop Code Solutions**. Cualquier agente de IA o desarrollador debe seguir estas directrices estrictamente.

## 1. Identidad y Propósito
El objetivo es ofrecer una plataforma de transporte intermunicipal ágil, reactiva y confiable, conectando a los habitantes de Natagá y La Plata con conductores en tiempo real.

## 2. Parámetros de Marca (Branding)
- **Marca Desarrolladora:** Chop Code Solutions
- **Nombre de la App:** Ruta-Go
- **Package Name:** `com.chopcode.rutago.app`
- **Identidad Visual (Iconografía Oficial):**
  - `logo_splash`: Isotipo animado exclusivo para la pantalla de inicio (Splash Screen).
  - `logo_icon`: Imagotipo circular oficial para el icono de la aplicación y notificaciones Push.
  - `logo_main`: Versión horizontal/reducida para Top Bars (Toolbars) y componentes internos de la interfaz.
  - **Colores:** Primario (`primary_500` - Naranja), Secundario (`secondary_900` - Navy).

## 3. Stack Tecnológico Obligatorio
- **Lenguaje:** Java 17 (Toolchain configurado en `build.gradle`).
- **Gradle:** Versión 8.11 (Estabilizada para entornos Linux/Parrot con I/O restringido).
- **UI:** XML Layouts (View System) con Material Components.
- **Backend:** Firebase (Auth, Realtime Database, Storage, Cloud Messaging, Cloud Functions, Crashlytics) y Google Analytics.
- **Arquitectura:** **MVVM (Model-View-ViewModel)**. 
- **Reactividad:** Uso estricto de `LiveData` y `ValueEventListener` (`addValueEventListener`) para actualizaciones en tiempo real.

## 4. Reglas de Oro del Código

### A. Clean Architecture & Utils
- **Centralización:** Prohibido duplicar lógica de formateo o manipulación de strings. Usar siempre `com.chopcode.rutago.app.utils.ui.FormatUtils` para precios, horas, fechas y normalización de texto (ej. quitar tildes para comparaciones).
- **Mantenimiento:** El adaptador de listas (`Adapter`) solo debe mostrar datos; no debe realizar consultas a Firebase. La data debe llegar ya procesada desde el ViewModel.
- **Recursos:** El 100% de los textos deben estar en `strings.xml` organizados por pantalla/módulo.

### B. Gestión de Datos (Firebase)
- **Modelos Bilingües:** Los modelos usan "Mapeo Dual" con `@PropertyName` y campos privados para garantizar compatibilidad entre datos históricos (Español) y el nuevo estándar del código (Inglés).
- **Escucha Global:** Para listas de alta frecuencia, usar un solo listener global en el Service/ViewModel para optimizar el consumo de datos.
- **Robustez de Servicios:** Los servicios (`Service`) deben usar el contexto global de la aplicación (`MyApp.getInstance()`) para operaciones de UI, evitando crashes.
- **Seguridad:** Toda escritura debe cumplir con las reglas de validación de Firebase (ej. incluir `driverId` en vehículos y cumplir con campos obligatorios).
- **Caché de ViewModel:** Prohibido reiniciar estados de carga (Shimmer) si la data ya reside en memoria o el UID no ha cambiado. El Shimmer solo debe dispararse en la carga inicial para una experiencia instantánea.

### C. UI/UX
- **Feedback Visual:** Implementar `ShimmerFrameLayout` durante las cargas iniciales. Una vez cargada la data, usar `UIAnimationUtils` para conteos progresivos (incluyendo items de listas), transiciones de tarjetas (`playCardEntryAnimation`) y micro-interacciones de escala en elementos clickables.
- **Carga de Imágenes:** Usar `ImageUtils` con Glide (DiskCacheStrategy.ALL y Priority.IMMEDIATE) para garantizar que las fotos de perfil sean visibles al instante al navegar.
- **Reactividad:** Los Dashboards deben reaccionar a cambios en la base de datos instantáneamente. Evitar `addListenerForSingleValueEvent` en pantallas principales.
- **Notificaciones:** Seguir el estándar Premium unificado en `NotificationService` con identidad visual oficial.
- **Responsividad (Guías):** Uso obligatorio de `Guideline` porcentuales (8% inicio / 92% fin) en `ConstraintLayout` para que la UI "respire" en cualquier dispositivo.
- **Accesibilidad (Zoom 200%):** Prohibido usar alturas fijas (`android:layout_height`) en botones o contenedores con texto. Usar siempre `wrap_content` + `android:minHeight` (ej. 52dp) para evitar textos cortados.
- **Inmersión (Scroll Infinito):** Para efectos premium, usar `android:clipToPadding="false"` junto con un `paddingBottom` generoso (ej. 88dp) en listas. Esto permite que el contenido fluya por detrás de las barras de navegación.
- **Simetría Operativa:** El mapa de asientos debe usar una grilla de 5 columnas (Izquierda x2, Pasillo x1, Derecha x2) para garantizar alineación exacta en la gestión.
- **Compartición Segura:** El uso de `FileProvider` es obligatorio para compartir activos generados (como el tiquete digital) garantizando compatibilidad con Android 7.0+.
- **Estética Proyectual:** Prohibido el uso de emojis en items de lista, diálogos o encabezados. Usar exclusivamente la iconografía oficial en `drawables/icons/`. Evitar caracteres especiales como flechas Unicode (`→`); usar en su lugar estándares ASCII (`->`) para máxima compatibilidad.
- **Estandarización de Filas:** En tarjetas de información (ej. detalles del vehículo), usar `LinearLayout` con pesos (`weightSum`) en lugar de `GridLayout` para garantizar simetría 50/50 y evitar que los datos se oculten en fuentes grandes.
- **Centralización de Navegación:** El `BottomNavFragment` debe estar vinculado a su propio `BottomNavViewModel` para gestionar eventos de cierre de sesión y analíticas de navegación.
- **Consistencia en Diálogos:** Todos los diálogos deben heredar de `AppDialogTheme` y sus botones deben tener un `minHeight` mínimo de 48dp para accesibilidad.
- **Cabeceras de Perfil:** Para avatares grandes (150dp), usar un `headerBackground` de 270dp y una `Guideline` horizontal de seguridad a 310dp para evitar solapamientos.
- **Badges de Estado:** Usar el sistema de diseño unificado (Fondo Navy `secondary_900` + Borde sólido de 1dp del color de estado) para etiquetas de Confirmado, Cancelado, Pendiente, Activo e Inactivo. Para disponibilidad en horarios, usar el naranja corporativo `primary_500` para resaltar la acción de reserva.
- **Sincronización de Estadísticas:** Los contadores en Home e Historial deben seguir el orden consistente: [Confirmados] - [Cancelados] - [Total].
- **Gestión de Usuario:** Los pasajeros pueden alternar su estado entre Activo e Inactivo desde su perfil. El estado Bloqueado es administrativo y restringe funciones.
- **Política de Errores (UX):** 
  - *Snackbars:* Para avisos informativos o errores temporales (ej. reconexión). 
  - *Diálogos:* Para errores críticos o confirmaciones de seguridad. 
  - *TextInputLayout:* Solo para validaciones de formato en tiempo real.
  - *Visual Feedback:* Usar `UIAnimationUtils.playErrorShake` para indicar errores en campos específicos.
- **Micro-interacciones Premium:** 
  - **Feedback Táctil:** Uso obligatorio de `UIAnimationUtils.setClickAnimation` en botones para efecto de escala (presión).
  - **Efecto Latido:** Badges de estado "Activo" deben usar `UIAnimationUtils.startPulseAnimation` para indicar operatividad en tiempo real.
  - **Entrada Pop-in:** Tarjetas principales, tiquetes y **asientos ocupados** deben usar `UIAnimationUtils.playCardEntryAnimation` o `playSeatPopAnimation`.
  - **Selección de Asientos:** El mapa de asientos debe usar `playSeatSelectionAnimation` para confirmar visualmente la elección.

### D. Documentación Técnica & Analíticas
- **Código Auto-explicativo:** Variables y funciones con nombres claros en inglés.
- **Documentación de Negocio:** Toda clase crítica (ViewModels, Services) debe incluir Javadoc explicando la lógica de negocio y decisiones arquitectónicas (ej. por qué se usa Sync Atómico).
- **Analíticas Obligatorias:** Registrar eventos en Google Analytics para cada cambio de pantalla y acciones clave (ej. `reserva_creada`, `login_google`). Usar `BaseViewModel.registrarEventoAnalitico`.
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) en flujos principales para facilitar el debug en producción. Toda excepción en un `catch` debe ser reportada a Firebase Crashlytics.

### E. Estándares de Recursos (Clean Resources)
- **Nomenclatura de Strings:** Usar prefijos por módulo: `[modulo]_[proposito]` (ej. `login_error_empty`, `history_label_date`).
- **Nomenclatura de Assets:** 
  - Iconos: `ic_[nombre]` (ej. `ic_seat`). 
  - Fondos/Formas: `bg_[forma]_[proposito]` (ej. `bg_badge_active`).
- **Centralización:** Prohibido el uso de strings hardcodeados en layouts XML.

### F. Seguridad y Permisos
- **PermissionManager:** Todo flujo que requiera permisos (Notificaciones Android 13+, Galería) debe centralizarse en `com.chopcode.rutago.app.managers.permissions.PermissionManager`.
- **Sensibilidad:** Nunca persistir contraseñas en logs o analíticas.

### G. Gestión de Lanzamientos (Play Store)
- **Keystore Oficial:** El archivo de firma de producción (`key.jks`) reside exclusivamente en el entorno estabilizado (Linux/Parrot). **Prohibido borrar o mover sin backup externo.**
- **Versionamiento:** Seguir el estándar `versionCode` incremental (entero) y `versionName` semántico (ej. 1.2.0).
- **Huellas Digitales:** En caso de migración de entorno, se debe generar el certificado `.pem` y solicitar el restablecimiento de la "Clave de Carga" en la Play Console (proceso de 48 horas).
- **Integridad del Tiempo:** Prohibido recalcular horas de salida en la UI basándose en estimaciones. La `departureTime` (Hora de Salida) debe persistirse atómicamente en la reserva al momento de la creación para evitar errores de zona horaria o formato AM/PM.
- **Tarifas Dinámicas:** Prohibido hardcodear precios en el código. Se debe usar `PriceService` para consultar el nodo `precios/` en Firebase. Las llaves de origen y destino deben estar normalizadas (minúsculas y sin tildes).

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits** y los mensajes deben estar en **Español** para facilitar la comprensión del dueño del proyecto.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil del conductor, referencia al `vehiculoId`, `horariosAsignados` y `status`.
- `vehiculos/$id`: Datos técnicos y capacidad dinámica (Campo: `capacidad`).
- `precios/$origen/$destino`: Nodo de tarifas dinámicas. Permite escalabilidad sin actualizar la App.
- `reservas/`: Nodo plano indexado por `driverId`, `userId` y `reservationDate`. Incluye campos `departureTime` y `rated` para consistencia operativa.
- `reservas_archivadas/`: Nodo histórico para auditoría y rendimiento.
- `chats/`: Mensajería en tiempo real vinculada al `reservationId`.
- `disponibilidadAsientos/$horarioId`: Control operativo sincronizado. Campos: `asientosDisponibles`, `totalAsientos`, `asientosOcupados`.
- `usuarios/$uid`: Perfil de usuario, roles, tokens FCM y campo `status`.

## 7. Estado Actual del Proyecto (v1.2.0 Stable - Ready for Play Store)
- **Arquitectura:** 100% migrado a MVVM y LiveData. Dashboards, historiales y navegación 100% reactivos.
- **Optimización Premium:** Implementación de caché agresiva en ViewModels e imágenes (Glide) para navegación instantánea.
- **Estandarización Visual:** Unificación de orden de estadísticas en todas las pantallas. Implementación de micro-interacciones (feedback táctil) y animaciones pop-in.
- **Estandarización de Código:** Código fuente y llaves de Firebase 100% en Inglés. Soporte bilingüe blindado en modelos. Limpieza total de emojis y caracteres no estándar.
- **UI Responsiva & Accesible:** 100% de las actividades optimizadas con guías porcentuales y soporte para zoom de fuente (200%).
- **Mapa de Asientos:** Unificado y simétrico con grilla de 5 columnas.
- **Módulo de Autenticación:** Refactorizado. El antiguo `LoginService` se dividió en `EmailLoginService`, `GoogleLoginService` y `UserRoleService`.
- **Tarifas Dinámicas:** Implementado `PriceService` centralizado en la base de datos.
- **Mensajería:** Chat en Tiempo Real con notificaciones Push y **Deep Linking funcional** (enlaces directos) unificados en `NotificationService` con estilo Premium.
- **Atomicidad y Sincronización:** Uso de `runTransaction` para reservas. Sincronización de capacidad de vehículo automática tras edición de perfil.
- **Rendimiento:** `ArchiveService` para limpieza de reservas y límites de carga inteligentes en UI.
- **Tiquete Digital:** Visualización detallada, chat integrado y funcionalidad de **Compartir como Imagen (PNG)** con branding Navy unificado y animaciones de entrada.
- **Automatización de Operaciones:** Cloud Function `automatedRotation` funcional para rotación de turnos a las 7:00 PM (Bogotá), reseteo de asientos y notificaciones automáticas.
- **Gestión de Estados:** Sistema de estados (Activo/Inactivo/Bloqueado) implementado para Pasajeros y Conductores con badges de alta visibilidad y animación de pulso.

## 8. Siguientes Pasos (Roadmap Actualizado)
- **Hito 1 (DONE):** Optimizar Deep Linking y navegación reactiva.
- **Hito 2 (Lanzamiento):** Monitoreo de métricas en Play Console tras aprobación de Google.
- **Refinamiento:** Validar estilo Premium y Deep Linking en disparadores de Cloud Functions.
- **Hito 3:** Implementar sistema de pagos integrados (Pasarela de pagos).
- **Hito 4:** Panel de analíticas avanzadas para administración centralizada.
- **Mantenimiento:** Extraer el 100% de los strings hardcodeados en layouts XML hacia `strings.xml`.
- **Accesibilidad Visual:** Implementar Tema Claro (Naranja/Blanco) para optimizar el uso bajo luz solar intensa.

---

## 9. Inventario de Recursos Oficiales (Assets)
Para mantener la limpieza del proyecto, solo se deben usar los recursos listados. Cualquier archivo huérfano o legacy fuera de esta lista debe ser depurado.

### A. Iconografía (`res/drawables/icons/drawable/`)
- `ic_person`, `ic_driver`, `ic_person_pin`, `ic_person_add`: Identidad de usuario.
- `ic_seat`, `ic_bus`, `ic_steering_wheel`, `ic_car_model`, `ic_license`: Operación de transporte.
- `ic_route`, `ic_location_from`, `ic_location_to`, `ic_history`, `ic_arrow_back`, `ic_arrow_right`, `ic_home`: Navegación y trayectos.
- `ic_schedule`, `ic_time`, `ic_calendar`, `ic_calendar_today`: Gestión temporal.
- `ic_price`, `ic_monetization`, `ic_trending_up`, `ic_cash`: Finanzas y puntos.
- `ic_check`, `ic_cancel`, `ic_pending`, `ic_checklist`: Estados y validación.
- `ic_email`, `ic_phone`, `ic_phone_enabled`, `ic_chat`, `ic_send`: Comunicación.
- `ic_add`, `ic_edit`, `ic_delete`, `ic_refresh`, `ic_add_photo`, `ic_share`: Acciones CRUD y Social.
- `ic_visibility_on`, `ic_visibility_off`, `ic_key`, `ic_lock`, `ic_login`, `ic_logout`: Seguridad.
- `ic_expand_more`, `ic_expand_less`, `ic_info`, `ic_bolt`, `ic_notification`: Sistemas e Info.
- `asiento_disponible`, `asiento_seleccionado`, `asiento_ocupado`, `asiento_fisico`: Mapa de asientos.
- `logo_splash`, `logo_icon`, `logo_main`: Branding oficial.

### B. Fondos y Formas (`res/drawables/components/drawable/` y `res/drawables/backgrounds/drawable/`)
- **Badges de Estado:** `bg_estado_confirmado`, `bg_estado_cancelado`, `bg_estado_pendiente`.
- **Badges de Perfil:** `bg_badge_active`, `bg_badge_inactive`, `bg_badge_blocked`.
- **Items de Lista:** `bg_ruta_item`, `bg_time_circle`, `bg_badge_status`, `tab_selector_light`.
- **Contenedores:** `bg_info_card`, `bg_contact_card`, `bg_info_stats`, `bg_circle_logout`, `splash_background`, `gradient_divider`.
- **Fotos:** `bg_circle_photo`, `bg_profile_placeholder`.
- **Sistemas:** `skeleton_shape`, `snackbar_background`.

### C. Layouts Maestro (`res/layouts/[tipo]/layout/`)
- **Actividades:** `activity_inicio_usuarios`, `activity_inicio_conductor`, `activity_perfil_pasajero`, `activity_editar_perfil`, `activity_historial_reservas`, `activity_historial_conductor`, `activity_ticket`, `activity_chat`, `activity_inicio_de_sesion`, `activity_registro_usuarios`, `activity_crear_reservas`, `activity_confirmar_reserva`, `activity_recuperar_contrasena`, `activity_editar_perfil_pasajero`.
- **Componentes de Lista:** `item_horario`, `item_ruta`, `item_historial_general`, `item_reserva`, `item_message_me`, `item_message_other`, `item_historial_reserva`.
- **Esqueletos (Shimmer):** `skeleton_item_historial`, `skeleton_stat_item`, `skeleton_inicio_card`.
- **Diálogos:** `dialog_calificar_viaje`, `dialog_delete_account`, `dialog_privacy_policy`, `dialog_select_route`.

### D. Colores Maestro (`res/values/colors.xml`)
- **Primario:** `primary_500` (#FF7A1A - Naranja).
- **Secundario/Fondo:** `secondary_900` (#061426 - Navy Profundo).
- **Éxito:** `success_500` (#10B981 - Emerald Premium).
- **Superficie:** `secondary_800` (#061929 - Navy Card).

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*
