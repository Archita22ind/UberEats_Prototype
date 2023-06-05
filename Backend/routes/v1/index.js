const express = require("express");
const authRoute = require("./auth.route");
const restaurantLandingPageRoute = require("./restaurantLandingPage.route");
const customerLandingPageRoute = require("./customerLandingPage.route");
const restaurantOrdersRoute = require("./restaurantOrders.route");
const customerOrdersRoute = require("./customerOrders.route");
const customerDetailsRoute = require("./customerDetails.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/restaurantLandingPage",
    route: restaurantLandingPageRoute,
  },
  {
    path: "/customerLandingPage",
    route: customerLandingPageRoute,
  },
  {
    path: "/restaurantOrders",
    route: restaurantOrdersRoute,
  },
  {
    path: "/customerOrders",
    route: customerOrdersRoute,
  },
  {
    path: "/customerDetails",
    route: customerDetailsRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
  {
    path: "/checkout",
    route: checkoutRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
