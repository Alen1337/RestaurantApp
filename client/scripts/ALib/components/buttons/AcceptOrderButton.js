export function render(order) {
    const id = ELEMENT.ACCEPT_ORDER_BUTTON + order.orderid
    const text = "Elfogadás"
    return `<button type='button' id='${id}'>${text}</button>`
}