const ordersList = document.getElementById('ordersList')
import * as Order from "/public/js/ALib/components/objects/Order.js"
import * as LessOrder from "/public/js/ALib/components/objects/LessOrder.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"

export function render(res) {
    let out = "<div class='orderslist-results-container'>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='orderslist-order-container'>
            <div class='pb-3'>${Order.render(res[i])}</div>
            <button type='button' id='delete-order:${res[i].orderid}' class='tsf-button'>Törlés</button>
        </div>
        
        `
        out +=" "
    }
    out+="</div>"
    ordersList.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-order:" + res[i].orderid).addEventListener('click', function(event) {
            WSS.sendDeleteOrder(res[i].orderid)
        })
    }
}