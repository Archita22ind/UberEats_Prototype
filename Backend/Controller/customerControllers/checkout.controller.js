const make_request = require("../../utils/makeRequest");

const getDeliveryAddress = (req, res) =>
  make_request(req.query, res, "deliveryAddress");

const addDeliveryAddress = (req, res) =>
  make_request(req.body, res, "addDeliveryAddress");

const getOrderTotal = (req, res) => make_request(req.query, res, "orderTotal");

const getDeliveryType = (req, res) =>
  make_request(req.query, res, "deliveryType");

const bookOrder = (req, res) => make_request(req.body, res, "bookorder");

module.exports = {
  getDeliveryAddress,
  addDeliveryAddress,
  getOrderTotal,
  getDeliveryType,
  bookOrder,
};
