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
  resp.send(result)
})


app.listen(4000,()=>{
    console.log('server is running on port 4000')
})

