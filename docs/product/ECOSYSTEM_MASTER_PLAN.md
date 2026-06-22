# 🚀 Master Plan: Ecosistema "Go" - ChopCode Solutions

Este documento define la arquitectura unificada, el modelo de negocio y la ruta de integración de la suite tecnológica diseñada para revolucionar la movilidad y la agroindustria en la región de Natagá y La Plata (Huila).

---

## 🌐 1. Visión del Ecosistema Centralizado (SSO)
El objetivo es crear una "SuperApp" rural descentralizada, conectando tres plataformas bajo un mismo motor en la nube para garantizar una experiencia de usuario sin fricciones.

*   **Identidad Única (Firebase Auth):** Un solo proyecto raíz en Firebase. El usuario crea su cuenta una vez y su `UID` le sirve como "pasaporte" para usar RutaGo, AgroGo y CargoGo sin registros adicionales.
*   **Web Hub Central (Ecosistema Go Online):** Una plataforma web unificada (go-suite.web.app) que centraliza la información legal, soporte técnico y presentación corporativa de ChopCode Solutions.
*   **Arquitectura de Datos Híbrida:**
    *   `Realtime Database`: Exclusiva para **RutaGo** (gestión de asientos y turnos en milisegundos).
    *   `Cloud Firestore`: Exclusiva para **AgroGo** y **CargoGo** (consultas complejas de lotes, animales y subastas logísticas).
    *   `Firebase Hosting`: Despliegue de la suite web y la plataforma interactiva de **CargoGo**.

---

## 🚌 2. RutaGo: Movilidad Intermunicipal (Producción)
Aplicación Android nativa enfocada en la reserva de pasajes y gestión de flotas.

*   **Stack:** Java 17, XML (Material 3), MVVM Reactivo.
*   **Monetización:**
    *   **B2C (Pasajeros):** Fidelización por niveles (Plata, Oro, Diamante) mediante Puntos Go.
    *   **B2B (Conductores):** SaaS Premium con prioridad de turnos, analítica detallada y gestor de gastos operativos.

---

## 🌿 3. AgroGo: ERP Agrícola y Ganadero (Desarrollo)
Plataforma móvil para la administración total de la finca (nómina, lotes GPS, sanidad animal y beneficio del café).

*   **Stack:** Flutter + Isar Database (Motor local).
*   **Estrategia Offline-First:** Uso de Isar para garantizar funcionamiento 100% sin señal en el campo, sincronizando con Firestore solo al detectar conexión.
*   **Cross-Selling:** Integración visual con RutaGo mediante *Deep Links* (`rutago://home`) para incentivar viajes en fines de semana.

---

## 🚛 4. CargoGo: Logística y Subastas (Evolución)
Evolución del directorio web a un sistema interactivo de conexión de carga.

*   **El Puente Operativo:** El productor desde AgroGo solicita transporte para su inventario (ej. Café), disparando una entrada en Firestore.
*   **Modelo de Subasta Ciega:** Los conductores ofertan sin ver los precios de la competencia para proteger la rentabilidad y evitar la guerra del centavo.
*   **Match-Making:** El productor elige basado en precio, calificación y tipo de vehículo.

---

## 🛡️ 5. Aseguramiento de Calidad y Próximos Pasos
1.  **Lanzamiento RutaGo:** Generación de Bundle (.aab) y despliegue en Play Store con 4 conductores pioneros.
2.  **QA Senior:** Implementación de JUnit para blindar los motores de cálculo (FormatUtils y Puntos Go).
3.  **Ciclo Transaccional:** Integración de pasarelas de pago (PSE, Nequi, Daviplata) para automatizar el recaudo.

---
**Chop Code Solutions - Junio 2026**
*Engineering the future of rural productivity.*
