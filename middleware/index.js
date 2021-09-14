const mongoose = require("mongoose")

module.exports = {
    isLoggedIn: (req, res, next) => {
        console.log(req.session, '<-----------------------------------')
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'Login in order to continue' })
    },
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized' })
    }
}