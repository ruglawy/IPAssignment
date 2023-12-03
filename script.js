class Item {
    constructor(imagePath, productName, price) {
        this.imagePath = imagePath;
        this.productName = productName;
        this.price = price;
    }
}

class User {
    constructor(name, username, password, email, gender, dateOfBirth) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.cart = [];
    }

}

class Trivia {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

const sampleUser = new User('Kareem Ramzi',
    'kareemramzi',
    '123',
    'kareem@ramzi.com',
    'Male',
    '1990-01-01');

var users = JSON.parse(localStorage.getItem('users')) || [];
var loggedInIndex = JSON.parse(localStorage.getItem('loggedInIndex'));
var questions = [
    new Trivia("Which vegetable is believed to make you see better?", "Carrot"),
    new Trivia("What is the tallest animal?", "Giraffe"),
    new Trivia("What is the yellow part of an egg called?", "Yolk"),
    new Trivia("Where are the Great Pyramids of Giza located?", "Egypt"),
    new Trivia("What does Na stand for on the periodic table?", "Sodium"),
    new Trivia("Who founded Microsoft?", "Bill Gates"),
];


function saveDataToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInIndex', JSON.stringify(loggedInIndex));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

try {
    document.getElementById('name').innerHTML = users[loggedInIndex].name;
    document.getElementById('email').innerHTML = users[loggedInIndex].email;
    document.getElementById('username').innerHTML = users[loggedInIndex].username;
} catch (e) {

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();
});

function loadCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (cartContainer) {
        cartContainer.innerHTML = '';

        const cart = users[loggedInIndex].cart;

        if (cart.length > 0) {
            var table = document.createElement('table');
            table.classList.add('cart-table');

            cart.forEach(function (item, index) {
                var row = table.insertRow();

                var cell1 = row.insertCell(0);
                cell1.innerHTML = `<img src="${item.imagePath}" alt="${item.productName}" width="100">`;

                var cell2 = row.insertCell(1);
                cell2.innerHTML = `
                    <div class="item-details">
                        <h3>${item.productName}</h3>
                        <p>${item.price}</p>
                        <button class="remove-from-cart">Remove</button>
                    </div>
                `;

                var removeButton = cell2.querySelector('.remove-from-cart');
                removeButton.addEventListener('click', function () {
                    var itemIndex = index;

                    cart.splice(itemIndex, 1);
                    saveDataToLocalStorage();
                    document.getElementById('cartnavbar').innerHTML = 'Cart (' + users[loggedInIndex].cart.length + ')';

                    loadCartItems();
                });
            });

            cartContainer.appendChild(table);

            var totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

            if (totalPrice > 0) {
                var totalText = document.createElement('h4');
                totalText.textContent = 'Total Price: $' + totalPrice.toFixed(2);
                cartContainer.appendChild(totalText);
            }

            var checkoutButton = document.createElement('button');
            checkoutButton.classList.add('checkout-button');
            checkoutButton.textContent = 'Checkout now!';
            checkoutButton.style.fontWeight = 'bold';
            checkoutButton.addEventListener('click', function () {
                alert('Checkout complete! Thank you for shopping with us!');
                users[loggedInIndex].cart = [];
                saveDataToLocalStorage();
                window.location.reload();
            });

            cartContainer.appendChild(checkoutButton);
            cartContainer.appendChild(checkoutButton);
        } else {
            cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var sampleUserFound = users.some(user => user.username === sampleUser.username);

if (!sampleUserFound) {
    users.push(sampleUser);
}
try {
    document.getElementById('welcomeh2').innerHTML = 'Welcome back, ' + users[loggedInIndex].name;
} catch (e) {

}
document.getElementById('cartnavbar').innerHTML = 'Cart (' + users[loggedInIndex].cart.length + ')';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password){
            loggedInIndex = i;
            saveDataToLocalStorage();
            window.location.href = "store.html";

            return;
        }
    }

    alert("Invalid credentials, please try again.");
    document.getElementById('loginForm').reset();
}

function register() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Invalid name. Please enter a name with only alphabets.');
        return;
    }

    if (!dob) {
        alert('Please insert a valid Date of Birth');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Invalid email. Please enter a valid email address.');
        return;
    }

    if (password.length < 4) {
        alert('Invalid password. Password must be at least 4 characters.');
        return;
    }

    if (/\d/.test(name)) {
        alert('Invalid name. Please enter a name without numbers.');
        return;
    }

    const newUser = new User(name, username, password, email, gender, dob);
    users.push(newUser);

    saveDataToLocalStorage();

    console.log('Registered User:', newUser);
    console.log(users);

    alert('Registration successful! Welcome to Shop Addict.');
    document.getElementById('registrationForm').reset();
    window.location.href = "index.html";
}

function logout() {
    loggedInIndex = -1;
    saveDataToLocalStorage();
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            var productCard = button.closest('.card');
            var productName = productCard.querySelector('h3').innerText;
            var productImage = productCard.querySelector('img').src;
            var productPrice = productCard.querySelector('p').innerText;
            var newItem = new Item(productImage, productName, productPrice);

            users[loggedInIndex].cart.push(newItem);
            document.getElementById('cartnavbar').innerHTML = 'Cart (' + users[loggedInIndex].cart.length + ')';
            saveDataToLocalStorage();
            updateCartCount();
            alert('Item added to cart!');
        });
    });

    function updateCartCount() {
        var cartCountElement = document.querySelector('#cart-count');
        if (cartCountElement) {
            cartCountElement.innerText = users[loggedInIndex].cart.length;
        }
    }
});

function submitRequest() {
    alert("Request submitted successfully!");
}

function checkAnswer(answer, correctAnswer){
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        alert('Correct! Enjoy your discount by using code "SAVEBIG" upon checkout!');
    } else {
        alert('Incorrect answer :(, please try again!');
    }
    location.reload();
}

function filterProducts(category) {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        if (category === 'All' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

