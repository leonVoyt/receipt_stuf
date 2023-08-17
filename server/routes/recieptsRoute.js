const Router = require('express')
const router = new Router()
const recieptController = require('../controllers/recieptController')

router.post('/', recieptController.create)
router.get('/', recieptController.getAll)
router.delete('/delete/:id', recieptController.delete)
router.delete('/deleteUnPayed', recieptController.deleteUnPayed)
router.patch('/update', recieptController.updateOne)

module.exports = router
