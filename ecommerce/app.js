const closeCartEl = document.querySelector(".close-cart");
const cartIconEl = document.querySelector(".cart-icon");
const cartEl = document.querySelector(".cart");
const cartLengthEl = document.querySelector(".cart-length");
const productsEl = document.querySelector(".products-content");
const cartProductsEl = document.querySelector(".cart-products");
const totalItemsEl = document.querySelector(".totalItems");
const totalPriceEl = document.querySelector(".totalPrice")
const checkoutEl = document.querySelector(".checkout")

//Opening the cart
cartIconEl.addEventListener("click",() => {
    cartEl.classList.add("active");
});

//Closing the cartEl
closeCartEl.addEventListener("click", () => {
    cartEl.classList.remove("active");
});

//render Products
function renderProducts() {
    productsEl.innerHTML = "";
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        const {image,price,id,title} = product;
        productDiv.innerHTML = `
        <div class="product">
        <img src="${image}" alt="image" class="product-image">
        <h4 class="product-title">${title}</h4>
        <h4 class="product-price">Price: $${price}</h4>
        <button class="product-btn" onClick="addToCart(${id})">Add To Cart</button>
    </div>
        `;
    productsEl.appendChild(productDiv);
    })
}
renderProducts();

// Our cart//
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

// render cart products
function renderCartProducts() {
    cartProductsEl.innerHTML = "";
    cart.forEach((product) => {
        cartProductsEl.innerHTML += `
        <div class="cart-product">
        <div class="cart-section1">
        <img src="${product.image}" alt="image" class="cart-image">
        <h4 class="cart-product-title">${product.title}</h4>
        </div>
        <div class="cart-section2">
        <div class="numberOfUnits>
        <div class="operationEl" onclick="changeNumberOfUnits('minus', ${product.id})">-</div>
        <div class="number">${product.numberOfUnits}</div>
        <div class="operation" onclick="changeNumberOfUnits('plus', ${product.id})">+</div>
            <h4 class="cart-product-price">Price: $${product.price}</h4>
        </div>
        <i class='bx bx-trash cart-product-btn trash' onclick="removeFromCart(${product.id})"></i>
    </div>
</div>
        `;
    });
}
renderCartProducts()

//add to cart
function addToCart(id) {
    //check if the item already exists//
    if(cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id);
        cart.push( {
            ...item,
            numberOfUnits:1,
        })
    };
    updateCart()
}

// remove from cart
function removeFromCart(id) {
    cart = cart.filter((product) => product.id !== id);
    updateCart()
}


// Update Cart
function updateCart() {
    renderCartProducts();
    renderTotal();
    localStorage.setItem("cart",JSON.stringify(cart))
}
updateCart(); 

//Change number Of Units
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.instock) {
          numberOfUnits++;
        }
      }
  
      return {
        ...item,
        numberOfUnits,
      };
    });
  
    updateCart();
  }

// render total Price 
function renderTotal() {
    let totalPrice = 0,
    totalItems = 0;

    totalItems = cart.length;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
  });

  totalPriceEl.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
  totalItemsEl.innerHTML = `Total : ${totalItems}`;

   // How many Items are in the cart
  cartLengthEl.innerHTML = `Item(s) in Cart : ${cart.length}`;

}


//Checkout
checkoutEl.addEventListener("click", () => {
    alert("Thank You for shopping with Us!")
    cart = [];
    updateCart()
})

