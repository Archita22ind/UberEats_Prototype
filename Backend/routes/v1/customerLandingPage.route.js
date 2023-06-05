const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../Controller/Common/passport");
const {
  getCustomerLocation,
  getListOfRestaurants,
  getTypeaheadList,
} = require("../../Controller/customerControllers/landingPage.controller");

router.route("/getListOfRestaurants").post(checkAuth, getListOfRestaurants);

router.route("/getCustomerLocation").post(checkAuth, getCustomerLocation);

router.route("/getTypeaheadList").post(checkAuth, getTypeaheadList);

module.exports = router;
