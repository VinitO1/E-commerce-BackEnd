import { Router } from 'express';
import db from '../routes/db.js';

const router = Router();
/*
const necklace = [
    {
        id: 1,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace1.jpg',
    },

    {
        id: 2,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace2.jpg',
    },
    {
        id: 3,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace3.jpg',
    },
    {
        id: 4,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace4.jpg',
    },
    {
        id: 5,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace5.jpg',
    },
    {
        id: 6,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace6.jpg',
    },
    {
        id: 7,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace7.jpg',
    },
    {
        id: 8,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace8.jpg',
    },
    {
        id: 9,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace9.jpg',
    },
    {
        id: 10,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace10.jpg',
    },
    {
        id: 11,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace11.jpg',
    },
    {
        id: 12,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Necklace/Necklace12.jpg',
    },
]
const rings = [
    {
        id: 1,
        title: 'Twist Rose Gold Earrings',
        price: 99.99,
        image: '/images/Rings/Ring1.jpg',
    },
    {
        id: 2,
        title: 'Open Circle ring',
        price: 119.99,
        image: '/images/Rings/Ring2.jpg',
    },
    {
        id: 3,
        title: 'Tri Tone Rolling Ring',
        price: 229.99,
        image: '/images/Rings/Ring3.jpg',
    },
    {
        id: 4,
        title: 'Wave Style Ring',
        price: 199.99,
        image: '/images/Rings/Ring4.jpg',
    },
    {
        id: 5,
        title: 'Emerald Cut Ring',
        price: 269.99,
        image: '/images/Rings/Ring5.jpg',
    },
    {
        id: 6,
        title: 'Pink Sapphire Ring',
        price: 399.99,
        image: '/images/Rings/Ring6.jpg',
    },
    {
        id: 7,
        title: 'Diamond Cluster Ring',
        price: 199.99,
        image: '/images/Rings/Ring7.jpg',
    },
    {
        id: 8,
        title: 'Blue Ruby Silver Diamond Ring',
        price: 149.99,
        image: '/images/Rings/Ring8.jpg',
    },
    {
        id: 9,
        title: 'Wide Torc Ring',
        price: 349.99,
        image: '/images/Rings/Ring9.jpg',
    },
    {
        id: 10,
        title: 'Wave Delicate Ring',
        price: 149.99,
        image: '/images/Rings/Ring10.jpg',
    },
    {
        id: 11,
        title: 'Vintage Ring',
        price: 199.99,
        image: '/images/Rings/Ring11.jpg',
    },
    {
        id: 12,
        title: 'Pave Sapphire Dimond Band',
        price: 499.99,
        image: '/images/Rings/Ring12.jpg',
    },
];
const earrings = [
    {
        id: 1,
        title: 'RoseGold Earrings',
        price: 39.99,
        image: '/images/Earrings/Earring1.jpg',
    },
    {
        id: 2,
        title: 'Gold Hoops',
        price: 129.99,
        image: '/images/Earrings/Earring2.jpg',
    },
    {
        id: 3,
        title: 'Gold Droplet Hoops',
        price: 89.99,
        image: '/images/Earrings/Earring3.jpg',
    },
    {
        id: 4,
        title: 'Pearl Earrings',
        price: 149.99,
        image: '/images/Earrings/Earring4.jpg',
    },
    {
        id: 5,
        title: 'Labradorite Heart Shaped Earring',
        price: 89.99,
        image: '/images/Earrings/Earring5.jpg',
    },
    {
        id: 6,
        title: 'Ribbed Chunky Hoop Earring',
        price: 49.99,
        image: '/images/Earrings/Earring6.jpg',
    },
    {
        id: 7,
        title: 'Single Hoop Double Chain Earring',
        price: 119.99,
        image: '/images/Earrings/Earring7.jpg',
    },
    {
        id: 8,
        title: 'Square Sparkle Hoop Earring',
        price: 119.99,
        image: '/images/Earrings/Earring8.jpg',
    },
    {
        id: 9,
        title: 'Circle Stud Earring',
        price: 79.99,
        image: '/images/Earrings/Earring9.jpg',
    },
    {
        id: 10,
        title: 'Rose Earring - Gold',
        price: 99.99,
        image: '/images/Earrings/Earring10.jpg',
    },
    {
        id: 11,
        title: 'Crystal Stud Earring',
        price: 139.99,
        image: '/images/Earrings/Earring11.jpg',
    },
    {
        id: 12,
        title: 'Feather Hoop Earring',
        price: 129.99,
        image: '/images/Earrings/Earring12.jpg',
    },
];
*/
// Earrings route
router.get('/earrings', async (req, res) => {
    console.log('User in earrings route:', req.user); // Check if user is available
    try {
        const { rows } = await db.query('SELECT * FROM products WHERE category = $1', ['earrings']);
        res.render('earring', { earrings: rows, user: req.user });
    } catch (err) {
        console.error('Error getting earrings', err);
        res.status(500).send('An error occurred');
    }
});

// Rings route
router.get('/rings', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products WHERE category = $1', ['rings']);
        res.render('ring', { rings: rows, user: req.user });
    } catch (err) {
        console.error('Error getting rings', err);
        res.status(500).send('An error occurred');
    }
});

// Necklaces route
router.get('/necklaces', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products WHERE category = $1', ['necklace']);
        res.render('necklace', { necklaces: rows, user: req.user });
    } catch (err) {
        console.error('Error getting necklaces', err);
        res.status(500).send('An error occurred');
    }
});

// Generic product detail route
router.get('/product-detail/:category/:id', async (req, res) => {
    const { category, id } = req.params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
        console.error(`Invalid product ID: ${id}`);
        return res.status(400).send('Invalid product ID');
    }

    try {
        const { rows } = await db.query('SELECT * FROM products WHERE category = $1 AND id = $2', [category, productId]);
        if (rows.length === 0) {
            console.log('Product not found');
            return res.status(404).send('Product not found');
        }
        res.render('productDetail', { product: rows[0], user: req.user });
    } catch (err) {
        console.error(`Error getting ${category} details`, err);
        res.status(500).send('An error occurred');
    }
});

export default router;
