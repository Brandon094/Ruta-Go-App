# 🧠 Agente Orquestador Maestro - Certificación de Refactor Web NoSQL v2.0 (v2.0.1-BETA)

**Misión**: Coordinar la evolución técnica de RutaGo, AgroGo y CargoGo, certificando la culminación del **Refactor del Portal Web en React 18 / Vite 8** bajo el estándar **NoSQL v2.0 Clean English Schema** y paridad 1:1 con la App Android en **100% Kotlin + Jetpack Compose**.

---

## 🏁 Certificación de Finalización de Refactor Web NoSQL v2.0
El Agente Orquestador Maestro declara **OFICIALMENTE COMPLETADO** el refactor de los motores del Portal Web. La totalidad de los servicios, hooks y componentes de la aplicación web consumen y crean nodos exclusivamente bajo las llaves en inglés del estándar NoSQL v2.0:

1. **`users`**: Estructura unificada para Pasajeros, Conductores (`vehiclePlate`, `assignedSchedules`), Socios (`ownedPlates`) y Administradores.
2. **`vehicles`**: Ficha técnica de flota (`brand`, `model`, `plate`, `color`, `year`, `capacity`, `driverId`, `ownerId`).
3. **`schedules`**: Itinerarios dinámicos de salida (`route`, `time`, `duration`, `price`, `driverId`, `vehicleId`, `driverName`).
4. **`seatAvailability`**: Control de inventario en tiempo real (`totalSeats`, `availableSeats`, `occupiedSeats`).
5. **`reservations`**: Pasajes expedidos (`userId`, `driverId`, `scheduleId`, `origin`, `destination`, `departureTime`, `status: "pending" | "confirmed" | "cancelled"`, `reservedSeat`, `price`, `reservationDate`, `passengerName`, `passengerPhone`, `driverName`, `vehiclePlate`, `vehicleModel`).
6. **`chats`**: Canal de mensajería instantánea en `/chats/${reservationId}/messages/${messageId}` (`id`, `senderId`, `text`, `timestamp`).
7. **`prices` & `routes`**: Matriz de tarifas y directorio de rutas regionales.
8. **`stats`**: Consolidado financiero diario por conductor.

---

## 👥 Especialistas Certificados
1.  **[Core Logic Agent](./LOGIC_ENGINE_AGENT.md)**: Infraestructura compartida y sincronización de servicios Singleton. ⚙️
2.  **[Mobile Agent](./MOBILE_ENGINE_AGENT.md)**: Paridad de la app nativa Android (100% Kotlin + Jetpack Compose + Material 3). 📱
3.  **[Frontend Agent](./WEB_FRONTEND_AGENT.md)**: Portal React v2.0, dashboards por rol y modales operacionales. 🖥️
4.  **[UI/UX Agent](./UI_UX_AGENT.md)**: Mapa atómico con chasis de camioneta, tiquetes PNG HD y badges NoSQL v2.0. 🎨
5.  **[QA & Stability](./QA_STABILITY_AGENT.md)**: Verificación de compilaciones `npm run build` y `gradle assembleDebug` con 0 errores. 🛡️
6.  **[Legal & Docs](./DOCS_LEGAL_AGENT.md)**: Privacidad estricta de chat (solo visible para Pasajero y Conductor) y Habeas Data Ley 1581. ⚖️

---

## 📚 Mapa de Conocimiento (Fuentes de Verdad)
1.  **Arquitectura Web**: [WEB_PORTAL_ARCHITECTURE.md](../../web/WEB_PORTAL_ARCHITECTURE.md).
2.  **Hub Web Central**: [GO_WEB_HUB.md](../../web/GO_WEB_HUB.md).
3.  **Diccionario de Datos**: [DICCIONARIO_DATOS.md](../technical/DICCIONARIO_DATOS.md).
4.  **Flujos Lógicos**: [LOGICAL_FLOWS.md](../technical/LOGICAL_FLOWS.md).
5.  **Manual de Administración**: [MANUAL_ADMIN.md](../operations/MANUAL_ADMIN.md).
6.  **Changelog Oficial**: [CHANGELOG.md](../operations/CHANGELOG.md).

---
**ChopCode Solutions - Inteligencia de Orquestación 2026**
