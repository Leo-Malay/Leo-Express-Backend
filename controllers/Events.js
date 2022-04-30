const EventModel = require("../models/Events");
const { response } = require("../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const Event = (req, res) => {
    /**
     * Body: userId, registered
     */
    var query = {};
    if (req.query.userId) query["userId"] = mongooseObjectId(req.query.userId);
    else if (req.query.registered && req.query.registered === "1")
        query["registration.attendee"] = req.tokenData._id;

    console.log(req.query, query);
    EventModel.find(query, (err, data) => {
        if (err) throw err;
        return response(res, true, "Event Fetched", data);
    });
};
const AddEvent = (req, res) => {
    /**
     * Body: category, title, description, image, tags, venue, date, paid, price, deadline, rules
     */
    const query = new EventModel({
        userId: req.tokenData._id,
        category: req.body.category,
        event: {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            tags: req.body.tags,
            venue: req.body.venue,
            date: req.body.date,
        },
        fee: { paid: req.body.paid, price: req.body.price || 0 },
        registration: {
            deadline: req.body.deadline || null,
            rules: req.body.rules || [],
        },
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Event Created");
    });
};
const UpdateEvent = (req, res) => {
    /**
     * Body: eventId, ...updates
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
            userId: mongooseObjectId(req.tokenData._id),
        },
        {
            $set: {
                "event.title": req.body.title,
                "event.description": req.body.description,
                "event.image": req.body.image,
                "event.tags": req.body.tags,
                "event.venue": req.body.venue,
                "event.date": req.body.date,
                "fee.paid": req.body.paid,
                "fee.price": req.body.price,
                "registration.deadline": req.body.deadline,
                "registration.rules": req.body.rules,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Event Updated");
            else response(res, false, "Unable to update your event");
        }
    );
};
const RemoveEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.eventId),
            userId: req.tokenData._id,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1) response(res, true, "Event Removed");
            else response(res, false, "Unable to remove your event");
        }
    );
};
const RegisterEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
        },
        {
            $addToSet: { "registration.attendee": req.tokenData._id },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Registered to Event");
            else response(res, false, "Unable to register to event");
        }
    );
};
const UnregisterEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
        },
        {
            $pull: { "registration.attendee": req.tokenData._id },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Unregistered from Event");
            else response(res, false, "Unable to unregister");
        }
    );
};

module.exports = {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
    RegisterEvent,
    UnregisterEvent,
};
