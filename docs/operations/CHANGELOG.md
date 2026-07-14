# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] - 2026-07-13 (Android 15 Optimized Edition)
### Añadido
- **Soporte Android 15 (SDK 35)**: Cumplimiento total con las nuevas políticas de Google Play.
- **Experiencia Edge-to-Edge**: Implementación de pantalla de borde a borde para una interfaz moderna y fluida.
- **Alineación de 16 KB**: Soporte técnico para dispositivos de última generación (procesadores de alto rendimiento).
- **Cumplimiento AD_ID**: Bloqueo explícito del ID de publicidad para máxima privacidad del usuario.

### Corregido
- Error de autenticación Google Login (Error 10 [28444]) mediante forzado de WebClientID.
- Avisos de APIs obsoletas para la gestión de ventanas y barras de sistema.

---

## [1.2.3] - 2026-05-24 (Stable Gold Master)
### Añadido
- **Tutorial Interactivo Hub**: Sistema de guías paso a paso centralizado para pasajeros y conductores.
- **Rescate de Cuenta**: Flujo de reactivación automática si el usuario intenta ingresar durante el periodo de gracia de borrado.
- **Borrado Automatizado (Gracia 30 días)**: Implementación de limpieza mensual programada (Domingos 3:00 AM) mediante Firebase Cloud Functions.
- **Símbolos de Depuración**: Inclusión de símbolos nativos para mejor análisis de crashes en Play Console.

### Cambiado
- **Arquitectura de Motores**: Desacoplamiento de lógica pesada en `Seat Engine` y `Reservation Engine`.
- **Refactor de Managers**: Reorganización jerárquica en `/core` (Sistema) y `/ui` (Interfaz).
- **Estandarización Técnica**: Unificación de nomenclatura en inglés para Adapters y carpetas del proyecto.
- **Seguridad de API**: Implementación de restricciones granulares para 9 APIs críticas de Google Cloud y Firebase.
- **Reactividad Total**: Refactorización de ViewModels para usar listeners permanentes en tiempo real.
- **Optimización de SDK**: Actualización a targetSdkVersion 35 (Android 15).

### Corregido
- Bloqueo de UI (Spinner infinito) durante la reactivación de cuentas en el Login.
- Error de validación de reglas de Firebase al intentar escribir tokens FCM en nodos cruzados.
- Sincronización de capacidad de asientos al registrar nuevos vehículos.

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
