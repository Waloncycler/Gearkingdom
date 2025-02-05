import { products, createProductCard } from './script.js';

// Update product categories and ensure all products use the specified images
const updatedProducts = products.map(product => {
  const baseProduct = {
    ...product,
    images: [
      // 根据产品名称设置不同的多张图片
      ...(product.name === "Air Force" ? [
        `<img src="/resources/airforce.png" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airforce2.jpeg" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airforce3.jpeg" alt="${product.name} - 1" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Dunk" ? [
        `<img src="/resources/dunk.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/dunklow.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Air Cushion" ? [
        `<img src="/resources/aircushion.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Jordan Series" ? [
        `<img src="/resources/airjordan.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airjordan2.jpeg" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airjordan3.jpeg" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airjordan4.jpeg" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/airjordan5.jpeg" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Emergency Lights" ? [
        `<img src="/resources/emlight.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/emlight2.jpg" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
      ] : []),
      ...(product.name === "Solar Equipment" ? [
        `<img src="/resources/solarlight.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`,
        `<img src="/resources/walllamp.png" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">`
      ] : [])
    ]
  };

  // Categorize products
  switch (product.name) {
    case "Air Force":
      return { ...baseProduct, category: "shoes" };
    case "Dunk":
      return { ...baseProduct, category: "shoes" };
    case "Air Cushion":
      return { ...baseProduct, category: "shoes" };
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

// 处理点击事件以显示更多产品图像
function showMoreProductImages(product) {
  const moreImagesContainer = document.getElementById('moreImagesContainer');
  moreImagesContainer.innerHTML = ''; // 清空现有内容

  // 添加产品图像
  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      const imgElement = document.createElement('div');
      imgElement.innerHTML = image; // 使用产品图像的 HTML
      moreImagesContainer.appendChild(imgElement);
    });
  } else {
    // 如果没有图片，显示一个默认消息
    moreImagesContainer.innerHTML = '<p>没有可用的产品图片。</p>';
  }
}

// 更新 `showCategoryProducts` 函数以添加点击事件
function showCategoryProducts(category) {
  const categoryProducts = document.getElementById('categoryProducts');
  categoryProducts.innerHTML = '';
  
  const filteredProducts = filterProductsByCategory(category);
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    
    // 添加点击事件以显示更多图像
    productCard.addEventListener('click', () => {
      showMoreProductImages(product);
    });
    
    categoryProducts.appendChild(productCard);
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