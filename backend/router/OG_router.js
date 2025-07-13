const express = require('express')
const { signup, verify, setpassword, UserInfo, logout, login, resetpass, resetverify, resetsetpassword, Address } = require('../controller/user_control.js')
const { signgu, signpst, signat, resetRg, resetrepst, authLocation,  } = require('../middleware/OGauth.js')
const router = express.Router()

router.route('/signup').post(signup)
router.route('/address').put( signat, UserInfo)
router.route('/to/address').post( signat, Address)


router.route('/login').post(login)
router.route('/logout').get(signat, authLocation, logout)


//auth check for frontend


router.get('/token', signat, async(req, res) => {
    res.json({user: req.Atoken})
    console.log(req.user)
});

router.get('/authlocation', authLocation, async(req, res) => {
    res.json({user: req.location})
    console.log(req.user)
});


module.exports = router