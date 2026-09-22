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
  quadros: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="72" height="102" rx="6"/><circle cx="38" cy="46" r="8"/><path d="M22 96l20-24 16 16 12-14 8 22"/></svg>`,
  polaroides: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="10" width="72" height="88" rx="4"/><rect x="22" y="18" width="56" height="52" rx="2"/></svg>`,
  outros: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M70 118S22 90 22 54a26 26 0 0 1 48-14 26 26 0 0 1 48 14c0 36-48 64-48 64Z"/></svg>`
};

// Categorias exibidas nos atalhos e nos filtros. "photo" é opcional:
// quando presente, o atalho mostra a foto no lugar do ícone de linha.
const CATEGORIES = [
  { id: "garrafas",   label: "Garrafas",   photo: "imagens/produtos/categoria-garrafas.jpg" },
  { id: "cadernos",   label: "Cadernos",   photo: "imagens/produtos/categoria-cadernos.jpg" },
  { id: "chaveiros",  label: "Chaveiros",  photo: "imagens/produtos/categoria-chaveiros.jpg" },
  { id: "quadros",    label: "Quadros",    photo: "imagens/produtos/categoria-quadros.jpg" },
  { id: "polaroides", label: "Polaroides", photo: "imagens/produtos/categoria-polaroides.jpg" },
  { id: "outros",     label: "Outros"      }
];

// Catálogo de produtos. Antes era uma lista fixa aqui — agora vem da
// planilha do Google Sheets (ver SHEET_CSV_URL logo abaixo). Preenchido
// automaticamente por loadProductsFromSheet() antes de renderizar a página.
let PRODUCTS = [];

// Link da planilha de produtos, exportando direto a aba "produto" (pelo
// gid dela), no formato CSV. Assim, mesmo se você criar outras abas na
// planilha (rascunhos, testes), o site sempre lê a aba certa.
// Formato: .../spreadsheets/d/ID_DA_PLANILHA/export?format=csv&gid=ID_DA_ABA
// (o ID da planilha e o gid aparecem na barra de endereço quando você
// está com a aba certa aberta no navegador).
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1KwZgzut6sWvjObR1dWAaL2qlGknm9jY9hWnxRNQkLX8/export?format=csv&gid=205037285";

// Busca e converte os produtos da planilha. Aceita tanto cabeçalhos em
// português (COD PRODUTO, NOME, CATEGORIA, DESCRIÇÃO, PREÇO, FAVORITO,
// IMAGEM) quanto em inglês (id, name, category, desc, price, favorite,
// photo) — o que estiver na sua planilha funciona. FAVORITO aceita
// SIM/NÃO ou TRUE/FALSE. Uma linha sem preço válido não aparece no site
// (fica de fora até você preencher o valor).
function pickField(row, ...names) {
  for (const name of names) {
    if (row[name] !== undefined && row[name] !== null) return row[name];
  }
  return "";
}

async function loadProductsFromSheet() {
  const response = await fetch(SHEET_CSV_URL);
  const csvText = await response.text();
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim()
  });

  PRODUCTS = parsed.data
    .map((row) => {
      const id = String(pickField(row, "id", "COD PRODUTO", "Cod Produto")).trim();
      const name = String(pickField(row, "name", "NOME", "Nome")).trim();
      const category = String(pickField(row, "category", "CATEGORIA", "Categoria")).trim().toLowerCase();
      const desc = String(pickField(row, "desc", "DESCRIÇÃO", "Descrição")).trim();
      const rawPrice = String(pickField(row, "price", "PREÇO", "Preço")).trim();
      const rawFavorite = String(pickField(row, "favorite", "FAVORITO", "Favorito")).trim().toUpperCase();
      const photo = String(pickField(row, "photo", "IMAGEM", "Imagem")).trim();

      const price = parseFloat(rawPrice.replace(",", "."));

      return {
        id, name, category, desc,
        price,
        favorite: rawFavorite === "TRUE" || rawFavorite === "SIM",
        photo: photo || undefined
      };
    })
    // só entram no site linhas com nome e um preço válido preenchido
    .filter((p) => p.id && p.name && !Number.isNaN(p.price));
}

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
document.addEventListener("DOMContentLoaded", async () => {
  renderTestimonials();
  wireWaCtas();
  wireNavToggle();
  document.getElementById("year").textContent = new Date().getFullYear();

  try {
    await loadProductsFromSheet();
    renderFilters();
    renderFavorites();
  } catch (err) {
    console.error("Não foi possível carregar os produtos da planilha:", err);
    document.getElementById("productGrid").innerHTML =
      `<p style="grid-column:1/-1;text-align:center;color:var(--brown-soft);">
        Não foi possível carregar os produtos agora. Tente novamente em instantes.
      </p>`;
  }
});
