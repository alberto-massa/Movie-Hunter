const express = require('express');
const router = express.Router();

const Comment = require('./../models/Comment.model')


router.get('/commentlist', (req, res) => {

    Comment
        .find({ 'isValidated': false })
        .populate('authorId')
        .then(theComments => {
            res.render('mod/comment-list', {theComments})
        })
        .catch(err => console.log(err))
})

router.get('/:commentId/accept', (req, res) => {

    const {commentId} = req.params
    console.log(commentId);

    Comment
        .findByIdAndUpdate( commentId, { 'isValidated': true })
        .then(() => res.redirect('/mod/commentlist'))
        .catch(err => console.log(err))
})

router.get('/:commentId/delete', (req, res) => {

    const {commentId} = req.params

    Comment
        .findByIdAndRemove( commentId )
        .then(() => res.redirect('/mod/commentlist'))
        .catch(err => console.log(err))
})

module.exports = router