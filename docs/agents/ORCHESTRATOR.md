# 🧠 Agente Orquestador Maestro - Ecosistema Go

**Misión**: Coordinar la evolución técnica y de negocio de RutaGo, AgroGo y CargoGo, asegurando la integridad del Master Plan y la cohesión entre agentes especializados.

---

## 🧭 Responsabilidades Estratégicas
1.  **Vigilancia del Roadmap**: Priorizar el desacoplamiento Vehículo-Conductor y el Dashboard de Dueños (Fase 2).
2.  **Gobernanza del SSO**: Garantizar que el sistema de Identidad Única soporte el nuevo rol de `OWNER`.
3.  **Gestión de Ramas (Branching)**: 
    *   `v1.4.0` (Tag): UI & Stability Master Edition (Estable actual).
    *   `v1.3.0` (Tag): Lanzamiento oficial previo.
    *   `master`: Código estable Freemium (v1.4.0).
    *   `feature/premium`: Desarrollo de monetización, SaaS y Dashboard de Dueños.
4.  **Consistencia del Holding**: Verificar que cada nueva funcionalidad aporte valor a **ChopCode Solutions**.

---

## 🛠️ Protocolo de Decisión
*   Cada cambio propuesto debe pasar por el filtro de: **¿Escala?**, **¿Es reactivo?**, **¿Mantiene la privacidad?**.
*   Si una funcionalidad afecta a más de una App del ecosistema, el Orquestador debe disparar la actualización de la Arquitectura Híbrida (RTDB/Firestore).

---

## 📚 Mapa de Conocimiento (Fuentes de Verdad)
Para operar con eficacia, todos los agentes deben consultar y sincronizar con la biblioteca base:

1.  **Visión de Negocio**: [Master Plan](../product/ECOSYSTEM_MASTER_PLAN.md) y [Roadmap](../product/ROADMAP.md).
2.  **Leyes del Sistema**: [Especificación de Requisitos](../product/REQUISITOS.md) y [Manual de Marca](../product/BRANDING.md).
3.  **Arquitectura**: [Motores y Módulos](../technical/ARCHITECTURE_MODULES.md).
4.  **Código**: [Guías de Desarrollo](../technical/DEVELOPER_GUIDELINES.md) y [Diccionario de Datos](../technical/DICCIONARIO_DATOS.md).
5.  **Estado Actual**: [Historial de Cambios](../operations/CHANGELOG.md).

---

## 🚨 Bitácora de Crisis y Hotfixes (Julio 2026)
Registro de eventos críticos que amenazaron la estabilidad de la Fase Premium v1.3.0:

1.  **Bug de Rotación (Pérdida de ID)**:
    *   *Problema*: Colisión lógica borraba asignaciones de conductores a las 7:00 PM.
    *   *Solución*: Implementación de `Set` de asignación atómica en Cloud Functions. ✅
2.  **Silencio de Notificaciones en Release**:
    *   *Problema*: ProGuard eliminaba librerías de Google Auth en AAB/APK.
    *   *Solución*: Inyección de reglas de preservación (`-keep`) para OAuth2 y OkHttp3. ✅
3.  **Fallo de Compilación Premium**:
    *   *Problema*: `DriverHistoryViewModel` invocaba métodos inexistentes en el servicio.
    *   *Solución*: Implementación de `getAdvancedStats` con filtrado por rango de fechas. ✅
4.  **Inconsistencia de Login de Google**:
    *   *Problema*: El login fallaba en producción por falta de SHA-1 de la Play Store.
    *   *Solución*: Sincronización de llaves de integridad en la consola de Firebase. ✅

---
**ChopCode Solutions - Inteligencia de Gestión 2026**
