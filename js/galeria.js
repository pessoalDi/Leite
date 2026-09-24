/* ============================================================
   Lets Mimos — página "Se inspire nessas ideias" (galeria.html)
   As fotos e os tipos (Caderno A5, A6, A7...) vêm da
   Gerência Leiticia → aba Galeria.
   ============================================================ */

// Mesmos valores do js/script.js. Se trocar o WhatsApp lá, troque aqui também.
const WHATSAPP_NUMBER = "5592993264251";
const SUPABASE_URL = "https://oxhemopmgqbxlwezdvfm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aGVtb3BtZ3FieGx3ZXpkdmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxOTI1MDIsImV4cCI6MjEwNTc2ODUwMn0.m8P-QdEkQo6uRmSwD28c0Uo3VIz5uSAMOpEQPG9oNzw";

let TYPES = [];     // [{ id, name, from }]  from = "a partir de" do tipo (ou null)
let PHOTOS = [];    // [{ id, type, caption, url, price }]
let activeType = "todos";
let viewerList = [];  // fotos navegáveis no visualizador (as da aba atual)
let viewerIndex = 0;

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const brl = (value) =>
  Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// valor da foto; se ela não tiver, usa o "a partir de" do tipo
function priceInfo(p) {
  if (p.price != null) return { value: p.price, from: false };
  const t = TYPES.find((x) => x.id === p.type);
  if (t && t.from != null) return { value: t.from, from: true };
  return null;
}

function priceText(info) {
  if (!info) return "";
  return info.from ? `a partir de ${brl(info.value)}` : brl(info.value);
}

// Endereço desta página: usado no link da foto que vai no WhatsApp
const PAGE_URL = window.location.origin + window.location.pathname;

// Link curto que abre exatamente esta foto: galeria.html?foto=1a2b3c4d
function photoLink(p) {
  return `${PAGE_URL}?foto=${p.id.slice(0, 8)}`;
}

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

