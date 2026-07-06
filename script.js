// aanu's closet — shared prototype logic
// vanilla JS, no build step. data lives in data.js.

// ── custom cursor (matches aanya.dev) ───────────────────────────────
function initCursor() {
  const cur = document.getElementById('cursor');
  if (!cur) return;
  document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, input, .cc-card, .cc-wish-card, .cc-tag').forEach((el) => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}

// ── stagger reveal on load ──────────────────────────────────────────
function staggerReveal(container) {
  const items = container.querySelectorAll('.cc-stagger');
  items.forEach((item, i) => {
    setTimeout(() => item.classList.add('in'), i * 70);
  });
}

function renderCloset() {
  const grid = document.getElementById('grid');
  const tagbar = document.getElementById('tagbar');
  let active = null;

  function draw() {
    const tags = Array.from(new Set(closetItems.flatMap((i) => i.tags))).sort();

    if (closetItems.length === 0) {
      tagbar.innerHTML = '';
      grid.innerHTML = `
        <div class="cc-empty">
          <div class="cc-empty-card">
            the closet is <em>empty</em> for now.<br /><br />
            send a photo of your first piece to claude and say "add this to aanu's closet,
            tag: going out" — it'll cut out the background and pin it up here, tagged and all.
          </div>
        </div>`;
      return;
    }

    tagbar.className = 'cc-tagbar';
    tagbar.innerHTML =
      `<button class="cc-tag ${!active ? 'active' : ''}" data-tag="">all</button>` +
      tags.map((t) => `<button class="cc-tag ${active === t ? 'active' : ''}" data-tag="${t}">${t}</button>`).join('');

    tagbar.querySelectorAll('.cc-tag').forEach((btn) => {
      btn.addEventListener('click', () => {
        active = btn.dataset.tag || null;
        draw();
      });
    });

    const filtered = active ? closetItems.filter((i) => i.tags.includes(active)) : closetItems;
    grid.className = 'cc-grid';
    grid.innerHTML = filtered
      .map(
        (item, i) => `
      <div class="cc-card cc-stagger" style="transition-delay:${i * 0.03}s">
        <span class="tape"></span>
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="cc-cardtag">
          <span class="name">${item.name}</span>
          <span class="tags">${item.tags.join(', ')}</span>
        </div>
      </div>`
      )
      .join('');
    staggerReveal(grid);
    initCursor();
  }

  draw();
}

function renderWishlist() {
  const wishGrid = document.getElementById('wishGrid');
  wishGrid.innerHTML = wishlist
    .map(
      (cat, i) => `
    <div class="cc-wish-card cc-stagger" style="transition-delay:${i * 0.05}s">
      <span class="cc-emoji">${cat.emoji}</span>
      <h3>${cat.category}</h3>
      <div class="cc-note">${cat.note}</div>
      <ul>
        ${cat.links.map((l) => `<li><a href="${l.url}" target="_blank" rel="noreferrer">${l.label}</a></li>`).join('')}
      </ul>
      <div class="cc-budget">${cat.budget}</div>
    </div>`
    )
    .join('');
  staggerReveal(wishGrid);
  initCursor();
}

function initChat() {
  const log = document.getElementById('chatLog');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const board = document.getElementById('board');

  const history = [];

  function addBubble(role, text) {
    const div = document.createElement('div');
    div.className = `cc-bubble ${role}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  // signature interaction: pin the fit (or a note) to today's board
  function pinToBoard(entries) {
    board.innerHTML = '';
    entries.forEach((entry, i) => {
      const tile = document.createElement('div');
      tile.className = 'cc-pin';
      tile.style.setProperty('--r', `${(i % 2 === 0 ? -1 : 1) * (3 + i * 1.5)}deg`);
      tile.style.animationDelay = `${i * 0.12}s`;
      tile.innerHTML = entry.name
        ? `<span class="n">${entry.name}</span><span class="note">${entry.tag || ''}</span>`
        : `<span class="note">${entry.note}</span>`;
      board.appendChild(tile);
    });
  }

  addBubble(
    'ai',
    "hi! tell me the vibe you're going for + what you're doing today and i'll pin a fit from your actual closet."
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addBubble('me', text);
    history.push({ role: 'me', text });
    input.value = '';

    const thinking = document.createElement('div');
    thinking.className = 'cc-bubble ai';
    thinking.textContent = 'thinking...';
    log.appendChild(thinking);
    log.scrollTop = log.scrollHeight;

    const { reply, matches } = await getOutfitSuggestion(history);
    thinking.textContent = reply;

    if (matches && matches.length) {
      pinToBoard(matches.map((m) => ({ name: m.name, tag: m.tags.join(', ') })));
    } else {
      pinToBoard([{ note: reply }]);
    }
  });
}

// ── Outfit suggestion ────────────────────────────────────────────────
// Prototype: simple local logic, no network calls, so this runs
// anywhere without a server or API key.
//
// When you bring this into Claude Code / the sidequests Next.js app,
// replace the body of this function with a real call to a server
// route that talks to a model (keep any API key server-side, never
// in client JS). Drop-in version:
//
//   async function getOutfitSuggestion(history) {
//     const res = await fetch('/api/aanus-closet/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ messages: history }),
//     });
//     return res.json(); // { reply, matches }
//   }
//
async function getOutfitSuggestion(history) {
  await new Promise((r) => setTimeout(r, 500));

  if (closetItems.length === 0) {
    return {
      reply: "your closet's empty right now — add a few pieces first (photo → claude cuts the background → tagged here) and i'll start pinning real fits from what you own.",
      matches: [],
    };
  }

  const lastMsg = history[history.length - 1]?.text.toLowerCase() || '';
  const matches = closetItems.filter((item) =>
    item.tags.some((tag) => lastMsg.includes(tag.toLowerCase()))
  );

  if (matches.length) {
    return { reply: `based on the vibe, try: ${matches.map((m) => m.name).join(' + ')}.`, matches };
  }

  return {
    reply: "don't have a perfect match tagged for that yet — check the wishlist, or tell me more about the occasion and i'll pick the closest thing you own.",
    matches: [],
  };
}
