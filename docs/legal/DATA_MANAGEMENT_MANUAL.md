# ⚖️ Manual de Gestión de Datos y Cumplimiento (Legal)

Este documento establece los procedimientos internos para el manejo de la información personal de los usuarios del Ecosistema Go, asegurando el cumplimiento con la Ley de Habeas Data y las políticas de privacidad de las tiendas de aplicaciones.

---

## 🏛️ 1. Marco Normativo
Ruta-Go se rige por los principios de legalidad, finalidad y veracidad en el tratamiento de datos. Cumplimos con:
*   **Derecho al Olvido**: Los usuarios tienen la potestad de solicitar la eliminación total de su identidad y datos transaccionales.
*   **Transparencia**: El usuario sabe exactamente qué datos recolectamos (Nombre, Teléfono, Email, Placa en caso de conductores).

---

## 🧹 2. Protocolo de Borrado de Cuentas
Para garantizar el cumplimiento con Google Play, el sistema ofrece un flujo automatizado de eliminación.

### Flujo del Usuario:
1.  El usuario accede a **Perfil > Editar Perfil > Eliminar Cuenta**.
2.  El sistema marca la cuenta con el flag `solicitudBorrado: true` y registra la fecha exacta.
3.  Se inicia un **Periodo de Gracia de 30 días**, durante el cual el usuario puede retractarse iniciando sesión nuevamente (esto resetea el flag).

### Ejecución de Limpieza (Background):
La Cloud Function `cleanupMarkedAccounts` se ejecuta cada **Domingo a las 3:00 AM** y realiza un borrado definitivo en tres capas:
1.  **Firebase Auth**: Eliminación del registro de autenticación (imposibilita el inicio de sesión).
2.  **Realtime Database**: Remoción del nodo `/usuarios/{uid}` o `/conductores/{uid}`.
3.  **Activos Vinculados**: Si es conductor, se elimina el nodo del vehículo en `/vehiculos/{placa}`.

---

## 📧 3. Solicitudes Manuales (Soporte)
En caso de que un usuario solicite el borrado vía correo electrónico o soporte técnico externo:
1.  **Verificación**: Se debe confirmar la identidad del solicitante mediante el correo vinculado.
2.  **Acción en Consola**: El administrador debe entrar a la Firebase Console y activar manualmente el campo `solicitudBorrado: true` en el nodo del usuario.
3.  **Confirmación**: Se debe responder al usuario informando que sus datos serán eliminados permanentemente tras el periodo de gracia.

---

## 🛡️ 4. Tipos de Datos y Finalidad
| Dato | Finalidad |
|:---|:---|
| **Nombre** | Identificación en el tiquete y chat. |
| **Email** | Autenticación y recuperación de cuenta. |
| **Teléfono** | Contacto inmediato entre pasajero/conductor por emergencias de viaje. |
| **Placa/Modelo** | Identificación del vehículo para seguridad del pasajero. |

---

## 📈 5. Auditoría Legal
Cualquier cambio en la política de privacidad (`privacy.html`) o en los términos de servicio (`terms.html`) debe reflejarse en este manual para mantener la consistencia operativa.

---
**Chop Code Solutions - Departamento Legal y Compliance v1.3.0**
