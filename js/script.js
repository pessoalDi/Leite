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

// ============================================================
// Ideias de presente — a gaveta do canto superior esquerdo.
// Os "id" precisam ser IGUAIS aos da Gerência (js/app.js → IDEIAS),
// porque é com eles que cada produto é marcado.
// Os grupos com "faixa" filtram pelo preço, sem precisar marcar.
// ============================================================
const IDEAS = [
  {
    group: "Datas comemorativas",
    items: [
      { id: "dia-das-maes-pais", label: "Dia das Mães e dos Pais" },
      { id: "namorados",         label: "Dia dos Namorados e aniversário de namoro ou casamento" },
      { id: "professores",       label: "Dia dos Professores" },
      { id: "criancas",          label: "Dia das Crianças" },
      { id: "natal",             label: "Natal e fim de ano", hint: "Brindes e agradecimentos" },
      { id: "dia-da-mulher",     label: "Dia da Mulher" }
    ]
  },
  {
    group: "Ocasiões e celebrações",
    items: [
      { id: "aniversario",  label: "Aniversários" },
      { id: "maternidade",  label: "Maternidade, chá de bebê e revelação" },
      { id: "religioso",    label: "Batizado, primeira comunhão e crisma" },
      { id: "casamento",    label: "Casamento e padrinhos" },
      { id: "formatura",    label: "Formaturas" },
      { id: "casa-nova",    label: "Boas-vindas e casa nova" }
    ]
  },
  {
    group: "Para quem vai receber",
    items: [
      { id: "para-ele",  label: "Para ele" },
      { id: "para-ela",  label: "Para ela" },
      { id: "amigos",    label: "Para amigos e melhores amigos" },
      { id: "casais",    label: "Para casais" },
      { id: "avos",      label: "Para avós" },
      { id: "pets",      label: "Para pets e donos de pet" },
      { id: "trabalho",  label: "Para chefe, equipe e colegas de trabalho" }
    ]
  },
  {
    group: "Por estilo do mimo",
    items: [
      { id: "cultura-pop", label: "Gamer e cultura pop", hint: "Fãs de séries e música" },
      { id: "viagem",      label: "Viagem e aventuras", hint: "Passaportes, tags de mala, chaveiros" },
      { id: "papelaria",   label: "Organização e papelaria afetiva", hint: "Planners, agendas, cadernos" },
      { id: "corporativo", label: "Corporativo e eventos", hint: "Kits personalizados para empresas" }
    ]
  },
  {
    group: "Por faixa de preço",
    items: [
      { id: "ate-30",    label: "Mimos até R$ 30", hint: "Ótimo para lembrancinhas de última hora", min: 0,  max: 30 },
      { id: "30-a-70",   label: "Kits de R$ 30 a R$ 70", min: 30.01, max: 70 },
      { id: "acima-70",  label: "Presentes especiais", hint: "Acima de R$ 70", min: 70.01, max: Infinity }
    ]
  }
];

const ALL_IDEAS = IDEAS.flatMap((g) => g.items);
const findIdea = (id) => ALL_IDEAS.find((i) => i.id === id);

// Filtros ativos na vitrine
let activeCategory = "todos";
let activeIdea = null;

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
  const campos = "id,nome,categoria,descricao,preco,favorito,imagem_url";
  const ordem = "order=posicao.asc,id.asc";
  const cats = await fetchTable("categorias?select=id,nome&order=posicao.asc,nome.asc");
  let prods;
  try {
    prods = await fetchTable(`produtos?select=${campos},tags&${ordem}`);
  } catch (err) {
    // banco ainda sem a coluna "tags" (migração não rodada): segue sem as ideias marcadas
    prods = await fetchTable(`produtos?select=${campos}&${ordem}`);
  }

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
      photo: p.imagem_url || undefined,
      tags: Array.isArray(p.tags) ? p.tags : []
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

/* ---------------- filtros: categoria + ideia ---------------- */
function matchesIdea(p, idea) {
  if (!idea) return true;
  if (idea.max !== undefined) return p.price >= idea.min && p.price <= idea.max;
  return p.tags.includes(idea.id);
}

function countForIdea(idea) {
  return PRODUCTS.filter((p) => matchesIdea(p, idea)).length;
}

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
  activeCategory = cat;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderProducts();
}

function setActiveIdea(ideaId, { scroll = true } = {}) {
  activeIdea = ideaId ? findIdea(ideaId) || null : null;

  // mantém o link compartilhável: site.com/?ideia=dia-das-maes-pais
  const url = new URL(window.location.href);
  if (activeIdea) url.searchParams.set("ideia", activeIdea.id);
  else url.searchParams.delete("ideia");
  history.replaceState(null, "", url);

  // ao escolher uma ideia, começa mostrando todas as categorias
  if (activeIdea) setActiveFilter("todos");
  else renderProducts();

  renderIdeaBanner();
  renderIdeasList();
  if (scroll) document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}

