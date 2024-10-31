const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();


// רישום משתמש חדש
router.post('/register', async (req, res) => {
  
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({massage:`User registered successfully`});
  } catch (err) {
    console.log("Error: ", err);
    
    res.status(400).json({massage:err.message});
  }
});



// כניסת משתמש
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });  

  res.cookie('token', token, {
    httpOnly: true, 
    maxAge: 60 * 60 * 1000, 
  });

  res.json({ role: user.role });
});


//יציאת משתמש מהמערכת
router.post('/logout', (_, res) => {
  res.clearCookie('token'); 
  res.status(200).json({ message: 'Logged out successfully' });
});


//ייבוא היסטוריית קניות של המשתמש

router.get('/personalData', async (req, res) =>{
  const token = req.cookies.token;
  
  try{
    const {id} = jwt.verify (token, process.env.JWT_SECRET)
    const {shopHistory} = await User.findById(id)

     res.status(200).json({massage:'Here is the shopping history', shopHistory })
  }
  catch(err){
    console.log("not good");
    
    res.status(401).json({massage:'Failed to fetch data', err})
  }
})



module.exports = router;




