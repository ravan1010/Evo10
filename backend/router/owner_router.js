const express = require('express')
const { ownersignup, ownersignupOTPverify, imageCreate, getdata, imagedelete } = require('../controller/owner_controller')
const { ownertoken } = require('../middleware/owner')
const router = express.Router()

router.route('/owner/log').post(ownersignup)
router.route('/owner/verify').post(ownersignupOTPverify)

router.route('/owner/image').post(ownertoken, imageCreate)
router.route('/owner/getdata').get(ownertoken, getdata)
router.route('/owner/delete/:id').delete(ownertoken, imagedelete)


 
router.get('/owner/token', ownertoken, (req, res) => {
    res.json({owner: req.owner})
});

module.exports = router
