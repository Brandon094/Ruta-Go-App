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
- **Multi-tema:** Soporte oficial para **Tema Claro** y **Tema Oscuro** (DayNight System).
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

### C. UI/UX & Animaciones Premium
- **Feedback Visual:** Implementar `ShimmerFrameLayout` durante las cargas iniciales. Una vez cargada la data, usar `UIAnimationUtils` para conteos progresivos, transiciones de tarjetas (`playCardEntryAnimation`) y micro-interacciones.
- **Carga de Imágenes:** Usar `ImageUtils` con Glide (DiskCacheStrategy.ALL y Priority.IMMEDIATE) para garantizar que las fotos de perfil sean visibles al instante al navegar.
- **Reactividad:** Los Dashboards deben reaccionar a cambios en la base de datos instantáneamente. Evitar `addListenerForSingleValueEvent` en pantallas principales.
- **Notificaciones:** Seguir el estándar Premium unificado en `NotificationService` con identidad visual oficial.
- **Responsividad (Guías):** Uso obligatorio de `Guideline` porcentuales (8% inicio / 92% fin) en `ConstraintLayout` para que la UI "respire" en cualquier dispositivo.
- **Botones Material (Standard):** Los `MaterialButton` deben tener `android:inset...="0dp"` para eliminar márgenes invisibles. Los botones tipo `Outlined` requieren `android:elevation="0dp"` y `android:stateListAnimator="@null"` para evitar artefactos visuales grises en tema claro.
- **Accesibilidad (Zoom 200%):** Prohibido usar alturas fijas (`android:layout_height`) en botones o contenedores con texto. Usar siempre `wrap_content` + `android:minHeight` (ej. 52dp) para evitar textos cortados.
- **Inmersión (Scroll Infinito):** Para efectos premium, usar `android:clipToPadding="false"` junto con un `paddingBottom` generoso (ej. 88dp) en listas.
- **Simetría Operativa (Mapa de Asientos):** Grilla de 5 columnas. Para garantizar responsividad, los asientos miden máximo **38dp** con **1.5dp** de margen y un pasillo central de **10dp**.
- **Compartición Segura:** El uso de `FileProvider` es obligatorio para compartir activos generados (como el tiquete digital).
- **Estética de Logos:** 
  - **Splash Screen:** Usa el contenedor con forma de Pin Navy (`bg_pin_navy`) de **180dp**.
  - **UIs Internas:** Los logos usan un fondo circular Navy (`secondary_900`) con un padding interno de **5dp** para maximizar la visibilidad del isotipo.
  - **Tiquete:** El logo del comprobante debe permanecer **estático** por ser un documento de comprobación.
- **Animaciones de Vanguardia:** 
  - **Splash Pro:** Efecto de crecimiento desde un punto diminuto (`scale 0.01`). Primero crece el Pin de fondo y luego el Logo con efecto `Overshoot` marcado.
  - **Logo Vivo (Tilt):** Los logos en Login, Registro y Dashboards realizan un balanceo de **15 grados** cada 5 segundos para dar sensación de vida.
  - **Next Trip Indicator:** Resaltar dinámicamente el horario más próximo a salir con un badge **"SIGUIENTE"** animado (Pulse) en color **Navy Medio (`secondary_400`)** para garantizar contraste en ambos temas.
- **Departure Animation:** Al expirar un horario ("Finalizado"), el botón de reserva cambia a un icono de bus (`ic_bus`) y realiza una animación de arranque saliendo de la pantalla hacia la derecha.
- **Soporte Multi-tema (DayNight):** 
  - Prohibido hardcodear colores (`@color/...`) para fondos y textos.
  - Uso obligatorio de **Atributos de Tema** (`?attr/...`).
  - Atributos clave: `?android:attr/colorBackground`, `?attr/colorSurface`, `?attr/colorOnSurface`, `?attr/colorSurfaceVariant`.

### D. Documentación Técnica & Analíticas
- **Código Auto-explicativo:** Variables y funciones con nombres claros en inglés.
- **Documentación de Negocio:** Toda clase crítica (ViewModels, Services) debe incluir Javadoc.
- **Analíticas Obligatorias:** Registrar eventos en Google Analytics para cada acción clave. Usar `BaseViewModel.registrarEventoAnalitico`.
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) y reportar excepciones a Firebase Crashlytics.

### E. Estándares de Recursos (Clean Resources)
- **Nomenclatura de Strings:** Usar prefijos por módulo: `[modulo]_[proposito]`.
- **Nomenclatura de Assets:** 
  - Iconos: `ic_[nombre]`. 
  - Fondos/Formas: `bg_[forma]_[proposito]`.
- **Centralización:** Prohibido el uso de strings hardcodeados en layouts XML. El 100% debe residir en `strings.xml`.

### F. Seguridad y Permisos
- **PermissionManager:** Centralización de solicitudes de permisos (Notificaciones Android 13+, Galería).
- **Sensibilidad:** Nunca persistir contraseñas en logs o analíticas.

### G. Gestión de Lanzamientos (Play Store)
- **Keystore Oficial:** El archivo `key.jks` reside exclusivamente en el entorno estabilizado.
- **Versionamiento:** Estándar `versionCode` incremental y `versionName` semántico.
- **Regla de Rotación (7:00 PM):** Los horarios que ya han pasado durante el día se deshabilitan visualmente ("Finalizado"). A las 7:00 PM (19:00), se ejecuta un reset global (Cloud Function) que habilita todos los horarios nuevamente para el día siguiente. La App (`FormatUtils.esHorarioPasado`) respeta esta ventana permitiendo reservas anticipadas a partir de las 7:00 PM.
- **Integridad del Tiempo:** La `departureTime` debe persistirse atómicamente al crear la reserva para evitar errores de zona horaria.

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits** y los mensajes deben estar en **Español**.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil, referencia a vehículo, horarios y status.
- `vehiculos/$id`: Datos técnicos y capacidad (Campo: `capacidad`).
- `precios/$origen/$destino`: Nodo de tarifas dinámicas.
- `reservas/`: Nodo plano indexado. Incluye `departureTime` y `rated`.
- `disponibilidadAsientos/$horarioId`: Control operativo sincronizado.
- `usuarios/$uid`: Perfil, roles, tokens FCM y status.

## 7. Estado Actual del Proyecto (v1.2.0 Stable - Ready for Play Store)
- **Arquitectura:** 100% MVVM y LiveData. Dashboards e historiales 100% reactivos.
- **Branding Vivo:** Implementación de animaciones de balanceo en logos y secuencia de entrada premium en Splash Screen.
- **Inteligencia de Horarios:** Sistema dinámico que identifica y resalta el "Próximo Viaje" disponible con badges animados.
- **UI Responsiva & Accesible:** Mapa de asientos optimizado (38dp) para evitar overflow. Botones Material pulidos sin artefactos visuales.
- **Estandarización Visual:** Unificación de fondos Navy Premium para todos los logos con paddings optimizados.
- **Módulo de Autenticación:** Login con Email y Google One Tap funcional con animaciones de carga.
- **Gestión de Estados:** Sistema de estados (Activo/Inactivo) con badges de pulso para conductores y pasajeros.
- **Atomicidad:** Uso de `runTransaction` para garantizar la integridad de las reservas de asientos.

## 8. Siguientes Pasos (Roadmap)
- **Hito 1:** Monitoreo de métricas en Play Console tras aprobación.
- **Hito 2:** Implementar pasarela de pagos integrados.
- **Hito 3:** Panel de analíticas avanzadas para administración.
- **Accesibilidad:** Refinar el Tema Claro para optimizar visibilidad bajo luz solar intensa.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*
