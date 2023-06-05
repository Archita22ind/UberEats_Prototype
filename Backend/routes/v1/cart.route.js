const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../Controller/Common/passport");
const {
  showCartDetails,
  addOrdertoCart,
  updateCartOrderDetails,
  createNewOrder,
} = require("../../Controller/customerControllers/cart.controller");

router.route("/showCartDetails").post(checkAuth, showCartDetails);

router.route("/addOrdertoCart").post(checkAuth, addOrdertoCart);

router.route("/updateCartOrderDetails").post(checkAuth, updateCartOrderDetails);

router.route("/createNewOrder").post(checkAuth, createNewOrder);

module.exports = router;