async function fetchTable(path) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Supabase respondeu ${response.status}`);
  return response.json();
}

async function loadGallery() {
  // o banco só devolve tipos e fotos marcados como visíveis
  const typeOrder = "order=posicao.asc,nome.asc";
  const photoOrder = "order=posicao.asc,criado_em.asc";
  let types, photos;
  try {
    [types, photos] = await Promise.all([
      fetchTable(`galeria_tipos?select=id,nome,preco&${typeOrder}`),
      fetchTable(`galeria_fotos?select=id,tipo,legenda,imagem_url,preco&${photoOrder}`)
    ]);
  } catch (err) {
    // banco ainda sem a coluna de preço (migração não rodada): mostra a galeria sem valores
    [types, photos] = await Promise.all([
      fetchTable(`galeria_tipos?select=id,nome&${typeOrder}`),
      fetchTable(`galeria_fotos?select=id,tipo,legenda,imagem_url&${photoOrder}`)
    ]);
  }
  const visibleTypes = new Set(types.map((t) => t.id));
  PHOTOS = photos
    .filter((p) => visibleTypes.has(p.tipo))
    .map((p) => ({
      id: p.id,
      type: p.tipo,
      caption: p.legenda || "",
      url: p.imagem_url,
      price: p.preco != null ? Number(p.preco) : null
    }));
  const used = new Set(PHOTOS.map((p) => p.type));
  // só mostra tipos que já têm foto
  TYPES = types
    .filter((t) => used.has(t.id))
    .map((t) => ({ id: t.id, name: t.nome, from: t.preco != null ? Number(t.preco) : null }));
}

const typeName = (id) => (TYPES.find((t) => t.id === id) || {}).name || "";

/* ---------------- abas por tipo ---------------- */
function renderTabs() {
  const row = document.getElementById("galleryTabs");
  if (!TYPES.length) {
    row.innerHTML = "";
    return;
  }
  const all = [{ id: "todos", name: "Todos", n: PHOTOS.length },
    ...TYPES.map((t) => ({ ...t, n: PHOTOS.filter((p) => p.type === t.id).length }))];
  row.innerHTML = all
    .map((t) => `<button class="filter-btn${t.id === activeType ? " active" : ""}" data-type="${esc(t.id)}" aria-pressed="${t.id === activeType}">${esc(t.name)} <span class="tab-count">${t.n}</span></button>`)
    .join("");
}

function setType(typeId, { updateUrl = true } = {}) {
  activeType = TYPES.some((t) => t.id === typeId) ? typeId : "todos";
  if (updateUrl) {
    // link compartilhável: site.com/galeria.html?tipo=caderno-a5
    const url = new URL(window.location.href);
    if (activeType === "todos") url.searchParams.delete("tipo");
    else url.searchParams.set("tipo", activeType);
    history.replaceState(null, "", url);
  }
  renderTabs();
  renderGallery();
}

/* ---------------- grade de fotos ---------------- */
function photoTile(p) {
  // na grade só aparece o valor próprio da foto; o "a partir de" fica no título do tipo
  const own = p.price != null ? brl(p.price) : "";
  return `
    <button type="button" class="gallery-item" data-id="${esc(p.id)}" aria-label="Ver foto${p.caption ? `: ${esc(p.caption)}` : ""}${own ? `, ${own}` : ""}">
      <img src="${esc(p.url)}" alt="${esc(p.caption || typeName(p.type))}" loading="lazy">
      ${own ? `<span class="gallery-price">${own}</span>` : ""}
      ${p.caption ? `<span class="gallery-caption">${esc(p.caption)}</span>` : ""}
    </button>`;
}

function fromLine(t) {
  return t.from != null ? `<p class="gallery-from">a partir de <strong>${brl(t.from)}</strong></p>` : "";
}

function renderGallery() {
  const box = document.getElementById("galleryContent");

  if (!PHOTOS.length) {
    box.innerHTML = `
      <div class="idea-empty">
        <h3>Em breve, muitas ideias por aqui</h3>
        <p>Estamos separando as fotos dos trabalhos já feitos. Enquanto isso, conta pra gente o que você imagina.</p>
        <a class="btn btn-primary" href="${waLink("Olá! Quero criar um presente personalizado. Pode me ajudar?")}" target="_blank" rel="noopener">Falar no WhatsApp</a>
      </div>`;
    return;
  }

  if (activeType === "todos") {
    // separado por tipo, cada um com seu título
    viewerList = TYPES.flatMap((t) => PHOTOS.filter((p) => p.type === t.id));
    box.innerHTML = TYPES.map((t) => {
      const list = PHOTOS.filter((p) => p.type === t.id);
      return `
        <section class="gallery-group">
          <div class="gallery-group-head">
            <div>
              <h2>${esc(t.name)}</h2>
              ${fromLine(t)}
            </div>
            <button type="button" class="gallery-see-all" data-type="${esc(t.id)}">Ver só ${esc(t.name)} · ${list.length}</button>
          </div>
          <div class="gallery-grid">${list.map(photoTile).join("")}</div>
        </section>`;
    }).join("");
  } else {
    viewerList = PHOTOS.filter((p) => p.type === activeType);
    const t = TYPES.find((x) => x.id === activeType);
    box.innerHTML = `
      ${t && t.from != null ? `<div class="gallery-type-head">${fromLine(t)}</div>` : ""}
      <div class="gallery-grid">${viewerList.map(photoTile).join("")}</div>`;
  }
}

/* ---------------- visualizador (lightbox) ---------------- */
function showPhoto(index) {
  if (!viewerList.length) return;
  viewerIndex = (index + viewerList.length) % viewerList.length;
  const p = viewerList[viewerIndex];
  const img = document.getElementById("lightboxImg");
  img.src = p.url;
  img.alt = p.caption || typeName(p.type);
  document.getElementById("lightboxType").textContent = typeName(p.type);
  document.getElementById("lightboxTitle").textContent = p.caption || `Ideia de ${typeName(p.type)}`;
  const info = priceInfo(p);
  const priceEl = document.getElementById("lightboxPrice");
  priceEl.textContent = priceText(info);
  priceEl.hidden = !info;
  const valor = info ? `, ${info.from ? "que sai a partir de" : "no valor de"} ${brl(info.value)},` : "";
  const msg = `Olá! Vi na galeria de ideias um trabalho de *${typeName(p.type)}*${p.caption ? ` ("${p.caption}")` : ""}${valor} e quero um parecido.\n\nFoto: ${photoLink(p)}\n\nPode me ajudar?`;
  document.getElementById("lightboxCta").href = waLink(msg);
  const multiple = viewerList.length > 1;
  document.getElementById("lightboxPrev").hidden = !multiple;
  document.getElementById("lightboxNext").hidden = !multiple;
}

function openViewer(photoId) {
  const i = viewerList.findIndex((p) => p.id === photoId);
  if (i < 0) return;
  showPhoto(i);
  const dlg = document.getElementById("lightbox");
  if (!dlg.open) dlg.showModal();
  document.body.classList.add("no-scroll");
}

function closeViewer() {
  const dlg = document.getElementById("lightbox");
  if (dlg.open) dlg.close();
}

function wireViewer() {
  const dlg = document.getElementById("lightbox");
  document.getElementById("lightboxClose").addEventListener("click", closeViewer);
  document.getElementById("lightboxPrev").addEventListener("click", () => showPhoto(viewerIndex - 1));
  document.getElementById("lightboxNext").addEventListener("click", () => showPhoto(viewerIndex + 1));
  dlg.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
    // tira o ?foto= da barra de endereço ao fechar
    const url = new URL(window.location.href);
    if (url.searchParams.has("foto")) {
      url.searchParams.delete("foto");
      history.replaceState(null, "", url);
    }
  });
  // clicar fora da foto fecha
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeViewer(); });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showPhoto(viewerIndex - 1);
    if (e.key === "ArrowRight") showPhoto(viewerIndex + 1);
  });
  // arrastar para o lado no celular
  let startX = null;
  const stage = dlg.querySelector(".lightbox-stage");
  stage.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) showPhoto(viewerIndex + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

/* ---------------- botões de WhatsApp fixos ---------------- */
function wireWaCtas() {
  document.querySelectorAll(".wa-cta, #headerWaBtn, #footerWaLink").forEach((el) => {
    const msg = el.dataset && el.dataset.waMsg
      ? el.dataset.waMsg
      : "Olá! Vim pela galeria de ideias da Lets Mimos e gostaria de mais informações.";
    el.setAttribute("href", waLink(msg));
  });
}

/* ---------------- início ---------------- */
document.addEventListener("DOMContentLoaded", async () => {
  wireWaCtas();
  wireViewer();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.getElementById("galleryTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (btn) setType(btn.dataset.type);
  });
  document.getElementById("galleryContent").addEventListener("click", (e) => {
    const seeAll = e.target.closest(".gallery-see-all");
    if (seeAll) {
      setType(seeAll.dataset.type);
      document.getElementById("galeria").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const item = e.target.closest(".gallery-item");
    if (item) openViewer(item.dataset.id);
  });

  try {
    await loadGallery();
    const params = new URLSearchParams(window.location.search);
    setType(params.get("tipo") || "todos", { updateUrl: false });

    // link da foto enviado pelo WhatsApp: galeria.html?foto=1a2b3c4d
    const fotoDoLink = (params.get("foto") || "").toLowerCase();
    if (fotoDoLink) {
      const foto = PHOTOS.find((p) => p.id.toLowerCase().startsWith(fotoDoLink));
      if (foto) openViewer(foto.id);
    }
  } catch (err) {
    console.error("Não foi possível carregar a galeria:", err);
    document.getElementById("galleryContent").innerHTML =
      `<p class="gallery-loading">Não foi possível carregar as ideias agora. Tente novamente em instantes.</p>`;
  }
});
