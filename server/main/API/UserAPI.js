const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB_RES } = require('../../utils/STATES')
const database = require("../Database/DBUsers")

const WSBroadcaster = require("../WebSocket/WSBroadcaster")

async function getAllUser(req) {
    return await database.getAllUser()
}

async function insertUser(req) {
    const res = await database.insertUser(req.user.username, req.user.password, req.user.roleid)
    await WSBroadcaster.userUpdate()
    return res
}

async function deleteUser(userid) {
    const res = await database.deleteUser(userid)
    await WSBroadcaster.userUpdate()
    return res
}

async function getDisplayUser(userid) {
    return await database.getDisplayUser(userid)
}
module.exports = {
    getAllUser,
    insertUser,
    getDisplayUser,
    deleteUser
}

