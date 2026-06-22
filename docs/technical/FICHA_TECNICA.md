# 📄 Ficha Técnica Oficial - Ruta-Go v1.2.3 Stable

Este documento constituye la especificación técnica formal de la plataforma Ruta-Go, detallando las capacidades, infraestructura y estándares de calidad del ecosistema.

---

## 🏗️ 1. Identificación del Producto
*   **Nombre del Software:** Ruta-Go (Transporte Natagá - La Plata).
*   **Versión Actual:** v1.2.3 Stable (Gold Master).
*   **Fabricante:** Chop Code Solutions.
*   **Desarrollador Lead:** Brandon Daza Cerquera.
*   **Tipo de Solución:** Plataforma Móvil para Gestión de Transporte Intermunicipal.

---

## 💻 2. Especificaciones de Software (Frontend)
*   **Lenguaje de Programación:** Java 17 (OpenJDK).
*   **Arquitectura de Software:** Model-View-ViewModel (MVVM) con Motores Desacoplados.
*   **Sistema Operativo Objetivo:** Android (mínimo v7.0 Nougat - API 24).
*   **SDK Objetivo:** Android 15 (API 35).
*   **Framework de UI:** XML View System con Material Components 3.
*   **Librerías Críticas:**
    *   `Glide`: Gestión inteligente de caché y carga de imágenes.
    *   `Shimmer`: Animaciones de carga de baja latencia.
    *   `Multidex`: Soporte para bases de código extensas.
    *   `Firebase BoM`: Sincronización de versiones de servicios cloud.

---

## 🛰️ 3. Infraestructura Cloud (Backend)
*   **Proveedor de Servicios:** Firebase (Google Cloud Platform).
*   **Base de Datos:** Realtime Database (NoSQL de baja latencia).
*   **Autenticación:** Firebase Auth (Email/Google One Tap).
*   **Lógica de Servidor:** Cloud Functions (Node.js) para reset global de las 7:00 PM y limpieza mensual de cuentas.
*   **Almacenamiento:** Firebase Storage (Recursos multimedia y perfiles).
*   **Notificaciones:** Firebase Cloud Messaging (FCM v1) con soporte para Deep Linking.
*   **Monitoreo:** Firebase Crashlytics y Google Analytics for Firebase.

---

## 🛠️ 4. Capacidades Funcionales
1.  **Segregación de Roles:** División física y lógica de datos entre Conductores y Pasajeros.
2.  **Registro Autónomo:** Proceso step-by-step para alta de vehículos y conductores sin intervención central.
3.  **Gestión de Inventario (Asientos):** Motor de asignación atómica con bloqueo manual para ventas físicas.
4.  **Sincronización Reactiva:** Actualización de interfaces en tiempo real mediante listeners persistentes.
5.  **Tutorial Hub:** Sistema de capacitación interactiva contextual integrado en la UI.
6.  **Derecho al Olvido:** Proceso de borrado de cuenta con 30 días de gracia y rescate automático en login.

---

## 🔒 5. Seguridad y Rendimiento
*   **Ofuscación:** Blindaje de código mediante R8/ProGuard.
*   **Integridad:** Reglas de seguridad de Firebase que restringen la escritura por UID y Rol.
*   **Optimización:** Símbolos de depuración nativos incluidos para análisis proactivo de ANRs.
*   **Modo Desconectado:** Soporte básico de persistencia local para consulta de itinerarios sin red.

---

## 📊 6. Requisitos de Instalación (Usuario Final)
*   **Espacio en Disco:** ~35 MB (Instalación base).
*   **Memoria RAM:** Mínimo 2 GB.
*   **Conectividad:** Requerida para sincronización de datos y reservas.

---

## 🔑 7. Gestión de APIs y Servicios Cloud
La plataforma utiliza el ecosistema de Google Cloud Platform (GCP) mediante llaves de API restringidas para los siguientes servicios críticos:

### 7.1 Autenticación e Identidad
*   **Identity Toolkit API**: Motor principal de autenticación y gestión de usuarios.
*   **Token Service API**: Emisión y validación de tokens de sesión y seguridad.
*   **Firebase Installations API**: Identificación única de instancias de la aplicación.

### 7.2 Almacenamiento y Datos
*   **Firebase Realtime Database API**: Lectura y escritura transaccional de itinerarios y reservas.
*   **Cloud Storage for Firebase API**: Gestión de recursos multimedia y fotos de perfil.

### 7.3 Mensajería y Notificaciones
*   **Firebase Cloud Messaging API**: Envío de alertas contextuales.
*   **FCM Registration API**: Registro y mantenimiento de tokens de dispositivos.

### 7.4 Monitoreo y Analíticas
*   **Google Analytics Hub API**: Seguimiento del embudo de conversión y comportamiento del usuario.
*   **Mobile Crash Reporting API**: Reporte y diagnóstico de fallos en tiempo real (Crashlytics).

---
**© 2026 Chop Code Solutions - Todos los derechos reservados.**
**Natagá - La Plata, Huila.**
