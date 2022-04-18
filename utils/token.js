const jwt = require("jsonwebtoken");
const { key, expireTime } = require("../config/jwt.config");
const AuthModel = require("../models/Auth");
const { response } = require("./response");

const encodeToken = (data) => {
    return jwt.sign({ data }, key, { expiresIn: expireTime });
};
const decodeToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if (typeof bearerToken !== undefined && bearerToken !== undefined) {
        req.token = bearerToken.split(" ")[1];
        if ((await AuthModel.exists({ "local.token": req.token })) === null)
            return response(res, false, "MisMatch Token");
        else
            jwt.verify(req.token, key, function (err, decoded) {
                if (err) response(res, false, "Token Error", err);
                req.tokenData = decoded.data;
                next();
            });
    } else return response(res, false, "Missing Token");
};

module.exports = { encodeToken, decodeToken };
