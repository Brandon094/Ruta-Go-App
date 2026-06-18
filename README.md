# 🚍 Ruta-Go (Transporte Natagá - La Plata)

**Ruta-Go** es una plataforma tecnológica integral diseñada para optimizar el transporte intermunicipal entre Natagá y La Plata (Huila). La solución conecta de manera eficiente a pasajeros y conductores a través de una arquitectura móvil moderna, reactiva y escalable. ✨

---

## 🚀 Características Principales

### 🚶 Para Pasajeros
- **📅 Consulta en Tiempo Real:** Visualización de horarios y rutas con disponibilidad de asientos actualizada al instante.
- **💺 Mapa Interactivo de Asientos:** Selección precisa de puestos con validación de ocupación en vivo.
- **💬 Chat Directo:** Mensajería bidireccional con el conductor una vez confirmada la reserva.
- **🎫 Tiquete Digital:** Comprobante de viaje detallado accesible desde el historial.
- **⭐ Calificaciones:** Sistema de feedback para evaluar la calidad del servicio del conductor.

### 👨‍✈️ Para Conductores
- **📊 Dashboard Operativo:** Estadísticas diarias de ingresos, reservas confirmadas y ocupación por ruta (Ida y Vuelta).
- **📋 Gestión de Reservas:** Flujo de trabajo ágil para confirmar o cancelar solicitudes de pasajeros.
- **📱 Venta Física:** Posibilidad de bloquear asientos manualmente para pasajeros captados fuera de la app.
- **🔔 Notificaciones Inteligentes:** Sistema de alertas Push para nuevas reservas y mensajes de chat.

---

## 🛠️ Stack Tecnológico e Infraestructura

### **Frontend (Móvil)**
- **Lenguaje:** Java 17 (Toolchain optimizado).
- **Arquitectura:** **MVVM (Model-View-ViewModel)** para una separación clara de responsabilidades.
- **UI:** XML Layouts con **Material Components**, implementando estándares Premium de UX.
- **Reactividad:** Uso extensivo de `LiveData` y `ValueEventListener` para sincronización en tiempo real.

### **Backend (Firebase)**
- **Auth:** Autenticación por Email/Password y **Google One Tap Sign-In**.
- **Realtime Database:** Base de datos NoSQL para sincronización atómica de asientos y mensajería.
- **Cloud Messaging (FCM):** Notificaciones Push con Deep Linking hacia actividades específicas.
- **Cloud Functions:** El "cerebro" de la operación (Node.js). Gestiona la rotación automática de turnos, limpieza de datos y notificaciones masivas programadas.
- **Storage:** Almacenamiento de perfiles y recursos multimedia.
- **Crashlytics:** Monitoreo preventivo de errores en producción.

---

## ⚙️ El Corazón del Sistema: Rotación Automática
Ruta-Go no es solo una base de datos; cuenta con un algoritmo de **Escalafón Ascendente Real** ejecutado mediante Firebase Cloud Functions cada noche a las 7:00 PM (Hora Bogotá).

- **🔄 Rotación de Turnos:** Automatiza el ciclo de 9 días de los conductores (8 días operativos con horarios rotativos y 1 día de descanso).
- **🧹 Limpieza Atómica:** Resetea la disponibilidad de asientos (13 puestos por ruta) y limpia el estado operativo para el día siguiente de forma automática.
- **🔔 Orquestación de Alertas:** Dispara notificaciones personalizadas a los conductores sobre su nuevo estado y alertas masivas a los pasajeros informando que los horarios del nuevo día están listos.

---

## 📌 Arquitectura de Datos: Mapeo Dual
Ruta-Go utiliza una estrategia de **Mapeo Dual Bilingüe**. Los modelos en el código utilizan nombres en inglés (`driverId`, `reservationDate`) mientras mantienen compatibilidad total con los campos históricos en español de la base de datos (`conductorId`, `fechaReserva`) mediante anotaciones `@PropertyName`.

---

## 📂 Estructura del Proyecto

```plaintext
Ruta-Go-App/
├── app/
│   ├── src/main/java/com/chopcode/rutago/app/
│   │   ├── activities/     # 🎨 Controladores de Vista (Login, Dashboards, Chat)
│   │   ├── viewmodels/     # 🧠 Lógica de negocio y gestión de estado
│   │   ├── services/       # 🔧 Orquestadores de Firebase (Auth, Chat, Prices)
│   │   ├── models/         # 📌 POJOs con Mapeo Dual (User, Reservation, Route)
│   │   ├── managers/       # 🛠️ Helpers especializados (Permissions, UI, Analytics)
│   │   └── adapters/       # 🔗 Adaptadores de listas (RecyclerView)
│   └── src/main/res/       # 🖼️ Recursos (Layouts organizados por módulos)
├── DEVELOPER_GUIDELINES.md # 🤖 Manual de Instrucciones para desarrolladores
└── build.gradle            # 📦 Configuración de dependencias y optimización
```

---

## 🤖 Guía para Desarrolladores
Para mantener la integridad del código, el uso de Clean Architecture y la gestión de llaves, consulte obligatoriamente el archivo [DEVELOPER_GUIDELINES.md](./DEVELOPER_GUIDELINES.md).

---

## 📩 Contacto y Soporte
Desarrollado por **Chop Code Solutions**.

- **Desarrollador Lead:** Brandon Daza Cerquera
- **Email:** 📧 [dazace94@gmail.com](mailto:dazace94@gmail.com)
- **GitHub:** 🔗 [Brandon094](https://github.com/Brandon094)

---
*Ruta-Go - Conectando caminos, facilitando viajes.* 🚌💨🎯
