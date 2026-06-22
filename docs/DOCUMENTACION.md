# 📖 Enciclopedia Técnica Integral - Ruta-Go v1.2.3 Stable

Bienvenido al centro de conocimiento oficial de **Ruta-Go**. Este documento sirve como punto de entrada de alto nivel para comprender la plataforma intermunicipal líder en optimización de transporte regional.

---

## 🏗️ 1. Visión y Propósito Estratégico
Ruta-Go no es solo una aplicación de reserva; es una solución de **Logística Transaccional Reactiva**. Su objetivo es eliminar la ineficiencia en el transporte entre Natagá y La Plata mediante la automatización de la oferta (conductores) y la demanda (pasajeros).

---

## 👥 2. Modelo de Actores y Permisos
El sistema utiliza un modelo de **Control de Acceso basado en Roles (RBAC)** integrado con Firebase Auth:

1.  **Pasajero (Cliente)**:
    *   *Capacidades*: Consulta itinerarios, reserva atómica de asientos, gestión de tiquetes digitales y fidelización.
    *   *UX*: Guiada por el Tutorial Hub de 5 pasos.
2.  **Conductor (Operador Técnico)**:
    *   *Capacidades*: Autogestión de flota, ventas físicas fuera de plataforma, control de caja diario y agenda dinámica.
    *   *UX*: Dashboard financiero con actualización de estadísticas en tiempo real.
3.  **Administrador (Central)**:
    *   *Capacidades*: Gestión de tarifas maestras, monitoreo de flotas y mantenimiento de planilla.

---

## 📦 3. Desglose de Motores y Módulos Core

| Módulo | Responsabilidad Técnica | Componente Clave |
|:---|:---|:---|
| **Auth Engine** | Segregación física de roles y persistencia de sesión. | `UserRoleService` |
| **Seat Engine** | Gestión transaccional de inventario (asientos). | `SeatDataProcessor` |
| **Reservation Engine** | Orquestación de datos y flujo de confirmación. | `ReservationDataProcessor` |
| **Tutorial Hub** | Capacitación interactiva y persistencia de guías. | `TutorialManager` |
| **Finance Core** | Tarifas dinámicas desde la nube y cálculo de COP. | `PriceService` |
| **Integridad (Sanity)** | Filtrado de datos huérfanos y normalización. | `ScheduleService` |
| **Loyalty & Premium** | Gamificación, Puntos Go y suscripciones SaaS. | (Fase 3) |

---

## 🛠️ 4. Ecosistema de Documentación (Nivel Senior)
Para una comprensión profunda, consulte los manuales especializados organizados por dominio:

### 📗 Dominio Técnico (Engineering)
*   [**Arquitectura Detallada**](./technical/ARCHITECTURE_MODULES.md): Patrones MVVM, flujos de datos y lógica de motores.
*   [**Estándares de Código**](./technical/DEVELOPER_GUIDELINES.md): Reglas de oro para desarrolladores y estándares de Clean Code.
*   [**Diccionario de Datos**](./technical/DICCIONARIO_DATOS.md): Mapeo bilingüe del esquema NoSQL en Firebase.
*   [**Ficha Técnica**](./technical/FICHA_TECNICA.md): Especificaciones de infraestructura, hardware y librerías.

### 📘 Dominio de Producto (Business)
*   [**Especificación de Requisitos**](./product/REQUISITOS.md): Requisitos funcionales, no funcionales y reglas de negocio.
*   [**Identidad Visual**](./product/BRANDING.md): Guía de estilo, paleta de colores y uso de marca.
*   [**Hoja de Ruta (Roadmap)**](./product/ROADMAP.md): Visión a futuro y fases de expansión (Pagos, Encomiendas).

### 📙 Dominio Operativo (QA & Ops)
*   [**Plan de Pruebas**](./operations/RELEASE_TESTING_PLAN.md): Protocolo de certificación de calidad para lanzamientos.
*   [**Manual de Administración**](./operations/MANUAL_ADMIN.md): Guía operativa para la gestión desde Firebase Console.
*   [**Historial de Cambios**](./operations/CHANGELOG.md): Registro cronológico de la evolución del software.

---

## 🛡️ 5. Seguridad y Gobernanza de Datos
Ruta-Go implementa una capa de seguridad multi-nivel:
*   **Transporte**: Encriptación SSL/TLS nativa de Firebase.
*   **Persistencia**: Reglas de seguridad NoSQL basadas en `auth.uid`.
*   **Privacidad**: Cumplimiento con la Ley 1581 de 2012 (Habeas Data). Los datos sensibles (teléfonos/ingresos) están segregados por rol y dueño.

---
**© 2026 Chop Code Solutions - Innovación en Movilidad Regional**
**Desarrollado por: Brandon Daza Cerquera**
