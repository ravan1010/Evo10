const express = require('express')
const router = express.Router()
const {signat, authLocation} = require('../middleware/OGauth.js')
const { home, getpost, search, searchResult, eventpostbyid, eventAvailabledates, booking, setting, address, success, booked, eventpostdataforbook, eventAvailabledatesandcategory } = require('../controller/UI.controller.js')
const event_post_model = require('../model/event_post_model.js')
const user_model = require('../model/user_model.js')
const reviewSchema = require('../model/reviewSchema.js')
const { sign } = require('crypto')

router.route('/getpost-by-category').get( home )
router.route('/search').get( search )
router.route('/searchResult').get( searchResult )

router.route('/get-post-for-event-id').get(eventpostbyid)
router.route('/availabledates').get(eventAvailabledates)

router.route('/get-post-for-event-id-to-book').get(signat, eventpostdataforbook)
router.route('/availabledates-to-book').get(signat, eventAvailabledatesandcategory)
 
router.route('/booking').post(signat, booking)
router.route('/success').get(signat, success)
router.route('/booked').get(signat, booked)

router.route('/setting').get(signat, setting)
router.route('/address-list').get(signat, address)


module.exports = router

