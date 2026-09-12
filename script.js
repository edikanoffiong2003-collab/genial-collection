window.GENIAL_WHATSAPP_NUMBER = "2348081924652";

// Make cart a global array variable so proceedToCheckout can access it
let cart = JSON.parse(localStorage.getItem('genialCart')) || [];

document.addEventListener("DOMContentLoaded", () => {
  // Initial UI Render
  updateCartUI();
  setLoggedInState();
});

function formatNaira(value) {
  return `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value)}`;
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartItems = document.getElementById('cartItems');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = formatNaira(totalPrice);

  if (!cartItems) return;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  cartItems.innerHTML = cart.map(
    (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div style="flex:1;">
        <h4>${item.name}</h4>
        <p>${item.quantity} × ${formatNaira(item.price)}</p>
      </div>
      <button class="remove-item" data-name="${item.name}">Remove</button>
    </div>
  `
  ).join('');

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      const itemIndex = cart.findIndex((item) => item.name === itemName);
      if (itemIndex >= 0) {
        cart.splice(itemIndex, 1);
        saveCart();
        updateCartUI();
        showToast('Item removed from cart');
      }
    });
  });
}

function saveCart() {
  localStorage.setItem('genialCart', JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

function openCart() {
  const cartPanel = document.getElementById('cartPanel');
  if (cartPanel) cartPanel.classList.add('open');
}

function closeCart() {
  const cartPanel = document.getElementById('cartPanel');
  if (cartPanel) cartPanel.classList.remove('open');
}

function openModal(modal) {
  if (modal) modal.classList.add('visible');
}

function closeModal(modal) {
  if (modal) modal.classList.remove('visible');
}

function setLoggedInState() {
  const isLoggedIn = localStorage.getItem('genialAuth') === 'true';
  const loginBtn = document.getElementById('loginButton');
  if (loginBtn) {
    loginBtn.textContent = isLoggedIn ? 'Account' : 'Login';
  }
}

const fallbackLuxuryPerfumeCatalog = [
  {
    id: 'proud-of-you',
    brand: 'EMPORIO ARMANI',
    name: 'Proud of You Eau De Parfum 100ml',
    category: 'Perfume',
    price: 80000,
    originalPrice: 95000,
    discount: '15% OFF',
    notes: 'Pink Pepper, Mandarin, Sugar-coated Chestnut, Bergamot, Cardamom',
    description: 'A luxurious expression inspired by rich drapery and polished couture.',
    image: './luxury perfume/1d90d2e889564021b21f7a4387f6481b.jpg',
    variants: [
      { name: '50ml Floral', price: 45000 },
      { name: '100ml Amber', price: 80000 },
      { name: '100ml Woody', price: 80000 }
    ],
    reviews: [
      { name: 'Kyle', rating: 5, body: 'Freshest sandalwood vanilla scent out there. Highly recommended!' },
      { name: 'James', rating: 5, body: 'Strong and long-lasting, perfect for office wear.' }
    ]
  },
  {
    id: 'oud-al-layl',
    brand: 'ARABYAT',
    name: 'OUD AL LAYL EDP 100ml',
    category: 'Perfume',
    price: 15000,
    originalPrice: 18000,
    discount: '16% OFF',
    notes: 'Rose, Orange, Fruity Accords, Saffron, and Woodsy Notes',
    description: 'An elegant, moody perfume shaped by strong architectural lines.',
    image: './luxury perfume/1d71e362bf04c51a9da4b8b2ae0f6c82.jpg',
    variants: [
      { name: '50ml Standard', price: 15000 },
      { name: '100ml Intense', price: 22000 }
    ],
    reviews: []
  },
  {
    id: 'supremacy-afnan',
    brand: 'AFNAN',
    name: 'Supremacy Afnan Silver EDP 100ml',
    category: ' Perfume',
    price: 12000,
    originalPrice: 15000,
    discount: '20% OFF',
    notes: 'Rose, birch, Moroccan jasmine, patchouli',
    description: 'A graceful blend inspired by sculpted minimalism.',
    image: './luxury perfume/2c6343f552bf1e845d4ad08610c5f995.jpg',
    variants: [{ name: '100ml Classic', price: 12000 }],
    reviews: []
  },
  {
    id: 'now-eau-de-parfum',
    brand: 'RAVE',
    name: 'Now Eau De Parfum 100ml',
    category: ' Perfume',
    price: 10000,
    originalPrice: 12000,
    discount: '16% OFF',
    notes: 'Patchouli, Dry Birch, Moroccan Jasmine, Rose',
    description: 'A dramatic late-evening scent interpreted through deep contrast.',
    image: './luxury perfume/4e06f869e1ca3f52d04e810d42781276.jpg',
    variants: [{ name: '100ml EDP', price: 10000 }],
    reviews: []
  },
  {
    id: 'yara',
    brand: 'LATTAFA',
    name: 'Lattafa Yara Powder EDP 100ml',
    category: 'Perfume',
    price: 7000,
    originalPrice: null,
    discount: null,
    notes: 'Vanilla, Musk, Sandalwood',
    description: 'Clean, luminous, and couture-inspired.',
    image: './luxury perfume/4f8e4c30083a4488433569f20986fd19.jpg',
    variants: [
      { name: '50ml', price: 7000 },
      { name: '100ml', price: 12000 }
    ],
    reviews: []
  },
  {
    id: 'oniro',
    brand: 'FRAGRANCE WORLD',
    name: 'ONIRO Eau De Parfum 100ml',
    category: ' Perfume',
    price: 10000,
    originalPrice: 12000,
    discount: '16% OFF',
    notes: 'Bay leaf and jasmine adding a soft, herbal-floral touch.',
    description: 'Aromatic-aquatic Eau de Parfum.',
    image: './luxury perfume/a2ff4c87572823fc349c7065dae99c53.jpg',
    variants: [{ name: '100ml EDP', price: 10000 }],
    reviews: []
  },
  {
    id: 'reef-33',
    brand: 'REEF PERFUMES',
    name: 'REEF 33 Luxury Edition 100ml',
    category: ' Perfume',
    price: 150000,
    originalPrice: 175000,
    discount: '14% OFF',
    notes: 'Saffron and rosemary over oud, smoky and intense.',
    description: 'An Oriental Woody fragrance that balances warm spice.',
    image: './luxury perfume/54f0d6b4558b6df2b5e36dea9752f270.jpg',
    variants: [{ name: '100ml Signature', price: 150000 }],
    reviews: []
  },
  {
    id: 'monogo',
    brand: 'MONOGO',
    name: 'MONOGO Sweet Fragrance 50ml',
    category: ' Perfume',
    price: 7000,
    originalPrice: null,
    discount: null,
    notes: 'Warm, cozy, and sugary sweet with a smooth aura.',
    description: 'Sweet, fruity, and gourmand perfume for everyday wear.',
    image: './luxury perfume/e985743c9a8e6db9ddf1a8f33b7b00c9.jpg',
    variants: [{ name: '50ml Body Mist', price: 7000 }],
    reviews: []
  },
  {

    id: 'baccarat-rouge-540',
    brand: 'MAISON FRANCIS KURKDJIAN',
    name: 'Baccarat Rouge 540 Eau De Parfum 70ml',
    category: ' Perfume',
    price: 685000,
    originalPrice: 720000,
    discount: '5% OFF',
    notes: 'Saffron, Jasmine, Amberwood, Ambergris, Fir Resin, Cedar',
    description: 'An luminous, ultra-luxurious fragrance that lays on the skin like an amber, floral, and woody breeze.',
    image: 'luxury perfume/acfe0fa89cc1f2a0430f3a2919e65688.jpg',
    variants: [
      { name: '70ml EDP', price: 685000 },
      { name: '200ml EDP', price: 980000 },
      { name: '70ml Extrait de Parfum', price: 890000 }
    ],
    reviews: [
      { name: 'Sophia', rating: 5, body: 'Unmatched longevity and insane compliment puller. Totally worth the investment.' },
      { name: 'David', rating: 5, body: 'Pure sophistication. You instantly stand out in any room.' }
    ]
  },
  {
    id: 'sauvage-elixir',
    brand: 'DIOR',
    name: 'Sauvage Elixir Extrait De Parfum 100ml',
    category: ' Perfume',
    price: 340000,
    originalPrice: 380000,
    discount: '11% OFF',
    notes: 'Cinnamon, Nutmeg, Cardamom, Grapefruit, Lavender, Licorice, Sandalwood, Amber',
    description: 'An extraordinarily concentrated fragrance steeped in the iconic freshness of Sauvage with an intoxicating trail of spices.',
    image: 'luxury perfume/04076ebc20a04731d4160c6cdcc1ed13.jpg',
    variants: [
      { name: '60ml', price: 260000 },
      { name: '100ml', price: 340000 }
    ],
    reviews: [
      { name: 'Marcus', rating: 5, body: 'One spray lasts all day and into the night. Rich, dark, and powerful.' }
    ]
  },
  {
    id: 'tobacco-vanille',
    brand: 'TOM FORD',
    name: 'Private Blend Tobacco Vanille EDP 100ml',
    category: 'Perfume',
    price: 530000,
    originalPrice: 580000,
    discount: '9% OFF',
    notes: 'Tobacco Leaf, Spices, Tonka Bean, Tobacco Blossom, Vanilla, Cacao, Dry Fruit Accord, Wood Notes',
    description: 'Opulent, warm, and iconic. Reminiscent of an English gentleman’s club, blended with rich spices and vanilla.',
    image: 'luxury perfume/efd450c7af778e17f1a2dd83db85b5c6.jpg',
    variants: [
      { name: '50ml', price: 330000 },
      { name: '100ml', price: 530000 }
    ],
    reviews: [
      { name: 'Elena', rating: 5, body: 'The warmest, cozy scent for cold weather. Rich vanilla and sweet tobacco.' }
    ]
  },
  {
    id: 'aventus',
    brand: 'CREED',
    name: 'Creed Aventus EDP 100ml',
    category: 'Perfume',
    price: 520000,
    originalPrice: 560000,
    discount: '7% OFF',
    notes: 'Lemon, Pink Pepper, Apple, Bergamot, Pineapple, Jasmine, Patchouli, Birch, Ambergris, Cedarwood, Oakmoss',
    description: 'Sensual, audacious, and contemporary, celebrating strength, power, vision, and success.',
    image: 'luxury perfume/676d3c9628f81388a70bd808cffb604d.jpg',
    variants: [
      { name: '50ml', price: 340000 },
      { name: '100ml', price: 520000 }
    ],
    reviews: [
      { name: 'Alexander', rating: 5, body: 'The undisputed king of men’s fragrances. Fruity birch perfection.' }
    ]
  },
  {
    id: 'delina-exclusif',
    brand: 'PARFUMS DE MARLY',
    name: 'Delina Exclusif EDP 75ml',
    category: 'Perfume',
    price: 460000,
    originalPrice: 500000,
    discount: '8% OFF',
    notes: 'Bergamot, Lychee, Pear, Incense, Oud, Turkish Rose, Vanilla, Amber, Woody Notes',
    description: 'A captivating floral creation with touches of rose and peach, dressed in an aura of mystery and sensuality.',
    image: 'luxury perfume/bd65304bbbc336aa699248a3cd688dee.jpg',
    variants: [
      { name: '75ml EDP', price: 460000 }
    ],
    reviews: [
      { name: 'Chloe', rating: 5, body: 'Feminine, sweet, smoky, and long-lasting. The ultimate luxury scent for women.' }
    ]
  },
  {
    id: 'khamrah',
    brand: 'LATTAFA',
    name: 'Khamrah EDP 100ml',
    category: 'Perfume',
    price: 28000,
    originalPrice: 35000,
    discount: '20% OFF',
    notes: 'Cinnamon, Nutmeg, Bergamot, Dates, Praline, Tuberose, Mahonial, Vanilla, Tonka Bean, Benzoin, Amberwood, Myrrh',
    description: 'A luxurious oriental-spicy unisex fragrance that blends precious spices, warmth of sweet notes, and woodsy tones.',
    image: 'luxury perfume/67fdc89833b4a5ddc822347271ce9cfe.jpg',
    variants: [
      { name: '100ml Original', price: 28000 },
      { name: '100ml Qahwa Edition', price: 32000 }
    ],
    reviews: [
      { name: 'Tunde', rating: 5, body: 'Smells like high-end gourmand perfumes at a fraction of the cost. Performance is insane!' }
    ]
  },
  {
    id: 'club-de-nuit-intense',
    brand: 'ARMAF',
    name: 'Club De Nuit Intense Man EDT 105ml',
    category: 'Perfume',
    price: 32000,
    originalPrice: 40000,
    discount: '20% OFF',
    notes: 'Lemon, Pineapple, Bergamot, Black Currant, Apple, Birch, Jasmine, Rose, Musk, Ambergris, Patchouli, Vanilla',
    description: 'A provocative woody spicy masculine fragrance that opens with fresh fruity notes leading to an opulent floral heart.',
    image: 'luxury perfume/3ac394f59e99839375271303b1586c51.jpg',
    variants: [
      { name: '105ml EDT', price: 32000 },
      { name: '200ml EDP', price: 55000 },
      { name: '105ml Pure Parfum', price: 48000 }
    ],
    reviews: [
      { name: 'Gideon', rating: 5, body: 'Best Creed Aventus alternative on the planet. Get compliments every single day.' }
    ]
  },
  {
    id: 'libre-intense',
    brand: 'YVES SAINT LAURENT',
    name: 'Libre Intense Eau De Parfum 90ml',
    category: ' Perfume',
    price: 240000,
    originalPrice: 270000,
    discount: '11% OFF',
    notes: 'Lavender, Tangerine, Bergamot, Orchid, Orange Blossom, Jasmine Sambac, Madagascar Vanilla, Ambergris, Vetiver',
    description: 'The perfume of an intense woman living her roaring freedom and following her instincts.',
    image: 'luxury perfume/1788659591794.jpg',
    variants: [
      { name: '50ml', price: 175000 },
      { name: '90ml', price: 240000 }
    ],
    reviews: [
      { name: 'Amaka', rating: 5, body: 'Warm, lavender vanilla perfection. Classy and bold for evening wear.' }
    ]
  },
  {
    id: 'bleu-de-chanel-parfum',
    brand: 'CHANEL',
    name: 'Bleu De Chanel Parfum 100ml',
    category: ' Perfume',
    price: 310000,
    originalPrice: 340000,
    discount: '9% OFF',
    notes: 'Lemon Zest, Bergamot, Mint, Lavender, Pineapple, Geranium, Sandalwood, Cedar, Amberwood, Tonka Bean',
    description: 'An intensely woody aromatic fragrance that opens with captivating freshness and leads into a rich, deep accord of New Caledonian Sandalwood.',
    image: 'luxury perfume/89fba3422e6afd8572957a2d3fac071f.jpg',
    variants: [
      { name: '50ml', price: 220000 },
      { name: '100ml', price: 310000 },
      { name: '150ml', price: 410000 }
    ],
    reviews: [
      { name: 'Victor', rating: 5, body: 'The most versatile luxury blue scent ever created. Pure elegance.' }
    ]
  },
  {
    id: 'angels-share',
    brand: 'KILIAN PARIS',
    name: 'Angels Share EDP 50ml',
    category: ' Perfume',
    price: 410000,
    originalPrice: 450000,
    discount: '8% OFF',
    notes: 'Cognac, Cinnamon, Tonka Bean, Oak, Praline, Vanilla, Sandalwood',
    description: 'Inspired by the liquor-making process, containing the essence of Cognac derived from the liquor to lend it a natural caramel color.',
    image: 'luxury perfume/9860e4da4949d18756d691d3bac31483.jpg',
    variants: [
      { name: '50ml EDP', price: 410000 }
    ],
    reviews: [
      { name: 'Samantha', rating: 5, body: 'Smells like warm cinnamon apple pie dipped in fine cognac. Heavenly!' }
    ]
  },
  {
    id: 'black-orchid',
    brand: 'TOM FORD',
    name: 'Black Orchid Parfum 100ml',
    category: ' Perfume',
    price: 320000,
    originalPrice: 360000,
    discount: '11% OFF',
    notes: 'Truffle, Black Currant, Ylang-Ylang, Bergamot, Black Orchid, Rum, Plum, Patchouli, Vanilla, Sandalwood',
    description: 'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice.',
    image: 'luxury perfume/eb57ce8210248ec52a87358f4a22abb9.jpg',
    variants: [
      { name: '50ml', price: 210000 },
      { name: '100ml', price: 320000 }
    ],
    reviews: [
      { name: 'Kemi', rating: 5, body: 'Dark, enigmatic, and powerful. Not for the faint-hearted.' }
    ]
  },
  {
    id: 'asad-lattafa',
    brand: 'LATTAFA',
    name: 'Asad Black EDP 100ml',
    category: 'Perfume',
    price: 22000,
    originalPrice: 28000,
    discount: '21% OFF',
    notes: 'Black Pepper, Pineapple, Tobacco, Coffee, Patchouli, Iris, Amber, Vanilla, Dry Wood',
    description: 'A signature spicy vanilla fragrance for men with high intensity and unforgettable projection.',
    image: 'luxury perfume/306f54c2950f03ffd1db392b7f81e05d.jpg',
    variants: [
      { name: '100ml EDP', price: 22000 }
    ],
    reviews: [
      { name: 'Michael', rating: 5, body: 'Extremely close clone of Dior Sauvage Elixir at a bargain price.' }
    ]
  },
  {
    id: 'good-girl-supreme',
    brand: 'CAROLINA HERRERA',
    name: 'Good Girl EDP Supreme 80ml',
    category: ' Perfume',
    price: 225000,
    originalPrice: 250000,
    discount: '10% OFF',
    notes: 'Forest Fruits, Egyptian Jasmine, Tonka Bean, Vetiver',
    description: 'Breaks all perfume rules, reinventing its olfactory family. Juiciness of berries gives way to the gourmand sweetness of tonka bean.',
    image: 'luxury perfume/63d1a547ba0ef3073dbb2667fa44c9e0.jpg',
    variants: [
      { name: '50ml', price: 165000 },
      { name: '80ml', price: 225000 }
    ],
    reviews: [
      { name: 'Zainab', rating: 5, body: 'The bottle is iconic and the scent is deeply addictive!' }
    ]
  },
  {
    id: 'oud-wood',
    brand: 'TOM FORD',
    name: 'Private Blend Oud Wood EDP 100ml',
    category: ' Perfume',
    price: 510000,
    originalPrice: 550000,
    discount: '7% OFF',
    notes: 'Rare Oud Wood, Rosewood, Chinese Pepper, Sandalwood, Tonka Bean, Vanilla, Amber',
    description: 'One of the most rare, precious, and expensive ingredients in a perfumer’s arsenal, oud wood is often burned in incense-filled temples.',
    image: 'luxury perfume/b6485e48a84063503ce2a475a9e57258.jpg',
    variants: [
      { name: '50ml', price: 320000 },
      { name: '100ml', price: 510000 }
    ],
    reviews: [
      { name: 'Babatunde', rating: 5, body: 'Refined, woody, and smooth. The ultimate boss scent.' }
    ]
  },
  {
    id: 'valaya',
    brand: 'PARFUMS DE MARLY',
    name: 'Valaya EDP 75ml',
    category: ' Perfume',
    price: 480000,
    originalPrice: 520000,
    discount: '7% OFF',
    notes: 'Bergamot, Mandarin, White Peach, White Flowers, Vetiver, Akigalawood, Ambrofix, Musk',
    description: 'An ethereal aura, a soft, sensual, radiant skin scent that radiates clean sophistication.',
    image: 'luxury perfume/b4e3d736dbf1d218244520e2f5f19e2d.jpg',
    variants: [
      { name: '75ml EDP', price: 480000 }
    ],
    reviews: [
      { name: 'Sandra', rating: 5, body: 'Smells like clean cotton and high-society elegance.' }
    ]
  },
  {
    id: 'amber-oud-gold',
    brand: 'AL HARAMAIN',
    name: 'Amber Oud Gold Edition EDP 120ml',
    category: ' Perfume',
    price: 65000,
    originalPrice: 78000,
    discount: '16% OFF',
    notes: 'Bergamot, Green Notes, Melon, Pineapple, Sweet Notes, Amber, Musk, Vanilla, Woody Notes',
    description: 'A lavish oriental fragrance with explosive fruity top notes backed by heavy warm amber.',
    image: 'luxury perfume/35bd378252344962265562a7673eef41.jpg',
    variants: [
      { name: '60ml', price: 42000 },
      { name: '120ml', price: 65000 },
      { name: '200ml', price: 95000 }
    ],
    reviews: [
      { name: 'Chidiebere', rating: 5, body: 'Projects like crazy! People will smell you before you walk into the room.' }
    ]
  },
  {
    id: 'la-vie-est-belle',
    brand: 'LANCOME',
    name: 'La Vie Est Belle EDP 100ml',
    category: ' Perfume',
    price: 210000,
    originalPrice: 235000,
    discount: '10% OFF',
    notes: 'Blackcurrant, Pear, Iris, Jasmine, Orange Blossom, Patchouli, Tonka Bean, Vanilla, Praline',
    description: 'Made with the most precious natural ingredients, a modern interpretation of an oriental fragrance with a gourmand twist.',
    image: 'luxury perfume/5298be7930e5c207e9d3cddc03545b0f.jpg',
    variants: [
      { name: '50ml', price: 150000 },
      { name: '100ml', price: 210000 }
    ],
    reviews: [
      { name: 'Grace', rating: 5, body: 'Sweet, floral, long-lasting, and universally beloved.' }
    ]
  },
  {
    id: 'erba-pura',
    brand: 'XERJOFF',
    name: 'Vibe Erba Pura EDP 100ml',
    category: ' Perfume',
    price: 430000,
    originalPrice: 470000,
    discount: '8% OFF',
    notes: 'Sicilian Orange, Calabrian Bergamot, Sicilian Lemon, Fruits, White Musk, Amber, Madagascar Vanilla',
    description: 'A delicious and modern blend of Mediterranean citrus and sweet fruits laid over a warm amber-vanilla base.',
    image: 'luxury perfume/9e945957114480dd74a64b05b1c0cc71.jpg',
    variants: [
      { name: '50ml', price: 280000 },
      { name: '100ml', price: 430000 }
    ],
    reviews: [
      { name: 'Ibrahim', rating: 5, body: 'The fruity freshness lingers for days on clothes.' }
    ]
  },
  {
    id: 'hawas-for-him',
    brand: 'RASASI',
    name: 'Hawas For Him EDP 100ml',
    category: 'perfume',
    price: 45000,
    originalPrice: 55000,
    discount: '18% OFF',
    notes: 'Apple, Bergamot, Lemon, Cinnamon, Orange Blossom, Cardamom, Plum, Patchouli, Ambergris, Musk, Driftwood',
    description: 'Blends cinnamon, bergamot, orange blossom and grey amber to create an aquatic scent designed to embody masculine strength.',
    image: 'luxury perfume/6c77bd526e9623e237097d15bd068ace.jpg',
    variants: [
      { name: '100ml Original', price: 45000 },
      { name: '100ml Ice Edition', price: 52000 }
    ],
    reviews: [
      { name: 'Daniel', rating: 5, body: 'Fresh, sweet, aquatic beast mode fragrance for summer!' }
    ]
  },
  {
    id: 'stronger-with-you-intensely',
    brand: 'EMPORIO ARMANI',
    name: 'Stronger With You Intensely EDP 100ml',
    category: ' Perfume',
    price: 188500,
    originalPrice: 210000,
    discount: '10% OFF',
    notes: 'Pink Pepper, Juniper, Violet, Toffee, Cinnamon, Lavender, Sage, Vanilla, Amber, Tonka Bean, Suede',
    description: 'An addictive woody oriental scent featuring notes of pink pepper, vanilla, and an amber wood accord.',
    image: 'luxury perfume/f523c4d50ee35d71e16049420d43bbf3.jpg',
    variants: [
      { name: '50ml', price: 135000 },
      { name: '100ml', price: 188500 }
    ],
    reviews: [
      { name: 'Emeka', rating: 5, body: 'Warm toffee and cinnamon sweetness. Unbelievable date night fragrance.' }
    ]
  },
  {
    id: 'naxos',
    brand: 'XERJOFF',
    name: 'Xerjoff 1861 Naxos EDP 100ml',
    category: 'Perfume',
    price: 450000,
    originalPrice: 490000,
    discount: '8% OFF',
    notes: 'Bergamot, Lemon, Lavender, Cinnamon, Honey, Cashmeran, Jasmine Sambac, Tobacco Leaf, Tonka Bean, Vanilla',
    description: 'Celebrates the deep and sensual heart of Sicily with an opulent tribute to heritage and Mediterranean warmth.',
    image: 'luxury perfume/d542588cb26cfa7487594af1ac8a41cf.jpg',
    variants: [
      { name: '100ml EDP', price: 450000 }
    ],
    reviews: [
      { name: 'Farouk', rating: 5, body: 'Honey, lavender, and rich tobacco. Pure artistry in a bottle.' }
    ]
  },
  {
    id: 'coco-mademoiselle',
    brand: 'CHANEL',
    name: 'Coco Mademoiselle EDP 100ml',
    category: ' Perfume',
    price: 295000,
    originalPrice: 320000,
    discount: '7% OFF',
    notes: 'Orange, Mandarin, Bergamot, Orange Blossom, Turkish Rose, Jasmine, Mimosa, Ylang-Ylang, Patchouli, White Musk, Vanilla, Vetiver',
    description: 'The essence of a bold and free woman. An oriental fragrance with a strong personality, yet surprisingly fresh.',
    image: 'luxury perfume/85b60997e52fc9006ca9b2dc2ed35d37.jpg',
    variants: [
      { name: '50ml', price: 200000 },
      { name: '100ml', price: 295000 }
    ],
    reviews: [
      { name: 'Fiona', rating: 5, body: 'Timeless luxury. A signature scent for powerful women.' }
    ]
  },
  {
    id: 'faktan-black',
    brand: 'LATTAFA',
    name: 'Fakhar Black EDP 100ml',
    category: 'Affordable Luxury',
    price: 20000,
    originalPrice: 25000,
    discount: '20% OFF',
    notes: 'Apple, Ginger, Bergamot, Sage, Lavender, Juniper Berries, Geranium, Amberwood, Tonka Bean, Cedar, Vetiver',
    description: 'An aromatic spicy fragrance that offers a harmonious combination of fresh citrus and masculine woody tones.',
    image: 'luxury perfume/f8309eb36052843fd0d6d5244c9f347e.jpg',
    variants: [
      { name: '100ml EDP', price: 20000 }
    ],
    reviews: [
      { name: 'Samuel', rating: 4, body: 'Great YSL Y clone. Very fresh and clean everyday scent.' }
    ]
  },
  {
    id: 'y-edp-ysl',
    brand: 'YVES SAINT LAURENT',
    name: 'Y Eau De Parfum 100ml',
    category: 'Luxury Perfume',
    price: 230000,
    originalPrice: 260000,
    discount: '11% OFF',
    notes: 'Apple, Ginger, Bergamot, Sage, Juniper Berries, Geranium, Amberwood, Tonka Bean, Cedar, Vetiver, Olibanum',
    description: 'Represents a man who has accomplished his dreams and is moving towards a new tomorrow.',
    image: './luxury perfume/ysl_y_edp.jpg',
    variants: [
      { name: '60ml', price: 165000 },
      { name: '100ml', price: 230000 },
      { name: '200ml', price: 320000 }
    ],
    reviews: [
      { name: 'Josh', rating: 5, body: 'Fresh green apple opening with a dark woody dry down. Top 3 mass appealing scents!' }
    ]
  },
  {
    id: 'valentin-donna-born-in-roma',
    brand: 'VALENTINO',
    name: 'Donna Born In Roma EDP 100ml',
    category: 'Luxury Perfume',
    price: 245000,
    originalPrice: 270000,
    discount: '9% OFF',
    notes: 'Blackcurrant, Pink Pepper, Bergamot, Jasmine, Jasmine Sambac, Jasmine Tea, Bourbon Vanilla, Cashmeran, Guaiac Wood',
    description: 'A modern couture woody floral fragrance where couture elegance is made of three qualities of Jasmine blended with Bourbon Vanilla.',
    image: 'luxury perfume/db83021583ab4bd6894070a029534ca7.jpg',
    variants: [
      { name: '50ml', price: 175000 },
      { name: '100ml', price: 245000 }
    ],
    reviews: [
      { name: 'Jessica', rating: 5, body: 'Sweet bourbon vanilla and floral jasmine. High compliment getter!' }
    ]
  },
  {
    id: 'shaghaf-oud',
    brand: 'SWISS ARABIAN',
    name: 'Shaghaf Oud EDP 75ml',
    category: 'Affordable Luxury',
    price: 25000,
    originalPrice: 32000,
    discount: '21% OFF',
    notes: 'Saffron, Agarwood (Oud), Rose, Praline, Vanilla',
    description: 'An oriental gold gourmand fragrance that encompasses passion, desire, and rich Arabian luxury.',
    image: './luxury perfume/shaghaf_oud.jpg',
    variants: [
      { name: '75ml Gold', price: 25000 },
      { name: '75ml Abyad', price: 27000 }
    ],
    reviews: [
      { name: 'Fatima', rating: 5, body: 'Strong sweet praline and oud scent. Beast mode performance!' }
    ]
  },
  {
    id: 'layton',
    brand: 'PARFUMS DE MARLY',
    name: 'Layton EDP 125ml',
    category: 'Niche Luxury Perfume',
    price: 440000,
    originalPrice: 480000,
    discount: '8% OFF',
    notes: 'Apple, Lavender, Bergamot, Mandarin Orange, Geranium, Violet, Jasmine, Vanilla, Cardamom, Sandalwood, Pepper, Guaiac Wood, Patchouli',
    description: 'An addictive signature scent enhanced by natural elegance. Captivates with its aromatic, spicy floral blend.',
    image: 'luxury perfume/097b575438cbb2b92cfebafb98f63dd8.jpg',
    variants: [
      { name: '75ml', price: 320000 },
      { name: '125ml', price: 440000 }
    ],
    reviews: [
      { name: 'Anthony', rating: 5, body: 'Sweet vanilla, apple, and spices. Absolute signature scent material.' }
    ]
  },
  {
    id: 'si-passione',
    brand: 'GIORGIO ARMANI',
    name: 'Si Passione EDP 100ml',
    category: 'Luxury Perfume',
    price: 215000,
    originalPrice: 240000,
    discount: '10% OFF',
    notes: 'Pink Pepper, Pear, Blackcurrant, Grapefruit, Rose, Jasmine, Heliotrope, Pineapple, Vanilla, Cedarwood, Amberwood',
    description: 'An invigorating floral fruity fragrance that inspires confidence, passion, and feminine empowerment.',
    image: 'luxury perfume/ca6edb61f75602453e91e11a04aa77a6.jpg',
    variants: [
      { name: '50ml', price: 155000 },
      { name: '100ml', price: 215000 }
    ],
    reviews: [
      { name: 'Joy', rating: 5, body: 'Bright red fruits with a velvety soft dry down. Beautiful for daytime.' }
    ]
  },
  {
    id: 'interlude-man',
    brand: 'AMOUAGE',
    name: 'Interlude Man EDP 100ml',
    category: 'Niche Luxury Perfume',
    price: 520000,
    originalPrice: 570000,
    discount: '8% OFF',
    notes: 'Bergamot, Oregano, Pimento Berry, Amber, Frankincense, Cistus, Opoponax, Leather, Agarwood Smoke, Patchouli, Sandalwood',
    description: 'Known as "Blue Beast", an oriental woody fragrance inspired by chaos and disorder, harmonized with heart notes of incense and myrrh.',
    image: 'luxury perfume/85b1772d66c3d6280e9cbda179806a4f.jpg',
    variants: [
      { name: '100ml EDP', price: 520000 },
      { name: '100ml 53 Extrait', price: 780000 }
    ],
    reviews: [
      { name: 'Tariq', rating: 5, body: 'Smokey, rich, and regal. A masterpiece of perfumery.' }
    ]
  },
  {
    id: 'club-de-nuit-untold',
    brand: 'ARMAF',
    name: 'Club De Nuit Untold EDP 105ml',
    category: 'Affordable Luxury',
    price: 45000,
    originalPrice: 55000,
    discount: '18% OFF',
    notes: 'Saffron, Jasmine, Amberwood, Ambergris, Fir Resin, Cedar',
    description: 'An enchanting fragrance that delivers a stunning alternative to high-end saffron ambergris perfumes.',
    image: 'luxury perfume/eba5646d29e768e938be0e6dd2ac4bf9.jpg',
    variants: [
      { name: '105ml EDP', price: 45000 }
    ],
    reviews: [
      { name: 'Kelechi', rating: 5, body: 'Spot on clone of BR540. Gets so many compliments in public!' }
    ]
  },
  {
    id: 'myslf',
    brand: 'YVES SAINT LAURENT',
    name: 'MYSLF Eau De Parfum 100ml',
    category: 'Luxury Perfume',
    price: 220000,
    originalPrice: 250000,
    discount: '12% OFF',
    notes: 'Calabrian Bergamot, Bergamot, Tunisian Orange Blossom, Ambrofix, Patchouli',
    description: 'A modern statement of masculinity. A floral woody fragrance born from the twist of orange blossom and woods.',
    image: 'luxury perfume/85af18ecea0bd40c4ce0495ba4661d13.jpg',
    variants: [
      { name: '60ml', price: 160000 },
      { name: '100ml', price: 220000 }
    ],
    reviews: [
      { name: 'Nnamdi', rating: 5, body: 'Ultra clean, fresh, orange blossom scent. Perfect signature scent.' }
    ]
  },
  {
    id: 'bade-e-al-oud-honor-glory',
    brand: 'LATTAFA',
    name: 'Bade\'e Al Oud Honor & Glory EDP 100ml',
    category: 'Affordable Luxury',
    price: 26000,
    originalPrice: 32000,
    discount: '18% OFF',
    notes: 'Pineapple, Creme Brulee, Cinnamon, Benzoin, Black Pepper, Turmeric, Vanilla, Cashmeran, Sandalwood, Moss',
    description: 'A luxurious gourmand creation that opens with sweet creme brulee and pineapple over a spicy-woody undertone.',
    image: 'luxury perfume/714e9b452b45368325b1718e1059235c.jpg',
    variants: [
      { name: '100ml EDP', price: 26000 }
    ],
    reviews: [
      { name: 'Vivian', rating: 5, body: 'Smells like luxury pineapple dessert. Very unique and comforting.' }
    ]
  },
  {
    id: '9pm-afnan',
    brand: 'AFNAN',
    name: '9PM Eau De Parfum 100ml',
    category: 'Affordable Luxury',
    price: 23000,
    originalPrice: 30000,
    discount: '23% OFF',
    notes: 'Apple, Cinnamon, Wild Lavender, Bergamot, Orange Blossom, Lily of the Valley, Vanilla, Tonka Bean, Amber, Patchouli',
    description: 'An energetic night-out fragrance featuring dynamic fruity and vanilla accords for the modern man.',
    image: 'luxury perfume/91b00d22beff9a08b403a7319fc3adf2.jpg',
    variants: [
      { name: '100ml EDP', price: 23000 }
    ],
    reviews: [
      { name: 'Segun', rating: 5, body: 'Beast performance, sweet bubblegum vanilla vibe. Incredible value!' }
    ]
  },
  {
    id: 'black-afgano',
    brand: 'NASOMATTO',
    name: 'Black Afgano Extrait De Parfum 30ml',
    category: 'Niche Luxury Perfume',
    price: 235000,
    originalPrice: 260000,
    discount: '9% OFF',
    notes: 'Cannabis, Green Notes, Resins, Woodsy Notes, Tobacco, Coffee, Oud, Incense',
    description: 'Aims to evoke the best quality of Hashish. It is the result of a quest to arouse the effects of temporary bliss.',
    image: 'luxury perfume/3792778049ffffa2e9374a9b8a590084.jpg',
    variants: [
      { name: '30ml Extrait', price: 235000 }
    ],
    reviews: [
      { name: 'Ahmed', rating: 5, body: 'Dark, resinous, smoky perfection. Only 1 spray is needed.' }
    ]
  },
  {
    id: 'paradoxe',
    brand: 'PRADA',
    name: 'Paradoxe Eau De Parfum 90ml',
    category: 'Luxury Perfume',
    price: 235000,
    originalPrice: 260000,
    discount: '9% OFF',
    notes: 'Pear, Tangerine, Bergamot, Orange Blossom, Neroli, Jasmine Sambac, Bourbon Vanilla, Amber, White Musk',
    description: 'A floral amber fragrance that embraces the paradoxes of iconic ingredients to reveal new scented sensations.',
    image: 'luxury perfume/bdcc29eb0cacc65ef48623f279e8dd59.jpg',
    variants: [
      { name: '50ml', price: 165000 },
      { name: '90ml', price: 235000 }
    ],
    reviews: [
      { name: 'Mercy', rating: 5, body: 'Fresh neroli and sweet vanilla base. Feminine and dreamy.' }
    ]
  },
  {
    id: 'one-million-elixir',
    brand: 'RABANNE',
    name: '1 Million Elixir Parfum Intense 100ml',
    category: 'Luxury Perfume',
    price: 195000,
    originalPrice: 220000,
    discount: '11% OFF',
    notes: 'Apple, Davana, Damask Rose, Cedarwood, Osmathus, Tonka Bean, Vanilla Absolute, Patchouli',
    description: 'Richness beyond expectations. Hand-picked ingredients craft a supreme intensity that radiates rich sensuality.',
    image: 'luxury perfume/0606f1047c28def9b13247bcb867ba42.jpg',
    variants: [
      { name: '50ml', price: 140000 },
      { name: '100ml', price: 195000 },
      { name: '200ml', price: 270000 }
    ],
    reviews: [
      { name: 'Emmanuel', rating: 5, body: 'Sweet apple vanilla liquor vibes. Super potent!' }
    ]
  },
  {
    id: 'oud-bouquet',
    brand: 'LANCOME',
    name: 'Maison Lancome Oud Bouquet EDP 100ml',
    category: 'Niche Luxury Perfume',
    price: 380000,
    originalPrice: 420000,
    discount: '9% OFF',
    notes: 'Saffron, Rose, Praline, Vanilla, Oud Wood',
    description: 'A opulent rose-oud gourmand blend enveloped in addictive vanilla praline notes.',
    image: 'luxury perfume/19967f898f1aaea3f52e293e8db9e070.jpg',
    variants: [
      { name: '100ml EDP', price: 380000 }
    ],
    reviews: [
      { name: 'Halima', rating: 5, body: 'The royal queen of gourmand rose oud fragrances!' }
    ]
  },
  {
    id: 'modest-une',
    brand: 'AFNAN',
    name: 'Modest Une EDP 100ml',
    category: 'Affordable Luxury',
    price: 21000,
    originalPrice: 26000,
    discount: '19% OFF',
    notes: 'Nutmeg, Lavender, Pepper, Bergamot, Amber, Vetiver, Patchouli',
    description: 'A fresh, aromatic fragrance designed for men who prefer crisp, peppery, clean notes.',
    image: 'luxury perfume/7361cdcb30ab67c14d8850c8fa2329f5.jpg',
    variants: [
      { name: '100ml EDP', price: 21000 }
    ],
    reviews: [
      { name: 'Collins', rating: 4, body: 'Very fresh Dior Sauvage EDT alternative for daily wear.' }
    ]
  },
  {
    id: 'l-aventure',
    brand: 'AL HARAMAIN',
    name: 'L\'Aventure EDP 100ml',
    category: 'Affordable Luxury',
    price: 35000,
    originalPrice: 42000,
    discount: '16% OFF',
    notes: 'Lemon, Bergamot, Elemi, Woody Notes, Jasmine, Lily of the Valley, Musk, Patchouli, Amber',
    description: 'An adventurous scent crafted for the modern man, blending zesty citruses over robust woods.',
    image: 'luxury perfume/6bdd01771a1b02fc8b1a0f9352e3daae.jpg',
    variants: [
      { name: '100ml EDP', price: 35000 },
      { name: '200ml EDP', price: 58000 }
    ],
    reviews: [
      { name: 'Usman', rating: 5, body: 'Smooth citrus and birch scent. Classy presentation.' }
    ]
  },
  {
    id: 'ombre-nomade',
    brand: 'LOUIS VUITTON',
    name: 'Ombre Nomade EDP 100ml',
    category: 'Niche Luxury Perfume',
    price: 750000,
    originalPrice: 800000,
    discount: '6% OFF',
    notes: 'Oud Wood, Benzoin Tears, Incense, Raspberry, Rose, Birch, Amberwood',
    description: 'Designed for lovers of rare essences, Ombre Nomade concentrates that sensation of infinity into one of the most mythical ingredients in perfumery: oud wood.',
    image: 'luxury perfume/4b044c29c0b407b72d3f7b1c7f0a6624.jpg',
    variants: [
      { name: '100ml EDP', price: 750000 },
      { name: '200ml EDP', price: 1150000 }
    ],
    reviews: [
      { name: 'Chukwudi', rating: 5, body: 'Unstoppable longevity. The ultimate status symbol fragrance.' }
    ]
  },
  {
    id: 'choco-musk',
    brand: 'AL-REHAB',
    name: 'Choco Musk EDP 50ml',
    category: 'perfume',
    price: 6500,
    originalPrice: 8000,
    discount: '18% OFF',
    notes: 'Milk Chocolate, Vanilla, Cinnamon, Rose, Sandalwood, Myrrh, Amber, White Musk',
    description: 'A delicious cocoa and milk chocolate fragrance that lingers with warm cozy vanilla.',
    image: 'luxury perfume/b1ec37a2331ab4887da60ffab97b00b6.jpg',
    variants: [
      { name: '50ml Spray', price: 6500 },
      { name: '6ml Roll-on Oil', price: 2500 }
    ],
    reviews: [
      { name: 'Anita', rating: 5, body: 'Smells exactly like hot cocoa and fresh baked chocolate cookies!' }
    ]
  },
  {
    id: 'bright-crystal',
    brand: 'VERSACE',
    name: 'Bright Crystal EDT 90ml',
    category: ' Perfume',
    price: 165000,
    originalPrice: 185000,
    discount: '10% OFF',
    notes: 'Yuzu, Pomegranate, Ice Accord, Peony, Lotus, Magnolia, Plant Amber, Musk, Mahogany',
    description: 'A precious jewel of rare beauty characterized by a fresh, vibrant, flowery scent.',
    image: 'luxury perfume/8423c27bcaa266352739036edb161145.jpg',
    variants: [
      { name: '50ml', price: 115000 },
      { name: '90ml', price: 165000 }
    ],
    reviews: [
      { name: 'Blessing', rating: 5, body: 'Light, uplifting, floral, and perfect for hot afternoon weather.' }
    ]
  },
  {
    id: 'eros-edp',
    brand: 'VERSACE',
    name: 'Eros Eau De Parfum 100ml',
    category: ' Perfume',
    price: 175000,
    originalPrice: 195000,
    discount: '10% OFF',
    notes: 'Mint, Candy Apple, Lemon, Mandarin, Ambroxan, Geranium, Clary Sage, Vanilla, Cedarwood, Sandalwood, Patchouli',
    description: 'Sublime masculinisation embodied through a luminous aura with intense, vibrant, and glowing freshness.',
    image: 'luxury perfume/b95cd8b19e36fcabc13f0d7e45b0732b.jpg',
    variants: [
      { name: '50ml', price: 125000 },
      { name: '100ml', price: 175000 },
      { name: '200ml', price: 240000 }
    ],
    reviews: [
      { name: 'Kevin', rating: 5, body: 'Fresh mint opening with sweet vanilla dry down. A clubbing classic!' }
    ]
  },
  {
    id: 'club-de-nuit-sillage',
    brand: 'ARMAF',
    name: 'Club De Nuit Sillage EDP 105ml',
    category: 'Perfume',
    price: 36000,
    originalPrice: 42000,
    discount: '14% OFF',
    notes: 'Bergamot, Black Currant, Violet Leaf, Lime, Lemon, Ginger, Rose, Iris, Jasmine, Ambrosia, Musk, Sandalwood, Cedar',
    description: 'A crisp metallic citrus scent designed to mimic frozen mountain streams and crisp air.',
    image: 'luxury perfume/c2edf641677a300cd821aa76eecfce07.jpg',
    variants: [
      { name: '105ml EDP', price: 36000 }
    ],
    reviews: [
      { name: 'Solomon', rating: 5, body: 'Great alternative to Creed Silver Mountain Water. Fresh and metallic.' }
    ]
  },
  {
    id: 'goddess-burberry',
    brand: 'BURBERRY',
    name: 'Burberry Goddess EDP 100ml',
    category: ' Perfume',
    price: 240000,
    originalPrice: 265000,
    discount: '9% OFF',
    notes: 'Vanilla Infusion, Lavender, Vanilla Caviar, Vanilla Absolute, Cocoa',
    description: 'A unique gourmand aromatic fragrance led by a powerful trio of distinct vanillas enriched with luminous lavender.',
    image: 'luxury perfume/fd04cafe6287256befe1230439fa0589.jpg',
    variants: [
      { name: '50ml', price: 170000 },
      { name: '100ml', price: 240000 }
    ],
    reviews: [
      { name: 'Patricia', rating: 5, body: 'Vanilla lover dream! Lavender gives it such an elegant twist.' }
    ]
  },
  {
    id: 'riggs-london-chief',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Chief EDP 100ml',
    category: 'Affordable Luxury',
    price: 15500,
    originalPrice: 18500,
    discount: '16% OFF',
    notes: 'Warm Amber, Exotic Spices, Leather, Fresh Citrus',
    description: 'A bold, long-lasting designer-inspired scent crafted for men who like to command presence.',
    image: './luxury perfume/riggs_chief.jpg',
    variants: [
      { name: '100ml EDP', price: 15500 },
      { name: '100ml + 250ml Body Spray Set', price: 22999 }
    ],
    reviews: [
      { name: 'Olumide', rating: 5, body: 'The scent projection is amazing! Smells like high-end designer perfumes.' },
      { name: 'Victor', rating: 5, body: 'Strong and lasts all through the workday.' }
    ]
  },
  {
    id: 'riggs-london-patrol',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Patrol EDP 100ml',
    category: 'Affordable Luxury',
    price: 15500,
    originalPrice: 18500,
    discount: '16% OFF',
    notes: 'Citrus Zest, Fresh Aquatic Accords, Spicy Pepper, Cedarwood',
    description: 'An invigorating and energetic fragrance designed for active daily wear.',
    image: './luxury perfume/riggs_patrol.jpg',
    variants: [
      { name: '100ml EDP', price: 15500 },
      { name: '250ml Body Spray', price: 7999 }
    ],
    reviews: [
      { name: 'Stephen', rating: 5, body: 'Very fresh peppery opening. Great daily driver for warm weather.' }
    ]
  },
  {
    id: 'riggs-london-icon',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Icon EDP 100ml',
    category: 'Affordable Luxury',
    price: 15500,
    originalPrice: 18000,
    discount: '14% OFF',
    notes: 'Bergamot, Lavender, Sweet Tonka Bean, Sandalwood',
    description: 'A refined aromatic-woody composition made to give a smooth, modern allure.',
    image: './luxury perfume/riggs_icon.jpg',
    variants: [
      { name: '100ml EDP', price: 15500 },
      { name: '250ml Body Spray', price: 7999 }
    ],
    reviews: [
      { name: 'Godswill', rating: 5, body: 'Smooth and subtle. Gets pleasant compliments from colleagues.' }
    ]
  },
  {
    id: 'riggs-london-dynamo',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Dynamo EDP 100ml',
    category: 'Affordable Luxury',
    price: 15500,
    originalPrice: 18000,
    discount: '14% OFF',
    notes: 'Crisp Apple, Cardamom, Vetiver, Smoky Woods',
    description: 'A dynamic masculine blend with rich woody contrast and fresh spicy nuances.',
    image: './luxury perfume/riggs_dynamo.jpg',
    variants: [
      { name: '100ml EDP', price: 15500 }
    ],
    reviews: [
      { name: 'Tosin', rating: 4, body: 'Sharp and clean. Perfect everyday office scent.' }
    ]
  },
  {
    id: 'riggs-london-hero',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Hero EDP 100ml',
    category: 'Affordable Luxury',
    price: 22999,
    originalPrice: 26000,
    discount: '11% OFF',
    notes: 'Spicy Nutmeg, Grapefruit, Patchouli, Dark Amber',
    description: 'A powerful, sophisticated scent built around dark woods and vibrant spices.',
    image: './luxury perfume/riggs_hero.jpg',
    variants: [
      { name: '100ml EDP', price: 22999 }
    ],
    reviews: [
      { name: 'Emmanuel', rating: 5, body: 'Smells premium! Projects really well in open spaces.' }
    ]
  },
  {
    id: 'riggs-london-sceptre',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Sceptre EDP 100ml',
    category: 'Affordable Luxury',
    price: 54999,
    originalPrice: 60000,
    discount: '8% OFF',
    notes: 'Rare Oud, Incense, Golden Amber, Rose, Guaiac Wood',
    description: 'Part of the luxury private range, offering an opulent oriental woody trail.',
    image: './luxury perfume/riggs_sceptre.jpg',
    variants: [
      { name: '100ml EDP', price: 54999 }
    ],
    reviews: [
      { name: 'Babatunde', rating: 5, body: 'Regal scent. High-end Arabian luxury in a Riggs bottle.' }
    ]
  },
  {
    id: 'smart-collection-335',
    brand: 'SMART COLLECTION',
    name: 'Smart Collection No. 335 EDP 100ml',
    category: 'Budget Fragrance',
    price: 8500,
    originalPrice: 10000,
    discount: '15% OFF',
    notes: 'Lavender, Mint, Vanilla, Tonka Bean, Amber',
    description: 'A classic, mass-appealing aromatic fragrance crafted for everyday freshness.',
    image: './luxury perfume/smart_collection_335.jpg',
    variants: [
      { name: '15ml Pocket', price: 2500 },
      { name: '100ml Spray', price: 8500 }
    ],
    reviews: [
      { name: 'Daniel', rating: 4, body: 'Solid budget daily scent. Easy to wear.' }
    ]
  },
  {
    id: 'chichi-sapil',
    brand: 'SAPIL',
    name: 'Sapil Chi Chi Pour Femme EDT 100ml',
    category: 'Budget Fragrance',
    price: 9500,
    originalPrice: 12000,
    discount: '21% OFF',
    notes: 'Floral Notes, Fruity Accords, Musk, Amber',
    description: 'A lively, cheerful floral-fruity scent designed for confident women.',
    image: './luxury perfume/sapil_chichi.jpg',
    variants: [
      { name: '100ml EDT', price: 9500 }
    ],
    reviews: [
      { name: 'Anita', rating: 5, body: 'Soft floral and lasts well throughout the day.' }
    ]
  },
  {
    id: 'cybele-24k-gold',
    brand: 'CYBELE',
    name: '24K Gold Intense EDP 100ml',
    category: 'perfume',
    price: 11000,
    originalPrice: 15000,
    discount: '26% OFF',
    notes: 'Golden Amber, Sweet Citrus, Soft Woods, Vanilla',
    description: 'A smooth, affordable luxury-style fragrance with warm sensual notes.',
    image: 'luxury perfume/d849e4e25a0e2dc96a6023efcae88674.jpg',
    variants: [
      { name: '100ml EDP', price: 11000 }
    ],
    reviews: [
      { name: 'Precious', rating: 4, body: 'Super affordable luxury vibe. Gets good compliments.' }
    ]
  },
  {
    id: 'blue-for-men-rasasi',
    brand: 'RASASI',
    name: 'Blue For Men EDT 100ml',
    category: 'Affordable Luxury',
    price: 18000,
    originalPrice: 22000,
    discount: '18% OFF',
    notes: 'Mandarin, Mint, Coriander, Jasmine, Rose, Pepper, Amber, Woody Notes',
    description: 'A classic aquatic-spicy fragrance that delivers clean, crisp masculine energy.',
    image: './luxury perfume/rasasi_blue_for_men.jpg',
    variants: [
      { name: '100ml EDT', price: 18000 }
    ],
    reviews: [
      { name: 'Ibrahim', rating: 5, body: 'Timeless fresh scent. Incredible value for money.' }
    ]
  },
   {
    id: 'charuto-tobacco-vanille',
    brand: 'PARIS CORNER',
    name: 'Charuto Tobacco Vanille EDP 100ml',
    category: 'Affordable Luxury',
    price: 18500,
    originalPrice: 22000,
    discount: '15% OFF',
    notes: 'Tobacco Leaf, Spices, Tonka Bean, Cocoa, Vanilla, Dry Fruits',
    description: 'A rich oriental spicy fragrance wrapped in warm vanilla and sweet tobacco.',
    image: './luxury perfume/charuto_tobacco.jpg',
    variants: [
      { name: '100ml EDP', price: 18500 }
    ],
    reviews: [
      { name: 'Gideon', rating: 5, body: 'Warm, cozy tobacco vanilla scent. Great performance in air conditioning.' }
    ]
  },
  {
    id: 'ejaazi-lattafa',
    brand: 'LATTAFA',
    name: 'Ejaazi Intensive Silver EDP 100ml',
    category: 'perfume',
    price: 16500,
    originalPrice: 20000,
    discount: '17% OFF',
    notes: 'Citrus, Cardamom, Lavender, Cedarwood, Amber, Patchouli',
    description: 'A versatile, crisp aromatic-woody fragrance suited for corporate daily wear.',
    image: 'luxury perfume/a62377721a2e4ce74ecf8478934e62bc.jpg',
    variants: [
      { name: '100ml EDP', price: 16500 }
    ],
    reviews: [
      { name: 'Tosin', rating: 4, body: 'Very fresh and professional scent. Unbeatable price.' }
    ]
  },
  {
    id: 'maahir-black-lattafa',
    brand: 'LATTAFA',
    name: 'Maahir Black Edition EDP 100ml',
    category: 'perfume',
    price: 22000,
    originalPrice: 26000,
    discount: '15% OFF',
    notes: 'Black Pepper, Bergamot, Rosemary, Pine Tree Resin, Leather, Smoke, Oud',
    description: 'A dark, smoky, and resinous oriental perfume designed to make a commanding statement.',
    image: 'luxury perfume/bdeffae5f1855d52ae6ca1bcf5105a32.jpg',
    variants: [
      { name: '100ml EDP', price: 22000 }
    ],
    reviews: [
      { name: 'Ahmed', rating: 5, body: 'Dark, smoky, and bold. Perfect for cold evenings or night events.' }
    ]
  },
  {
    id: 'ramz-silver',
    brand: 'LATTAFA',
    name: 'Ramz Lattafa Silver EDP 100ml',
    category: 'perfume',
    price: 18000,
    originalPrice: 22000,
    discount: '18% OFF',
    notes: 'Lavender, Mint, Bergamot, Pear, Sage, Cardamom, Vanilla, Amber',
    description: 'A smooth fruity-vanilla masculine scent made for high energy and night outings.',
    image: 'luxury perfume/73455ef39b8dfc304eeac6b7debf71da.jpg',
    variants: [
      { name: '100ml EDP', price: 18000 }
    ],
    reviews: [
      { name: 'Victor', rating: 5, body: 'Very sweet minty vanilla scent. Gets great compliments.' }
    ]
  },
  {
    id: 'ameer-al-oudh-intense',
    brand: 'LATTAFA',
    name: 'Ameer Al Oudh Intense Oud EDP 100ml',
    category: 'perfume',
    price: 21000,
    originalPrice: 25000,
    discount: '16% OFF',
    notes: 'Woody Notes, Oud, Sugar, Vanilla, Labdanum, Herbal Accords',
    description: 'A cozy, sweet sugary oud fragrance with deep warm woodsy character.',
    image: 'luxury perfume/84f0e290f04e542b1e6718270e6cced4.jpg',
    variants: [
      { name: '100ml EDP', price: 21000 }
    ],
    reviews: [
      { name: 'Fatima', rating: 5, body: 'Smells like campfire marshmallows and sweet oud. So warm and comforting.' }
    ]
  },
  {
    id: 'suqraat-lattafa',
    brand: 'LATTAFA',
    name: 'Suqraat EDP 100ml',
    category: 'perfume',
    price: 17500,
    originalPrice: 21000,
    discount: '16% OFF',
    notes: 'Bergamot, Ginger, Lavender, Cardamom, Sandalwood, Amber',
    description: 'An elegant aquatic-spicy fragrance designed for smooth everyday freshness.',
    image: '',
    variants: [
      { name: '100ml EDP', price: 17500 }
    ],
    reviews: [
      { name: 'Kelechi', rating: 4, body: 'Very clean and fresh opening. Great alternative to Acqua Di Gio Profumo.' }
    ]
  },
  {
    id: 'nebras-lattafa-pride',
    brand: 'LATTAFA',
    name: 'Nebras Lattafa Pride EDP 100ml',
    category: 'perfume',
    price: 32000,
    originalPrice: 38000,
    discount: '15% OFF',
    notes: 'Red Berries, Mandarin, Vanilla, Cacao, Rose, Tonka Bean, Amber, Sugar',
    description: 'A rich gourmand berry and chocolate-vanilla fragrance that wraps the wearer in warmth.',
    image: 'luxury perfume/df85b85cd3f2f913d282ea49b40b7438.jpg',
    variants: [
      { name: '100ml EDP', price: 32000 }
    ],
    reviews: [
      { name: 'Mercy', rating: 5, body: 'Smells like chocolate-dipped berries and cream. Exceptional quality!' }
    ]
  },
  {
    id: 'sol-de-janeiro-cheirosa-68',
    brand: 'SOL DE JANEIRO',
    name: 'Cheirosa 68 Beija Flor Perfume Mist 240ml',
    category: 'Body Mist',
    price: 38000,
    originalPrice: 42000,
    discount: '9% OFF',
    notes: 'Pink Dragonfruit, Lychee Essence, Brazilian Jasmine, Ocean Air, Sheer Vanilla',
    description: 'A vibrant, tropical floral-fruity body mist with a clean airy trail.',
    image: 'luxury perfume/a9c764e88527c5f1df9d917df949fab7.jpg',
    variants: [
      { name: '90ml Travel Spray', price: 22000 },
      { name: '240ml Full Size', price: 38000 }
    ],
    reviews: [
      { name: 'Jessica', rating: 5, body: 'Smells like sweet tropical flowers! Super uplifting and fresh.' }
    ]
  },
  {
    id: 'sol-de-janeiro-cheirosa-62',
    brand: 'SOL DE JANEIRO',
    name: 'Cheirosa 62 Brazilian Crush Perfume Mist 240ml',
    category: 'Body Mist',
    price: 38000,
    originalPrice: 42000,
    discount: '9% OFF',
    notes: 'Pistachio, Almond, Heliotrope, Jasmine Petals, Salted Caramel, Vanilla, Sandalwood',
    description: 'An iconic warm gourmand mist that captures the essence of summer beaches and warm salted caramel.',
    image: 'luxury perfume/a3817ac2faf790948326c77bca6de7db.jpg',
    variants: [
      { name: '90ml Travel Spray', price: 22000 },
      { name: '240ml Full Size', price: 38000 }
    ],
    reviews: [
      { name: 'Blessing', rating: 5, body: 'The pistachio salted caramel note is so addictive. Everyone asks what I am wearing!' }
    ]
  },
  {
    id: 'bath-and-body-works-thousand-wishes',
    brand: 'BATH & BODY WORKS',
    name: 'A Thousand Wishes Fine Fragrance Mist 236ml',
    category: 'Body Mist',
    price: 19500,
    originalPrice: 23000,
    discount: '15% OFF',
    notes: 'Pink Prosecco, Sparkling Quince, Crystal Peonies, Gilded Amber, Amaretto Crème',
    description: 'A festive, warm blend of sparkling prosecco and sweet peonies wrapped in gilded amber.',
    image: 'luxury perfume/0705a782fb53692d7d999fa017b08845.jpg',
    variants: [
      { name: '236ml Mist', price: 19500 }
    ],
    reviews: [
      { name: 'Anita', rating: 5, body: 'Sweet, bubbly, and very charming. Great for daily wear after bathing.' }
    ]
  },
  {
    id: 'victorias-secret-bare-vanilla',
    brand: 'VICTORIA\'S SECRET',
    name: 'Victoria\'s Secret Bare Vanilla Body Mist 250ml',
    category: 'Body Mist',
    price: 18500,
    originalPrice: 22000,
    discount: '15% OFF',
    notes: 'Whipped Vanilla, Soft Cashmere, Warm Skin Accord',
    description: 'A soothing bare vanilla skin mist infused with soft cashmere nuances.',
    image: 'luxury perfume/d7c7c424e7e8ab9bd2027c92a7ec4cb5.jpg',
    variants: [
      { name: '250ml Mist', price: 18500 },
      { name: '250ml Shimmer Mist', price: 20000 }
    ],
    reviews: [
      { name: 'Joy', rating: 5, body: 'Softest vanilla mist ever made. Layering it with my perfumes makes them last longer.' }
    ]
  },
  {
    id: 'old-spice-captain-spray',
    brand: 'OLD SPICE',
    name: 'Old Spice Captain Deodorant Body Spray 150ml',
    category: 'Body Spray',
    price: 7200,
    originalPrice: 8500,
    discount: '15% OFF',
    notes: 'Bergamot, Crisp Ocean Breeze, Sandalwood',
    description: 'A clean, fresh nautical body spray that provides reliable odor defense all day.',
    image: '',
    variants: [
      { name: '150ml Spray', price: 7200 }
    ],
    reviews: [
      { name: 'Daniel', rating: 4, body: 'Clean ocean scent. Does the job well after gym sessions.' }
    ]
  },
  {
    id: 'nivea-deep-impact-spray',
    brand: 'NIVEA',
    name: 'Nivea Men Deep Impact Body Spray 150ml',
    category: 'Body Spray',
    price: 7000,
    originalPrice: 8200,
    discount: '14% OFF',
    notes: 'Black Carbon, Woody Accords, Citrus Spice',
    description: 'Formulated with black carbon for long-lasting fresh skin feel and intense woodsy aroma.',
    image: 'luxury perfume/e7a8d5d550206ceac6c9fc0f05322d23.jpg',
    variants: [
      { name: '150ml Spray', price: 7000 }
    ],
    reviews: [
      { name: 'Emanuel', rating: 5, body: 'Doesn’t stain clothes and smells very fresh.' }
    ]
  },
  {
    id: 'tag-him-armaf',
    brand: 'ARMAF',
    name: 'Tag Him Pour Homme EDP 100ml',
    category: 'perfume',
    price: 28000,
    originalPrice: 34000,
    discount: '17% OFF',
    notes: 'Grapefruit, Lemon, Pink Pepper, Ginger, Mint, Nutmeg, Vetiver, Cedar, Patchouli',
    description: 'An energetic citrus-woody scent designed for modern urban professionals.',
    image: 'luxury perfume/93f5b52f28a49902c1b5c5e0b8941a7e.jpg',
    variants: [
      { name: '100ml EDP', price: 28000 }
    ],
    reviews: [
      { name: 'Usman', rating: 4, body: 'Very fresh grapefruit opening. Great budget Bleu De Chanel alternative.' }
    ]
  },
  {
    id: 'voyage-nautica',
    brand: 'NAUTICA',
    name: 'Nautica Voyage EDT 100ml',
    category: 'perfume',
    price: 22000,
    originalPrice: 26000,
    discount: '15% OFF',
    notes: 'Green Leaves, Apple, Lotus, Mimosa, Musk, Cedar, Oakmoss, Amber',
    description: 'A fresh, crisp aquatic fragrance anchor with green apple and light water floral tones.',
    image: 'luxury perfume/0493436dd179f9931ffd9e7a36fdd02f.jpg',
    variants: [
      { name: '100ml EDT', price: 22000 },
      { name: '200ml EDT', price: 34000 }
    ],
    reviews: [
      { name: 'Samuel', rating: 5, body: 'The absolute king of cheap fresh summer scents!' }
    ]

  },
  {
    id: 'maison-alhambra-amberley-pur-oud',
    brand: 'MAISON ALHAMBRA',
    name: 'Maison Alhambra Amberley Pur Oud EDP 100ml',
    category: 'perfume',
    price: 28000,
    originalPrice: 33000,
    discount: '15% OFF',
    notes: 'Agarwood (Oud), Sandalwood, Saffron, Leather, Amber, Incense, Musk',
    description: 'A rich, woody-amber fragrance capturing deep incense, saffron, and velvety oud notes.',
    image: 'luxury perfume/9c35161f586aa5d24632e0f2a414f09e.jpg',
    variants: [
      { name: '100ml EDP', price: 28000 }
    ],
    reviews: [
      { name: 'Babatunde', rating: 5, body: 'Luxurious oud scent with amazing projection. Smells way more expensive than it costs.' }
    ]
  },
  {
    id: 'maison-alhambra-amberley-ombre-blue',
    brand: 'MAISON ALHAMBRA',
    name: 'Maison Alhambra Amberley Ombre Blue EDP 100ml',
    category: 'perfume',
    price: 28000,
    originalPrice: 33000,
    discount: '15% OFF',
    notes: 'Pink Pepper, Black Pepper, Fig, Patchouli, Turkish Rose, Cedar, Leather, Musk',
    description: 'A sophisticated spicy-woody scent layered with dark fig, patchouli, and supple leather accords.',
    image: 'luxury perfume/9c12784dfa422e536a817ab2235143d4.jpg',
    variants: [
      { name: '100ml EDP', price: 28000 }
    ],
    reviews: [
      { name: 'Damilola', rating: 5, body: 'Very unique fig and leather blend. Stays on clothes all day.' }
    ]
  },
  {
    id: 'maison-alhambra-florenza',
    brand: 'MAISON ALHAMBRA',
    name: 'Maison Alhambra Florenza EDP 100ml',
    category: 'perfume',
    price: 25000,
    originalPrice: 29500,
    discount: '15% OFF',
    notes: 'Mandarin, Peony, Peach, Osmanthus, Rose, Sandalwood, Patchouli, Pink Pepper',
    description: 'An elegant floral-fruity EDP featuring fresh citrus, soft peony petals, and warm sandalwood.',
    image: '',
    variants: [
      { name: '100ml EDP', price: 25000 }
    ],
    reviews: [
      { name: 'Nkechi', rating: 5, body: 'Beautiful, soft floral scent for daily office wear.' }
    ]
  },
  {
    id: 'dubai-chocolate-perfume-oil',
    brand: 'ARABIAN LUXURY',
    name: 'Dubai Chocolate Gourmet Perfume EDP 100ml',
    category: 'perfume',
    price: 32000,
    originalPrice: 38000,
    discount: '16% OFF',
    notes: 'Roasted Pistachio, Creamy Milk Chocolate, Crisp Kataifi Pastry, Warm Caramel, Vanilla, White Musk',
    description: 'An ultra-gourmand scent replicating the famous viral Dubai chocolate bar with rich pistachio, pastry, and chocolate notes.',
    image: 'luxury perfume/6a09d9dc0483be13e5bef36cf763948d.jpg',
    variants: [
      { name: '100ml EDP', price: 32000 },
      { name: '12ml Concentrated Oil', price: 12000 }
    ],
    reviews: [
      { name: 'Zainab', rating: 5, body: 'Smells exactly like the viral pistachio chocolate bar! Truly addictive.' },
      { name: 'Chiamaka', rating: 5, body: 'Sweet, nutty, and chocolatey. Every gourmand lover needs this.' }
    ]
  },
  {
    id: 'desaint-yummy-island',
    brand: 'DESAINT',
    name: 'Desaint Yummy Island EDP 100ml',
    category: 'Perfume',
    price: 18500,
    originalPrice: 22000,
    discount: '15% OFF',
    notes: 'Crisp Green Apple, Tropical Fruits, Bergamot, White Musk',
    description: 'A vibrant fruity-fresh fragrance with bright citrus and uplifting tropical tones.',
    image: './luxury perfume/desaint_yummy_island.jpg',
    variants: [
      { name: '100ml EDP', price: 18500 }
    ],
    reviews: [
      { name: 'Sola', rating: 5, body: 'Super fruity and refreshing for warm daily wear.' }
    ]
  },
  {
    id: 'desaint-candy-drips',
    brand: 'DESAINT',
    name: 'Desaint Candy Drips EDP 100ml',
    category: 'Perfume',
    price: 18500,
    originalPrice: 22000,
    discount: '15% OFF',
    notes: 'Sweet Berries, Cotton Candy, Marshmallow, Soft Vanilla',
    description: 'A sweet gourmand fragrance packed with sugary candy accords and fluffy vanilla.',
    image: './luxury perfume/desaint_candy_drips.jpg',
    variants: [
      { name: '100ml EDP', price: 18500 }
    ],
    reviews: [
      { name: 'Chiamaka', rating: 5, body: 'Smells like a sweet candy shop! Loved by gourmand scent fans.' }
    ]
  },
  {
    id: 'desaint-cloudy-candy',
    brand: 'DESAINT',
    name: 'Desaint Cloudy Candy EDP 100ml',
    category: 'Perfume',
    price: 18500,
    originalPrice: 22000,
    discount: '15% OFF',
    notes: 'Whipped Cream, Coconut Water, Sweet Vanilla, Light Musk',
    description: 'An airy, dreamy gourmand scent layered with whipped cream and cozy vanilla clouds.',
    image: './luxury perfume/desaint_cloudy_candy.jpg',
    variants: [
      { name: '100ml EDP', price: 18500 }
    ],
    reviews: [
      { name: 'Titi', rating: 5, body: 'So soft and comforting, perfect daily sweet perfume.' }
    ]
  },
  {
    id: 'rave-now-women-black',
    brand: 'RAVE',
    name: 'Rave Now Women EDP 100ml (Black Box)',
    category: 'Perfume',
    price: 22000,
    originalPrice: 26000,
    discount: '15% OFF',
    notes: 'Red Berries, Warm Amber, Vanilla, Cedarwood, Musk',
    description: 'A sultry, dark fruity-amber fragrance made for bold evening presence.',
    image: './luxury perfume/rave_now_women_black.jpg',
    variants: [
      { name: '100ml EDP', price: 22000 }
    ],
    reviews: [
      { name: 'Funke', rating: 5, body: 'Rich berry and amber scent. Lasts remarkably well.' }
    ]
  },
  {
    id: 'rave-now-women-pink',
    brand: 'RAVE',
    name: 'Rave Now Women EDP 100ml (Pink Box)',
    category: 'Perfume',
    price: 22000,
    originalPrice: 26000,
    discount: '15% OFF',
    notes: 'Marshmallow, Strawberry, Floral Accords, Vanilla, Musk',
    description: 'A fluffy pink gourmand fragrance bursting with sweet strawberry and creamy marshmallow.',
    image: './luxury perfume/rave_now_women_pink.jpg',
    variants: [
      { name: '100ml EDP', price: 22000 }
    ],
    reviews: [
      { name: 'Anita', rating: 5, body: 'Smells like sweet strawberry marshmallow cream. Excellent projection.' }
    ]
  },
  {
    id: 'smart-collection-now-833',
    brand: 'SMART COLLECTION',
    name: 'Smart Collection No. 833 Now EDP 100ml',
    category: 'Perfume',
    price: 12000,
    originalPrice: 15000,
    discount: '20% OFF',
    notes: 'Sweet Fruits, Jasmine, Warm Vanilla, Amber',
    description: 'A pocket-friendly interpretation of the popular Now fragrance line with high concentration.',
    image: './luxury perfume/smart_collection_now_833.jpg',
    variants: [
      { name: '100ml EDP', price: 12000 }
    ],
    reviews: [
      { name: 'Joy', rating: 4, body: 'Very nice everyday option for a budget price.' }
    ]
  },
  {
    id: 'vintage-radio-lamanda-60ml',
    brand: 'HN PERFUMES',
    name: 'HN Vintage Radio Lamanda EDP 60ml',
    category: 'Perfume',
    price: 16000,
    originalPrice: 19000,
    discount: '15% OFF',
    notes: 'Lavender, Soft Spices, Cedarwood, Crisp Musk',
    description: 'A classic blue aromatic-woody fragrance inspired by timeless vintage elegance.',
    image: './luxury perfume/vintage_radio_lamanda.jpg',
    variants: [
      { name: '60ml EDP', price: 16000 }
    ],
    reviews: [
      { name: 'Kelvin', rating: 5, body: 'Unique bottle design and solid daily aromatic scent.' }
    ]
  },
  {
    id: 'vintage-radio-classic-60ml',
    brand: 'HN PERFUMES',
    name: 'HN Vintage Radio Classic EDP 60ml',
    category: 'Perfume',
    price: 16000,
    originalPrice: 19000,
    discount: '15% OFF',
    notes: 'Palo Santo, Plum, Lavender, Amber, Woodsy Notes',
    description: 'A smooth woodsy-amber EDP featuring rich plum and cozy palo santo notes.',
    image: './luxury perfume/vintage_radio_classic.jpg',
    variants: [
      { name: '60ml EDP', price: 16000 }
    ],
    reviews: [
      { name: 'Emanuel', rating: 5, body: 'Plum and warm woods scent, very attractive packaging.' }
    ]
  },
  {
    id: 'vintage-radio-summer-60ml',
    brand: 'HN PERFUMES',
    name: 'HN Vintage Radio Summer EDP 60ml',
    category: 'Perfume',
    price: 16000,
    originalPrice: 19000,
    discount: '15% OFF',
    notes: 'Citrus Zest, Aquatic Accords, Fresh Herbs, Vetiver',
    description: 'A crisp, breezy summer edition crafted for clean daytime wear.',
    image: 'luxury perfume/0227f648abccec8e3e6bd4a27e9965d8.jpg',
    variants: [
      { name: '60ml EDP', price: 16000 }
    ],
    reviews: [
      { name: 'David', rating: 4, body: 'Very fresh aquatic scent for hot days.' }
    ]
  },
  {
    id: 'eclaire-lattafa',
    brand: 'LATTAFA',
    name: 'Lattafa Eclaire EDP 50ml',
    category: 'Perfume',
    price: 25000,
    originalPrice: 30000,
    discount: '16% OFF',
    notes: 'Caramel, Milk, Sugar, Honey, White Flowers, Vanilla, Praline',
    description: 'An irresistible gourmand dessert perfume overflowing with warm caramel, sweet milk, and vanilla.',
    image: 'luxury perfume/83f51c89553e9230a3b29d21bbef6cef.jpg',
    variants: [
      { name: '50ml EDP', price: 25000 }
    ],
    reviews: [
      { name: 'Blessing', rating: 5, body: 'Smells like buttery caramel desserts! Outstanding performance.' }
    ]
  },
  {
    id: 'ophylia-fragrance-world',
    brand: 'FRAGRANCE WORLD',
    name: 'Fragrance World Ophylia EDP 80ml',
    category: 'Perfume',
    price: 18000,
    originalPrice: 21500,
    discount: '16% OFF',
    notes: 'Water Jasmine, Green Mandarin, Salted Vanilla, Ginger Lily, Cashmere Wood, Ambergris',
    description: 'A feminine salted-vanilla floral scent with warm amber nuances.',
    image: 'luxury perfume/5a2ba91365f5c106b2cac9c1565fb512.jpg',
    variants: [
      { name: '80ml EDP', price: 18000 }
    ],
    reviews: [
      { name: 'Miracle', rating: 5, body: 'Beautiful alternative to Paco Rabanne Olympea! Long-lasting.' }
    ]
  },
  {
    
    id: 'kayali-eau-de-parfum-100ml',
    brand: 'KAYALI',
    name: 'KAYALI Eau de Parfum 100ml',
    category: 'Eau de Parfum',
    price: 18000,
    originalPrice: 24000,
    discount: '25% OFF',
    notes: 'Vanilla Orchid, Brown Sugar, Candied Pear, Marshmallow, Rich Amber, Black Cherry, Tonka Bean',
    description: 'A collection of rich, luxurious Eau de Parfums crafted for layering. From deep, warm vanilla to sweet candied gourmands and rich golden ambers, these fragrances deliver an unforgettable scent trail.',
    image: 'luxury perfume/114185a965b559682d3c473f98abb026.jpg',
    variants: [
      { name: 'Vanilla | 28 (100ml)', price: 18000 },
      { name: 'Vanilla Candy Rock Sugar | 42 (100ml)', price: 18000 },
      { name: 'Invite Only Amber | 23 (100ml)', price: 18000 }
    ],
    reviews: 
      { name: 'Anita', rating: 5, body: 'Vanilla 28 and Vanilla Candy Rock Sugar are absolute perfection for sweet, warm perfume lovers!' }
  },
  {
    id: 'french-avenue-liquid-brun',
    brand: 'FRENCH AVENUE',
    name: 'French Avenue Liquid Brun EDP 100ml',
    category: 'Perfume',
    price: 45000,
    originalPrice: 52000,
    discount: '13% OFF',
    notes: 'Cinnamon, Cardamom, Orange Blossom, Bourbon Vanilla, Elemi, Praline, Guaiac Wood',
    description: 'A rich, warm spicy gourmand fragrance with smooth cinnamon, bourbon vanilla, and dark praline.',
    image: 'luxury perfume/9af48c41830f0895f41093f2370414af.jpg',
    variants: [
      { name: '100ml EDP', price: 45000 },
      { name: '100ml Limited Edition EDP', price: 48000 }
    ],
    reviews: [
      { name: 'Chidi', rating: 5, body: 'Beast mode performer! Smells identical to Althair by Parfums de Marly.' }
    ]
  },
  {
    id: 'suger-perfumed-body-spray',
    brand: 'SUGER',
    name: 'Suger Perfumed Deodorant Body Spray 200ml',
    category: 'Body Spray',
    price: 6500,
    originalPrice: 8000,
    discount: '18% OFF',
    notes: 'Crisp Citrus, Clean Musk, Fresh Green Accords',
    description: 'A long-lasting perfumed deodorant spray formulated to keep you smelling fresh all day.',
    image: './luxury perfume/suger_spray.jpg',
    variants: [
      { name: '200ml Body Spray', price: 6500 }
    ],
    reviews: [
      { name: 'Ibrahim', rating: 4, body: 'Fresh scent and good daily spray for the gym.' }
    ]
  },
  {
    id: 'gk-men-eau-de-parfum-50ml',
    brand: 'GENIAL COLLECTION',
    name: 'GK Men Eau de Parfum 50ml',
    category: 'Eau de Parfum',
    price: 6000,
    originalPrice: 8000,
    discount: '25% OFF',
    notes: 'Fresh Citrus, Warm Spice, Woody Cedar, Rich Amber, Cool Aquatic, Soft Musk',
    description: 'A sophisticated and masculine Eau de Parfum collection by Genial Collection, offering long-lasting fragrance profiles designed for daily wear, office settings, and evening outings.',
    image: 'luxury perfume/1788868921186.jpg',
    variants: [
      { name: 'GK Men Blue 50ml', price: 6000 },
      { name: 'GK Men Black 50ml', price: 6000 },
      { name: 'GK Men Amber / Brown 50ml', price: 6000 },
      { name: 'GK Men White / Silver 50ml', price: 6000 }
    ],
    reviews: 
      { name: 'Michael', rating: 5, body: 'Compact 50ml bottles with great projection. The Black and Blue variants are very masculine and stylish.' }
  },
  {
   id: 'aro-fac-eau-de-parfum-100ml',
    brand: 'ARO-FAC',
    name: 'ARO-FAC Aroma Factory Eau de Parfum 100ml',
    category: 'Eau de Parfum',
    price: 15000,
    originalPrice: 20000,
    discount: '25% OFF',
    notes: 'Rich Oud, Fresh Citrus, Warm Amber, Exotic Woods, Soft Musks, Sweet Gourmand',
    description: 'An artisanal niche-style Eau de Parfum collection carefully compounded in small batches, offering refined, long-lasting fragrances presented in minimalist custom glass bottles.',
    image: 'luxury perfume/6a6f9764e3113ad0976d9f94bb6f5d61.jpg',
    variants: [
      { name: 'Oud-66 100ml', price: 15000 },
      { name: 'Vibes 100ml', price: 15000 },
      { name: 'Love-Kill 100ml', price: 15000 },
      { name: 'Suger 100ml', price: 15000 },
      { name: 'De Blue 100ml', price: 15000 }
    ],
    reviews: 
      { name: 'Victor', rating: 5, body: 'Super high quality aesthetic and smell! Oud-66 and De Blue smell like luxury niche designer perfumes.' }
  },
  {
    id: 'scandal-edp-100ml',
    brand: 'GENERIC',
    name: 'Scandal EDP 100ml',
    category: 'Perfume',
    price: 25000,
    originalPrice: 30000,
    discount: '17% OFF',
    notes: 'Honey, Gardenia, Blood Orange, Patchouli',
    description: 'A bold, seductive floral-gourmand fragrance featuring rich honey and warm patchouli notes.',
    image: 'luxury perfume/106c1947ca72b597584b4b2c11508ab9.jpg',
    variants: [
      { name: '100ml EDP', price: 25000, image: './luxury perfume/scandal.jpg' }
    ],
    reviews: [
      { name: 'Nkechi', rating: 5, body: 'Intense and unforgettable sweet scent profile.' }
    ]
  },
  {
    id: 'vulcan-edp-100ml',
    brand: 'GENERIC',
    name: 'Vulcan EDP 100ml',
    category: 'Perfume',
    price: 22000,
    originalPrice: 26000,
    discount: '15% OFF',
    notes: 'Spiced Amber, Smoked Cedar, Black Pepper, Leather',
    description: 'A powerful, fiery masculine fragrance packed with intense spices and woody amber.',
    image: '',
    variants: [
      { name: '100ml EDP', price: 22000, image: './luxury perfume/vulcan.jpg' }
    ],
    reviews: [
      { name: 'Ahmed', rating: 5, body: 'Very bold and warm smoky performance.' }
    ]
  },
  {
    id: 'vanilla-fragrance-mist-250ml',
    brand: 'GENERIC',
    name: 'Vanilla Perfumed Body Mist 250ml',
    category: 'Body Mist',
    price: 6500,
    originalPrice: 8500,
    discount: '23% OFF',
    notes: 'Warm Vanilla Bean, Whipped Cream, Soft Amber, Brown Sugar',
    description: 'A cozy, sweet vanilla body mist providing light and refreshing daily coverage.',
    image: './luxury perfume/vanilla_mist.jpg',
    variants: [
      { name: '250ml Mist', price: 6500, image: './luxury perfume/vanilla_mist.jpg' }
    ],
    reviews: [
      { name: 'Joy', rating: 5, body: 'Delicious sweet vanilla scent for daily layering.' }
    ]
  },
  {
    
  
    id: 'lasgidi-crush-body-mist-100ml',
    brand: 'LASGIDI',
    name: 'Lasgidi Crush Collection Body Mist 100ml',
    category: 'Body Mist',
    price: 3500,
    originalPrice: 5000,
    discount: '30% OFF',
    notes: 'Sweet Berries, Warm Vanilla, Cotton Candy, Fluffy Marshmallow, Sweet Cream, Tropical Fruits',
    description: 'A fun, irresistible pocket-sized body mist collection featuring delicious gourmand and fruity scents for light, refreshing touch-ups on the go.',
    image: 'luxury perfume/ef9a6414a544976364df6dc8c55e616b.jpg',
    variants: [
      { name: 'Juicy Crush 100ml', price: 3500 },
      { name: 'Vanilla Crush 100ml', price: 3500 },
      { name: 'Candy Crush 100ml', price: 3500 },
      { name: 'Pinky Crush 100ml', price: 3500 },
      { name: 'Gelato Crush 100ml', price: 3500 }
    ],
    reviews: [
      { name: 'Faith', rating: 5, body: 'Super cute 100ml bottles! Gelato Crush and Vanilla Crush smell so sweet and cozy.' }
    ]
  },
  {
    id: 'lattafa-his-confession',
    brand: 'LATTAFA',
    name: 'Lattafa His Confession EDP 100ml',
    category: 'Perfume',
    price: 32000,
    originalPrice: 38000,
    discount: '15% OFF',
    notes: 'Cinnamon, Lavender, Iris, Vanilla, Tonka Bean, Amberwood',
    description: 'An alluring masculine fragrance combining rich spices, smooth iris, and warm vanilla.',
    image: 'luxury perfume/439969b0a44b5b7a642b4198ca51210f.jpg',
    variants: [
      { name: '100ml EDP', price: 32000, image: './luxury perfume/lattafa_his_confession.jpg' }
    ],
    reviews: [
      { name: 'Tunde', rating: 5, body: 'Extremely elegant bottle and warm spicy profile!' }
    ]
  },
  {
    id: 'lattafa-her-confession',
    brand: 'LATTAFA',
    name: 'Lattafa Her Confession EDP 100ml',
    category: 'Perfume',
    price: 32000,
    originalPrice: 38000,
    discount: '15% OFF',
    notes: 'Tuberose, White Jasmine, Vanilla, Coconut Cream, Soft Musk',
    description: 'A luxurious creamy floral-vanilla EDP crafted for sophisticated feminine presence.',
    image: 'luxury perfume/b98c8330b9bbb41b6c8be464acc1f991.jpg',
    variants: [
      { name: '100ml EDP', price: 32000, image: './luxury perfume/lattafa_her_confession.jpg' }
    ],
    reviews: [
      { name: 'Anita', rating: 5, body: 'Gorgeous presentation and rich tuberose vanilla scent.' }
    ]
  },
  {
    id: 'lattafa-maahir-gold',
    brand: 'LATTAFA',
    name: 'Lattafa Maahir Gold EDP 100ml',
    category: 'Perfume',
    price: 28000,
    originalPrice: 33000,
    discount: '15% OFF',
    notes: 'Peach, Bergamot, Red Lily, Jasmine, Vanilla, Oud, Sandalwood',
    description: 'A rich oriental-fruity EDP layered with velvety florals, amber, and smooth wood notes.',
    image: 'luxury perfume/56fe00367996f57737a14f2d1fde39bf (2).jpg',
    variants: [
      { name: '100ml EDP', price: 28000, image: './luxury perfume/lattafa_maahir_gold.jpg' }
    ],
    reviews: [
      { name: 'Fatima', rating: 5, body: 'Stunning bottle design and long-lasting oriental scent.' }
    ]
  },
  {
    id: 'lattafa-maahir-legacy',
    brand: 'LATTAFA',
    name: 'Lattafa Maahir Legacy Silver EDP 100ml',
    category: 'Perfume',
    price: 28000,
    originalPrice: 33000,
    discount: '15% OFF',
    notes: 'Lime, Spearmint, Lavender, Oakmoss, Vetiver, Ambroxan',
    description: 'A crisp, effervescent citrus-mint aromatic scent engineered for high-energy freshness.',
    image: 'luxury perfume/6396a49a39194c9c1d903683b33991ca.jpg',
    variants: [
      { name: '100ml EDP', price: 28000, image: './luxury perfume/lattafa_maahir_legacy.jpg' }
    ],
    reviews: [
      { name: 'Kelechi', rating: 5, body: 'Super clean minty citrus freshness. Great projection!' }
    ]
  },
  {
    id: 'lattafa-maahir-black-edition',
    brand: 'LATTAFA',
    name: 'Lattafa Maahir Black Edition EDP 100ml',
    category: 'Perfume',
    price: 28000,
    originalPrice: 33000,
    discount: '15% OFF',
    notes: 'Black Pepper, Violet Leaf, Smoky Leather, Dark Oud, Cedarwood',
    description: 'A bold, dark smoky-leather fragrance designed for strong evening statements.',
    image: 'luxury perfume/bdeffae5f1855d52ae6ca1bcf5105a32.jpg',
    variants: [
      { name: '100ml EDP', price: 28000, image: './luxury perfume/lattafa_maahir_black.jpg' }
    ],
    reviews: [
      { name: 'Victor', rating: 4, body: 'Very dark, smoky, and masculine performance.' }
    ]
  },
  {
    id: 'my-dear-body-spray-collection',
    brand: 'MY DEAR BODY',
    name: 'My Dear Body Perfumed Deodorant Body Spray 250ml',
    category: 'Body Spray',
    price: 4500,
    originalPrice: 6000,
    discount: '25% OFF',
    notes: 'Fruity & Floral Accords, Fresh Vanilla, Citrus Zest',
    description: 'A refreshing daily body spray available in various vibrant fruit and floral scents.',
    image: 'luxury perfume/6ac3cbf7f55b05bbe702af078f140c78.jpg',
    variants: [
      { name: 'Cucumber 250ml', price: 4500, image: './luxury perfume/my_dear_cucumber.jpg' },
      { name: 'Coconut 250ml', price: 4500, image: './luxury perfume/my_dear_coconut.jpg' },
      { name: 'Peach 250ml', price: 4500, image: './luxury perfume/my_dear_peach.jpg' },
      { name: 'Grenade 250ml', price: 4500, image: './luxury perfume/my_dear_grenade.jpg' },
      { name: 'Watermelon 250ml', price: 4500, image: './luxury perfume/my_dear_watermelon.jpg' },
      { name: 'Vanilla 250ml', price: 4500, image: './luxury perfume/my_dear_vanilla.jpg' },
      { name: 'Lychee 250ml', price: 4500, image: './luxury perfume/my_dear_lychee.jpg' },
      { name: 'Apple 250ml', price: 4500, image: './luxury perfume/my_dear_apple.jpg' },
      { name: 'Ocean 250ml', price: 4500, image: './luxury perfume/my_dear_ocean.jpg' },
      { name: 'Citrus 250ml', price: 4500, image: './luxury perfume/my_dear_citrus.jpg' },
      { name: 'Leather 250ml', price: 4500, image: './luxury perfume/my_dear_leather.jpg' }
    ],
    reviews: [
      { name: 'Sola', rating: 4, body: 'Great daily body spray collection with lots of options!' }
    ]
  },
  {
    id: 'lady-storm-body-spray-collection',
    brand: 'STORM',
    name: 'Lady Storm Perfumed Deodorant Body Spray 200ml',
    category: 'Body Spray',
    price: 5000,
    originalPrice: 6500,
    discount: '23% OFF',
    notes: 'Spring Blossom, Fresh Breeze, Gentle Floral, Sweet Berry Accords',
    description: 'An all-day perfumed deodorant collection for women in vibrant floral prints.',
    image: 'luxury perfume/77d8656bf0e90e1c6f6d4fa9b9144c3d.jpg',
    variants: [
      { name: 'Spring 200ml', price: 5000,  },
      { name: 'Ambition 200ml', price: 5000, },
      { name: 'Gentle 200ml', price: 5000,  },
      { name: 'Breeze 200ml', price: 5000,  },
      { name: 'Love 200ml', price: 5000,  },
      { name: 'Pretty 200ml', price: 5000,  },
      { name: 'Jungle 200ml', price: 5000,  },
      { name: 'Casual 200ml', price: 5000,  },
      { name: 'Powerful 200ml', price: 5000, }
    ],
    reviews: [
      { name: 'Miracle', rating: 5, body: 'Nice variety of fresh scents for everyday wear.' }
    ]
  },
  {
    id: 'storm-men-body-spray-collection',
    brand: 'STORM',
    name: 'Storm For Men Perfumed Deodorant Body Spray 200ml',
    category: 'Body Spray',
    price: 5000,
    originalPrice: 6500,
    discount: '23% OFF',
    notes: 'Aromatic Spices, Ocean Breeze, Fresh Citrus, Woody Accords',
    description: 'An intense, masculine perfumed deodorant body spray crafted for active daily protection.',
    image: 'luxury perfume/72125b0aec83509dc89d9f0ae34299b8.jpg',
    variants: [
      { name: 'King Kong 200ml', price: 5000, },
      { name: 'Bull Power 200ml', price: 5000,  },
      { name: 'Cool Jaguar 200ml', price: 5000,  },
      { name: 'White Horse 200ml', price: 5000,  },
      { name: 'Dragon Fire 200ml', price: 5000, },
      { name: 'Wolf Trap 200ml', price: 5000, }
    ],
    reviews: [
      { name: 'Ibrahim', rating: 4, body: 'Strong body spray options for workouts and sports.' }
    ]
  },
  {
    id: 'karis-allday-fresh-body-spray-collection',
    brand: 'KARIS',
    name: 'Karis Premium Allday Fresh Body Deodorant 200ml',
    category: 'Body Spray',
    price: 4000,
    originalPrice: 5500,
    discount: '27% OFF',
    notes: 'Clean Ocean Accord, Warm Amber, Fresh Citrus, Spicy Woods',
    description: '48-hour active body spray line delivering total confidence and fresh protection',
    image:  'luxury perfume/4fbea257a020537953dc0570c5e55d5e.jpg',
    variants: [
      { name: 'Spark 200ml', price: 4000, },
      { name: 'Oasis 200ml', price: 4000,  },
      { name: 'Rejoice 200ml', price: 4000, },
      { name: 'Passion 200ml', price: 4000,  },
      { name: 'Splash 200ml', price: 4000,  },
      { name: 'Amaze 200ml', price: 4000,  },
      { name: 'Charge 200ml', price: 4000, }
    ],
    reviews: [
      { name: 'Usman', rating: 4, body: 'Solid 48h active deodorant spray.' }
    ]
  },
  {
    id: 'boos-perfume-collection-50ml',
    brand: 'BOOS',
    name: 'Boos EDP For Men 50ml',
    category: 'Perfume',
    price: 9500,
    originalPrice: 12000,
    discount: '20% OFF',
    notes: 'Crisp Citrus, Lavender, Sandalwood, Clean Amber',
    description: 'Compact 50ml EDP fragrances formulated for versatile daily wear.',
    image: './luxury perfume/boos_perfume_collection.jpg',
    variants: [
      { name: 'Black Boos 50ml EDP', price: 9500, image: './luxury perfume/boos_black.jpg' },
      {},
      { name: 'Pure Boos 50ml EDP', price: 9500, },
      { name: 'Blue Boos 50ml EDP', price: 9500,  }
    ],
    reviews: [
      { name: 'Segun', rating: 4, body: 'Compact bottles with strong everyday fresh scents.' }
    ]
  },
  {
    id: 'dove-antiperspirant-spray-250ml',
    brand: 'DOVE',
    name: 'Dove Anti-Perspirant Deodorant Spray 250ml',
    category: 'Body Spray',
    price: 6000,
    originalPrice: 7500,
    discount: '20% OFF',
    notes: 'Crisp Apple & White Tea, Pomegranate & Lemon Verbena, Coconut & Jasmine, Cucumber & Green Tea, Classic Clean',
    description: 'Enriched with 1/4 moisturizing cream, this gentle 0% alcohol anti-perspirant offers 48-hour sweat and odor protection while keeping underarms soft and smooth.',
    image:'luxury perfume/9a1090904403e0852116ffb354d311c9.jpg',
    variants: [
      { name: 'Go Fresh Apple & White Tea 250ml', price: 6000 },
      { name: 'Original 250ml', price: 6000 },
      { name: 'Go Fresh Pomegranate & Lemon Verbena 250ml', price: 6000 },
      { name: 'Nourishing Secrets Restoring Ritual (Coconut & Jasmine) 250ml', price: 6000 },
      { name: 'Go Fresh Cucumber & Green Tea 250ml', price: 6000 }
    ],
    reviews: [
      { name: 'Blessing', rating: 5, body: 'Super gentle on skin and keeps me feeling clean all day. Cucumber & Green Tea is my absolute favorite!' }
    ]
  },
  {
    id: 'monogotas-deodorant-spray-200ml',
    brand: 'MONOGOTAS',
    name: 'Monogotas Perfumed Deodorant Body Spray 200ml',
    category: 'Body Spray',
    price: 4500,
    originalPrice: 6000,
    discount: '25% OFF',
    notes: 'Sweet Strawberry, Creamy Coconut, Wild Blackberry, Fresh Cucumber, Candy Crush, Soft Vanilla, Pomegranate, Kiss Fresa',
    description: 'A fun and vibrant line of single-note fruit and gourmand perfumed deodorant sprays, perfect for lightweight, delicious daily freshness.',
    image: 'luxury perfume/a3930ab2b20545ed48f87a88ace3f386.jpg',
    variants: [
      { name: 'Fresa (Strawberry) 200ml', price: 4500 },
      { name: 'Coco (Coconut) 200ml', price: 4500 },
      { name: 'Mora (Blackberry) 200ml', price: 4500 },
      { name: 'Cucumber 200ml', price: 4500 },
      { name: 'Candy Crush 200ml', price: 4500 },
      { name: 'Vainilla (Vanilla) 200ml', price: 4500 },
      { name: 'Grenade (Pomegranate) 200ml', price: 4500 },
      { name: 'Kiss Fresa 200ml', price: 4500 }
    ],
    reviews: [
      { name: 'Chiamaka', rating: 5, body: 'Candy Crush and Coco smell so delicious! Great budget daily sprays.' }
    ]
  },
  {
    id: 'cosmo-men-advanced-6in1-spray',
    brand: 'COSMO',
    name: 'Cosmo Men Advanced 6in1 Anti-Perspirant Body Spray 250ml',
    category: 'Body Spray',
    price: 5000,
    originalPrice: 6500,
    discount: '23% OFF',
    notes: 'Crisp Ocean Breeze, Citrus Zest, Cool Mint, Fresh Cedar, Clean Musk',
    description: 'An advanced 6-in-1 anti-perspirant body spray delivering 48-hour powerful sweat and odor protection with a high-performance, fresh masculine scent.',
    image: 'luxury perfume/1788869540609.jpg',
    variants: [
      { name: 'Fresh Natural 250ml', price: 5000 },
      { name: 'Clean Comfort 250ml', price: 5000 },
      { name: 'Shower Fresh 250ml', price: 5000 },
      { name: 'Pure Sport 250ml', price: 5000 },
      { name: 'Invisible Dry 250ml', price: 5000 }
    ],
    reviews: [
      { name: 'Ahmed', rating: 5, body: 'Keeps me completely dry during workouts! Pure Sport and Shower Fresh smell incredibly clean.' }
    ]

  },
  {
    id: 'storm-elixir-body-spray-200ml',
    brand: 'STORM ELIXIR',
    name: 'Storm Elixir Perfumed Deodorant Body Spray 200ml',
    category: 'Body Spray',
    price: 4500,
    originalPrice: 6000,
    discount: '25% OFF',
    notes: 'Crisp Citrus, Spicy Cedarwood, Fresh Aquatic, Sweet Vanilla, Musk',
    description: 'A vibrant collection of long-lasting perfumed deodorant body sprays offering 24-hour freshness and all-day confidence across a wide spectrum of aromas.',
    image: 'luxury perfume/ec9505d6d24b6222b642c8b754c5b2dc.jpg',
    variants: [
      
      { name: 'Bronze / Copper 200ml', price: 4500 },
      { name: 'Deep Purple 200ml', price: 4500 },
      { name: 'Royal Blue 200ml', price: 4500 },
      { name: 'Amber Gold 200ml', price: 4500 },
      { name: 'Dark Burgundy 200ml', price: 4500 },
      { name: 'Metallic Silver 200ml', price: 4500 },
      { name: 'Sky Blue 200ml', price: 4500 },
      { name: 'Ice Blue 200ml', price: 4500 },
      { name: 'Matte Black 200ml', price: 4500 },
      { name: 'Pure White 200ml', price: 4500 },
      { name: 'Mint Green 200ml', price: 4500 },
      { name: 'Soft Pink 200ml', price: 4500 },
      { name: 'Charcoal Grey 200ml', price: 4500 },
      { name: 'Crimson Red 200ml', price: 4500 },
      { name: 'Warm Cream / Gold 200ml', price: 4500 },
      { name: 'Olive Green 200ml', price: 4500 },
      { name: 'Pastel Yellow 200ml', price: 4500 }
    ],
    reviews: [
      { name: 'Daniel', rating: 5, body: 'Solid variety of scents! Royal Blue and Matte Black are top tier daily drivers.' }
    ]
  },
  {
    id: 'wave-escape-body-mist',
    brand: 'ESCAPE / WAVE',
    name: 'Wave & Escape Perfumed Body Mist 250ml',
    category: 'Body Mist',
    price: 5500,
    originalPrice: 7500,
    discount: '26% OFF',
    notes: 'Plum Perfect, Citrus Zing, Crisp Green Apple, Sweet Floral',
    description: 'Refreshing and light body mists bursting with juicy fruit accords and sparkling citrus freshness.',
    image: 'luxury perfume/45ed8f2c35581177b413f1dfcfa47d10.jpg',
    variants: [
      { name: 'Wave Plum Perfect 250ml', price: 5500 },
      { name: 'Escape Citrus Zing 250ml', price: 5500 }
    ],
    reviews: [
      { name: 'Grace', rating: 5, body: 'Citrus Zing is so fresh for warm sunny days! Very airy and bright.' }
    ]
  },
  {
    id: 'cosmo-advanced-antiperspirant',
    brand: 'COSMO',
    name: 'Cosmo Advanced Anti-Perspirant Body Spray 250ml',
    category: 'Body Spray',
    price: 5000,
    originalPrice: 6500,
    discount: '23% OFF',
    notes: 'Tropical Coconut, Juicy Apple, Hydrating Cucumber, Nourishing Pomegranate, Reviving Pear, Radiant Grapefruit',
    description: 'A 48-hour anti-sweat, anti-odour, and anti-bacterial perfumed body spray packed with botanical fruit extracts.',
    image: 'luxury perfume/1788889729591.jpg',
    variants: [
      { name: 'Tropical Coconut 250ml', price: 5000 },
      { name: 'Juicy Apple 250ml', price: 5000 },
      { name: 'Hydrating Cucumber 250ml', price: 5000 },
      { name: 'Nourishing Pomegranate 250ml', price: 5000 },
      { name: 'Reviving Pear 250ml', price: 5000 },
      { name: 'Radiant Grapefruit 250ml', price: 5000 }
    ],
    reviews: [
      { name: 'Amina', rating: 5, body: 'Keeps me dry all day! Cucumber and Pear variants smell amazing.' }
    ]
  },
  {
    id: 'karis-allday-fresh-spray',
    brand: 'KARIS',
    name: 'Karis All Day Fresh Perfumed Deodorant Spray 200ml',
    category: 'Body Spray',
    price: 4000,
    originalPrice: 5500,
    discount: '27% OFF',
    notes: 'Ocean Splash, Black Amber, Exotic Passion, Fresh Spice',
    description: 'A total-confidence body spray crafted to offer 48-hour freshness with intense aromatic notes.',
    image: 'luxury perfume/4fbea257a020537953dc0570c5e55d5e.jpg',
    variants: [
      { name: 'Splash 200ml', price: 4000 },
      { name: 'Black 200ml', price: 4000 },
      { name: 'Charge 200ml', price: 4000 },
      { name: 'Amaze 200ml', price: 4000 }
    ],
    reviews: [
      { name: 'Samuel', rating: 4, body: 'Great value body spray with strong projection.' }
    ]
  },
  {
    id: 'bodycology-fragrance-mist',
    brand: 'BODYCOLOGY',
    name: 'Bodycology Fragrance Mist 237ml',
    category: 'Body Mist',
    price: 8500,
    originalPrice: 11000,
    discount: '22% OFF',
    notes: 'Cucumber Melon, Coconut Hibiscus, Whipped Vanilla, Pink Vanilla Wish',
    description: 'Luxurious scented body mists infused with comforting vanilla, tropical floral, and fresh fruity undertones.',
    image: 'luxury perfume/d891814efe2231e4575e635e5c1b53cc.jpg',
    variants: [
      { name: 'Cucumber Melon 237ml', price: 8500 },
      { name: 'Coconut Hibiscus 237ml', price: 8500 },
      { name: 'Whipped Vanilla 237ml', price: 8500 },
      { name: 'Pink Vanilla Wish 237ml', price: 8500 }
    ],
    reviews: [
      { name: 'Kemi', rating: 5, body: 'Whipped Vanilla and Pink Vanilla Wish are elite gourmand mists!' }
    ]
  },
  {
    id: 'riggs-london-body-spray',
    brand: 'RIGGS LONDON',
    name: 'Riggs London Perfumed Deodorant Body Spray 250ml',
    category: 'Body Spray',
    price: 5000,
    originalPrice: 7000,
    discount: '28% OFF',
    notes: 'Ember Wood, Jock Spice, Golden Amber, Power Leather, Pink Floral, Venom Musk',
    description: 'A premium range of long-lasting perfumed deodorant body sprays designed for high performance and distinct charm.',
    image: 'luxury perfume/dd627c8f51fd05c4854bc2bee9053f7d.jpg',
    variants: [
      { name: 'Ember 250ml', price: 5000 },
      { name: 'Jock 250ml', price: 5000 },
      { name: 'Armour 250ml', price: 5000 },
      { name: 'Rider 250ml', price: 5000 },
      { name: 'Ace 250ml', price: 5000 },
      {name:   'wood 250ml',price:5000},
      {name:  'Power 250ml', price:5000},
      {name:   'Chife 250ml',price:5000},
      {name:    'Terra 250ml',price:5000},
      {name:    'Dynamo 250ml',price:5000},
      {name:    'Hour 250ml',price:5000},
      {name:    'Echo 250ml',price:5000},
      {name:    'Only 250ml',price:5000},
      {name:    'Pink 250ml',price:5000},
      {name:    'Venom 250ml',price:5000},
      {name:    'Patrol 250ml',price:5000},
      {name:    ' X 250ml',price:5000}
      
      
      
      
    
      
      
      
      
      
      
    ],
    reviews: [
      { name: 'Emeka', rating: 5, body: 'Riggs sprays last whole day without fading out.' }
    ]
  },
  {
    id: 'confetti-london-body-spray',
    brand: 'CONFETTI LONDON',
    name: 'Confetti London Perfumed Deodorant Body Spray 250ml',
    category: 'Body Spray',
    price: 4800,
    originalPrice: 6500,
    discount: '26% OFF',
    notes: 'Coral Rose, Maple Vanilla, Secret Jasmine, Wish Citrus, Gorgeous Amber, Chocolate Gourmand',
    description: 'Vibrant and expressive perfumed deodorant body sprays featuring rich floral, fruity, and gourmand options.',
    image: 'luxury perfume/e0549e4e3547bb0d3ac24f142d936a22.jpg',
    variants: [
      { name: 'Dear 250ml', price: 4800 },
      { name: 'Coral 250ml', price: 4800 },
      { name: 'Maple 250ml', price: 4800 },
      { name: 'Gorgeous 250ml', price: 4800 },
      { name: 'Chocolate 250ml', price: 4800 },
      { name: 'Live 250ml', price: 4800 },
      { name: 'Wish 250ml', price: 4800 },
      { name: 'Joy 250ml', price: 4800 },
      { name: 'secret 250ml', price: 4800 },
      { name: 'You 250ml', price: 4800 },
      { name: 'Pertty 250ml', price: 4800 },
      { name: 'Nude 250ml', price: 4800 }

    ],
    reviews: [
      { name: 'Titi', rating: 5, body: 'Chocolate and Maple variants smell so sweet and warm.' }
    ]
  },
  {
    id: 'imperio-love-fragrance-mist',
    brand: 'IMPERIO',
    name: 'Imperio Love Fragrance Mist 260ml',
    category: 'Body Mist',
    price: 6500,
    originalPrice: 8500,
    discount: '23% OFF',
    notes: 'Lost in Amber, Midnight Pomegranate, Romantic Love Spell, Dancing Flower',
    description: 'An alluring fragrance mist collection featuring vibrant fruity-floral scents inspired by classic love perfumes.',
    image: 'luxury perfume/eda84169420a825998c986bcafd29638.jpg',
    variants: [
      { name: 'Lost in Amber 260ml', price: 6500 },
      { name: 'Pomegranate 260ml', price: 6500 },
      { name: 'Romantic Love 260ml', price: 6500 },
      { name: 'Dancing Flower 260ml', price: 6500 }
    ],
    reviews: [
      { name: 'Joy', rating: 4, body: 'Romantic Love Spell smells incredible and comes in a huge 260ml bottle!' }
    ]
  }
];
  


 
// --- CONFIGURATION & PAGINATION STATE ---
let currentPage = 1;
const itemsPerPage = 4; // Displays 4 perfumes per page (2x2 grid on mobile)
const maxVisiblePages = 5; // Limits visible page buttons on mobile to prevent clipping

// --- RENDER PAGINATION CONTROLS ---
function renderPaginationControls(totalItems, gridContainer, currentDataset) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const existingControls = document.querySelector('.pagination-controls');
  if (existingControls) {
    existingControls.remove();
  }

  if (totalPages <= 1) return;

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-controls';

  // Back Arrow Button (<)
  const prevBtn = document.createElement('button');
  prevBtn.className = `pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`;
  prevBtn.innerHTML = '&#8249;';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPerfumeCatalog(currentDataset);
    }
  };
  paginationContainer.appendChild(prevBtn);

  // Calculate sliding window for pagination numbers (1..5, 6..10, etc.)
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Numbered Page Buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => {
      currentPage = i;
      renderPerfumeCatalog(currentDataset);
    };
    paginationContainer.appendChild(pageBtn);
  }

  // Next Arrow Button (>)
  const nextBtn = document.createElement('button');
  nextBtn.className = `pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`;
  nextBtn.innerHTML = '&#8250;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPerfumeCatalog(currentDataset);
    }
  };
  paginationContainer.appendChild(nextBtn);

  gridContainer.after(paginationContainer);
}

// --- UNIFIED CATALOG RENDERER ---
function renderPerfumeCatalog(products = fallbackLuxuryPerfumeCatalog) {
  const container = document.getElementById('productGrid') || document.querySelector('.perfume-grid');
  if (!container) return;

  const catalog = (products && products.length) ? products : (typeof fallbackLuxuryPerfumeCatalog !== 'undefined' ? fallbackLuxuryPerfumeCatalog : []);
  if (!catalog.length) return;

  // 1. Calculate slice range for active page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = catalog.slice(startIndex, endIndex);

  // 2. Render only the current page items
  container.innerHTML = paginatedProducts.map(product => {
    const mainImgId = `main-img-${product.id}`;
    const reviewCount = product.reviews ? product.reviews.length : 0;

    const variantsHTML = product.variants && product.variants.length > 0
      ? `<div class="variant-selector" style="margin: 6px 0;">
          <div class="variant-options" style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
            ${product.variants.map((v, idx) => `
              <button type="button" class="variant-btn ${idx === 0 ? 'active' : ''}" style="font-size: 10px; padding: 2px 6px; border: 1px solid #ddd; background: #ffffff; cursor: pointer;" onclick="selectCardVariant(this, '${v.name}', ${v.price})">${v.name}</button>
            `).join('')}
          </div>
         </div>`
      : '';

    const reviewsHTML = product.reviews && product.reviews.length > 0
      ? product.reviews.map(r => `
          <div class="review-card-item" style="text-align: left; margin-bottom: 8px;">
            <div class="rev-header" style="display: flex; justify-content: space-between; font-size: 0.75rem;">
              <strong>${r.name}</strong>
              <span class="stars" style="color: #ffb400;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p class="rev-body" style="font-size: 0.75rem; color: #555; margin: 2px 0;">${r.body}</p>
          </div>
        `).join('')
      : '<p style="font-size:0.75rem; color:#888;">No reviews yet. Be the first to leave one!</p>';

    return `
      <article class="store-card product-card" 
               data-id="${product.id}" 
               data-name="${product.name}" 
               data-price="${product.price}" 
               data-current-price="${product.price}" 
               data-notes="${product.notes || ''}">
        <div class="card-media">
          ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ''}
          <img id="${mainImgId}" src="${product.image}" alt="${product.name}" loading="lazy" />
          <button type="button" class="quick-add-btn" aria-label="Add to cart">+</button>
        </div>
        
        <div class="card-details">
          <span class="brand-name">${product.brand || 'LUXURY PERFUME'}</span>
          <h3 class="product-title">${product.name}</h3>
          
          <div class="rating-row">
            <span class="stars">★★★★★</span>
            <span class="review-count">(${reviewCount})</span>
          </div>
          
          ${variantsHTML}

          <div class="price-row">
            ${product.originalPrice ? `<span class="old-price">₦${product.originalPrice.toLocaleString()}</span>` : ''}
            <strong class="current-price product-price-display">₦${product.price.toLocaleString()}</strong>
          </div>

          <button type="button" class="details-btn" style="margin-top: 6px; font-size: 11px; color: #333; background: none; border: none; text-decoration: underline; cursor: pointer;">
            View Details & Reviews
          </button>
        </div>

        <div class="card-reviews-wrapper hidden" style="padding: 10px; border-top: 1px solid #eee; margin-top: 8px;">
          ${product.description ? `
            <p class="perfume-description" style="font-size: 0.8rem; color: #FFD700; margin-bottom: 8px; text-align: left; font-style: italic; line-height: 1.4; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
              ${product.description}
            </p>
          ` : ''}

          <p class="notes-text" style="font-size: 0.75rem; color: #D4AF37; margin-bottom: 8px; text-align: left;">
            <strong>Notes:</strong> ${product.notes || 'N/A'}
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 6px 0;" />
          
          <form class="inline-review-form" onsubmit="submitCardReview(event, this)" style="margin-bottom: 10px;">
            <h4 style="font-size: 0.8rem; margin-bottom: 6px; text-align: left;">Leave a Review</h4>
            <input type="text" class="rev-name" placeholder="Your Name" required style="width: 100%; font-size: 0.75rem; margin-bottom: 4px; padding: 4px;" />
            <select class="rev-rating" required style="width: 100%; font-size: 0.75rem; margin-bottom: 4px; padding: 4px;">
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
            <textarea class="rev-comment" rows="2" placeholder="Write your thoughts..." required style="width: 100%; font-size: 0.75rem; margin-bottom: 4px; padding: 4px;"></textarea>
            <button type="submit" class="small-btn primary" style="font-size: 0.75rem; width: 100%; padding: 4px; cursor: pointer;">Submit Review</button>
          </form>

          <div class="review-feed">
            ${reviewsHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // 3. Attach pagination navigation below the grid
  renderPaginationControls(catalog.length, container, catalog);
}

// --- VARIANT SELECTION HANDLER ---
function selectCardVariant(buttonEl, variantName, variantPrice) {
  const card = buttonEl.closest('.store-card');
  if (!card) return;

  const buttons = card.querySelectorAll('.variant-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');

  card.dataset.selectedVariant = variantName;
  card.dataset.currentPrice = variantPrice;

  const priceDisplay = card.querySelector('.product-price-display');
  if (priceDisplay) {
    priceDisplay.textContent = `₦${variantPrice.toLocaleString()}`;
  }
}

// --- INITIALIZATION ---
// Only attach this once!
document.addEventListener('DOMContentLoaded', () => {
  renderPerfumeCatalog();
});
// Cart Drawer & Checkout Logic Handler
document.addEventListener('DOMContentLoaded', () => {
  // Elements (Targeting exact IDs and fallback classes from your HTML)
  const cartPanel = document.getElementById('cartPanel') || document.querySelector('.cart-modal, .cart-panel');
  const cartButton = document.getElementById('cartButton');
  const closeCartBtn = document.querySelector('.cart-close, .cart-close-btn, #close-cart-btn, .x-btn') || 
                       document.querySelector('#cartPanel header span, #cartPanel h2 + span');
  const checkoutBtn = document.getElementById('proceed-checkout-btn') || document.querySelector('.primary-btn.full-width');
  const checkoutForm = document.getElementById('checkout-form');

  // 1. Open Cart Handler (Fixes header bag icon)
  if (cartButton && cartPanel) {
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      cartPanel.classList.add('active', 'show', 'open');
      cartPanel.style.display = 'block';
    });
  }

  // 2. Close Cart Handler (Fixes 'X' close button)
  const hideCart = () => {
    if (cartPanel) {
      cartPanel.classList.remove('active', 'show', 'open');
      cartPanel.style.display = 'none';
    }
  };

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hideCart();
    });
  }

  // Fallback close selectors
  document.querySelectorAll('.close-cart, .cart-close, #close-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      hideCart();
    });
  });

  // 3. Proceed to Checkout Handler (Fixes Checkout action)
  const processCheckout = () => {
    // Queries via exact IDs first, then falls back to placeholders
    const fullName = document.getElementById('shippingName')?.value.trim() || 
                     document.querySelector('input[placeholder*="Jane Doe"]')?.value.trim();
    const phone = document.getElementById('shippingPhone')?.value.trim() || 
                  document.querySelector('input[placeholder*="08012345678"]')?.value.trim();
    const address = document.getElementById('shippingAddress')?.value.trim() || 
                    document.querySelector('input[placeholder*="House number"]')?.value.trim();
    const city = document.getElementById('shippingCity')?.value.trim() || 
                 document.querySelector('input[placeholder*="Port Harcourt"]')?.value.trim();
    const state = document.getElementById('shippingState')?.value.trim() || 
                  document.querySelector('input[placeholder*="Rivers State"]')?.value.trim();

    if (!fullName || !phone || !address) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address before proceeding.');
      return;
    }

    const orderSummary = `*New Order - Genial Collection*\n\n` +
      `📦 *Item:* Supremacy Afnan Silver EDP 100ml (x1)\n` +
      `💰 *Total:* ₦12,000\n\n` +
      `👤 *Customer:* ${fullName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Delivery Address:* ${address}, ${city || ''}, ${state || ''}`;

    const whatsappNumber = '2348081924652';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderSummary)}`, '_blank');
  };

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      processCheckout();
    });
  } else if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      processCheckout();
    });
  }
});
function selectCardVariant(buttonEl, variantName, variantPrice) {
  const card = buttonEl.closest('.store-card');
  if (!card) return;

  const buttons = card.querySelectorAll('.variant-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');

  card.dataset.selectedVariant = variantName;
  card.dataset.currentPrice = variantPrice;

  const priceDisplay = card.querySelector('.product-price-display');
  if (priceDisplay) {
    priceDisplay.textContent = `₦${variantPrice.toLocaleString()}`;
  }
}

function submitCardReview(event, formElement) {
  event.preventDefault();
  const card = formElement.closest('.store-card');
  const feed = card.querySelector('.review-feed');
  const name = formElement.querySelector('.rev-name').value;
  const rating = parseInt(formElement.querySelector('.rev-rating').value, 10);
  const comment = formElement.querySelector('.rev-comment').value;

  const newReviewHTML = `
    <div class="review-card-item" style="text-align: left; margin-bottom: 8px;">
      <div class="rev-header" style="display: flex; justify-content: space-between; font-size: 0.75rem;">
        <strong>${name}</strong>
        <span class="stars" style="color: #ffb400;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
      </div>
      <p class="rev-body" style="font-size: 0.75rem; color: #555; margin: 2px 0;">${comment}</p>
    </div>
  `;

  feed.insertAdjacentHTML('afterbegin', newReviewHTML);
  formElement.reset();
}


// 1. Corrected Add-To-Cart Function
function handleAddToCart(productData) {
  if (!productData || !productData.name) return;

  const itemPrice = Number(productData.price) || 0;
  const itemImage = productData.image || productData.img || '';
  const itemId = productData.id || Date.now().toString();

  // Find existing item by matching name (which includes the variant title) or exact ID
  const existingItem = cart.find(
    item => String(item.id) === String(itemId) || item.name === productData.name
  );

  if (existingItem) {
    existingItem.quantity += 1; // Fixed: Increments item count correctly
  } else {
    cart.push({
      id: itemId,
      name: productData.name,
      price: itemPrice,
      image: itemImage,
      quantity: 1
    });
  }

  if (typeof saveCart === 'function') saveCart();
  if (typeof updateCartUI === 'function') updateCartUI();
  if (typeof openCart === 'function') openCart();
  if (typeof showToast === 'function') showToast(`${productData.name} added to cart`);
}

// 2. Global Event Delegation
function bindProductActions() {
  document.body.addEventListener('click', (event) => {
    
    // Add to Cart Trigger
    const cartBtn = event.target.closest('.add-cart, .quick-add-btn, .add-to-cart-btn, [data-add-cart]');
    if (cartBtn) {
      event.preventDefault();

      const card = cartBtn.closest('.store-card, .product-card');
      
      if (card) {
        const productId = card.dataset.id || Date.now().toString();
        const product = typeof fallbackLuxuryPerfumeCatalog !== 'undefined' 
          ? fallbackLuxuryPerfumeCatalog.find(p => String(p.id) === String(productId)) 
          : null;

        const selectedVariant = card.dataset.selectedVariant || '';
        const rawName = card.dataset.name || (product ? product.name : 'Product Item');
        const finalName = selectedVariant ? `${rawName} (${selectedVariant})` : rawName;

        // Create a unique compound ID so different variants stay separate in cart
        const compoundId = selectedVariant ? `${productId}-${selectedVariant}` : productId;

        const price = Number(
          card.dataset.currentPrice || 
          card.dataset.price || 
          (product ? product.price : 0)
        );

        const image = 
          card.dataset.image || 
          (card.querySelector('img') ? card.querySelector('img').src : '') || 
          (product ? product.image : '');

        handleAddToCart({
          id: compoundId,
          name: finalName,
          price: price,
          image: image
        });
        return;
      }

      // Modal Fallback Trigger
      const detailTitle = document.getElementById('detailTitle')?.textContent || 'Product';
      const detailPriceEl = document.getElementById('detailPrice');
      const detailPrice = detailPriceEl ? Number(detailPriceEl.textContent.replace(/[^\d.-]/g, '')) : 0;
      const detailImage = document.getElementById('detailImage')?.src || '';

      handleAddToCart({
        id: Date.now().toString(),
        name: detailTitle,
        price: detailPrice,
        image: detailImage
      });
      return;
    }

    // Toggle Details & Reviews Drawer / Modal
    const detailsBtn = event.target.closest('.details-btn');
    if (detailsBtn) {
      event.preventDefault();
      const card = detailsBtn.closest('.store-card, .product-card');
      if (!card) return;

      const reviewWrapper = card.querySelector('.card-reviews-wrapper');
      if (reviewWrapper) {
        reviewWrapper.classList.toggle('hidden');
        detailsBtn.textContent = reviewWrapper.classList.contains('hidden') 
          ? 'View Details & Reviews' 
          : 'Hide Details & Reviews';
        return;
      }

      // Fallback to Modal if inline wrapper isn't present
      const modal = document.getElementById('detailsModal');
      if (modal) {
        const detailImage = document.getElementById('detailImage');
        const detailTitle = document.getElementById('detailTitle');
        const detailDescription = document.getElementById('detailDescription');
        const detailPrice = document.getElementById('detailPrice');

        const productId = card?.dataset?.id;
        const product = typeof fallbackLuxuryPerfumeCatalog !== 'undefined' 
          ? fallbackLuxuryPerfumeCatalog.find(p => String(p.id) === String(productId)) 
          : null;

        if (detailImage) detailImage.src = card?.dataset?.image || (product ? product.image : '');
        if (detailTitle) detailTitle.textContent = card?.dataset?.name || (product ? product.name : '');
        if (detailDescription) detailDescription.textContent = card?.dataset?.notes || (product ? product.notes : '');
        if (detailPrice && typeof formatNaira === 'function') {
          detailPrice.textContent = formatNaira(Number(card?.dataset?.currentPrice || (product ? product.price : 0)));
        }

        if (typeof openModal === 'function') {
          openModal(modal);
        }
      }
    }

  });
}

function autoRotateGallery() {
  const galleryCards = [...document.querySelectorAll('.gallery-card')];
  if (!galleryCards.length) return;
  let activeIndex = 0;
  galleryCards[activeIndex].classList.add('active');

  setInterval(() => {
    galleryCards[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % galleryCards.length;
    galleryCards[activeIndex].classList.add('active');
  }, 1000);
}

function autoRotateSlides() {
  const slideCards = [...document.querySelectorAll('.image-slide-card')];
  if (!slideCards.length) return;

  slideCards.forEach((card) => {
    const images = [...card.querySelectorAll('.slide-image')];
    if (!images.length) return;

    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, Number(card.dataset.slideInterval || 1800));
  });
}

function filterProducts() {
  const searchInput = document.getElementById('perfumeSearch');
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.product-card, .store-card');

  cards.forEach((card) => {
    const name = card.dataset.name || '';
    const notes = card.dataset.notes || '';
    const searchableText = `${name} ${notes}`.toLowerCase();
    const matches = !query || searchableText.includes(query);
    card.classList.toggle('hidden', !matches);
  });




  cards.forEach((card) => {
    const searchableText = `${card.dataset.name} ${card.dataset.notes}`.toLowerCase();
    const matches = !query || searchableText.includes(query);
    card.classList.toggle('hidden', !matches);
  });
}

const GENIAL_WHATSAPP_NUMBER = "2348081924652";

function generateWhatsAppCheckout() {
  // 1. Verify cart array has active items
  if (typeof cart === 'undefined' || !cart || cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // 2. Fetch shipping form values dynamically
  const fullName = document.querySelector('input[placeholder*="Full Name"]')?.value || 
                   document.querySelector('#shippingAddress input:nth-child(1)')?.value || "Customer";
  const phone = document.querySelector('input[type="tel"]')?.value || "N/A";
  const address = document.querySelector('input[placeholder*="Address"]')?.value || "";
  const city = document.querySelector('input[placeholder*="City"]')?.value || "";
  const state = document.querySelector('input[placeholder*="State"]')?.value || "";

  const fullDeliveryAddress = [address, city, state].filter(Boolean).join(', ');

  // 3. Build WhatsApp message dynamically from cart items
  let message = `✨ *NEW ORDER — GENIAL COLLECTION* ✨\n\n`;
  message += `*Customer:* ${fullName}\n`;
  message += `*Phone:* ${phone}\n`;
  if (fullDeliveryAddress) {
    message += `*Delivery Address:* ${fullDeliveryAddress}\n`;
  }
  message += `\n-------------------------\n\n`;

  let grandTotal = 0;

  // 4. Loop through ALL items inside the cart
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    message += `*${index + 1}. ${item.name}*\n`;
    message += `   • Qty: ${item.quantity}\n`;
    message += `   • Price: ₦${itemTotal.toLocaleString()}\n`;
    if (item.image) {
      message += `   • Image: ${item.image}\n`;
    }
    message += `\n`;
  });

  message += `-------------------------\n`;
  message += `💰 *GRAND TOTAL:* ₦${grandTotal.toLocaleString()}\n\n`;
  message += `Please confirm availability and share payment details. Thank you!`;

  // 5. Open WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${GENIAL_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');
}

// 💳 Paystack Public Key
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 

function payWithCardOrTransfer() {
  if (typeof cart === 'undefined' || !cart || cart.length === 0) {
    alert("Your cart is empty! Please add items before checking out.");
    return;
  }

  let totalAmountNaira = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let customerEmail = prompt("Please enter your email address for payment receipt:");
  
  if (!customerEmail || !customerEmail.includes('@')) {
    alert("A valid email address is required to complete checkout.");
    return;
  }

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: customerEmail,
    amount: totalAmountNaira * 100,
    currency: "NGN",
    channels: ['card', 'bank_transfer', 'ussd'],
    ref: 'GC_' + Math.floor((Math.random() * 1000000000) + 1),
    metadata: {
      custom_fields: cart.map(item => ({
        display_name: item.name,
        variable_name: item.name.toLowerCase().replace(/\s+/g, '_'),
        value: `${item.quantity}x (Type: ${item.type || 'Product'}) ${item.fittingDate ? '- Date: ' + item.fittingDate : ''}`
      }))
    },
    callback: function(response) {
      alert('Payment successful! Transaction Reference: ' + response.reference);
      
      // 1. Generate WhatsApp order summary while cart data is still populated
      if (typeof generateWhatsAppCheckout === 'function') {
        generateWhatsAppCheckout();
      }
      
      // 2. Clear cart and reset state after triggering WhatsApp
      cart = [];
      if (typeof saveCart === 'function') saveCart();
      if (typeof updateCartUI === 'function') updateCartUI();
    },
    onClose: function() {
      alert('Transaction canceled.');
    }
  });

  handler.openIframe();
}

// Auto Image Carousel Logic
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  const slideInterval = 4000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
  }
}

function preloadShowcaseImages() {
  const allImages = document.querySelectorAll('.image-stack img');
  allImages.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const tempImg = new Image();
      tempImg.src = src;
    }
  });
}


   

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initial page state setup
  document.body.style.overflow = 'auto';

  // Safe execution of optional global catalog & cart helpers
  if (typeof updateCartUI === 'function') updateCartUI();
  if (typeof setLoggedInState === 'function') setLoggedInState();
  if (typeof renderPerfumeCatalog === 'function') renderPerfumeCatalog();
  if (typeof autoRotateGallery === 'function') autoRotateGallery();
  if (typeof autoRotateSlides === 'function') autoRotateSlides();
  if (typeof bindProductActions === 'function') bindProductActions();
  if (typeof initHeroCarousel === 'function') initHeroCarousel();
  if (typeof preloadShowcaseImages === 'function') preloadShowcaseImages();

  // ======================================================
  // 2. SHOWCASE CONTROLLER & IDLE TIMER
  // ======================================================
  const loginPanel = document.getElementById('login-panel');
  const showcasePanel = document.getElementById('showcase-panel');
  const returnLoginBtn = document.getElementById('return-login-btn');
  const showcaseSlides = document.querySelectorAll('.slide-item');

  let idleTimer = null;
  let slideTimeout = null;
  let innerImageInterval = null;
  let currentShowcaseSlide = 0;

  const TIME_PER_IMAGE = 2500;
  const IDLE_WAIT_TIME = 15000;

  function runSlideShowSequence() {
    if (currentShowcaseSlide >= showcaseSlides.length) {
      stopShowcase();
      return;
    }

    showcaseSlides.forEach((slide, idx) => {
      slide.classList.toggle('slide-active', idx === currentShowcaseSlide);
    });

    const activeSlide = showcaseSlides[currentShowcaseSlide];
    const images = activeSlide ? activeSlide.querySelectorAll('.image-stack img') : [];

    clearInterval(innerImageInterval);

    if (images.length > 0) {
      let imgIndex = 0;
      images.forEach((img, idx) => {
        img.classList.toggle('active-img', idx === 0);
      });

      innerImageInterval = setInterval(() => {
        images[imgIndex].classList.remove('active-img');
        imgIndex++;
        if (imgIndex < images.length) {
          images[imgIndex].classList.add('active-img');
        } else {
          clearInterval(innerImageInterval);
        }
      }, TIME_PER_IMAGE);

      const totalSectionDuration = Math.max(images.length * TIME_PER_IMAGE, 3000);
      slideTimeout = setTimeout(() => {
        currentShowcaseSlide++;
        runSlideShowSequence();
      }, totalSectionDuration);

    } else {
      slideTimeout = setTimeout(() => {
        currentShowcaseSlide++;
        runSlideShowSequence();
      }, 4000);
    }
  }

  function startShowcase() {
    if (!loginPanel || !showcasePanel) return;
    loginPanel.classList.remove('show-panel');
    loginPanel.classList.add('hide-panel');
    showcasePanel.classList.remove('hide-panel');
    showcasePanel.classList.add('show-panel');

    currentShowcaseSlide = 0;
    runSlideShowSequence();
  }

  function stopShowcase() {
    clearTimeout(slideTimeout);
    clearInterval(innerImageInterval);
    if (showcasePanel) {
      showcasePanel.classList.remove('show-panel');
      showcasePanel.classList.add('hide-panel');
    }
    if (loginPanel) {
      loginPanel.classList.remove('hide-panel');
      loginPanel.classList.add('show-panel');
    }
    resetIdleTimer();
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (loginPanel && loginPanel.classList.contains('show-panel')) {
      idleTimer = setTimeout(startShowcase, IDLE_WAIT_TIME);
    }
  }

  ['mousemove', 'keydown', 'click', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
      if (loginPanel && loginPanel.classList.contains('show-panel')) {
        resetIdleTimer();
      }
    });
  });

  resetIdleTimer();

  // ======================================================
  // 3. AUTHENTICATION CONTROLLER (LOGIN / SIGN UP)
  // ======================================================
  const authForm = document.getElementById('loginForm');

  if (authForm) {
    const authTitle = document.getElementById('auth-title');
    const nameGroup = document.getElementById('name-group');
    const nameInput = document.getElementById('auth-name');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('auth-password');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    const forgotPasswordBtn = document.getElementById('forgot-password-btn');
    const authBtn = document.getElementById('auth-btn');
    const toggleLabel = document.getElementById('toggle-label');
    const toggleAuthBtn = document.getElementById('toggle-auth-btn');
    const socialLabel = document.getElementById('social-label');

    let isSignUpMode = false;

    // Toggle Password Visibility
    if (togglePasswordBtn && passwordInput) {
      const togglePassword = (e) => {
        e.preventDefault();
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
      };
      togglePasswordBtn.addEventListener('click', togglePassword);
      togglePasswordBtn.addEventListener('touchend', togglePassword);
    }

    // Toggle Sign Up vs Login
    if (toggleAuthBtn) {
      const switchAuthMode = (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;

        if (isSignUpMode) {
          if (authTitle) authTitle.textContent = 'Sign Up Here';
          if (authBtn) authBtn.textContent = 'Sign Up';
          if (toggleLabel) toggleLabel.textContent = 'Already have an account?';
          if (toggleAuthBtn) toggleAuthBtn.textContent = 'Login here';
          if (socialLabel) socialLabel.textContent = 'Sign up with';
          if (nameGroup) nameGroup.style.display = 'block';
          if (nameInput) nameInput.required = true;
          if (forgotPasswordBtn) forgotPasswordBtn.style.display = 'none';
        } else {
          if (authTitle) authTitle.textContent = 'Login Here';
          if (authBtn) authBtn.textContent = 'Login';
          if (toggleLabel) toggleLabel.textContent = "Don't have an account?";
          if (toggleAuthBtn) toggleAuthBtn.textContent = 'Sign up here';
          if (socialLabel) socialLabel.textContent = 'Log in with';
          if (nameGroup) nameGroup.style.display = 'none';
          if (nameInput) nameInput.required = false;
          if (forgotPasswordBtn) forgotPasswordBtn.style.display = 'inline-block';
        }
      };

      toggleAuthBtn.addEventListener('click', switchAuthMode);
      toggleAuthBtn.addEventListener('touchend', switchAuthMode);
    }

    // Consolidated Auth Submission Handler
    const handleAuthSubmit = (e) => {
      if (e) e.preventDefault();

      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
      }

      const registeredUsers = JSON.parse(localStorage.getItem('genial_users') || '[]');

      if (isSignUpMode) {
        const userExists = registeredUsers.some(u => u.email === email);
        if (userExists) {
          alert('An account with this email already exists! Switching to Login...');
          if (toggleAuthBtn) toggleAuthBtn.click();
          return;
        }

        const userName = (nameInput && nameInput.value.trim()) || 'Valued Customer';
        registeredUsers.push({ name: userName, email, password });

        localStorage.setItem('genial_users', JSON.stringify(registeredUsers));
        localStorage.setItem('genialAuth', 'true');
        localStorage.setItem('genialCurrentUser', JSON.stringify({ name: userName, email }));

        alert(`Account created successfully! Welcome to Genial Collection, ${userName}.`);
        window.location.href = 'geinalcollection.html';
      } else {
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          localStorage.setItem('genialAuth', 'true');
          localStorage.setItem('genialCurrentUser', JSON.stringify(foundUser));
          alert(`Welcome back, ${foundUser.name || 'Valued Customer'}!`);
          window.location.href = 'geinalcollection.html';
        } else {
          alert('Account not found or incorrect password! Click "Sign up here" to create an account.');
        }
      }
    };

    // Attach listener to form submit
    authForm.addEventListener('submit', handleAuthSubmit);

    // Explicit tap listener on submit button for mobile compatibility
    if (authBtn) {
      authBtn.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
          handleAuthSubmit(e);
        }
      });
    }

    // Social Authentication Buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
      const handleSocialAuth = (e) => {
        e.preventDefault();
        const platform = btn.classList.contains('google') ? 'Google' :
                         btn.classList.contains('facebook') ? 'Facebook' : 'X (Twitter)';

        const userAccount = prompt(`Select or enter your ${platform} email address:`);
        if (userAccount && userAccount.trim() !== '') {
          const email = userAccount.trim().toLowerCase();
          const name = email.split('@')[0];

          localStorage.setItem('genialAuth', 'true');
          localStorage.setItem('genialCurrentUser', JSON.stringify({ name, email }));

          alert(`Logged in via ${platform}! Redirecting...`);
          window.location.href = 'geinalcollection.html';
        }
      };

      btn.addEventListener('click', handleSocialAuth);
      btn.addEventListener('touchend', handleSocialAuth);
    });
  }

  // ======================================================
  // 4. HAMBURGER & FRAGRANCE CATEGORY CONTROLLER
  // ======================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const selectedCategory = link.getAttribute('data-category');

        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');

        if (typeof renderPerfumeCatalog === 'function') {
          renderPerfumeCatalog(selectedCategory);
        }
      });
    });
  }

  // ======================================================
  // 5. SHOWCASE & PANEL SWITCHING CONTROLLER
  // ======================================================
  if (returnLoginBtn) {
    returnLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof stopShowcase === 'function') stopShowcase();
    });
    returnLoginBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (typeof stopShowcase === 'function') stopShowcase();
    });
  }

  // ======================================================
  // 6. CONSULTATION FORM & WHATSAPP INTEGRATION
  // ======================================================
  const ceoWhatsAppNumber = '2348000000000'; 
  const consultationForm = document.getElementById('consultationForm');
  const whatsappChatBtn = document.getElementById('whatsappChatBtn');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('consult-name')?.value.trim() || 'N/A';
      const phone = document.getElementById('consult-phone')?.value.trim() || 'N/A';
      const style = document.getElementById('consult-style')?.value || 'Not selected';
      const budget = document.getElementById('consult-budget')?.value || 'Not selected';
      const notes = document.getElementById('consult-notes')?.value.trim() || 'None';

      const rawMessage = 
        `*New Custom Consultation Request*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `👗 *Style Interest:* ${style}\n` +
        `💰 *Budget Range:* ${budget}\n` +
        `📝 *Measurements / Notes:* ${notes}`;

      const encodedMessage = encodeURIComponent(rawMessage);
      window.open(`https://wa.me/${ceoWhatsAppNumber}?text=${encodedMessage}`, '_blank');
    });
  }

  if (whatsappChatBtn) {
    whatsappChatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const quickMessage = encodeURIComponent("Hello Genial Collection, I'd like to make an inquiry about a custom order.");
      window.open(`https://wa.me/${ceoWhatsAppNumber}?text=${quickMessage}`, '_blank');
    });
  }

  // Initialize video engine for both Perfume and Tailoring sections
  initSectionVideos('#shop');
  initSectionVideos('#tailoring');
  initSectionVideos('.tailoring-section');
});

