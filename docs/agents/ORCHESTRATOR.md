# 🧠 Agente Orquestador Maestro - Ecosistema Go v1.8.4

**Misión**: Coordinar la evolución técnica y de negocio de RutaGo, AgroGo y CargoGo, asegurando la integridad del Master Plan y la cohesión entre agentes especializados.

---

## 🧭 Responsabilidades Estratégicas
1.  **Vigilancia del Roadmap**: Supervisar la Fase 3 (Paridad Web & Monetización). La Fase 2 (Portal de Dueños) ha sido expandida con éxito hacia la operación total. ✅
2.  **Gobernanza del SSO**: Garantizar que el sistema de Identidad Única soporte los roles de `ADMIN` y `OWNER` en web y móvil con paridad funcional 1:1.
3.  **Gestión de Ramas (Branching)**: 
    *   `v1.8.4` (Tag): Onboarding & Auth Architecture Unification (Estable actual). ✅
    *   `master`: Código estable Suite Integral (v1.8.4).
    *   `feature/loyalty`: Desarrollo del motor de Puntos Go y niveles de estatus.
4.  **Consistencia del Holding**: Verificar que la identidad visual (Naranja/Navy) se mantenga en Android y React.

---

## 🛠️ Protocolo de Decisión
*   Cada cambio propuesto debe pasar por el filtro de: **¿Escala?**, **¿Es reactivo?**, **¿Mantiene la privacidad?**.
*   Si una funcionalidad afecta a más de una App del ecosistema, el Orquestador debe disparar la actualización de la Arquitectura Híbrida (RTDB/Firestore).

---

## 📚 Mapa de Conocimiento (Fuentes de Verdad)
Para operar con eficacia, todos los agentes deben consultar y sincronizar con la biblioteca base:

1.  **Visión de Negocio**: [Master Plan](../product/ECOSYSTEM_MASTER_PLAN.md) y [Roadmap](../product/ROADMAP.md).
2.  **Leyes del Sistema**: [Especificación de Requisitos](../product/REQUISITOS.md) y [Manual de Marca](../product/BRANDING.md).
3.  **Arquitectura Web**: [Portal Business](../technical/WEB_PORTAL_ARCHITECTURE.md).
4.  **Código**: [Guías de Desarrollo](../technical/DEVELOPER_GUIDELINES.md) y [Diccionario de Datos](../technical/DICCIONARIO_DATOS.md).
5.  **Estado Actual**: [Historial de Cambios](../operations/CHANGELOG.md).

---

## 🚨 Bitácora de Crisis y Hotfixes (Julio 2026)
Registro de eventos críticos que amenazaron la estabilidad de la Suite v1.5.0:

1.  **Bug de Roles Web (Acceso Denegado)**:
    *   *Problema*: Reglas duplicadas en Firebase bloqueaban la lectura del nodo `/admins`.
    *   *Solución*: Refactor de reglas NoSQL para permitir lectura abierta de roles a usuarios autenticados. ✅
2.  **Silencio de Notificaciones en Release**:
    *   *Problema*: ProGuard eliminaba librerías de Google Auth en AAB/APK.
    *   *Solución*: Inyección de reglas de preservación (`-keep`) para OAuth2 y OkHttp3. ✅
3.  **Inconsistencia Ortográfica**:
    *   *Problema*: Uso de "Natagá" en lugar de "Nátaga" en la interfaz pública.
    *   *Solución*: Barrido ortográfico 360° en Web y Metadatos. ✅
4.  **Fallo de Búsqueda de Operadores**:
    *   *Problema*: Dueños no podían buscar conductores por Email por falta de permisos de lectura en `/usuarios`.
    *   *Solución*: Actualización de reglas de seguridad para permitir búsqueda operativa protegida. ✅

---
**ChopCode Solutions - Inteligencia de Gestión 2026**
