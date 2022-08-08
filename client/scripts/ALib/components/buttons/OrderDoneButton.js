export function render(order) {
    const id = ELEMENT.ORDER_DONE_BUTTON + order.orderid
    const text = "Kész"
    return `<button type='button' id='${id}'>${text}</button>`
}