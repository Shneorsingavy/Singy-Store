const mongoose = require('mongoose');

const watchesSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, 
    quantity: Number
  });
  module.exports = mongoose.model('WatchesStock', watchesSchema, 'WatchesStock');