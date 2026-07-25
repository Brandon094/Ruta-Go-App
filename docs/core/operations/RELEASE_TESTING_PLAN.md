# 🏁 Plan de Pruebas de Certificación - Ruta-Go v1.3.0 Optimized

Este documento detalla el protocolo de pruebas (QA) para validar la estabilidad, reactividad y seguridad de la aplicación, con enfoque en las nuevas capacidades de Android 15 y el estándar de documentación premium.

---

## 🏗️ 0. Preparación del Entorno (Clean Start)
1.  **Limpiar Auth**: Borrar todos los usuarios de prueba en Firebase Console.
2.  **Limpiar Database**: Eliminar los nodos `reservas`, `chats`, `notificaciones`.
3.  **Importar Master JSON**: Subir el esquema v1.3.0 sincronizado.
4.  **Emulador/Dispositivo**: Usar un dispositivo con Android 15 (API 35) para validación visual.

---

## 🟢 Fase 1: Android 15 y UX Premium
*Objetivo: Validar el cumplimiento con los estándares modernos de Google.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 1.1 | Edge-to-Edge | Abrir cualquier pantalla (ej. Home). | El contenido debe extenderse detrás de la barra de navegación y estado. |
| 1.2 | Animaciones de Escala | Presionar cualquier botón Material. | Se debe percibir la micro-interacción de escalado (0.95x). |
| 1.3 | Shimmer Effect | Cargar el Dashboard con latencia de red simulada. | Se deben mostrar esqueletos de carga en lugar de spinners vacíos. |
| 1.4 | AD_ID Compliance | Revisar logs de inicialización. | No se debe invocar el API de Publicidad (Privacidad Total). |

---

## 🔵 Fase 2: Lógica Transaccional (Motores)
*Objetivo: Validar la robustez del Seat y Reservation Engine.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 2.1 | Reserva Atómica | Intentar reservar el mismo asiento desde dos dispositivos a la vez. | Firebase debe abortar una transacción y el app mostrar el error controlado. |
| 2.2 | Sincronización de Capacidad | Cambiar la capacidad de un vehículo en el nodo `/vehiculos`. | Los horarios vinculados deben actualizar su disponibilidad automáticamente. |
| 2.3 | Deep Linking FCM | Enviar un mensaje de chat y tocar la notificación. | El app debe abrir directamente la `ChatActivity` con el ID de reserva correcto. |
| 2.4 | Blindaje C2C (ProGuard) | Probar envío de notificaciones en un AAB/APK firmado (Release). | Las notificaciones deben llegar correctamente (Valida las reglas de ProGuard para Google Auth). |

---

## 🟡 Fase 3: Rotación y Mantenimiento Cloud
*Objetivo: Validar la orquestación serverless.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 3.1 | Automated Rotation | Ejecutar manualmente la función en Firebase Console. | Se deben redistribuir los turnos y resetear asientos. **Verificar que el conductorId persista en los horarios asignados** (Valida el Set de integridad). |
| 3.2 | Cleanup Grace Period | Marcar cuenta para borrado y esperar (o forzar timestamp). | Tras 30 días, la cuenta debe desaparecer de Auth y DB permanentemente. |

---

## 🛡️ Fase 4: Auditoría de Documentación
*Objetivo: Verificar que el código es legible y mantenible.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 4.1 | JavaDoc Coverage | Revisar clases en `models` y `viewmodels`. | Cada método público debe tener su descripción, parámetros y retornos. |
| 4.2 | Deep-Dive Sync | Comparar `LOGICAL_FLOWS.md` con el código. | La descripción técnica debe coincidir con la implementación real (ej: runTransaction). |

---

## 📝 Notas de Versión (v1.3.0 Stable)
- **Target SDK**: 35 (Android 15).
- **Min SDK**: 24 (Android 7.0).
- **Architecture**: MVVM con Repositorios Desacoplados.

---
**Elaborado por: Chop Code Solutions - Ingeniería de Calidad 2026**
