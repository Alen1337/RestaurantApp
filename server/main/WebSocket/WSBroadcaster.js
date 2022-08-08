//main

//logger
const resLogger = require("../../utils/logger").WSResponse
const reqLogger = require("../../utils/logger").WSRequest
const logger = require("../../utils/logger").socketLogger
const BCLogger = require("../../utils/logger").WSBroadcast

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, TARGET, REQ } = require('../../utils/STATES')

//api
//const database = require("../../main/Database/Database")

const formatRes = require("../API/APIUtils").res



let connections = []


async function userUpdate() {
    BCLogger("Sending userUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.USERS })
        }
    }
}

async function newOrderUpdate() {
    BCLogger("Sending newOrderUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
        }
    }
}

async function ordersByTableUpdate() {
    BCLogger("Sending ordersByTableUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
    }
}

async function acceptOrderUpdate(userid) {
    BCLogger("Sending acceptOrderUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
            if(c.connection.user.userid === userid) {
                await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
                
            } 
        }
    }
}

async function declineOrderUpdate(userid) {
    BCLogger("Sending declineOrderUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
            if(c.connection.user.userid === userid) await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
        }
    }
}

async function orderDoneUpdate(userid) {
    BCLogger("Sending orderDoneUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            if(c.connection.user.userid === userid) {
                await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
                await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })
            }
        }
        else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.PAY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
    }
}

async function undoOrderDoneUpdate(userid) {
    BCLogger("Sending undoOrderDoneUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            if(c.connection.user.userid === userid) {
                await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
                await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })
            }
        }
        else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS })
        }
    }
}

async function deleteOrderUpdate() {
    BCLogger("Sending deleteOrderUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })       
        }
        else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERED_ORDERS }) 
        }
    }
}

async function deliverOrderUpdate(userid) {
    BCLogger("Sending deliverOrderUpdate to WebSocket Clients")
    
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })       
        } else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS })
            if(c.connection.user.userid === userid) await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERED_ORDERS }) 
        }
    }
}

async function undoDeliverOrderUpdate(userid) {
    BCLogger("Sending undoDeliverOrderUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.NON_ACCEPTED_ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })       
        } else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS })
            if(c.connection.user.userid === userid) await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERED_ORDERS }) 
        }
    }
}

async function paymentUpdate(senderid) {
    BCLogger("Sending paymentUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.PAYMENTS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS })
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        } 
        else if(c.connection.url === "/" + TARGET.ORDER_MAKER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDER_DONE })       
        } 
        else if(c.connection.url === "/" + TARGET.ORDER_DELIVERY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERED_ORDERS }) 
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.DELIVERABLE_ORDERS }) 
        }
        else if(c.connection.url === "/" + TARGET.PAY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.ORDERS_BY_TABLE })
        }
    }
}

async function tableUpdate() {
    BCLogger("Sending tableUpdate to WebSocket Clients")
    for (const c of connections) {
        if(c.connection.url === "/" + TARGET.ADMIN_PANEL) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.TABLES })
        }
        else if(c.connection.url === "/" + TARGET.ORDER_MANAGER) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.TABLES })
        } 
        else if(c.connection.url === "/" + TARGET.PAY) {
            await WSSendMessage(c, { type: RES_TYPES.UPDATE, action: REQ_ACTION.TABLES })
        }
    }
}



function WSINIT(CLIENTS) {
    connections = CLIENTS
    logger("Clients connected: " + CLIENTS.size)
} 

async function WSSendMessage(ws, res) {
    await ws.send(JSON.stringify(res));
    resLogger(res)
}



module.exports = { WSINIT, userUpdate, newOrderUpdate,
    declineOrderUpdate,
    acceptOrderUpdate,
    orderDoneUpdate,
    undoOrderDoneUpdate,
    deleteOrderUpdate,
    deliverOrderUpdate,
    undoDeliverOrderUpdate,
    paymentUpdate, 
    tableUpdate,
    ordersByTableUpdate
}