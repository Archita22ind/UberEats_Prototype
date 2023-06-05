const express = require("express");
const router = express.Router();
const { uploadS3 } = require("../../utils/uploadS3");
const { checkAuth } = require("../../Controller/Common/passport");
const {
  getProfileInfo,
  updateProfileInfo,
  getFavoriteRestaurants,
  createFavouritesList,
} = require("../../Controller/customerControllers/customerDetails.controller");

router.route("/getProfileInfo").get(checkAuth, getProfileInfo);

router
  .route("/updateProfileInfo")
  .post(checkAuth, uploadS3.single("file"), updateProfileInfo);

router.route("/getFavoriteRestaurants").post(checkAuth, getFavoriteRestaurants);

router.route("/createFavouritesList").post(checkAuth, createFavouritesList);

module.exports = router;
