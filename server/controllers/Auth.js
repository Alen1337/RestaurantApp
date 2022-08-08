const bcrypt = require('bcrypt')

//models
const Table = require("../models/table")
const User = require("../models/user")
const Product = require("../models/product")
const LoginToken = require("../models/LoginToken")
const Role = require("../models/Role")
const OrderState = require("../models/OrderState")

//main
const isAuthenticated = require("../main/AuthCheck").isAuthenticated
const TokenHandler = require("../main/TokenHandler")

//logger
const resLogger = require("../utils/logger").WSResponse

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../utils/STATES')

//api
const database = require("../main/Database/Database")

async function getRequest(req, res) {
    const user = await isAuthenticated(req)
    if(user) {
        res.redirect("/")
        return
    }
    res.render("auth.ejs") 

}

async function postRequest(req, res, next) {
    const {username, password } = req.body
    User.findOne({ username: username }).then(user => {
        if (!user) {
            res.redirect('/auth')
            return //TODO: figure out better solution
        }

        // Match password
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const key = await TokenHandler.submitNewToken(user.userid).then((t) =>{
                    res.cookie('sessionKey', t.key , { maxAge: 900000, httpOnly: true });
                    res.redirect('/')
                })
                
            } else {
            res.redirect('/auth')
            }
        });
    });
}

function getSessionKey(req) {
    let sessionKey = req.headers.cookie.sessionKey
    return sessionKey;
}


module.exports = { getRequest, postRequest }