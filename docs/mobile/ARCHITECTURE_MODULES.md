# 🗺️ Arquitectura de Sistemas y Módulos Core - Ecosistema Go v1.5.0

Este documento detalla la arquitectura de ingeniería de Ruta-Go, diseñada bajo un paradigma **Reactivo, Transaccional y Multicapa**, optimizado para el ecosistema móvil y web.

---

## 🏛️ 1. Macro-Arquitectura Híbrida Cloud
El sistema opera sobre un núcleo de Firebase, distribuyendo la carga según la vertical tecnológica:

### 1.1 Stack por Entorno:
*   **Android App (Móvil)**: Java 17 + Material 3 + RTDB. Enfoque nativo para máxima fluidez en ruta.
*   **Web Portal (Business)**: React 18 + Vite + Tailwind CSS. Arquitectura SPA para gestión administrativa y Dashboards de socios.
*   **Backend Serverless**: Node.js 22 (Cloud Functions) + Firebase Hosting.

### 1.2 Motores de Persistencia:
*   **Realtime Database (RTDB)**: Latencia ultra-baja necesaria para asientos, chat y telemetría de flota en vivo.
*   **Cloud Firestore**: Motor para Agro-Go y Cargo-Go (datos estructurados y subastas).
*   **FCM v1**: Sistema de mensajería push con soporte para identidades dinámicas.

---

## 🏗️ 2. Arquitectura del Portal Web (React)
El portal implementa un flujo de datos unidireccional y reactivo:
1.  **Capa de Autenticación**: Validación de roles (Admin/Owner) contra nodos maestros de RTDB.
2.  **Hook de Estado Realtime**: `useRealtimeStats` centraliza los listeners y realiza el filtrado de datos por propiedad (`ownerId`).
3.  **Capa de Servicios**: Suite de lógica de negocio modularizada:
    *   `driverService.js`: Vinculación usuario-conductor y automatización de capacidad.
    *   `vehicleService.js`: Gestión independiente de activos de flota.
    *   `reservationService.js`: Transacciones de reserva, confirmaciones y liberación de cupos.
    *   `pricingService.js`: Control dinámico de tarifas por ruta para administradores.

---

## 🎫 3. Motores de Negocio Desacoplados
Ruta-Go separa las "reglas de oro" de la infraestructura técnica:

*   **Aislamiento Comercial (Multi-inquilino)**: El sistema garantiza que un Socio solo visualice la información financiera y operativa de sus activos vinculados, manteniendo la privacidad competitiva.
*   **Integridad Atómica**: Uso de `runTransaction()` para evitar sobreventa de cupos tanto en Android como en Web.
*   **Comunicación C2C**: Flujo de notificaciones basado en FCM v1 y OAuth2, permitiendo interacción directa entre pasajero y operador.

---

## 🔐 4. Sistema de Identidad Única (SSO)
El ecosistema utiliza **Firebase Auth** como proveedor de identidad universal:
*   Un solo `UID` permite al usuario transitar entre la App (Pasajero/Chofer) y el Portal Web (Dueño/Admin).
*   **RBAC Dinámico**: El sistema resuelve el rango del usuario en tiempo real consultando los nodos `/admins` y `/dueños`.

---

## 📱 5. Optimizaciones Android 15 (SDK 35)
*   **Edge-to-Edge Native**: Soporte integral para pantallas de borde a borde.
*   **16 KB Page Alignment**: Compatibilidad con hardware de próxima generación.
*   **Privacy First**: Implementación del flujo de "Derecho al Olvido" sincronizado entre App y Web.

---
**Chop Code Solutions - Arquitectura de Software 2026**
*Engineering for Rural Productivity.*
