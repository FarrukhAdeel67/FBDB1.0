const connection = require("../models/index");
module.exports = {
  addProduct: async function (req, res) {
    try {
      const { name, price } = req.body;
      const date = "2021-05-23";
      const dbConnection = await connection();
      await dbConnection.execute(
        `INSERT INTO products (name, price, createdAt, updatedAt) VALUES ("${name}", ${price}, "${date}", "${date}")`
      );
      res.status(201).send("Product added successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      let { productId } = req.params;
     productId = Number(productId);
      const dbConnection = await connection();
      const [product] = await dbConnection.execute(
        `SELECT * from products WHERE id = ${productId}`
      );
      if(product.length === 0){
        return res.status(404).send("Product not found")
      }
      res.status(201).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  get: async (req, res, next) => {
    try {
      const dbConnection = await connection();
      const [products] = await dbConnection.execute("SELECT * FROM products");

      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "something went wrong");
    }
  },
  changeProduct: async (req, res) => {
    try {
        let { productId } = req.params;
        const {name , price} = req.body;
        if(!name || !price){
            return res.status(409).send("Required Fields cannot be empty!");
        }
       productId = Number(productId);
       const updatedDate = new Date().toISOString().slice(0,10)
      
        const dbConnection = await connection();
        const [product] = await dbConnection.execute(
          `UPDATE products SET name = "${name}", price = ${price}, updatedAt = "${updatedDate}" WHERE id = ${productId}`, 
        );
        if(product.length === 0){
          return res.status(404).send("Product not found")
        }
        res.status(201).send("product updated!");
      } catch (err) {
        console.log(err);
        res.status(500).send(err.message || "Something went wrong!");
      }
  },
  deleteProduct: async (req, res) => {
    try {
        let { productId } = req.params;

       productId = Number(productId);
      
        const dbConnection = await connection();
        const [product] = await dbConnection.execute(
          `DELETE from products where id = ${productId}`, 
        );
      
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
