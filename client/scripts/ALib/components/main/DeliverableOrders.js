import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as Order from "/public/js/ALib/components/objects/Order.js"
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
    let out = "<ol>"
    const resLen = orders.length
    for (let i = 0; i < resLen; i++) {
        out += 
        `<li>
        ${Order.render(orders[i])} 
        ${DeliverOrderButton.render(orders[i])} 
        </li>`
    }
    out+="</ol>"
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

