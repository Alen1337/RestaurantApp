export function render(order) {
    let out = `
    <div class='product-name'>
        ${order.productName}
    </div>
    <div class='product-price'>
        ${order.productPrice} Ft
    </div>`

    let c = `
    <div class='order-comment'>
        (${order.comment})
    </div>`
    if(order.comment !== "") out += c
    return out
}