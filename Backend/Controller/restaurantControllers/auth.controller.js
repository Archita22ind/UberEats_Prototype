const make_request = require("../../utils/makeRequest");

const restaurantLogin = (req, res) =>
  make_request(req.body, res, "signInRestaurant");

const restaurantSignup = (req, res) =>
  make_request(req.body, res, "registerRestaurant");

module.exports = {
  restaurantLogin,
  restaurantSignup,
};
