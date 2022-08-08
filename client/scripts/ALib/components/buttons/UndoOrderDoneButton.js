export function render(order) {
    const id = ELEMENT.UNDO_ORDER_DONE_BUTTON + order.orderid
    const text = "Mégsincs kész"
    return `<button type='button' id='${id}'>${text}</button>`
}