/* ============================================================
   Lets Mimos — script principal
   ============================================================
   Produtos, preços, fotos e ordem são gerenciados pela
   Gerência Leiticia. Aqui só é preciso configurar o
   WHATSAPP_NUMBER e as duas chaves do Supabase abaixo.
   ============================================================ */

// Número de WhatsApp do vendedor, formato internacional, só dígitos:
// 55 (Brasil) + DDD + número. Troque pelo número real antes de publicar.
const WHATSAPP_NUMBER = "5592993264251";

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
let activeIdeaView = "produtos"; // dentro de uma ideia: "produtos" ou "kits"

// Preenchidos por loadCatalog() antes de renderizar a página.
// CATEGORIES só inclui categorias ativas que tenham ao menos um produto.
let CATEGORIES = [];
let PRODUCTS = [];
let KITS = [];  // kits prontos por ideia (Gerência → aba Kits)

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

  // kits: se a tabela ainda não existir, o site segue normal sem kits
  try {
    const kits = await fetchTable("kits?select=id,nome,descricao,preco,imagem_url,ideias,itens&order=posicao.asc,criado_em.asc");
    const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
    KITS = kits
      .map((k) => {
        // só entram os itens que estão visíveis no site
        const items = (k.itens || []).map((id) => byId[id]).filter(Boolean);
        return {
          id: k.id,
          name: k.nome,
          desc: k.descricao || "",
          price: Number(k.preco),
          photo: k.imagem_url || undefined,
          tags: Array.isArray(k.ideias) ? k.ideias : [],
          items,
          itemsTotal: items.reduce((t, it) => t + it.price, 0)
        };
      })
      .filter((k) => k.items.length || k.photo);
  } catch (err) {
    KITS = [];
  }

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

function kitsForIdea(idea) {
  return KITS.filter((k) => matchesIdea(k, idea));
}

