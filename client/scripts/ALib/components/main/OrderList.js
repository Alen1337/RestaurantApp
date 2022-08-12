import * as Order from "/public/js/ALib/components/objects/Order.js"
import * as LessOrder from "/public/js/ALib/components/objects/LessOrder.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as Move1OrderButton from "/public/js/ALib/components/buttons/Move1OrderButton.js"
import * as DeleteOrderButton from "/public/js/ALib/components/buttons/DeleteOrderButton.js"
import * as MoveOrderTableSelector from "/public/js/ALib/components/main/MoveOrderTableSelector.js"

let outputElement
let MoreDetailMode = false

export function init(_outputElement) {
    outputElement = _outputElement
}

export function render(orders) {
    renderOrderList(orders)
}

function renderOrderDisplayMode() {
    if(!MoreDetailMode) return "<button type='button' id='more-detail-mode-button' class='tsf-button'>Részletes megjelenítés</button>"
    return "<button type='button' id='more-detail-mode-button' class='tsf-button'>Egyszerű megjelenítés</button>"
}

function renderOrderList(orders) {
    outputElement.innerHTML = ""
    if(!orders) return
    if(orders.length === 0) return
    let out =`<div class='mb-5'>
        ${renderOrderDisplayMode()}
    </div>` 
    //out += "<ol>"
    const resLen = orders.length
    for (let i = 0; i < resLen; i++) {
        out += `<div class='table-order-container'>`

        let order = `${LessOrder.render(orders[i])}`
        if(MoreDetailMode) order = `${Order.render(orders[i])}`
        
        out += `
        <div class='order-box'>
            ${order}
        `

        out += Move1OrderButton.render(orders[i].orderid)
        if(orders[i].state === ORDER_STATE.SAVED)out += DeleteOrderButton.render(orders[i].orderid)

        out+= "</div></div>"
    }
    //out+="</ol>"
    outputElement.innerHTML = out

    const butt = document.getElementById("more-detail-mode-button")
    butt.addEventListener('click',  ()=> {
        MoreDetailMode = !MoreDetailMode
        WSS.getOrdersByTable(TableSelector.getSelectedTableID())
    })

    for (let i = 0; i < resLen; i++) {
        document.getElementById(ELEMENT.MOVE_ORDER_BUTTON + orders[i].orderid).addEventListener('click', ()=> {
            MoveOrderTableSelector.setOrder(orders[i])
            MoveOrderTableSelector.switchMode(true)
        })
    }

    for (let i = 0; i < resLen; i++) {
        if(orders[i].state === ORDER_STATE.SAVED) {
            document.getElementById(ELEMENT.DELETE_ORDER_BUTTON + orders[i].orderid).addEventListener('click', ()=> {
                WSS.deleteOrder(orders[i].orderid)
            })
        }
    }
}

