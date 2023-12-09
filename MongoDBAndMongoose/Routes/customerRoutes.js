const express = require("express");

const router = express.Router();
const customerController  = require('../controller/customerController')
const authenticateCustomer = require("../middlewares/authenticateCustomer")

router.post('/customers',customerController.signUp)
// router.post('/customers/login', customerController.login)
// router.get('/customers/:customerId',authenticateCustomer, customerController.myProfile)





module.exports = router;