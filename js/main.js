/**
 * ENCHANTED GEMS - CORE ENGINE (PRANA STYLE)
 * Preloader, Stardust Canvas, Dynamic Filtering, Mystic Oracle, & Drawer Cart
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStarfieldCanvas();
  initIntentionFilter();
  initCartDrawer();
  initMysticOracle();
  initQuickView();
});

/* ==========================================================================
   1. PRELOADER ENGINE (PRANA INSPIRATION + SMART SESSION STORAGE)
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('eg-preloader');
  const progressBar = document.querySelector('.eg-preloader-progress-bar');
  const statusText = document.querySelector('.eg-preloader-status');
  if (!preloader) return;

  const states = [
    "Sintonizando la energía de las gemas...",
    "Alineando geometría sagrada...",
    "Consagrando el espacio cósmico..."
  ];

  let stateIdx = 0;
  const statusInterval = setInterval(() => {
    stateIdx = (stateIdx + 1) % states.length;
    if (statusText) statusText.textContent = states[stateIdx];
  }, 600);

  // Animar barra de progreso
  if (progressBar) {
    setTimeout(() => { progressBar.style.width = '100%'; }, 50);
  }

  // Comprobar si ya fue visto en esta sesión
  const alreadySeen = sessionStorage.getItem('eg_prana_preloader_seen');

  function dismiss() {
    clearInterval(statusInterval);
    preloader.classList.add('eg-fade-out');
    sessionStorage.setItem('eg_prana_preloader_seen', 'true');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 850);
  }

  if (alreadySeen) {
    // Si ya lo vio, cierre express (400ms para evitar parpadeos bruscos)
    setTimeout(dismiss, 400);
  } else {
    // Primera visita: 1.8s elegante como en Prana
    window.addEventListener('load', () => {
      setTimeout(dismiss, 1200);
    });
    setTimeout(dismiss, 2000); // Fallback máximo
  }

  // Función global para poder probar el preloader en cualquier momento
  window.replayPreloader = function() {
    sessionStorage.removeItem('eg_prana_preloader_seen');
    preloader.style.display = 'flex';
    preloader.classList.remove('eg-fade-out');
    if (progressBar) progressBar.style.width = '0%';
    setTimeout(() => { if (progressBar) progressBar.style.width = '100%'; }, 50);
    setTimeout(dismiss, 1900);
  };
}

/* ==========================================================================
   2. COSMIC STARDUST CANVAS (PARTÍCULAS SUTILES)
   ========================================================================== */
function initStarfieldCanvas() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 12000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.25 + 0.08,
        drift: (Math.random() - 0.5) * 0.15,
        gold: Math.random() > 0.4
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold 
        ? `rgba(243, 212, 154, ${p.alpha * 0.85})` 
        : `rgba(200, 160, 240, ${p.alpha * 0.65})`;
      ctx.fill();
    }
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
}

/* ==========================================================================
   3. FILTRADO INTERACTIVO POR INTENCIÓN
   ========================================================================== */
function initIntentionFilter() {
  const pills = document.querySelectorAll('.intention-pill');
  const cards = document.querySelectorAll('.product-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const cardIntention = card.getAttribute('data-intention');
        if (filter === 'all' || cardIntention === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   4. DRAWER CART INTERACTIVO (SIMULADOR SHOPIFY AJAX CART)
   ========================================================================== */
let cart = [
  {
    id: 1,
    title: "Pulsera Zodíaco Aries · Jaspe Rojo & Ónix",
    price: 165000,
    priceFormatted: "$165.000 COP",
    image: "https://images.unsplash.com/photo-1611591475870-077553b6fa0f?auto=format&fit=crop&w=300&q=80",
    qty: 1
  }
];

function initCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const trigger = document.querySelector('.cart-trigger');
  const closeBtn = document.querySelector('.cart-close-btn');
  const addBtns = document.querySelectorAll('.card-add-btn');

  function openCart() {
    renderCart();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCart();
    });
  }

  // Manejar botones "Añadir a la bolsa" de cada tarjeta
  addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = parseInt(card.getAttribute('data-id'));
      const title = card.querySelector('.card-title').textContent.trim();
      const priceText = card.querySelector('.price-cop').textContent.trim();
      const priceNum = parseInt(priceText.replace(/[^0-9]/g, ''));
      const img = card.querySelector('.card-media img').src;

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id,
          title,
          price: priceNum,
          priceFormatted: priceText,
          image: img,
          qty: 1
        });
      }

      openCart();
    });
  });

  renderCart();
}

