const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//models
const Table = require("../../models/table")
const User = require("../../models/user")
const Product = require("../../models/product")
const LoginToken = require("../../models/LoginToken")
const Role = require("../../models/Role")
const OrderState = require("../../models/OrderState")
const Order = require("../../models/Order")

//main
const isAuthenticated = require("../../main/AuthCheck").isAuthenticated

//logger
const resLogger = require("../../utils/logger").WSResponse
const logger = require("../../utils/logger").msgLogger
const error = require("../../utils/logger").dbErrorLogger

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB, ORDER_STATE, MAKING_STATE, DB_RES } = require('../../utils/STATES')

//db
const db = require("../../config/accessKeys").mongoURI;



function connect() {
     mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => {
        logger('MongoDB Connected')
    })
    .catch(err => {
        error("Cannot connect to MongoDB database! Details: " + err)
    });
}

































module.exports = { 
    connect,
}
