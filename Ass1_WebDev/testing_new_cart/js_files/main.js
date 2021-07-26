let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        itemId: 1,
        name: 'Face 1',
        tag: 'face1',
        price: 10,
        inCart: 0
    },
    {
        itemId: 2,
        name: 'Face 2',
        tag: 'face2',
        price: 12,
        inCart: 0
    },
    {
        itemId: 3,
        name: 'Face 3',
        tag: 'face3',
        price: 14,
        inCart: 0
    },
    {
        itemId: 4,
        name: 'Face 4',
        tag: 'face4',
        price: 15,
        inCart: 0
    },
];

// var result = products.itemId.map(function(productItemId) {
//     return productItemId.itemId;
// });

// console.log('result');

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    // cartItems = JSON.parse(cartItems);
    // console.log('productsInCart');

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
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

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
        // console.log('totalCost function ' + cart + ' & ' + product.price);
    } else if(cart != null) {
        
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
            `<div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="../images/${item.tag}.png" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price}.00</div>
            <div class="quantity">
            <ion-icon class="decrease" name="remove-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="add-circle"></ion-icon>
            </div>
            <div class="total">$${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
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

        increaseButtons[i].addEventListener('click', () => {
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

function onPage() {

}


onLoadCartNumbers();
displayCart();


// let carts = document.querySelectorAll('.add-cart');

// let products = [
//     {
//         itemId: 0001,
//         name: 'Face 1',
//         tag: 'face1',
//         price: 10,
//         inCart: 0
//     },
//     {
//         itemId: 0002,
//         name: 'Face 2',
//         tag: 'face2',
//         price: 12,
//         inCart: 0
//     },
//     {
//         itemId: 0003,
//         name: 'Face 3',
//         tag: 'face3',
//         price: 14,
//         inCart: 0
//     },
//     {
//         itemId: 0004,
//         name: 'Face 4',
//         tag: 'face4',
//         price: 15,
//         inCart: 0
//     },
// ];

// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products[i]);
//         totalCost(products[i]);
//     });
// }

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if (productNumbers) {
//         document.querySelector('.cart span').textContent = productNumbers;
//     }
// }

// function cartNumbers(product) {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);
//         document.querySelector('.cart span').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.cart span').textContent = 1;
//     }

//     setItems(product);
// }

// function setItems(product) {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if (cartItems != null) {
//         if (cartItems[product.tag] == undefined) {
//             cartItems = {
//                 ...cartItems,
//                 [product.tag]: product
//             }
//         }
//         cartItems[product.tag].inCart += 1;
//     } else {
//         product.inCart = 1;
//         cartItems = {
//             [product.tag]: product
//         }
//     }

//     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
// }

// function totalCost(product) {
//     let cartCost = localStorage.getItem('totalCost');

//     if(cartCost != null) {
//     cartCost = parseInt(cartCost);
//     localStorage.setItem('totalCost', cartCost + product.price);
//     } else {
//         localStorage.setItem('totalCost', product.price);
//     }
// }

// function displayCart() {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     let productContainer = document.querySelector('.products');

//     if (cartItems && productContainer) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item => {
//             productContainer.innerHTML += `
//                 <div class="product">
//                     <ion-icon name="close-circle"></ion-icon>
//                     <img src="../images/${item.tag}.png" class="cartImg">
//                     <span>${item.name}</span>
//                 </div>
//                 <div class="price">$${item.price}</div>
//                 <div class="quantity">
//                     <ion-icon class="decrease" name="caret-back-circle"></ion-icon>
//                     <span>${item.inCart}</span>
//                     <ion-icon name="caret-forward-circle"></ion-icon>
//                 </div>
//             `;
//         });
//     }
// }

// onLoadCartNumbers();
// displayCart();