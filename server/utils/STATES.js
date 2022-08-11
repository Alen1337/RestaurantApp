

//*STATES*

const RES_TYPES = Object.freeze({
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    INFO: "INFO",
    UPDATE: "UPDATE"
})


const DB = Object.freeze({
    WRONG_PRODUCTID:        { type: RES_TYPES.ERROR,     msg: "Wrong productid",     key: 1 },
    WRONG_USERID:           { type: RES_TYPES.ERROR,     msg: "Wrong userid",        key: 2 },
    WRONG_TABLEID:          { type: RES_TYPES.ERROR,     msg: "Wrong tableid",       key: 3 },
    WRONG_ORDERID:          { type: RES_TYPES.ERROR,     msg: "Wrong orderid",       key: 4 },
    WRONG_ROLEID:           { type: RES_TYPES.ERROR,     msg: "Wrong roleid",       key: 4 },
    ORDER_INSERTED:         { type: RES_TYPES.SUCCESS,   msg: "Order inserted",      key: 5 },
    ERROR:                  { type: RES_TYPES.ERROR,     msg: "Database error",      key: 6 },
})

const DB_RES = {
    WRONG_PRODUCTID: "Wrong productid",
    WRONG_USERID: "Wrong userid",
    WRONG_TABLEID: "Wrong tableid",
    WRONG_ORDERID: "Wrong orderid",
    WRONG_ROLEID: "Wrong roleid",
    WRONG_USERNAME: "Wrong username",
    ORDER_INSERTED: "Order inserted",
    ERROR: "Database error",
    ORDER_ACCEPTED: "Order accepted",
    ORDER_DECLINED: "Order declined",
    ORDER_DONE: "Order finished",
    USER_INSERTED: "User inserted",
    ORDER_DELETED: "Order deleted",
    USER_DELETED: "User deleted",
    PAYMENT_SUCCESS: "Payment Success",
    ORDERS_NOT_FINISHED_PAYMENT_ERROR: "Some orders are still being made for this table",
    TABLE_IS_FREE_SETTED: "Table isFree state setted!",
    TABLE_HAS_ORDERS: "This table has orders!",
    ADD_TABLE_FIRST: "Add the table first!",
    VIRTUAL_TABLE_DELETED: "Virtual Table deleted",
    NON_VIRTUAL_TABLE: "This table is not virtual!",
    ORDER_MOVED: "Orders were successfully moved to the other table!",
}

const REQ_TYPES = Object.freeze({
    GET: "GET",
    POST: "POST",
})

const REQ_ACTION = Object.freeze({
    ORDERS: "orders",
    ORDER: "order",
    TABLES: "tables",
    TABLE: "table",
    PRODUCTS: "products",
    PRODUCT: "product",
    USERS: "users",
    USER: "user",
    SERVER_STATE: "serverState",
    SEARCH_RESULTS: "searchResults",
    INSERT_ORDER: "insertOrder",
    ORDERS_BY_TABLE: "ordersByTable",
    UNAUTHORIZED_USER: "unauthorizedUser",
    CONNECTION_CLOSED: "connectionClosed",
    NON_ACCEPTED_ORDERS: "nonAcceptedOrders",
    ACCEPT_ORDER: "acceptOrder",
    ACCEPTED_ORDERS: "acceptedOrders",
    DECLINE_ORDER: "declineOrder",
    ORDER_DONE: "orderDone",
    FINISHED_ORDERS: "finishedOrders",
    ORDER_STATES: "orderStates",
    ROLES: "roles",
    ROLE: "role",
    LOGIN_TOKENS: "loginTokens",
    DISPLAY_USER: "displayUser",
    UNDO_ORDER_DONE: "undoOrderDone",
    DELETE_ORDER: "deleteOrder",
    DELETE_USER: "deleteUser",
    DELIVERABLE_ORDERS: "deliverableOrders",
    DELIVERED_ORDERS: "deliveredOrders",
    DELIVER_ORDER: "deliverOrder",
    UNDO_DELIVER_ORDER: "undoDeliverOrder",
    TABLE_BY_ID: "tableByID",
    PAY: "pay",
    PAYMENTS: "payments",
    NEW_VIRTUAL_TABLE: "newVirtualTable",
    TABLE_IS_FREE: "tableIsFree",
    DELETE_VIRTUAL_TABLE: "deleteVirtulTable",
    MOVE_ORDERS: "moveOrders",
    MOVE_ORDER: "moveOrder",
})

