// aanu's closet — shared prototype logic
// vanilla JS, no build step. data lives in data.js.

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
            the closet is empty (for now).<br /><br />
            send a photo of your first piece to Claude and say "add this to aanu's closet,
            tag: going out" — it'll cut out the background and it'll show up right here, tagged and all.
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
        (item) => `
      <div class="cc-card">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="cc-cardtag">${item.name} · ${item.tags.join(', ')}</div>
      </div>`
      )
      .join('');
  }

  draw();
}

function renderWishlist() {
  const wishGrid = document.getElementById('wishGrid');
  wishGrid.innerHTML = wishlist
    .map(
      (cat) => `
    <div class="cc-wish-card">
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
}

function initChat() {
  const log = document.getElementById('chatLog');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');

  const history = [];

  function addBubble(role, text) {
    const div = document.createElement('div');
    div.className = `cc-bubble ${role}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  addBubble(
    'ai',
    "hi! tell me the vibe you're going for + what you're doing today and i'll put together a fit from your actual closet."
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

    const reply = await getOutfitSuggestion(history);
    thinking.textContent = reply;
  });
}

// ── Outfit suggestion ────────────────────────────────────────────────
// Prototype: simple local logic, no network calls, so this runs
// anywhere without a server or API key.
//
// When you bring this into Claude Code / the sidequests Next.js app,
// replace the body of this function with a real call to a server
// route that talks to the Claude API (keep the key server-side, never
// in client JS). Drop-in version:
//
//   async function getOutfitSuggestion(history) {
//     const res = await fetch('/api/aanus-closet/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ messages: history }),
//     });
//     const data = await res.json();
//     return data.reply;
//   }
//
async function getOutfitSuggestion(history) {
  await new Promise((r) => setTimeout(r, 500));

  if (closetItems.length === 0) {
    return "your closet's empty right now — add a few pieces first (photo → Claude cuts the background → tagged here) and I'll start building real fits out of what you own.";
  }

  const lastMsg = history[history.length - 1]?.text.toLowerCase() || '';
  const matches = closetItems.filter((item) =>
    item.tags.some((tag) => lastMsg.includes(tag.toLowerCase()))
  );

  if (matches.length) {
    return `based on the vibe, try: ${matches.map((m) => m.name).join(' + ')}.`;
  }

  return "don't have a perfect match tagged for that yet — check the wishlist, or tell me more about the occasion and I'll pick the closest thing you own.";
}
