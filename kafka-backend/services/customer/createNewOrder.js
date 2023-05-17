import Orders from "../../Models/OrdersModel";
import OrderDetails from "../../Models/OrderDetailsModel";

const handle_request = async (customerDetails, callback) => {
  let customerId = customerDetails.customerId;

  try {
    let order = await Orders.findOne({
      customerId: customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      let orderId = order._id;
      await OrderDetails.deleteMany({
        orderId: orderId,
      }).exec();

      await Orders.updateOne(order, {
        restaurantId: customerDetails.restaurantId,
      });

      let orderDetail =  new OrderDetails({
        orderId: orderId,
        foodId: customerDetails.foodId,
        restaurantId: customerDetails.restaurantId,
        customerId: customerDetails.customerId,
        dishName: customerDetails.foodName,
        price: customerDetails.dishPrice,
        quantity: customerDetails.quantity,
        amount: (customerDetails.dishPrice * customerDetails.quantity).toFixed(2),
      });
      await orderDetail.save();

      callback(null, {
        Message: "Added to cart",
        orderId: orderId,
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

export default handle_request;
