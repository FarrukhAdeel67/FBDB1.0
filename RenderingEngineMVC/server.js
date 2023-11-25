const express = require("express");
const path = require("path");
const products = require('./models/index') //models
const productsRouter = require('./Routes/productRoutes')

const PORT = 4000;
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended:true,
}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, "views/index.html"))
})

app.route("/showProducts").get( function(req,res){
    res.status(200).render('products', {products})
})


app.use('/api',productsRouter );

app.listen(PORT, ()=>console.log(`Server is running at port no : ${PORT}`));