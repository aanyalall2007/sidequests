// aanu's closet — data
// closetItems seeded from the "twenny six / looks" pinterest board.
// When you photograph a real piece, cut out the background and push a
// new object here: { id, name, image, tags: [] }.
const closetItems = [
  {
    id: 'gold-gemstone-sandals',
    name: 'gold gemstone beaded sandals',
    image: 'https://i.pinimg.com/736x/7f/a7/47/7fa74734eb7d1ed9e7b63a7b3b2d661c.jpg',
    tags: ['heels', 'going out', 'shoes'],
  },
  {
    id: 'olive-cutout-halter-flare-jeans',
    name: 'olive cutout halter top + dark flare jeans',
    image: 'https://i.pinimg.com/736x/3c/c3/c2/3cc3c2025e4c4499c12d50c78a90e0ad.jpg',
    tags: ['going out', 'denim'],
  },
  {
    id: 'white-eyelet-set',
    name: 'white eyelet corset top + tiered skirt set',
    image: 'https://i.pinimg.com/736x/91/f3/f6/91f3f6b7b21114a46046779f712084b1.jpg',
    tags: ['going out', 'skirts'],
  },
  {
    id: 'black-backless-slip-dress',
    name: 'black backless slip dress',
    image: 'https://i.pinimg.com/736x/a4/3f/34/a43f34df9307dbe7ff7e36bed72d0549.jpg',
    tags: ['going out', 'dresses'],
  },
  {
    id: 'red-tiered-maxi-crochet-top',
    name: 'red tiered lace maxi skirt + cream crochet top',
    image: 'https://i.pinimg.com/736x/8d/ac/a4/8daca4cb35368ec3dcacc6cd06188876.jpg',
    tags: ['skirts', 'going out'],
  },
  {
    id: 'graphic-tee-sweatpants',
    name: 'off-shoulder graphic tee + grey sweatpants',
    image: 'https://i.pinimg.com/736x/70/02/72/7002727781e66d58f4f04ec4dd156f28.jpg',
    tags: ['casual', 'cat eye sunglasses'],
  },
  {
    id: 'brown-zip-top-yellow-flares',
    name: 'brown zip-up top + pale yellow flare trousers',
    image: 'https://i.pinimg.com/736x/1e/d2/f4/1ed2f40179cfc25d97b5996197993f45.jpg',
    tags: ['casual'],
  },
  {
    id: 'cream-tank-track-pants',
    name: 'cream tank top + navy track pants, gold side stripe',
    image: 'https://i.pinimg.com/736x/e2/10/23/e21023b39d8f5db649085af9ba4035d5.jpg',
    tags: ['casual', 'loungewear'],
  },
  {
    id: 'black-tank-flare-jeans',
    name: 'black v-neck tank + dark flare jeans',
    image: 'https://i.pinimg.com/736x/23/1e/85/231e853e0c11c5e086e8166a5c98d687.jpg',
    tags: ['going out', 'denim'],
  },
  {
    id: 'navy-athleisure-set',
    name: 'navy tank + bike shorts athleisure set',
    image: 'https://i.pinimg.com/736x/0a/32/6f/0a326f9b9e4f836762642ab4e5c01c20.jpg',
    tags: ['athleisure', 'casual', 'cat eye sunglasses'],
  },
];

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
