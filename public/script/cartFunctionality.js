document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
        const productId = e.target.getAttribute('data-id');
        const title = e.target.getAttribute('data-title');
        const price = e.target.getAttribute('data-price');
        const image = e.target.getAttribute('data-image');

        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: productId,
                    title: title,
                    price: price,
                    image: image,
                }),
            });

            if (response.ok) {
                alert('Product added to cart!');
            } else {
                alert('Please login for adding the product to cart.');
            }
        } catch (err) {
            console.error('Error adding product to cart:', err);
        }
    });
});



//updating cart quantity
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.getAttribute('data-product-id');
        const action = event.target.getAttribute('data-action');
        const quantityElement = document.querySelector(`#quantity-${productId}`);
        let quantity = parseInt(quantityElement.textContent);

        if (action === 'increase') {
            quantity++;
        } else if (action === 'decrease') {
            quantity--;
            if (quantity < 1) {
                alert('Quantity cannot be less than 1.');
                return;
            }
        }

        // Update quantity in the UI first
        quantityElement.textContent = quantity;

        // Send updated quantity to server
        const response = await fetch('/cart/update-quantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            }),
        });

        const result = await response.json();
        if (response.ok) {
            quantityElement.textContent = quantity;
            console.log(result.message);
            // Recalculate and update cart totals dynamically
            updateCartTotals();
        } else {
            console.error(result.error);
            alert('Failed to update quantity. Please try again.');
        }
    });
});

// remove item from cart
document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.getAttribute('data-product-id');

        const response = await fetch('/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: productId }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.message);

            // Remove the item from the DOM
            const itemElement = document.querySelector(`#item-${productId}`);
            if (itemElement) {
                itemElement.closest('.card').remove();
            }

            // Update cart totals after removing the item
            updateCartTotals();
        } else {
            console.error(result.error);
            alert('An error occurred while trying to remove the item. Please try again.');
        }
    });
});

//function to update cart totals

function updateCartTotals() {
    let subTotal = 0;

    // Loop through all remaining items and recalculate subtotal
    document.querySelectorAll('.card').forEach(item => {
        const price = parseFloat(item.querySelector('.card-text').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        subTotal += price * quantity;
    });

    const tax = subTotal * 0.12;
    const total = subTotal + tax;

    // Update the displayed subtotal, tax, and total
    document.querySelector('.total-pane h5:nth-child(2)').textContent = `Sub-Total: $${subTotal.toFixed(2)}`;
    document.querySelector('.total-pane h5:nth-child(3)').textContent = `Tax: $${tax.toFixed(2)}`;
    document.querySelector('.total-pane h2').textContent = `Total: $${total.toFixed(2)}`;

    // Optionally, update the number of products in the cart
    document.querySelector('.total-pane h5:nth-child(1)').textContent = `No. of products: ${document.querySelectorAll('.card').length}`;
}
