

 
const  mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is required field"],
    minLength: [4, "min length is 4 characters"],
    maxLength: [80, "max length is 80 characters"],
  },

  email: {
    type: String,
    required: [true, "description is required"],
    minLength: [3, "min length is 5 characters"],
  },

  password: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 const Customer = mongoose.model("Customer", schema);
 module.exports = Customer;
