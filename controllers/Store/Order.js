const { StoreCartModel } = require("../../models/Store");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { response } = require("../../utils/response");

const PlaceOrder = (req, res) => {
    /**
     * Body: txnId, type, amount
     */
    StoreCartModel.findOne(
        { userId: req.tokenData._id },
        { cart: 1 },
        (err, result) => {
            if (err) throw err;
            StoreCartModel.updateOne(
                { userId: req.tokenData._id },
                {
                    $addToSet: {
                        order: {
                            status: "pending",
                            deliveryDate: null,
                            cancelDate: null,
                            orderDate: Date.now(),
                            package: result.cart,
                            payment: {
                                txnId: req.body.txnId,
                                type: req.body.type,
                                amount: req.body.amount,
                            },
                        },
                    },
                    $set: { cart: [] },
                },
                (err, result1) => {
                    if (err) throw err;
                    if (result1.modifiedCount === 1)
                        response(res, true, "Order Placed");
                    else response(res, false, "Unable to Place your Order");
                }
            );
        }
    );
};
const CancelOrder = (req, res) => {
    /**
     * Body: orderId
     */
    StoreCartModel.updateOne(
        {
            userId: req.tokenData._id,
            order: {
                $elemMatch: {
                    _id: mongooseObjectId(req.body.orderId),
                    status: "pending",
                    deliveryDate: null,
                    cancelDate: null,
                },
            },
        },
        {
            $set: {
                "order.$.status": "cancelled",
                "order.$.cancelDate": Date.now(),
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Order Cancelled");
            else response(res, false, "Unable to cancel your order");
        }
    );
};

module.exports = { PlaceOrder, CancelOrder };
