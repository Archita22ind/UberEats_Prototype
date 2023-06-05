const OrderDetails = require("../../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../../Models/RestaurantDetailsModel");
const Orders = require("../../../Models/OrdersModel");

class CartData {
    constructor() {}

    createOrderDetail(cartDetails, orderId, callback) {
        let orderDetail = new OrderDetails({
            orderId: orderId,
            foodId: cartDetails.foodId,
            restaurantId: cartDetails.restaurantId,
            customerId: cartDetails.customerId,
            dishName: cartDetails.foodName,
            price: cartDetails.dishPrice,
            quantity: cartDetails.quantity,
            amount: cartDetails.dishPrice * cartDetails.quantity,
        });

        orderDetail.save((err, doc) => {
            if (err) {
                callback({ message: `Failed to create OrderDetail: ${err.message}` }, null);
            } else {
                callback(null, doc);
            }
        });
    }

    async addItem(cartDetails, callback) {
        try {
            let order = await Orders.findOne({
                customerId: cartDetails.customerId,
                finalStatus: "New",
            }).exec();

            if (order) {
                this.createOrderDetail(cartDetails, order._id, (err, doc) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, { Message: "Added to cart", orderId: order._id });
                    }
                });
            } else {
                let order = new Orders({
                    restaurantId: cartDetails.restaurantId,
                    customerId: cartDetails.customerId,
                    finalStatus: "New",
                    deliveryOrPickup: cartDetails.deliveryType,
                });

                order.save((err, doc) => {
                    if (err) {
                        callback({ message: `Failed to create Order: ${err.message}` }, null);
                    } else {
                        this.createOrderDetail(cartDetails, doc._id, (err, doc) => {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, { Message: "Added to cart", orderId: doc._id });
                            }
                        });
                    }
                });
            }
        } catch (exception) {
            callback({ message: `Failed to add item: ${exception.message}` }, null);
        }
    }

    async removeItem(cartDetails, callback) {
        try {
            if (cartDetails.quantity === 0) {
                await OrderDetails.findOneAndDelete({
                    _id: cartDetails._id,
                }).exec();
            } else {
                let orderDetail = await OrderDetails.findOne({
                    _id: cartDetails._id,
                }).exec();

                if (orderDetail) {
                    await OrderDetails.updateOne(orderDetail, {
                        quantity: cartDetails.quantity - 1,
                        amount: cartDetails.quantity * cartDetails.price,
                    }).exec();
                }
            }

            let restaurant = await RestaurantDetails.findOne({
                _id: cartDetails.restaurantId,
            }).exec();

            let orderDetail = await OrderDetails.find({
                customerId: cartDetails.customerId,
                orderId: cartDetails.orderId,
            }).exec();

            let result = orderDetail.map(element => ({
                ...element.toObject(),
                restaurantName: restaurant.restaurantName,
            }));

            callback(null, result);
        } catch (exception) {
            callback({ message: `Failed to remove item: ${exception.message}` }, null);
        }
    }
}

module.exports = new CartData();