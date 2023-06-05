const SortListOfRestaurants = require("./sortListOfRestaurants");
// const GetStrategy  = require( "./model/getListOfRestaurantsDao");
// const getCustomerDetails  = require( "./model/getCustomerDetails");
const { getCustomerDetails } = require('./model/getCustomerDetails');
const { getStrategy}  = require( "./model/getListOfRestaurantsDao");



const handle_request = async (listDetails, callback) => {
  try {


    const customerDetail = await getCustomerDetails(listDetails);

    if (!customerDetail) throw new Error('Customer not found');

    const customerLocation = customerDetail.city;
    const resultFavRest = customerDetail.favoriteRestaurant;

    let restaurantDetail = [];

    const strategy = getStrategy(listDetails);
    restaurantDetail = await strategy(listDetails);


    // if restaurantDetail is undefined or empty
    if (!restaurantDetail || restaurantDetail.length === 0) {
      callback(null, []);
      return;
    }
    
    const newList = restaurantDetail.map((restaurant) => {
      const isLiked = resultFavRest.includes(restaurant._id);
      return {
        ...restaurant._doc,
        isLiked: isLiked,
      };
    });
      
    const orderOfRestaurants = SortListOfRestaurants(newList, customerLocation);
    callback(null, orderOfRestaurants);

  } catch (exception) {
    console.error(exception); 
    callback({ message: "An error occurred while processing your request." }, null);
  }
};
  
exports.handle_request = handle_request;
