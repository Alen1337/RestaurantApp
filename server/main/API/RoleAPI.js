const database = require("../Database/DBRoles")
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')

async function getAllRole(req) {
    return await database.getAllRole()
}

module.exports = { 
    getAllRole
}