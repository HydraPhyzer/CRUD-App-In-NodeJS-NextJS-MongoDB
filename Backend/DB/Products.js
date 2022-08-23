const Mongoose  = require('mongoose')
require('./Connect')

let Schema=new Mongoose.Schema({
    PName:String,
    PPrice:String
})

let Model=Mongoose.model('products' , Schema)
module.exports=Model

