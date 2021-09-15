const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { CDNupload } = require('../config/upload.config');
const { isLoggedIn, checkRoles } = require("../middleware")

router.get('/users', isLoggedIn, checkRoles('Admin'), (req, res) => {

  User
    .find()
    .then((user) => res.render('admin/user-list', {user}))
    .catch(err => console.log(err))
  })

router.get('/delete/:_id', isLoggedIn, checkRoles('Admin'), (req, res) => {

  const {_id} = req.params

  User
    .findByIdAndRemove(_id)
    .then(() => res.redirect('/admin/users'))
    .catch(err => console.log(err))
})

router.get('/delete-user/:_id', isLoggedIn, checkRoles('Admin'), (req, res) => {

  const {_id} = req.params

  User
    .findById(_id)
    .then((user) => {
      res.render('admin/confirm-delete', {user})
    })
    .catch(err => console.log(err))
})

router.get('/edit/:username', isLoggedIn, checkRoles('Admin'), (req, res) => {

  const {username} = req.params

  User
    .findOne({username})
    .then(user => {
      res.render('admin/user-edit', {user})
    })
    .catch(err => console.log(err))
})


router.post('/edit/:user', CDNupload.single('avatar'), isLoggedIn, checkRoles('Admin'), (req, res) => {

  const { _id, username, email } = req.body

  const query = {
    username,
    email,
  }

  if (req.file) query.avatar = req.file.path

  User
    .findByIdAndUpdate(_id, query)
    .then(() => res.redirect('/admin/users'))
    .catch(err => console.log(err))
})

module.exports = router