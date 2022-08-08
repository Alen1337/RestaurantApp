export function render(productid) {
    const text = "Hozzáadás"
    const id = ELEMENT.SRB_PRODUCT_ID + productid 
    return `<button type='button' id='${id}'>${text}</button>`
}