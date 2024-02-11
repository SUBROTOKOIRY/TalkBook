const host = 'https://subroto-8wob.onrender.com'
const registerRoute = `${host}/api/auth/Register`
const loginRoute = `${host}/api/auth/login`
const setProfilePictureRoute=`${host}/api/auth/setProfilePicture`
const allUsersRoute=`${host}/api/auth/getAllUsers`
const addMsgRoute=`${host}/api/msg/addMsg`
const getAllMsgsRoute=`${host}/api/msg/getAllMsgs`
module.exports={
    registerRoute,
    loginRoute,
    setProfilePictureRoute,
    allUsersRoute,
    addMsgRoute,
    getAllMsgsRoute,
    host
}