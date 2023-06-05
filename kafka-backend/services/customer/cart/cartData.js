
const OrderDetails = require("../../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../../Models/RestaurantDetailsModel");
const Orders  = require( "../../../Models/OrdersModel");

class CartData {

    constructor() {
    } 

    async addItem(cartDetails, callback){
      try {

        let order = await Orders.findOne({
          customerId: cartDetails.customerId,
          finalStatus: "New",
        }).exec();

        if (order) {
  
          let mainOrderId = order._id;
    
          let orderDetail =  new OrderDetails({
            orderId: mainOrderId,
            foodId: cartDetails.foodId,
            restaurantId: cartDetails.restaurantId,
            customerId: cartDetails.customerId,
            dishName: cartDetails.foodName,
            price: cartDetails.dishPrice,
            quantity: cartDetails.quantity,
            amount: cartDetails.dishPrice * cartDetails.quantity,
          });
          orderDetail.save();
     
          callback(null, { Message: "Added to cart", orderId: mainOrderId });
        } else {

          let order =  new Orders({
            restaurantId: cartDetails.restaurantId,
            customerId: cartDetails.customerId,
            finalStatus: "New",
            deliveryOrPickup: cartDetails.deliveryType,
          });
    
          order.save().then(()=>{
           let mainOrderId = order._id;
    
            let orderDetail =  new OrderDetails({
              orderId: mainOrderId,
              foodId: cartDetails.foodId,
              restaurantId: cartDetails.restaurantId,
              customerId: cartDetails.customerId,
              dishName: cartDetails.foodName,
              price: cartDetails.dishPrice,
              quantity: cartDetails.quantity,
              amount: cartDetails.dishPrice * cartDetails.quantity,
            });
            orderDetail.save().then(()=>{
              callback(null, { Message: "Added to cart", orderId: mainOrderId });
            });

          });
        }
      } catch (exception) {
        callback({ message: exception }, null);
      }

    }

    async removeItem(cartDetails, callback){
        // try {
        //     if (cartDetails.quantity === 0) {
        //       await OrderDetails.findOneAndDelete({
        //         _id: cartDetails._id,
        //       }).exec();
        
          
        //     } else {
        //       let orderDetail = await OrderDetails.findOne({
        //         _id: cartDetails._id,
        //       }).exec();
        
        //       if (orderDetail) {
        //         OrderDetails.updateOne(orderDetail, {
        //           quantity: cartDetails.quantity,
        //           amount: cartDetails.quantity * cartDetails.price,
        //         }).exec();
        //       }
        //     }
        
        //     let restaurant = await RestaurantDetails.findOne({
        //       _id: cartDetails.restaurantId,
        //     }).exec();
        
        //     let orderDetail = await OrderDetails.find({
        //       customerId: cartDetails.customerId,
        //       orderId: cartDetails.orderId,
        //     }).exec();
        
        //     let result = orderDetail.map((element) => {
        //       return {
        //         ...element._doc,
        //         restaurantName: restaurant.restaurantName,
        //       };
        //     });
        
        //     result = JSON.parse(JSON.stringify(result));
        //     callback(null, result);
        //   } catch (exception) {
        //     callback({ message: exception }, null);
        //   }

    }
    
}

module.exports = new CartData();