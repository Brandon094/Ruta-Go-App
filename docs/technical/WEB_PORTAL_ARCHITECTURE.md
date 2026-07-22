# 🖥️ Arquitectura del Portal Web Admin

Este documento detalla la estructura y el flujo de datos del **Ruta-Go Admin Portal**, la herramienta centralizada para la gestión operativa del ecosistema Go.

---

## 🏗️ 1. Stack Tecnológico
El portal web está construido bajo una arquitectura de **Single Page Application (SPA)** moderna:

*   **Framework**: [React 18](https://react.dev/) con [Vite](https://vitejs.dev/) (Build tool de alto rendimiento).
*   **Estilos**: [Tailwind CSS 3](https://tailwindcss.com/) (Diseño basado en utilidades).
*   **Iconografía**: [Lucide React](https://lucide.dev/).
*   **Backend-as-a-Service**: Firebase Web SDK v10.

---

## 🛰️ 2. Integración con el Ecosistema
El portal se conecta directamente al mismo proyecto de Firebase que la App de Android, compartiendo la base de datos en tiempo real:

1.  **Firebase Auth**: Utiliza el sistema de identidad único. Solo usuarios con acceso administrativo pueden visualizar datos.
2.  **Realtime Database (RTDB)**: Escucha cambios en los nodos `/usuarios/`, `/conductores/` y `/vehiculos/` para actualizaciones sin refrescar la página.

---

## 🔐 3. Seguridad y Acceso
El acceso está restringido mediante un flujo de autenticación:
*   **Pantalla de Login**: Requiere correo corporativo y contraseña.
*   **Persistencia**: La sesión se mantiene mediante `onAuthStateChanged`.
*   **Protección de Datos**: Los componentes de monitoreo solo se renderizan si existe una sesión activa y válida.

---

## 📊 4. Módulos Operativos (V1.0)
### A. Panel de Control (Overview)
Visualización de KPIs críticos:
*   Contador total de usuarios registrados.
*   Conteo de conductores en estado `active`.
*   Inventario total de vehículos en flota.

### B. Gestión de Conductores
Directorio detallado de operadores que incluye:
*   Estado operativo (Operando vs Descanso).
*   Vinculación de placa de vehículo.
*   Visualización de horarios asignados para la jornada actual.

---

## 📂 5. Estructura de Archivos
Ubicación: `/web_portal/src/`

*   `firebase.js`: Configuración de conexión y exportación de servicios (auth, db).
*   `Login.jsx`: Interfaz de acceso administrativo.
*   `App.jsx`: Orquestador de rutas, estados globales y visualización de datos.

---
**Chop Code Solutions - Ingeniería Web 2026**
