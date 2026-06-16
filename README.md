# 🚍 RutaGo

**Ruta-Go** es una aplicación que mejora la experiencia de pasajeros y conductores en la ruta Natagá - La Plata y viceversa. ✨

Esta versión reducida permite a los usuarios:
- 📆 Visualizar los horarios disponibles en ambas direcciones (Natagá - La Plata y La Plata - Natagá).
- 🎟️ Realizar reservas de puestos.

⚠️ **Nota:** La funcionalidad de pago en línea no se ha implementado aún, pero está prevista para futuras versiones. Además, los conductores pueden ver las reservas de puestos y consultar sus ingresos diarios. 💰

## 🚀 Características

- **📅 Visualización de Horarios:**
  - Consulta de horarios disponibles para los viajes en ambas direcciones.
- **🪑 Reserva de Puestos:**
  - Los pasajeros pueden reservar un asiento para un viaje específico.
- **👨‍✈️ Gestión para Conductores:**
  - Los conductores pueden revisar las reservas realizadas y ver los ingresos diarios.
- **💳 Funcionalidad Pendiente:**
  - La opción de pago en línea aún no se implementa.

## 📌 Modelos Principales

- **👤 User (Pasajero y Conductor):**
  - Representa la información de los usuarios, con dos roles:
    - **🚶 Pasajero**
    - **👨‍✈️ Conductor**
- **🛣️ Ruta y Horario:**
  - Define los trayectos (Natagá - La Plata y La Plata - Natagá) y los horarios correspondientes.
- **📄 Reserva:**
  - Captura la información de la reserva de un puesto, vinculando al usuario, horario, conductor y vehículo.
- **🎫 Disponibilidad de Asientos:**
  - Gestiona la capacidad total y la cantidad de asientos disponibles para cada horario.
- **🚐 Vehículo:**
  - Registra la información del vehículo asignado al conductor, como placa, modelo y capacidad.

## 🛠️ Tecnologías Utilizadas

- **🖥️ Lenguaje:** Java
- **📱 Plataforma:** Android Studio
- **☁️ Backend:** Firebase (para autenticación, base de datos y otros servicios)

## 📂 Estructura del Proyecto

```plaintext
Transporte-Nataga---La-Plata/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/chopcode/transportenataga_laplata/
│   │   │   │   ├── models/         # 📌 Modelos: User, Pasajero, Conductor, Ruta, Horario, Reserva, DisponibilidadAsientos, Vehiculo
│   │   │   │   ├── activities/     # 🎨 Interfaces gráficas y actividades
│   │   │   │   ├── services/       # 🔧 Lógica de negocio y servicios
│   │   │   └── res/                # 🖼️ Recursos (layouts, imágenes, etc.)
├── README.md
└── build.gradle
```

## 📌 Uso

### 🚶 Para Pasajeros
1. Inicia sesión.
2. Consulta los horarios disponibles.
3. Reserva tu puesto para el viaje deseado.

### 👨‍✈️ Para Conductores
1. Inicia sesión.
2. Accede a la sección de gestión.
3. Consulta las reservas realizadas y los ingresos diarios.

## 📩 Contacto

Para cualquier consulta o sugerencia, contacta a 📧 [dazace94@gmail.com](mailto:dazace94@gmail.com) o visita mi perfil de GitHub: 🔗 [Brandon094](https://github.com/Brandon094).
