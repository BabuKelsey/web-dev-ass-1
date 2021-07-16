let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Face 1',
        tag: 'face1',
        price: 10,
        inCart: 0,
    },
    {
        name: 'Face 2',
        tag: 'face2',
        price: 12,
        inCart: 0,
    },
    {
        name: 'Face 3',
        tag: 'face3',
        price: 14,
        inCart: 0,
    },
    {
        name: 'Face 4',
        tag: 'face4',
        price: 15,
        inCart: 0,
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
}

onLoadCartNumbers();