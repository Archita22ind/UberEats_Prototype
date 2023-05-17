import constants from "../../constants/constants";
import RestaurantDetails from "../../../Models/RestaurantDetailsModel";
import RestaurantDishes from "../../../Models/RestaurantDishesModel";

// Helper function for getting delivery type
const getDeliveryType = (listDetails) => {
    return listDetails.deliveryType === constants.PICK_UP ? constants.PICK_UP_FLAG : constants.DELIVERY_FLAG;
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

export default (listDetails) => {
    if (!listDetails.filter && !listDetails.typeaheadValue) {
      return restaurantFetchStrategyFactory.noFilterNoTypeahead;
    } else if (listDetails.filter.length > 0 && !listDetails.typeaheadValue) {
      return restaurantFetchStrategyFactory.filterNoTypeahead;
    } else if (listDetails.filter.length > 0 && listDetails.typeaheadValue.length > 0) {
      return restaurantFetchStrategyFactory.filterWithTypeahead;
    } else {
      return restaurantFetchStrategyFactory.noFilterWithTypeahead;
    }
};
