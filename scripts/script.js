let carts = document.querySelectorAll('.add-cart'); // grabs every item that's been added to cart

let products = [ // array containing an object of each item

    {
        name: 'Apple Single',
        tag: "applesingle",
        price: 0.50,
        inCart: 0 // initalised to zero with every item
    },
    
    {
        name: 'Apples packet six',
        tag: 'applespacketsix',
        price: 2.50,
        inCart: 0
    },
    
    {
        name: 'Apricots packet six',
        tag: 'apricotspacketsix',
        price: 2.50,
        inCart: 0
    },
    
    {
        name: 'Avocado single',
        tag: 'avocadosingle',
        price: 0.80,
        inCart: 0
    }, 

    {
        name: 'Avocados packet four',
        tag: 'avocadospacketfour',
        price: 3.50,
        inCart: 0
    }, 

    {
        name: 'Bananas bunch five',
        tag: 'bananasbunchfive',
        price: 1.20,
        inCart: 0
    },

    {
        name: 'Blackberries packet',
        tag: 'blackberriespacket',
        price: 2.25,
        inCart: 0
    },

    {
        name: 'Blueberries packet',
        tag: 'blueberriespacket',
        price: 2.25,
        inCart: 0
    }, 

    {
        name: 'Cherries packet',
        tag: 'cherriespacket',
        price: 3.75,
        inCart: 0
    },

    {
        name: 'Coconut',
        tag: 'coconut',
        price: 3.00,
        inCart: 0
    }, 

    {
        name: 'Grapefruit',
        tag: 'grapefruitpink',
        price: 0.75,
        inCart: 0
    },

    {
        name: 'Grapes bunch',
        tag: 'grapes',
        price: 2.15,
        inCart: 0
    },

    {
        name: 'Lemon single',
        tag: 'lemonsingle',
        price: 0.30,
        inCart: 0
    },

    {
        name: 'Lemons bunch four',
        tag: 'lemonsbunchfour',
        price: 1.99,
        inCart: 0
    },

    {
        name: 'Lime single',
        tag: 'limesingle',
        price: 0.30,
        inCart: 0
    },

    {
        name: 'Limes bunch five',
        tag: 'limesbunchfive',
        price: 1.75,
        inCart: 0
    },

    {
        name: 'Mango',
        tag: 'mango',
        price: 3.00,
        inCart: 0
    },

    {
        name: 'Orange single',
        tag: 'orange',
        price: 0.50,
        inCart: 0
    },

    {
        name: 'Oranges bunch six',
        tag: 'orangesbunchsix',
        price: 3.10,
        inCart: 0
    },

    {
        name: 'Passionfruit',
        tag: 'passionfruit',
        price: 0.85
    },

    {
        name: 'Peach single',
        tag: 'peacesingle',
        price: 0.70
    },

    {
        name: 'Peaches packet four',
        tag: 'peacesingle',
        price: 3.99
    },

    {
        name: 'Pear single',
        tag: 'pearsingle',
        price: 0.50
    },

    {
        name: 'Pears packet four',
        tag: 'pearspacketfour',
        price: 2.50
    },

    {
        name: 'Pineapple',
        tag: 'pineapplelarge',
        price: 1.85
    },

    {
        name: 'Plums packet',
        tag: 'plumspacket',
        price: 2.25
    },

    {
        name: 'Raspeberries packet',
        tag: 'raspberriespacket',
        price: 3.25
    },

    {
        name: 'Strawberries packet',
        tag: 'strawberriespacket',
        price: 2.75
    }

];

for(let i=0; i< carts.length; i++) {
    console.log('carts',carts);
    // runs a for loop and updates cart numbers and total cost with items from array above
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
    if(cartItems){
        cartItems = JSON.parse(cartItems); // cartItems products are now in JSON format
    }
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
                                                                      // JSON is human readable text that stores and 
                                                                      // transmits data objects consisting of attribute-value
                                                                      // pairs and arrays
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
    
    console.log('cartItems',cartItems);
    
    if(cartItems){
        cartItems = JSON.parse(cartItems);
    }

    let cart = localStorage.getItem("totalCost");
    
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    let total =  0 ;
    
    if( cartItems && productContainer ) { // generates items on Cart page
        
        productContainer.innerHTML = '';
        
        Object.values(cartItems).map( (item, index) => {
            console.log('item.inCart',parseInt(item.price));
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">&#163;${item.price.toFixed(2)}</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">&#163;${item.inCart * item.price}</div>`;
            total += item.inCart * item.price;
        });

        productContainer.innerHTML += ` 
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total:</h4>
                <h4 class="basketTotal">&#163;${total.toFixed(2)}</h4>    
            </div>`
                                                // formats the total into decimal to account for how the prices 
                                                // are displayed in cart
        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {

    let decreaseButtons = document.querySelectorAll('.decrease'); // gets decrease item button on screen and stores in variable
    
    let increaseButtons = document.querySelectorAll('.increase'); // gets increase item button on screen and stores in variable
    
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
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[(productName)].inCart);
            
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
