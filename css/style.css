/* ============================================================
   Lets_mimos — script principal
   ============================================================
   Para configurar o site do cliente, edite apenas as duas
   constantes abaixo (WHATSAPP_NUMBER) e o array PRODUCTS.
   ============================================================ */

// Número de WhatsApp do vendedor, formato internacional, só dígitos:
// 55 (Brasil) + DDD + número. Troque pelo número real antes de publicar.
const WHATSAPP_NUMBER = "5592900000000";

// Ícones usados como "foto" provisória de cada categoria (troque por
// fotos reais em /images quando o cliente enviar o material).
const ICONS = {
  garrafas: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M42 8h16v14c6 6 10 12 10 22v66a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V44c0-10 4-16 10-22V8Z"/><path d="M40 8h20"/><path d="M34 60h32"/></svg>`,
  cadernos: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="12" width="68" height="96" rx="6"/><path d="M30 12v96" opacity="0.5"/><path d="M46 40c8-6 18-2 18 6s-14 8-14 16 10 10 18 6"/></svg>`,
  chaveiros: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="38" cy="30" r="18"/><circle cx="38" cy="30" r="7"/><path d="M50 42 82 74"/><rect x="70" y="86" width="20" height="26" rx="5" transform="rotate(8 70 86)"/></svg>`,
  canecas: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 40h48v40a18 18 0 0 1-18 18H40a18 18 0 0 1-18-18V40Z"/><path d="M70 48h6a12 12 0 0 1 0 24h-6"/></svg>`,
  copos: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="10" width="40" height="16" rx="4"/><path d="M34 26h32l6 12v72a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V38l6-12Z"/></svg>`,
  ecobags: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M26 40h48l6 66a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6l6-66Z"/><path d="M36 40v-8a14 14 0 0 1 28 0v8"/></svg>`,
  kits: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="46" width="104" height="76" rx="8"/><path d="M18 70h104"/><path d="M40 46c0-14 10-24 30-24s30 10 30 24"/></svg>`,
  outros: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M70 118S22 90 22 54a26 26 0 0 1 48-14 26 26 0 0 1 48 14c0 36-48 64-48 64Z"/></svg>`
};

// Categorias exibidas nos atalhos e nos filtros.
const CATEGORIES = [
  { id: "garrafas",  label: "Garrafas"  },
  { id: "cadernos",  label: "Cadernos"  },
  { id: "chaveiros", label: "Chaveiros" },
  { id: "canecas",   label: "Canecas"   },
  { id: "copos",     label: "Copos"     },
  { id: "ecobags",   label: "Ecobags"   },
  { id: "kits",      label: "Kits"      },
  { id: "outros",    label: "Outros"    }
];

// Catálogo de produtos. "favorite: true" aparece em "Nossos queridinhos".
const PRODUCTS = [
  { id: "garrafa-termica",  name: "Garrafa Térmica Personalizada", category: "garrafas",  desc: "500ml, nome ou frase gravada",     price: 59.90, favorite: true  },
  { id: "garrafa-squeeze",  name: "Garrafa Squeeze Personalizada", category: "garrafas",  desc: "650ml, diversas cores",             price: 49.90, favorite: false },
  { id: "caderno-capa",     name: "Caderno Personalizado",         category: "cadernos",  desc: "Capa dura, personalizada",          price: 39.90, favorite: true  },
  { id: "caderno-pautado",  name: "Bloco de Notas Personalizado",  category: "cadernos",  desc: "80 folhas, pautado",                price: 24.90, favorite: false },
  { id: "chaveiro-acrilico",name: "Chaveiro Personalizado",        category: "chaveiros", desc: "Acrílico, modelo personalizado",    price: 19.90, favorite: true  },
  { id: "chaveiro-casal",   name: "Chaveiro de Casal",             category: "chaveiros", desc: "Par de chaveiros combinando",       price: 34.90, favorite: false },
  { id: "caneca-porcelana", name: "Caneca Personalizada",          category: "canecas",   desc: "Porcelana, 325ml",                  price: 34.90, favorite: true  },
  { id: "caneca-termica",   name: "Caneca Térmica Personalizada",  category: "canecas",   desc: "Inox, mantém a temperatura",        price: 54.90, favorite: false },
  { id: "copo-termico",     name: "Copo Térmico Personalizado",    category: "copos",     desc: "600ml, canudo incluso",             price: 44.90, favorite: true  },
  { id: "copo-long",        name: "Copo Long Drink Personalizado", category: "copos",     desc: "350ml, acrílico resistente",        price: 29.90, favorite: false },
  { id: "ecobag-basica",    name: "Ecobag Personalizada",          category: "ecobags",   desc: "Algodão cru, estampa exclusiva",    price: 39.90, favorite: true  },
  { id: "ecobag-bolso",     name: "Ecobag com Bolso Personalizada",category: "ecobags",   desc: "Reforçada, com bolso frontal",      price: 49.90, favorite: false },
  { id: "kit-maternidade",  name: "Kit Maternidade",               category: "kits",      desc: "Garrafa + caderno + chaveiro",      price: 129.90, favorite: true },
  { id: "kit-presente",     name: "Kit Presente Especial",         category: "kits",      desc: "Caneca + ecobag + cartão",          price: 99.90,  favorite: false },
  { id: "porta-copo",       name: "Porta-copo Personalizado",      category: "outros",    desc: "Conjunto com 4 unidades",           price: 29.90,  favorite: false },
  { id: "quadro-mdf",       name: "Quadro Decorativo Personalizado", category: "outros",  desc: "MDF, tamanho A4",                   price: 44.90,  favorite: false }
];

