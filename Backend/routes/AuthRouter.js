

const express = require('express');
const { login } = require('../controllers/LoginController');
const { signup } = require('../controllers/SignupController');
const router = express.Router();

// router.get('/login', (req,res)=>{
//     res.send('signup page')
// })

router.post('/signup', signup)
router.post('/login', login)
module.exports = router;