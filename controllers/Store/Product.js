const { StoreProductModel } = require("../../models/Store");
const { response } = require("../../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const NewProduct = (req, res) => {
    const query = new StoreProductModel({
        name: req.body.name,
        options: req.body.options,
        description: req.body.description || [],
        images: req.body.images || [],
        specs: req.body.specs || {},
        soldBy: req.tokenData._id,
        offers: req.body.offers || [],
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Product Added Successfully", data);
    });
};
const UpdateProduct = (req, res) => {
    delete req.body.updates["soldBy"];
    StoreProductModel.updateOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData._id,
        },
        req.body.updates,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Product Updated Successfully");
            else response(rs, false, "Unable to update your product");
        }
    );
};
const DeleteProduct = async (req, res) => {
    StoreProductModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData._id,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1)
                response(res, true, "Product Removed");
            else response(res, false, "Unable to remove Product");
        }
    );
};
const UpdateAvailableStock = (req, res) => {
    StoreProductModel.updateOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData._id,
            options: {
                $elemMatch: { _id: mongooseObjectId(req.body.optionId) },
            },
        },
        { $set: { "options.$.availableStock": req.body.availableStock } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Stock Updated Successfully");
            else response(res, false, "Unable to update your stock");
        }
    );
};

module.exports = {
    NewProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateAvailableStock,
};
