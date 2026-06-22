# 📖 Enciclopedia Técnica Integral - Ecosistema "Go" v1.2.3 Stable

Bienvenido al centro de conocimiento oficial de **ChopCode Solutions**. Este documento sirve como punto de entrada de alto nivel para comprender el **Ecosistema "Go"**, una suite tecnológica unificada diseñada para revolucionar la movilidad y la productividad rural en la región de Natagá y La Plata.

---

## 🏗️ 1. Visión y Propósito Estratégico
El Ecosistema "Go" es una solución de **Logística y Gestión Transaccional Reactiva**. Su objetivo es integrar tres pilares fundamentales bajo una sola identidad digital:
1.  **RutaGo**: Movilidad intermunicipal y reserva de pasajes.
2.  **AgroGo**: ERP para la administración de fincas cafeteras y ganaderas.
3.  **CargoGo**: Plataforma de logística y subastas de fletes pesados.

---

## 👥 2. Modelo de Actores y Permisos (RBAC)
El sistema utiliza un modelo de **Identidad Única (SSO)** basado en Firebase Auth, permitiendo que un solo `UID` acceda a toda la suite:

*   **Pasajero / Productor**: El usuario que viaja en RutaGo y administra su finca en AgroGo.
*   **Conductor (Operador Técnico)**: Gestiona su vehículo en RutaGo y participa en subastas en CargoGo.
*   **Administrador (ChopCode)**: Control central de tarifas, monitoreo de flotas y gobernanza del ecosistema.

---

## 📦 3. Desglose de Motores y Módulos Core

| Módulo | Responsabilidad Técnica | Aplicación |
|:---|:---|:---|
| **Auth Engine (SSO)** | Gestión de identidad unificada y segregación de roles. | Suite Go |
| **Seat Engine** | Gestión transaccional de inventario móvil. | RutaGo |
| **Loyalty Engine** | Gamificación (Puntos Go) y Niveles de Estatus. | RutaGo |
| **Offline Sync Engine** | Sincronización local-nube vía Isar/Firestore. | AgroGo |
| **Auction Engine** | Motor de subastas ciegas para fletes. | CargoGo |
| **Web Hub** | Portal legal, corporativo y acceso a CargoGo. | Suite Go |

---

## 🛠️ 4. Ecosistema de Documentación (Nivel Senior)

### 📗 Dominio Técnico (Engineering)
*   [**Arquitectura Detallada**](./technical/ARCHITECTURE_MODULES.md): Estructura híbrida RTDB/Firestore y flujos de datos.
*   [**Estándares de Código**](./technical/DEVELOPER_GUIDELINES.md): Reglas de oro (Java/Flutter) y Clean Code.
*   [**Diccionario de Datos**](./technical/DICCIONARIO_DATOS.md): Mapeo del esquema NoSQL unificado.
*   [**Ficha Técnica**](./technical/FICHA_TECNICA.md): Especificaciones de infraestructura y stack tecnológico.

### 📘 Dominio de Producto (Business)
*   [**Master Plan Ecosistema**](./product/ECOSYSTEM_MASTER_PLAN.md): Visión estratégica de ChopCode Solutions.
*   [**Especificación de Requisitos**](./product/REQUISITOS.md): RF, RNF y reglas de negocio de la suite.
*   [**Portal Web Hub**](./product/GO_WEB_HUB.md): Especificaciones del centro web centralizado.
*   [**Identidad Visual**](./product/BRANDING.md): Guía de estilo y branding "Go".
*   [**Hoja de Ruta (Roadmap)**](./product/ROADMAP.md): Fases de expansión y monetización.

---

## 🛡️ 5. Seguridad y Gobernanza de Datos
*   **Aislamiento**: Datos críticos de RutaGo en Realtime Database; datos complejos de AgroGo en Cloud Firestore.
*   **Hosting**: Despliegue seguro en Firebase Hosting con SSL.
*   **Privacidad**: Cumplimiento con Habeas Data (Ley 1581) para todo el ecosistema.

---
**© 2026 Chop Code Solutions - Ingeniería para la Productividad Rural**
**Desarrollador Lead: Brandon Daza Cerquera**
