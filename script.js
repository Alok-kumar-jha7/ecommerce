document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const categoriesToggle = document.querySelector('.categories-toggle');
  const categoriesDropdown = document.getElementById('categories-dropdown');
  const menuIcon = document.querySelector('.menu');
  const navItems = document.querySelector('.navbar .nav ul');
  const cartIcon = document.querySelector('.cart');
  const body = document.querySelector('body');
  const cartCount = document.getElementById('cart-count');
  const okBtn = document.getElementById("butn");
  const openPop = document.getElementById("popup");
  const closeCartBtn = document.querySelector('.close');
  const listCart = document.querySelector('.listcart');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  let cart = [];

  // Fetch products and initialize app
  const initApp = () => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        // You can handle the product data here if needed
        console.log(data);
      });
  };
  initApp();

  // Toggle cart visibility
  const toggleCart = () => {
    body.classList.toggle('showcart');
  };

  cartIcon.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);

  // Add items to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productImg = button.closest('.product').querySelector('img').src;

      cart.push({ name: productName, price: productPrice, imgSrc: productImg });
      cartCount.textContent = cart.length;
      updateCartDisplay();
      openPop.classList.add("open-popup");
    });
  });

  // Update cart display
  function updateCartDisplay() {
    listCart.innerHTML = ''; // Clear existing content

    if (cart.length === 0) {
      listCart.innerHTML = '<p>No items in the cart.</p>';
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
          <div class="image">
            <img src="${item.imgSrc}" alt="${item.name}">
          </div>
          <div class="name">${item.name}</div>
          <div class="totalprice">$${item.price.toFixed(2)}</div>
       
        `;
        listCart.appendChild(cartItem);
      });
      
    }
  }


  // Close popup on OK button click
  okBtn.addEventListener("click", () => {
    openPop.classList.remove("open-popup");
  });

  // Toggle categories dropdown
  categoriesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    categoriesDropdown.classList.toggle('active');
  });

  // Toggle mobile nav items
  menuIcon.addEventListener('click', () => {
    navItems.classList.toggle('active');
    menuIcon.classList.toggle('active');
  });

  // Close dropdowns if clicked outside
  document.addEventListener('click', (e) => {
    if (!categoriesDropdown.contains(e.target) && !categoriesToggle.contains(e.target)) {
      categoriesDropdown.classList.remove('active');
    }

    if (!navItems.contains(e.target) && !menuIcon.contains(e.target)) {
      navItems.classList.remove('active');
      menuIcon.classList.remove('active');
    }
  });
});
