"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const config = require("./config");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

// Setup work and export for the JWT passport strategy

function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret_key,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      if (jwt_payload.restaurantId) {
        const user_id = jwt_payload.restaurantId;

        RestaurantDetails.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }

          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      } else {
        const user_id = jwt_payload.customerID;
        CustomerDetails.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
    })
  );
}
exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
