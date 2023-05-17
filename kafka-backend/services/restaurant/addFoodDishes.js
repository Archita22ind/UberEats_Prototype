const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const RestaurantDishesModel = require("../../Models/RestaurantDishesModel");

const handle_request = async (foodDetails, callback) => {
  const RestaurantDish = new RestaurantDishesModel({
    ...foodDetails,
    image: foodDetails?.image,
  });

  RestaurantDish.save();
  callback(null, { message: "Dish Added" });
};

exports.handle_request = handle_request;
