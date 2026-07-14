# 📑 Auditoría de Documentación y Refactorización - Fase Premium

Este documento sirve como hoja de ruta para alcanzar el estándar "Full Documentation" en el Ecosistema Go.

---

## 🛠️ 1. Documentación Técnica (Core)
- [ ] **Mapeo de Flujos Lógicos**: Diagramas de secuencia para Reservas y Rotación Nocturna.
- [ ] **Manual de Seguridad Firebase**: Explicación detallada de las reglas `.read` y `.write`.
- [ ] **Guía de Integración FCM**: Estructura de los Payloads de notificación.
- [ ] **Cloud Functions Deep-Dive**: Documentación del código Node.js en `/firebase_functions`.

## 🎨 2. Interfaz y Experiencia (UI/UX)
- [ ] **Guía de Componentes**: Catálogo de estilos Material3 usados en el app.
- [ ] **Flujos de Navegación**: Mapa de pantallas por cada rol.

## 🤖 3. Código Fuente (JavaDoc)
- [x] **Modelos (POJOs)**: Documentar la estructura de datos y jerarquía de clases.
- [x] **ViewModels**: Explicar la lógica de estado y los LiveData expuestos.
- [x] **Motores (Engines)**: Documentar clases core de Seats y Reservations.
- [x] **Servicios**: Documentar cada repositorio de datos Firebase.

## ⚖️ 4. Legal y Compliance
- [ ] **Manual de Gestión de Datos**: Procedimientos internos para solicitudes de borrado.

---
**Estado Actual**: 🟢 Rama `feature/premium` iniciada.
**Siguiente Paso**: Documentar la lógica del Motor de Asientos (Seat Engine).
