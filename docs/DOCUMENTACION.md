# 📖 Enciclopedia Técnica Integral - Ecosistema "Go" v1.9.8 Ecosystem

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

## 📦 3. Desglose de Motores y Módulos Core

| Módulo | Responsabilidad Técnica | Aplicación |
|:---|:---|:---|
| **Auth Engine (SSO)** | Gestión de identidad unificada y segregación de roles (RBAC). | Suite Go |
| **Seat Engine** | Gestión transaccional de inventario móvil y reservas atómicas. | RutaGo |
| **Loyalty Engine** | Sistema de gamificación (Puntos Go) y niveles de estatus. | RutaGo |
| **Ruta-Go Portal** | Landing Page comercial, Business Dashboard y Motor de Reservas Web con soporte de Tema Dual (React/Firebase). | Suite Go |
| **Offline Sync Engine** | Sincronización local-nube vía Isar/Firestore. | AgroGo |
| **Auction Engine** | Motor de subastas ciegas para logística pesada. | CargoGo |

---

## 🛠️ 4. Ecosistema de Documentación (Nivel Senior)

### 📗 Dominio Técnico (Engineering)
*   [**Arquitectura Web Portal**](./technical/WEB_PORTAL_ARCHITECTURE.md): Diseño del stack React, roles y despliegue cloud.
*   [**Arquitectura Detallada**](./technical/ARCHITECTURE_MODULES.md): Estructura híbrida RTDB/Firestore y flujos cloud.
*   [**Mapeo de Flujos Lógicos**](./technical/LOGICAL_FLOWS.md): Secuencias técnicas de reservas y rotación.
*   [**Inmersión en Modelos**](./technical/MODELS_DEEP_DIVE.md): Jerarquía de clases POJO y mapeo de datos.
*   [**Guías de Desarrollo**](./technical/DEVELOPER_GUIDELINES.md): Estándares de código, Git semántico y Clean Code.
*   [**Reglas de Seguridad**](./technical/FIREBASE_SECURITY_RULES.md): Gobernanza de datos NoSQL y blindaje por roles.

### 📘 Dominio de Producto (Business)
*   [**Master Plan Ecosistema**](./product/ECOSYSTEM_MASTER_PLAN.md): Visión estratégica de ChopCode Solutions.
*   [**Identidad Visual**](./product/BRANDING.md): Guía de estilo, colores Naranja/Navy y logotipos.
*   [**Hoja de Ruta (Roadmap)**](./product/ROADMAP.md): Fases de expansión, monetización y SaaS.
*   [**Plan de Marketing**](./product/MARKETING_PLAN.md): Estrategia de crecimiento, Puntos Go y Estatus Estrella.
*   [**Manual de Usuario**](./product/USER_MANUAL.md): Guía práctica para pasajeros y conductores.

### ⚖️ Legal y Cumplimiento
*   [**Manual de Gestión de Datos**](./legal/DATA_MANAGEMENT_MANUAL.md): Protocolos de borrado y Habeas Data.
*   [**Políticas de Privacidad**](../web_portal/src/Privacy.jsx): Tratamiento de datos bajo la Ley 1581.
*   [**Términos y Condiciones**](../web_portal/src/Terms.jsx): Reglas de operación de la plataforma.

---

## 🛡️ 5. Seguridad y Gobernanza de Datos
*   **Aislamiento Comercial**: Los dueños solo acceden a la telemetría de sus activos asignados.
*   **Hosting**: Despliegue seguro en **Firebase Hosting** con certificación SSL automática.
*   **Privacidad**: Cumplimiento estricto con **Habeas Data** y flujo de "Derecho al Olvido".

---
**© 2026 Chop Code Solutions - Ingeniería para la Productividad Rural**
**Lead Architect: Brandon Daza Cerquera**
