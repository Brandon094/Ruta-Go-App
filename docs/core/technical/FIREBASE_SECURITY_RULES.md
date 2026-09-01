# 🛡️ Manual y Reglas de Seguridad: Firebase Realtime Database (v2.0 NoSQL Normalizado)

Este documento detalla la lógica de gobernanza de datos del ecosistema **Ruta-Go**, garantizando compatibilidad con el esquema NoSQL v2.0 (`/users/`, `/schedules/`, `/vehicles/`, `/reservations/`) y soporte pasivo para nodos legados.

---

## 🏛️ 1. Filosofía de Seguridad (RBAC & Single-User Collection)
El sistema utiliza un modelo de **Control de Acceso basado en Roles** centralizado en `/users/{uid}/role`.

*   **Identidad Obligatoria**: `auth != null` es el requisito base para cualquier operación.
*   **Aislamiento de Perfiles**: Los datos personales están protegidos por el UID del propietario.
*   **Jerarquía de Poder**: Admin Root (`role === "admin"`) > Socio (`role === "owner"`) > Conductor (`role === "driver"`) > Pasajero (`role === "passenger"`).

---

## 📋 2. JSON de Reglas Oficial para Firebase Console

Copia y pega este bloque en la pestaña **Reglas** de tu consola de Firebase Realtime Database:

```json
{
  "rules": {
    "admins": {
      ".read": "auth != null",
      ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
    },
    "dueños": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && ($uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
      }
    },
    "users": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && ($uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
      }
    },
    "usuarios": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && ($uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
      }
    },
    "schedules": {
      ".read": true,
      "$scheduleId": {
        ".write": "auth != null",
        "vehicleId": {
          ".validate": "newData.isString()"
        }
      }
    },
    "horarios": {
      ".read": true,
      "$horarioId": {
        ".write": "auth != null",
        "vehiculoId": {
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
    "disponibilidadAsientos": {
      ".read": true,
      "$horarioId": {
        ".write": "auth != null"
      }
    },
    "reservations": {
      ".read": "auth != null",
      ".indexOn": [
        "driverId",
        "conductorId",
        "scheduleId",
        "userId",
        "usuarioId",
        "reservationDate",
        "fechaReserva"
      ],
      "$reservationId": {
        ".write": "auth != null"
      }
    },
    "reservas": {
      ".read": "auth != null",
      ".indexOn": [
        "driverId",
        "conductorId",
        "scheduleId",
        "userId",
        "usuarioId",
        "reservationDate",
        "fechaReserva"
      ],
      "$reservaId": {
        ".write": "auth != null"
      }
    },
    "vehicles": {
      ".read": "auth != null",
      "$vehicleId": {
        ".write": "auth != null"
      }
    },
    "vehiculos": {
      ".read": "auth != null",
      "$v": {
        ".write": "auth != null"
      }
    },
    "prices": {
      ".read": true,
      ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
    },
    "precios": {
      ".read": true,
      ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('admins').child(auth.uid).exists())"
    },
    "chats": {
      "$reservaId": {
        ".read": "auth != null",
        "messages": {
          ".read": "auth != null",
          "$messageId": {
            ".write": "auth != null"
          }
        },
        "mensajes": {
          ".read": "auth != null",
          "$mensajeId": {
            ".write": "auth != null"
          }
        }
      }
    },
    "driverRatings": {
      ".read": "auth != null",
      "$driverId": {
        "$ratingId": {
          ".write": "auth != null"
        }
      }
    },
    "calificaciones_conductores": {
      ".read": "auth != null",
      "$driverId": {
        "$ratingId": {
          ".write": "auth != null"
        }
      }
    },
    "stats": {
      "$c": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "estadisticas": {
      "$c": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "conductores": {
      ".read": "auth != null",
      "$c": {
        ".write": "auth != null"
      }
    }
  }
}
```

---
**ChopCode Solutions - Ingeniería de Seguridad 2026**
