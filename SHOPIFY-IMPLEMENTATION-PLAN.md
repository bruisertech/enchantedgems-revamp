# Plan de Implementación a Shopify · Revamp Enchanted Gems (Estilo PRANA)

Este documento detalla la hoja de ruta técnica, las complejidades de código en Shopify Liquid / Online Store 2.0, la arquitectura para que el cliente gestione su catálogo en 1 clic y los tiempos estimados de desarrollo.

---

## 1. Diagnóstico de la Situación Actual

* **Plataforma:** Shopify (Arquitectura Liquid).
* **Problema reportado por el cliente:** Dificultad o lentitud para actualizar productos y banners constantemente.
* **Causa técnica diagnosticada:** 
  1. La tienda actual contiene deuda técnica visible (ejemplo: `Liquid error (layout/theme line 391): Could not find asset snippets/whatsapp-chat.liquid` en producción).
  2. Uso de un tema desactualizado o no adaptado a secciones dinámicas JSON (OS 2.0). Cuando los productos de portada están enlazados a IDs estáticos en lugar de colecciones inteligentes por etiquetas (`tags`), el cliente depende de un programador cada vez que rota su stock.

---

## 2. Complejidades Técnicas de Código en Shopify

Implementar una experiencia ultra-lujosa tipo **PRANA** sobre Shopify manteniendo la máxima facilidad para el cliente implica resolver 6 desafíos técnicos:

### Complejidad 1: Integración del Preloader sin arruinar el SEO (Core Web Vitals)
* **El reto:** En Shopify, inyectar un loader que cubra la pantalla puede retrasar métricas críticas de Google como el **LCP (Largest Contentful Paint)** y **FCP (First Contentful Paint)**. Si el loader dura más de 2 segundos o espera a que carguen todos los trackers de marketing (Facebook Pixel, Klaviyo, Google Analytics), el SEO se desploma y el rebote de usuarios aumenta.
* **Solución técnica en código:**
  - El contenedor `#eg-preloader` se inyecta directamente al inicio del `<body>` en `layout/theme.liquid`.
  - Los estilos críticos se cargan *inline* (`<style>`) para evitar retrasos de renderizado.
  - Se implementa un **temporizador de seguridad forzado** a 1.8 segundos: si los scripts pesados de terceros siguen cargando, el preloader se desvanece de todas formas.
  - Se vincula a `sessionStorage.getItem('eg_intro_seen')`: el preloader **solo se ejecuta en la primera visita de la sesión de navegación**. Si el comprador navega entre colecciones o fichas de producto, no se vuelve a disparar.

### Complejidad 2: Arquitectura Online Store 2.0 (Plantillas JSON Dinámicas)
* **El reto:** El cliente necesita que al subir un nuevo anillo o pulsera, este aparezca inmediatamente en la portada sin tocar código.
* **Solución técnica en código:**
  - Migrar la portada a `templates/index.json` y estructurar secciones modulares (`sections/featured-amulets.liquid`, `sections/hero-mystic.liquid`, `sections/oracle.liquid`).
  - Utilizar el esquema de Shopify (`{% schema %}`) para definir selectores de tipo `collection`.
  - Crear colecciones automáticas en Shopify:
    - *Bestsellers* (regla: productos con tag `bestseller`).
    - *Nuevas Gemas* (regla: productos creados en los últimos 30 días o con tag `new-in`).
    - *Por Intención* (regla: tag `proteccion`, `abundancia`, `calma`, etc.).

### Complejidad 3: Shopify Metafields para Propiedades Místicas & Chakras
* **El reto:** En e-commerce de gemoterapia y joyería energética, cada pieza tiene propiedades específicas (Chakra, Elemento, Signo afín, Ritual). Si esto se redacta desordenado en la descripción de texto estándar, se pierde el look editorial de lujo.
* **Solución técnica en código:**
  - Configurar **Metafields nativos de producto** en Shopify:
    - `custom.gem_type` (Texto: Amatista, Ópalo, Ónix)
    - `custom.intention` (Texto / Single line text: Escudo de Protección, Manifestación)
    - `custom.chakra` (Texto: Corona, Corazón, Raíz)
    - `custom.element` (Fuego, Tierra, Aire, Agua)
    - `custom.ritual_advice` (Texto enriquecido: modo de consagración)
  - En la plantilla de producto (`sections/main-product.liquid`), renderizar estos metacampos con tarjetas de micro-atributos y badges dorados automáticos.

### Complejidad 4: AJAX Drawer Cart con Barra de Envío Gratis Dinámica
* **El reto:** Los compradores no deben ser redirigidos a una página `/cart` anticuada cada vez que eligen una joya; debe desplegarse un carrito lateral fluido (*slide-in drawer*) que calcule en tiempo real el monto faltante para envío gratuito en pesos colombianos ($180.000 COP) o divisa local.
* **Solución técnica en código:**
  - Conectar los botones de añadir a la API oficial de Shopify: `fetch('/cart/add.js', { method: 'POST', ... })`.
  - Re-renderizar la sección del carrito mediante el **Section Rendering API** de Shopify (`/cart?section_id=cart-drawer`) o actualización de estado en Vanilla JS sin recargar la página.
  - Sincronizar el badge contador del header en tiempo real.

