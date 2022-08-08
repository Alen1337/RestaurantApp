import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as DeliverableOrders from "/public/js/Alib/components/main/DeliverableOrders.js"
import * as DelvieredOrders from "/public/js/Alib/components/main/DeliveredOrders.js"

const deliverableOrdersElement = document.getElementById("deliverableOrdersDiv")
const deliveredOrdersElement = document.getElementById("deliveredOrdersDiv")

function init() {
    WSS.init(TARGET.ORDER_DELIVERY)
    WSS.getSocket().addEventListener('open', (event) => { 
        WSS.getDeliverableOrders()
        WSS.getDeliveredOrders()
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });

    DeliverableOrders.init(deliverableOrdersElement)
    DelvieredOrders.init(deliveredOrdersElement)
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.DELIVERED_ORDERS) DelvieredOrders.render(res.msg)
    if(res.action === REQ_ACTION.DELIVERABLE_ORDERS) DeliverableOrders.render(res.msg)
}

function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.DELIVERABLE_ORDERS) WSS.getDeliverableOrders()
    else if(msg.action === REQ_ACTION.DELIVERED_ORDERS) WSS.getDeliveredOrders()
}







window.onload = init