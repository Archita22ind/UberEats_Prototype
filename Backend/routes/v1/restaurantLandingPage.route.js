const express = require("express");
const router = express.Router();
const { uploadS3 } = require("../../utils/uploadS3");
const { checkAuth } = require("../../Controller/Common/passport");
const {
  restaurantDetailsInfo,
  restaurantDetailsInfoUpdate,
  restaurantFoodDisplay,
  editFoodItem,
  addFoodItems,
} = require("../../Controller/restaurantControllers/landingPage.controller");

router.route("/restaurantDetailsInfo").get(checkAuth, restaurantDetailsInfo);

router
  .route("/restaurantDetailsInfoUpdate")
  .post(checkAuth, uploadS3.single("file"), restaurantDetailsInfoUpdate);

router.route("/foodItemsDisplay").get(checkAuth, restaurantFoodDisplay);

router
  .route("/editFoodItems")
  .post(checkAuth, uploadS3.single("file"), editFoodItem);

router
  .route("/addFoodItems")
  .post(checkAuth, uploadS3.single("file"), addFoodItems);

module.exports = router;
