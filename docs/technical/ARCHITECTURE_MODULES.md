# 🗺️ Arquitectura Técnica Detallada - Ecosistema "Go"

Este documento proporciona una visión profunda de la ingeniería detrás del ecosistema unificado de **ChopCode Solutions**, diseñada bajo el paradigma de **Microservicios Cloud** integrados por una identidad única.

---

## 🏗️ 1. Arquitectura de Datos Híbrida
El ecosistema utiliza dos motores de base de datos de Firebase para optimizar el rendimiento según el caso de uso:

### 1.1 Realtime Database (RTDB) - Motor de RutaGo
*   **Propósito**: Gestión de asientos, turnos y disponibilidad en milisegundos.
*   **Justificación**: La baja latencia es crítica para evitar conflictos de reserva en tiempo real.
*   **Patrón**: Árbol NoSQL sincronizado mediante WebSockets.

### 1.2 Cloud Firestore - Motor de AgroGo y CargoGo
*   **Propósito**: Almacenamiento de registros complejos (lotes, animales, subastas).
*   **Justificación**: Soporta consultas estructuradas, indexación automática y escalado masivo para datos históricos.
*   **Patrón**: Modelo basado en colecciones y documentos.

---

## 🔐 2. Motor de Identidad Unificada (SSO)
Implementamos el sistema **Single Sign-On (SSO)** a través de Firebase Auth:
*   **Pasaporte Universal**: El `UID` del usuario es el identificador primario en todas las plataformas.
*   **Segregación de Roles**: Un sistema centralizado de claims define si el usuario es Pasajero, Productor o Conductor, habilitando funciones específicas en cada App.

---

## 🚌 3. RutaGo Architecture (MVVM Reactivo)
La aplicación Android nativa sigue el patrón **Model-View-ViewModel**:
*   **View**: Activities y Fragments observando estados reactivos.
*   **ViewModel**: Lógica de pantalla desacoplada de la UI.
*   **Engines (Seats/Reservations)**: Motores de negocio puros que ejecutan validaciones atómicas.

---

## 🌿 4. AgroGo Architecture (Offline-First)
Diseñada para entornos rurales sin señal:
*   **Motor Local (Isar)**: Base de datos embebida de alto rendimiento.
*   **Sync Logic**: El app opera 100% offline; al detectar conexión, el motor de sincronización empuja los cambios a Firestore.

---

## 🚛 5. CargoGo & Web Hub (Cloud Interface)
*   **Backend**: Firebase Hosting + Cloud Functions.
*   **Logic**: El sistema de subastas ciegas procesa las ofertas de los transportadores en el servidor para garantizar transparencia y evitar la manipulación de precios.

---

## 📊 6. Flujo de Integración (Cross-App)
1.  **Activación**: Productor registra cosecha en **AgroGo**.
2.  **Necesidad**: El sistema detecta excedente y sugiere transporte.
3.  **Solicitud**: Se crea un pedido de flete en **CargoGo**.
4.  **Movilidad**: El productor usa un *Deep Link* para reservar su propio pasaje al pueblo en **RutaGo** mediante su misma cuenta.

---
**Documentación de Ingeniería - ChopCode Solutions - QA Senior Certified**
