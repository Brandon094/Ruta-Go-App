# 🚀 Hoja de Ruta y Próximas Funcionalidades - Ruta-Go

Este documento describe la visión a futuro de la plataforma Ruta-Go, detallando los módulos y características que se implementarán en las siguientes fases de desarrollo para convertir el proyecto en una startup rentable y escalable en la región.

---

## ✅ Fase 1: Estabilización y Optimización (Completado)
*   [x] Arquitectura MVVM Reactiva y Motores Core.
*   [x] Registro Autónomo de Conductores y Gestión de Activos.
*   [x] Tutorial Hub Interactivo y Guías de Usuario.
*   [x] **Optimización Android 15 (SDK 35)**: Edge-to-Edge y 16 KB support.
*   [x] **Full Documentation Sprint**: Documentación técnica y legal v1.3.0.
*   [x] **Fix Core de Rotación y Notificaciones**: Estabilización de Cloud Functions y asignación de conductores.

---

## ✅ Fase 2: Consolidación y Dueños de Vehículos (Completado)
*Objetivo: Sentar las bases de escalabilidad mediante el desacoplamiento técnico y la creación del rol "Dueño".*

*   [x] **🚗 Desacoplamiento Vehículo-Conductor**: Nodo `/dueños/` centralizado y propiedad de activos blindada.
*   [x] **🌐 Ruta-Go Portal (v1.5.0)**: Lanzamiento del ecosistema web centralizado (Landing Page + Business App).
*   [x] **🍏 Soporte Universal (iPhone)**: Implementación de PWA para permitir que pasajeros y conductores de Apple usen la plataforma sin depender de la App Store.
*   [x] **👑 Go Business Dashboard**: Módulo para dueños con aislamiento de datos, monitor de flota e ingresos en tiempo real.
*   [x] **⚖️ Cumplimiento Legal Web**: Integración de Términos, Privacidad y Derecho al Olvido en el portal.
*   [x] **🚀 Activación Instantánea**: Flujo de registro automatizado para socios y administradores.
*   [x] **💎 Web Refactor & UI Mirror (v1.5.1)**:
    *   Arquitectura Singleton (`FirebaseManager`) y modularización de hooks.
    *   Estrategia de navegación dual (Mobile Mirror para Operativos / Sidebar para Gestión).
    *   Sincronización de capacidad real y auto-scroll inteligente.
    *   Módulo independiente de Gestión de Socios para Admin Root.

---

## 🎯 Fase 3: Operación Web Total y Monetización (Prioridad Actual)
*Objetivo: Alcanzar paridad de funciones con la App móvil y comenzar la captura de valor.*

### 🛠️ 1. Motor de Reservas & Notificaciones
*   [ ] **🎟️ Motor de Reservas Web (v1.6.0)**: Selección de asientos interactiva y generación de reserva oficial para usuarios de iPhone.
*   [ ] **🔔 Centro de Notificaciones Web**: Implementación de Firebase Cloud Messaging (FCM) para enviar avisos de despacho y confirmaciones desde la web.

### 👑 2. Gobernanza Root Pro (Control Maestro)
*   [x] **👨‍💼 Vínculo Dueño-Conductor**: Interfaz para asignar jefes de flota a los conductores desde el panel Root.
*   [x] **📑 Selector de Dueños**: Reemplazar ingreso manual de UIDs por una lista desplegable de socios aprobados al crear conductores.
*   [x] **🛡️ Control de Pasajeros**: Botones de acción en la tabla de usuarios para **Banear, Inactivar o Borrar** cuentas con un clic.

### 🎫 3. Experiencia de Usuario "Premium"
*   [ ] **📱 Suite de Viaje en Historial**:
    *   Visualización de **Tiquete Digital** (diseño espejo de la App).
    *   Módulo de **Chat en vivo** para coordinar con el conductor.
    *   Sistema de **Calificación de Viaje** (1-5 estrellas).
*   [ ] **🌟 Programa de Fidelización "Puntos Go"**: Implementación de niveles y redención de puntos.

---

## 📉 Fase 4: SaaS Contable y Diversificación (Largo Plazo)
*Objetivo: Solución integral de movilidad regional y control definitivo del flujo de paquetería local.*

1.  **🚚 Módulo de Encomiendas "Ruta-Go Cargo"**:
    *   Registro rápido de paquetes físicos por parte del conductor.
    *   Buscador de estado de guía para pasajeros con chat directo.
2.  **🛡️ Seguro de Viaje Digital**: Micro-seguros por trayecto integrados en la reserva.
3.  **🤖 IA de Predicción de Demanda**: Sugerencias de turnos extra basadas en datos históricos de Nátaga y La Plata.

---
**ChopCode Solutions - 2026**
