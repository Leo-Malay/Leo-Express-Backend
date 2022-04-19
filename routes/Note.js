const { NewNote, UpdateNote, RemoveNote } = require("../controllers/Note");
const { decodeToken } = require("../utils/token");
const NoteRoute = require("express").Router();

NoteRoute.post("/", decodeToken, NewNote);
NoteRoute.put("/", decodeToken, UpdateNote);
NoteRoute.delete("/", decodeToken, RemoveNote);

module.exports = NoteRoute;
