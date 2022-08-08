import * as TableButton from "/public/js/ALib/components/buttons/TableButton.js"

let WSS
let tablesElement
let selectedTableElement
let selectedTableID
let selectedTable


export function init(_WSS, _tableDiv, _selectedTableDiv) {
    WSS = _WSS
    tablesElement = _tableDiv
    selectedTableElement = _selectedTableDiv
}

export function getSelectedTableID() {
    return selectedTableID
}

export function getSelectedTable() {
    return selectedTable
}

export function render(tables) {
    renderTableList(tables)
    setupTableButton(tables)
}

export function resetSelectedTable() {
    renderSelectedTable("", selectedTableElement)
    selectedTableID = undefined
    selectedTable = undefined
    WSS.getOrdersByTable(undefined)
}



function renderTableList(tables) {
    const tablesLen = tables.length
    let out = ""
    for (let i = 0; i < tablesLen; i++) {
        out += TableButton.render(tables[i])
        if(tables[i].tableid == selectedTableID) selectedTable = tables[i]
    }
    tablesElement.innerHTML = out
}

function renderSelectedTable(selectedTableName) {
    selectedTableElement.innerHTML = selectedTableName
}

function setupTableButton(tables) {
    for (let i = 0; i < tables.length; i++) {
        const tableButton = document.getElementById(ELEMENT.TB_TABLE_ID + tables[i].tableid)
        tableButton.addEventListener('click', function(event) {
            renderSelectedTable(tables[i].name, selectedTableElement)
            selectedTableID = tables[i].tableid
            selectedTable = tables[i]
            WSS.getOrdersByTable(tables[i].tableid)
        })
    }
}