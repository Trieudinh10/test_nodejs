const userService = require('../service/userService')


let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
                    errCode: 1,
                    message: 'mising input parameter'
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user: {} //nếu user ko trả ra thông tin thì lấy thống tin trong cái object phía sau 
    })
}

module.exports = {
    handleLogin
}