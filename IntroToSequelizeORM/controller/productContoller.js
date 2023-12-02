
const {products:Products} = require("../models");
const {Op} = require("sequelize")
module.exports = {
  addProduct: async function (req, res) {
    try {
      const { productName, price, quantity } = req.body;
      const date = "2021-05-23";
      const product = await Products.create({
        name: productName,
        quantity,
        price,
        createdAt: date,
        updatedAt: date,
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
      let { productId } = req.params;
      productId = Number(productId);
      //  const product = await Products.findOne({
      //   where:{
      //     id:productId,
      //   }
      //  })
      const product = await Products.findByPk(productId);
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
      const products = await Products.findAll({
       order:[['price', "DESC"]],
      //  attributes:["id", "name", "price"]
      attributes:{exclude:["updatedAt"]},
      where:{
        [Op.or]:[
          {
            name:'pen'
          },
          {
            price:3000,
          }
        ]
      }

      });
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
      productId = Number(productId);
      const updatedDate = new Date().toISOString().slice(0, 10);
      let product = await Products.findByPk(productId);

      if (!product) {
        return res.status(404).send("Product not found");
      }
      product = await product.update({
        name,
        price,
        createdAt: updatedDate,
        updatedAt: updatedDate,
      });

      res.status(201).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let { productId } = req.params;

      productId = Number(productId);
        await Products.destroy({
          where:{
            id:productId
          }
        })
      res.status(201).send("Product delted successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  showProducts: async function (req, res) {
    try {
      const dbConnection = await connection();
      const [products] = await dbConnection.execute("SELECT * FROM products");

      res.status(200).render("products", { products });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "something went wrong");
    }
  },
};