// na gaveta, o número de cada ideia soma produtos + kits
function countForIdea(idea) {
  return PRODUCTS.filter((p) => matchesIdea(p, idea)).length + kitsForIdea(idea).length;
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

  // dentro de uma ideia, os filtros de categoria somem: aparecem todos os produtos
  // da ideia e, ao lado, a opção "Kits".
  activeIdeaView = "produtos";
  document.getElementById("filterRow").hidden = !!activeIdea;
  document.getElementById("filterLabel").hidden = !!activeIdea;
  if (activeIdea) setActiveFilter("todos");
  else renderProducts();

  renderIdeaBanner();
  renderIdeaViews();
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

function renderIdeaViews() {
  const box = document.getElementById("ideaViews");
  if (!activeIdea) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  const nKits = kitsForIdea(activeIdea).length;
  const nProd = PRODUCTS.filter((p) => matchesIdea(p, activeIdea)).length;
  box.hidden = false;
  box.innerHTML = `
    <button type="button" class="idea-view-btn${activeIdeaView === "produtos" ? " active" : ""}" data-view="produtos" aria-pressed="${activeIdeaView === "produtos"}">
      Todos os produtos <span class="idea-view-count">${nProd}</span>
    </button>
    <button type="button" class="idea-view-btn${activeIdeaView === "kits" ? " active" : ""}" data-view="kits" aria-pressed="${activeIdeaView === "kits"}">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13"/><path d="M12 8c-2-3-6-4-6-1.5S10 8 12 8Zm0 0c2-3 6-4 6-1.5S14 8 12 8Z"/></svg>
      Kits <span class="idea-view-count">${nKits}</span>
    </button>`;
  box.querySelectorAll(".idea-view-btn").forEach((b) =>
    b.addEventListener("click", () => {
      activeIdeaView = b.dataset.view;
      renderIdeaViews();
      renderProducts();
    })
  );
}

/* ---------------- vitrines por categoria (estilo "navegue por categorias") ---------------- */
const SHELF_LIMIT = 10; // quantos produtos aparecem na fileira antes do "Ver todos"

function renderShelves() {
  const grid = document.getElementById("productGrid");
  grid.classList.add("shelves-mode");
  grid.innerHTML = CATEGORIES.map((c) => {
    const items = PRODUCTS.filter((p) => p.category === c.id);
    if (!items.length) return "";
    const shown = items.slice(0, SHELF_LIMIT);
    return `
      <section class="shelf" aria-label="${esc(c.label)}">
        <div class="shelf-head">
          <h3>${esc(c.label)} <span class="shelf-count">${items.length}</span></h3>
          <div class="shelf-actions">
            <button type="button" class="shelf-arrow" data-dir="-1" aria-label="Anteriores de ${esc(c.label)}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" class="shelf-arrow" data-dir="1" aria-label="Próximos de ${esc(c.label)}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button type="button" class="shelf-all" data-cat="${esc(c.id)}">Ver todos</button>
          </div>
        </div>
        <div class="shelf-track">${shown.map(productCardHtml).join("")}</div>
      </section>`;
  }).join("");
  updateShelfArrows();
}

// esconde a seta quando não há mais para onde deslizar
function updateShelfArrows() {
  document.querySelectorAll(".shelf").forEach((shelf) => {
    const track = shelf.querySelector(".shelf-track");
    const [prev, next] = shelf.querySelectorAll(".shelf-arrow");
    const max = track.scrollWidth - track.clientWidth - 4;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max;
    shelf.classList.toggle("no-scroll-needed", max <= 0);
  });
}

function wireShelves() {
  const grid = document.getElementById("productGrid");
  grid.addEventListener("click", (e) => {
    const arrow = e.target.closest(".shelf-arrow");
    if (arrow) {
      const track = arrow.closest(".shelf").querySelector(".shelf-track");
      track.scrollBy({ left: Number(arrow.dataset.dir) * track.clientWidth * 0.9, behavior: "smooth" });
      return;
    }
    const all = e.target.closest(".shelf-all");
    if (all) {
      setActiveFilter(all.dataset.cat);
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    }
  });
  grid.addEventListener("scroll", (e) => {
    if (e.target.classList && e.target.classList.contains("shelf-track")) updateShelfArrows();
  }, true);
  window.addEventListener("resize", updateShelfArrows);
}

/* ---------------- render: kits ---------------- */
function kitPhotoHtml(k) {
  if (k.photo) return `<img src="${esc(k.photo)}" alt="${esc(k.name)}" loading="lazy">`;
  const photos = k.items.map((it) => it.photo).filter(Boolean).slice(0, 4);
  if (photos.length <= 1) {
    return photos[0] ? `<img src="${esc(photos[0])}" alt="${esc(k.name)}" loading="lazy">` : (ICONS.outros || "");
  }
  // sem foto do kit: mosaico com as fotos dos produtos
  return `<span class="kit-collage n${photos.length}">${photos.map((u) => `<img src="${esc(u)}" alt="" loading="lazy">`).join("")}</span>`;
}

function kitSavings(k) {
  const diff = k.itemsTotal - k.price;
  return diff >= 1 ? diff : 0;
}

function renderKits() {
  const grid = document.getElementById("productGrid");
  grid.classList.remove("shelves-mode");
  const list = kitsForIdea(activeIdea);
  if (!list.length) {
    const msg = `Olá! Queria montar um kit de presente para "${activeIdea.label}". Pode me ajudar?`;
    grid.innerHTML = `
      <div class="idea-empty">
        <h3>A gente monta o kit com você</h3>
        <p>Ainda não temos kits prontos para <strong>“${esc(activeIdea.label)}”</strong>. Conta o que você imagina que a gente junta as peças.</p>
        <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">Montar meu kit pelo WhatsApp</a>
      </div>`;
    return;
  }
  grid.innerHTML = list.map((k) => {
    const save = kitSavings(k);
    const names = k.items.map((it) => it.name);
    return `
      <article class="product-card kit-card">
        <button type="button" class="product-photo${k.photo || k.items.some((it) => it.photo) ? "" : " icon-frame"}" data-open-kit="${esc(k.id)}" aria-label="Ver ${esc(k.name)} ampliado">${kitPhotoHtml(k)}</button>
        <div class="product-body">
          <span class="product-cat-tag kit-tag">Kit · ${k.items.length} ${k.items.length === 1 ? "item" : "itens"}</span>
          <h3>${esc(k.name)}</h3>
          ${names.length ? `<p class="kit-items">Inclui: ${esc(names.join(" + "))}</p>` : ""}
          <p class="product-price">${save ? `<s class="kit-old">${brl(k.itemsTotal)}</s> ` : ""}${brl(k.price)}</p>
          ${save ? `<span class="kit-save">Economize ${brl(save)}</span>` : ""}
          <a class="product-btn" href="${waLink(kitMessage(k))}" target="_blank" rel="noopener">
            <svg class="product-btn-icon" viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.36 4 14.96c0 2.2.6 4.27 1.66 6.05L4 29l8.2-2.15a12.9 12.9 0 0 0 3.82.58h.01c6.62 0 12.02-5.36 12.02-11.96C28.05 8.36 22.65 3 16.02 3Z"/></svg>
            <span class="label-full">Quero este kit</span>
            <span class="label-short">Quero</span>
          </a>
        </div>
      </article>`;
  }).join("");
}

// Link que abre exatamente este kit: site.com/?kit=1a2b3c4d
function kitLink(k) {
  return `${SITE_BASE}?kit=${k.id.slice(0, 8)}`;
}

function kitMessage(k) {
  const ideia = activeIdea ? ` (${activeIdea.label})` : "";
  const itens = k.items.length ? `\nInclui: ${k.items.map((it) => `${it.name} (cód. ${it.id})`).join(", ")}.` : "";
  return `Olá! Gostaria do *${k.name}*${ideia}, no valor de ${brl(k.price)}.${itens}\n\nFoto: ${kitLink(k)}\n\nPode me passar mais detalhes?`;
}

function openKit(idPrefix) {
  const pref = String(idPrefix).toLowerCase();
  const k = KITS.find((x) => x.id.toLowerCase().startsWith(pref));
  if (!k) return false;
  const dlg = document.getElementById("productViewer");
  const img = document.getElementById("productViewerImg");
  const stage = dlg.querySelector(".lightbox-stage");
  const cover = k.photo || (k.items.find((it) => it.photo) || {}).photo;
  if (cover) { img.src = cover; img.alt = k.name; stage.hidden = false; }
  else { img.removeAttribute("src"); stage.hidden = true; }
  document.getElementById("productViewerCat").textContent = `Kit · ${k.items.length} ${k.items.length === 1 ? "item" : "itens"}`;
  document.getElementById("productViewerTitle").textContent = k.name;
  document.getElementById("productViewerCode").textContent = "";
  const save = kitSavings(k);
  document.getElementById("productViewerPrice").innerHTML =
    `${save ? `<s class="kit-old">${brl(k.itemsTotal)}</s> ` : ""}${brl(k.price)}${save ? ` <span class="kit-save">Economize ${brl(save)}</span>` : ""}`;
  const desc = document.getElementById("productViewerDesc");
  desc.textContent = k.desc;
  desc.hidden = !k.desc;
  const items = document.getElementById("productViewerItems");
  items.innerHTML = k.items.map((it) => `
    <li>
      <span class="kv-thumb">${it.photo ? `<img src="${esc(it.photo)}" alt="" loading="lazy">` : ""}</span>
      <span class="kv-name">${esc(it.name)}</span>
    </li>`).join("");
  items.hidden = !k.items.length;
  const cta = document.getElementById("productViewerCta");
  cta.href = waLink(kitMessage(k));
  cta.textContent = "Quero este kit";
  if (!dlg.open) dlg.showModal();
  document.body.classList.add("no-scroll");
  return true;
}

/* ---------------- render: product grid ---------------- */
// Foto real quando existir, ou o ícone de linha da categoria como espaço reservado.
function productPhotoHtml(p) {
  return p.photo
    ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">`
    : (ICONS[p.category] || "");
}

function renderProducts() {
  if (activeIdea && activeIdeaView === "kits") return renderKits();
  // página inicial (sem ideia e em "Todos"): uma vitrine deslizante por categoria
  if (!activeIdea && activeCategory === "todos" && CATEGORIES.length > 1) return renderShelves();
  const grid = document.getElementById("productGrid");
  const list = PRODUCTS.filter((p) =>
    (activeCategory === "todos" || p.category === activeCategory) && matchesIdea(p, activeIdea)
  );

  if (!list.length) {
    grid.classList.remove("shelves-mode");
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

  grid.classList.remove("shelves-mode");
  grid.innerHTML = list.map(productCardHtml).join("");
}

function productCardHtml(p) {
  const message = productMessage(p);
  return `
      <article class="product-card" data-id="${esc(p.id)}">
        <button type="button" class="product-photo${p.photo ? "" : " icon-frame"}" data-open="${esc(p.id)}" aria-label="Ver ${esc(p.name)} ampliado">${productPhotoHtml(p)}</button>
        <div class="product-body">
          <span class="product-cat-tag">${esc(categoryLabel(p.category))}</span>
          <h3>${esc(p.name)}</h3>
          ${p.desc ? `<p class="product-desc">${esc(p.desc)}</p>` : ""}
          <p class="product-price">${brl(p.price)}</p>
          <a class="product-btn" href="${waLink(message)}" target="_blank" rel="noopener">
            <svg class="product-btn-icon" viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.36 4 14.96c0 2.2.6 4.27 1.66 6.05L4 29l8.2-2.15a12.9 12.9 0 0 0 3.82.58h.01c6.62 0 12.02-5.36 12.02-11.96C28.05 8.36 22.65 3 16.02 3Z"/></svg>
            <span class="label-full">Personalizar pelo WhatsApp</span>
            <span class="label-short">Pedir</span>
          </a>
        </div>
      </article>`;
}

// Endereço da página atual (funciona no domínio da Vercel ou em qualquer outro).
const SITE_BASE = window.location.origin + window.location.pathname.replace(/[^/]*$/, "");

// Link que abre exatamente este produto, com a foto: site.com/?produto=CAD01
function productLink(p) {
  return `${SITE_BASE}?produto=${encodeURIComponent(p.id)}`;
}

// Mensagem do WhatsApp: nome, código, valor e o link da foto.
// (O WhatsApp não deixa um site anexar a imagem; o link abre a foto certa.)
function productMessage(p) {
  return `Olá! Gostaria de comprar o produto *${p.name}* (cód. ${p.id}), no valor de ${brl(p.price)}.\n\nFoto: ${productLink(p)}\n\nPode me passar mais detalhes?`;
}

/* ---------------- abrir um produto pelo link (?produto=CAD01) ---------------- */
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id.toUpperCase() === String(id).toUpperCase());
  if (!p) return false;
  const dlg = document.getElementById("productViewer");
  const img = document.getElementById("productViewerImg");
  const stage = dlg.querySelector(".lightbox-stage");
  if (p.photo) {
    img.src = p.photo;
    img.alt = p.name;
    stage.hidden = false;
  } else {
    img.removeAttribute("src");
    stage.hidden = true;
  }
  document.getElementById("productViewerCat").textContent = categoryLabel(p.category);
  document.getElementById("productViewerTitle").textContent = p.name;
  document.getElementById("productViewerCode").textContent = `cód. ${p.id}`;
  document.getElementById("productViewerPrice").textContent = brl(p.price);
  const desc = document.getElementById("productViewerDesc");
  desc.textContent = p.desc;
  desc.hidden = !p.desc;
  document.getElementById("productViewerItems").hidden = true;
  const cta = document.getElementById("productViewerCta");
  cta.href = waLink(productMessage(p));
  cta.textContent = "Pedir pelo WhatsApp";
  if (!dlg.open) dlg.showModal();
  document.body.classList.add("no-scroll");
  return true;
}

