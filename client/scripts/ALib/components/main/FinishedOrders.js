import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as LessOrder from "/public/js/ALib/components/objects/LessOrder.js"
import * as UndoOrderDoneButton from "/public/js/ALib/components/buttons/UndoOrderDoneButton.js"
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
        ${LessOrder.render(orders[i])} 
        ${UndoOrderDoneButton.render(orders[i])} 
        </li>`
    }
    out+="</ol>"
    outputElement.innerHTML = out
}

function setupButtons(orders) {
    for (let i = 0; i < orders.length; i++) {
        const button = document.getElementById(ELEMENT.UNDO_ORDER_DONE_BUTTON + orders[i].orderid)
        button.addEventListener('click', function(event) {
            WSS.sendUndoOrderDone(orders[i].orderid)
        })
    }
}

