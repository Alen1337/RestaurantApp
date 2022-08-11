

export function render(orderid) {
    const text = "Törlés"
    const id = ELEMENT.DELETE_ORDER_BUTTON + orderid 
    return `<button type='button' id='${id}'>${text}</button>`
}