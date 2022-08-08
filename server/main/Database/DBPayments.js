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
const Payment = require("../../models/Payment")

//main
const isAuthenticated = require("../../main/AuthCheck").isAuthenticated

//logger
const resLogger = require("../../utils/logger").WSResponse
const logger = require("../../utils/logger").msgLogger
const error = require("../../utils/logger").dbErrorLogger

//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB, ORDER_STATE, MAKING_STATE, DB_RES, DELIVERY_STATE } = require('../../utils/STATES')


async function payForTable(tableid, collectorid) {
    try {

        const orders = await Order.aggregate(([
            {
                $match: {
                    tableid: tableid
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
                $project:{
                    _id: 0,
                    productPrice: "$product.price",
                }
            },
            
        ]))
        
        

        const amount = orders.reduce((sum, o) => sum + o.productPrice, 0)
        if(amount === 0) return DB_RES.WRONG_TABLEID
        const date = Date.now()
        const newPayment = new Payment({
            collectorid, amount, date
        })

        await newPayment.save()
        await Order.updateMany({tableid: tableid}, { $set: {isPayed: true}})
     
        return DB_RES.PAYMENT_SUCCESS

    } catch(err) {
        error("function payForTable(): " + err)
        return DB_RES.ERROR
    }
}

async function getAllPayment() {
    try {
        const payments = await Payment.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "collectorid",
                    foreignField: "userid",
                    as: "user"
                }
            },
            {   $unwind:"$user" }, 
            {
                $project:{
                    _id: 0,
                    amount: 1,
                    collectorid: 1,
                    collectorName: "$user.username",
                }
            },
        ])
        return payments
    } catch(err) {
        error("function getAllPayment(): " + err)
        return DB_RES.ERROR
    }
}

module.exports = {
    payForTable,
    getAllPayment
}