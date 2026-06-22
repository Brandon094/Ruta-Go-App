# 🚍 Ruta-Go (Transporte Natagá - La Plata) | v1.2.1 Stable 🚀

**Ruta-Go** es una plataforma tecnológica de vanguardia diseñada para profesionalizar y optimizar el transporte intermunicipal en la región del Huila. Conectamos a pasajeros y conductores a través de una arquitectura **100% reactiva**, garantizando fiabilidad en los horarios y transparencia en la gestión de cupos. ✨

---

## 🌟 Características Destacadas (v1.2.1)

### 🚶 Experiencia del Pasajero
- **📅 Itinerario Inteligente:** Visualización en tiempo real de rutas con detección automática de "Próximo Viaje" y horarios pasados.
- **💺 Reserva Atómica:** Mapa interactivo de asientos con sincronización instantánea para evitar duplicidad de puestos.
- **💰 Tarifas Dinámicas:** Precios gestionados desde la nube (Firebase Remote) con formatos financieros profesionales (COP).
- **🏁 Feedback de Cierre:** Notificaciones visuales de "Jornada Completada" tras el último despacho del día.
- **🎓 Onboarding Guiado:** Tutorial animado para nuevos usuarios sobre el proceso de reserva y seguridad.

### 👨‍✈️ Centro de Control del Conductor
- **📝 Registro Autónomo:** Alta técnica de conductor y vehículo (Placa, Modelo, Capacidad) sin intervención administrativa.
- **🕒 Autogestión de Agenda:** Selección manual de turnos de ida y vuelta durante el registro o edición de perfil.
- **📊 Dashboard Pro:** Estadísticas financieras y operativas con animaciones numéricas para ingresos y ocupación real.
- **📱 Venta Física:** Motor de bloqueo manual de asientos para pasajeros captados fuera de la plataforma.
- **🏆 Misión Cumplida:** Feedback especializado al finalizar los recorridos asignados del día.

---

## 🛠️ Stack Tecnológico e Infraestructura

### **Frontend & Arquitectura**
- **Lenguaje:** Java 17 (Toolchain Pro).
- **Arquitectura:** **MVVM (Model-View-ViewModel)** robusto y reactivo.
- **UI/UX:** Material Components 3, animaciones de entrada premium y soporte **DayNight (Claro/Oscuro)** total.
- **Reactividad:** Implementación estricta de `LiveData` y `ValueEventListener` para una UX sin recargas manuales.

### **Backend (Firebase Ecosystem)**
- **Realtime Database:** Base de datos NoSQL segregada por roles para máxima seguridad y velocidad.
- **Cloud Functions:** Automatización del escalafón ascendente y reset global de las 7:00 PM.
- **FCM:** Notificaciones push contextuales vinculadas al estado de la reserva y chats activos.
- **Sanity Check:** Capa lógica que filtra automáticamente "Conductores Fantasmas" para mantener la integridad del itinerario.

---

## ⚙️ El Corazón del Sistema: Integridad y Segregación
Ruta-Go v1.2.1 implementa una **Segregación Total de Roles**. Los datos de pasajeros (`/usuarios/`) y conductores (`/conductores/`) residen en nodos independientes, protegidos por reglas de seguridad de Firebase que garantizan la privacidad financiera de los choferes y la integridad de las reservas de los clientes.

---

## 📂 Documentación Detallada (Biblioteca Técnica)

| Documento | Propósito |
|:---|:---|
| [**📖 Documentación Integral**](./DOCUMENTACION.md) | Guía maestra y enciclopedia central del proyecto. |
| [**🤖 Manual de Desarrollo**](./DEVELOPER_GUIDELINES.md) | Reglas de oro, estándares de código y branding. |
| [**🗺️ Arquitectura de Módulos**](./ARCHITECTURE_MODULES.md) | Mapa técnico de flujos de datos e interfaces. |
| [**🏁 Plan de Pruebas**](./RELEASE_TESTING_PLAN.md) | Protocolo de QA para certificación de estabilidad. |
| [**🚀 Roadmap**](./ROADMAP.md) | Hoja de ruta: Pagos, Puntos Go y Encomiendas. |

---

## 📩 Contacto y Soporte
Desarrollado por **Chop Code Solutions**.

- **Desarrollador Lead:** Brandon Daza Cerquera
- **Email:** 📧 [dazace94@gmail.com](mailto:dazace94@gmail.com)
- **GitHub:** 🔗 [Brandon094](https://github.com/Brandon094)

---
*Ruta-Go - Conectando caminos, facilitando viajes.* 🚌💨🎯