const TESTIMONIALS = [
  { name: "Camila R.", text: "A garrafa personalizada chegou ainda mais linda do que eu imaginei. Atendimento super atencioso do início ao fim." },
  { name: "Juliana M.", text: "Comprei o kit maternidade de presente e foi um sucesso. Capricho em cada detalhe." },
  { name: "Fernanda A.", text: "Já é a terceira vez que compro. A caneca personalizada ficou perfeita, super recomendo." }
];

const brl = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function categoryLabel(id) {
  const found = CATEGORIES.find((c) => c.id === id);
  return found ? found.label : id;
}

/* ---------------- render: categories row ---------------- */
function renderCategories() {
  const row = document.getElementById("catRow");
  row.innerHTML = CATEGORIES.map(
    (cat) => `
    <button class="cat-chip" data-cat="${cat.id}">
      <span class="cat-icon">${ICONS[cat.id] || ""}</span>
      <span>${cat.label}</span>
    </button>`
  ).join("");

  row.querySelectorAll(".cat-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const cat = chip.dataset.cat;
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
      setActiveFilter(cat);
    });
  });
}

/* ---------------- render: filter buttons ---------------- */
function renderFilters() {
  const row = document.getElementById("filterRow");
  const all = [{ id: "todos", label: "Todos" }, ...CATEGORIES];
  row.innerHTML = all
    .map((c) => `<button class="filter-btn" data-cat="${c.id}">${c.label}</button>`)
    .join("");

  row.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => setActiveFilter(btn.dataset.cat));
  });

  setActiveFilter("todos");
}

function setActiveFilter(cat) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  document.querySelectorAll(".cat-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.cat === cat);
  });
  renderProducts(cat);
}

/* ---------------- render: product grid ---------------- */
function renderProducts(filter) {
  const grid = document.getElementById("productGrid");
  const list = filter && filter !== "todos"
    ? PRODUCTS.filter((p) => p.category === filter)
    : PRODUCTS;

  grid.innerHTML = list
    .map((p) => {
      const message = `Olá! Gostaria de comprar ${withArticle(p.name)} no valor de ${brl(p.price)}. Gostaria de saber mais detalhes.`;
      return `
      <article class="product-card">
        <div class="product-photo icon-frame">${ICONS[p.category] || ""}</div>
        <div class="product-body">
          <span class="product-cat-tag">${categoryLabel(p.category)}</span>
          <h3>${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <p class="product-price">${brl(p.price)}</p>
          <a class="product-btn" href="${waLink(message)}" target="_blank" rel="noopener">
            Personalizar pelo WhatsApp
          </a>
        </div>
      </article>`;
    })
    .join("");
}

// Pequeno auxiliar para deixar a mensagem mais natural em português.
function withArticle(name) {
  return `a ${name}`;
}

/* ---------------- render: favorites ---------------- */
function renderFavorites() {
  const grid = document.getElementById("favoritesGrid");
  const favs = PRODUCTS.filter((p) => p.favorite);
  grid.innerHTML = favs
    .map((p) => {
      const message = `Olá! Gostaria de comprar ${withArticle(p.name)} no valor de ${brl(p.price)}. Gostaria de saber mais detalhes.`;
      return `
      <a class="fav-card" href="${waLink(message)}" target="_blank" rel="noopener">
        <div class="fav-photo icon-frame">${ICONS[p.category] || ""}</div>
        <h3>${p.name}</h3>
        <p class="product-price">${brl(p.price)}</p>
      </a>`;
    })
    .join("");
}

/* ---------------- render: testimonials ---------------- */
function renderTestimonials() {
  const track = document.getElementById("testimonialTrack");
  track.innerHTML = TESTIMONIALS.map(
    (t) => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-quote">"${t.text}"</p>
      <p class="testimonial-name">${t.name}</p>
    </div>`
  ).join("");
}

/* ---------------- wire up: generic WhatsApp CTAs ---------------- */
function wireWaCtas() {
  document.querySelectorAll(".wa-cta, #headerWaBtn, #footerWaLink").forEach((el) => {
    const msg = el.dataset && el.dataset.waMsg
      ? el.dataset.waMsg
      : "Olá! Vim pelo site da Lets_mimos e gostaria de mais informações.";
    el.setAttribute("href", waLink(msg));
  });
}

/* ---------------- mobile nav toggle ---------------- */
function wireNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------------- init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderFilters();
  renderFavorites();
  renderTestimonials();
  wireWaCtas();
  wireNavToggle();
  document.getElementById("year").textContent = new Date().getFullYear();
});
