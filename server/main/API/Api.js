
//states
const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB_RES } = require('../../utils/STATES')


//APIS
const UserAPI = require("./UserAPI")
const ProductAPI = require("./ProductAPI")
const TableAPI = require("./TableAPI")
const LoginTokenAPI = require("./LoginTokenAPI")
const OrderAPI = require("./OrderAPI")
const RoleAPI = require("./RoleAPI")
const OrderStateAPI = require("./OrderStateAPI")
const PaymentAPI = require("./PaymentAPI")

const res = require("./APIUtils").res


async function req(req) {
    
    if(req.type == REQ_TYPES.GET) return getReq(req)
    else if(req.type == REQ_TYPES.POST) return postReq(req)

}

async function getReq(req) {
    if(req.action === REQ_ACTION.USERS) 
        return res(req, await UserAPI.getAllUser(req))
    else if(req.action === REQ_ACTION.DISPLAY_USER) 
        return res(req, await UserAPI.getDisplayUser(req.connection.user.userid))

    else if(req.action === REQ_ACTION.LOGIN_TOKENS) 
        return res(req, await LoginTokenAPI.getAllLoginToken(req))
    
    else if(req.action === REQ_ACTION.TABLES) 
        return res(req, await TableAPI.getAllTable(req))
    else if(req.action === REQ_ACTION.TABLE_BY_ID) 
        return res(req, await TableAPI.getTableByID(req.tableid))
    
    else if(req.action === REQ_ACTION.ROLES) 
        return res(req, await RoleAPI.getAllRole(req))
    
    else if(req.action === REQ_ACTION.PRODUCTS) 
        return res(req, await ProductAPI.getAllProduct(req))
    else if(req.action === REQ_ACTION.SEARCH_RESULTS) 
        return res(req, await ProductAPI.getSearchResults(req.value))
    
    else if(req.action === REQ_ACTION.ORDER_STATES) 
        return res(req, await OrderStateAPI.getAllOrderState(req))
    
    else if(req.action === REQ_ACTION.ORDERS) 
        return res(req, await OrderAPI.getAllOrder(req))
    else if(req.action === REQ_ACTION.NON_ACCEPTED_ORDERS) 
        return res(req, await OrderAPI.getNonAcceptedOrders(req.connection.user.userid))
    else if(req.action === REQ_ACTION.ACCEPTED_ORDERS) 
        return res(req, await OrderAPI.getAcceptedOrders(req.connection.user.userid))
    else if(req.action === REQ_ACTION.FINISHED_ORDERS) 
        return res(req, await OrderAPI.getFinishedOrders(req.connection.user.userid))
    else if(req.action === REQ_ACTION.DELIVERABLE_ORDERS) 
        return res(req, await OrderAPI.getDeliverableOrders(req.connection.user.userid))
    else if(req.action === REQ_ACTION.DELIVERED_ORDERS) 
        return res(req, await OrderAPI.getDeliveredOrders(req.connection.user.userid))
    else if(req.action === REQ_ACTION.ORDERS_BY_TABLE) 
        return res(req, await OrderAPI.getOrdersByTable(req.tableid))

    else if(req.action === REQ_ACTION.PAYMENTS) 
        return res(req, await PaymentAPI.getAllPayment(req))
}

async function postReq(req) {
    if(req.action === REQ_ACTION.USER) 
        return res(req, await UserAPI.insertUser(req))
    else if(req.action === REQ_ACTION.ACCEPT_ORDER) 
        return res(req, await OrderAPI.acceptOrder(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.DELIVER_ORDER) 
        return res(req, await OrderAPI.deliverOrder(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.UNDO_DELIVER_ORDER) 
        return res(req, await OrderAPI.undoDeliverOrder(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.DELETE_ORDER) 
        return res(req, await OrderAPI.deleteOrder(req.orderid, req.connection.user))
    else if(req.action === REQ_ACTION.DELETE_USER) 
        return res(req, await UserAPI.deleteUser(req.userid))
    else if(req.action === REQ_ACTION.ORDER_DONE) 
        return res(req, await OrderAPI.orderDone(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.DECLINE_ORDER) 
        return res(req, await OrderAPI.declineOrder(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.UNDO_ORDER_DONE) 
        return res(req, await OrderAPI.undoOrderDone(req.orderid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.INSERT_ORDER) 
        return res(req, await OrderAPI.insertOrder(
            req.connection.user.userid, 
            req.order.productid, 
            req.order.tableid, 
            req.order.hasToDeliver,
            req.order.comment,
            req.order.round
            ))
    else if(req.action === REQ_ACTION.PAY) 
        return res(req, await PaymentAPI.payForTable(req.tableid, req.connection.user.userid))
    else if(req.action === REQ_ACTION.NEW_VIRTUAL_TABLE) 
        return res(req, await TableAPI.insertVirtualTable())
    else if(req.action === REQ_ACTION.TABLE_IS_FREE) 
        return res(req, await TableAPI.setTableIsFree(req.isFree, req.tableid))
    else if(req.action === REQ_ACTION.DELETE_VIRTUAL_TABLE) 
        return res(req, await TableAPI.deleteVirtualTable(req.tableid))
    else if(req.action === REQ_ACTION.MOVE_ORDERS) 
        return res(req, await OrderAPI.moveOrders(req.tablefrom, req.tableto))
    else if(req.action === REQ_ACTION.MOVE_ORDER) 
        return res(req, await OrderAPI.moveOrder(req.orderid, req.tableid))
}



module.exports = { req }

