# 🏗️ Arquitectura del Módulo de Dueños y Desacoplamiento de Activos

Este documento define la reingeniería de la base de datos y la lógica de negocio para permitir una gestión de flota escalable, separando la propiedad del vehículo de la operación diaria (conducción).

---

## 🎯 1. El Problema de la Relación Estática
Actualmente, el sistema asume una relación 1:1 persistente entre un conductor y un vehículo (`conductorId` en el nodo `/vehiculos/` y `placaVehiculo` en el nodo `/conductores/`). 

**Limitaciones actuales:**
*   Un dueño no puede tener múltiples vehículos vinculados a su cuenta.
*   Un vehículo no puede ser manejado por diferentes conductores (turnos rotativos en un mismo carro).
*   No existe un panel consolidado para que el inversor (dueño) vea el rendimiento de su activo.

---

## 🛠️ 2. Nueva Estructura NoSQL (Desacoplamiento)

### 2.1 Nodo Maestro: `/dueños/` (Nuevo)
Centraliza la identidad del propietario.
```json
{
  "owner_uid": {
    "nombre": "Nombre Propietario",
    "email": "dueño@email.com",
    "telefono": "310...",
    "vehiculos": ["PLACA1", "PLACA2"], // Lista de activos
    "plan": "freemium" // [freemium, premium]
  }
}
```

### 2.2 Nodo: `/vehiculos/` (Refactorizado)
El vehículo ya no pertenece a un conductor, sino a un dueño.
```json
{
  "PLACA1": {
    "modelo": "Nissan Frontier",
    "capacidad": 13,
    "dueñoId": "owner_uid", // Referencia al propietario
    "conductorActual": "driver_uid" // ID del conductor asignado hoy (dinámico)
  }
}
```

### 2.3 Nodo: `/asignaciones/` (Nuevo)
Registra qué conductor maneja qué bus en una fecha específica.
```json
{
  "2026-07-20": {
    "PLACA1": "driver_uid_A",
    "PLACA2": "driver_uid_B"
  }
}
```

---

## 📈 3. Dashboard del Dueño (Go Business - Modelo SaaS)
Interfaz especializada para la gestión de activos bajo un esquema Freemium/Premium.

### 3.1 Nivel Freemium (Base):
*   **Estado de Flota**: Mapa o lista con el estado actual de cada bus.
*   **Monitor de Conductores**: Visualización de quién opera cada activo en el día.
*   **Ingresos Brutos**: Reporte simple de la sumatoria de tiquetes vendidos.

### 3.2 Nivel Premium (Suscripción):
*   **Contabilidad Automatizada**: Cálculo neto restando comisiones y gastos registrados.
*   **Módulo de Egresos**: Gestión de gastos operativos (combustible, repuestos).
*   **Alertas Legales**: Notificaciones Push preventivas para SOAT y Seguros.
*   **Prioridad Algorítmica**: Ventaja competitiva en la rotación de turnos.

---

## 🔐 4. Reglas de Seguridad (Gobernanza)
*   Solo el `dueñoId` puede ver las estadísticas financieras de sus vehículos.
*   El `conductorId` solo puede ver el inventario del vehículo que tiene asignado hoy.
*   El administrador de ChopCode mantiene la supervisión global.

---

## 🚀 5. Plan de Migración
1.  **Script de Limpieza**: Migrar el campo `conductorId` de los vehículos actuales al nuevo nodo `/dueños/` (creando perfiles iniciales).
2.  **Actualización de Modelos**: Modificar `Vehicle.java` y `Driver.java` para reflejar las nuevas referencias.
3.  **UI Dueño**: Crear el nuevo flujo de Login/Home especializado para el rol OWNER.

---
**Chop Code Solutions - Ingeniería de Producto v1.3.0**
