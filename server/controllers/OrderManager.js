//models
const Product = require("../models/product")
//main
const isAuthenticated = require("../main/AuthCheck").isAuthenticated
const WSBroadcaster = require("../main/WebSocket/WSBroadcaster")

//logger
const resLogger = require("../utils/logger").WSResponse
const reqLogger = require("../utils/logger").WSRequest
const logger = require("../utils/logger").socketLogger

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../utils/STATES')

//api
const database = require("../main/Database/Database")
const API = require("../main/API/Api")


async function getRequest(req, res) {
    const user = await isAuthenticated(req)
    if(!user) {
        res.redirect("/auth")
        return
    }
    res.render('orderManager.ejs')
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

async function WSSendMessage(ws, res) {
    await ws.send(JSON.stringify(res));
    resLogger(res)
}

module.exports = { getRequest, postRequest, onWSMessage }