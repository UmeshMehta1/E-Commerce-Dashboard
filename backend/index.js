const express = require("express");
const cors = require("cors");
require("./db/config");
const User =require("./db/users");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get("/", (req,resp)=>{
  resp.send("Welcome ")
})
app.post("/register",async(req,resp)=>{
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject()
  delete result.password;
  resp.send(result)
})

app.post('/login', async(req,resp)=>{
  console.log(req.body);
  if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");

    if(user){
      resp.send(user)
  
  }
  else{
    resp.send({result: "No user Found"})
  }
  
  }else{
    resp.send({result: "No User Found"})
  }
})


app.listen(4000,()=>{
    console.log('server is running on port 4000')
})

