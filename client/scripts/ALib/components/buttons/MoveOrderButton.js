let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as MoveOrderTableSelector from "/public/js/ALib/components/main/MoveOrderTableSelector.js"

export function init(_outputHtml, tableElement) {
    outputElement = _outputHtml
    MoveOrderTableSelector.init(tableElement)
}
export function render() {
    outputElement.innerHTML = ""
    if(TableSelector.getSelectedTableID() === undefined) return
    if(TableSelector.getSelectedTable().isFree) return
    const text = "Összes rendelés áthelyezése"
    const id = ELEMENT.MOVE_ORDERS_BUTTON 
    
    outputElement.innerHTML =  `<button type='button' id='${id}' class='tsf-button'>${text}</button>`

    const butt = document.getElementById(id)
    butt.addEventListener('click', ()=> {
        MoveOrderTableSelector.swapMode()
        MoveOrderTableSelector.render()
        MoveOrderTableSelector.setOrder(undefined)
    })
}