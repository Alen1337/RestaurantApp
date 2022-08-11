let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as MoveOrderTableSelector from "/public/js/ALib/components/main/MoveOrderTableSelector.js"

export function init(_outputHtml) {
    outputElement = _outputHtml
}
export function render() {
    return
    const text = "Kör vége"
    const id = ELEMENT.ROUND_FINISH_BUTTON 
    outputElement.innerHTML = `<button type='button' id='${id}'>${text}</button>`
}