
const router = require('express').Router()
const {signup, getOrder} = require('../controller/appController')


router.post('/user/signup', signup)
router.post('/product/getBill', getOrder)

module.exports = router