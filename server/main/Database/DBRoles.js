const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//models
const Table = require("../../models/table")
const User = require("../../models/user")
const Product = require("../../models/product")
const LoginToken = require("../../models/LoginToken")
const Role = require("../../models/Role")
const OrderState = require("../../models/OrderState")
const Order = require("../../models/Order")

//main
const isAuthenticated = require("../../main/AuthCheck").isAuthenticated

//logger
const resLogger = require("../../utils/logger").WSResponse
const logger = require("../../utils/logger").msgLogger
const error = require("../../utils/logger").dbErrorLogger

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB, ORDER_STATE, MAKING_STATE, DB_RES } = require('../../utils/STATES')


async function getAllRole() {
    try {
        return await Role.find()
    } catch(err) {
        error("function getAllRole(): " + err) 
        return DB_RES.ERROR
    }
}

async function getRoleNameByID(roleid) {
    try {
        let role = await Role.findOne({roleid: roleid}, { name: 1, _id: 0 } )
        if(!role) return DB_RES.WRONG_ROLEID
        return role.name
    } catch(err) {
        error("function getUserRoleNameByID(): " + err)
        return DB_RES.ERROR
    }
}

module.exports = {
    getAllRole,
    getRoleNameByID
}
