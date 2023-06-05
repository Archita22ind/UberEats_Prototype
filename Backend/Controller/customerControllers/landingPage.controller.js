const make_request = require("../../utils/makeRequest");

const getCustomerLocation = (req, res) =>
  make_request(req.body, res, "customerLocation");

const getListOfRestaurants = (req, res) =>
  make_request(req.body, res, "listOfRestaurants");

const getTypeaheadList = (req, res) =>
  make_request(req.body, res, "typeaheadList");

module.exports = {
  getCustomerLocation,
  getListOfRestaurants,
  getTypeaheadList,
};
