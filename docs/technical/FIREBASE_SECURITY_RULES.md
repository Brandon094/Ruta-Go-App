# 🛡️ Manual de Seguridad: Firebase Realtime Database (v1.5.0)

Este documento detalla la lógica de gobernanza de datos del ecosistema **Ruta-Go**, asegurando la privacidad del usuario, el aislamiento comercial entre socios y el cumplimiento con la Ley de Habeas Data.

---

## 🏛️ 1. Filosofía de Seguridad (RBAC)
El sistema utiliza un modelo de **Control de Acceso basado en Roles** y **UID-Locking**.

*   **Identidad Obligatoria**: `auth != null` es el requisito base.
*   **Aislamiento de Perfiles**: Los datos personales están bloqueados por el UID del propietario.
*   **Jerarquía de Poder**: Admin Root > Dueño de Flota (Socio) > Operador (Conductor) > Pasajero.

---

## 🔐 2. Análisis de Nodos Críticos

### 👥 Perfiles y Búsqueda (/usuarios)
*   **Lectura Expandida**: A partir de v1.5.0, tanto **Admins** como **Dueños** pueden leer la lista de usuarios.
    *   *Propósito*: Permitir la búsqueda de conductores por Email para vincularlos a vehículos desde el portal web.
*   **Escritura Restringida**: Solo el Admin Root o el propio Usuario pueden modificar los datos del perfil.

### 💼 Gestión de Socios (/dueños)
*   **Activación**: Solo el Admin Root tiene permiso de escritura (`.write`) para otorgar el rango de Socio a un UID.
*   **Verificación**: El portal web consulta este nodo para renderizar el Dashboard de Negocios o denegar el acceso.

### 🚗 Control de Activos (/vehiculos)
*   **Propiedad Blindada**: La escritura en un vehículo está permitida solo si:
    1. El `ownerId` del vehículo coincide con el `auth.uid` del solicitante.
    2. El usuario es un Admin Root.
*   **Indexación**: Nodo indexado por `driverId` y `ownerId` para consultas eficientes.

### 🕒 Gestión de Horarios (/horarios)
*   **Visibilidad**: Lectura pública para permitir la consulta de rutas.
*   **Asignación**: Un conductor o dueño solo puede escribir en el campo `conductorId` si el turno está vacío o si ya les pertenece.

### 🎫 Reservas y Privacidad (/reservas)
*   **Aislamiento de Ocupación**: En el portal web, un Dueño solo ve la ocupación detallada de sus propios vehículos. Para vehículos de terceros, la información se anonimiza.
*   **Validación Cruzada**: El acceso a una reserva requiere que el `auth.uid` sea del Pasajero, el Conductor asignado, el Dueño del bus o el Admin.

---

## 📊 3. Protección Financiera (/estadisticas)
Nodo de máxima sensibilidad. El acceso de lectura está filtrado lógicamente:
*   **Conductores**: Solo ven su estadística personal.
*   **Dueños**: Ven el agregado de sus vehículos mediante la validación de propiedad en el servidor.
*   **Admin Root**: Visión global del Holding.

---
**ChopCode Solutions - Ingeniería de Seguridad 2026**
