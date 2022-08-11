export function render(order) {
    let out = "Termék: " + order.productName + " - " +
    "Ár: " + order.productPrice

    if(order.comment !== "") out += " - " + "Megjegyzés: " + order.comment
    return out
}