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
*   **Propiedad Blindada**: La escritura en un vehículo está permitida bajo una jerarquía triple:
    1. El **Dueño** (`ownerId`) puede gestionar su activo desde la web.
    2. El **Conductor** (`driverId` / `conductorId`) puede actualizar datos técnicos desde la App móvil.
    3. El **Admin Root** tiene control total.
*   **Indexación**: Nodo indexado por `driverId` y `ownerId` para consultas eficientes.

### 🕒 Gestión de Horarios (/horarios)
*   **Visibilidad**: Lectura pública para permitir la consulta de rutas.
*   **Asignación Inteligente**: El Admin Root y los **Dueños** tienen permiso de escritura para asignar conductores y vincular vehículos a turnos específicos.
*   **Auto-asignación**: Se mantiene la capacidad de los conductores de auto-asignarse a turnos libres.

### 💺 Motor de Disponibilidad (/disponibilidadAsientos)
*   **Inicialización y Operación**: Los Dueños, el Admin y los **Pasajeros** tienen permiso de escritura (`.write: "auth != null"`) para permitir transacciones de reserva y bloqueos manuales.
*   **Blindaje de Infraestructura**: Solo el Admin Root o el Dueño/Conductor asignado pueden modificar el campo `totalAsientos` (capacidad técnica del vehículo), protegiendo al sistema de alteraciones fraudulentas.

### 🎫 Reservas y Privacidad (/reservas)
*   **Paridad de Identidad**: El sistema soporta los campos `userId` y `usuarioId` de forma intercambiable para garantizar la visibilidad del historial entre la App Android y el Portal Web.
*   **Validación Cruzada**: El acceso a una reserva requiere que el `auth.uid` sea del Pasajero, el Conductor asignado, el Dueño del bus o el Admin.

### 💬 Mensajería Instantánea (/chats)
*   **Privacidad Contextual**: El acceso de lectura y escritura está restringido a los participantes directos de la reserva (`userId`/`usuarioId` o `driverId`/`conductorId`).
*   **Mediación**: El Admin Root y los Dueños de la flota asignada tienen permisos de lectura para soporte y mediación logística.

### ⭐ Reputación y Feedback (/calificaciones_conductores)
*   **Transparencia**: Lectura pública para usuarios autenticados para fomentar la confianza en el ecosistema.
*   **Integridad de Reseña**: La escritura es atómica y no permite ediciones (`!data.exists()`). Soporta validación dual de identidad (`userId` / `usuarioId`). Solo el pasajero titular de la reserva puede generar la calificación.

### 📊 Protección Financiera (/estadisticas)
Nodo de máxima sensibilidad. El acceso de lectura está filtrado lógicamente:
*   **Conductores**: Solo ven su estadística personal diaria.
*   **Dueños / Admins**: Acceso administrativo total sobre los nodos de su flota para contabilidad en tiempo real.

---
**ChopCode Solutions - Ingeniería de Seguridad 2026**
