# 📋 Especificación de Requisitos - Ecosistema Go v1.9.9.5 Ecosystem

Este documento detalla los requisitos funcionales y no funcionales de la suite tecnológica de ChopCode Solutions, integrando el ecosistema móvil y el portal web de alta fidelidad.

---

## 🛠️ 1. Requisitos de Integración (Suite)
*   **RF-S01 (SSO):** Acceso unificado a todas las plataformas mediante Firebase Auth.
*   **RF-S02 (Web Hub):** Portal centralizado para gestión administrativa, legal y comercial (Landing Page).
*   **RF-S03 (RBAC):** Control de acceso basado en roles (Admin, Dueño, Conductor, Pasajero) sincronizado en tiempo real.

---

## 🚌 2. Requisitos Ruta-Go (Movilidad & Negocios)
*   **RF-R01 (Reserva Atómica):** Transaccionalidad de asientos con latencia ultra-baja en Realtime Database.
*   **RF-R02 (Portal Business):** Interfaz para Dueños de Flota con monitoreo de activos e ingresos reales (Venta Digital + Física).
*   **RF-R03 (Inteligencia Analítica):** El sistema debe detectar automáticamente la dirección del trayecto y agrupar métricas por destino final (Nátaga <-> La Plata).
*   **RF-R04 (Gestión de Turnos Pro):** Interfaz de asignación de conductores optimizada por "Speed Mode" (Parejas de horarios y combos especiales).
*   **RF-R05 (Habeas Data):** Flujo automatizado de borrado de cuenta en 30 días, con periodo de gracia, accesible desde App y Web.

---

## 🌎 3. Requisitos Portal Web (Experiencia de Usuario)
*   **RF-W01 (Extreme Performance):** Uso de Code Splitting y Lazy Loading para que la Landing Page cargue en < 2.5s (LCP).
*   **RF-W02 (Fluid Navigation):** Implementación de motores de transición (useTransition) para evitar parpadeos visuales o estados inconsistentes entre roles.
*   **RF-W03 (Accesibilidad AA):** Cumplimiento de estándares W3C en contrastes, etiquetas ARIA y tamaños de objetivos táctiles.
*   **RF-W04 (Gestión de Precios):** El Administrador Root puede modificar tarifas, impactando inmediatamente en el cálculo de pasajes de todo el ecosistema.
*   **RF-W05 (Sync Mirror):** El portal web debe reflejar el 100% de la funcionalidad de la App (Chat, Tiquetes, Calificaciones) para usuarios de iPhone.

---

## ⚡ 4. Requisitos No Funcionales (RNF)
*   **RNF-01 (Modernización Android):** Cumplimiento total con SDK 35 (Android 15), Edge-to-Edge y 16 KB support.
*   **RNF-02 (Arquitectura Atómica):** Todo el desarrollo web debe seguir el estándar de componentes Atoms/Molecules/Organisms para garantizar escalabilidad.
*   **RNF-03 (Seguridad Cloud):** Blindaje mediante Firebase Security Rules y aislamiento de datos por `ownerId`.

---
**ChopCode Solutions - Ingeniería de Producto 2026**