function renderIdeaBanner() {
  const banner = document.getElementById("ideaBanner");
  if (!activeIdea) {
    banner.hidden = true;
    banner.innerHTML = "";
    return;
  }
  const n = countForIdea(activeIdea);
  banner.hidden = false;
  banner.innerHTML = `
    <p>Ideias para <strong>${esc(activeIdea.label)}</strong> · ${n} ${n === 1 ? "mimo" : "mimos"}</p>
    <button class="idea-clear" type="button">Ver todos os produtos</button>`;
  banner.querySelector(".idea-clear").addEventListener("click", () => setActiveIdea(null, { scroll: false }));
}

/* ---------------- render: product grid ---------------- */
// Foto real quando existir, ou o ícone de linha da categoria como espaço reservado.
function productPhotoHtml(p) {
  return p.photo
    ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">`
    : (ICONS[p.category] || "");
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list = PRODUCTS.filter((p) =>
    (activeCategory === "todos" || p.category === activeCategory) && matchesIdea(p, activeIdea)
  );

  if (!list.length) {
    const tema = activeIdea ? activeIdea.label : categoryLabel(activeCategory);
    const msg = `Olá! Estou procurando um presente na linha "${tema}". Vocês conseguem criar algo personalizado?`;
    grid.innerHTML = `
      <div class="idea-empty">
        <h3>Esse mimo a gente cria sob medida</h3>
        <p>Ainda não temos peças no site em <strong>“${esc(tema)}”</strong>${activeIdea && activeCategory !== "todos" ? ` na categoria ${esc(categoryLabel(activeCategory))}` : ""}, mas é só contar sua ideia que a gente monta.</p>
        <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
      </div>`;
    return;
  }

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

/* ---------------- gaveta de ideias ---------------- */
function renderIdeasList() {
  const list = document.getElementById("ideasList");
  list.innerHTML = IDEAS.map((g) => `
    <section class="ideas-group">
      <h3>${esc(g.group)}</h3>
      <ul>
        ${g.items.map((i) => {
          const n = countForIdea(i);
          const ativo = activeIdea && activeIdea.id === i.id;
          return `
          <li>
            <button type="button" class="idea-link${ativo ? " active" : ""}" data-idea="${esc(i.id)}"${ativo ? ' aria-current="true"' : ""}>
              <span>${esc(i.label)}${i.hint ? `<small>${esc(i.hint)}</small>` : ""}</span>
              <span class="idea-count${n ? "" : " zero"}" aria-label="${n} produtos">${n}</span>
            </button>
          </li>`;
        }).join("")}
      </ul>
    </section>`).join("");
}

function openIdeas() {
  const drawer = document.getElementById("ideasDrawer");
  const overlay = document.getElementById("ideasOverlay");
  drawer.hidden = false;
  overlay.hidden = false;
  // força o navegador a aplicar o estado inicial antes de animar
  void drawer.offsetWidth;
  drawer.classList.add("open");
  overlay.classList.add("show");
  document.body.classList.add("no-scroll");
  document.getElementById("ideasBtn").setAttribute("aria-expanded", "true");
  document.getElementById("ideasClose").focus();
}

function closeIdeas() {
  const drawer = document.getElementById("ideasDrawer");
  const overlay = document.getElementById("ideasOverlay");
  if (drawer.hidden) return;
  drawer.classList.remove("open");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
  const btn = document.getElementById("ideasBtn");
  btn.setAttribute("aria-expanded", "false");
  setTimeout(() => {
    drawer.hidden = true;
    overlay.hidden = true;
  }, 280);
  btn.focus();
}

function wireIdeas() {
  renderIdeasList();
  document.getElementById("ideasBtn").addEventListener("click", openIdeas);
  document.getElementById("ideasClose").addEventListener("click", closeIdeas);
  document.getElementById("ideasOverlay").addEventListener("click", closeIdeas);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeIdeas();
  });
  document.getElementById("ideasList").addEventListener("click", (e) => {
    const btn = e.target.closest(".idea-link");
    if (!btn) return;
    closeIdeas();
    setActiveIdea(btn.dataset.idea);
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
  wireIdeas();
  document.getElementById("year").textContent = new Date().getFullYear();

  try {
    await loadCatalog();
    renderFilters();
    renderFavorites();
    renderIdeasList();

    // link direto para uma ideia: site.com/?ideia=dia-das-maes-pais
    const ideiaDoLink = new URLSearchParams(window.location.search).get("ideia");
    if (ideiaDoLink && findIdea(ideiaDoLink)) setActiveIdea(ideiaDoLink);
  } catch (err) {
    console.error("Não foi possível carregar os produtos:", err);
    document.getElementById("productGrid").innerHTML =
      `<p style="grid-column:1/-1;text-align:center;color:var(--brown-soft);">
        Não foi possível carregar os produtos agora. Tente novamente em instantes.
      </p>`;
  }
});
