const express=require('express');
const mongoose=require('mongoose');
const UserModul=require('./models/Users.js')
var cors = require('cors');

const app=express();
app.use(express.json());
app.use(cors());


require('dotenv').config("./.env")

mongoose.connect(process.env.MONGO_URI)

const server=app.listen(process.env.PORT_URL,()=>{
    console.log("server runing on:"+process.env.PORT_URL)
 
});



app.get("/getUsers",(req,res)=>{
    UserModul.find().then((data)=>{
        res.send(JSON.stringify(data));
    });
})

app.post("/createUser",async (req,res)=>{
    const user=req.body;
    const newUser=new UserModul(user);
    await newUser.save();
    res.send(user)
})

app.post("/deleteUser/:id",async (req,res)=>{
   await UserModul.findById(req.params.id).then((data)=>{
        data.deleteOne();
    });
    res.end()
})

app.post("/updateUser/:id",async (req,res)=>{
    const id = req.params.id;
    const namee = req.body.name;
    const emaile = req.body.email;

    await UserModul.findByIdAndUpdate(id, {
        name: namee,
        email: emaile,
    });
    
    res.end()
 }) 
 io=require("socket.io")(server,{
    cors:{
        origin:"*",
    },
});


 io.on("connection",(socket)=>{
    socket.emit("Data")
})