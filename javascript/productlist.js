let values = 0;
let cart = [];
let products = [];


//function to fetch data
async function fetchProducts() {
  try {
    const response = await fetch("../data.json");
    console.log(response);
    if (!response.ok) {
      throw new Error("Product not found");
    }

    products = await response.json();
    console.log(products);
    displayProduct(); // Call displayProduct here after products are fetched
  } catch (error) {
    console.log("Data error", error);
  }
}

fetchProducts();

//function to display data
function displayProduct() {
  const productContainer = document.getElementById("product-Container");
  productContainer.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
        <div class="card-container">
            <div class="card-content">
                <img src="${product.image.desktop}" alt="${product.name}">
                <button class="p-2 rounded-5 ps-4 pe-3 add-to-cart-btn">
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='20' fill='none' viewBox='0 0 21 20'%3E%3Cg fill='%23C73B0F' clip-path='url(%23a)'%3E%3Cpath d='M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z'/%3E%3Cpath d='M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M.333 0h20v20h-20z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E" alt="SVG Image">
                    <span>Add to Cart</span>
                </button>

                <button class="iteration-btn" style="display:none;">
                    <span class="decreament-btn fs-4">-</span>
                    <span class="product-quantity p-4 fs-5">0</span>
                    <span class="increament-btn fs-4">+</span>
                </button>

                <p class="product-category">${product.category}</p> 
                <p class="product-name fw-bolder">${product.name}</p> 
                <p class="product-price text-danger fw-bold">$${product.price.toFixed(2)}</p>
            </div>
        </div>`;

    // Add event listener for the "Add to Cart" button
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    const iterationBtn = productCard.querySelector('.iteration-btn');
    const quantityDisplay = productCard.querySelector('.product-quantity');

    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.style.display = 'none';  // Hide the Add to Cart button
        iterationBtn.style.display = 'block';  // Show the iteration button

        let currentQuantity = 0;
        quantityDisplay.textContent = currentQuantity;

        //Add product to cart
        cart.push({...product, quantity: currentQuantity});
        updateCart;
    });

    const decrementButton = productCard.querySelector('.decreament-btn');
    const incrementButton = productCard.querySelector('.increament-btn');

    decrementButton.addEventListener('click', () => {
      const existingProductIndex = cart.findIndex(item => item.name === product.name);

      if (existingProductIndex !== -1 && cart [existingProductIndex].quantity > 0) {
        cart [existingProductIndex].quantity --;
        currentQuantity = cart[existingProductIndex].quantity;
        quantityDisplay.textContent = currentQuantity;

        //if quantity drops to 0, remove the product from cart
        if (currentQuantity === 0) {
          cart.splice(existingProductIndex, 1);
          addToCartBtn.style.display = 'block';
          iterationBtn.style.display = 'none';
        }
        updateCart();
      }
    });

    incrementButton.addEventListener('click', () => {
      const existingProductIndex = cart.findIndex(item => item.name === product.name);

      if (existingProductIndex !== -1) {
        //increment quantity in the cart
        cart[existingProductIndex].quantity++;
        currentQuantity = cart[existingProductIndex].quantity;
      } else {
        //if not in the cart, add it
        currentQuantity++;
        cart.push({...product, quantity: currentQuantity});
      }

      quantityDisplay.textContent = currentQuantity;
      updateCart();
    });

    productContainer.appendChild(productCard);
});

}

function updateCart() {
  const cartItemCount = document.getElementById('cart-item-count');
  const orderList = document.getElementById('order-list');
  const totalPriceDisplay = document.getElementById('total-price');

  orderList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
      total += item.price * item.quantity;
      orderList.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>`;
  });

  cartItemCount.textContent = `${cart.length} items`;
  totalPriceDisplay.textContent = `$${total.toFixed(2)}`;

  // Show appropriate modal
  if (cart.length > 0) {
      document.getElementById('active-cart-modal').style.display = 'block';
      document.getElementById('empty-cart-modal').style.display = 'none';
  } else {
      document.getElementById('empty-cart-modal').style.display = 'block';
      document.getElementById('active-cart-modal').style.display = 'none';
  }
}

fetchProducts();


// Function to confirm order
// const confirmOrderButton = document.querySelector('.confirm-order-modal');
// confirmOrderButton.addEventListener('click', function() {

// })


// order-confirmation
const confirmOrderButton = document.querySelector('.confirm-btn');
const orderConfirmationModal = document.getElementById('#confirm-order-modal');
const startNewButton = document.querySelector('.start-new-order-btn');

confirmOrderButton.addEventListener('click', function() {
  // Display confirmation modal
  orderConfirmationModal.style.display = 'block';
});

startNewButton.addEventListener('click', function() {
  // Hide the confirmation modal
  orderConfirmationModal.style.display = 'none';

  // Clear the cart and reset the UI
  // cart = [];
  // updateCart();
});




  // Attach event listeners to buttons after products are displayed
  // const decrementButtons = document.querySelectorAll('.decreament-btn');
  // const incrementButtons = document.querySelectorAll('.increament-btn');
  // const quantityDisplays = document.querySelectorAll('.product-quantity');

  // decrementButtons.forEach((btn, index) => {
  //   btn.addEventListener('click', function () {
  //     if (values > 0) {
  //       values--;
  //       quantityDisplays[index].innerHTML = values;
  //       console.log(values);
  //     }
  //   });
  // });

  // incrementButtons.forEach((btn, index) => {
  //   btn.addEventListener('click', function () {
  //     values++;
  //     quantityDisplays[index].innerHTML = values;
  //     console.log(values);
  //   });
  // });

// Adding a toggle to the add-to-cart-btn and the iteration btn
// const button = document.querySelector('button');
// const iterationButton = document.querySelector('iteration-btn');

// button.addEventListener('click', function() {
//   if (button )
// })