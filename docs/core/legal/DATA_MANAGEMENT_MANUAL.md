# ⚖️ Manual de Gestión de Datos y Cumplimiento (Legal) v1.9.9.5

Este documento establece los procedimientos para el manejo de la información personal en el ecosistema móvil (Android) y web (Portal) de Ruta-Go, asegurando el cumplimiento con la Ley de Habeas Data (Ley 1581 de 2012) y las políticas de Google Play.

---

## 🏛️ 1. Marco Normativo
Ruta-Go opera bajo los estándares de **Seguridad y Privacidad por Diseño**:
*   **Derecho al Olvido**: Implementamos flujos autónomos y transparentes para la eliminación definitiva de datos del usuario.
*   **Aislamiento de Datos (RBAC)**: Garantizamos que la información operativa y financiera de los socios esté protegida mediante reglas de seguridad de Firebase, impidiendo el acceso a terceros no autorizados.

---

## 🧹 2. Protocolo de Borrado de Cuentas
El sistema ofrece un flujo automatizado de eliminación sincronizado entre plataformas para cumplir con los requisitos de Google Play.

### Flujo del Usuario:
1.  **Desde la App (Nativa)**: Perfil > Editar Perfil > Eliminar Cuenta.
2.  **Desde la Web (Portal)**: Mi Perfil > Solicitar borrar cuenta.
3.  **Marcado**: Al confirmar, se activa el flag `solicitudBorrado: true` y se registra la `fechaSolicitudBorrado`. 
4.  **Periodo de Gracia**: Se otorga un plazo de **30 días corridos**. Si el usuario inicia sesión antes de este plazo, la solicitud se cancela automáticamente para evitar eliminaciones accidentales.

### Ejecución de Limpieza (Serverless):
La Cloud Function `cleanupMarkedAccounts` se ejecuta semanalmente y realiza el borrado atómico:
1.  **Firebase Auth**: Eliminación definitiva del registro de autenticación.
2.  **RTDB**: Remoción total de perfiles en `/usuarios/`, `/conductores/` y `/dueños/`.
3.  **Activos**: Desvinculación y borrado de placas en `/vehiculos/` (si el usuario es conductor).

---

## 📧 3. Soporte y Consultas Manuales
Para rectificaciones, actualizaciones o eliminaciones manuales inmediatas:
1.  **Validación**: El usuario debe escribir desde el correo registrado a `dazace94@gmail.com`.
2.  **Acción Admin**: El Administrador Root valida la identidad y procesa la solicitud mediante la consola de administración.
3.  **Confirmación**: Se notifica al usuario vía email una vez completado el proceso de limpieza legal.

---

## 🛡️ 4. Tipos de Datos y Finalidad
| Dato | Finalidad | Almacenamiento |
|:---|:---|:---|
| **Nombre/Email** | Gestión de identidad y Autenticación (SSO). | Auth + RTDB |
| **Teléfono** | Coordinación logística y contacto en tiempo real. | RTDB |
| **Placa/Modelo** | Gestión de activos, seguridad del pasajero y asignación de turnos. | RTDB |
| **Ingresos** | Reportes financieros y métricas exclusivas para Socios/Admin. | RTDB |

---

## 📈 5. Auditoría de Documentos
Este manual debe estar permanentemente alineado con los componentes dinámicos de transparencia en el portal web:
*   `Privacy.jsx`: Política detallada de tratamiento de datos.
*   `Terms.jsx`: Términos de uso del ecosistema.

---
**ChopCode Solutions - Compliance 2026**