function renderCart() {
  const container = document.querySelector('.cart-items-container');
  const badge = document.querySelector('.cart-count-badge');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  const shippingMsg = document.querySelector('.free-shipping-msg');
  const shippingFill = document.querySelector('.shipping-progress-fill');
  if (!container) return;

  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  if (badge) badge.textContent = totalCount;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  if (subtotalEl) {
    subtotalEl.textContent = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal);
  }

  // Barra de Envío Gratis (Meta: $180.000 COP)
  const goal = 180000;
  if (shippingMsg && shippingFill) {
    if (subtotal >= goal) {
      shippingMsg.textContent = "✨ ¡Felicidades! Tienes ENVÍO GRATIS a todo el país";
      shippingFill.style.width = '100%';
    } else {
      const diff = goal - subtotal;
      const diffFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(diff);
      shippingMsg.textContent = `Te faltan ${diffFormatted} para ENVÍO GRATUITO`;
      shippingFill.style.width = Math.min(100, Math.round((subtotal / goal) * 100)) + '%';
    }
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 16px; margin-bottom: 8px;">Tu bolsa sagrada está vacía</p>
        <p style="font-size: 12px;">Explora nuestras colecciones y permite que la gema correcta te elija.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <div class="cart-item-price">${item.priceFormatted}</div>
        <div class="cart-qty-control">
          <button class="qty-btn" onclick="updateItemQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateItemQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button onclick="removeCartItem(${item.id})" style="color: var(--text-dim); font-size: 18px;" title="Eliminar">&times;</button>
    </div>
  `).join('');
}

window.updateItemQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
};

window.removeCartItem = function(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
};

/* ==========================================================================
   5. ORÁCULO MÍSTICO DE GEMAS (FEATURE ESTILO PRANA)
   ========================================================================== */
function initMysticOracle() {
  const consultBtn = document.getElementById('consult-oracle-btn');
  const intentionSelect = document.getElementById('oracle-intention-select');
  const zodiacSelect = document.getElementById('oracle-zodiac-select');
  const resultBox = document.getElementById('oracle-result');

  if (!consultBtn) return;

  const gemDatabase = {
    proteccion: {
      gem: "Obsidiana Negra & Turmalina",
      title: "Escudo Psíquico y Transmutación",
      ritual: "Lleva tu obsidiana en la muñeca izquierda para repeler vibraciones discordantes y crear un escudo de luz impenetrable.",
      productName: "Pulsera Escudo de Protección",
      badge: "Escudo Inquebrantable"
    },
    abundancia: {
      gem: "Citrino Dorado & Pirita",
      title: "Activador Solar de Manifestación",
      ritual: "Coloca tu citrino bajo la luz del amanecer los jueves y programa tu intención de prosperidad económica.",
      productName: "Anillo Solitario Citrino Natural",
      badge: "Oro Solar & Éxito"
    },
    calma: {
      gem: "Ópalo Andino & Amatista Lavanda",
      title: "Paz Profunda y Serenidad Espiritual",
      ritual: "Sostén la gema sobre tu pecho durante 5 minutos de respiración consciente para disolver la ansiedad cotidiana.",
      productName: "Collar Teardrop de Ópalo Andino",
      badge: "Serenidad Sagrada"
    },
    amor: {
      gem: "Cuarzo Rosa & Rubí en Venturina",
      title: "Magnetismo del Corazón & Autoaceptación",
      ritual: "Ungir la gema con aceite esencial de rosas mientras afirmas: 'Merezco un amor tan puro como la luz divina'.",
      productName: "Anillo Doble Venturina Verde & Rubí",
      badge: "Vibración de Amor"
    },
    intuicion: {
      gem: "Lapislázuli & Labradorita Mística",
      title: "Tercer Ojo y Sabiduría Cósmica",
      ritual: "Medita sosteniendo la labradorita a la altura del entrecejo para amplificar la claridad en tus decisiones.",
      productName: "Pulsera Flor de la Vida - Lapislázuli",
      badge: "Claridad Astral"
    }
  };

  consultBtn.addEventListener('click', () => {
    const intention = intentionSelect.value;
    const zodiac = zodiacSelect.value;

    const data = gemDatabase[intention] || gemDatabase['proteccion'];

    resultBox.innerHTML = `
      <div style="font-size: 11px; letter-spacing: 0.24em; color: var(--gold-prana); text-transform: uppercase; margin-bottom: 6px;">
        ✨ Oráculo Consultado para el signo ${zodiac.toUpperCase()}
      </div>
      <h3 class="oracle-gem-title">${data.gem}</h3>
      <p style="color: var(--stalactite); font-weight: 500; font-size: 14px; margin-bottom: 10px;">${data.title}</p>
      <p class="oracle-ritual-text">${data.ritual}</p>
      <button class="btn-primary-gold" onclick="document.querySelector('#catalogo').scrollIntoView({behavior: 'smooth'})" style="margin-top: 10px;">
        Explorar Joya Afín (${data.productName})
      </button>
    `;

    resultBox.classList.add('active');
  });
}

/* ==========================================================================
   6. VISTA RÁPIDA (QUICK VIEW MODAL)
   ========================================================================== */
function initQuickView() {
  const quickBtns = document.querySelectorAll('.quick-view-btn');
  quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const title = card.querySelector('.card-title').textContent;
      const desc = card.querySelector('.card-description').textContent;
      const price = card.querySelector('.price-cop').textContent;
      const img = card.querySelector('.card-media img').src;
      const meta = card.querySelector('.card-gem-meta').textContent;

      alert(`[Vista Rápida Sagrada]\n\n${title}\nPrecio: ${price}\nAtributos: ${meta}\n\n${desc}`);
    });
  });
}
