const AllPaymentDiv = document.getElementById('allPaymentDiv')
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
export function render(res) {
    let out = "<div class='payment-list-result-container'>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='payment-list-payment-container'>
            <div>${res[i].collectorName}</div>
            <div>${res[i].amount}</div>
            <div><button type='button' id='delete-payment:${res[i].paymentid}'>Törlés</button></div>
        </div>
        `
    }
    out+="<div>"
    AllPaymentDiv.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-payment:" + res[i].paymentid).addEventListener('click', function(event) {
            WSS.sendDeletePayment(res[i].paymentid)
        })
    }
}