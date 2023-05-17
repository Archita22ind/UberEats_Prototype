const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const jwt = require("jsonwebtoken");
const config = require("../../kafka/config");

const handle_request = async (restaurantRegistrationDetails, callback) => {
  try {
    let restaurantDetail = await RestaurantDetails.findOne({
      emailId: restaurantRegistrationDetails.emailId,
      password: restaurantRegistrationDetails.password,
    });

    if (restaurantDetail) {
      const payload = {
        restaurantId: restaurantDetail._id,
        restaurantFlag: true,
      };

      const token = jwt.sign(payload, config.secret_key, {
        expiresIn: 1008000,
      });

      callback(null, { token: `JWT ${token}` });
    } else {
      callback({ message: "Incorrect Email ID or Password Login!" }, null);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
