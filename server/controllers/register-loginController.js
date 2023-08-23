const User = require('../model/userSchema')
const bcrypt = require('bcrypt')

const register=async(req,res)=>{
    try{
        const {username,email,password}=req.body;

    const userNameCheck=await User.findOne({username});
    if(userNameCheck)
    {
        return res.json({msg:"Username already exists",status:false})
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ msg: 'email is already registered', status: false })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    delete user.password;
    return res.json({status:true,user});
    }    
    catch(error){
        console.log(error);
    }
}

const login = async (req, res) => {
  try {
    const { username,email, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.json({ msg: 'Invalid Username ', status: false })
    }
    const checkEmail=await user.email;
    if (checkEmail!==email) {
        console.log(email);
      return res.json({ msg: 'Invalid emailId', status: false })
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword)
    {
        return res.json({msg:"Invalid Password",status:false})
    }

     delete password;
    return res.json({ status: true,user})
} catch (error) {
    console.log(error)
}
}

module.exports={
    register,
    login
}