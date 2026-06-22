# 📖 Documentación Integral - Proyecto Ruta-Go v1.2.1 Stable

Bienvenido a la documentación oficial de **Ruta-Go**, la plataforma líder en optimización de transporte intermunicipal para la región de Natagá y La Plata. Este documento centraliza toda la información estratégica, operativa y técnica del ecosistema.

---

## 🏗️ 1. Visión del Proyecto
Ruta-Go nace para profesionalizar el transporte regional, eliminando la incertidumbre en los horarios y automatizando la gestión de cupos tanto para el pasajero como para el conductor.

### 🎯 Objetivos Clave
*   **Fiabilidad**: Garantizar que el pasajero vea buses reales y horarios confirmados.
*   **Agilidad**: Registro autónomo de conductores y vehículos.
*   **Transparencia**: Cuentas claras para los conductores sobre sus ingresos diarios.

---

## 👥 2. Roles y Actores del Sistema
El ecosistema se divide en tres niveles de acceso claramente segregados:

1.  **Pasajero (Cliente)**: Consulta horarios, reserva asientos, chatea con el conductor y califica el servicio.
2.  **Conductor (Operador)**: Gestiona su bus, confirma reservas, realiza ventas físicas y visualiza sus finanzas.
3.  **Administrador (Central)**: Define horarios maestros, ajusta tarifas globales y supervisa la flota.

---

## 📦 3. Módulos del Software
Ruta-Go está construido de forma modular para permitir el crecimiento escalable:

*   **Módulo Auth**: Gestión de identidad dual (Email/Google).
*   **Módulo Itinerario**: Filtros inteligentes de horarios pasados y detección de disponibilidad.
*   **Módulo Reserva**: Motor de asignación atómica de asientos.
*   **Módulo Financiero**: Tarifas dinámicas desde la nube y cálculo de ingresos.
*   **Módulo Chat**: Mensajería en tiempo real vinculada a tiquetes activos.
*   **Módulo Sanity**: Limpieza automática de datos y validación de consistencia.

---

## 🛠️ 4. Referencias Técnicas (Documentación Detallada)
Para profundizar en cada área, consulte los siguientes manuales específicos:

1.  [**Manual de Desarrollo**](./DEVELOPER_GUIDELINES.md): Estándares de código, stack tecnológico y "Reglas de Oro".
2.  [**Arquitectura de Módulos**](./ARCHITECTURE_MODULES.md): Flujo de datos entre componentes e interfaces de Firebase.
3.  [**Plan de Pruebas**](./RELEASE_TESTING_PLAN.md): Protocolo de QA para certificar la estabilidad de la versión.
4.  [**Hoja de Ruta (Roadmap)**](./ROADMAP.md): Próximas funcionalidades y visión a futuro.

---

## 📊 5. Estructura de Datos (Firebase Core)
La base de datos está diseñada bajo un modelo NoSQL segregado:

*   `conductores/`: Perfiles profesionales de los choferes.
*   `usuarios/`: Base de datos de clientes (pasajeros).
*   `vehiculos/`: Ficha técnica de la flota organizada por placas.
*   `horarios/`: Planilla maestra de despachos diarios.
*   `disponibilidadAsientos/`: Control dinámico de ocupación.
*   `precios/`: Tarifario centralizado y remoto.

---

## 🛡️ 6. Seguridad y Privacidad
El sistema implementa **Firebase Security Rules** avanzadas para garantizar:
*   Que un pasajero solo vea sus propias reservas.
*   Que los ingresos de un conductor sean totalmente privados.
*   Que solo la Central de Administradores pueda modificar precios.

---

## 🚀 7. Guía de Inicio Rápido para Despliegue
1.  Configurar `google-services.json` en la carpeta `/app`.
2.  Importar el **JSON Maestro v1.2.1** en Realtime Database.
3.  Publicar las **Cloud Functions** para el reseteo de las 7:00 PM.
4.  Firmar el APK usando la `key.jks` oficial de Chop Code Solutions.

---
**© 2026 Chop Code Solutions - Todos los derechos reservados.**
**Desarrollado por: Brandon Daza Cerquera**
