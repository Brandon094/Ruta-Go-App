# 🔔 Guía de Integración: Firebase Cloud Messaging (FCM) v1.9.9.5

Este documento detalla la implementación del sistema de notificaciones push del Ecosistema Go, utilizando el estándar **FCM v1** para una comunicación segura y reactiva entre pasajeros, conductores y el servidor.

---

## 🏗️ 1. Arquitectura de Notificaciones
El sistema utiliza un modelo híbrido de despacho de mensajes:
1.  **Client-to-Client (C2C)**: Utilizado para notificaciones de Chat y Solicitudes de Reserva entre el App Nativa.
2.  **Server-to-Client (S2C)**: Cloud Functions en Node.js despachan mensajes masivos (ej: Apertura de jornada a las 7:00 PM).
3.  **Web-to-Client**: El Portal Web (v1.9.0+) tiene la capacidad de disparar notificaciones de confirmación de reserva directamente a los dispositivos móviles.

### Componentes Clave:
*   **`NotificationManager`**: Clase en la App Android encargada de orquestar los Access Tokens y el Payload JSON.
*   **`NotificationService`**: Servicio de fondo (Service) que intercepta los mensajes y gestiona el **Deep Linking**.

---

## 📨 2. Tipos de Notificación y Payloads

El sistema diferencia las acciones mediante el campo `type` en el mapa de datos (`data`):

| Tipo (`type`) | Origen | Destino | Acción |
|:---|:---|:---|:---|
| `nueva_reserva` | Pasajero | Conductor | Notificación de nuevo pasajero. |
| `reserva_confirmada`| Conductor | Pasajero | Aviso de tiquete aprobado. |
| `chat_message` | Ambos | Contraparte | Mensajería instantánea en vivo. |
| `ROTACION_NOTIFICACION` | Servidor | Conductor | Aviso de nuevos turnos asignados. |

---

## 🔗 3. Motor de Deep Linking
El `NotificationService` realiza una resolución dinámica de la pantalla:
1.  **Mapeo**: Convierte el string `target_activity` (ej: "chat") en la clase de destino correspondiente.
2.  **Transmisión**: Los datos extra (ej: `idReservation`) se inyectan en el Intent para que la vista cargue la data sin intervención del usuario.

---

## 🛡️ 4. Estándares Visuales y Prioridad
*   **Marca**: Color naranja corporativo (`#FF7A1A`) e icono oficial en la barra de notificaciones.
*   **Urgencia**: Los mensajes de conductores y reservas utilizan canales de **Alta Prioridad** para asegurar la entrega inmediata incluso en modo "Ahorro de batería".

---

## 🛠️ 5. Blindaje en Producción (ProGuard)
Es obligatorio mantener estas reglas para asegurar el funcionamiento del cliente OAuth2 en versiones firmadas (Release):

```proguard
# Google Auth & FCM v1 Client
-keep class com.google.auth.** { *; }
-keep class com.google.api.client.** { *; }
-dontwarn com.google.auth.**
```

---
**Chop Code Solutions - Mobile Engineering 2026**
