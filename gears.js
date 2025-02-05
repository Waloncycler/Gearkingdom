import { products, createProductCard } from './script.js';

// Update product categories and ensure all products use the specified images
const updatedProducts = products.map(product => {
  const baseProduct = {
    ...product,
    images: [
      // 根据产品名称设置不同的多张图片
      ...(product.name === "Air Force" ? [
        `<img src="/resources/airforce1.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airforce2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Dunk" ? [
        `<img src="/resources/dunk1.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/dunk2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Air Cushion" ? [
        `<img src="/resources/aircushion1.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/aircushion2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Jordan Series" ? [
        `<img src="/resources/jordan.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/jordan2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/jordan3.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/jordan4.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/jordan5.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Emergency Lights" ? [
        `<img src="/resources/emergency_lights1.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/emergency_lights2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Solar Equipment" ? [
        `<img src="/resources/solar_equipment1.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/solar_equipment2.png" alt="${product.name} - 2" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      // 默认图片
      `<img src="/resources/default.png" alt="${product.name} - default" style="width:100%; height:100%; object-fit:contain;">`
    ]
  };

  // Categorize products
  switch (product.name) {
    case "Air Force":
    case "Dunk":
    case "Air Cushion":
    case "Jordan Series":
      return { ...baseProduct, category: "shoes" };
    case "Emergency Lights":
      return { ...baseProduct, category: "emergency" };
    case "Solar Equipment":
      return { ...baseProduct, category: "solar" };
    default:
      return { ...baseProduct, category: "solar" };
  }
});

// Filter products by category
function filterProductsByCategory(category) {
  return updatedProducts.filter(product => {
    if (category === 'shoes') {
      return product.category === 'shoes';
    } else if (category === 'emergency') {
      return product.category === 'emergency';
    } else {
      return product.category === 'solar';
    }
  });
}

// Update the product display when category is selected
function showCategoryProducts(category) {
  const categoryProducts = document.getElementById('categoryProducts');
  categoryProducts.innerHTML = '';
  
  const filteredProducts = filterProductsByCategory(category);
  filteredProducts.forEach(product => {
    categoryProducts.appendChild(createProductCard(product));
  });
}

// Handle category selection and visual feedback
function updateCategorySelection(selectedCard) {
  // Remove active class from all cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Add active class to selected card
  selectedCard.classList.add('active');
}

// Get category from URL parameters
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'shoes'; // Default to shoes if no category specified
}

// Initialize the page
function init() {
  const categoryCards = document.querySelectorAll('.category-card');
  const initialCategory = getCategoryFromURL();
  
  categoryCards.forEach(card => {
    const category = card.dataset.category;
    
    // Set initial active state based on URL parameter
    if (category === initialCategory) {
      card.classList.add('active');
    }
    
    card.addEventListener('click', () => {
      updateCategorySelection(card);
      showCategoryProducts(category);
      
      // Update URL without reloading page
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('category', category);
      window.history.pushState({}, '', newUrl);
    });
  });

  // Show initial category products
  showCategoryProducts(initialCategory);
}

// Initialize the page
init();