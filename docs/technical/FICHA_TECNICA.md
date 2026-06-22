# 📄 Ficha Técnica Oficial - Ecosistema "Go" v1.2.3 Stable

Este documento constituye la especificación técnica formal de la suite tecnológica de **ChopCode Solutions**, detallando las capacidades y estándares de infraestructura.

---

## 🏗️ 1. Identificación de la Suite
*   **Nombre Comercial:** Ecosistema "Go".
*   **Plataformas Incluidas:** RutaGo (Android), AgroGo (Multiplataforma), CargoGo (Web).
*   **Fabricante:** ChopCode Solutions.
*   **Titular:** Brandon Daza Cerquera.

---

## 💻 2. Stack de Desarrollo por Módulo

### 2.1 RutaGo (Movilidad)
*   **Lenguaje:** Java 17.
*   **Framework:** Android SDK (Nativo).
*   **Arquitectura:** MVVM Reactivo.

### 2.2 AgroGo (Gestión Agro)
*   **Lenguaje:** Dart.
*   **Framework:** Flutter (Mobile).
*   **Base de Datos Local:** Isar Database (Offline-first).

### 2.3 CargoGo & Web Hub (Logística)
*   **Lenguaje:** HTML5/CSS3/JavaScript (Vue.js o React).
*   **Hosting:** Firebase Hosting (Infraestructura de Google Cloud).

---

## 🛰️ 3. Infraestructura Cloud Unificada
*   **Autenticación:** Firebase Auth con Identidad Única (SSO).
*   **Bases de Datos:**
    *   `Realtime Database`: Baja latencia para RutaGo.
    *   `Cloud Firestore`: Persistencia estructurada para AgroGo y CargoGo.
*   **Backend Serverless:** Firebase Cloud Functions para automatización de procesos (Reset de horarios, subastas, limpiezas).
*   **Almacenamiento:** Firebase Storage para perfiles y documentos.

---

## 🛠️ 4. Capacidades del Ecosistema
1.  **Sincronización Híbrida**: Gestión de datos reactivos y estructurados.
2.  **Operación Offline Rural**: AgroGo garantiza funcionamiento sin internet en el campo.
3.  **Subasta Logística**: CargoGo permite optimizar fletes mediante pujas ciegas.
4.  **Loyalty Hub**: Sistema de puntos unificado para incentivar el uso de la suite.

---

## 🔑 5. Gestión de APIs y Servicios Cloud
La plataforma utiliza llaves restringidas vinculadas al SHA-1 de producción para:
*   **Google Maps Platform**: Mapas y cálculo de rutas.
*   **FCM V1**: Notificaciones push inteligentes.
*   **Generative Language API**: Preparado para IA en soporte al cliente.

---
**© 2026 Chop Code Solutions - Ingeniería para la Productividad Rural.**
