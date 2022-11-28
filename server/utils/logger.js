const { RES_TYPES } = require("./STATES")

const WSLOGGING = false

function requestLogger(req, res, next) {
    console.log("\x1b[35m", "[AEServer]-[HTTP_REQUEST]: \x1b[0m" + req.method + " to " + req.url)
    next()
}

function msgLogger(msg) {
    console.log("\x1b[33m", "[AEServer]-[INFO]: \x1b[0m" + msg)
}

function socketLogger(msg) {
    console.log("\x1b[34m", "[AEServer]-[WS]-[INFO]: \x1b[0m" + msg)
}

function dbErrorLogger(msg) {
    console.log("\x1b[31m", "[AEServer]-[DATABASE]-[ERROR]: " + msg)
}

function WSRequest(msg) {
    if(WSLOGGING) {
        console.log("\x1b[34m", "[RAServer][WS]-[REQUEST]: ", "\x1b[0m" + JSON.stringify(msg, null, 2))
    } else {
        console.log("\x1b[34m", "[RAServer]-[WS]-[REQUEST]: ", "\x1b[0m" + msg.type + ":\t" + msg.action + " FROM: " + msg.target)
    }
    
    
}

function WSResponse(msg) {
    if(!msg) return
    if(WSLOGGING) {
        console.log("\x1b[34m", "[RAServer][WS]-[RESPONSE]:", "\x1b[0m" + JSON.stringify(msg, null, 2))
    } else {
        console.log("\x1b[34m", "[RAServer]-[WS]-[RESPONSE]:", "\x1b[0m" + msg.type + ":\t" + msg.action)
        if(msg.type === RES_TYPES.ERROR) console.log('\x1b[31m', '[WEBSOCKET API ERROR]:\x1b[0m', msg)
    }
}

function WSBroadcast(msg) {
    console.log("\x1b[34m", "[RAServer][WS]-[BROADCAST]: ", msg)
}
module.exports = { WSRequest, WSResponse, requestLogger, msgLogger, socketLogger, dbErrorLogger, WSBroadcast }