# ✦ Enchanted Gems · Prototipo Revamp Estilo PRANA

Prototipo interactivo de alta fidelidad para el rediseño total de **Enchanted Gems** ([enchanted-gems.com](https://enchanted-gems.com/)), inspirado en la estética mística de lujo, alquimia sagrada y talismanes de [PRANA](https://bruisertech.github.io/PRANA/).

Incluye el nuevo preloader con el logo oficial registrado ante la SIC (Morado Pantone 2597 C y Blanco Stalactite) transformado en un medallón sagrado con orbital de luz dorado continuo, canvas cósmico de polvo estelar, filtro interactivo de intenciones, oráculo místico de gemas y simulador de carrito lateral (Drawer Cart).

---

## 🚀 Despliegue Inmediato en GitHub Pages ("Deploy from a branch")

Este repositorio está estructurado para funcionar directamente desde la raíz (`/`) sin necesidad de pasos de compilación ni dependencias complejas (`zero-config build`).

### Paso 1: Crear el repositorio en tu cuenta de GitHub
1. Entra a [github.com/new](https://github.com/new).
2. Nómbralo (por ejemplo: `enchanted-gems-revamp` o `enchanted-gems-prana`).
3. Déjalo **Público** (o privado si tienes GitHub Pro) y no inicialices con README (ya lo tienes aquí).

### Paso 2: Subir el código desde tu terminal
```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "feat: Initial Enchanted Gems revamp with PRANA aesthetic & preloader"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/enchanted-gems-prana.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En tu repositorio de GitHub, haz clic en la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source:** Selecciona `Deploy from a branch`.
   - **Branch:** Selecciona `main` y en la carpeta deja `/ (root)`.
4. Haz clic en **Save**.
5. Espera entre 30 y 60 segundos. GitHub te generará la URL pública:  
   `https://TU_USUARIO.github.io/enchanted-gems-prana/`

---

## 🎨 Características de Diseño & Filosofía Visual

* **Paleta Alquímica:** 
  - Fondo Medianoche / Obsidiana profunda (`#07030A` y `#0E0514`).
  - Morado Oficial SIC PANTONE 2597 C (`#5C068C`) y aura mística.
  - Oro Alquímico Líquido (`#D4AF37`, `#F3D49A`).
  - Blanco Mineral Stalactite PANTONE 11-4101 TCX (`#F7F6F2`).
* **Preloader Inteligente:**
  - Medallón sagrado con la luna, gema facetada y rayos cósmicos.
  - Anillo orbital continuo en SVG con resplandor dorado.
  - Control de sesión (`sessionStorage`): no aburre al usuario en recargas sucesivas de la misma sesión.
  - Botón de prueba en cabecera: `✦ Repetir Intro` para mostrar la animación a tu cliente en cualquier momento.
* **Componentes Interactivos:**
  - Canvas liviano de polvo estelar cósmico.
  - Filtro dinámico por intención (Protección, Abundancia, Calma, Amor, Intuición).
  - Oráculo Místico de Gemas con sugerencia de ritual personalizado y enlace directo al producto afín.
  - Carrito lateral deslizante (*Drawer Cart*) con cálculo en tiempo real, contador de artículos y medidor dinámico de envío gratuito a Colombia ($180.000 COP).
