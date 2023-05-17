import CustomerDetails from "../../Models/CustomerDetailsModel";

export default async (listDetails) => {

    return await CustomerDetails.findOne({
        _id: listDetails.customerId,
        }).exec();
   
};