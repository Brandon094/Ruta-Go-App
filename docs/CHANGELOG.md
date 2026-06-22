# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.3] - 2026-05-24 (Stable Gold Master)
### Añadido
- **Tutorial Interactivo Hub**: Sistema de guías paso a paso para pasajeros y conductores.
- **Feedback de Cierre**: Tarjetas visuales de "Jornada Completada" y "Misión Cumplida".
- **Símbolos de Depuración**: Inclusión de símbolos nativos para mejor análisis de crashes en Play Console.

### Cambiado
- **Reactividad Total**: Refactorización de ViewModels para usar listeners permanentes en tiempo real.
- **Optimización de SDK**: Actualización a targetSdkVersion 35 (Android 15).
- **Estructura Documental**: Creación de la biblioteca técnica en `/docs/`.

---

## [1.2.2] - 2026-05-24
### Cambiado
- Ajuste de targetSdkVersion a 35 para cumplimiento con políticas de Google Play.
- Incremento de versionCode para despliegue.

---

## [1.2.1] - 2026-05-23
### Añadido
- **Registro Autónomo de Conductores**: Los choferes ahora pueden registrarse, subir su vehículo y elegir horarios sin intervención administrativa.
- **Sanity Check**: Capa lógica para filtrar conductores inexistentes en la planilla de horarios.

### Corregido
- Error de "Shimmer Infinito" en el perfil de conductores.
- Sincronización de capacidad de asientos al registrar nuevos vehículos.

---

## [1.2.0] - 2026-05-15
### Añadido
- **Segregación de Roles**: División física de los nodos `/usuarios/` y `/conductores/` en Firebase.
- **Login Inteligente**: Detección automática de rol tras autenticación con Google.

---

## [1.1.0] - 2026-03-10
### Añadido
- **Mapa de Asientos Interactivo**: Primera versión del motor de selección de puestos para pasajeros.
- **Venta Física**: Botón de bloqueo de asientos para conductores.
- **Tarifas Dinámicas**: Gestión de precios desde Firebase Realtime Database.

---

## [1.0.0] - 2025-05-01
### Añadido
- Lanzamiento inicial de la plataforma Ruta-Go.
- Consulta de horarios y trayectos básicos.
- Autenticación con correo y contraseña.

---
**Chop Code Solutions - Evolucionando el transporte regional.**
