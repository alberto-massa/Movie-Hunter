const express = require('express');
const router = express.Router();
// const {checkId, isLoggedIn, checkRoles } = require("./../middleware")
const User = require('./../models/User.model')
const { CDNupload } = require('../config/upload.config');
const { nextTick } = require('process');
const { findById } = require('./../models/User.model');

router.get('/users', (req, res) => {

  User
    .find()
    .then((user) => res.render('admin/user-list', {user}))
    .catch(err => console.log(err))
  })

router.get('/delete/:_id', (req, res) => {

  const {_id} = req.params

  User
    .findByIdAndRemove(_id)
    .then(() => res.redirect('/admin/users'))
    .catch(err => console.log(err))
})

router.get('/delete-user/:_id', (req, res) => {

  const {_id} = req.params

  User
    .findById(_id)
    .then((user) => {
      res.render('admin/confirm-delete', {user})
    })
    .catch(err => console.log(err))
})

router.get('/edit/:username', (req, res) => {

  const {username} = req.params

  User
    .findOne({username})
    .then(user => {
      res.render('admin/user-edit', {user})
    })
    .catch(err => console.log(err))
})


router.post('/edit/:user', CDNupload.single('avatar'), (req, res) => {

  const { _id, username, email } = req.body

  User
    .findByIdAndUpdate(_id, { username, email, avatar: req.file.path })
    .then(() => res.redirect('/admin/users'))
    .catch(err => console.log(err))
})

module.exports = router