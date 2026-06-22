# ⚙️ Manual de Administración y Operación - Ruta-Go

Este documento guía al administrador de la plataforma en las tareas de gestión operativa, financiera y de mantenimiento preventivo a través de la consola de Firebase.

---

## 💰 1. Gestión de Tarifas (Precios)
Los precios son dinámicos y se controlan desde el nodo `/precios/`.

1.  Entra a **Firebase Console > Realtime Database**.
2.  Busca el nodo `precios`.
3.  Desglosa por origen (ej: `nataga`) y destino (ej: `la plata`).
4.  Cambia el valor numérico. El cambio se reflejará en el app del pasajero al instante.

---

## 🕒 2. Gestión de Horarios y Turnos
La planilla maestra reside en el nodo `/horarios/`.

### Asignar un Conductor Manualmente:
1.  Busca el ID del horario (ej: `h001`).
2.  En el campo `conductorId`, pega el UID del conductor (obtenido del nodo `/conductores/`).
3.  **Importante:** Asegúrate de que el conductor no tenga otro turno a la misma hora.

### Liberar un Horario:
1.  Deja el campo `conductorId` vacío (`""`). El app lo mostrará automáticamente como **"(Libre)"**.

---

## 👤 3. Gestión de Usuarios y Conductores

### Bloquear una Cuenta:
1.  Ve al nodo `/conductores/` o `/usuarios/` según corresponda.
2.  Busca el UID del usuario.
3.  Cambia el campo `status` de `active` a `blocked`. El usuario no podrá volver a iniciar sesión.

### Verificar un Nuevo Conductor:
1.  Revisa los datos en el nodo `/conductores/`.
2.  Verifica que la placa en `/vehiculos/` coincida.
3.  Si todo es correcto, asígnale sus horarios iniciales en el nodo `/horarios/`.

---

## 🧹 4. Mantenimiento y Emergencias

### Reset Manual de Jornada:
Si la Cloud Function de las 7:00 PM llega a fallar:
1.  Ve al nodo `/disponibilidadAsientos/`.
2.  Para cada horario, resetea `asientosDisponibles` al valor de `totalAsientos`.
3.  Elimina los registros dentro de `asientosOcupados`.

### Limpieza de Reservas Viejas:
Se recomienda exportar un JSON de respaldo cada mes y limpiar el nodo `/reservas/` para mantener la velocidad de consulta en dispositivos de gama baja.

---

## 📊 5. Monitoreo de Salud
*   **Crashlytics:** Revisa diariamente si hay "Crashes" para corregir errores de dispositivos específicos.
*   **Analytics:** Observa la "Retención de Usuarios" para saber si los pasajeros están volviendo a usar el app.

---
**Chop Code Solutions - Operaciones 2026**
