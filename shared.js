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

const sampleItem = new Item('images/blacktshirt.jpg',
    'Black T-Shirt',
    17.99);

const sampleUser = new User('Kareem Ramzi',
    'kareemramzi',
    '123',
    'kareem@ramzi.com',
    'Male',
    '1990-01-01');

var users = JSON.parse(localStorage.getItem('users')) || [];
var loggedInIndex = JSON.parse(localStorage.getItem('loggedInIndex'));


function saveDataToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInIndex', JSON.stringify(loggedInIndex));
}

