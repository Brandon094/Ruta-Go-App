# 🤖 Agente de Desarrollo Ruta-Go - Manual de Instrucciones

Este documento define los estándares técnicos, arquitectónicos y de proceso para el desarrollo de la aplicación **Ruta-Go (Transporte Natagá - La Plata)** por parte de **Chop Code Solutions**. Cualquier agente de IA o desarrollador debe seguir estas directrices estrictamente.

## 1. Identidad y Propósito
Ofrecer una plataforma de transporte intermunicipal ágil, reactiva y confiable, conectando a los habitantes de Natagá y La Plata con conductores profesionales mediante una gestión de turnos transparente y en tiempo real.

## 2. Parámetros de Marca (Branding)
- **Marca Desarrolladora:** Chop Code Solutions.
- **Nombre de la App:** Ruta-Go.
- **Identidad Visual:**
  - `logo_splash`: Isotipo animado exclusivo para el inicio.
  - `logo_icon`: Imagotipo circular oficial (Icono y Notificaciones).
  - `logo_main`: Versión horizontal para Toolbars y UIs internas.
  - **Colores Oficiales:** Primario (`primary_500` - Naranja #FF9800), Secundario (`secondary_900` - Navy #1A237E).

## 3. Stack Tecnológico Obligatorio
- **Lenguaje:** Java 17 (Toolchain).
- **Gradle:** Versión 8.11 (Entorno Linux/Parrot estable).
- **UI:** XML View System con Material Components 3.
- **Backend:** Firebase (Auth, Realtime DB, Storage, FCM, Analytics, Crashlytics).
- **Arquitectura:** **MVVM (Model-View-ViewModel)** 100% reactiva.
- **Multi-tema:** Soporte nativo DayNight (Claro/Oscuro).

## 4. Reglas de Oro del Código

### A. Clean Architecture & Centralización
- **FormatUtils:** Prohibido el formateo manual de strings en Adapters o Activities. Usar siempre `com.chopcode.rutago.app.utils.ui.FormatUtils` para:
  - **Precios:** Abreviación inteligente (>=100K: K, >=1M: M) + sufijo "COP".
  - **Horas:** Normalización bilingüe (Spanish en DB -> 12h legible en UI).
  - **Fechas:** Formateo largo descriptivo.
  - **Normalización:** Método `normalizarTexto` para comparaciones lógicas (anti-tildes).
- **Recursos:** 100% de los textos en `strings.xml`. Prohibido el uso de "hardcoded strings" en layouts o clases Java.

### B. Gestión de Datos Reactiva (Firebase)
- **Escucha Global:** Uso estricto de `ValueEventListener` (`addValueEventListener`) en ViewModels para dashboards e itinerarios. Prohibido `addListenerForSingleValueEvent` en pantallas críticas.
- **Segregación Total de Roles:** 
  - Pasajeros residen en `/usuarios/`.
  - Conductores residen en `/conductores/` y `/vehiculos/`.
  - El Login debe detectar el rol mediante búsqueda secuencial inteligente sin duplicidad de datos.
- **Atomicidad Operativa:** Uso de `updateChildren` para registros multi-nodo para garantizar que el conductor, su vehículo y su agenda inicial se creen como una sola transacción lógica.

### C. UI/UX & Animaciones Premium
- **Responsividad (8% Rule):** Uso obligatorio de `Guideline` porcentuales (8% inicio / 92% fin) en todos los formularios para garantizar aire visual en cualquier densidad de pantalla.
- **Layouts Limpios:** Uso de `Barrier` para evitar superposiciones dinámicas entre contenidos variables y footers/actualizaciones.
- **Feedback Proactivo:**
  - **Jornada Completada:** Tarjeta visual automática cuando todos los horarios de una ruta han pasado.
  - **Misión Cumplida:** Feedback especializado para conductores tras finalizar su itinerario.
- **Micro-interacciones:**
  - `playCardEntryAnimation`: Efecto de deslizamiento hacia arriba para todas las tarjetas al cargar.
  - `startLogoTiltAnimation`: Balanceo de 15 grados en logos para sensación de vida.
  - `animateNumericText`: Conteo progresivo para estadísticas financieras y de ocupación.

## 5. Módulos Críticos Implementados

### A. Registro Autónomo de Conductores
Proceso Step-by-Step que automatiza:
1. Creación de cuenta en Firebase Auth.
2. Alta técnica de vehículo por placa con capacidad dinámica.
3. **Autogestión de Horarios:** Selección de turnos de ida/vuelta con validación de disponibilidad en tiempo real.
4. **Sincronización de Asientos:** El sistema ajusta automáticamente `totalAsientos` y `asientosDisponibles` basándose en la ficha técnica del bus registrado.

### B. Onboarding Dual
- **Pasajero:** Enfoque en reserva ágil y seguridad.
- **Conductor:** Enfoque operativo (Gestión de asientos, bloqueos manuales/ventas físicas y finanzas).
- Activación única controlada por `SessionManager` post-instalación (Pasajero) y post-login (Conductor).

### C. Sistema de Turnos Inteligente
- **Sanity Check:** El sistema detecta y filtra automáticamente "Conductores Fantasmas" (IDs huérfanos de pruebas previas) en la lista de horarios, marcándolos como "(Libre)".
- **Resiliencia:** Si el nodo de disponibilidad no existe, el app lo crea bajo demanda basándose en la capacidad del bus asignado.

## 6. Seguridad y Reglas de Negocio (Firebase Rules)
- **Horarios:** Escritura restringida al campo `conductorId` solo si el turno está vacío o pertenece al usuario autenticado.
- **Vehículos:** El campo `driverId` es obligatorio y debe coincidir con el `auth.uid` del creador.
- **Disponibilidad:** Solo el conductor asignado en el nodo de horarios puede modificar la capacidad total del bus.
- **Sensibilidad:** Los nodos `/estadisticas/` y `/ingresos_conductores/` tienen privacidad total restringida al dueño del UID.

## 7. Estado Actual (v1.2.1 Stable - Gold Master)
- **Estabilidad:** 100% de los flujos de carga infinita (Shimmer) resueltos mediante manejo de nulos y cache de ViewModels.
- **Consistencia:** Unificación del idioma técnico (status/active para perfiles, estado/activo para hardware).
- **Integridad:** Sincronización atómica entre el registro del conductor y la visibilidad para el pasajero.

## 8. Siguientes Pasos
- **Hito 1:** Implementación de pasarela de pagos integrados.
- **Hito 2:** Panel de analíticas avanzado para la Central de Administradores.
- **Hito 3:** Refinamiento de accesibilidad para visión bajo luz solar intensa.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*
