const mongoose = require("mongoose");
const config = require("./kafka/config")
const connection = require("./kafka/Connection");

// Import all services
const LoginCustomer = require("./services/customer/login.js");
const RegisterCustomer = require("./services/customer/customerSignUpInfo");
const LoginRestaurant = require("./services/restaurantService/restaurantLoginInfo");
const RegisterRestaurant = require("./services/restaurantService/restaurantSignUpInfo");
const RestaurantDetails = require("./services/restaurantService/restaurantDetailsInfo");
const FoodDetails = require("./services/restaurantService/foodItemsDisplay");
const RestaurantDetailsUpdate = require("./services/restaurantService/restaurantDetailsInfoUpdate");
const AddDish = require("./services/restaurantService/addFoodDishes");
const EditDish = require("./services/restaurantService/editFoodDishes");
const ShowCustomerProfile = require("./services/restaurantService/showCustomerProfile");
const RestaurantOrders = require("./services/restaurantService/getRestaurantOrders");
const RestaurantOrderDetails = require("./services/restaurantService/showRestaurantOrderDetails");
const OrderStatusUpdate = require("./services/restaurantService/updateOrderStatus");
const ReceiptDetails = require("./services/orderService/getReceiptDetails");
const CustomerLocation = require("./services/customer/getCustomerLocation");
const ProfileInfo = require("./services/customer/getProfileInfo");
const UpdateProfileInfo = require("./services/customer/updateProfileInfo");
const DeliveryAddress = require("./services/customer/getDeliveryAddress");
const DeliveryType = require("./services/customer/getDeliveryType");
const AddDeliveryAddress = require("./services/customer/addDeliveryAddress");
const Bookorder = require("./services/orderService/bookOrder");
const OrderTotal = require("./services/orderService/getOrderTotal");
const PastOrders = require("./services/orderService/getPastOrders");
const CartDetails = require("./services/customer/showCartDetails");
const FavoriteRestaurant = require("./services/customer/getFavoriteRestaurants");
const CreateFavorite = require("./services/customer/createFavouritesList");
// beforre commandpattern
const UpdateCartDetails = require("./services/customer/updateCartOrderDetails");
// after commandpattern
// const UpdateCartDetails = require("./services/customer/cart/cartService");

const NewOrder = require("./services/orderService/createNewOrder");
const ListOfRestaurants = require("./services/restaurantService/getListOfRestaurants");

// const AddOrdertoCart = require("./services/restaurantService/addOrdertoCart"); //working currently
const AddOrdertoCart = require("./services/customer/cart/cartService");
const TypeaheadList = require("./services/restaurantService/getTypeaheadList");

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoose.url, config.mongoose.options, (err, res) => {
  if (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Exit process with failure
  } else {
    console.log("MongoDB connected!!");
  }
});

function handleTopicRequest(topic_name, fname) {
  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();
  console.log("server is running ");

  consumer.on("message", function (message) {
    const data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            error: err,
          }),
          partition: 0,
        },
      ];

      producer.send(payloads, (err, data) => {
        if (err) {
          console.error('Error sending message', err.message);
        }
      });
    });
  });

  consumer.on('error', (err) => {
    console.error('Error with consumer', err);
  });

  producer.on('error', (err) => {
    console.error('Error with producer', err);
  });
}

/* 
  Add the kafka TOPICs here
  first argument is topic name
  second argument is a function that will handle this topic request
*/
handleTopicRequest("signInCustomer", LoginCustomer);

handleTopicRequest("registerCustomer", RegisterCustomer);

handleTopicRequest("signInRestaurant", LoginRestaurant);

handleTopicRequest("registerRestaurant", RegisterRestaurant);

handleTopicRequest("restaurantDetails", RestaurantDetails);

handleTopicRequest("foodDetails", FoodDetails);

handleTopicRequest("restaurantDetailsUpdate", RestaurantDetailsUpdate);

handleTopicRequest("addDish", AddDish);

handleTopicRequest("editDish", EditDish);

handleTopicRequest("showCustomerProfile", ShowCustomerProfile);

handleTopicRequest("restaurantOrders", RestaurantOrders);

handleTopicRequest("restaurantOrderDetails", RestaurantOrderDetails);

handleTopicRequest("orderStatusUpdate", OrderStatusUpdate);

handleTopicRequest("receiptDetails", ReceiptDetails);

handleTopicRequest("customerLocation", CustomerLocation);

handleTopicRequest("profileInfo", ProfileInfo);

handleTopicRequest("updateProfileInfo", UpdateProfileInfo);

handleTopicRequest("deliveryAddress", DeliveryAddress);

handleTopicRequest("deliveryType", DeliveryType);

handleTopicRequest("addDeliveryAddress", AddDeliveryAddress);

handleTopicRequest("bookorder", Bookorder);

handleTopicRequest("orderTotal", OrderTotal);

handleTopicRequest("pastOrders", PastOrders);

handleTopicRequest("cartDetails", CartDetails);

handleTopicRequest("favoriteRestaurant", FavoriteRestaurant);

handleTopicRequest("createFavorite", CreateFavorite);

handleTopicRequest("updateCartDetails", UpdateCartDetails);

handleTopicRequest("newOrder", NewOrder);

handleTopicRequest("listOfRestaurants", ListOfRestaurants);

handleTopicRequest("addOrdertoCart", AddOrdertoCart);

handleTopicRequest("typeaheadList", TypeaheadList);
