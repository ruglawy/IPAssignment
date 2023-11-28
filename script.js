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

    if (!/^[a-zA-Z]+$/.test(name)) {
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
}

function logout() {
    loggedInIndex = -1;
    saveDataToLocalStorage();
    window.location.href = "login.html";
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

