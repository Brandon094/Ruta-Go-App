# 📖 Enciclopedia Técnica Integral - Ecosistema "Go" v1.9.9.5 Ecosystem

Bienvenido al centro de conocimiento oficial de **ChopCode Solutions**. Este documento sirve como punto de entrada de alto nivel para comprender el **Ecosistema "Go"**, una suite tecnológica unificada diseñada para revolucionar la movilidad y la productividad rural en la región de **Nátaga** y **La Plata**.

---

## 🏗️ 1. Visión y Propósito Estratégico
El Ecosistema "Go" es una solución de **Logística y Gestión Transaccional Reactiva**. Su objetivo es integrar tres pilares fundamentales bajo una sola identidad digital:
1.  **RutaGo**: Movilidad intermunicipal y reserva de pasajes.
2.  **AgroGo**: ERP para la administración de fincas cafeteras y ganaderas.
3.  **CargoGo**: Plataforma de logística y subastas de fletes pesados.

---

## 👥 2. Modelo de Actores y Permisos (RBAC)
El sistema utiliza un modelo de **Identidad Única (SSO)** basado en Firebase Auth, permitiendo que un solo `UID` acceda a toda la suite según su nivel de privilegio:

*   **Pasajero / Productor**: El usuario final que reserva viajes en RutaGo y gestiona puntos de fidelidad.
*   **Conductor (Operador)**: Gestiona su planilla digital, pasajeros y reporta ingresos diarios.
*   **Socio (Dueño de Flota)**: Acceso al **Go Business Dashboard** para monitorear sus vehículos y rentabilidad de forma aislada.
*   **Administrador Root (ChopCode)**: Control total del Holding, gobernanza de datos y supervisión de la operación global.

---

## 🛠️ 3. Ecosistema de Documentación Modular

### 🏛️ Núcleo del Holding (Core & Shared)
Documentación aplicable a todas las plataformas del ecosistema.
*   [**Master Plan Ecosistema**](./core/product/ECOSYSTEM_MASTER_PLAN.md): Visión estratégica.
*   [**Identidad Visual (Branding)**](./core/product/BRANDING.md): Guía de estilo unificada.
*   [**Reglas de Seguridad NoSQL**](./core/technical/FIREBASE_SECURITY_RULES.md): Blindaje de base de datos.
*   [**Diccionario de Datos**](./core/technical/DICCIONARIO_DATOS.md): Estructura de la RTDB.
*   [**Flujos Lógicos**](./core/technical/LOGICAL_FLOWS.md): Procesos de reserva y rotación.
*   [**Manual de Gestión de Datos**](./core/legal/DATA_MANAGEMENT_MANUAL.md): Habeas Data y borrado.

### 📱 Android Nativo (Mobile)
Especificaciones exclusivas de la App desarrollada en Java/Kotlin.
*   [**Arquitectura de Módulos**](./mobile/ARCHITECTURE_MODULES.md): Clean Architecture.
*   [**Guía de Modelos**](./mobile/MODELS_DEEP_DIVE.md): Estructura de POJOs.
*   [**Capa de Servicios**](./mobile/SERVICES_DEEP_DIVE.md): Interacción con APIs y DB.
*   [**Capa UI & ViewModels**](./mobile/VIEWMODELS_DEEP_DIVE.md): Lógica de presentación.
*   [**Integración Push (FCM)**](./mobile/FCM_INTEGRATION_GUIDE.md): Notificaciones nativas.
*   [**Arquitectura de Dueños**](./mobile/OWNER_ARCHITECTURE.md): Gestión de flota móvil.

### 🖥️ Portal Web (React/Vite)
Arquitectura del portal de gestión y landing page.
*   [**Arquitectura Web (Atomic)**](./web/WEB_PORTAL_ARCHITECTURE.md): Componentes y Singletons.
*   [**Hub de Control Web**](./web/GO_WEB_HUB.md): Manual operativo del portal.
*   [**Despliegue y Hosting**](./web/DEPLOYMENT.md): Guía de producción en Firebase.

### ⚙️ Operaciones y Gestión
*   [**Historial de Cambios (Changelog)**](./core/operations/CHANGELOG.md): Registro de versiones.
*   [**Agente Orquestador**](./core/agents/ORCHESTRATOR.md): Gobernanza de la sesión.

---
**© 2026 Chop Code Solutions - Ingeniería para la Productividad Rural**
**Lead Architect: Brandon Daza Cerquera**
