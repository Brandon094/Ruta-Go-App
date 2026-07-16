# 🗺️ Arquitectura de Sistemas y Módulos Core - Ecosistema Go v1.3.0

Este documento detalla la arquitectura de ingeniería de Ruta-Go, diseñada bajo un paradigma **Reactivo, Transaccional y Multicapa**, optimizado para Android 15 y el escalado hacia la Fase Premium.

---

## 🏛️ 1. Macro-Arquitectura Híbrida Cloud
El sistema opera sobre un núcleo de Firebase, distribuyendo la carga según la naturaleza de los datos y el stack tecnológico de cada vertical:

### 1.1 Stack por Aplicación:
*   **Ruta-Go (Movilidad)**: Java 17 + XML (Material 3) + Firebase Realtime Database. Enfoque nativo para máxima fluidez y reactividad en tiempo real.
*   **Agro-Go (Productividad)**: Flutter + Isar Database (Offline-First) + Cloud Firestore. Diseñada para operar sin señal en el campo.
*   **Cargo-Go (Logística)**: Portal Web Hub (Stack en definición) + Firebase Hosting. Centralizador de servicios y subastas.

### 1.2 Motores de Persistencia:
*   **Realtime Database (RTDB)**: Motor para **Ruta-Go**. Latencia ultra-baja necesaria para asientos y chat.
*   **Cloud Firestore**: Motor para **Agro-Go y Cargo-Go**. Optimizado para consultas complejas de lotes e inventarios.
*   **Cloud Functions**: Capa de lógica Serverless (Node.js) que orquesta procesos masivos como la rotación nocturna y limpieza legal.
*   **FCM v1**: Sistema de mensajería push bidireccional (C2C y S2C) con soporte para OAuth2.

---

## 🏗️ 2. Arquitectura de la Aplicación (Ruta-Go)
Implementamos una variante avanzada del patrón **MVVM (Model-View-ViewModel)**, introduciendo capas de especialización para desacoplar la lógica de Firebase del ciclo de vida de Android.

### 2.1 Capas del Sistema:
1.  **View Layer (UI)**: Activities y Fragments. Observan estados a través de `LiveData`. No contienen lógica de negocio.
2.  **ViewModel Layer**: Gestionan el estado de la vista y orquestan las llamadas a servicios. Son el puente reactivo.
3.  **Manager Layer (Specialists)**:
    *   **Core Managers**: Lógica de sistema (Auth, Permissions, Session).
    *   **UI Managers**: Lógica visual compleja (Animations, Dialogs, Expandable Sections).
4.  **Engine Layer (Domain Logic)**: Componentes POJO puros que encapsulan algoritmos críticos:
    *   **Seat Engine**: Integridad transaccional de inventario.
    *   **Reservation Engine**: Validación y transporte de datos.
5.  **Service Layer (Data/Repository)**: Fachadas que interactúan directamente con Firebase. Realizan el mapeo dual (Español DB -> Inglés Java).
6.  **Model Layer (Data Entities)**: POJOs que representan el dominio del negocio.

---

## 🎫 3. Motores de Negocio Desacoplados
Ruta-Go separa las "reglas de oro" de la infraestructura técnica:

*   **Integridad Atómica**: El uso de `runTransaction()` en la capa de servicios asegura la consistencia de inventario. En el servidor (Cloud Functions), implementamos lógica basada en `Sets` de asignación para garantizar que los procesos masivos de rotación no generen colisiones ni pérdida de identificadores.
*   **Validación de Salto**: El `ReservationDataProcessor` actúa como un guardián de calidad, verificando la consistencia de los datos antes de permitir la navegación hacia la pasarela de confirmación.
*   **Comunicación C2C (Client-to-Client)**: El sistema implementa un flujo de notificaciones proactivas basado en FCM v1 y OAuth2, permitiendo que las aplicaciones se comuniquen entre sí (ej: Pasajero -> Conductor) sin depender de un trigger en el servidor, optimizando la respuesta.

---

## 🔐 4. Sistema de Identidad Única (SSO)
El ecosistema utiliza **Firebase Auth** como proveedor de identidad universal:
*   Un solo `UID` permite al usuario transitar entre Ruta-Go, AgroGo y CargoGo.
*   La resolución de roles ocurre en el arranque (`SplashActivity`), determinando dinámicamente el perfil operativo (Pasajero vs Conductor).

---

## 📱 5. Optimizaciones Android 15 (SDK 35)
La arquitectura está alineada con los estándares modernos de Google:
*   **Edge-to-Edge Native**: Vistas que ocupan el 100% de la superficie de pantalla.
*   **16 KB Page Alignment**: Soporte para binarios en procesadores de próxima generación.
*   **Predictive Back**: Gestión de navegación compatible con gestos predictivos de Android.
*   **Privacy First**: AD_ID desactivado y permisos de notificación (API 33+) gestionados proactivamente.
*   **Release Integrity**: Blindaje mediante reglas de ProGuard específicas para OAuth2 y sincronización de firmas SHA (Debug/Play Store) para garantizar la continuidad de servicios en producción.

---

## 📊 6. Flujo de Datos Reactivo
1.  **Firebase RTDB** emite un cambio (WebSocket).
2.  **Service** intercepta y mapea el dato al modelo POJO.
3.  **ViewModel** actualiza el `MutableLiveData`.
4.  **Activity** reacciona automáticamente refrescando la UI con animaciones premium.

---
**Chop Code Solutions - Arquitectura de Software v1.3.0**
*Engineering for Rural Productivity.*
