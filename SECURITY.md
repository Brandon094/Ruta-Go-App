# 🛡️ Marco de Seguridad y Gobernanza de Datos – Ruta-Go

#### Versión: 1.2.3 Stable | Última actualización: Mayo 24, 2026

En **Chop Code Solutions**, aplicamos un enfoque de **Seguridad por Diseño** para proteger la integridad de la plataforma Ruta-Go y la privacidad de sus usuarios. Este documento detalla las capas de protección técnica y legal implementadas.

---

## 🔒 1. Capas de Seguridad Técnica

### 1.1 Seguridad a Nivel de Aplicación (Client-Side)
*   **Ofuscación y Minificación (R8/ProGuard)**: El código fuente es transformado en binarios ofuscados antes de su distribución. Esto protege la propiedad intelectual y dificulta el análisis mediante ingeniería inversa.
*   **Integridad de Firma**: Solo los paquetes firmados con la `key.jks` oficial pueden interactuar con los servicios cloud en modo producción.
*   **Permisos Dinámicos**: Implementación del modelo de permisos de Android 13+ (Granular Permissions) para notificaciones y almacenamiento.

### 1.2 Seguridad a Nivel de Datos (Cloud-Side)
*   **Reglas de Seguridad NoSQL**: Firebase Realtime Database utiliza reglas declarativas que validan el `auth.uid` en cada transacción.
    *   *Conductores*: Solo el dueño del perfil puede modificar sus datos financieros e itinerarios.
    *   *Pasajeros*: Privacidad absoluta en el historial de viajes.
*   **Transaccionalidad Atómica**: Uso de `runTransaction()` para prevenir condiciones de carrera (Race Conditions) en la reserva de asientos y gestión de cupos.
*   **Cifrado en Tránsito**: Todas las comunicaciones entre el dispositivo móvil y los servidores de Firebase están cifradas mediante protocolos **SSL/TLS**.

---

## 👤 2. Privacidad y Tratamiento de Información

### 2.1 Cumplimiento Legal (Colombia)
Ruta-Go cumple estrictamente con la **Ley 1581 de 2012 (Habeas Data)**. El usuario es el único dueño de su información y el sistema actúa como procesador de datos para fines logísticos de transporte.

### 2.2 Datos Recolectados y Propósito
| Dato | Naturaleza | Propósito |
|:---|:---|:---|
| **Identidad (Google/Email)** | Personal | Autenticación y prevención de fraude. |
| **Teléfono Celular** | Sensible | Coordinación logística entre conductor y pasajero. |
| **Ficha Técnica Vehicular** | Operativo | Seguridad del pasajero y cumplimiento de capacidad. |
| **Ingresos Financieros** | Sensible | Reporte exclusivo para el conductor propietario. |

---

## ⚖️ 3. Gobernanza y Derechos del Usuario

*   **Acceso y Rectificación**: Los usuarios pueden actualizar sus datos en tiempo real mediante los módulos de perfil.
*   **Derecho al Olvido (Eliminación)**: El sistema provee una función de **"Eliminar Cuenta"** que ejecuta un borrado físico de la identidad en Firebase Auth y la metadata asociada en Realtime Database.
*   **Segregación de Roles**: Un pasajero nunca podrá acceder a funciones de conductor, y un conductor no podrá suplantar identidades de pasajeros.

---

## 📧 4. Reporte de Incidentes
Chop Code Solutions mantiene una política de puertas abiertas para investigadores de seguridad. Si detecta una vulnerabilidad, por favor notifique a:

📧 **dazace94@gmail.com**

---
© 2026 **Chop Code Solutions** - Ruta-Go App.
*Engineering for a safer journey.*
