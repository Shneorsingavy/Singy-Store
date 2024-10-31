const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({path: '../.env'});

const userRouter = require('../routes/userRoutes');
const stockManagement = require('../routes/manageStock');
const checkAuth = require('../routes/aouth');
const adminData = require('../routes/adminData')


const app = express();



app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173',  credentials: true}));
app.use(express.json());




// חיבור ל-MongoDB
mongoose.connect(process.env.DB_SECRET)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  
// הגדרת הנתיבים
app.use('/api/users', userRouter);
app.use('/api/products', stockManagement)
app.use('/api/checkAuth', checkAuth);
app.use('/api/admin', adminData);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


