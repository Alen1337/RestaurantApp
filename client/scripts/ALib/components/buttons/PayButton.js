let outputElement
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"

export function init(_outputHtml) {
    outputElement = _outputHtml
}

export function render() {
    outputElement.innerHTML = ""
    if(TableSelector.getSelectedTableID() === undefined) return
    if(TableSelector.getSelectedTable().isFree) return
    const id = ELEMENT.PAY_BUTTON
    const text = "Fizetés"
    outputElement.innerHTML =  `<button type='button' id='${id}'>${text}</button>`
    const payButton = document.getElementById(ELEMENT.PAY_BUTTON)
    payButton.addEventListener('click', () => {
            window.location.replace("/pay/" + TableSelector.getSelectedTableID());
    })
}