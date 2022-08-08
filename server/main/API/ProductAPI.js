const database = require("../Database/DBProducts")
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE } = require('../../utils/STATES')

async function getSearchResults(value) {
    return await database.getSearchResults(value)
}

async function getAllProduct(req) {
    return await database.getAllProduct()
}

module.exports = {
    getSearchResults,
    getAllProduct
 }