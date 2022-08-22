require('./DB/Connect')
let Express=require('express')
let App=Express();
let Model=require('./DB/User')
let Product=require('./DB/Products')
let Cors=require('cors');
let Mongo=require('mongoose')
App.use(Express.json());
App.use(Cors())

var jwt = require('jsonwebtoken');

App.post("/register" , async (Req,Res)=>
{
    let Data=new Model(Req.body);
    let Result=await Data.save();
    
    var token = jwt.sign({Result} ,'IAMZUBI')

    Res.send({Result:Result,Token:token})
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
App.get('/' ,async (Req,Res)=>
{
    let Data=await Product.find()
    Res.send(Data)
})
App.delete('/delete/:_id' , async(Req,Res)=>
{
    let Data=await Product.deleteOne(Req.params)
    Res.send(Data)
})
App.put('/update/:_id' , async(Req,Res)=>
{
    let Data=await Product.updateOne(
        Req.params
        ,
        {
            $set:Req.body
        }
    )
    Res.send(Data)
})
App.get('/single/:_id' , async(Req,Res)=>
{
    let Data=await Product.findOne(Req.params)
    Res.send(Data)
})
App.listen(4500)