import Orders from "../../Models/OrdersModel";
import RestaurantDetails from "../../Models/RestaurantDetailsModel";

const handle_request = async (orderDetails, callback) => {
  let order;
  let skip, limit;
  try {
    limit = parseInt(orderDetails.take);
    skip = parseInt(orderDetails.skip);

    if (orderDetails.orderStatus.length === 0) {
      order = await Orders.find({
        customerId: orderDetails.customerId,
      }).sort({dateOrdered: 'descending'})
        .limit(limit)
        .skip(skip)
        .exec();
    } else {
      order = await Orders.find({
        customerId: orderDetails.customerId,
        finalStatus: orderDetails.orderStatus,
      }).sort({dateOrdered: 'descending'})
        .limit(limit)
        .skip(skip)
        .exec();
    }

    if (order) {
      let listOfRestaurantIds = order.map((element) => {
        return element.restaurantId;
      });

      let restaurant = await RestaurantDetails.find({
        _id: { $in: listOfRestaurantIds },
      }).exec();

      let restaurantList = {};

      restaurant.forEach((element) => {
        restaurantList = {
          ...restaurantList,
          [element._id]: element.restaurantName,
        };
      });

      let result = order.map((element) => {
        return {
          ...element._doc,
          restaurantName: restaurantList[element.restaurantId],
        };
      });

      callback(null, result);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

export default handle_request;
