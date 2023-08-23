const router = require('express').Router();
const {
  login,
  register,
  getAllUsers,
  setProfilePicture,
  logOut,
} = require('../controllers/register-loginController')

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/setProfilePicture').post(setProfilePicture);
module.exports= router;