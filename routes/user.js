const express = require('express');
const router = express.Router();
const {signIn,login} = require('../controller/user')

router
    .route('/')
    .post(signIn);
    
router
    .route('/login')
    .post(login);


module.exports = router;