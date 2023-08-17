const Router = require('express')
const router = new Router()
const products_in_recieptController = require('../controllers/product_in_recieptController')

router.post('/', products_in_recieptController.create)
router.get('/', products_in_recieptController.getAll)
router.delete('/delete/:productId', products_in_recieptController.delete)
router.delete('/deleteAll/:recieptId', products_in_recieptController.deleteAll)
router.patch('/patch', products_in_recieptController.updateOne)

module.exports = router
