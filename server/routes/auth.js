const router = require('express').Router();
const { signUp, signIn, googleAuth } = require('../controller/auth')

// CREATE USER AND SING IN
router.post('/signUp',signUp );

router.post('/signIn', signIn );

// Google Auth
router.post('/google', googleAuth)

module.exports = router