// ======================================================
// BACKGROUND VIDEO PLAYLIST CONTROLLER (MULTI-SECTION FIX)
// ======================================================
function initSectionVideos(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const playlistVideos = container.querySelectorAll('.hero-bg-video');
  if (playlistVideos.length === 0) return;

  let currentVidIndex = 0;
  let isSwitching = false;

  function switchVideo(index) {
    if (isSwitching) return;
    isSwitching = true;

    playlistVideos.forEach((vid, i) => {
      if (i === index) {
        vid.classList.add('active');
        vid.muted = true;
        vid.defaultMuted = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');

        try {
          vid.currentTime = 0;
        } catch (e) {
          console.warn("Timeline reset deferred:", e);
        }

        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              isSwitching = false;
            })
            .catch((err) => {
              console.warn(`Autoplay deferred on ${containerSelector}:`, err);
              isSwitching = false;
              setTimeout(nextVideo, 1000);
            });
        } else {
          isSwitching = false;
        }
      } else {
        vid.classList.remove('active');
        vid.pause();
      }
    });
  }

  function nextVideo() {
    currentVidIndex = (currentVidIndex + 1) % playlistVideos.length;
    switchVideo(currentVidIndex);
  }

  playlistVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    video.addEventListener('ended', () => {
      nextVideo();
    });

    video.addEventListener('error', () => {
      console.error(`Video load error in ${containerSelector}. Skipping track...`);
      setTimeout(nextVideo, 1000);
    });
  });

  switchVideo(0);
}

// ======================================================
// CATEGORY DRAWER & FILTER CONTROLS
// ======================================================
function toggleCategoryDrawer() {
  const drawer = document.getElementById('categoryDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

function filterByCategory(categoryName, event) {
  if (event) event.preventDefault();
  toggleCategoryDrawer();
  
  if (typeof currentPage !== 'undefined') {
    currentPage = 1;
  }

  if (typeof fallbackLuxuryPerfumeCatalog !== 'undefined' && typeof renderPerfumeCatalog === 'function') {
    if (categoryName === 'All') {
      renderPerfumeCatalog(fallbackLuxuryPerfumeCatalog);
    } else {
      const filteredProducts = fallbackLuxuryPerfumeCatalog.filter(product => 
        product.category && product.category.toLowerCase() === categoryName.toLowerCase()
      );
      renderPerfumeCatalog(filteredProducts);
    }
  }
}
