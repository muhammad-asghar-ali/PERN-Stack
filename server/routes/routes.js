const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')

router.get('/', restaurantController.getAllRestaurant)
router.get('/:restaurantId', restaurantController.getRestaurant)
router.post('/', restaurantController.createRestaurant)
router.put('/:restaurantId', restaurantController.updateRestaurant)
router.delete('/:restaurantId', restaurantController.deleteRestaurant)

router.post('/:restaurantId/addReview', restaurantController.addNewReview)


module.exports = router