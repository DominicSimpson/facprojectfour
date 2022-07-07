let cart = document.querySelectorAll('.add-cart');

let products = [ // array containing each an object of each item
    {
        name: 'Bananas',
        tag: 'bananas',
        price: 10,
        inCart: 0
    },
    {
        name: 'Apples',
        tag: 'apples',
        price: 10,
        inCart: 0
    },
    {
        name: 'Avocados',
        tag: 'avocados',
        price: 10,
        inCart: 0
    }
];

for (let i = 0; i < cart.length; i++) {
    
    cart[i].addEventListener('click', () => {  // adds each selected item to cart, stored in cartNumbers() function
        console.log("Added to Cart");
        cartNumbers(products[i]);
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

function onLoadCartNumbers() { // checks the Local Storage and adds the items to the cart displayed on the screen
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

onLoadCartNumbers(); //checks cart displayed on the screen and updates when page is refreshed