const make_request = require("../../utils/makeRequest");

const getPastOrders = (req, res) => make_request(req.body, res, "pastOrders");

const getReceiptDetails = (req, res) =>
  make_request(req.body, res, "receiptDetails");

const updateOrderStatus = (req, res) =>
  make_request(req.body, res, "orderStatusUpdate");

module.exports = {
  getPastOrders,
  getReceiptDetails,
  updateOrderStatus,
};
