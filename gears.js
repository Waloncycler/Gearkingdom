import { products, createProductCard } from './script.js';

// Update product categories and ensure all products use the specified image
const updatedProducts = products.map(product => {
  const baseProduct = {
    ...product,
    image: `<img src="Screenshot 2025-01-16 at 16.31.19.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
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