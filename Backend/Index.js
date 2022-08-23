require("./DB/Connect");
let Express = require("express");
let App = Express();
let Model = require("./DB/User");
let Product = require("./DB/Products");
let Cors = require("cors");
App.use(Express.json());
App.use(Cors());

var jwt = require("jsonwebtoken");
const { Router } = require("express");
let jwtkey = "IAMZUBI";

let Verify = (Req, Res, next) => {
  let Token = Req.headers["authorization"];
  if (Token) {
    jwt.verify(Token, jwtkey, (Err, Valid) => {
      if (Err) {
        Res.send(Err)
      } else {
        next();
      }
    });
  }
  else
  {
    Res.send("Error Occured")
  }
} ;

App.post("/register", async (Req, Res) => {
  let Data = new Model(Req.body);
  let Result = await Data.save();

  var token = jwt.sign({ Result }, jwtkey);

  Res.send({ Result: Result, Token: token });
});
App.post("/login" ,async (Req, Res) => {
  let Data = await Model.findOne(Req.body).select("-Password");
  var token = jwt.sign({ Data }, jwtkey);
  if(Data)
  Res.send({ Result: Data, Token: token });
  else
  Res.send({Error:"No Accout Available"})
});

App.post("/add-product", Verify, async (Req, Res) => {
  let Data = new Product(Req.body);
  let Result = await Data.save();

  Res.send(Result);
});

App.get("/", Verify ,async (Req, Res) => {
  let Data = await Product.find();
  Res.send(Data);
});

App.delete("/delete/:_id",Verify ,async (Req, Res) => {
  let Data = await Product.deleteOne(Req.params);
  Res.send(Data);
});

App.put("/update/:_id", Verify ,async (Req, Res) => {
  let Data = await Product.updateOne(Req.params, {
    $set: Req.body,
  });
  Res.send(Data);
});
App.get("/single/:_id", Verify,async (Req, Res) => {
  let Data = await Product.findOne(Req.params);
  Res.send(Data);
});
App.listen(4500);
