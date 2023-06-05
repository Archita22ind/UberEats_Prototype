const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../Controller/Common/passport");

const {
  getDeliveryAddress,
  addDeliveryAddress,
  getOrderTotal,
  getDeliveryType,
  bookOrder,
} = require("../../Controller/customerControllers/checkout.controller");

router.route("/getDeliveryAddress").get(checkAuth, getDeliveryAddress);

router.route("/addDeliveryAddress").post(checkAuth, addDeliveryAddress);

router.route("/getOrderTotal").get(checkAuth, getOrderTotal);

router.route("/getDeliveryType").get(checkAuth, getDeliveryType);

router.route("/bookOrder").post(checkAuth, bookOrder);

module.exports = router;
