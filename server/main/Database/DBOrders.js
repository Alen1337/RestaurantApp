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
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB, ORDER_STATE, MAKING_STATE, DB_RES, DELIVERY_STATE } = require('../../utils/STATES')

async function getFinishedOrders(userid) {
    try {
        let orders = await Order.aggregate([
            {
                $match: {
                    makerid: userid,
                    orderstateid: ORDER_STATE.DONE
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    hasToDeliver: 1,
                    date: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username"
                }
            },
            
        ]).sort({date: -1}).limit(10)
        return orders
    } catch(err) {
        error("function getFinishedOrders: " + err)
        return DB_RES.ERROR
    }
}

async function orderDone(userid, orderid) {
    try {
        let result =  await Order.updateOne({orderid: orderid, makerid: userid}, { $set: { 
            orderstateid: ORDER_STATE.DONE,
            date: Date.now() 
        }})
        if(result.matchedCount === 0) return DB_RES.WRONG_ORDERID
        return DB_RES.ORDER_DONE
    } catch(err) {
        error("function orderDone: " + err)
        return DB_RES.ERROR
    }
}

async function declineOrder(userid, orderid) {
    try {
        
        let result =  await Order.updateOne({orderid: orderid, makerid: userid}, { $set: {makerid: MAKING_STATE.NOBODY, orderstateid:ORDER_STATE.SAVED}})
        if(result.matchedCount === 0) return DB_RES.WRONG_ORDERID

        return DB_RES.ORDER_DECLINED
    } catch(err) {
        error("function declineOrder: " + err)
        return DB_RES.ERROR
    }
}

async function acceptOrder(orderid, userid) {
    try {
        let user = await User.findOne({userid: userid})
        if(!user) return DB_RES.WRONG_USERID
        let result =  await Order.updateOne({orderid: orderid}, { $set: {
            makerid: userid, 
            orderstateid: ORDER_STATE.IN_PROGRESS,
            date: Date.now()
        }})
        if(result.matchedCount === 0) return DB_RES.WRONG_ORDERID
        return DB_RES.ORDER_ACCEPTED
    } catch(err) {
        error("function acceptOrder: " + err)
        return DB_RES.ERROR
    }
}

async function getAcceptedOrders(userid) {
    try {
        let orders = await Order.aggregate([
            {
                $match: {
                    makerid: userid,
                    orderstateid: ORDER_STATE.IN_PROGRESS
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    hasToDeliver: 1,
                    date: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username"
                }
            },
            
        ]).sort({date: 1})
        return orders
    } catch(err) {
        error("function getAcceptedOrders: " + err)
        return DB_RES.ERROR
    }
}

async function getNonAcceptedOrders(userid) {
    try {
        let orders = await Order.aggregate([
            {
                $match: {
                    makerid: -1
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    hasToDeliver: 1,
                    date: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username"
                }
            },
            
        ]).sort({date: 1})
        return orders
    } catch(err) {
        error("function getNonAcceptedOrders: " + err)
        return DB_RES.ERROR
    }
    
}

async function insertOrder(createdBy, productid, tableid, hasToDeliver) {
    try {
        let product = await Product.findOne({ productid: productid })
        if(!product) return DB_RES.WRONG_PRODUCTID


        let table = await Table.findOne({ tableid: tableid })
        if(!table)  return DB_RES.WRONG_TABLEID
        if(table.isFree) return DB_RES.ADD_TABLE_FIRST

        let lastOrderid = await Order.find().sort({orderid:-1}).limit(1)
        let orderid = 1
        const orderstateid = ORDER_STATE.SAVED
        const makerid = MAKING_STATE.NOBODY
        const deliverid = DELIVERY_STATE.NOBODY
        const isPayed = false
        const round = 1
        const date = Date.now()
        if(lastOrderid.length > 0) orderid = Number(lastOrderid[0].orderid)+1

        let state = Object.assign(ORDER_STATE.SAVED)
        const newOrder = new Order({orderid, createdBy, tableid, productid, orderstateid, makerid, deliverid, isPayed, hasToDeliver, round, date})

        await newOrder.save()

        return DB_RES.ORDER_INSERTED
    } catch(err) {
        error("function insertOrder: " + err)
        return DB_RES.ERROR
    }
    

}

