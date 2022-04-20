const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const FoodieProductModel = db.model(
    "Foodie-Product",
    new mongooseSchema({}),
    "Foodie-Product"
);
const FoodieCartModel = db.model(
    "Foodie-Cart",
    new mongooseSchema({}),
    "Foodie-Cart"
);
const FoodieOrganizationModel = db.model(
    "Foodie-Organization",
    new mongooseSchema({}),
    "Foodie-Organization"
);

module.exports = {
    FoodieProductModel,
    FoodieCartModel,
    FoodieOrganizationModel,
};
