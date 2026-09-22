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
  kits: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="46" width="104" height="76" rx="8"/><path d="M18 70h104"/><path d="M40 46c0-14 10-24 30-24s30 10 30 24"/></svg>`,
  quadros: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="72" height="102" rx="6"/><circle cx="38" cy="46" r="8"/><path d="M22 96l20-24 16 16 12-14 8 22"/></svg>`,
  outros: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M70 118S22 90 22 54a26 26 0 0 1 48-14 26 26 0 0 1 48 14c0 36-48 64-48 64Z"/></svg>`
};

// Categorias exibidas nos atalhos e nos filtros. "photo" é opcional:
// quando presente, o atalho mostra a foto no lugar do ícone de linha.
const CATEGORIES = [
  { id: "garrafas",  label: "Garrafas"  },
  { id: "cadernos",  label: "Cadernos",  photo: "imagens/produtos/categoria-cadernos.jpg" },
  { id: "chaveiros", label: "Chaveiros", photo: "imagens/produtos/categoria-chaveiros.jpg" },
  { id: "quadros",   label: "Quadros",   photo: "imagens/produtos/categoria-quadros.jpg" },
  { id: "kits",      label: "Kits"      },
  { id: "outros",    label: "Outros",    photo: "imagens/produtos/categoria-polaroides.jpg" }
];

// Catálogo de produtos. "favorite: true" aparece em "Nossos queridinhos".
// Só produtos com foto real (photo) — sem itens de espaço reservado.
const PRODUCTS = [
  { id: "garrafa-termica",     name: "Garrafa Térmica Personalizada",   category: "garrafas",  desc: "Inox, nome ou logo personalizados",     price: 69.90, favorite: true,  photo: "imagens/produtos/garrafa-termica-preta.jpg" },
  { id: "garrafa-squeeze",     name: "Garrafa Squeeze Personalizada",   category: "garrafas",  desc: "Com mosquetão, diversas cores",          price: 49.90, favorite: false, photo: "imagens/produtos/garrafa-squeeze-mosquetao.jpg" },
  { id: "copo-termico",        name: "Copo Térmico com Alça",           category: "garrafas",  desc: "Inox, com alça e canudo",                price: 64.90, favorite: true,  photo: "imagens/produtos/copo-termico-alca.jpg" },
  { id: "copo-termico-grande", name: "Copo Térmico com Alça — Grande",  category: "garrafas",  desc: "Modelo XL, com alça e canudo",           price: 74.90, favorite: false, photo: "imagens/produtos/copo-termico-mockup.jpg" },
  { id: "caderno-capa",        name: "Caderno Personalizado",           category: "cadernos",  desc: "Espiral, capa \"Sua arte aqui\"",         price: 39.90, favorite: true,  photo: "imagens/produtos/caderno-sua-arte-amarelo.jpg" },
  { id: "caderno-rosa",        name: "Caderno Personalizado Rosa",      category: "cadernos",  desc: "Espiral, capa personalizada",            price: 39.90, favorite: false, photo: "imagens/produtos/caderno-sua-arte-rosa.jpg" },
  { id: "mini-caderno",        name: "Mini Caderno com Inicial",        category: "cadernos",  desc: "Bolso, nome e inicial personalizados",   price: 24.90, favorite: false, photo: "imagens/produtos/mini-caderno-iniciais.jpg" },
  { id: "chaveiro-acrilico",   name: "Chaveiro Personalizado",          category: "chaveiros", desc: "Formato disco de vinil, com frase",      price: 19.90, favorite: true,  photo: "imagens/produtos/chaveiros-vinil.jpg" },
  { id: "quadro-formando",     name: "Porta-retrato Formando",          category: "quadros",   desc: "MDF, com foto e ano de formatura",       price: 54.90, favorite: true,  photo: "imagens/produtos/quadro-formando.jpg" },
  { id: "quadro-padrinho",     name: "Porta-retrato Padrinho/Madrinha", category: "quadros",   desc: "Madeira, com foto e dedicatória",        price: 49.90, favorite: false, photo: "imagens/produtos/quadro-padrinho.jpg" },
  { id: "quadro-coracao",      name: "Quadro Coração da Família",       category: "quadros",   desc: "Formato coração, foto e frase",          price: 44.90, favorite: false, photo: "imagens/produtos/quadro-coracao-familia.jpg" },
  { id: "quadro-estrela",      name: "Quadro Estrela Dia dos Pais",     category: "quadros",   desc: "Madeira, gravação personalizada",        price: 39.90, favorite: false, photo: "imagens/produtos/quadro-estrela-pai.jpg" },
  { id: "quadro-casinha",      name: "Quadro Casinha da Família",       category: "quadros",   desc: "MDF, frase personalizada",               price: 39.90, favorite: false, photo: "imagens/produtos/quadro-casinha-familia.jpg" },
  { id: "trofeu-professor",    name: "Troféu Melhor Professor",         category: "quadros",   desc: "MDF, gravação personalizada",            price: 44.90, favorite: false, photo: "imagens/produtos/trofeu-professor.jpg" },
  { id: "quadro-redondo",      name: "Quadro Redondo de Formatura",     category: "quadros",   desc: "MDF, com nome da turma",                 price: 49.90, favorite: false, photo: "imagens/produtos/quadro-redondo-formatura.jpg" },
  { id: "kit-formatura",       name: "Kit Formatura",                   category: "kits",      desc: "Porta-retrato + chaveiros com nome",     price: 89.90, favorite: false, photo: "imagens/produtos/kit-quadro-chaveiro-formatura.jpg" },
  { id: "medalhas",            name: "Medalha de Formatura",            category: "outros",    desc: "Madeira, com nome e fita colorida",      price: 24.90, favorite: false, photo: "imagens/produtos/medalhas-formatura.jpg" },
  { id: "album-memorias",      name: "Álbum de Fotos Personalizado",    category: "outros",    desc: "Espiral, capa \"Memórias\"",              price: 49.90, favorite: true,  photo: "imagens/produtos/album-memorias-vermelho.jpg" },
  { id: "cartoes-polaroide",   name: "Cartões Polaroide Personalizados", category: "outros",   desc: "Kit com fotos estilo polaroid",          price: 29.90, favorite: true,  photo: "imagens/produtos/cartoes-polaroide.jpg" }
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
  row.innerHTML = CATEGORIES.map((cat) =>
    cat.photo
      ? `
    <button class="cat-chip cat-chip-photo" data-cat="${cat.id}" style="background-image:url('${cat.photo}')" aria-label="${cat.label}"></button>`
      : `
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
// Gera o conteúdo do "quadro-foto" de um produto: foto real quando existir,
// ou o ícone de linha da categoria como espaço reservado.
function productPhotoHtml(p) {
  return p.photo
    ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">`
    : (ICONS[p.category] || "");
}

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
        <div class="product-photo${p.photo ? "" : " icon-frame"}">${productPhotoHtml(p)}</div>
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
        <div class="fav-photo${p.photo ? "" : " icon-frame"}">${productPhotoHtml(p)}</div>
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
