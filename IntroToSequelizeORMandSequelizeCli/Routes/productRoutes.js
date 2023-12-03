const express = require("express");
const products = require("../models/index")
const router = express.Router();
const productController  = require('../controller/productContoller')

router.post('/products',productController.addProduct)

router.route('/products').get(productController.get)

router.route('/products/:productId').get(productController.getSingleProduct)
router.route('/showProducts').get(productController.showProducts)

router.route('/products/:productId').put(productController.changeProduct);
//delete.
router.route('/products/:productId').delete(productController.deleteProduct);

module.exports = router;