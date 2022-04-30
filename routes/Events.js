const {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
    RegisterEvent,
    UnregisterEvent,
} = require("../controllers/Events");
const { decodeToken } = require("../utils/token");
const EventRoute = require("express").Router();

EventRoute.get("/", decodeToken, Event);
EventRoute.post("/", decodeToken, AddEvent);
EventRoute.put("/", decodeToken, UpdateEvent);
EventRoute.delete("/", decodeToken, RemoveEvent);
EventRoute.post("/register", decodeToken, RegisterEvent);
EventRoute.delete("/register", decodeToken, UnregisterEvent);

module.exports = EventRoute;
