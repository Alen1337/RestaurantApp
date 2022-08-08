export function render(order) {
    const id = ELEMENT.UNDO_DELIVER_ORDER_BUTTON + order.orderid
    const text = "Mégse"
    return `<button type='button' id='${id}'>${text}</button>`
}