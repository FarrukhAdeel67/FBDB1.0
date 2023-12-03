const {  secret } = require("../constants");
const { customers:Customers, products:Products} = require("../models");
const jwt = require("jsonwebtoken")
module.exports = async (req,res,next)=>{
 try {
    const customerId = req.params.customerId;
    const customer  = await Customers.findByPk(customerId);
    if(!customer){
        return res.status(404).send("Customer not found")
    }
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).send("token is required")
    }

    const decodedToken =  jwt.verify(token, secret);
    if(!decodedToken){
       return res.status(401).send("invalid token")
    }
    console.log(customer.id, decodedToken.id)
    if(customer.id !== decodedToken.id){
       return  res.status(401).send("you are not authroized to use this route")
    }
    req.customer = customer;
    next();
 } catch (error) {
    console.log(error)
 }
}