const database = require("../Database/DBOrders")
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')
const WSBroadcaster = require("../WebSocket/WSBroadcaster")

async function getAllOrder(req) {
    return await database.getAllOrder()
}

async function getAcceptedOrders(userid) {
    return await database.getAcceptedOrders(userid)
}

async function getNonAcceptedOrders(userid) {
    return await database.getNonAcceptedOrders(userid)
}

async function getFinishedOrders(userid) {
    return await database.getFinishedOrders(userid)
}

async function acceptOrder(orderid, userid) {
    const res = await database.acceptOrder(orderid, userid)
    WSBroadcaster.acceptOrderUpdate(userid)
    return res
}

async function declineOrder(orderid, userid) {
    const res = await database.declineOrder(userid, orderid)
    WSBroadcaster.declineOrderUpdate(userid)
    return res
}

async function orderDone(orderid, userid) {
    const res = await database.orderDone(userid, orderid)
    WSBroadcaster.orderDoneUpdate(userid)
    return res
}

async function insertOrder(userid, productid, tableid, hasToDeliver) {
    const res = await database.insertOrder(userid, productid, tableid, hasToDeliver)
    WSBroadcaster.newOrderUpdate()
    return res
}

async function getOrdersByTable(tableid) {
    return await database.getOrdersByTable(tableid)
}

async function undoOrderDone(orderid, userid) {
    const res = await database.acceptOrder(orderid, userid)
    WSBroadcaster.undoOrderDoneUpdate(userid)
    return res
}

async function deleteOrder(orderid) {
    const res = await database.deleteOrder(orderid) 
    WSBroadcaster.deleteOrderUpdate()
    return res
}

async function getDeliverableOrders(userid) {
    return await database.getDeliverableOrders(userid)
}

async function getDeliveredOrders(userid) {
    return await database.getDeliveredOrders(userid)
}

async function deliverOrder(orderid, userid) {
    const res = await database.deliverOrder(orderid, userid)
    WSBroadcaster.deliverOrderUpdate(userid)
    return res
}

async function undoDeliverOrder(orderid, userid) {
    const res = await database.undoDeliverOrder(orderid, userid)
    WSBroadcaster.undoDeliverOrderUpdate(userid)
    return res
}

async function moveOrders(from, to) {
    const res = await database.moveOrders(from, to)
    await WSBroadcaster.newOrderUpdate()
    return res
}

async function moveOrder(orderid, tableid) {
    const res = await database.moveOrder(orderid, tableid)
    await WSBroadcaster.newOrderUpdate()
    return res
}

module.exports = { 
    getAllOrder,
    getAcceptedOrders,
    getNonAcceptedOrders,
    getFinishedOrders,
    acceptOrder,
    declineOrder,
    orderDone,
    insertOrder,
    getOrdersByTable,
    undoOrderDone,
    deleteOrder,
    getDeliverableOrders,
    getDeliveredOrders,
    deliverOrder,
    undoDeliverOrder,
    moveOrders,
    moveOrder
 }