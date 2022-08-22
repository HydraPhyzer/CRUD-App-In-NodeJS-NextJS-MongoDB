const Mongoose  = require('mongoose')
require('./Connect')

let Schema=new Mongoose.Schema({
    PName:String,
    PPrice:Number
})

let Model=Mongoose.model('products' , Schema)
module.exports=Model

