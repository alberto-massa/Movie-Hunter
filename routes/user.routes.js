const express = require('express');
const router = express.Router();

const CharactersApiHandler = require('../public/js/api-handler');
const apiHandler = new CharactersApiHandler

const User = require('./../models/User.model')
const Message = require('./../models/Message.model')

const { CDNupload } = require('../config/upload.config');
const { isLoggedIn } = require('../middleware');

router.get('/search', isLoggedIn, (req, res) => res.render('user/search'))

router.post('/search', isLoggedIn, (req, res) => {

    const { username } = req.body

    User
        .findOne({ username })
        .then(theUser => res.render('user/search', {theUser}))
        .catch(err => console.log(err))
})

router.get('/profile', isLoggedIn, (req, res) => {
    let user = req.session.currentUser


    const data = {
        user: undefined,
        favouriteMovies : [],
        followers: 0,
        following: 0
    }

    data.followers = user.followers.length
    data.following = user.following.length

    let favMovies = [];

    if (user.favouriteMovies.length > 0) {
        for (let i = 0; i < user.favouriteMovies.length; i++) {
            favMovies.push(apiHandler.getFavourites(user.favouriteMovies[i]))
        }
        Promise
            .all(favMovies)
            .then(response => {
                for(let j = 0; j < response.length; j++) {
                    data.favouriteMovies.push(response[j].data)
                }
                return User
                .findOne({ 'username': user.username })
                .populate('following')
            })
            .then(theUser => {
                data.user = theUser
                console.log('data q paso------------------', data)
                req.session.currentUser = theUser //TODO -> Hacer que aparezca la pelicula sin tener que hacer logout
                return data
            })
            .then((data) => res.render('user/my-profile', data)
            )
            .catch(err => console.log(err))

    } else {
        User
        .findOne({ 'username': user.username })
        .populate('following')
        .then(theUser => {
            let following = theUser.following.length
            let followers = theUser.followers.length
            console.log('ABAJO q paso------------------', theUser)

            res.render('user/my-profile', {theUser, followers, following})
            console.log(theUser)
        })
        .catch(err => console.log(err))
    }
})

router.get('/profile/:username', isLoggedIn, (req, res) => {

    const currentUser =  req.session.currentUser
    const { username } = req.params

    if (currentUser.username === username) {
        console.log("REDIRECCIONANDO");
        res.redirect('/user/profile')
        return
    }

    User
        .findOne({ username })
        .then(theUser => {
            let alreadyFollowing = false;
            theUser.followers.includes(currentUser._id) ? alreadyFollowing = true : alreadyFollowing = false
            res.render('user/profile', {theUser, alreadyFollowing})
        })
        .catch(err => console.log(err))
})

router.post('/edit', isLoggedIn, CDNupload.single('avatar'), (req, res) => {
    
    let user = req.session.currentUser

    User
        .findByIdAndUpdate(user._id, { avatar: req.file.path })
        .then(() => res.redirect('/user/profile'))
        .catch(err => console.log(err))
})


router.get('/messages', isLoggedIn, (req, res) => {

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
        .catch(err => console.log(err))
})


router.get('/sendmsg/:targetuser', isLoggedIn, (req, res) => {

    const users = {
        targetUser : req.params.targetuser,
        user : req.session.currentUser
    }
    res.render('user/send-message', users)
})


router.post('/sendmsg/:targetuser', isLoggedIn, (req, res) => {

    const user = req.session.currentUser
    const targetUser = req.params.targetuser

    const message = req.body

    User
    .findOne({ username: targetUser })
    .then(response => {
        Message
        .create({ authorId: user._id, receiverId: response._id, subject: message.subject, content: message.content })
        .then(() => res.redirect('/user/profile'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/follow/:targetUser', isLoggedIn, (req, res) => {


    const username  = req.session.currentUser
    const { targetUser } = req.params

    User
        .findOne({ 'username': targetUser })
        .then(response => {
            return User
                .findByIdAndUpdate( response._id, { $push: { followers: username._id}}, {new: true})
        })
        .then(response => {
            return User
                .findByIdAndUpdate( username._id, { $push: { following: response._id}}, {new: true})
        })
        .then((theUser) => {
            req.session.currentUser = theUser
            res.redirect('/user/profile')
        })
        .catch(err => console.log(err))
})


// router.get('/friendlist', isLoggedIn, (req, res) => {

//     const user = req.session.currentUser

//     User
//         .findById(user._id)
//         .populate('pendingFriends')
//         .populate('friends')
//         .then(theUser => {
//             console.log('pendingfriends', theUser.pendingFriends);
//             res.render('user/friend-list', {theUser})
//         })
//             .catch(err => console.log(err))
// })


// router.post('/friendlist/:targetId/accept', (req, res) => {

//     const { targetId } = req.params
//     const user  = req.session.currentUser

//     User
//         .findByIdAndUpdate( user._id, { $push: { friends: targetId }})
//         .then(() => {
//             return User
//                 .findByIdAndUpdate( user._id, { $pull: { pendingFriends: targetId }})
//         })
//         .catch(err => console.log(err))

//     User
//         .findByIdAndUpdate( targetId, { $push: { friends: user._id }})
//         .then(() => {
//             return User
//                 .findByIdAndUpdate( targetId, { $pull: { pendingFriends: user._id }})
//         })
//         .then(() => res.redirect('/user/friendlist'))
//         .catch(err => console.log(err))

// })

// router.post('/friendlist/:targetId/reject', (req, res) => {

//     const { targetId } = req.params
//     const user = req.session.currentUser

//     User
//         .findByIdAndUpdate( user._id, { $pull: { pendingFriends: targetId }})
//         .then(() => {
//             res.redirect('/user/friendlist')
//         })
//         .catch(err => console.log(err))

// })

module.exports = router;
