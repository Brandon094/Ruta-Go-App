# 📖 Documentación Integral - Proyecto Ruta-Go v1.2.3 Stable

Bienvenido a la documentación oficial de **Ruta-Go**, la plataforma líder en optimización de transporte intermunicipal para la región de Natagá y La Plata. Este documento centraliza toda la información estratégica, operativa y técnica del ecosistema.

---

## 🏗️ 1. Visión del Proyecto
Ruta-Go nace para profesionalizar el transporte regional, eliminando la incertidumbre en los horarios y automatizando la gestión de cupos tanto para el pasajero como para el conductor.

### 🎯 Objetivos Clave
*   **Fiabilidad**: Garantizar que el pasajero vea buses reales y horarios confirmados.
*   **Agilidad**: Registro autónomo de conductores y vehículos con asignación de turnos inmediata.
*   **Transparencia**: Cuentas claras para los conductores sobre sus ingresos diarios y ocupación real.

---

## 👥 2. Roles y Actores del Sistema
El ecosistema se divide en tres niveles de acceso claramente segregados:

1.  **Pasajero (Cliente)**: Consulta horarios, reserva asientos, chatea con el conductor y califica el servicio. Cuenta con un tutorial guiado paso a paso.
2.  **Conductor (Operador)**: Gestiona su bus, confirma reservas, realiza ventas físicas y visualiza sus finanzas. Cuenta con un sistema de onboarding operativo especializado.
3.  **Administrador (Central)**: Define horarios maestros, ajusta tarifas globales y supervisa la flota.

---

## 📦 3. Módulos del Software
Ruta-Go está construido de forma modular para permitir el crecimiento escalable:

*   **Módulo Auth**: Gestión de identidad dual (Email/Google) con segregación física de perfiles.
*   **Módulo Itinerario**: Filtros inteligentes de horarios pasados, detección de disponibilidad y resaltado de "Próximo Viaje".
*   **Módulo Reserva**: Motor de asignación atómica de asientos sincronizado en tiempo real.
*   **Módulo Financiero**: Tarifas dinámicas desde la nube y cálculo de ingresos acumulados con animaciones numéricas.
*   **Módulo Chat**: Mensajería en tiempo real vinculada a transacciones activas y con contexto informativo.
*   **Módulo Tutorial (Hub)**: Centro de mando para guías interactivas que educan al usuario en cada pantalla.
*   **Módulo Sanity**: Capa de integridad que filtra conductores inexistentes y normaliza datos históricos.

---

## 🛠️ 4. Referencias Técnicas (Documentación Detallada)
Para profundizar en cada área, consulte los siguientes manuales específicos:

1.  [**Manual de Desarrollo**](./technical/DEVELOPER_GUIDELINES.md): Estándares de código, stack tecnológico y "Reglas de Oro".
2.  [**Arquitectura de Módulos**](./technical/ARCHITECTURE_MODULES.md): Flujo de datos entre componentes e interfaces de comunicación.
3.  [**Plan de Pruebas**](./operations/RELEASE_TESTING_PLAN.md): Protocolo de QA para certificar la estabilidad de la versión.
4.  [**Hoja de Ruta (Roadmap)**](./product/ROADMAP.md): Próximas funcionalidades (Pagos, Puntos Go, Encomiendas).

---

## 📊 5. Estructura de Datos y Código
La plataforma se organiza siguiendo una arquitectura por capas para maximizar la mantenibilidad:

*   **Engines**: Lógica de negocio pesada y validaciones transaccionales (Seats, Reservations).
*   **Services**: Orquestadores de comunicación con Firebase, organizados por dominio.
*   **Managers**: Auxiliares organizados por responsabilidad (Core para sistema, UI para interfaz).
*   **Adapters**: Controladores de listas con estandarización técnica en inglés.

### Estructura de Base de Datos (Firebase)
La base de datos está diseñada bajo un modelo NoSQL segregado por roles:

*   `conductores/`: Perfiles profesionales vinculados a una identidad de Auth.
*   `usuarios/`: Base de datos exclusiva para clientes (pasajeros).
*   `vehiculos/`: Ficha técnica de la flota organizada por placas con vinculación al dueño.
*   `horarios/`: Planilla maestra de despachos con asignación dinámica de conductores.
*   `disponibilidadAsientos/`: Control dinámico de ocupación autogestionado por los conductores.
*   `precios/`: Tarifario centralizado y remoto administrado por la Central.

---

## 🛡️ 6. Seguridad y Privacidad
El sistema implementa **Firebase Security Rules** avanzadas que garantizan:
*   Segregación total entre pasajeros y conductores.
*   Privacidad financiera absoluta (solo el dueño ve sus ingresos).
*   Integridad operativa (solo conductores asignados modifican disponibilidad).

---

## 🚀 7. Guía de Inicio Rápido para Despliegue
1.  Configurar `google-services.json` en la carpeta `/app`.
2.  Importar el **JSON Maestro v1.2.3** en Realtime Database.
3.  Validar la carga inicial de horarios y precios dinámicos.
4.  Firmar el bundle usando la `key.jks` oficial de Chop Code Solutions.

---
**© 2026 Chop Code Solutions - Todos los derechos reservados.**
**Desarrollado por: Brandon Daza Cerquera**
