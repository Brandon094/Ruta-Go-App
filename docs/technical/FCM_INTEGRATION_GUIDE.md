# 🔔 Guía de Integración: Firebase Cloud Messaging (FCM)

Este documento detalla la implementación del sistema de notificaciones push de Ruta-Go, utilizando el estándar **FCM v1** para una comunicación segura y reactiva entre pasajeros, conductores y el servidor.

---

## 🏗️ 1. Arquitectura de Notificaciones
El sistema utiliza un modelo híbrido de despacho de mensajes:
1.  **Client-to-Client (C2C)**: El app envía notificaciones directamente (ej: Chat o Solicitud de Reserva) utilizando una `Service Account` para autenticación OAuth2.
2.  **Server-to-Client (S2C)**: Cloud Functions despachan mensajes masivos o programados (ej: Rotación nocturna).

### Componentes Clave:
*   **`NotificationManager`**: Orquestador en el cliente encargado de generar Access Tokens y construir el Payload JSON v1.
*   **`NotificationService`**: Servicio de fondo que intercepta los mensajes, gestiona el **Deep Linking** y muestra la notificación física.
*   **`service-account.json`**: Llave de seguridad alojada en `assets/` (solo para entorno de desarrollo/privado) que permite al app actuar como administrador de FCM.

---

## 📨 2. Tipos de Notificación y Payloads

El sistema diferencia las acciones mediante el campo `type` en el mapa de datos (`data`):

| Tipo (`type`) | Origen | Destino | Actividad Destino |
|:---|:---|:---|:---|
| `nueva_reserva` | Pasajero | Conductor | `DriverHomeActivity` |
| `reserva_confirmada`| Conductor | Pasajero | `ReservationHistoryActivity` |
| `reserva_cancelada` | Conductor | Pasajero | `ReservationHistoryActivity` |
| `chat_message` | Ambos | Contraparte | `ChatActivity` |
| `ROTACION_NOTIFICACION` | Servidor | Conductor | `DriverHomeActivity` |
| `HORARIOS_DISPONIBLES` | Servidor | Pasajeros | `PassengerHomeActivity` |

---

## 🔗 3. Motor de Deep Linking
El `NotificationService` realiza una resolución dinámica de la pantalla a abrir cuando el usuario toca la notificación:

1.  **Extracción**: Recupera el campo `target_activity` del payload.
2.  **Mapeo**: Convierte el string (ej: "chat") en una clase de Java (`ChatActivity.class`).
3.  **Inyección**: Pasa todos los datos extra (ID de reserva, nombres, etc.) al `Intent` para que la pantalla de destino cargue la información correcta de inmediato.

---

## 🔑 4. Gestión de Tokens FCM
Para que un mensaje llegue, el sistema debe conocer el "Token de Registro" del dispositivo:
*   **Generación**: Se realiza automáticamente al iniciar el app o en el registro.
*   **Sincronización**: El método `saveFCMTokenToRealtimeDatabase` guarda el token en el nodo `/usuarios/$uid/tokenFCM` o `/conductores/$uid/tokenFCM`.
*   **Actualización**: El método `onNewToken` en el servicio garantiza que si Google cambia el token, la base de datos se actualice al instante.

---

## 🛡️ 5. Estándares Visuales Premium
Para mantener la identidad visual de Ruta-Go, las notificaciones se configuran con:
*   **Color**: Naranja corporativo (`primary_500`).
*   **Iconografía**: Icono minimalista de campana y el logo oficial en grande.
*   **Prioridad**: Canal de "Alta Prioridad" con vibración y sonido activados por defecto para asegurar la atención del conductor.

---
**Chop Code Solutions - Ingeniería de Comunicaciones v1.3.0**
