const router = require('express').Router();
const {
  login,
  register,
  getAllUsers,
  logOut,
} = require('../controllers/register-loginController')
const setProfilePicture=require('../controllers/setProfilePicture')

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/setProfilePicture/:id').post(setProfilePicture)
module.exports= router;