const User=require('../model/userSchema')

const setProfilePicture=async(req,res,next)=>{
 try{
    const userId=req.params.id;
    const image=req.body.image;
        const userData = await User.findByIdAndUpdate(
          userId,
          {
            isProfilePictureSet: true,
            profilePicture:image,
          },
          { new: true }
        )
    delete userData.password;
    // console.log(userData);
    return res.json({
      isSet: userData.isProfilePictureSet,
      image: userData.profilePicture,
    })
 }
catch(error){
    console.log(error);
}
}
module.exports=setProfilePicture;