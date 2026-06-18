# 🛡️ Política de Seguridad y Privacidad – Ruta-Go

#### Última actualización: 17 de Junio, 2026

En **Chop Code Solutions**, la integridad de la plataforma y la confianza de nuestros usuarios son prioridad. Este documento detalla las medidas de seguridad técnica implementadas y el tratamiento de datos personales en cumplimiento con la **Ley 1581 de 2012 (Habeas Data)** de la República de Colombia.

## 1. Seguridad de la Infraestructura
Ruta-Go utiliza una arquitectura de seguridad de nivel industrial respaldada por Google Cloud:

- **🔐 Reglas de Seguridad Firebase:** Hemos implementado **Firebase Security Rules** estrictas. Ningún usuario puede leer o escribir datos que no le correspondan. El acceso a los datos de los pasajeros está restringido exclusivamente al conductor asignado a su ruta.
- **🛡️ Protección de Algoritmos:** La lógica crítica, incluyendo el **Algoritmo de Rotación Automática**, reside en Firebase Cloud Functions. Esto evita que la lógica de negocio sea vulnerable a ingeniería inversa en el dispositivo móvil.
- **🚫 Ofuscación de Código (R8/ProGuard):** El binario de distribución (AAB/APK) está cifrado y ofuscado para proteger la propiedad intelectual de **Chop Code Solutions**.

## 2. Tratamiento de Datos (Privacidad)
Para el correcto funcionamiento de las reservas y la logística, recopilamos:

- **Identidad:** Nombre, correo y foto vía Google Auth.
- **Logística:** Número de teléfono (vital para la coordinación pasajero-conductor).
- **Vehículo:** Datos técnicos del bus para seguridad del pasajero.
- **Ubicación:** Datos de origen y destino para la gestión de rutas.

## 3. Uso Compartido de Información
La transferencia de datos es estrictamente operativa. **Chop Code Solutions no comercializa datos personales**. La información de contacto del pasajero solo se revela al conductor una vez que la reserva es confirmada, con el único fin de coordinar el abordaje.

## 4. Derechos del Usuario
En cumplimiento del **Habeas Data**, cualquier usuario puede:
- **Acceder y Rectificar:** Modificar su información desde la sección "Editar Perfil".
- **Eliminar:** Solicitar la supresión total de sus datos mediante la función "Eliminar Cuenta". Este proceso es irreversible y borra todo rastro en los servidores de Firebase.

## 5. Reporte de Vulnerabilidades
Si detectas un fallo de seguridad, te agradecemos reportarlo de forma privada para proteger a la comunidad:
📧 **dazace94@gmail.com**

---
© 2026 **Chop Code Solutions** - Ruta-Go App.
*Entorno de Desarrollo Seguro: Parrot OS.*
