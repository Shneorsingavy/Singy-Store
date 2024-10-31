const express = require('express');
const router = express.Router();
const Watches = require('../models/WatchesStock')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });


//ייבוא כל המוצרים
router.get('/all', async (req, res) => {

    try {
        const products = await Watches.find();

        res.status(200).json({
            message: 'Profile data and product list',
            products: products
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


//הוספת כמות למוצר ספציפי
router.post('/add/quantity', async (req, res) => {
    try {
        const { name, quantity } = req.body;

        const product = await Watches.findOne({ name });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.quantity = product.quantity + quantity;

        await product.save();
        res.status(200).json({ message: 'Quantity added successfully', productAfterAdded: product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add quantity' });
    }
});


//הוספת מוצר
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = new Watches({ name, description, price, image, quantity });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});



//עדכון לאחר קניה בנתוני משתמש ובמלאי
router.post('/reduce', async (req, res) => {
    try {
        const updates = req.body;
        console.log(updates);
        
        const token = req.cookies.token;

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            const updateUser = await User.findById(decodedToken.id);

            updateUser.shopHistory.push({
                purchaseDate: new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' }),
                items: updates
            }); // שמירה כקנייה נפרדת

            await updateUser.save();

        } catch (err) {
            return res.status(401).json({ err: "Invalid token!" });
        }

        const updatePromises = updates.map(async (update) => {
            try {
                const { _id, amount } = update;
                const product = await Watches.findById(_id);

                if (!product) {
                    return { error: `Product with ID ${_id} not found` };
                }

                product.quantity = product.quantity - amount;

                if (product.quantity < 0) {
                    console.log(`Warning! You need to restock ${product.name}, amount requested: ${amount}`);
                    // אפשר גם לשקול לשלוח תשובה אחרת אם הכמות ירדה מתחת לאפס.
                }

                await product.save();
                return { _id, quantity: product.quantity };
            } catch (err) {
                return { error: `Failed to update product with ID ${update._id}: ${err.message}` };
            }
        });

        const results = await Promise.all(updatePromises);

        const errors = results.filter(result => result.error);
        if (errors.length > 0) {
            console.log(errors);
            return res.status(400).json({ errors });
        }

        res.status(200).json({ message: 'Products updated successfully', results });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reduce product quantity' });
    }
});




module.exports = router;




