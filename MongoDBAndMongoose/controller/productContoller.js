
const Products = require("../models/product")
module.exports = {
  addProduct: async function (req, res) {
    try {
      const { productName, price, createdBy } = req.body;
      console.log(productName, price)
      const product = await Products.create({
        name: productName,
        price,
        createdBy,
      });
      res.status(201).send({
        message: "Product added successfully",
        product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await Products.findOne({
        _id:productId,
    }).populate('createdBy');
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.status(201).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  get: async (req, res, next) => {
    try {
      const products = await Products.find( );
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "something went wrong");
    }
  },
  changeProduct: async (req, res) => {
    try {
      let { productId } = req.params;
      const { name, price } = req.body;
      if (!name || !price) {
        return res.status(409).send("Required Fields cannot be empty!");
      }
      let product = await Products.findById(productId);

      if (!product) {
        return res.status(404).send("Product not found");
      }
      product.name = name;
      product.price = price;
      product.createdAt = Date.now();
      await product.save();

      res.status(201).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let { productId } = req.params;

        await Products.deleteOne({
          
            _id:productId
          
        })
      res.status(201).send("Product delted successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
//   showProducts: async function (req, res) {
//     try {
//       const dbConnection = await connection();
//       const [products] = await dbConnection.execute("SELECT * FROM products");

//       res.status(200).render("products", { products });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err.message || "something went wrong");
//     }
//   },
};
