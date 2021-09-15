const mongoose = require("mongoose")

module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'Please, log in' })
    },

    alreadyLoggedIn: (req, res, next) => {
        req.session.currentUser ? res.redirect('/') : next()
    },
    
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('index', { errorMsg: 'Not authorized' })
    }
}