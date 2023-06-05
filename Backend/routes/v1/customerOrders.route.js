const express = require("express");
const router = express.Router();
const { uploadS3 } = require("../../utils/uploadS3");
const { checkAuth } = require("../../Controller/Common/passport");
const {
  getPastOrders,
  getReceiptDetails,
  updateOrderStatus,
} = require("../../Controller/customerControllers/orders.controller");

router.route("/getPastOrders").post(checkAuth, getPastOrders);

router.route("/getReceiptDetails").post(checkAuth, getReceiptDetails);

router.route("/updateOrderStatus").post(checkAuth, updateOrderStatus);

module.exports = router;
