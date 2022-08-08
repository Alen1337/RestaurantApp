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

const getRoleNameByID = require("../Database/DBRoles").getRoleNameByID

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB, ORDER_STATE, MAKING_STATE, DB_RES } = require('../../utils/STATES')


async function insertUser(username, password, roleid) {
    try {
        const user = await User.findOne({ username: username })
        if(user) return DB_RES.WRONG_USERNAME

        const role = await Role.findOne({ roleid: roleid })
        if(!role) return DB_RES.WRONG_ROLEID

        let lastUserid = await User.find().sort({userid:-1}).limit(1)
        let userid = 1
        if(lastUserid.length > 0) userid = Number(lastUserid[0].userid)+1

        const newUser = new User({username,password,roleid,userid})

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)

        newUser.password = hash

        const save = await newUser.save()
        return DB_RES.USER_INSERTED
    } catch(err) {
        error("function insertUser(): " + err) 
        return DB_RES.ERROR
    }
    
}

async function getDisplayUser(userid) {
    try {
        const user = await User.findOne({ userid: userid}, { username: 1, roleid: 1})
        if(!user) return DB_RES.WRONG_USERID
        const role = await getRoleNameByID(user.roleid)
        return {username: user.username, roleName: role }
    } catch(err) {
        error("function getDisplayUser(): " + err)
        return DB_RES.ERROR
    }
}

async function getAllUser() {
    try {
        return await User.find()
    } catch(err) {
        error("function getAllUser(): " + err)
        return undefined
    }
    
}

async function deleteUser(userid) {
    try {
        const res = await User.deleteOne({userid: userid})
        if(res.deletedCount === 0) return WRONG_USERID
        return DB_RES.USER_DELETED
    } catch(err) {
        error("function deleteUser(): " + err) 
        return DB_RES.ERROR
    }
}

module.exports = {
    insertUser,
    getDisplayUser,
    getAllUser,
    deleteUser
}