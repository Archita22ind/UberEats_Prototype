const express = require("express");
const router = express.Router();
const {
  customerLogin,
  customerSignup,
} = require("../../Controller/customerControllers/auth.controller");

const {
  restaurantLogin,
  restaurantSignup,
} = require("../../Controller/restaurantControllers/auth.controller");
const validate = require("../../middleware/validate");
const authValidation = require("../../validations/auth.validation");

router
  .route("/customerSignIn")
  .post(validate(authValidation.login), customerLogin);

router.route("/customerSignUpInfo").post(customerSignup);

router.route("/restaurantLoginInfo").post(restaurantLogin);

router.route("/restaurantSignUpInfo").post(restaurantSignup);

module.exports = router;
