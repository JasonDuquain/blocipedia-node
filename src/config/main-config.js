require("dotenv").config();
const logger = require('morgan');


// add the views, view engine, and express.static stuff here later..
module.exports = {
    init(app, express) {
        app.use(logger('dev'));
    }
};
