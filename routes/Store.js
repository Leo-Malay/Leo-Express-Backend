const StoreRoute = require("express").Router();
const {
    NewProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateAvailableStock,
    AddOption,
    UpdateOption,
    RemoveOption,
} = require("../controllers/Store/Product");
const { AddCart, UpdateQty, RemoveCart } = require("../controllers/Store/Cart");
const { PlaceOrder, CancelOrder } = require("../controllers/Store/Order");
const { decodeToken } = require("../utils/token");

StoreRoute.post("/product", decodeToken, NewProduct);
StoreRoute.put("/product", decodeToken, UpdateProduct);
StoreRoute.delete("/product", decodeToken, DeleteProduct);
StoreRoute.post("/stock", decodeToken, UpdateAvailableStock);
StoreRoute.post("/product/option", decodeToken, AddOption);
StoreRoute.put("/product/option", decodeToken, UpdateOption);
StoreRoute.delete("/product/option", decodeToken, RemoveOption);
StoreRoute.post("/cart", decodeToken, AddCart);
StoreRoute.put("/cart", decodeToken, UpdateQty);
StoreRoute.delete("/cart", decodeToken, RemoveCart);
StoreRoute.post("/order", decodeToken, PlaceOrder);
StoreRoute.delete("/order", decodeToken, CancelOrder);
module.exports = StoreRoute;
