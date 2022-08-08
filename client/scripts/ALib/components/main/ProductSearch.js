import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as NewOrderButton from "/public/js/ALib/components/buttons/NewOrderButton.js"
let htmlElement
let deliverModeElement
let deliverMode = DELIVER_MODE.TABLE_SERVICE

export function init(_htmlElement, _deliverModeElement) {
    htmlElement = _htmlElement
    deliverModeElement = _deliverModeElement
}

export function render(products) {
    renderDeliverMode()
    renderProductList(products)
    setupButton(products)
}

function renderDeliverMode() {
    let out = "Bár szervíz"
    let text = "Váltás"
    let id = ELEMENT.CHANGE_DELIVER_MODE_BUTTON
    if(deliverMode === DELIVER_MODE.TABLE_SERVICE) {
        out = "Asztal szervíz"
    }
    out += ` - <button type='button' id='${id}'>${text}</button>`
    deliverModeElement.innerHTML = out
    const butt = document.getElementById(ELEMENT.CHANGE_DELIVER_MODE_BUTTON)

    butt.addEventListener('click', () => {
        if(deliverMode === DELIVER_MODE.TABLE_SERVICE) {
            deliverMode = DELIVER_MODE.BAR_SERVICE
        } else {
            deliverMode = DELIVER_MODE.TABLE_SERVICE
        }
        renderDeliverMode()
    })
    
}

function renderProductList(products) {
    let outputHTML = "<ol>"
    const separator = " - "
    products.forEach(product => {
        outputHTML += "<li>"
        outputHTML += renderProduct(product)
        outputHTML += separator
        outputHTML += NewOrderButton.render(product.productid)
        outputHTML += "</li>"
    });

    outputHTML += "</ol>"
    htmlElement.innerHTML = outputHTML
}

function renderProduct(product) {
    const id = product.productid
    const name = product.name
    const price = product.price
    return "[" + name + " - " + price + " Ft]"
}


function setupButton(products) {
    for (let i = 0; i < products.length; i++) {
        const productButton = document.getElementById(ELEMENT.SRB_PRODUCT_ID + products[i].productid)
        productButton.addEventListener('click', function(event) {
            WSS.sendOrder(products[i].productid, TableSelector.getSelectedTableID(), deliverMode)
        })
    }
}



