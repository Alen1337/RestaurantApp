const root = "../../"
const FilePaths = require(root + "FilePaths.js")
const STATE = require(root + FilePaths.STATE)
const DB_STATE = STATE.DB
const RES_TYPES = STATE.REQ_TYPES
function response(ws, data) {
    ws.send(JSON.stringify(data));
}

module.exports = { response }