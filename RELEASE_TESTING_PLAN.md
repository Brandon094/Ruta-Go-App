# 🏁 Plan de Pruebas de Certificación - Ruta-Go v1.2.1 Stable

Este documento detalla el protocolo de pruebas (QA) para validar la estabilidad, reactividad y seguridad de la aplicación antes de su publicación en la Play Store.

---

## 🏗️ 0. Preparación del Entorno (Clean Start)
Para garantizar resultados reales, siga estos pasos en su consola de Firebase:
1.  **Limpiar Auth**: Borrar todos los usuarios de prueba.
2.  **Limpiar Database**: Eliminar los nodos `reservas`, `chats`, `notificaciones`, `estadisticas`.
3.  **Importar Master JSON**: Subir el archivo JSON v1.2.1 sincronizado (Horarios, Precios y Administradores).
4.  **Limpiar App**: Desinstalar la versión anterior del celular para limpiar `SharedPreferences`.

---

## 🟢 Fase 1: Onboarding y Bienvenida
*Objetivo: Validar que el primer contacto del usuario sea guiado y profesional.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 1.1 | Onboarding Inicial | Abrir el app recién instalada. | Se deben mostrar los slides animados para pasajeros. |
| 1.2 | Persistencia Onboarding | Cerrar y volver a abrir el app. | El onboarding NO debe aparecer nuevamente. |
| 1.3 | Onboarding Conductor | Registrarse como conductor y entrar al Home. | Se debe disparar el tutorial especializado de 3 pasos para conductores. |

---

## 🔵 Fase 2: Registro Autónomo de Conductores
*Objetivo: Validar la creación multi-nodo y asignación de agenda.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 2.1 | Carga de Horarios | Entrar al formulario de registro de conductor. | Los dropdowns deben cargar las 18 horas oficiales marcadas como "(Libre)". |
| 2.2 | Validación de Campos | Intentar registrarse sin elegir horarios o capacidad. | El app debe bloquear la acción y mostrar un aviso de campos obligatorios. |
| 2.3 | Creación Multi-Nodo | Completar el registro con éxito. | Verificar en Firebase que se crearon: Perfil en `/conductores/`, Vehículo en `/vehiculos/` y asignación en `/horarios/`. |
| 2.4 | Sincronización Asientos | Tras el registro, ver el nodo `disponibilidadAsientos`. | Se deben haber creado automáticamente los nodos de los horarios elegidos con la capacidad correcta. |

---

## 🟡 Fase 3: Experiencia del Pasajero (Reactividad)
*Objetivo: Validar el flujo de reserva y la interfaz inteligente.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 3.1 | Detección de Bus | Ver la lista de horarios como pasajero. | Los horarios tomados en la Fase 2 deben mostrar el nombre del conductor real. |
| 3.2 | Bloqueo "Pendiente" | Buscar un horario sin conductor. | El botón debe ser un candado y el badge debe decir "Pendiente". |
| 3.3 | Reserva Pro | Realizar una reserva en el bus del conductor registrado. | El mapa de asientos debe reflejar la capacidad exacta (ej: 15 puestos) definida en el registro. |
| 3.4 | Feedback Finalizado | Cambiar la hora del sistema a las 11:30 PM. | Debe aparecer la tarjeta premium: "¡Jornada Completada!". |

---

## 🟠 Fase 4: Dashboard y Gestión de Conductor
*Objetivo: Validar el control operativo y financiero.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 4.1 | Reactividad Perfil | Editar nombre/teléfono en el perfil y guardar. | Al volver al Home, el encabezado debe mostrar el nuevo nombre sin necesidad de recargar manualmente. |
| 4.2 | Venta Física | Usar el FAB (+) para bloquear un asiento manualmente. | Las estadísticas de "Ingresos" y "Libres" en el Dashboard deben actualizarse con animación numérica. |
| 4.3 | Misión Cumplida | El conductor completa su última ruta (pasa la hora). | Se oculta el itinerario y aparece el feedback: "¡Misión Cumplida!". |

---

## 🔴 Fase 5: Seguridad y Segregación
*Objetivo: Validar que los datos no se crucen entre roles.*

| ID | Caso de Prueba | Acción | Resultado Esperado |
|:---|:---|:---|:---|
| 5.1 | Segregación en Firebase | Iniciar sesión como Pasajero. | Verificar que NO existe entrada para este UID en el nodo `/conductores/`. |
| 5.2 | Login Social Inteligente | Entrar con Google usando el correo del conductor registrado. | El sistema debe llevarlo al Home de Conductor directamente. |
| 5.3 | Sanity Check | Borrar un conductor de Firebase manualmente y ver horarios. | Los turnos de ese conductor deben volver a marcarse como "(Libre)" automáticamente en el app. |

---

## 📝 Notas de Versión (v1.2.1 Stable)
- **Centralización**: Todos los textos residen en `strings.xml`.
- **Precios**: Gestionados dinámicamente desde el nodo `/precios/`.
- **Formato**: Abreviación financiera (K, M) y sufijo COP activados.

---
**Elaborado por: Chop Code Solutions - 2026**
