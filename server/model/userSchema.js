const mongoose=require("mongoose");
const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        max:20,
        min:5
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isProfilePictureSet:{
        type:Boolean,
        default:false,
    },
    profilePicture:{
        type:String,
        default:"",
    }
})
module.exports=mongoose.model("Users",userSchema);