# 📋 Especificación de Requisitos - Ecosistema Go v1.5.0 Ecosystem

Este documento detalla los requisitos funcionales y no funcionales de la suite tecnológica de ChopCode Solutions, incluyendo el ecosistema móvil y web.

---

## 🛠️ 1. Requisitos de Integración (Suite)
*   **RF-S01 (SSO):** Acceso unificado a todas las plataformas mediante Firebase Auth.
*   **RF-S02 (Web Hub):** Portal centralizado para gestión administrativa, legal y comercial (Landing Page).
*   **RF-S03 (RBAC):** Control de acceso basado en roles (Admin, Dueño, Conductor, Pasajero) sincronizado entre móvil y web.

---

## 🚌 2. Requisitos Ruta-Go (Movilidad & Negocios)
*   **RF-R01 (Reserva Atómica):** Transaccionalidad de asientos con latencia ultra-baja en Realtime Database.
*   **RF-R02 (Portal Business):** Interfaz para Dueños de Flota con monitoreo de activos, conductores e ingresos en tiempo real.
*   **RF-R03 (Aislamiento de Datos):** Los dueños solo pueden visualizar información financiera y operativa de sus vehículos vinculados (`ownerId`).
*   **RF-R04 (Loyalty Engine):** Acumulación y redención de Puntos Go gestionada desde el perfil del usuario.
*   **RF-R05 (Habeas Data):** Flujo automatizado de borrado de cuenta en 30 días, accesible desde App y Web.

---

## 🌎 3. Requisitos Portal Web (Dashboard & Landing)
*   **RF-W01 (Gestión de Identidad):** Los administradores pueden moderar pasajeros (Ban/Inactivar/Borrar) y los dueños vincular conductores mediante búsqueda por Email.
*   **RF-W02 (Responsive Design):** Interfaz adaptativa que garantiza funcionalidad 100% en dispositivos móviles y PC, con navegación especializada por rol.
*   **RF-W04 (Vinculación Root):** El Administrador Root puede asignar conductores a dueños de flota específicos mediante un selector de socios aprobados.
*   **RF-W05 (Gestión de Precios):** El Administrador Root puede modificar los precios de los pasajes por ruta, sincronizando el cambio con la App móvil y el motor de reservas.
*   **RF-W03 (Planilla Privada):** En la visualización de horarios, los datos de ocupación de buses de terceros deben permanecer ocultos para dueños externos.

---

## ⚡ 4. Requisitos No Funcionales (RNF)
*   **RNF-01 (Modernización Android):** Cumplimiento total con SDK 35 (Android 15), Edge-to-Edge y 16 KB support.
*   **RNF-02 (Rendimiento Web):** Carga optimizada mediante Vite y SPA React, asegurando tiempos de respuesta rápidos en zonas rurales con conectividad limitada.
*   **RNF-03 (Seguridad Cloud):** Blindaje mediante Firebase Security Rules y Hosting con cifrado SSL.

---
**ChopCode Solutions - Ingeniería de Producto 2026**
