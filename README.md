# 🧼 BrilloTotal Limpieza — Sitio Web de Demostración

> **Proyecto de Portfolio creado por WebSimple Spain**  
> Sitio web moderno, responsive y profesional para una empresa ficticia de servicios de limpieza residencial y comercial en Madrid, España.

---

## 📋 Resumen del Proyecto

Este proyecto ha sido diseñado y construido como una **pieza de portfolio de alto impacto** para **WebSimple Spain**. Su propósito es mostrar a potenciales clientes del sector de la limpieza, mantenimiento y servicios para el hogar y empresas en España cómo puede lucir un sitio web profesional, moderno, accesible y optimizado para convertir visitantes en solicitudes de presupuesto.

### Características Principales:
- **Diseño a medida:** Paleta corporativa en blanco impoluto, azul marino profundo (`#0B192C`) y acentos en turquesa fresco (`#00A896`).
- **Lenguaje natural:** Redacción en español de España con terminología profesional y cercana.
- **Transparencia total:** Sin reseñas inventadas, sin falsas cifras de años de experiencia ni afirmaciones engañosas sobre clientes o licencias ficticias.
- **100% Responsive y Mobile-First:** Diseñado para verse impecable en móviles, tablets y monitores de escritorio.
- **Sin dependencias pesadas:** Construido íntegramente con tecnologías nativas (HTML5 semántico, CSS3 moderno y Vanilla JavaScript).

---

## 📁 Estructura de Archivos

```text
limpieza-demo-spain/
├── index.html       # Estructura semántica, accesibilidad y contenidos
├── style.css        # Sistema de diseño, tokens, tipografía, layouts y responsive
├── script.js        # Lógica interactiva, acordeón FAQ, validación y modales demo
└── README.md        # Documentación técnica, guía de ejecución y despliegue
```

---

## 🚀 Cómo Ejecutar el Proyecto en Windows con VS Code

Tienes tres formas muy sencillas de abrir y probar este proyecto en tu ordenador con Windows:

### Opción 1: Con la extensión Live Server de VS Code (Recomendada)
1. Abre **Visual Studio Code**.
2. Ve a `Archivo > Abrir carpeta...` y selecciona la carpeta:
   `c:\Users\LENOVO\Desktop\limpieza-demo-spain`
3. Si no tienes instalada la extensión **Live Server**, ve a la pestaña de Extensiones (`Ctrl + Shift + X`), busca `Live Server` (de Ritwick Dey) e instálala.
4. En el explorador de archivos de VS Code, haz **clic derecho** sobre `index.html` y selecciona **"Open with Live Server"**.
5. Se abrirá automáticamente tu navegador en `http://127.0.0.1:5500/index.html` con recarga automática cada vez que guardes cambios.

### Opción 2: Apertura directa en el navegador
1. Abre el Explorador de Archivos de Windows.
2. Navega a `c:\Users\LENOVO\Desktop\limpieza-demo-spain`.
3. Haz doble clic en el archivo `index.html` (o clic derecho > *Abrir con* > Google Chrome / Microsoft Edge).

### Opción 3: Con un servidor local ligero por terminal
Si tienes Node.js o Python instalado en Windows:
- **Con npx:**
  ```bash
  npx serve .
  ```
- **Con Python:**
  ```bash
  python -m http.server 8000
  ```

---

## 🌐 Cómo Publicar el Proyecto Gratis en Netlify

Netlify ofrece alojamiento web gratuito de alta velocidad con certificado SSL (HTTPS) automático. Hay dos métodos:

