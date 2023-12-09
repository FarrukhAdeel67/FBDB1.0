
 
const  mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is required field"],
    minLength: [4, "min length is 4 characters"],
    maxLength: [80, "max length is 80 characters"],
  },

  price: {
    type: String,
    required: [true, "description is required"],
    minLength: [3, "min length is 5 characters"],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Customer model
    ref: 'Customer', // Name of the referenced model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 const Product = mongoose.model("Product", schema);
 module.exports = Product;