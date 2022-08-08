//main
const isAuthenticated = require("../../main/AuthCheck").isAuthenticated
const WSBroadcaster = require("../../main/WebSocket/WSBroadcaster")

//logger
const logger = require("../../utils/logger").socketLogger
const resLogger = require("../../utils/logger").WSResponse
const reqLogger = require("../../utils/logger").WSRequest

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, TARGET } = require('../../utils/STATES')

//api

//controllers
const auth = require("../../controllers/Auth")
const homepage = require("../../controllers/Homepage")
const orderManager = require("../../controllers/OrderManager")
const adminPanel = require("../../controllers/AdminPanel")
const orderMaker = require("../../controllers/OrderMaker")
const orderDelivery = require("../../controllers/OrderDelivery")
const pay = require("../../controllers/Pay")

async function handleConnection(wss) {
    wss.on('connection', async function connection(ws, req) {
        newConnection(ws,req, wss)
        
        ws.on('message', async function message(data) {
           
            let parsedData = await formatRequest(ws, req, data)
            if(!ws.connection.user) {  
                await sendUnAuthorizedMSG(ws)
                ws.terminate()
                return
            } 

            
            forwardRequest(parsedData, ws)
        });

        ws.on("close", () => {
                logger("Client disconnected")
                WSBroadcaster.WSINIT(wss.clients)
          });
    });
}

async function newConnection(ws, req, wss) {
    const user = await isAuthenticated(req)
    if(!user) {  
        logger("Unauthorized client tried to connected to " + req.url)
        await sendUnAuthorizedMSG(ws)
        ws.terminate()
        return
    }
    logger("New client connected to " + req.url)
    ws.connection = { user: user, url: req.url }
    WSBroadcaster.WSINIT(wss.clients)
}

async function formatRequest(ws, req, data) {
    let parsedData = JSON.parse(data)    
    const user = await isAuthenticated(req)
    parsedData.connection = { user: user, url: req.url }
    ws.connection = { user: user, url: req.url }
    reqLogger(parsedData)
    return parsedData
}


function forwardRequest(req, ws) {
    if(req.target == TARGET.ORDER_MANAGER) orderManager.onWSMessage(ws, req) 
    else if(req.target == TARGET.ADMIN_PANEL) adminPanel.onWSMessage(ws, req)
    else if(req.target == TARGET.HOMEPAGE) homepage.onWSMessage(ws, req)
    else if(req.target == TARGET.ORDER_MAKER) orderMaker.onWSMessage(ws, req)
    else if(req.target == TARGET.WS_BROADCASTER) WSBroadcaster.onWSMessage(ws, req)
    else if(req.target == TARGET.ORDER_DELIVERY) orderDelivery.onWSMessage(ws, req)
    else if(req.target == TARGET.PAY) pay.onWSMessage(ws, req)
}

async function sendUnAuthorizedMSG(ws) {
    let res = { type: 'error', action: REQ_ACTION.UNAUTHORIZED_USER, msg: 'Non authorized!'}
    await ws.send(JSON.stringify(res));
    resLogger(res)
}


//utils

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


module.exports = handleConnection

