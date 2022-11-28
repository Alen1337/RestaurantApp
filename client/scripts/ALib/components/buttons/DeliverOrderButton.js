export function render(order) {
    const id = ELEMENT.DELIVER_ORDER_BUTTON + order.orderid
    const text = "Kiszállít"
    return `<button type='button' id='${id}' class='tsf-button'>${text}</button>`
}