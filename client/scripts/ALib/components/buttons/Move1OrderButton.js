let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as MoveOrderTableSelector from "/public/js/ALib/components/main/MoveOrderTableSelector.js"

export function init(_outputHtml) {
    outputElement = _outputHtml
}
export function render(orderid) {
    const text = "Áthelyzés"
    const id = ELEMENT.MOVE_ORDER_BUTTON + orderid
    return `<button type='button' id='${id}' class='tsf-button'>${text}</button>`

}