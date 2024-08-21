export function render(order) {
    const orderState = renderOrderState(order.state)
    let payState = "NEM"
    let DeliverMode = "Asztal szervíz"
    if(!order.hasToDeliver) DeliverMode = "Bár szervíz"
    if(order.makerName === undefined) order.makerName = "SENKI"
    if(order.deliverName === undefined) order.deliverName = "SENKI"
    if(order.isPayed) payState = "IGEN"
    let out = "<ul><li>" + order.tableName + "</li>" + 
    "<li>Fizetett: " + payState + " - " +
    "" + orderState + " - " + 
    "" + DeliverMode + "</li>" +
    "<li>Pincér: " + order.username + " - " +
    "Készítő: " + order.makerName + " - " +
    "Kivitte: " + order.deliverName + "</li>" +
    "<li>" + order.productName + " - " +
    "" + order.productPrice + " Ft</li>"
    if(order.comment !== "") out += "<li>" + "Megjegyzés: " + order.comment + "</li></ul>"
    return out
    
}

function renderOrderState(orderState) {
    if(orderState === ORDER_STATE.SAVED) return "KÉSZÍTŐRE VÁR"
    if(orderState === ORDER_STATE.IN_PROGRESS) return "KÉSZÜL"
    if(orderState === ORDER_STATE.DONE) return "KÉSZ"
    if(orderState === ORDER_STATE.DELIVERED) return "KISZÁLLÍTVA"
    return "orderState error"
}