# 🛡️ Manual de Seguridad: Firebase Realtime Database

Este documento detalla la lógica de gobernanza de datos de Ruta-Go, asegurando la privacidad del usuario, la integridad transaccional y el cumplimiento con la Ley de Habeas Data.

---

## 🏛️ 1. Filosofía de Seguridad
El sistema utiliza un modelo de **Control de Acceso basado en Roles (RBAC)** y **UID-Locking**. Ningún dato es accesible de forma anónima (excepto horarios y precios por razones operativas).

*   **Identidad Obligatoria**: `auth != null` es el requisito base para casi cualquier operación de escritura.
*   **Aislamiento de Perfiles**: Los datos personales están bloqueados por el UID del propietario.

---

## 🔐 2. Análisis de Nodos Críticos

### 👥 Perfiles (/usuarios y /conductores)
*   **Lectura/Escritura**: Restringida estrictamente al propietario (`$uid === auth.uid`).
*   **Validación**: Se exige la presencia de campos obligatorios (`nombre`, `email`) para evitar registros corruptos.

### 🕒 Gestión de Horarios (/horarios)
*   **Reclamación de Turnos**: Implementa una lógica de "Primer llegado, primer servido". Un conductor solo puede asignar su ID a un turno si:
    1. El turno no tiene dueño (`''`).
    2. Él ya es el dueño registrado.
    3. Es un administrador central.

### 💺 Motor de Asientos (/disponibilidadAsientos)
*   **Escritura**: Abierta a usuarios autenticados para permitir reservas, pero con validaciones de tipo (Boolean para ocupación, Number para contadores).
*   **Control de Capacidad**: Solo el conductor asignado al horario puede modificar la capacidad total del bus.

### 🎫 Reservas y Chats (/reservas, /chats)
*   **Validación Cruzada**: Para leer una reserva o entrar a un chat, el sistema verifica que el `auth.uid` coincida con el `userId` (Pasajero) o el `driverId` (Conductor) almacenados en el registro.
*   **Inviolabilidad de Mensajes**: Solo el emisor legítimo puede escribir un mensaje (`newData.child('senderId').val() === auth.uid`).

---

## 💰 3. Protección Financiera (/estadisticas)
Este es el nodo más protegido. Solo el conductor dueño de la cuenta puede ver su reporte de ingresos diarios. Ningún otro usuario, por más que esté autenticado, puede acceder a esta información.

---

## 🛠️ 4. Administración y Mantenimiento
*   **Administradores Centrales**: Existe un nodo `/admins` que otorga privilegios globales para modificar precios, resetear horarios o bloquear cuentas sospechosas.
*   **Índices de Rendimiento**: Los nodos `reservas`, `vehiculos` y `estadisticas` están indexados por campos clave para asegurar que las consultas de la Cloud Function sean rápidas y económicas.

---
**Chop Code Solutions - Ingeniería de Seguridad v1.3.0**
