const database = require("../Database/DBTables")
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')
const WSBroadcaster = require("../WebSocket/WSBroadcaster")

async function getAllTable(req) {
    return await database.getAllTable()
}

async function getTableByID(tableid) {
    return await database.getTableByID(tableid)
}

async function insertVirtualTable() {
    const res = await database.insertVirtualTable()
    WSBroadcaster.tableUpdate()
    return res
}

async function setTableIsFree(isFree, tableid) {
    const res = await database.setTableIsFree(isFree, tableid)
    WSBroadcaster.tableUpdate()
    WSBroadcaster.newOrderUpdate()
    return res
}
async function deleteVirtualTable(tableid) {
    const res = await database.deleteVirtualTable(tableid)
    WSBroadcaster.tableUpdate()
    WSBroadcaster.ordersByTableUpdate()
    return res
}


module.exports = { getAllTable, getTableByID, insertVirtualTable, setTableIsFree,
    deleteVirtualTable
}