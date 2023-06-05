const make_request = require("../../utils/makeRequest");

const getProfileInfo = (req, res) =>
  make_request(req.query, res, "profileInfo");

const updateProfileInfo = (req, res) => {
  const requestData = { ...req.body, image: req.file?.location };
  return make_request(requestData, res, "updateProfileInfo");
};

const getFavoriteRestaurants = (req, res) =>
  make_request(req.body, res, "favoriteRestaurant");

const createFavouritesList = (req, res) =>
  make_request(req.body, res, "createFavorite");

module.exports = {
  getProfileInfo,
  updateProfileInfo,
  getFavoriteRestaurants,
  createFavouritesList,
};
