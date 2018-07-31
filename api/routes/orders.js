const express = require('express');
const router = express.Router();
const checkAuth = require('../middelware/check-auth');
const OrderController = require('../controllers/OrderController');


router.get('/', checkAuth, OrderController.getAllOrders);
router.get('/:id', checkAuth, OrderController.getOrderById);
router.post('/', checkAuth, OrderController.createOrder);
router.put('/:id', checkAuth, OrderController.updateOrder);
router.delete('/:id', checkAuth, OrderController.deleteOrder);

module.exports = router;