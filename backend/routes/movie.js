const express = require('express')
const getmovies = require('../controllers/Findmovies')
const registeruser = require('../controllers/RegisterUser')
const loginuser = require('../controllers/loginuser')

const router = express.Router() // creates instance of the router so that we can use in other files

router.get('/find/:name',getmovies)

router.post('/register',registeruser)

router.post('/login',loginuser)

module.exports = router