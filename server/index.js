const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const connectDb = require('./model/connect');
require('dotenv').config();
const userRoute=require('./routes/userRoutes')

const port=process.env.PORT || 5000;
const uri=process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/auth',userRoute);

app.listen(port,async()=>{   
    await connectDb(uri)
    console.log(`Server is running on port: ${port}`);
});