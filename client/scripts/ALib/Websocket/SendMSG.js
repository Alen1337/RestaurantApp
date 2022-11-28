
let socket 
let target
const wss = "ws://localhost:5000"

export function init(_target) {
    target = _target
    socket = new WebSocket(wss + "/" + target);
}

export function getSocket() {
    return socket
}


export function sendSearch(value) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.SEARCH_RESULTS, 
        value: value 
        }))
}

export function sendOrder(productid, tableid, hasToDeliver, comment, round) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.INSERT_ORDER, 
        order:  { productid, tableid, hasToDeliver, comment, round }
        }))
}

export function deleteOrder(orderid) {
    socket.send(JSON.stringify({
        target: target,
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DELETE_ORDER,
        orderid: orderid
    }))
}

export function sendNewVirtualTable() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.NEW_VIRTUAL_TABLE, 
        }))
}


export function getAllOrder() {
    socket.send(JSON.stringify({ 
        target: target,
        type: REQ_TYPES.GET, 
        action: REQ_ACTION.ORDERS 
        }))
}


export function getNonAcceptedOrders() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.NON_ACCEPTED_ORDERS
    }))
}

export function getAcceptedOrders() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ACCEPTED_ORDERS
    }))
}

export function sendAcceptOrder(orderid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.ACCEPT_ORDER,
        orderid: orderid
    }))
}

export function sendDeclineOrder(orderid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DECLINE_ORDER,
        orderid: orderid
    }))
}

export function sendOrderDone(orderid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.ORDER_DONE,
        orderid: orderid
    }))
}

export function sendUndoOrderDone(orderid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.UNDO_ORDER_DONE,
        orderid: orderid
    }))
}

export function getFinisedOrders() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.FINISHED_ORDERS,
    }))
}

export function sendDeliverOrder(orderid) {
    socket.send(JSON.stringify({ 
        target: target,
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DELIVER_ORDER,
        orderid: orderid
    }))
}

export function sendUndoDeliverOrder(orderid) {
    socket.send(JSON.stringify({ 
        target: target,
        type: REQ_TYPES.POST,
        action: REQ_ACTION.UNDO_DELIVER_ORDER,
        orderid: orderid
    }))
}

export function getDeliverableOrders() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.DELIVERABLE_ORDERS,
    }))
}

export function getDeliveredOrders() {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.DELIVERED_ORDERS,
    }))
}

export function getDisplayUser() {
    console.log(getSocket())
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.DISPLAY_USER
    }))
}

export function sendTableIsFree(state, tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.TABLE_IS_FREE,
        isFree: state,
        tableid: tableid
    }))
}

export function deleteVirtualTable(tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DELETE_VIRTUAL_TABLE,
        tableid: tableid
    }))
}

export function moveOrdersToNewTable(tablefrom, tableto) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.MOVE_ORDERS,
        tablefrom: tablefrom,
        tableto: tableto
    }))
}

export function move1OrderToNewTable(orderid, tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.MOVE_ORDER,
        orderid: orderid,
        tableid: tableid
    }))
}

export function getAllTable() {
    socket.send(JSON.stringify({ 
        target: target,
        type: REQ_TYPES.GET, 
        action: REQ_ACTION.TABLES, 
        }))
}

export function getOrdersByTable(tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ORDERS_BY_TABLE, 
        tableid:  tableid
        }))
}

export function getTableNameByID(tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.TABLE_BY_ID, 
        tableid:  tableid
        }))
}

export function sendPay(tableid) {
    socket.send(JSON.stringify({ 
        target: target, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.PAY, 
        tableid:  tableid
        }))
}