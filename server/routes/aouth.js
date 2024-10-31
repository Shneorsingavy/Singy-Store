const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const router = express.Router();



router.get('/checkToken', async (req, res) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, {role}) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      } 
      return res.status(200).json({ role }); // החזר את התפקיד ללקוח
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;