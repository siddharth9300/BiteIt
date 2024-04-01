const router = require("express").Router();
const {getOrdersByAdmin, updateOrder, getOrdersByUser} = require('../controllers/orderController');
// Routes accessible by admin
const { verifyToken } = require("../middlewares/verifyToken");

router.get('/ordersByAdmin',verifyToken, getOrdersByAdmin);
router.put('/updateOrder/:orderId',verifyToken, updateOrder);

// Routes accessible by users
router.get('/ordersByUser',verifyToken, getOrdersByUser);

module.exports = router;
