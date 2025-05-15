const express=require("express")
const app=express()
const PORT=8000
const body_parser=require("body-parser")
const cors=require("cors")
const mongoose=require("mongoose")
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))
mongoose.connect("mongodb://localhost:27017/nexus")
app.use(express.json())
app.use(cors())
const userSchema= new mongoose.Schema({
    nam:String,
    phone:Number,
    mail:String,
    msg:String
})
const userModel= new mongoose.model("signup" , userSchema)
app.post("/signup" ,async(req,res)=>{
    const {nam,phone,mail,msg}=req.body
   try {
     const user= new userModel({
        nam,mail,phone,msg
    })
    await user.save()
    res.send("user data is saved")
   } catch (e) {
    console.log("error in saving data")
    res.send("Ops data isn't saved try later")    
   }
})


app.listen(PORT,()=>{console.log("server is working")})