let cart = document.querySelectorAll('.add-cart');

let products = [ // array containing each an object of each item
    {
        name: 'Bananas',
        tag: 'bananas',
        price: 10,
        inCart: 0
    },
    {
        name: 'Apple Single',
        tag: 'apple single',
        price: 0.50,
        inCart: 0
    },
    {
        name: 'Avocado',
        tag: 'avocado',
        price: 1.00,
        inCart: 0
    }
];

for (let i = 0; i < cart.length; i++) {
    
    cart[i].addEventListener('click', () => {  // adds each selected item to cart, stored in cartNumbers() function
        console.log("Added to Cart");
        cartNumbers(products[i]);
        totalCost(products[i]);
    })

}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers'); // stores input in Local Storage section in 
                                                                //Application section of Chrome Inspector
    
    productNumbers = parseInt(productNumbers); // parseInt method is used to convert string input of 
                                                //each selected item in Local Storage to number
    
    if (productNumbers) {
    
    localStorage.setItem('cartNumbers', productNumbers + 1); // increments one to the productNumbers variable
                                                            // in Local Storage inside the cartNumbers() function
    document.querySelector('.cart span').textContent = productNumbers + 1; // increments item to cart displayed on screen

    } else {
        
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) { //Matches each cart item clicked with approparite object in products array above
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My Cart Items are", cartItems);

    if(cartItems !== null) {

        if(cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems, // spread operator takes everything that was already selected and adds it to the newly selected products
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems)); // sets each item in Local Storage as a JSON string format
                                                                       // rather than as a JavaScript object
}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');

    console.log("My Cart cost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost !== null) {
        cartCost = parseInt(cartCost); // totalCost is incremented numerically as cartCost is coverted to a number type
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }

}

function onLoadCartNumbers() { // checks the Local Storage and adds the items to the cart displayed on the screen
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); // in JSON format
    let productContainer = document.querySelector('.products');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += 
            `<div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price}.00
            </div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML += 
            `<div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">
                    ${cartCost}
                </h4>
            </div>
            `;
    }
}

onLoadCartNumbers(); //checks cart displayed on the screen and updates when page is refreshed
displayCart();