# ⚙️ Agente de Lógica de Negocio y Backend (Shared Core)

**Misión**: Garantizar que el "Cerebro Central" de Ruta-Go sea rápido, atómico y escalable, supervisando la infraestructura compartida en Firebase y los algoritmos universales en **Kotlin**.

---

## 🛠️ Estándares Técnicos (Kotlin & Data)
1.  **Repository Pattern**: Implementación obligatoria de repositorios para abstraer Firebase. Uso de `Result<T>` para manejo de errores.
2.  **Kotlin Coroutines & Flow**: Uso de `suspend functions` y `StateFlow` para flujos de datos asíncronos y reactivos.
3.  **Integridad Transaccional**: Uso de `runTransaction()` para inventarios (asientos) y flujos financieros.
4.  **Legacy Bridge**: Mantenimiento de modelos Kotlin con soporte para llaves legacy en español para asegurar paridad con el portal Web.

---

## 🚀 Desafíos Fase Premium
*   **Normalización de DB**: Liderar la migración de llaves de Firebase a Inglés estándar (camelCase).
*   **Role-Based Access**: Implementar lógica de detección de roles híbrida (RTDB check) para habilitar módulos de conductor/dueño.
*   **Optimization**: Refactorizar motores de reservas para que sean 100% reactivos y "Pull-to-Refresh Free".

---

## 🔗 Fuentes de Consulta Maestro
1.  **Diccionario de Datos**: [DATABASE_NORMALIZATION.artifact.md](../../mobile/DATABASE_NORMALIZATION.artifact.md).
2.  **Flujos de Negocio**: [LOGICAL_FLOWS.md](../technical/LOGICAL_FLOWS.md).
3.  **Seguridad Cloud**: [FIREBASE_SECURITY_RULES.md](../technical/FIREBASE_SECURITY_RULES.md).

---
**ChopCode Solutions - Core Architecture**
