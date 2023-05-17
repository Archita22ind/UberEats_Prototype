import Orders from "../../Models/OrdersModel";

const handle_request = async (deliveryType, callback) => {
  try {
    let order = await Orders.findOne({
      customerId: deliveryType.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      callback(null, {
        orderId: order._id,
        deliveryType: order.deliveryOrPickup,
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

export default handle_request;
