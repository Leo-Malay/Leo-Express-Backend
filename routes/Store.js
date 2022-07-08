const Router = require("express").Router;
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

/** User */
const StoreUserRouter = Router();
StoreRoute.post("/cart", decodeToken, AddCart);
StoreRoute.put("/cart", decodeToken, UpdateQty);
StoreRoute.delete("/cart", decodeToken, RemoveCart);
StoreRoute.post("/order", decodeToken, PlaceOrder);
StoreRoute.delete("/order", decodeToken, CancelOrder);

/** Admin */
const StoreAdminRouter = Router();
StoreAdminRoute.post("/product", decodeToken, NewProduct);
StoreAdminRoute.put("/product", decodeToken, UpdateProduct);
StoreAdminRoute.delete("/product", decodeToken, DeleteProduct);
StoreAdminRoute.post("/stock", decodeToken, UpdateAvailableStock);
StoreAdminRoute.post("/product/option", decodeToken, AddOption);
StoreAdminRoute.put("/product/option", decodeToken, UpdateOption);
StoreAdminRoute.delete("/product/option", decodeToken, RemoveOption);

module.exports = { StoreAdminRouter, StoreUserRouter };
