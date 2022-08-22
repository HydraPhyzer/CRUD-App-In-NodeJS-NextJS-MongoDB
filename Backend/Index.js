require('./DB/Connect')
let Express=require('express')
let App=Express();
let Model=require('./DB/User')
let Cors=require('cors')
App.use(Express.json());
App.use(Cors())

App.post("/register" , async (Req,Res)=>
{
    let Data=new Model(Req.body);
    let Result=await Data.save();
    Res.send(Result)
})

App.listen(4500)