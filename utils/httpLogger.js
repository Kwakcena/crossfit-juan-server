const morgan = require("morgan");

const httpLogger = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        morgan("combined")(req, res, next);
    } else {
        morgan("dev")(req, res, next);
    }
}

module.exports = httpLogger;