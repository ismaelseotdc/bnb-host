# BNB HOST — Sitio web estático

Versión HTML, CSS y JavaScript independiente de Blogger. Conserva el diseño y las funciones de la plantilla original.

## Estructura

- `index.html`: contenido y estructura.
- `css/styles.css`: estilos, diseño adaptable y componentes visuales.
- `js/main.js`: menú móvil, carruseles, filtros, fechas y consultas por WhatsApp.
- `assets/images/`: carpeta reservada para fotografías propias.

## Vista previa local

Abre `index.html` directamente en un navegador. Para una vista previa más fiable, ejecuta un servidor local desde esta carpeta, por ejemplo:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `bnb-host`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (no subas solamente el ZIP).
3. En el repositorio entra en **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
6. Espera a que GitHub Pages publique el sitio. La dirección aparecerá en esa misma sección.

## Publicar en un hosting tradicional

Sube todos los archivos y carpetas manteniendo la misma estructura al directorio público del hosting, normalmente `public_html/` o `www/`. `index.html` debe quedar directamente dentro de ese directorio.

## Personalización importante

- El número de WhatsApp se configura en `js/main.js`, variable `whatsappNumber`.
- Los enlaces de WhatsApp de la sección de contacto y del botón flotante están en `index.html`.
- Los alojamientos de ejemplo están escritos en `index.html`. Para agregar uno, duplica un bloque `<article class="property-card">` y cambia sus datos, imágenes, `data-type` y `data-location`.
- Las fotografías de ejemplo se cargan desde Unsplash mediante URL. Puedes reemplazarlas por imágenes propias dentro de `assets/images/` y actualizar sus rutas.

## Alcance

Esta es una web estática: el buscador filtra los alojamientos incluidos en `index.html` y WhatsApp recibe las solicitudes. No hay base de datos, inventario en tiempo real, pagos ni motor de reservas conectado.
