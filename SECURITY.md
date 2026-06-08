<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidad - RutaGo</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7f9;
        }
        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0D47A1;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #0D47A1;
            margin: 0;
            font-size: 2.5em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .update-date {
            color: #666;
            font-style: italic;
            font-size: 0.9em;
        }
        h2 {
            color: #1976D2;
            border-left: 5px solid #0D47A1;
            padding-left: 15px;
            margin-top: 30px;
        }
        p, li {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul {
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 0.8em;
            color: #777;
        }
        .contact-info {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 12px;
            font-weight: bold;
            color: #0D47A1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RutaGo</h1>
            <p class="update-date">Última actualización: 06 de Junio de 2026</p>
        </div>

        <section>
            <p>En <strong>ChopCode Solutions</strong> nos tomamos muy en serio la privacidad y seguridad de nuestros usuarios. Esta Política de Privacidad describe detalladamente cómo recopilamos, utilizamos, almacenamos y protegemos la información de las personas (en adelante, "Pasajeros" y "Conductores") que utilizan nuestra aplicación móvil RutaGo (en adelante, la "Aplicación").</p>
            <p>Al descargar, registrarte y utilizar RutaGo, aceptas las prácticas descritas en este documento.</p>
        </section>

        <section>
            <h2>1. Información que Recopilamos</h2>
            <p>Para garantizar un servicio óptimo de reserva de asientos, sincronización en tiempo real y seguridad en las rutas intermunicipales, RutaGo recopila los siguientes datos:</p>
            <ul>
                <li><strong>Información de Autenticación:</strong> Al iniciar sesión a través de Google (vía Firebase Authentication), recopilamos su nombre, correo electrónico y foto de perfil.</li>
                <li><strong>Perfil del Pasajero:</strong> Número de teléfono (indispensable para la comunicación logística con el conductor).</li>
                <li><strong>Perfil del Conductor:</strong> Datos del vehículo (placa, modelo, capacidad, fotos), historial de viajes y estadísticas de rendimiento.</li>
                <li><strong>Datos de Operación:</strong> Rutas consultadas, horarios seleccionados y selección de asientos en el mapa interactivo.</li>
                <li><strong>Ventas Físicas y Manuales:</strong> Los conductores pueden registrar el nombre (opcional) de pasajeros que adquieren pasajes de forma física para la correcta gestión del inventario de asientos en tiempo real.</li>
                <li><strong>Información del Dispositivo:</strong> Recopilamos datos técnicos básicos (modelo de dispositivo, versión de SO) a través de Firebase Crashlytics para corregir errores y mejorar la estabilidad.</li>
            </ul>
        </section>

        <section>
            <h2>2. Cómo Utilizamos tu Información</h2>
            <p>Los datos se utilizan exclusivamente para el ecosistema de RutaGo:</p>
            <ul>
                <li><strong>Gestión de Reservas:</strong> Coordinar el mapa de cabina en tiempo real vía Firebase Realtime Database para evitar sobrecupos.</li>
                <li><strong>Logística:</strong> Permitir que los conductores visualicen su lista de pasajeros confirmados para coordinar el abordaje en la ruta piloto (Nátaga ↔ La Plata).</li>
                <li><strong>Notificaciones:</strong> Envío de alertas sobre el estado de reservas, cambios de horario o cancelaciones.</li>
                <li><strong>Estadísticas PRO:</strong> Generar resúmenes de ingresos y métricas de ocupación para los conductores.</li>
            </ul>
        </section>

        <section>
            <h2>3. Pagos y Transacciones</h2>
            <p>RutaGo permite gestionar y registrar la intención de pago (Efectivo, Transferencia o Tarjeta). <strong>Importante:</strong> La Aplicación no funciona como pasarela de pagos integrada ni almacena números de tarjetas de crédito. El procesamiento del pago final es un acuerdo directo entre el pasajero y el conductor/empresa transportadora fuera de la plataforma digital.</p>
        </section>

        <section>
            <h2>4. Almacenamiento y Seguridad</h2>
            <p>Toda la información se almacena en los servidores de Google Firebase (Cloud Firestore y Realtime Database). Implementamos protocolos de seguridad estándar de la industria para proteger los datos contra accesos no autorizados. Los datos se conservarán mientras la cuenta esté activa o sea necesario para fines operativos y legales.</p>
        </section>

        <section>
            <h2>5. Uso Compartido de Datos con Terceros</h2>
            <p>ChopCode Solutions no vende ni comercializa tus datos con terceros. La transferencia de datos es estrictamente operativa: el conductor asignado a una ruta tendrá acceso al nombre y teléfono de los pasajeros que reservaron en su vehículo para asegurar el contacto antes y durante el trayecto.</p>
        </section>

        <section>
            <h2>6. Proveedores de Servicios de Terceros</h2>
            <p>Utilizamos herramientas de Google para garantizar la calidad del servicio:</p>
            <ul>
                <li><strong>Firebase Authentication:</strong> Para el inicio de sesión seguro.</li>
                <li><strong>Google Maps SDK:</strong> Para la visualización de rutas (en caso de estar habilitado).</li>
                <li><strong>Firebase Crashlytics:</strong> Para el análisis de errores técnicos.</li>
            </ul>
        </section>

        <section>
            <h2>7. Tus Derechos (Acceso, Rectificación y Eliminación)</h2>
            <p>Como usuario, tienes control total sobre tus datos:</p>
            <ul>
                <li>Puedes actualizar tu perfil en los ajustes de la App.</li>
                <li><strong>Eliminación de Datos:</strong> Puedes solicitar la eliminación definitiva de tu cuenta desde la aplicación. Esto borrará de forma inmediata e irreversible todos tus registros asociados en nuestras bases de datos de Firebase.</li>
            </ul>
            <p class="contact-info">Para soporte técnico o ejercicio de derechos, contáctanos en:
                dazace94@gmail.com</p>
        </section>

        <section>
            <h2>8. Modificaciones a la Política</h2>
            <p>Nos reservamos el derecho de actualizar esta política para adaptarla a nuevas funciones o normativas. Los cambios significativos serán notificados dentro de la interfaz de RutaGo.</p>
        </section>

        <div class="footer">
            <p>&copy; 2026 ChopCode Solutions - RutaGo App. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>