const { REQ_TYPES, REQ_ACTION, RES_TYPES, ROLE, DB_RES } = require('../../utils/STATES')

function res(req, msg) {
    let type = RES_TYPES.SUCCESS
    if(msg === DB_RES.ERROR) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_ORDERID) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_PRODUCTID) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_ROLEID) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_TABLEID) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_USERID) type = RES_TYPES.ERROR
    else if(msg === DB_RES.WRONG_USERNAME) type = RES_TYPES.ERROR
    else if(msg === DB_RES.ORDERS_NOT_FINISHED_PAYMENT_ERROR) type = RES_TYPES.ERROR
    else if(msg === DB_RES.TABLE_HAS_ORDERS) type = RES_TYPES.ERROR
    else if(msg === DB_RES.ADD_TABLE_FIRST) type = RES_TYPES.ERROR
    return { type: type, action: req.action, msg: msg } 
}

module.exports = { res }
module.exports.res2 = res