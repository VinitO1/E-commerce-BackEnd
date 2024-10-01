import { Router } from 'express';
import db from '../routes/db.js'; // Adjust the path if necessary
import { isAuthenticated } from '../routes/auth.js'; // Adjust the path if necessary
const router = Router();

router.post('/cart/add', isAuthenticated, async (req, res) => {
  const { product_id, title, price, image } = req.body;
  const user_id = req.user.id; // Assuming req.user contains the logged-in user information

  try {
    // Check if the product is already in the user's cart
    const checkCartQuery = `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`;
    const cartResult = await db.query(checkCartQuery, [user_id, product_id]);

    if (cartResult.rows.length > 0) {
      // If the product is already in the cart, just increase the quantity
      const updateCartQuery = `UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND product_id = $2`;
      await db.query(updateCartQuery, [user_id, product_id]);
    } else {
      // If the product is not in the cart, insert a new record
      const insertCartQuery = `INSERT INTO cart (user_id, product_id, title, price, image, quantity) VALUES ($1, $2, $3, $4, $5, 1)`;
      await db.query(insertCartQuery, [user_id, product_id, title, price, image]);
    }

    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update the quantity of an item in the cart
router.post('/cart/update-quantity', isAuthenticated, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    // Check if the product exists in the user's cart
    const checkCartQuery = `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`;
    const checkResult = await db.query(checkCartQuery, [user_id, product_id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found in cart.' });
    }

    // Update the quantity of the product in the cart
    const updateCartQuery = `UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3`;
    await db.query(updateCartQuery, [quantity, user_id, product_id]);

    return res.status(200).json({ message: 'Quantity updated successfully.' });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return res.status(500).json({ error: 'An error occurred while updating the quantity.' });
  }
});


router.post('/cart/remove', isAuthenticated, async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.id; // Assuming req.user contains the logged-in user information

  console.log(`Trying to remove product: ${product_id} for user: ${user_id}`);

  try {
    // Check if the product exists in the user's cart
    const checkCartQuery = `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`;
    const checkResult = await db.query(checkCartQuery, [user_id, product_id]);

    if (checkResult.rows.length === 0) {
      console.log('Product not found in cart.');
      return res.status(404).json({ error: 'Product not found in cart.' });
    }

    // If product exists, remove it
    const deleteCartQuery = `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`;
    await db.query(deleteCartQuery, [user_id, product_id]);

    return res.status(200).json({ message: 'Product removed from cart.' });
  } catch (error) {
    console.error('Error during product removal:', error);
    return res.status(500).json({ error: 'An error occurred while trying to remove the item.' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const userId = req.session.passport.user.id;

    const cartItems = await db.query(
      `SELECT * FROM cart WHERE user_id = $1`,
      [userId]
    );

    console.log('Cart Items:', cartItems.rows);

    if (cartItems.rows.length === 0) {
      console.log('Cart is empty for user ID:', userId);
      return res.render('cart', { cart: [] });
    }

    res.render('cart', { cart: cartItems.rows });
  } catch (error) {
    console.error('Error fetching cart items:', error.message);

    // Send only one response
    if (!req.session.passport || !req.session.passport.user) {
      return res.redirect('/login'); // Redirect if user is not logged in
    }

    res.status(500).send('Internal Server Error');
  }
});


export default router;
