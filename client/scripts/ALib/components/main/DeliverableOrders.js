import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as LessOrder from "/public/js/ALib/components/objects/LessOrder.js"
import * as DeliverOrderButton from "/public/js/ALib/components/buttons/DeliverOrderButton.js"
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
        out += 
        `
        
        <div class='table-order-container'>
        <div class='order-box'>
        
        ${LessOrder.render(orders[i])} 
        
        
        </div>
        ${DeliverOrderButton.render(orders[i])} 
        </div>
        `
    }
    out+=""
    outputElement.innerHTML = out
}

function setupButtons(orders) {
    for (let i = 0; i < orders.length; i++) {
        const button = document.getElementById(ELEMENT.DELIVER_ORDER_BUTTON + orders[i].orderid)
        button.addEventListener('click', function(event) {
            WSS.sendDeliverOrder(orders[i].orderid)
        })
    }
}

