
const router = require('express').Router()
const { getOrder} = require('../controller/appController')


router.post('/getOrder', getOrder)


module.exports = router