### Método A: Netlify Drop (El más rápido — menos de 1 minuto sin usar Git)
1. Entra en [https://app.netlify.com](https://app.netlify.com) e inicia sesión (o regístrate gratis).
2. Ve a la sección **Sites** y baja hasta el recuadro que dice **"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"** (o entra directo a [https://app.netlify.com/drop](https://app.netlify.com/drop)).
3. Arrastra la carpeta completa `limpieza-demo-spain` desde el Explorador de Windows al recuadro del navegador.
4. Netlify publicará la web al instante y te proporcionará una URL gratuita como:
   `https://nombre-aleatorio.netlify.app`
5. En `Site configuration > Change site name`, puedes renombrarla a algo como `brillototal-demo.netlify.app` o asociar un dominio personalizado si lo deseas.

### Método B: Conectado a un repositorio GitHub
1. Sube la carpeta a un nuevo repositorio en tu cuenta de GitHub.
2. En Netlify, pulsa **"Add new site" > "Import an existing project"**.
3. Selecciona tu repositorio GitHub.
4. En la configuración de build, deja el comando de build vacío y el directorio de publicación como `./` (o déjalo en blanco).
5. Pulsa **"Deploy site"**. Cada vez que hagas `git push`, Netlify actualizará la web automáticamente.

---

## 🛠️ Checklist: Qué sustituir para adaptar esta plantilla a un cliente real

Cuando un cliente de limpieza o servicios contrate a **WebSimple Spain**, utiliza esta lista de verificación para personalizar la web en tiempo récord:

### 1. Datos de Identidad y Marca
- [ ] **Nombre comercial y logotipo:** Sustituir *"BrilloTotal Limpieza"* en `index.html` (Header, Hero, Footer y Title) por la marca del cliente y su isotipo/logotipo corporativo.
- [ ] **Área geográfica:** Cambiar *"Madrid y alrededores"* por la ciudad, provincia o comarca donde opere el cliente (ej. *"Valencia Capital y Huerta Norte"*, *"Sevilla y Aljarafe"*, etc.).

### 2. Canales de Contacto Directo
- [ ] **Botón flotante de WhatsApp:** En `script.js`, asigna el número real en la constante `CONFIG.whatsappNumber`:
  ```javascript
  const CONFIG = {
    whatsappNumber: "34612345678", // Número real con prefijo 34 para España
    whatsappMessage: "Hola, me gustaría solicitar un presupuesto..."
  };
  ```
- [ ] **Teléfono y correo visibles:** Sustituir los textos informativos en el panel de contacto y en el footer con el teléfono de atención y el correo corporativo (ej. `info@nombredelnegocio.es`).

### 3. Conexión del Formulario a un Correo Real
En la versión de demostración actual, el formulario valida los datos y muestra un resumen interactivo sin almacenar datos. Para que el cliente reciba los presupuestos en su bandeja de entrada:

- **Con Netlify Forms (Opción más recomendada):**  
  En `index.html`, añade los atributos `name="presupuestos"` y `data-netlify="true"` a la etiqueta `<form>`:
  ```html
  <form id="quoteForm" name="presupuestos" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="presupuestos" />
    <!-- resto de campos -->
  </form>
  ```
  *Netlify recogerá automáticamente cada envío y te enviará una notificación por email.*

- **Con Formspree o EmailJS:**  
  Reemplazar el `action` con tu endpoint de Formspree (`action="https://formspree.io/f/tu-id"`).

### 4. Fotografías Reales de Trabajos
- [ ] Reemplazar las imágenes de Unsplash por fotografías de alta calidad de los trabajos reales del cliente (su equipo uniformado, vehículos rotulados, antes/después de limpiezas de fin de obra o cristales).

### 5. Servicios y Precios
- [ ] Ajustar la lista de los 6 servicios a los que ofrezca específicamente la empresa (si por ejemplo limpian moquetas o garajes comunitarios).
- [ ] Si el cliente maneja tarifas base (ej. *"A partir de 14€/hora"*), se pueden incluir de forma transparente.

### 6. Cumplimiento Legal (España / RGPD / LOPD-GDD)
- [ ] **Aviso Legal:** Incluir la denominación social o nombre del autónomo titular, CIF/NIF y dirección fiscal.
- [ ] **Política de Privacidad:** Detallar el responsable del tratamiento de los datos del formulario y la legitimación (consentimiento del interesado).
- [ ] **Banner de Cookies:** Si se añaden herramientas de analítica (Google Analytics, Meta Pixel), integrar un gestor de consentimiento de cookies (ej. CookieYes o script ligero).

---

## 🎨 Paleta de Color y Diseño

| Elemento | Color | Hex | Propósito |
| :--- | :--- | :--- | :--- |
| **Fondo Principal** | Blanco Puro | `#ffffff` | Luminosidad, sensación de higiene y claridad |
| **Superficies** | Gris Suave | `#f8fafc` | Separación visual sutil entre secciones |
| **Marca Principal** | Azul Marino Profundo | `#0B192C` | Seriedad, elegancia y contraste tipográfico |
| **Azul Secundario** | Navy Royal | `#1E3E62` | Subtítulos y elementos corporativos |
| **Acento de Acción** | Turquesa Fresco | `#00A896` | Frescura, limpieza, botones principales y llamadas a la acción |
| **Acento Secundario** | Cian Brillante | `#06b6d4` | Destacados y degradados modernos |

---

## 📄 Créditos y Licencia
- Diseñado y desarrollado como plantilla de portfolio para **WebSimple Spain**.
- Tipografías: *Outfit* y *Plus Jakarta Sans* (Google Fonts - Licencia Open Font).
- Iconografía: SVGs vectoriales nativos de alto rendimiento.
- Fotografías: Unsplash (Licencia comercial gratuita y libre de derechos de autor).
