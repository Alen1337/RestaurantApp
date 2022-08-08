import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as NonAcceptedOrders from "/public/js/Alib/components/main/NonAcceptedOrders.js"
import * as AcceptedOrders from "/public/js/Alib/components/main/AcceptedOrders.js"
import * as FinishedOrders from "/public/js/Alib/components/main/FinishedOrders.js"

const ordersToAcceptElement = document.getElementById("ordersToAccept")
const acceptedOrdersElement = document.getElementById("acceptedOrders")
const finishedOrdersElement = document.getElementById("finishedOrders")

function init() {
    WSS.init(TARGET.ORDER_MAKER)
    WSS.getSocket().addEventListener('open', (event) => { 
        WSS.getNonAcceptedOrders()
        WSS.getAcceptedOrders()
        WSS.getFinisedOrders()
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });

    NonAcceptedOrders.init(ordersToAcceptElement)
    AcceptedOrders.init(acceptedOrdersElement)
    FinishedOrders.init(finishedOrdersElement)

}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.NON_ACCEPTED_ORDERS) NonAcceptedOrders.render(res.msg)
    else if(res.action === REQ_ACTION.ACCEPTED_ORDERS) AcceptedOrders.render(res.msg)
    else if(res.action === REQ_ACTION.FINISHED_ORDERS) FinishedOrders.render(res.msg)
}

function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.NON_ACCEPTED_ORDERS) WSS.getNonAcceptedOrders()
    if(msg.action === REQ_ACTION.ACCEPTED_ORDERS) WSS.getAcceptedOrders()
    if(msg.action === REQ_ACTION.ORDER_DONE) WSS.getFinisedOrders()
}


window.onload = init