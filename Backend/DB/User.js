const Mongoose  = require('mongoose')
require('./Connect')

let Schema=new Mongoose.Schema({
    Name:String,
    Email:String,
    Password:String
})

let Model=Mongoose.model('users' , Schema)
module.exports=Model

