const database = require("../Database/DBLoginTokens")
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')

async function getAllLoginToken() {
    return await database.getAllLoginToken()
}

module.exports = { 
    getAllLoginToken,   
}