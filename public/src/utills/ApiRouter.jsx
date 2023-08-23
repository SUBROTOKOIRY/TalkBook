const host = 'http://localhost:5000'
 const registerRoute = `${host}/api/auth/Register`
 const loginRoute = `${host}/api/auth/login`
 const setAvatarsRoute=`${host}/api/auth/setProfilePicture`

module.exports={
    registerRoute,
    loginRoute,
    setAvatarsRoute
}