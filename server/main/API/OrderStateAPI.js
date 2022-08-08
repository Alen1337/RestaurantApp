const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')
const database = require("../Database/DBOrderStates")

async function getAllOrderState(req) {
    return await database.getAllOrderState()
}

module.exports = { 
    getAllOrderState
}