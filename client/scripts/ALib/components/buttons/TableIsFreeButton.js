let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"

export function init(_outputHtml) {
    outputElement = _outputHtml
}

export function render() {
    if(TableSelector.getSelectedTableID() === undefined) return
    const id = ELEMENT.TABLE_IS_FREE_BUTTON
    let text = "Asztal szabad"
    if(TableSelector.getSelectedTable().isFree) text = "Asztal felvétel"
    
    outputElement.innerHTML =  `<button type='button' id='${id}' class='tsf-button'>${text}</button>`
    const isFreeButton = document.getElementById(ELEMENT.TABLE_IS_FREE_BUTTON)
    isFreeButton.addEventListener('click', () => {
        if(TableSelector.getSelectedTable().isFree) {
            WSS.sendTableIsFree(false, TableSelector.getSelectedTable().tableid)
        } else {
            WSS.sendTableIsFree(true, TableSelector.getSelectedTable().tableid)
        }
    })
}