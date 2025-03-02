const express=require('express')
const itemModel=require('./Schema.js')
require('dotenv').config();
const cors=require('cors');
const ConnectDB = require('./DB.js');
const app=express();


app.use(express.json());

//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', 'https://guess-game-backend-ug7p.onrender.com');
//    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    next();
//  });
app.use(cors())


const PORT=3005;
ConnectDB();

app.post('/send',async(req,res)=>{
    const dt=req.body;
    const newPost = new itemModel(dt);
    await newPost.save();
    res.status(201).json(newPost);
})
app.get('/query',async(req,res)=>{
    //const id=req.query.qry;
    const items=await itemModel.find();
    

    console.log("jjjjjj",items, items.length,'---------------------------------------------------------------');
    res.json(items)
})



app.listen(PORT,()=>{
    console.log("app is running");
})
