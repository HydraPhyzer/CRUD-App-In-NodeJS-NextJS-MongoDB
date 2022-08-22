require('./DB/Connect')
let Express=require('express')
let App=Express();
let Model=require('./DB/User')
let Product=require('./DB/Products')
let Cors=require('cors');
const { Mongoose } = require('mongoose');
App.use(Express.json());
App.use(Cors())

App.post("/register" , async (Req,Res)=>
{
    let Data=new Model(Req.body);
    let Result=await Data.save();
    Res.send(Result)
})
App.post("/login" , async (Req,Res)=>
{
    let Data=await Model.findOne(Req.body).select('-Password');
    Res.send(Data)
})
App.post("/add-product" , async (Req,Res)=>
{
    let Data=new Product(Req.body);
    let Result=await Data.save();
    Res.send(Result)
})

App.listen(4500)