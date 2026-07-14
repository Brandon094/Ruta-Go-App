# 📑 Auditoría de Documentación y Refactorización - Fase Premium

Este documento sirve como hoja de ruta para alcanzar el estándar "Full Documentation" en el Ecosistema Go.

---

## 🛠️ 1. Documentación Técnica (Core)
- [ ] **Mapeo de Flujos Lógicos**: Diagramas de secuencia para Reservas y Rotación Nocturna.
- [x] **Manual de Seguridad Firebase**: Explicación detallada de las reglas `.read` y `.write`.
- [x] **Guía de Integración FCM**: Estructura de los Payloads de notificación.
- [x] **Cloud Functions Deep-Dive**: Documentación del código Node.js en `/firebase_functions`.

## 🎨 2. Interfaz y Experiencia (UI/UX)
- [x] **Guía de Componentes**: Catálogo de estilos Material3 usados en el app.
- [x] **Flujos de Navegación**: Mapa de pantallas por cada rol.

## 🤖 3. Código Fuente (JavaDoc)
- [x] **Modelos (POJOs)**: Documentar la estructura de datos y jerarquía de clases.
- [x] **ViewModels**: Explicar la lógica de estado y los LiveData expuestos.
- [x] **Motores (Engines)**: Documentar clases core de Seats y Reservations.
- [x] **Servicios**: Documentar cada repositorio de datos Firebase.
- [x] **Managers**: Documentar controladores de lógica (Core) y UI Helpers.
- [x] **Adapters**: Documentar gestión de listas y ViewHolders.
- [x] **Utils**: Documentar herramientas de formato, red y seguridad.
- [x] **Activities & Fragments**: Documentar controladores de vista y ciclo de vida.
- [x] **Config**: Documentar configuración global de Firebase y App.

## ⚖️ 4. Legal y Compliance
- [x] **Manual de Gestión de Datos**: Procedimientos internos para solicitudes de borrado.

---
**Estado Actual**: 🟢 Rama `feature/premium` iniciada.
**Siguiente Paso**: Documentar la lógica del Motor de Asientos (Seat Engine).
