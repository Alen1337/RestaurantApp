const bcrypt = require('bcrypt');


//models
const Table = require("../models/table")
const User = require("../models/user")
const Product = require("../models/product")
const LoginToken = require("../models/LoginToken")
const Role = require("../models/Role")
const OrderState = require("../models/OrderState")

//main
const isAuthenticated = require("../main/AuthCheck").isAuthenticated

//logger
const resLogger = require("../utils/logger").WSResponse

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../utils/STATES')

//api
const database = require("../main/Database/Database")
const API = require("../main/API/Api")

//http requests
async function getRequest(req, res) {
    const user = await isAuthenticated(req)
    if(!user) {
        res.redirect("/auth")
        return
    }
    if(user.roleid !== ROLE.ADMIN) {
        res.redirect("/")
        return
    }
    res.render('AdminPanel.ejs')
}

function postRequest(req, res) {
   
}

//websocket message

async function onWSMessage(ws, msg) {
    if(msg.type === REQ_TYPES.GET || msg.type === REQ_TYPES.POST) {
        const res = await API.req(msg)
        WSSendMessage(ws, res)
    }
}

function WSSendMessage(ws, res) {
    ws.send(JSON.stringify(res))
    resLogger(res)
}

module.exports = { getRequest, postRequest, onWSMessage }