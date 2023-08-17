const Router = require('express')
const router = new Router()

const productRoute = require('./productRoute')
const recieptsRoute = require('./recieptsRoute')
const products_in_recieptsRoute = require('./products_in_recieptsRoute')

router.use('/product', productRoute)
router.use('/reciept', recieptsRoute)
router.use('/product_reciept', products_in_recieptsRoute)

module.exports = router
