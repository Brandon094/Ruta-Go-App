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
- **Nomenclatura Técnica**: Se utiliza el inglés para nombres de variables, funciones, paquetes y carpetas del proyecto. Los adaptadores deben seguir el estándar `NombreAdapter` y ubicarse en `app.adapters.[modulo]`.
- **Organización de Recursos**: 100% de los textos en `strings.xml`. Prohibido el uso de "hardcoded strings" en layouts o clases Java.

### B. Gestión de Datos Reactiva (Firebase)
- **Escucha Global:** Uso estricto de `ValueEventListener` (`addValueEventListener`) en ViewModels para perfiles, estadísticas e itinerarios. Prohibido `addListenerForSingleValueEvent` en pantallas críticas para garantizar reactividad inmediata.
- **Segregación Total de Roles:** 
  - Pasajeros residen en `/usuarios/`.
  - Conductores residen en `/conductores/` y `/vehiculos/`.
  - El Login debe detectar el rol mediante búsqueda secuencial inteligente sin duplicidad de datos.
- **Atomicidad Operativa:** Uso de `updateChildren` para registros multi-nodo.
- **Motores Especializados:** Lógica compleja desacoplada en el paquete `com.chopcode.rutago.app.engines`. Ejemplo: **Seat Engine** y **Reservation Engine**.
- **Jerarquía de Managers**: Los auxiliares se dividen por su naturaleza técnica:
  - **Core**: Lógica de sistema desacoplada de la vista (`managers/core/`).
  - **UI**: Controladores de flujo y ayuda visual (`managers/ui/`).

### C. UI/UX & Animaciones Premium
- **Responsividad (8% Rule):** Uso obligatorio de `Guideline` porcentuales (8% inicio / 92% fin) en todos los formularios para garantizar aire visual.
- **Layouts Limpios:** Uso de `Barrier` para evitar superposiciones dinámicas entre contenidos variables y pies de página.
- **Feedback Proactivo:**
  - **Jornada Completada:** Tarjeta visual automática cuando todos los horarios de una ruta han pasado.
  - **Misión Cumplida:** Feedback especializado para conductores tras finalizar su itinerario.
- **Tutorial Hub:** Uso estricto de `TutorialManager` para lanzar guías interactivas. Prohibido incluir lógica de tutoriales (inflado de diálogos o delays) dentro de las Activities.
- **Micro-interacciones:**
  - `playCardEntryAnimation`: Efecto de deslizamiento hacia arriba para todas las tarjetas al cargar.
  - `startLogoTiltAnimation`: Balanceo de 15 grados en logos para sensación de vida.
  - `animateNumericText`: Conteo progresivo para estadísticas financieras y de ocupación.

## 5. Módulos Críticos Implementados

### A. Registro Autónomo de Conductores
Proceso Step-by-Step que automatiza:
1. Creación de cuenta en Firebase Auth.
2. Alta técnica de vehículo por placa con capacidad dinámica.
3. **Sincronización de Agenda:** Selección de turnos con validación de disponibilidad en tiempo real.
4. **Reseteo de Asientos:** El sistema ajusta automáticamente la disponibilidad basándose en el bus registrado.

### B. Onboarding Interactivo
- **Dualidad:** Tutoriales específicos para Pasajeros y Conductores gestionados mediante un Hub centralizado.
- **Activación:** Disparada automáticamente en el primer acceso a pantallas clave (Home, Seats, Profile, History).

### C. Sistema de Turnos Inteligente
- **Sanity Check:** El sistema detecta y filtra automáticamente "Conductores Fantasmas" en la planilla de horarios.
- **Visibilidad:** Etiquetado dinámico de horarios como "(Libre)" u "(Ocupado)" durante el registro.

## 6. Seguridad y Reglas de Negocio (Firebase Rules)
- **Horarios:** Escritura restringida al campo `conductorId` solo si el turno está vacío.
- **Vehículos:** El campo `driverId` es obligatorio y debe coincidir con el `auth.uid`.
- **Privacidad:** Los nodos `/estadisticas/` e `/ingresos_conductores/` tienen acceso restringido al dueño del UID.

## 7. Estado Actual (v1.2.3 Stable - Gold Master)
- **Estabilidad:** 100% de los flujos de carga infinita (Shimmer) resueltos mediante reactividad y manejo de nulos.
- **Integridad:** Sincronización atómica entre el registro del conductor y la visibilidad para el pasajero.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*
