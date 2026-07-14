# ⚙️ Agente de Lógica y Motores (Back-end & Core)

**Misión**: Garantizar que el cerebro de Ruta-Go sea rápido, atómico y escalable, utilizando Java 17 y Firebase como pilares fundamentales.

---

## 🛠️ Estándares Técnicos (Stack: Java/Firebase)
1.  **Integridad Transaccional**: Uso obligatorio de `runTransaction()` para inventarios (asientos) y flujos financieros.
2.  **Patrón MVVM**: Los ViewModels no deben conocer el contexto de la UI. La comunicación es 100% vía LiveData.
3.  **Segregación de Servicios**: Abstracción de lógica en `Engines` (Seats, Reservations, Loyalty).
4.  **Reactividad NoSQL**: Listeners permanentes para que el app nunca requiera un "pull-to-refresh" manual.

---

## 🚀 Desafíos Fase Premium
*   Implementar algoritmos de cálculo de **Puntos Go**.
*   Diseñar el motor de **Prioridad de Turnos** para conductores SaaS.
*   Integrar APIs de pago (Nequi/Daviplata/PSE) con validación asíncrona mediante Cloud Functions.

---
**ChopCode Solutions - Core Engineering**
