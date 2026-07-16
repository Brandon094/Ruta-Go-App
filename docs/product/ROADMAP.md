# 🚀 Hoja de Ruta y Próximas Funcionalidades - Ruta-Go

Este documento describe la visión a futuro de la plataforma Ruta-Go, detallando los módulos y características que se implementarán en las siguientes fases de desarrollo para convertir el proyecto en una startup rentable y escalable en la región.

---

## ✅ Fase 1: Estabilización y Optimización (Completado)
*   [x] Arquitectura MVVM Reactiva y Motores Core.
*   [x] Registro Autónomo de Conductores y Gestión de Activos.
*   [x] Tutorial Hub Interactivo y Guías de Usuario.
*   [x] **Optimización Android 15 (SDK 35)**: Edge-to-Edge y 16 KB support.
*   [x] **Full Documentation Sprint**: Documentación técnica y legal v1.3.0.
*   [x] **Fix Core de Rotación y Notificaciones**: Estabilización de Cloud Functions y asignación exitosa de los primeros conductores fijos para generar tráfico real.

---

## 🎯 Fase 2: Consolidación y Dueños de Vehículos (Prioridad Actual)
*Objetivo: Sentar las bases de escalabilidad mediante el desacoplamiento técnico y la creación del rol "Dueño".*

1.  **🚗 Desacoplamiento Vehículo-Conductor (Arquitectura)**:
    *   Eliminar la relación estática 1:1 en Firebase.
    *   Creación del nodo `/dueños/` para centralizar la propiedad de los activos.
    *   Permitir que un vehículo sea operado por diferentes conductores mediante asignación dinámica diaria.
2.  **👑 Go Business: Dashboard para Dueños (Módulo Base - Freemium)**:
    *   Visualización del estado de flota en tiempo real.
    *   Monitor de conductores activos por vehículo.
    *   Resumen de ingresos brutos diarios (Telemetría básica).
3.  **💳 Pasarela de Pagos Integrada**: Integración con PSE, Nequi y Daviplata para automatizar el flujo de dinero.
4.  **🌐 Go Suite Web Hub**: Creación del portal central del ecosistema para información legal y soporte.
5.  **♿ Accesibilidad**: Modo de alto contraste y fuentes optimizadas.

---

## 💎 Fase 3: Fidelización y Monetización Premium (SaaS)
*Objetivo: Generación de ingresos fuertes mediante el modelo de suscripción.*

1.  **🌟 Programa de Fidelización "Puntos Go"**: Acumulación, niveles y redención.
2.  **📈 SaaS Contable Premium para Dueños (Suscripción)**:
    *   **Cálculo Neto Automatizado**: Ingreso - (Comisión Conductor + Gasto Operativo).
    *   **Alertas Legales Inteligentes**: Push para SOAT, Tecno y Seguros con cuenta regresiva.
    *   **Módulo de Egresos Detallado**: Control de combustible, mantenimiento y repuestos.
    *   **Insignia "Vehículo Estrella"**: Distintivo visual en la interfaz del pasajero para aumentar reservas.
    *   **Prioridad de Turnos**: Ventaja algorítmica para vehículos premium en la toma de horarios.
3.  **📊 Analítica Avanzada**: Gráficas de rentabilidad mensual y comparativas entre vehículos de la misma flota.

---

## 📦 Fase 4: Diversificación y Logística (Largo Plazo)
*Objetivo: Solución integral de movilidad regional y control definitivo del flujo de paquetería local.*

1.  **🚚 Módulo Integrado de Encomiendas "Ruta-Go Cargo"**:
    *   **UI Conductor (Recepción)**: Botón rápido de registro de paquetes físicos ingresando únicamente el Nombre de quien recibe y su Cédula.
    *   **UI Pasajero (Buscador)**: Interfaz en el Home para que los usuarios consulten con su CC si tienen un paquete en camino, viendo qué vehículo lo trae y un chat directo con el conductor.
2.  **🛡️ Seguro de Viaje Digital**: Micro-seguros por trayecto integrados en la reserva.
3.  **🤖 IA de Predicción de Demanda**: Sugerencias de turnos extra basadas en datos históricos y festividades.

---
**ChopCode Solutions - 2026**
