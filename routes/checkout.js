import { Router } from 'express';
import db from '../routes/db.js'; 
import { isAuthenticated } from '../routes/auth.js';

const router = Router();
router.get('/checkout', isAuthenticated, async (req, res) => {
    const userId = req.user.id; 
    try {
        // Query to get the cart items for the authenticated user
        const cartItems = await db.query(
            `SELECT * FROM cart WHERE user_id = $1`,
            [userId]
        );

        // Calculate sub-total and tax
        const subTotal = cartItems.rows.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subTotal * 0.13; // Example tax rate (13%)

        // Render checkout view with cart details
        res.render('checkout', { cart: cartItems.rows, subTotal, tax });
    } catch (error) {
        console.error('Error fetching cart items for checkout:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching cart items for checkout.' });
    }
});

export default router;