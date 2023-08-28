const router = require('express').Router();

const {addmsg,getAllmsgs}=require('../controllers/messagesController')

router.route('/addMsg').post(addmsg);
router.route('/getAllMsgs').post(getAllmsgs);

module.exports= router;