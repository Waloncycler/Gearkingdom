// Update product data with new descriptions matching the image
const products = [
  {
    id: 1,
    name: "Air Force",
    description: "Classic sneakers reimagined",
    category: "shoes",
    image: `<img src="/resources/airforce.png" alt="Air Force" style="width:100%; height:100%; object-fit:cover;">`,
  },
  {
    id: 2,
    name: "Dunk",
    description: "Street style essential", 
    category: "shoes",
    image: `<img src="/resources/dunk.png" alt="Dunk" style="width:100%; height:100%; object-fit:cover;">`,
  },
  {
    id: 3,
    name: "Air Cushion",
    description: "Performance meets style",
    category: "shoes",
    image: `<img src="/resources/aircushion.png" alt="Air Cushion" style="width:100%; height:100%; object-fit:cover;">`,
  },
  {
    id: 4,
    name: "Jordan Series",
    description: "Iconic basketball heritage",
    category: "shoes",
    image: `<img src="/resources/airjordan.png" alt="Jordan Series" style="width:100%; height:100%; object-fit:cover;">`,
  },
  {
    id: 5,
    name: "Emergency Lights",
    description: "Innovative lighting solutions",
    category: "emergency",
    image: `<img src="/resources/emlight.png" alt="Emergency Lights" style="width:100%; height:100%; object-fit:cover;">`,
  },
  {
    id: 6,
    name: "Solar Equipment",
    description: "Sustainable power solutions",
    category: "solar",
    image: `<img src="/resources/solarlight.png" alt="Solar Equipment" style="width:100%; height:100%; object-fit:cover;">`,
  }
];

// New products for Latest Arrivals
const latestProducts = [
  {
    id: 7,
    name: "Sconce",
    description: "Solar energy wall washing spotlights outdoor rainproof courtyard atmosphere luminous wall lamp",
    category: "electronics",
    image: `<img src="/resources/walllamp.png" alt="wall lamp" style="width:100%; height:100%; object-fit:contain;">`,
    price: 0
  },
  {
    id: 8,
    name: "Multifunctional light",
    description: "Fire-fighting multifunctional broken window flashlight safety hammer",
    category: "electronics",
    image: `<img src="/resources/multilight.png" alt="Multifunctional light" style="width:100%; height:100%; object-fit:contain;">`,
    price: 0
  },
  {
    id: 9,
    name: "Nike Dunk Low",
    description: "Nike Dunk Low What The Ducks Of A Feather",
    category: "audio",
    image: `<img src="/resources/dunklow.png" alt="Nike Dunk" style="width:100%; height:100%; object-fit:contain;">`,
    price: 0
  }
];

// Create product cards
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-image">
      ${product.image}
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
    </div>
  `;
  
  return card;
}

// Update slidesPerView to show 4 products
const slidesPerView = 4;

// Create carousel slide with category links
function createCarouselSlide(products, startIdx) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';
  
  const endIdx = Math.min(startIdx + slidesPerView, products.length);
  for (let i = startIdx; i < endIdx; i++) {
    const product = products[i];
    const item = document.createElement('a');
    item.className = 'carousel-item';
    item.href = `/gears.html?category=${product.category}`;
    item.innerHTML = `
      <div class="product-image">
        ${product.image}
        <div class="product-overlay">
          <h3>${product.name}</h3>
        </div>
      </div>
    `;
    slide.appendChild(item);
  }

  // If we need to pad the last slide
  if (endIdx - startIdx < slidesPerView) {
    // Add empty items to maintain grid layout
    for (let i = endIdx - startIdx; i < slidesPerView; i++) {
      const emptyItem = document.createElement('div');
      emptyItem.className = 'carousel-item empty';
      slide.appendChild(emptyItem);
    }
  }
  
  return slide;
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = Math.ceil(products.length / slidesPerView);

function updateCarousel() {
  const container = document.getElementById('carouselContainer');
  const offset = -currentSlide * 100;
  container.style.transform = `translateX(${offset}%)`;
  
  // Update indicators
  document.querySelectorAll('.carousel-indicator').forEach((indicator, idx) => {
    indicator.classList.toggle('active', idx === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function initCarousel() {
  const container = document.getElementById('carouselContainer');
  const indicators = document.getElementById('carouselIndicators');
  
  // Create slides
  for (let i = 0; i < products.length; i += slidesPerView) {
    container.appendChild(createCarouselSlide(products, i));
  }
  
  // Create indicators
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => {
      currentSlide = i;
      updateCarousel();
    });
    indicators.appendChild(indicator);
  }
  
  // Add event listeners
  document.getElementById('nextSlide').addEventListener('click', nextSlide);
  document.getElementById('prevSlide').addEventListener('click', prevSlide);
  
  // Auto-advance carousel
  setInterval(nextSlide, 5000);
}

// Initialize page
function init() {
  const productGrid = document.getElementById('productGrid');
  const latestArrivalsGrid = document.getElementById('latestArrivalsGrid');
  
  if (productGrid) {
    products.forEach(product => {
      productGrid.appendChild(createProductCard(product));
    });
  }
  
  if (latestArrivalsGrid) {
    latestProducts.forEach(product => {
      latestArrivalsGrid.appendChild(createProductCard(product));
    });
  }
  
  initCarousel();
}

// Start the app
init();

// Export for use in other files
export { products, latestProducts, createProductCard };

// WhatsApp float functionality
const whatsappButton = document.getElementById('whatsappButton');
const whatsappQR = document.getElementById('whatsappQR');

whatsappButton.addEventListener('click', () => {
  whatsappQR.classList.toggle('show');
});

// Close QR code when clicking outside
document.addEventListener('click', (event) => {
  if (!whatsappButton.contains(event.target) && !whatsappQR.contains(event.target)) {
    whatsappQR.classList.remove('show');
  }
});

// 假设您有一个下拉选择器来选择案例
// <select id="caseSelector">
//     <option value="case1">案例 1</option>
//     <option value="case2">案例 2</option>
// </select>
// <div id="imagesContainer"></div>