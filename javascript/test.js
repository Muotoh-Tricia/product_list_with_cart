let products = [];
let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch("../data.json");
        if (!response.ok) {
            throw new Error("Product not found");
        }
        products = await response.json();
        displayProduct();
    } catch (error) {
        console.log("Data error", error);
    }
}

function displayProduct() {
    const productContainer = document.getElementById("product-Container");
    productContainer.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = `
            <div class="card-container">
                <div class="card-content">
                    <img src="${product.image.desktop}" alt="${product.name}">
                    <button class="p-2 rounded-5 ps-4 pe-3 add-to-cart-btn">
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

        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        const iterationBtn = productCard.querySelector('.iteration-btn');
        const quantityDisplay = productCard.querySelector('.product-quantity');

        // Track the quantity of the current product separately
        let currentQuantity = 0;

        addToCartBtn.addEventListener('click', () => {
            addToCartBtn.style.display = 'none';
            iterationBtn.style.display = 'block';

            // currentQuantity = 1;
            quantityDisplay.textContent = currentQuantity;

            // Add product to cart
            cart.push({ ...product, quantity: currentQuantity });
            updateCart();
        });

        const decrementButton = productCard.querySelector('.decreament-btn');
        const incrementButton = productCard.querySelector('.increament-btn');

        decrementButton.addEventListener('click', () => {
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex !== -1 && cart[existingProductIndex].quantity > 0) {
                cart[existingProductIndex].quantity--;
                currentQuantity = cart[existingProductIndex].quantity;
                quantityDisplay.textContent = currentQuantity;

                // If quantity drops to 0, remove the product from cart
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
                // Increment quantity in the cart
                cart[existingProductIndex].quantity++;
                currentQuantity = cart[existingProductIndex].quantity;
            } else {
                // If not in the cart, add it
                currentQuantity++;
                cart.push({ ...product, quantity: currentQuantity });
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
