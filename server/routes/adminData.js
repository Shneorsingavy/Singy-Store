const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware לבדיקה אם המשתמש הוא אדמין
const adminAuth = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        // מאמתים את הטוקן
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // בודקים אם המשתמש הוא אדמין
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, not an admin' });
        }

        // מעבירים את הבדיקה וממשיכים לפונקציה הבאה
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


// ייבוא כל המשתמשים (רק לאדמין)
router.get('/getUsersData', adminAuth, async (req, res) => {
    try {
        const allUsers = await User.find({ role: { $ne: 'admin' } })
            .select('email name shopHistory'); // שליפת השדות הרצויים בלבד ללא _id

        res.status(200).json({
            message: 'All users data success',
            users: allUsers
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// יציאה מהמערכת
router.post('/logout', (_, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Logged out successfully' });
  });
module.exports = router;
