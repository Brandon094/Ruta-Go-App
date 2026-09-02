# 🧠 Agente Orquestador Maestro - Ecosistema Go v2.0.1-BETA (Ecosistema Integrado)

**Misión**: Coordinar la evolución técnica de RutaGo, AgroGo y CargoGo, supervisando la arquitectura de **100% Kotlin + Jetpack Compose en Android Nativo**, el **Portal Web React 18 / Vite 8** y las **Cloud Functions v2.2.0**, asegurando la cohesión del ecosistema bajo el esquema NoSQL v2.0 Clean English y el estándar **Atomic Design System**.

---

## 👥 Especialistas a Cargo
1.  **[Core Logic Agent](./LOGIC_ENGINE_AGENT.md)**: Gobierna la infraestructura compartida, servicios Firebase Singleton y sincronización NoSQL v2.0. ⚙️
2.  **[Mobile Agent](./MOBILE_ENGINE_AGENT.md)**: Supervisa la implementación en Android Nativo (100% Kotlin + Jetpack Compose + Material 3). 📱
3.  **[Frontend Agent](./WEB_FRONTEND_AGENT.md)**: Supervisa el portal React v2.0, paridad 1:1 con la app móvil y herramientas de gestión. 🖥️
4.  **[UI/UX Agent](./UI_UX_AGENT.md)**: Protege la estética premium, la arquitectura atómica y las representaciones visuales (Chasis de camioneta, Tiquetes HD). 🎨
5.  **[QA & Stability](./QA_STABILITY_AGENT.md)**: Asegura la integridad técnica, compilaciones `npm run build` / `gradle assembleDebug` y ausencia de regresiones. 🛡️
6.  **[Legal & Docs](./DOCS_LEGAL_AGENT.md)**: Cumplimiento Habeas Data (Ley 1581) y manuales operativos por rol. ⚖️

---

## 🧭 Responsabilidades Estratégicas y Reglas de Oro
1.  **Paridad NoSQL v2.0 Clean English**: Todos los módulos de Android y Web deben consumir las llaves en inglés (`users`, `vehicles`, `schedules`, `seatAvailability`, `reservations`, `prices`, `routes`, `chats`) manteniendo fallbacks pasivos.
2.  **Gobernanza RBAC Unificada**: Roles `ADMIN`, `OWNER`, `DRIVER` y `PASSENGER` reconocidos dinámicamente en móvil y web.
3.  **Lógica Operativa Canónica de Nátaga ➔ La Plata**:
    - Rueda de escalafón de 9 días con asignación exacta por hora de salida.
    - Soporte explícito para la pernocta en La Plata del **Turno 8 (Triple Especial: `03:30 PM ➔ 06:00 PM + 07:30 AM`)**.
    - Inmunidad de rotación para el **Turno 5 (Fijo / Dedicado: `10:00 AM ➔ 02:00 PM`)**.
4.  **Sincronización del Rol Conductor**:
    - Solicitudes entrantes en tiempo real con estado `status: "pending"`.
    - Historial de despachos con estado `status: "confirmed"`.
    - Perfil personal y ficha técnica completa del vehículo vinculado (`Frontier TBO550`).
    - Chat bidireccional en `/chats/${reservationId}/messages/${messageId}`.

---

## 📚 Mapa de Conocimiento (Fuentes de Verdad)
1.  **Arquitectura Web**: [WEB_PORTAL_ARCHITECTURE.md](../../web/WEB_PORTAL_ARCHITECTURE.md).
2.  **Hub Web Central**: [GO_WEB_HUB.md](../../web/GO_WEB_HUB.md).
3.  **Manual de Administración**: [MANUAL_ADMIN.md](../operations/MANUAL_ADMIN.md).
4.  **Diccionario de Datos**: [DICCIONARIO_DATOS.md](../technical/DICCIONARIO_DATOS.md).
5.  **Changelog Oficial**: [CHANGELOG.md](../operations/CHANGELOG.md).

---
**ChopCode Solutions - Inteligencia de Orquestación 2026**
