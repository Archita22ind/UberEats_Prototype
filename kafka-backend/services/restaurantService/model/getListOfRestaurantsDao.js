const constants = require( "../../constants/constants");
const RestaurantDetails = require( "../../../Models/RestaurantDetailsModel");
const RestaurantDishes = require( "../../../Models/RestaurantDishesModel");

// Helper function for getting delivery type
const getDeliveryType = (listDetails) => {
   if(listDetails.deliveryType === 'delivery'){
    return "deliveryFlag";
   }
   else{
    return "pickupFlag";
   }
    //return listDetails.deliveryType === constants.PICK_UP ? constants.PICK_UP_FLAG : constants.DELIVERY_FLAG;
};

// Factory for creating restaurant fetch strategies
const restaurantFetchStrategyFactory = {
    noFilterNoTypeahead: async (listDetails) => {
        return await RestaurantDetails.find({ [getDeliveryType(listDetails)]: "Yes" }).exec();
    },
  
    filterNoTypeahead: async (listDetails) => {
        const dishList = await RestaurantDishes.find({ dishType: { $in: listDetails.filter } }).exec();
        const restaurantIdList = dishList.map(v => v.restaurantId);
    
        if (restaurantIdList.length > 0) {
          return await RestaurantDetails.find({ [getDeliveryType(listDetails)]: "Yes", _id: { $in: restaurantIdList } }).exec();
        }
    
        return [];
    },
  
    filterWithTypeahead: async (listDetails) => {
        const dishList = await RestaurantDishes.find({
          dishType: { $in: listDetails.filter },
          restaurantId: { $in: listDetails.typeaheadValue },
        }).exec();
    
        const restaurantIdList = dishList.map(v => ({ restaurantId: v.restaurantId }));
    
        return await RestaurantDetails.find({ [getDeliveryType(listDetails)]: "Yes", _id: { $in: restaurantIdList } }).exec();
    },
  
    noFilterWithTypeahead: async (listDetails) => {
        const dishList = await RestaurantDishes.find({ _id: { $in: listDetails.typeaheadValue } }).exec();
        const restaurantIdList = dishList ? dishList.map(v => v.restaurantId) : listDetails.typeaheadValue;
    
        const restaurantDetail = await RestaurantDetails.find({ [getDeliveryType(listDetails)]: "Yes", _id: { $in: restaurantIdList } }).exec();
    
        return restaurantDetail.map(v => v._id);
    }
};


const getStrategy =  (listDetails) => {

    if (listDetails.filter.length === 0 && listDetails.typeaheadValue.length === 0) {
   
      return restaurantFetchStrategyFactory.noFilterNoTypeahead;
    } else if (listDetails.filter.length > 0 && listDetails.typeaheadValue.length === 0) {

      return restaurantFetchStrategyFactory.filterNoTypeahead;
    } else if (listDetails.filter.length > 0 && listDetails.typeaheadValue.length > 0) {

      return restaurantFetchStrategyFactory.filterWithTypeahead;
    } else {

      return restaurantFetchStrategyFactory.noFilterWithTypeahead;
    }
};

exports.getStrategy = getStrategy;