async function getOrdersByTable(tableid) {
    try {

        let orders = await Order.aggregate([
            {
                $match: {
                    isPayed: false
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    pipeline: [{ $match: { tableid: tableid } }],
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "deliverid",
                    foreignField: "userid",
                    as: "deliveruser"
                }
            },
            {   $unwind: 
                {
                path: "$deliveruser",
                preserveNullAndEmptyArrays: true
                } 
            }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    makerid: 1,
                    hasToDeliver: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    deliverName: "$deliveruser.username",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username"
                }
            },
            
        ])

        for (let i = 0; i < orders.length; i++) {
            if(orders[i].makerid !== MAKING_STATE.NOBODY) {
                let user = await User.findOne({userid: orders[i].makerid}, {username: 1, _id: 0})
                orders[i].makerName = user.username
            } 
        }

        return orders
    } catch(err) {
        error("function getOrdersByTable: " + err)
        return DB_RES.ERROR
    }
}

async function getAllOrder() {
    try {
        let orderList = await Order.aggregate([
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" },
            {
                $lookup:{
                    from: "users",
                    localField: "deliverid",
                    foreignField: "userid",
                    as: "deliveruser"
                }
            },
            {   $unwind: 
                {
                path: "$deliveruser",
                preserveNullAndEmptyArrays: true
                } 
            },  
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    makerid: 1,
                    hasToDeliver: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    deliverName: "$deliveruser.username",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username",
                    isPayed: 1
                }
            },
        ])


        for (let i = 0; i < orderList.length; i++) {
            if(orderList[i].makerid !== MAKING_STATE.NOBODY) {
                let user = await User.findOne({userid: orderList[i].makerid}, {username: 1, _id: 0})
                orderList[i].makerName = user.username
            } 
        }
        return orderList
    } catch(err) {
        error("function getAllOrder: " + err)
        return false
    }
}

async function deleteOrder(orderid) {
    try {
        const res = await Order.deleteOne({orderid: orderid})
        if(res.deletedCount === 0) return DB_RES.WRONG_ORDERID
        return DB_RES.ORDER_DELETED
    } catch(err) {
        error("function deleteOrder(): " + err)
        return DB_RES.ERROR
    }
}

async function getDeliverableOrders(userid) {
    try {
        let orders = await Order.aggregate([
            {
                $match: {
                    deliverid: { $ne: userid },
                    orderstateid: ORDER_STATE.DONE,
                    hasToDeliver: true
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "makerid",
                    foreignField: "userid",
                    as: "makeruser"
                }
            },
            {   $unwind:"$makeruser" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    deliverid: 1,
                    hasToDeliver: 1,
                    isPayed: 1,
                    date: 1,
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username",
                    makerName: "$makeruser.username"
                }
            },
            
        ]).sort({date: 1})
        return orders
    } catch(err) {
        error("function getDeliverableOrders(): " + err)
        return DB_RES.ERROR
    }
}

