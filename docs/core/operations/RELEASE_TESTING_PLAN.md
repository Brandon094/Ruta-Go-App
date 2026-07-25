# 🏁 Plan de Pruebas de Certificación - Ruta-Go v1.9.9.5 Premium

Este documento detalla el protocolo de pruebas (QA) para validar la estabilidad, reactividad y seguridad de todo el ecosistema (Móvil + Web).

---

## 🏗️ 0. Preparación del Entorno
1.  **Limpiar Entorno**: Resetear nodos temporales en RTDB (`reservas`, `chats`).
2.  **Validación de Build**: Ejecutar `npm run build` y asegurar que no existan advertencias de dependencias.
3.  **Cross-Platform**: Tener a mano un dispositivo Android 15 y un navegador (Chrome/Safari) para pruebas de PWA.

---

## 🟢 Fase 1: Calidad Web (Lighthouse Audit)
*Objetivo: Mantener el estándar de excelencia en la plataforma React.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 1.1 | Performance (LCP) | Cargar la Landing Page. | El contenido principal debe ser visible en menos de 2.5s (LCP < 2.5s). |
| 1.2 | Accesibilidad AA | Navegar con lector de pantalla. | Todos los botones deben tener `aria-label` y el contraste debe ser legible. |
| 1.3 | Code Splitting | Revisar Network tab en DevTools. | Los módulos del Dashboard no deben descargarse hasta el Login exitoso. |
| 1.4 | Transiciones Fluida | Cambiar de pestañas rápidamente. | El `SplashScreen` debe aparecer si hay retraso, evitando parpadeos de otro rol. |

---

## 🔵 Fase 2: Lógica de Negocio Unificada
*Objetivo: Validar que el "Cerebro" del sistema responda igual en ambas pistas.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 2.1 | Contabilidad 360° | Realizar una venta física en la web. | El ingreso debe reflejarse en el Dashboard del Dueño y Root automáticamente. |
| 2.2 | Reservas Espejo | Crear reserva en Android. | Debe ser visible, chateable y calificable en el Portal Web de forma instantánea. |
| 2.3 | Regla de las 7 PM | Cambiar la hora del sistema a las 19:01. | La web y el app deben habilitar automáticamente los horarios del día siguiente. |
| 2.4 | Vínculo de Flota | Cambiar el dueño de un bus. | El antiguo dueño debe perder acceso y el nuevo debe ver la data de inmediato. |

---

## 🟡 Fase 3: Infraestructura y Seguridad
*Objetivo: Validar la orquestación serverless y el blindaje.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 3.1 | Rotación Cíclica | Simular ejecución de Cloud Function. | Los conductores deben rotar según el escalafón (validar Triple Turno 8). |
| 3.2 | Aislamiento RBAC | Intentar acceder a `/dueños` como pasajero. | Firebase debe denegar la lectura/escritura (PERMISSION_DENIED). |

---

## 📝 Notas de Certificación
- **Web Standard**: Lighthouse Score > 90.
- **Mobile Standard**: Android 15 Edge-to-Edge Compliance.
- **Sync Latency**: < 500ms en cambios de estado de asientos.

---
**Elaborado por: Chop Code Solutions - Ingeniería de Calidad 2026**
