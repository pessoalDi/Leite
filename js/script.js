/* ============================================================
   Lets Mimos — script principal
   ============================================================
   Produtos, preços, fotos e ordem são gerenciados pela
   Gerência Leiticia. Aqui só é preciso configurar o
   WHATSAPP_NUMBER e as duas chaves do Supabase abaixo.
   ============================================================ */

// Número de WhatsApp do vendedor, formato internacional, só dígitos:
// 55 (Brasil) + DDD + número. Troque pelo número real antes de publicar.
const WHATSAPP_NUMBER = "5592900000000";

// Ícones usados como "foto" provisória quando o produto não tem foto.
const ICONS = {
  garrafas: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M42 8h16v14c6 6 10 12 10 22v66a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V44c0-10 4-16 10-22V8Z"/><path d="M40 8h20"/><path d="M34 60h32"/></svg>`,
  cadernos: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="12" width="68" height="96" rx="6"/><path d="M30 12v96" opacity="0.5"/><path d="M46 40c8-6 18-2 18 6s-14 8-14 16 10 10 18 6"/></svg>`,
  chaveiros: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="38" cy="30" r="18"/><circle cx="38" cy="30" r="7"/><path d="M50 42 82 74"/><rect x="70" y="86" width="20" height="26" rx="5" transform="rotate(8 70 86)"/></svg>`,
  quadros: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="72" height="102" rx="6"/><circle cx="38" cy="46" r="8"/><path d="M22 96l20-24 16 16 12-14 8 22"/></svg>`,
  polaroides: `<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="10" width="72" height="88" rx="4"/><rect x="22" y="18" width="56" height="52" rx="2"/></svg>`,
  outros: `<svg viewBox="0 0 140 140" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M70 118S22 90 22 54a26 26 0 0 1 48-14 26 26 0 0 1 48 14c0 36-48 64-48 64Z"/></svg>`
};

// ============================================================
// Dados do catálogo — vêm da Gerência Leiticia (Supabase).
// Os MESMOS valores do js/config.js da Gerência.
// ============================================================
const SUPABASE_URL = "https://oxhemopmgqbxlwezdvfm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aGVtb3BtZ3FieGx3ZXpkdmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxOTI1MDIsImV4cCI6MjEwNTc2ODUwMn0.m8P-QdEkQo6uRmSwD28c0Uo3VIz5uSAMOpEQPG9oNzw";

// Preenchidos por loadCatalog() antes de renderizar a página.
// CATEGORIES só inclui categorias ativas que tenham ao menos um produto.
let CATEGORIES = [];
let PRODUCTS = [];

async function fetchTable(path) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Supabase respondeu ${response.status}`);
  return response.json();
}

async function loadCatalog() {
  // o banco já só devolve o que está marcado como ativo (regras do setup.sql)
  const [cats, prods] = await Promise.all([
    fetchTable("categorias?select=id,nome&order=posicao.asc,nome.asc"),
    fetchTable("produtos?select=id,nome,categoria,descricao,preco,favorito,imagem_url&order=posicao.asc,id.asc")
  ]);

  const activeCats = new Set(cats.map((c) => c.id));

  PRODUCTS = prods
    // produto de categoria escondida não aparece; sem categoria entra em "outros"
    .filter((p) => !p.categoria || activeCats.has(p.categoria))
    .map((p) => ({
      id: p.id,
      name: p.nome,
      category: p.categoria || "outros",
      desc: p.descricao || "",
      price: Number(p.preco),
      favorite: !!p.favorito,
      photo: p.imagem_url || undefined
    }));

  const used = new Set(PRODUCTS.map((p) => p.category));
  CATEGORIES = cats
    .filter((c) => used.has(c.id))
    .map((c) => ({ id: c.id, label: c.nome }));
  if (used.has("outros") && !CATEGORIES.some((c) => c.id === "outros")) {
    CATEGORIES.push({ id: "outros", label: "Outros" });
  }
}

// Escapa texto vindo do banco antes de inserir no HTML.
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
    .map((c) => `<button class="filter-btn" data-cat="${esc(c.id)}">${esc(c.label)}</button>`)
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
// Foto real quando existir, ou o ícone de linha da categoria como espaço reservado.
function productPhotoHtml(p) {
  return p.photo
    ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">`
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
          <span class="product-cat-tag">${esc(categoryLabel(p.category))}</span>
          <h3>${esc(p.name)}</h3>
          ${p.desc ? `<p class="product-desc">${esc(p.desc)}</p>` : ""}
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
        <h3>${esc(p.name)}</h3>
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
      : "Olá! Vim pelo site da Lets Mimos e gostaria de mais informações.";
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
    await loadCatalog();
    renderFilters();
    renderFavorites();
  } catch (err) {
    console.error("Não foi possível carregar os produtos:", err);
    document.getElementById("productGrid").innerHTML =
      `<p style="grid-column:1/-1;text-align:center;color:var(--brown-soft);">
        Não foi possível carregar os produtos agora. Tente novamente em instantes.
      </p>`;
  }
});
