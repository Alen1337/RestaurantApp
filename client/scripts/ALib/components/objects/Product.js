

export function renderLess(product) {
    const id = product.productid
    const name = product.name
    const price = product.price
    return `
    <div class='product-name'>   
        ${name}
    </div>
    <div class='product-price'>
        ${price} Ft
    </div>`
}

export function render(product) {
    const id = product.productid
    const name = product.name
    const price = product.price
    return `
    <div>   
        ID: ${product.productid}
    </div>
    <div class='product-name'>   
        ${name}
    </div>
    <div class='product-price'>
        ${price} Ft
    </div>`
}