const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes.
app.use("/auth", require("./routes/Auth"));
app.use("/store", require("./routes/Store"));
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Leo-Backend started listening at", PORT);
});
