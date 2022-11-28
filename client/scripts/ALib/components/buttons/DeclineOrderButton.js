export function render(order) {
    const id = ELEMENT.DECLINE_ORDER_BUTTON + order.orderid
    const text = "Visszad"
    return `<button type='button' id='${id}' class='tsf-button'>${text}</button>`
}