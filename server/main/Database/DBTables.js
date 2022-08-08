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


async function getAllTable() {
    try {
        let tables = await Table.find()
        return tables
    } catch(err) {
        error("function: getAllTable(): " + err)
        return DB_RES.ERROR
    }
    
}

async function getTableByID(tableid) {
    try {
        let table = await Table.findOne({tableid: tableid}, {name: 1, isFree: 1, isVirtual: 1})
        return table
    } catch(err) {
        error("function: getTableByID(): " + err)
        return DB_RES.ERROR
    }
}

async function insertVirtualTable() {
    try {
        let tableid = 1
        const maxid = await Table.find().sort({tableid:-1}).limit(1)
        if(maxid.length > 0) tableid = Number(maxid[0].tableid)+1

        const products = []
        const name = "V" + tableid
        const isVirtual = true
        const isFree = true
        const VirtualTable = new Table({tableid, name, products, isVirtual, isFree})

        await VirtualTable.save()
    } catch(err) {
        error("function: insertVirtualTable(): " + err)
        return DB_RES.ERROR
    }
}

async function setTableIsFree(isFree, tableid) {
    try {
        let orders = await Order.find({tableid: tableid, isPayed: false})
        if(orders.length > 0) return DB_RES.TABLE_HAS_ORDERS
        let result =  await Table.updateOne({tableid: tableid}, { $set: {isFree: isFree}})
        if(result.matchedCount === 0) return DB_RES.WRONG_TABLEID
        return DB_RES.TABLE_IS_FREE_SETTED
    } catch(err) {
        error("function: setTableIsFree(): " + err)
        return DB_RES.ERROR
    }
}

async function deleteVirtualTable(tableid) {
    try {
        let orders = await Order.find({tableid: tableid})
        if(orders.length > 0) return DB_RES.TABLE_HAS_ORDERS



        let result =  await Table.deleteOne({tableid: tableid, isVirtual: true, isFree: true})
        if(result.deletedCount === 0) return DB_RES.WRONG_TABLEID
        return DB_RES.VIRTUAL_TABLE_DELETED
    } catch(err) {
        error("function: deleteVirtualTable(): " + err)
        return DB_RES.ERROR
    }
}

module.exports = {
    getAllTable,
    getTableByID,
    insertVirtualTable,
    setTableIsFree,
    deleteVirtualTable
}