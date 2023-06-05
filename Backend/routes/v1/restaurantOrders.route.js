const express = require("express");
const router = express.Router();
const { uploadS3 } = require("../../utils/uploadS3");
const { checkAuth } = require("../../Controller/Common/passport");
const {
  getRestaurantOrders,
  getRestaurantOrdersDetails,
  showCustomerProfile,
  updateOrderStatus,
} = require("../../Controller/restaurantControllers/orders.controller");

router.route("/getRestaurantOrders").post(checkAuth, getRestaurantOrders);

router
  .route("/showRestaurantOrderDetails")
  .post(checkAuth, getRestaurantOrdersDetails);

router.route("/showCustomerProfile").post(checkAuth, showCustomerProfile);

router.route("/updateOrderStatus").post(checkAuth, updateOrderStatus);

module.exports = router;
