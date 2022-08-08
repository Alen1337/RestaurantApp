//main
const isAuthenticated = require("../main/AuthCheck").isAuthenticated


//logger
const resLogger = require("../utils/logger").WSResponse
const reqLogger = require("../utils/logger").WSRequest
const logger = require("../utils/logger").socketLogger

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, TARGET } = require('../utils/STATES')

//api
const database = require("../main/Database/Database")
const API = require("../main/API/Api")

const fs = require("fs")
async function getRequest(req, res) { 
    const user = await isAuthenticated(req)
    if(!user) {
        res.redirect("/auth")
        return
    }
    if(!req.params.tableid) {
        res.render('Pay.ejs')
        return
    }

    if(req.params.tableid === "pay.js") {
        fs.readFile("client/scripts/" + "pay.js", (err, data) => {
            res.setHeader("Content-Type", "application/javascript");
            res.end(data)
        })
        return
    }
    else if(req.params.tableid === "ws-states.js") {
        fs.readFile("server/utils/STATES.js", (err, data) => {
            res.setHeader("Content-Type", "application/javascript");
            res.end(data.toString().split("//*STATES*")[1])
        })
        return
    }

    res.render('Pay.ejs')
    
}

function postRequest(req, res) {

}

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


module.exports = {
    getRequest,
    postRequest,
    onWSMessage
}