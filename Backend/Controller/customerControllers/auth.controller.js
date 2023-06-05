const make_request = require("../../utils/makeRequest");

// const customerLogin = catchAsync((req, res) =>
//   make_request(req, res, "signInCustomer")
// );

const customerLogin = (req, res) =>
  make_request(req.body, res, "signInCustomer");

const customerSignup = (req, res) =>
  make_request(req.body, res, "registerCustomer");

module.exports = {
  customerLogin,
  customerSignup,
};
