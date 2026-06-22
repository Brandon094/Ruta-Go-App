# 📋 Especificación de Requisitos - Ruta-Go v1.2.3

Este documento detalla los requisitos funcionales, no funcionales y las reglas de negocio que rigen el funcionamiento de la plataforma Ruta-Go.

---

## 👥 1. Actores del Sistema
*   **Pasajero:** Usuario final que consulta rutas, reserva asientos y gestiona sus viajes.
*   **Conductor:** Usuario operativo que registra su vehículo, gestiona la ocupación y supervisa sus finanzas.
*   **Administrador:** Usuario con privilegios para definir horarios maestros y ajustar tarifas globales.

---

## 🛠️ 2. Requisitos Funcionales (RF)

### 2.1 Módulo de Identidad y Acceso
*   **RF-01:** El sistema permitirá el registro e inicio de sesión mediante correo/contraseña y Google One Tap.
*   **RF-02:** El sistema debe identificar automáticamente el rol del usuario (Pasajero/Conductor) sin intervención manual.
*   **RF-03:** Los datos de conductores y pasajeros deben estar físicamente segregados en la base de datos.

### 2.2 Gestión de Conductores y Vehículos
*   **RF-04:** Los conductores podrán realizar un registro autónomo incluyendo datos personales y técnicos del vehículo.
*   **RF-05:** El sistema debe vincular un vehículo único a cada conductor mediante su placa.
*   **RF-06:** Los conductores deben seleccionar su agenda operativa (Ida y Vuelta) al momento del registro.

### 2.3 Sistema de Reservas (Pasajero)
*   **RF-07:** El sistema permitirá visualizar horarios en tiempo real filtrando los que ya han pasado.
*   **RF-08:** El pasajero podrá seleccionar un asiento específico mediante un mapa interactivo.
*   **RF-09:** Las reservas deben ser atómicas para evitar que dos usuarios tomen el mismo asiento simultáneamente.
*   **RF-10:** El sistema debe generar un tiquete digital tras la confirmación de la reserva.

### 2.4 Panel Operativo (Conductor)
*   **RF-11:** El conductor podrá visualizar sus ingresos acumulados y ocupación diaria con animaciones en tiempo real.
*   **RF-12:** El conductor podrá bloquear asientos manualmente (Venta Física) para pasajeros externos a la plataforma.
*   **RF-13:** El sistema permitirá confirmar o cancelar solicitudes de pasajeros directamente desde el dashboard.

### 2.5 Comunicación y Feedback
*   **RF-14:** El sistema habilitará un chat bidireccional solo cuando exista una reserva confirmada.
*   **RF-15:** El sistema debe mostrar tutoriales interactivos paso a paso en el primer acceso a módulos clave.
*   **RF-16:** El sistema debe notificar visualmente el fin de la jornada ("Misión Cumplida" / "Jornada Completada").

---

## ⚡ 3. Requisitos No Funcionales (RNF)
*   **RNF-01 (Latencia):** Las actualizaciones de disponibilidad de asientos deben reflejarse en menos de 500ms en todos los dispositivos conectados.
*   **RNF-02 (Seguridad):** Los datos financieros de los conductores deben ser inaccesibles para cualquier otro usuario mediante reglas de Firebase.
*   **RNF-03 (Disponibilidad):** El sistema debe estar operativo 24/7, con un proceso de mantenimiento automatizado a las 7:00 PM.
*   **RNF-04 (Usability):** La interfaz debe seguir las guías de Material Design 3 y soportar temas Claro y Oscuro.
*   **RNF-05 (Performance):** El app debe pesar menos de 40MB en su instalación base para facilitar la descarga en zonas rurales.

---

## ⚖️ 4. Reglas de Negocio (RN)
*   **RN-01 (Reset Global):** Todos los horarios se habilitan para el día siguiente automáticamente tras el proceso de las 7:00 PM.
*   **RN-02 (Capacidad Técnica):** El mapa de asientos del horario debe coincidir estrictamente con la capacidad registrada en la ficha técnica del vehículo del conductor asignado.
*   **RN-03 (Sanity Check):** Un horario sin conductor válido asignado debe mostrarse como "(Libre)" y bloquear el flujo de reserva.
*   **RN-04 (Privacidad):** Un pasajero no podrá ver el nombre ni el teléfono de otro pasajero en el mapa de asientos.

---
**Chop Code Solutions - Documentación v1.2.3**
