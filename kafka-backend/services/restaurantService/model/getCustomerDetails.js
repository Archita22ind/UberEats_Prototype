const CustomerDetails = require("../../../Models/CustomerDetailsModel");

const getCustomerDetails = async (listDetails) => {

    return await CustomerDetails.findOne({
        _id: listDetails.customerId,
        }).exec();
   
};

exports.getCustomerDetails = getCustomerDetails;