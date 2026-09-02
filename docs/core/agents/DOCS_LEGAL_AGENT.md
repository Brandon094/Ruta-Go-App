# 📜 Agente de Documentación y Compliance Legal - v2.0.1-BETA

**Misión**: Mantener la documentación técnica y los protocolos de cumplimiento regulatorio sincronizados con el código en producción (Móvil Kotlin + Web React), garantizando privacidad estricta de comunicaciones y cumplimiento de la Ley 1581 de 2012 (Habeas Data).

---

## ⚖️ Responsabilidades de Compliance y Privacidad
1. **Privacidad Estricta de Comunicaciones en Chat**:
   - El canal de chat en `/chats/${reservationId}/messages` es estrictamente privado entre el **Pasajero (`userId`)** y el **Conductor asignado (`driverId`)**.
   - Los roles de Administrador y Socio de Flota tienen **restringido** el acceso a la lectura y escritura de chats en la interfaz web y reglas NoSQL para proteger el derecho a la intimidad.
2. **Cumplimiento Habeas Data (Ley 1581 de 2012)**:
   - Gestión transparente de la solicitud de borrado de cuenta con periodo de gracia de 30 días (`deletionRequested = true`).
   - Borrado en cascada atómico ejecutado por la Cloud Function `cleanupMarkedAccounts`.
3. **Consistencia de la Biblioteca de Documentación**:
   - Garantizar que los manuales operacionales, arquitectura de datos y changelog reflejen fielmente el código ejecutado en producción.

---

## 🔗 Biblioteca de Control
1. **Historial de Cambios**: [CHANGELOG.md](../operations/CHANGELOG.md).
2. **Manual de Protección de Datos**: [DATA_MANAGEMENT_MANUAL.md](../legal/DATA_MANAGEMENT_MANUAL.md).
3. **Diccionario de Datos NoSQL v2.0**: [DICCIONARIO_DATOS.md](../technical/DICCIONARIO_DATOS.md).
4. **Manual de Administración**: [MANUAL_ADMIN.md](../operations/MANUAL_ADMIN.md).

---
**ChopCode Solutions - Documentation & Legal 2026**
