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
            });

            cartContainer.appendChild(checkoutButton);
            cartContainer.appendChild(checkoutButton);
        } else {
            cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        }
    }
}



