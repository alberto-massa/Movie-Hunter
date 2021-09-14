const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')
const Message = require('./../models/Message.model')

const { CDNupload } = require('../config/upload.config');
const { default: axios } = require('axios');



router.get('/search', (req, res) => res.render('user/search'))

router.post('/search', (req, res) => {

    const { username } = req.body

    User
    .findOne({ username })
    .then(theUser => res.render('user/search', theUser))
    .catch(err => console.log(err))
})

router.get('/profile', (req, res) => {
    let user = req.session.currentUser

    const object = {
        user: undefined,
        favouriteMovies : []
    }
    let arr = [];

    if (!user) {
        res.render('auth/login', {errorMsg: 'Please, login to check your profile'})
    } 

    if (user.favouriteMovies.length > 0) {
        for (let i = 0; i < user.favouriteMovies.length; i++) {
            arr.push(axios
            .get(`https://api.themoviedb.org/3/movie/${user.favouriteMovies[i]}?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US`))
            // .then(response => {
            //     object.favouriteMovies.push(response.data)
            //     return User.findOne({ 'username': user.username })
            // })
            // .then(theUser => {
            //     object.user = {...theUser}
            //     // console.log(object);
            //     // res.render('user/my-profile', object)
            //     return;
            // })
            // .catch(err => console.log(err))
        }
        Promise.all(arr).then(response => {
            object.favouriteMovies.push(response)
            return User.findOne({ 'username': user.username })
        })
        .then(theUser => {
            object.user = theUser
            object.favouriteMovies.forEach(elm => console.log('DATS', elm))
            res.render('user/my-profile', object)
        })

    } else {
        User
        .findOne({ 'username': user.username })
        .then(theUser => {
            res.render('user/my-profile', {theUser})
            console.log(theUser)
        })
        .catch(err => console.log(err))
    }
})

router.get('/profile/:username', (req, res) => {

    const { username } = req.params

    User
    .findOne({ username })
    .then(theUser => res.render('user/profile', theUser))
    .catch(err => console.log(err))
})

router.post('/edit', CDNupload.single('avatar'), (req, res) => {
    
    let user = req.session.currentUser

    User
    .findByIdAndUpdate(user._id, { avatar: req.file.path })
    .then(() => res.redirect('/user/profile'))
    .catch(err => console.log(err))
})


router.get('/messages', (req, res) => {

    const user = req.session.currentUser
    const messages = {
        sentMessages: [],
        receivedMessages: []
    }

    Message
    .find({ authorId: user._id })
    .populate('authorId')
    .populate('receiverId')
    .then((sentMsgs) => {
        messages.sentMessages = sentMsgs
        return Message
        .find({ receiverId: user._id})
        .populate('authorId')
        .populate('receiverId')
    })
    .then((receivedMsgs) => {
        messages.receivedMessages = receivedMsgs
        res.render('user/messages', messages)
    })
})


router.get('/sendmsg/:targetuser', (req, res) => {

    const users = {
        targetUser : req.params.targetuser,
        user : req.session.currentUser
    }
    res.render('user/send-message', users)
})


router.post('/sendmsg/:targetuser', (req, res) => {

    const user = req.session.currentUser
    const targetUser = req.params.targetuser

    const message = req.body

    User
    .findOne({ username: targetUser })
    .then(response => {
        Message
        .create({ authorId: user._id, receiverId: response._id, subject: message.subject, content: message.content })
        .then(() => {
            res.redirect('/user/profile')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;