const express = require('express');
const router = express.Router();

const { isLoggedIn, checkRoles } = require("../middleware")

const Comment = require('./../models/Comment.model')

router.get('/commentlist', isLoggedIn, checkRoles('Admin', 'Mod'), (req, res) => {

    Comment
        .find({ 'isValidated': false })
        .populate('authorId')
        .then(theComments => {
            res.render('mod/comment-list', {theComments})
        })
        .catch(err => console.log(err))
})

router.get('/:commentId/accept', isLoggedIn, checkRoles('Admin', 'Mod'), (req, res) => {

    const {commentId} = req.params
    console.log(commentId);

    Comment
        .findByIdAndUpdate( commentId, { 'isValidated': true })
        .then(() => res.redirect('/mod/commentlist'))
        .catch(err => console.log(err))
})

router.get('/:commentId/delete', isLoggedIn, checkRoles('Admin', 'Mod'), (req, res) => {

    const {commentId} = req.params

    Comment
        .findByIdAndRemove( commentId )
        .then(() => res.redirect('/mod/commentlist'))
        .catch(err => console.log(err))
})


module.exports = router