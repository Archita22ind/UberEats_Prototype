import Orders from "../../Models/OrdersModel";

const handle_request = async (registrationOrders, callback) => {
  let order;

  try {
    if (registrationOrders.orderStatus.length > 0) {
      order = await Orders.find({
        restaurantId: registrationOrders.restaurantId,
        finalStatus: registrationOrders.orderStatus,
      })
        .sort({ dateOrdered: "descending" })
        .exec();
    } else {
      order = await Orders.find({
        restaurantId: registrationOrders.restaurantId,
        finalStatus: { $ne: "New" },
      })
        .sort({ dateOrdered: "descending" })
        .exec();
    }

    if (order) {
      let newOrder = order.map((element) => {
        return {
          _id: element.id,
          totalPrice: element.totalPrice,
          totalQuantity: element.totalQuantity,
          deliveryAddress: element.deliveryAddress? element.deliveryAddress : "****Pickup Order****",
          dateOrdered: element.dateOrdered,
          orderStatus: element.finalStatus,
          customerId: element.customerId,
          deliveryType: element.deliveryOrPickup,
        };
      });

      callback(null, newOrder);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

export default handle_request;
