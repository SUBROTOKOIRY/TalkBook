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
router.route('/SetProfilePicture/:id').post(setProfilePicture)
router.route('/getAllUsers/:id').get(getAllUsers)
module.exports= router;