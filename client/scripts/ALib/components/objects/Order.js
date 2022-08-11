export function render(order) {
    const orderState = renderOrderState(order.state)
    let payState = "NEM"
    let DeliverMode = "Asztal szervíz"
    if(!order.hasToDeliver) DeliverMode = "Bár szervíz"
    if(order.makerName === undefined) order.makerName = "SENKI"
    if(order.deliverName === undefined) order.deliverName = "SENKI"
    if(order.isPayed) payState = "IGEN"
    return "<ul><li>Asztal: " + order.tableName + " - " + 
    "Fizetett: " + payState + " - " +
    "Állapot: " + orderState + " - " + 
    "Kiviteli mód: " + DeliverMode + "</li>" +
    "<li>Pincér: " + order.username + " - " +
    "Készítő: " + order.makerName + " - " +
    "Kivitte: " + order.deliverName + "</li>" +
    "<li>Termék: " + order.productName + " - " +
    "Ár: " + order.productPrice + "</li>" + 
    "<li>" + "Megjegyzés: " + order.comment + "</li></ul><br>"
    
}

function renderOrderState(orderState) {
    if(orderState === ORDER_STATE.SAVED) return "FELÍRVA"
    if(orderState === ORDER_STATE.IN_PROGRESS) return "KÉSZÜL"
    if(orderState === ORDER_STATE.DONE) return "KÉSZ"
    if(orderState === ORDER_STATE.DELIVERED) return "KISZÁLLÍTVA"
    return "orderState error"
}