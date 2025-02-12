// 直接定义产品数据和图片处理函数
const PRODUCT_CONFIG = {
  shoes: [
    {
      id: 1,
      name: "Air Force",
      description: "经典运动鞋，舒适耐用",
      images: [
        "./resources/airforce.png",
        "./resources/airforce2.jpeg", 
        "./resources/airforce3.jpeg"
      ]
    },
    {
      id: 2,
      name: "Dunk",
      description: "街头潮流必备款", 
      images: [
        "./resources/dunk.png",
        "./resources/dunklow.png"
      ]
    },
    {
      id: 3,
      name: "Air Cushion",
      description: "高科技缓震技术",
      images: [
        "./resources/aircushion.png"
      ]
    },
    {
      id: 4,
      name: "Jordan Series",
      description: "篮球运动经典系列", 
      images: [
        "./resources/airjordan.png",
        "./resources/airjordan2.jpeg",
        "./resources/airjordan3.jpeg", 
        "./resources/airjordan4.jpeg",
        "./resources/airjordan5.jpeg"
      ]
    }
  ],
  emergency: [
    {
      id: 5,
      name: "Emergency Lights",
      description: "应急照明设备",
      images: [
        "./resources/emlight.png",
        "./resources/emlight2.jpg"
      ]
    }
  ],
  solar: [
    {
      id: 6,
      name: "Solar Equipment",
      description: "环保太阳能设备", 
      images: [
        "./resources/solarlight.png",
        "./resources/walllamp.png"
      ]
    }
  ]
};

// 创建产品卡片的函数
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  // 使用第一张图片作为展示
  const firstImage = product.images[0];
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${firstImage}" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    </div>
  `;
  
  return card;
}

// 按类别过滤产品
function filterProductsByCategory(category) {
  return PRODUCT_CONFIG[category] || [];
}

// 显示更多产品图像
function showMoreProductImages(product) {
  const moreImagesContainer = document.getElementById('moreImagesContainer');
  moreImagesContainer.innerHTML = ''; 

  if (product.images && product.images.length > 0) {
    product.images.forEach(imageSrc => {
      const imgElement = document.createElement('img');
      imgElement.src = imageSrc;
      imgElement.alt = product.name;
      imgElement.style.width = '100%';
      imgElement.style.maxWidth = '300px';
      imgElement.style.margin = '10px';
      imgElement.style.objectFit = 'contain';
      moreImagesContainer.appendChild(imgElement);
    });
  } else {
    moreImagesContainer.innerHTML = '<p>没有可用的产品图片。</p>';
  }
}

// 显示分类产品
function showCategoryProducts(category) {
  const categoryProducts = document.getElementById('categoryProducts');
  categoryProducts.innerHTML = '';
  
  const filteredProducts = filterProductsByCategory(category);
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    
    productCard.addEventListener('click', () => {
      showMoreProductImages(product);
    });
    
    categoryProducts.appendChild(productCard);
  });
}

// 更新类别选择
function updateCategorySelection(selectedCard) {
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });
  
  selectedCard.classList.add('active');
}

// 从 URL 获取类别
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'shoes';
}

// 初始化页面
function init() {
  const categoryCards = document.querySelectorAll('.category-card');
  const initialCategory = getCategoryFromURL();
  
  categoryCards.forEach(card => {
    const category = card.dataset.category;
    
    if (category === initialCategory) {
      card.classList.add('active');
    }
    
    card.addEventListener('click', () => {
      updateCategorySelection(card);
      showCategoryProducts(category);
      
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('category', category);
      window.history.pushState({}, '', newUrl);
    });
  });

  // 显示初始类别产品
  showCategoryProducts(initialCategory);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', init);

// 导出函数（可选）
export { 
  PRODUCT_CONFIG, 
  createProductCard, 
  filterProductsByCategory, 
  showMoreProductImages 
};