# ⚖️ Manual de Gestión de Datos y Cumplimiento (Legal) v1.5.0

Este documento establece los procedimientos para el manejo de la información personal en el ecosistema móvil (App) y web (Portal) de Ruta-Go, asegurando el cumplimiento con la Ley de Habeas Data (Ley 1581) y las políticas de Google Play.

---

## 🏛️ 1. Marco Normativo
Ruta-Go opera bajo los principios de **Seguridad y Privacidad por Diseño**:
*   **Derecho al Olvido**: Implementamos flujos autónomos en App y Web para la eliminación definitiva de datos.
*   **Aislamiento de Datos (RBAC)**: Garantizamos que la información operativa de los socios esté protegida y no sea accesible por terceros.

---

## 🧹 2. Protocolo de Borrado de Cuentas
El sistema ofrece un flujo automatizado de eliminación sincronizado entre plataformas.

### Flujo del Usuario:
1.  **Desde la App**: Perfil > Editar Perfil > Eliminar Cuenta.
2.  **Desde la Web**: Acceso mediante el link en la Política de Privacidad.
3.  **Marcado**: Se activa el flag `solicitudBorrado: true`. Se otorga un **Periodo de Gracia de 30 días**. Si el usuario inicia sesión antes del plazo, la solicitud se cancela automáticamente.

### Ejecución de Limpieza (Serverless):
La Cloud Function `cleanupMarkedAccounts` realiza el borrado atómico:
1.  **Firebase Auth**: Eliminación del registro de autenticación.
2.  **RTDB**: Remoción de perfiles en `/usuarios/`, `/conductores/` y `/dueños/`.
3.  **Activos**: Desvinculación de placas en `/vehiculos/` (si aplica).

---

## 📧 3. Soporte y Consultas Manuales
Para rectificaciones o eliminaciones manuales:
1.  **Identidad**: El usuario debe escribir desde el correo registrado a `dazace94@gmail.com`.
2.  **Acción Admin**: El Admin Root activa el flag de borrado en la consola de Firebase.
3.  **Confirmación**: Se notifica al usuario del inicio del proceso de limpieza legal.

---

## 🛡️ 4. Tipos de Datos y Finalidad
| Dato | Finalidad | Almacenamiento |
|:---|:---|:---|
| **Nombre/Email** | Identidad y Autenticación SSO. | Auth + RTDB |
| **Teléfono** | Coordinación logística en tiempo real. | RTDB |
| **Placa/Modelo** | Gestión de activos y seguridad del pasajero. | RTDB |
| **Ingresos** | Reportes financieros exclusivos para Socios/Admin. | RTDB |

---

## 📈 5. Auditoría de Documentos
Este manual debe estar alineado con los componentes dinámicos `Privacy.jsx` y `Terms.jsx` del Portal Web para garantizar transparencia total.

---
**ChopCode Solutions - Compliance 2026**
