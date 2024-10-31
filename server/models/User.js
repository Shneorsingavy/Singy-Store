const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, default:'' },
  image: { type: String, required: true, default:''  },
  description: { type: String, required: true, default:''  },
  amount: {type: Number, default:1}
  // הוסף שדות נוספים לפי הצורך
});

const userSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopHistory:[],
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // ברירת מחדל - משתמש רגיל
});

module.exports = mongoose.model('User', userSchema, 'User');



