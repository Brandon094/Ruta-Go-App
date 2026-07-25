# 🚀 Despliegue y Hosting - Ruta-Go Web

Este documento detalla el proceso para poner en producción el portal web y las Cloud Functions de forma sincronizada.

---

## 🛠️ Comando de Despliegue Maestro
Para garantizar que la web y la lógica de la nube estén alineadas, utiliza el siguiente comando desde la carpeta `web_portal/`:

```bash
npm run build && cd .. && firebase deploy --only hosting,functions
```

### 📋 Desglose del Proceso:
1.  **`npm run build`**: Compila el proyecto React (Vite) y genera los activos optimizados en `web_portal/dist/`.
2.  **`cd ..`**: Sube a la raíz del proyecto donde reside el archivo `firebase.json` maestro.
3.  **`firebase deploy --only hosting,functions`**: Sube simultáneamente los archivos estáticos al Hosting y el código de Node.js a las Cloud Functions.

---

## 🏗️ Configuración de Firebase (`firebase.json`)
El archivo de configuración en la raíz orquestra ambos despliegues:

```json
{
  "functions": {
    "source": "firebase_functions",
    "runtime": "nodejs22"
  },
  "hosting": {
    "public": "web_portal/dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🌐 Dominios Oficiales
*   **Producción**: [rutago-huila.web.app](https://rutago-huila.web.app)
*   **Consola**: [Firebase Console](https://console.firebase.google.com/)

---
**ChopCode Solutions - Infraestructura Cloud 2026**
