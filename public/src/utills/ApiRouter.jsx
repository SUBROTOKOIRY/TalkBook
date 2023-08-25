const host = 'http://localhost:5000'
const registerRoute = `${host}/api/auth/Register`
const loginRoute = `${host}/api/auth/login`
const setProfilePictureRoute=`${host}/api/auth/setProfilePicture`
const allUsersRoute=`${host}/api/auth/getAllUsers`

module.exports={
    registerRoute,
    loginRoute,
    setProfilePictureRoute,
    allUsersRoute
}