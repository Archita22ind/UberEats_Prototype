import SortListOfRestaurants from "./sortListOfRestaurants";
import getCustomerDetail from "./model/getCustomerDetail";
import GetStrategy from "./model/getListOfRestaurantsDao";

const handle_request = async (listDetails, callback) => {
  try {
    const customerDetail = await getCustomerDetail(listDetails);

    if (!customerDetail) throw new Error('Customer not found');

    const customerLocation = customerDetail.city;
    const resultFavRest = customerDetail.favoriteRestaurant;

    let restaurantDetail = [];

    const strategy = GetStrategy(listDetails);
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
  
export default { handle_request };
