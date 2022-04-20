const {
    AddCart,
    UpdateCart,
    RemoveCart,
} = require("../controllers/Foodie/Cart");
const { PlaceOrder, CancelOrder } = require("../controllers/Foodie/Order");
const {
    AddProduct,
    UpdateProduct,
    RemoveProduct,
} = require("../controllers/Foodie/Product");
const { decodeToken } = require("../utils/token");
const FoodieRoute = require("express").Router();

FoodieRoute.post("/product", decodeToken, AddProduct);
FoodieRoute.put("/product", decodeToken, UpdateProduct);
FoodieRoute.delete("/product", decodeToken, RemoveProduct);
FoodieRoute.post("/cart", decodeToken, AddCart);
FoodieRoute.put("/cart", decodeToken, UpdateCart);
FoodieRoute.delete("/cart", decodeToken, RemoveCart);
FoodieRoute.post("/order", decodeToken, PlaceOrder);
FoodieRoute.delete("/order", decodeToken, CancelOrder);

module.exports = FoodieRoute;
