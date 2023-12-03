
const {customers:Customers, products:Products, sequelize} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {Op} = require("sequelize");
const { secret } = require("../constants");
module.exports = {
  signUp: async function (req, res) {
    try {
      const { name, email, password } = req.body;
      
      if(!name || !email || !password){
        return res.status(409).send("Required fields cannot be empty");
      }
      let customer = await Customers.findOne({
        where:{
            email,
        }
      })
      if(customer){
        return res.status(400).send("Customer already exists with this email");
      }
      const hashedPassword  = await bcrypt.hash(password, 12);
      customer = await Customers.create({
        name,  
        password:hashedPassword,
        email,
      })

   
      res.status(201).send({
        message: "Customer added successfully",
        customer,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  login: async function (req, res) {
    try {
      const {  email, password } = req.body;
      
      if( !email || !password){
        return res.status(409).send("Required fields cannot be empty");
      }
      let customer = await Customers.findOne({
        where:{
            email,
        }
      })
      if(!customer){
        return res.status(404).send("Customer not found");
      }

      const comparePassowrd = await bcrypt.compare(password, customer.password);
      if(!comparePassowrd){
        return res.status(409).send("Incorrect passowrd");
      }
       customer =  await customer.toJSON();
      const token = await jwt.sign(customer, secret)
   
      res.status(201).send({
        message: "Customer logged in  successfully",
        customer,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
  myProfile: async function (req, res) {
    const t = await sequelize.transaction();
    try {
      
        let {customer} = req;
        customer  = await Customers.findByPk(customer.id,{
            include:{
                model:Products ,
                as:'products'
            }
        }) 
      await t.commit();
      res.status(201).send({
        customer,
      });
    } catch (err) {
        await t.rollback();
      console.log(err);
      res.status(500).send(err.message || "Something went wrong!");
    }
  },
 
};
