# 🛡️ Manual y Reglas de Seguridad: Firebase Realtime Database (v2.0 Clean English Schema)

Este documento detalla la lógica de gobernanza de datos y seguridad del ecosistema **Ruta-Go**, configurado exclusivamente para el esquema NoSQL v2.0 en Inglés (`/users/`, `/routes/`, `/schedules/`, `/vehicles/`, `/reservations/`, `/prices/`, `/seatAvailability/`, `/chats/`, `/driverRatings/`, `/stats/`).

---

## 🏛️ 1. Filosofía de Seguridad (RBAC & Single Collection)
El sistema utiliza un modelo de **Control de Acceso basado en Roles** centralizado en el atributo `role` del nodo `/users/{uid}`.

*   **Identidad Obligatoria**: `auth != null` es el requisito base para cualquier operación.
*   **Jerarquía de Roles**: Admin (`role === 'admin'`) > Socio/Dueño (`role === 'owner'`) > Conductor (`role === 'driver'`) > Pasajero (`role === 'passenger'`).
*   **Indexación**: El nodo `/reservations/` incluye índices nativos para acelerar las búsquedas por `driverId`, `scheduleId`, `userId` y `reservationDate`.

---

## 📋 2. Reglas Oficiales para Firebase Console

Copia y pega este JSON en la sección **Reglas** de tu consola de Firebase Realtime Database:

```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && ($uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')"
      }
    },
    "routes": {
      ".read": true,
      ".write": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "schedules": {
      ".read": true,
      "$scheduleId": {
        ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')",
        "driverId": {
          ".write": "auth != null"
        },
        "vehicleId": {
          ".validate": "newData.isString()"
        }
      }
    },
    "seatAvailability": {
      ".read": true,
      "$scheduleId": {
        ".write": "auth != null"
      }
    },
    "reservations": {
      ".read": "auth != null",
      ".indexOn": [
        "driverId",
        "scheduleId",
        "userId",
        "reservationDate"
      ],
      "$reservationId": {
        ".write": "auth != null && (!data.exists() || data.child('userId').val() === auth.uid || data.child('driverId').val() === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')"
      }
    },
    "vehicles": {
      ".read": "auth != null",
      "$vehicleId": {
        ".write": "auth != null && (data.child('ownerId').val() === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')"
      }
    },
    "prices": {
      ".read": true,
      ".write": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "chats": {
      "$reservationId": {
        ".read": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner' || root.child('reservations').child($reservationId).child('userId').val() === auth.uid || root.child('reservations').child($reservationId).child('driverId').val() === auth.uid)",
        "messages": {
          ".read": "auth != null",
          "$messageId": {
            ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner' || root.child('reservations').child($reservationId).child('userId').val() === auth.uid || root.child('reservations').child($reservationId).child('driverId').val() === auth.uid)"
          }
        }
      }
    },
    "driverRatings": {
      ".read": "auth != null",
      "$driverId": {
        "$ratingId": {
          ".write": "auth != null && (!data.exists() || root.child('users').child(auth.uid).child('role').val() === 'admin')"
        }
      }
    },
    "stats": {
      "$driverId": {
        ".read": "auth != null && (auth.uid === $driverId || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')",
        ".write": "auth != null && (auth.uid === $driverId || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'owner')"
      }
    }
  }
}
```

---
**ChopCode Solutions - Seguridad NoSQL v2.0**
