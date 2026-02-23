const express=require('express')
const app=express()
const path=require('path')
require('dotenv').config()
const PORT=process.env.PORT ||3000;
const cors=require('cors');
const connectToDatabase = require('./src/config/db');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.get('/api/health',(req,res)=>{
    res.send('hello world')
})
app.use(
  "/uploads",
  express.static(path.join(__dirname, "src", "uploads"))
);
app.use('/api',require('./src/route/chatRoute'))
app.listen(PORT,()=>{
    connectToDatabase()
    console.log(`server is  started at ${`http://localhost:${PORT}`} `)
}) 