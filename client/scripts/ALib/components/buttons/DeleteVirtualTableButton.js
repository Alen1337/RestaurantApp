let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"

export function init(_outputHtml) {
    outputElement = _outputHtml
}

export function render() {
    outputElement.innerHTML = ""
    if(TableSelector.getSelectedTableID() === undefined) return
    if(!TableSelector.getSelectedTable().isVirtual) return
    const id = ELEMENT.DELETE_VIRTUAL_TABLE_BUTTON
    let text = "Virtuális asztal törlése"
    
    outputElement.innerHTML =  `<button type='button' id='${id}'>${text}</button>`
    const isFreeButton = document.getElementById(id)
    isFreeButton.addEventListener('click', () => {
            WSS.deleteVirtualTable(TableSelector.getSelectedTableID())
            
    })
}