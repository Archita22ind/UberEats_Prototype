const make_request = require("../../utils/makeRequest");

const getRestaurantOrders = (req, res) =>
  make_request(req.body, res, "restaurantOrders");

const getRestaurantOrdersDetails = (req, res) =>
  make_request(req.body, res, "restaurantOrderDetails");

const showCustomerProfile = (req, res) =>
  make_request(req.body, res, "showCustomerProfile");

const updateOrderStatus = (req, res) =>
  make_request(req.body, res, "orderStatusUpdate");

module.exports = {
  getRestaurantOrders,
  getRestaurantOrdersDetails,
  showCustomerProfile,
  updateOrderStatus,
};
