const StoreRoute = require("express").Router();
const {
    NewProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateAvailableStock,
} = require("../controllers/Store/Product");
const { decodeToken } = require("../utils/token");

StoreRoute.post("/product", decodeToken, NewProduct);
StoreRoute.put("/product", decodeToken, UpdateProduct);
StoreRoute.delete("/product", decodeToken, DeleteProduct);
StoreRoute.post("/stock", decodeToken, UpdateAvailableStock);

module.exports = StoreRoute;
