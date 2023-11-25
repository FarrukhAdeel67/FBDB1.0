const express = require("express");
const products = require("../models/index")
const router = express.Router();
const productController  = require('../controller/productContoller')

router.post('/products',productController.addProduct)

router.route('/products').get(productController.get)

router.route('/products/:productIndex').get(productController.getSingleProduct)

router.route('/products/:productIndex').put(productController.changeProduct);
//delete.
router.route('/products/:productIndex').delete(productController.deleteProduct);

module.exports = router;