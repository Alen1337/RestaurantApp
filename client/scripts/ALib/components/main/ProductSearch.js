import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as NewOrderButton from "/public/js/ALib/components/buttons/NewOrderButton.js"
import * as Product from "/public/js/ALib/components/objects/Product.js"

let htmlElement
let deliverModeElement
let deliverMode = DELIVER_MODE.TABLE_SERVICE
let commentBar
let round = 1 //TODO

let switchDeliveryModeDiv = document.getElementById("switchDeliverModeDiv")

export function init(_htmlElement, _deliverModeElement, _commentBar) {
    htmlElement = _htmlElement
    deliverModeElement = _deliverModeElement
    commentBar = _commentBar
}

export function render(products) {
    renderDeliverMode()
    renderProductList(products)
    setupButton(products)
}

function renderDeliverMode() {
    let out = `
    <div class='text-gray-300'>
        Bár szervíz
    </div>`
    let text = "Váltás"
    let id = ELEMENT.CHANGE_DELIVER_MODE_BUTTON
    if(deliverMode === DELIVER_MODE.TABLE_SERVICE) {
        out = `
        <div class='text-gray-300'>
            Asztal szervíz
        </div>`
    }
    switchDeliveryModeDiv.innerHTML = `<button type='button' id='${id}' class='tsf-button'>${text}</button>`
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
    let outputHTML = "<div class='results-container'>"
    const separator = " - "
    products.forEach(product => {
        outputHTML +=`<div class='product-container'  id='add-product: ${product.productid}'>`
        outputHTML += Product.renderLess(product)
        outputHTML += "</div>"
    });

    outputHTML += "</div>"
    htmlElement.innerHTML = outputHTML
}

function setupButton(products) {
    for (let i = 0; i < products.length; i++) {
        const productButton = document.getElementById(ELEMENT.SRB_PRODUCT_ID + products[i].productid)
        productButton.addEventListener('click', function(event) {
            WSS.sendOrder(products[i].productid, 
                TableSelector.getSelectedTableID(), 
                deliverMode, 
                commentBar.value,
                round
                )
        })
    }
}



