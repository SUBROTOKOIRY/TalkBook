const User=require('../model/userSchema')

const setProfilePicture=async(req,res,next)=>{
 try{
    const id=req.params.id;
    const {image}=req.body.image;
    const userData=await User.findByIdAndUpdate(id,{
        profilePicture:image,
        isProfilePictureSet:true
    },
    {new:true})
    return res.json({status:true,userData});
 }
catch(error){
    console.log(error);
}
}
module.exports=setProfilePicture;