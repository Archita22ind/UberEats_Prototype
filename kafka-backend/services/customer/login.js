
const CustomerDetails = require("../../Models/CustomerDetailsModel");
const jwt = require("jsonwebtoken");
const config = require("../../kafka/config");

const handle_request = async (signInDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      emailId: signInDetails.emailId,
      password: signInDetails.password,
    });

    if (customerDetail) {
      const payload = {
        customerID: customerDetail._id,
        restaurantFlag: false,
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
