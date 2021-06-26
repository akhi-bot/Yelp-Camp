const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/users')
const users = require('../controllers/users')
const catchAsync = require('../utils/catchAsync')
const { route } = require('./campground')


router.route('/register')
    .get( users.renderRegister)
    .post( users.register)

router.route('/login')
    .get(users.renderLogin)
    .post( passport.authenticate('local', {failureFlash: true, failureRedirect: "/login"}), users.login)

router.get('/logout',users.logout)

module.exports = router;