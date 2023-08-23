const router = require('express').Router();
const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require('../controllers/userController')

router.route('/register').post(register);
router.route('/login').post(login)
module.exports= router;