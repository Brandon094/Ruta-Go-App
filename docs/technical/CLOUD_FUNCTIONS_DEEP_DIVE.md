# 📖 Inmersión Técnica: Firebase Cloud Functions

Este documento detalla la lógica de servidor (Serverless) que automatiza los procesos críticos del Ecosistema Go, garantizando la integridad de los datos y el cumplimiento legal.

---

## 🛠️ 1. Arquitectura de Funciones
Las funciones están implementadas en **Node.js 18+** utilizando el SDK de **Firebase Functions v2**. Se ejecutan en un entorno gestionado por Google Cloud, lo que garantiza alta disponibilidad y escalabilidad automática.

*   **Entorno**: `/firebase_functions`
*   **Lenguaje**: JavaScript (CommonJS).
*   **Triggers**: Programados (Cron Schedules) vía Google Cloud Scheduler.

---

## 🔄 2. Rotación Nocturna Automática (`automatedRotation`)
Es el proceso más crítico del sistema. Se encarga de preparar la logística para el día siguiente.

*   **Ejecución**: Todos los días a las **7:00 PM** (Hora Bogotá).
*   **Lógica de Escalafón**: Implementa un ciclo de 9 días donde los conductores rotan sus horarios. Esto asegura una distribución equitativa de los turnos de mayor demanda.
*   **Reset de Inventario**:
    *   Consulta la capacidad técnica de cada vehículo en el nodo `/vehiculos/`.
    *   Limpia el nodo `/disponibilidadAsientos/` reseteando los ocupados a `null` y los disponibles a la capacidad real del bus.
*   **Notificaciones**:
    *   Envía notificaciones personalizadas a cada conductor informándole si trabaja o descansa.
    *   Despacha un aviso masivo a los pasajeros (en lotes de 500) anunciando la apertura de reservas para el día siguiente.

---

## 🧹 3. Limpieza de Cuentas (`cleanupMarkedAccounts`)
Garantiza el cumplimiento de la Ley de Protección de Datos (Habeas Data) y las políticas de Google Play.

*   **Ejecución**: Todos los domingos a las **3:00 AM**.
*   **Periodo de Gracia**: Solo procesa cuentas que solicitaron el borrado hace más de **30 días**.
*   **Borrado en Cascada**:
    1.  **Vehículo**: Elimina el registro del bus en `/vehiculos/` si el usuario es conductor.
    2.  **Base de Datos**: Remueve el perfil completo del nodo `/usuarios/` o `/conductores/`.
    3.  **Identidad**: Ejecuta el borrado definitivo en **Firebase Auth**. Una vez realizado este paso, el usuario ya no puede iniciar sesión.

---

## 🛡️ 4. Seguridad y Rendimiento
*   **Permisos Administrativos**: Las funciones utilizan `firebase-admin`, lo que les permite saltarse las reglas de seguridad NoSQL para realizar tareas de mantenimiento.
*   **Optimización de Memoria**: Configurado con **256MiB** para manejar el procesamiento de listas de usuarios sin incurrir en costos elevados.
*   **Timezone**: Todas las ejecuciones están ancladas a `America/Bogota` para coincidir con la operación física de los buses.

---

## 📈 5. Monitoreo
Los logs de ejecución pueden consultarse en la **Firebase Console > Functions > Logs**. Se recomienda vigilar los errores de tipo "Error notif", los cuales suelen ocurrir cuando un token FCM ha expirado o el dispositivo ha desinstalado el app.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**
