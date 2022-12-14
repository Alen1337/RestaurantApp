
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')
const database = require("../Database/DBPayments")
const WSBroadcaster = require("../WebSocket/WSBroadcaster")

async function payForTable(tableid, collectorid) {
    const res = await database.payForTable(tableid, collectorid)
    WSBroadcaster.paymentUpdate()
    return res
}

async function getAllPayment(req) {
    return await database.getAllPayment()
}

async function deletePayment(paymentid) {
    const res =  await database.deletePayment(paymentid)
    WSBroadcaster.paymentUpdate() // TODO: WSBroadcaster.deletePaymentUpdate()
    return res
}


module.exports = {
    payForTable,
    getAllPayment,
    deletePayment
}