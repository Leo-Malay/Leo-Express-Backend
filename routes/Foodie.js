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
const {
    AddOrganization,
    UpdateOrganization,
    RemoveOrganization,
    AddFranchise,
    UpdateFranchise,
    RemoveFranchise,
    AddPeople,
    RemovePeople,
} = require("../controllers/Foodie/Organization");
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
FoodieRoute.post("/organization", decodeToken, AddOrganization);
FoodieRoute.put("/organization", decodeToken, UpdateOrganization);
FoodieRoute.delete("/organization", decodeToken, RemoveOrganization);
FoodieRoute.post("/franchise", decodeToken, AddFranchise);
FoodieRoute.put("/franchise", decodeToken, UpdateFranchise);
FoodieRoute.delete("/franchise", decodeToken, RemoveFranchise);
FoodieRoute.post("/people", decodeToken, AddPeople);
FoodieRoute.delete("/people", decodeToken, RemovePeople);

module.exports = FoodieRoute;