### Complejidad 5: Oráculo Místico Integrado al Motor de Productos
* **El reto:** Replicar la función más aclamada de PRANA (el oráculo/consultor de gemas) de manera que recomiende productos reales del catálogo de Enchanted Gems.
* **Solución técnica en código:**
  - Crear `sections/mystic-oracle.liquid`.
  - En el JavaScript del tema, consultar los productos asociados mediante etiquetas de búsqueda (`/search/suggest.json?q=tag:proteccion&resources[type]=product`) o un objeto JSON pre-renderizado con las 12 combinaciones zodiaco-intención.
  - Ofrecer al usuario el botón de "Añadir joya afín directamente a la bolsa".

### Complejidad 6: Limpieza y Reemplazo de Snippets Defectuosos
* **El reto:** La tienda tiene un error en `layout/theme.liquid:391` por un archivo faltante (`whatsapp-chat.liquid`).
* **Solución técnica en código:**
  - Purgar las llamadas huérfanas en `theme.liquid`.
  - Crear un botón de WhatsApp flotante nativo en SVG puro y CSS (`snippets/floating-whatsapp.liquid`) parametrizable desde el personalizador de temas con número, mensaje predeterminado de bienvenida y horario de atención, sin añadir peso ni scripts de terceros lentos.

---

## 3. Cronograma de Implementación & Tiempos Estimados

Tiempo total estimado para un despliegue profesional llave en mano: **3 semanas y media (18 a 22 días hábiles)**.

```
SEMANA 1: Setup, Auditoría & Identidad Visual Base (Días 1 - 5)
├── Día 1: Auditoría de tienda Shopify, respaldo de catálogo actual y limpieza de código obsoleto.
├── Día 2: Configuración de tema base OS 2.0 (Dawn o Tema Lujo limpio).
├── Día 3: Implementación de la paleta de colores (Pantone 2597 C + Oro Alquímico + Stalactite).
├── Día 4: Integración del nuevo Preloader PRANA con lógica sessionStorage en theme.liquid.
└── Día 5: Header y Footer de lujo con tipografía Cinzel / Playfair Display y sticky glassmorphism.

SEMANA 2: Catálogo Dinámico, Metafields & Fichas de Producto (Días 6 - 10)
├── Día 6: Creación y mapeo de Shopify Metafields (Chakra, Elemento, Intención, Ritual).
├── Día 7: Estructuración de Colecciones Inteligentes por etiquetas (Tags automáticos).
├── Día 8: Maquetación de tarjetas de producto (Product Cards) con badges flotantes.
├── Día 9: Desarrollo de la plantilla de producto (Página de producto con acordeones de significado).
└── Día 10: Filtro interactivo de intenciones en la Home Page.

SEMANA 3: Funcionalidades Avanzadas & Conversión (Días 11 - 15)
├── Día 11: Desarrollo del AJAX Drawer Cart con medidor de envío gratis en tiempo real.
├── Día 12: Desarrollo e integración del Oráculo Místico de Gemas en la Home.
├── Día 13: Sección de Historia, Filosofía de Consagración y Testimonios verificados.
├── Día 14: Optimización móvil completa (pruebas en iOS Safari, Android Chrome).
└── Día 15: Conexión y prueba de pasarelas de pago (Wompi, PayU, PSE, Nequi, Shopify Payments).

SEMANA 4: QA, Capacitación al Cliente & Lanzamiento (Días 16 - 18)
├── Día 16: Pruebas de velocidad (Core Web Vitals) y revisión de SEO técnico.
├── Día 17: Grabación de video-tutorial (3 a 5 min) para el cliente: "Cómo subir productos desde el celular con la app de Shopify".
└── Día 18: Publicación del tema oficial y puesta en marcha (*Go-Live*).
```

---

## 4. Guía "Zero Code" para el Cliente (Entregable Final)

Para garantizar que el cliente nunca vuelva a sentirse bloqueado al cambiar productos:

1. **Subir una joya desde el celular (App de Shopify):**
   - Abre la app de Shopify > Productos > `+`.
   - Agrega fotos y precio.
   - En **Etiquetas (Tags)**, escribe solo una de estas palabras clave: `proteccion`, `abundancia`, `calma`, `amor`, `intuicion` y/o `destacado`.
   - **Resultado:** La web clasifica el producto automáticamente en su sección, en el filtro y en el oráculo sin tocar una sola línea de código.
2. **Desactivar o agotar producto:**
   - Al marcar inventario en 0 o cambiar estado a "Borrador", el producto desaparece automáticamente de la portada y colecciones, manteniendo la estética impecable.