function wireProductViewer() {
  // tocar na foto do card abre o produto ampliado (com descrição completa)
  document.getElementById("productGrid").addEventListener("click", (e) => {
    const kit = e.target.closest("[data-open-kit]");
    if (kit) return openKit(kit.dataset.openKit);
    const photo = e.target.closest("[data-open]");
    if (photo) openProduct(photo.dataset.open);
  });

  const dlg = document.getElementById("productViewer");
  const close = () => { if (dlg.open) dlg.close(); };
  document.getElementById("productViewerClose").addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
    // tira o ?produto= da barra de endereço ao fechar
    const url = new URL(window.location.href);
    if (url.searchParams.has("produto") || url.searchParams.has("kit")) {
      url.searchParams.delete("produto");
      url.searchParams.delete("kit");
      history.replaceState(null, "", url);
    }
  });
  document.getElementById("productViewerAll").addEventListener("click", () => {
    close();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------------- render: favorites ---------------- */
function renderFavorites() {
  const grid = document.getElementById("favoritesGrid");
  const favs = PRODUCTS.filter((p) => p.favorite);
  grid.innerHTML = favs
    .map((p) => {
      const message = productMessage(p);
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
  wireProductViewer();
  wireShelves();
  document.getElementById("year").textContent = new Date().getFullYear();

  try {
    await loadCatalog();
    renderFilters();
    renderFavorites();
    renderIdeasList();

    // link direto para uma ideia: site.com/?ideia=dia-das-maes-pais
    const ideiaDoLink = new URLSearchParams(window.location.search).get("ideia");
    if (ideiaDoLink && findIdea(ideiaDoLink)) setActiveIdea(ideiaDoLink);

    // link da foto enviado pelo WhatsApp: site.com/?produto=CAD01
    const produtoDoLink = new URLSearchParams(window.location.search).get("produto");
    if (produtoDoLink) openProduct(produtoDoLink);

    // link do kit enviado pelo WhatsApp: site.com/?kit=1a2b3c4d
    const kitDoLink = new URLSearchParams(window.location.search).get("kit");
    if (kitDoLink) openKit(kitDoLink);
  } catch (err) {
    console.error("Não foi possível carregar os produtos:", err);
    document.getElementById("productGrid").innerHTML =
      `<p style="grid-column:1/-1;text-align:center;color:var(--brown-soft);">
        Não foi possível carregar os produtos agora. Tente novamente em instantes.
      </p>`;
  }
});
