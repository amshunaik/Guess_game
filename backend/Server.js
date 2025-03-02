const express=require('express')
const itemModel=require('./Schema.js')
require('dotenv').config();
const cors=require('cors');
const ConnectDB = require('./DB.js');
const app=express();
app.use(express.json());
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
// app.get('/posts',async(req,res)=>{
//     const key = generateCacheKey(req);
  
//     const cachedProducts = await client.get(key);
//     if (cachedProducts) {
//         console.log('Cache hit');
//         res.json(JSON.parse(cachedProducts));
//         return;
//     }
//     console.log("cache miss")
  
    
//     const items=await itemModel.find();
//     if (items.length) {
//       await client.set(key, JSON.stringify(items));
//   }

//     //res.json(items);

//     //const cachedrecord=redis.get(items);
//     res.json(items);
// })

app.listen(PORT,()=>{
    console.log("app is running");
})