const ORDER_STATE = Object.freeze({
    SAVED: 1,
    IN_PROGRESS: 2,
    DONE: 3,
    DELIVERED: 4
})

const TARGET = Object.freeze({
    HOMEPAGE: "homepage",
    ORDER_MANAGER: "order-manager",
    AUTH: "auth",
    ADMIN_PANEL: "admin-panel",
    ORDER_MAKER: "order-maker",
    WS_BROADCASTER: "ws-broadcaster",
    ORDER_DELIVERY: "order-delivery",
    PAY: "pay",
    QUICK_ORDER: "quick-order"
})

const MAKING_STATE = Object.freeze({
    NOBODY: -1
})

const DELIVERY_STATE = Object.freeze({
    NOBODY: -1
})

const REQ = {
    GET: {
        USERS: { type: REQ_TYPES.GET, action: REQ_ACTION.USERS, target: TARGET.ADMIN_PANEL }
    }
}

const ELEMENT = Object.freeze({
    SRB_PRODUCT_ID: "search-result-button product-id:", 
    TB_TABLE_ID: "table-select-button table-id:", 
    ACCEPT_ORDER_BUTTON: "accept-order-button order-id:",
    DECLINE_ORDER_BUTTON: "decline-order-button order-id:",
    ORDER_DONE_BUTTON: "order-done-button order-id:",
    UNDO_ORDER_DONE_BUTTON: "order-done-button order-id:",
    DELIVER_ORDER_BUTTON: "deliver-order-button order-id:",
    UNDO_DELIVER_ORDER_BUTTON: "undo-deliver-order-button order-id:",
    PAY_BUTTON: "pay-button",
    TABLE_IS_FREE_BUTTON: "table-is-free-button",
    DELETE_VIRTUAL_TABLE_BUTTON: "delete-virtual-table-button",
    CHANGE_DELIVER_MODE_BUTTON: "change-deliver-mode-button",
    MOVE_ORDERS_BUTTON: "move-orders-button",
    MOVE_ORDER_BUTTON: "move-order-button orderid:",
    CHOOSE_TABLE_TO_MOVE_ORDER_BUTTON: "choose-table-to-move-order-button tableid:",
    FINISH_ROUND_BUTTON: "finish-round-button",
    DELETE_ORDER_BUTTON: "delete-order-button orderid:",
    NAV_ORDER_MANAGER_BUTTON: "nav-order-manager-button",
    NAV_ORDER_MAKER_BUTTON: "nav-order-maker-button",
    NAV_ORDER_DELIVERY_BUTTON: "nav-order-delivery-button",
    NAV_PAY_BUTTON: "nav-pay-button",
    NAV_ADMIN_PANEL_BUTTON: "nav-admin-panel-button",
    NAV_LOGOUT_BUTTON: "nav-logout-button"
})

const DELIVER_MODE = {
    TABLE_SERVICE: true,
    BAR_SERVICE: false,
}



//*STATES*

const BC_TYPE = Object.freeze({
    ORDER_UPDATE: "orderUpdate",
})

const ROLE = Object.freeze({
    ADMIN: 1,
    WAITER: 2,
    BARTENDER: 3,
})




module.exports = { MAKING_STATE, ORDER_STATE, DB, RES_TYPES, REQ_TYPES, REQ_ACTION, TARGET, ROLE, BC_TYPE,
DB_RES, REQ, DELIVERY_STATE, DELIVER_MODE}