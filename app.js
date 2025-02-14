const express=require("express")
const userRouter=require("./router/User.router.js")
const connection = require("./db/db.js")
const cors=require("cors")
const udharRouter = require("./router/Udahri.router.js")
const cookieParser = require("cookie-parser");
const app=express()
require("dotenv").config()

app.use(express.json())



app.use(cors())
app.use(cookieParser() );
app.use("/auth",userRouter)
app.use("/user",udharRouter)

app.get("/",(req,res)=>{
   return res.json({msg:"Home page"})
})

let PORT=process.env.PORT  || 8000
app.listen(PORT,async()=>{
    await connection
    console.log(`Server is running on port ${PORT}`)
})