const make_request = require("../../utils/makeRequest");

const restaurantDetailsInfo = (req, res) =>
  make_request(req.query, res, "restaurantDetails");

const restaurantDetailsInfoUpdate = (req, res) => {
  const requestData = { ...req.body, image: req.file?.location };
  return make_request(requestData, res, "restaurantDetailsUpdate");
};

const restaurantFoodDisplay = (req, res) =>
  make_request(req.query, res, "foodDetails");

const editFoodItem = (req, res) => {
  const requestData = { ...req.body, image: req.file?.location };
  return make_request(requestData, res, "editDish");
};

const addFoodItems = (req, res) => {
  const requestData = { ...req.body, image: req.file?.location };
  return make_request(requestData, res, "addDish");
};

module.exports = {
  restaurantDetailsInfo,
  restaurantDetailsInfoUpdate,
  restaurantFoodDisplay,
  editFoodItem,
  addFoodItems,
};
