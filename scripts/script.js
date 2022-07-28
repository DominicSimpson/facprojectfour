let carts = document.querySelectorAll('.add-cart');

let products = [ // array containing an object of each item

    {
        name: 'Apple Single',
        tag: "applesingle",
        price: 0.50,
        inCart: 0 // initalised to zero with every item
    },
    
    {
        name: 'Apples packet of six',
        tag: 'applespacketsix',
        price: 2.00,
        inCart: 0
    },
    
    {
        name: 'Apricots packet of six',
        tag: 'apricotspacketsix',
        price: 2.50,
        inCart: 0
    },
    
    {
        name: 'Avocado single',
        tag: 'avocadosingle',
        price: 2.50,
        inCart: 0
    }, 
];

for(let i=0; i< carts.length; i++) { // runs a for loop and updates cart numbers and total cost with items from array above
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() { // checks the Local Storage and adds the items to the cart displayed on the screen

    let productNumbers = localStorage.getItem('cartNumbers'); 
    
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {

    let productNumbers = localStorage.getItem('cartNumbers'); // stores input in Local Storage section in 
                                                              //Application section of Chrome Inspector
    
    productNumbers = parseInt(productNumbers); // parseInt method is used to convert string input of 
                                               //each selected item in Local Storage to number

    let cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems); // parseInt method is applied to JSON format

    if (action) {
        
        localStorage.setItem("cartNumbers", productNumbers - 1); // decrements one to the productNumbers variable
                                                                // in Local Storage inside the cartNumbers() function
        document.querySelector('.cart span').textContent = productNumbers - 1; // increments item to cart displayed on screen

        console.log("action running");
    
    } else if (productNumbers) {

        localStorage.setItem("cartNumbers", productNumbers + 1); // increments one to the productNumbers variable
        // in Local Storage inside the cartNumbers() function
        document.querySelector('.cart span').textContent = productNumbers + 1;
    
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) { //Matches each cart item clicked with appropriate object in products array

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems, // spread operator takes everything that was already selected and adds 
                            //it to the newly selected products
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems)); // sets each item in Local Storage as a JSON string format
                                                                      // rather than as a JavaScript object
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {

        cart = parseInt(cart); // totalCost is incremented numerically as cartCost is coverted to a number type

        localStorage.setItem("totalCost", cart - product.price); //product price is deducted from cart
    
    } else if (cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">&#163;${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">&#163;${item.inCart * item.price}0</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">&#163;${cart}00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease'); // gets decrease item button on screen and stores in variable
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0; // initialises variable
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) { // Runs a for loop that either increases or decreases quantity of items
                                                    // depending on which buttons the user presses
        
        decreaseButtons[i].addEventListener('click', () => { // decreases quantity of items on button click
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => { // increases quantity of items on button click
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers(); //checks cart displayed on the screen and updates when page is refreshed
displayCart();
