// aanu's closet — data
// closetItems starts empty. When you photograph a piece, cut out the
// background and push a new object here: { id, name, image, tags: [] }.
const closetItems = [];

// wishlist — pulled from the "twenny six / looks" pinterest board,
// matched to niche + mainstream India shops, budget ₹1,000–3,000/item.
// Re-scrape the board every ~2 weeks and refresh this list.
const wishlist = [
  {
    category: 'cat eye sunglasses',
    emoji: '🕶️',
    note: 'sharp, retro, a lil villain energy',
    budget: '₹700 – ₹2,500',
    links: [
      { label: 'OPIUM Eyewear — Cat Eye Collection', url: 'https://www.opiumeyewear.com/collections/cat-eye-glasses' },
      { label: 'Vintage Sunglasses India — Cat Eye', url: 'https://vintagesunglasses.in/products/cat-eyes' },
      { label: 'Lenskart — Cat Eye Sunglasses', url: 'https://www.lenskart.com/en-us/sunglasses/frame-shape/cat-eye-sunglasses.html' },
    ],
  },
  {
    category: 'jorts / capris',
    emoji: '🩳',
    note: 'denim, relaxed, thrifted-looking — like the pin with the white sneakers',
    budget: '₹900 – ₹2,000',
    links: [
      { label: 'DressBerry Denim Jorts — Myntra', url: 'https://www.myntra.com/shorts/dressberry/dressberry-women-street-comfort-denim-shorts/30392534/buy' },
      { label: 'Myntra — Women Denim Shorts', url: 'https://www.myntra.com/women-denim-shorts' },
      { label: 'AJIO — Denim Shorts', url: 'https://www.ajio.com/s1/denim-shorts' },
    ],
  },
  {
    category: 'heels with the stones',
    emoji: '💎',
    note: 'gold strap heels with inset agate/carnelian beads — straight off the pin',
    budget: '₹1,500 – ₹3,000',
    links: [
      { label: 'Bombay Brown — Hand Embellished Sandals', url: 'https://www.bombaybrown.in/collections/hand-embroidered-and-embellished-sandals-for-women' },
      { label: 'Metro Shoes — Embellished Gold Heels', url: 'https://www.metroshoes.com/women-gold-sandals.html' },
      { label: 'Westside — Luna Blu Beaded Sandals', url: 'https://www.westside.com/blogs/shoes-bags/made-in-india-beaded-sandals' },
    ],
  },
  {
    category: 'going out tops',
    emoji: '✨',
    note: 'crochet, satin, gold halter — the pin with the flare jeans',
    budget: '₹800 – ₹2,500',
    links: [
      { label: 'ONLY.in — Cream Crochet Knit Top', url: 'https://www.only.in/products/900726501-buttercream' },
      { label: 'Showoffff — Women\'s Crochet Tops', url: 'https://showoffff.in/collections/womens-crochet-tops' },
      { label: 'Nykaa Fashion — Hidden Gems (indie labels)', url: 'https://www.nykaafashion.com/all-brands' },
    ],
  },
  {
    category: 'dungarees',
    emoji: '👖',
    note: 'denim pinafore, oversized, one strap undone',
    budget: '₹1,200 – ₹2,800',
    links: [
      { label: "Showoffff — Women's Dungarees", url: 'https://showoffff.in/collections/women-dungarees' },
      { label: 'Myntra — Women Dungarees', url: 'https://www.myntra.com/women-dungarees' },
      { label: "Flipkart — Women's Dungarees", url: 'https://www.flipkart.com/clothing-and-accessories/jumpsuits-and-dungarees/womens-jumpsuits-and-dungarees/womens-dungarees/pr?sid=clo%2Ch4p%2Cfpl%2C48d' },
    ],
  },
  {
    category: 'skirts',
    emoji: '🌾',
    note: 'red tiered lace maxi, paired with a cream crochet top on the board',
    budget: '₹1,000 – ₹3,000',
    links: [
      { label: 'FableStreet — Midi Skirts', url: 'https://www.fablestreet.com/collections/midi-skirts' },
      { label: 'Myntra — Bohemian Skirts', url: 'https://www.myntra.com/bohemian-skirts' },
      { label: "Miss Mosa — Women's Midi Skirts", url: 'https://www.missmosa.in/collections/women-midi-skirts' },
    ],
  },
];