async function getDeliveredOrders(userid) {
    try {
        let orders = await Order.aggregate([
            {
                $match: {
                    deliverid: userid,
                    orderstateid: ORDER_STATE.DELIVERED
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productid",
                    foreignField: "productid",
                    as: "product"
                }
            },
            {   $unwind:"$product" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "makerid",
                    foreignField: "userid",
                    as: "makeruser"
                }
            },
            {   $unwind:"$makeruser" }, 
            {
                $lookup:{
                    from: "tables",
                    localField: "tableid",
                    foreignField: "tableid",
                    as: "table"
                }
            },
            {   $unwind:"$table" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "createdBy",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $lookup:{
                    from: "users",
                    localField: "deliverid",
                    foreignField: "userid",
                    as: "deliver"
                }
            },
            {   $unwind:"$deliver" }, 
            {
                $lookup:{
                    from: "orderstates",
                    localField: "orderstateid",
                    foreignField: "orderstateid",
                    as: "orderstate"
                }
            },
            {   $unwind:"$orderstate" }, 
            {
                $project:{
                    _id: 0,
                    orderid: 1,
                    deliverid: 1,
                    hasToDeliver: 1,
                    isPayed: 1,
                    date: 1,
                    deliverName: "$deliver.username",
                    state: "$orderstate.orderstateid",
                    productName: "$product.name",
                    productPrice: "$product.price",
                    tableName: "$table.name",
                    username: "$user.username",
                    makerName: "$makeruser.username"
                }
            },
            
        ]).sort({date:-1}).limit(10)
        return orders
    } catch(err) {
        error("function getDeliveredOrders(): " + err)
        return DB_RES.ERROR
    }
}

async function deliverOrder(orderid, userid) {
    try {
        let user = await User.findOne({userid: userid})
        if(!user) return DB_RES.WRONG_USERID
        let result =  await Order.updateOne({orderid: orderid}, { $set: {
            deliverid: userid, 
            orderstateid: ORDER_STATE.DELIVERED,
            date: Date.now()
        }})
        if(result.matchedCount === 0) return DB_RES.WRONG_ORDERID
        return DB_RES.ORDER_ACCEPTED
    } catch(err) {
        error("function deliverOrder(): " + err)
        return DB_RES.ERROR
    }
}

async function undoDeliverOrder(orderid, userid) {
    try {
        let result =  await Order.updateOne({orderid: orderid, deliverid: userid}, { $set: { deliverid: DELIVERY_STATE.NOBODY, orderstateid: ORDER_STATE.DONE}})
        if(result.matchedCount === 0) return DB_RES.WRONG_ORDERID
        return DB_RES.ORDER_ACCEPTED
    } catch(err) {
        error("function undoDeliverOrder(): " + err)
        return DB_RES.ERROR
    }
}

async function moveOrders(from, to) {
    try {
        if(from === to) return DB_RES.WRONG_TABLEID
        let t1 = await Table.findOne({tableid: from})
        if(!t1) return DB_RES.WRONG_TABLEID

        let t2 = await Table.findOne({tableid: to})   
        if(!t2) return DB_RES.WRONG_TABLEID
        if(t2.isFree) return DB_RES.WRONG_TABLEID
        

        let result = await Order.find({tableid: from}).updateMany({}, {
            $set: {
                tableid: to
            }
        })
        if(result.matchedCount === 0) return DB_RES.WRONG_TABLEID

        return DB_RES.ORDER_MOVED
    } catch(err) {
        error("function moveOrders(): " + err)
        return DB_RES.ERROR
    }
}

async function moveOrder(orderid, tableid) {
    try {
        let t1 = await Table.findOne({tableid: tableid})
        if(!t1) return DB_RES.WRONG_TABLEID
        if(t1.isFree) return DB_RES.WRONG_TABLEID

        let o1 = await Order.findOne({orderid: orderid})   
        if(!o1) return DB_RES.WRONG_ORDERID
        
        

        let result = await Order.find({orderid: orderid}).update({}, {
            $set: {
                tableid: tableid
            }
        })
        if(result.matchedCount === 0) return DB_RES.WRONG_TABLEID

        return DB_RES.ORDER_MOVED
    } catch(err) {
        error("function moveOrder(): " + err)
        return DB_RES.ERROR
    }
}

module.exports = {
    getFinishedOrders,
    orderDone,
    declineOrder,
    acceptOrder,
    getAcceptedOrders,
    getNonAcceptedOrders,
    insertOrder,
    getOrdersByTable,
    getAllOrder,
    deleteOrder,
    getDeliverableOrders,
    getDeliveredOrders,
    deliverOrder,
    undoDeliverOrder,
    moveOrders,
    moveOrder
}