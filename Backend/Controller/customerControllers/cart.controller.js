const make_request = require("../../utils/makeRequest");

const showCartDetails = (req, res) =>
  make_request(req.body, res, "cartDetails");

const addOrdertoCart = (req, res) =>
  make_request(req.body, res, "addOrdertoCart");

const updateCartOrderDetails = (req, res) =>
  make_request(req.body, res, "updateCartDetails");

const createNewOrder = (req, res) => make_request(req.body, res, "newOrder");

module.exports = {
  showCartDetails,
  addOrdertoCart,
  updateCartOrderDetails,
  createNewOrder,
};
