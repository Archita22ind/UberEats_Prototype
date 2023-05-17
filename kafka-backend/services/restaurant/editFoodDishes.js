const RestaurantDishes = require("../../Models/RestaurantDishesModel");

//API to edit food details on the restaurant page

const handle_request = async (foodDetails, callback) => {
  try {
    const filter = {
      _id: foodDetails.foodId,
      restaurantId: foodDetails.restaurantId,
    };
    const update = {
      dishName: foodDetails.dishName,
      price: foodDetails.price,
      description: foodDetails.description,
      dishType: foodDetails.dishType,
      dishCategory: foodDetails.dishCategory,
      mainIngredients: foodDetails.ingredients,
      cuisine: foodDetails.cuisine,
      image: foodDetails?.image,
    };

    let restaurantDish = await RestaurantDishes.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    if (restaurantDish) {
      callback(null, { responseFlag: "Success" });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
