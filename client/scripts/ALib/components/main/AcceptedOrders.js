import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as LessOrder from "/public/js/ALib/components/objects/LessOrder.js"
import * as DeclineOrderButton from "/public/js/ALib/components/buttons/DeclineOrderButton.js"
import * as OrderDoneButton from "/public/js/ALib/components/buttons/OrderDoneButton.js"
let outputElement

export function init(_outputElement) {
    outputElement = _outputElement
}


export function render(orders) {
    renderList(orders)
    setupButtons(orders)
}

function renderList(orders) {

    let out = ""
    const resLen = orders.length
    if(orders.length === 0) out += 
    `
        <div class='table-order-container'>
        <div class='order-box'>
        Üres
        </div>
        </div>
    `
    for (let i = 0; i < resLen; i++) {
        out += `
        
        <div class='table-order-container'>
        <div class='order-box'>
        
        ${LessOrder.render(orders[i])}
        
        
        
        </div>
        ${DeclineOrderButton.render(orders[i])} 
        ${OrderDoneButton.render(orders[i])}
        </div>
        `
    }
    out+=""
    outputElement.innerHTML = out
}

function setupButtons(orders) {
    for (let i = 0; i < orders.length; i++) {
        const button = document.getElementById(ELEMENT.DECLINE_ORDER_BUTTON + orders[i].orderid)
        button.addEventListener('click', function(event) {
            WSS.sendDeclineOrder(orders[i].orderid)
        })
    }
    for (let i = 0; i < orders.length; i++) {
        const button = document.getElementById(ELEMENT.ORDER_DONE_BUTTON + orders[i].orderid)
        button.addEventListener('click', function(event) {
            WSS.sendOrderDone(orders[i].orderid)
        })
    }
}