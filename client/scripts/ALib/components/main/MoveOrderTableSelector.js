import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"

let tablesElement
let show = false
let tables = undefined
let order = undefined

export function init(_tableDiv, ) {
    tablesElement = _tableDiv
}

export function switchMode( state) {
    show = state
    render()
}

export function swapMode() {
    show = !show
    render()
}

export function setTables(_tables) {
    tables = _tables
    render()
}

export function setOrder(_order) {
    order = _order
}

export function render() {
    tablesElement.innerHTML = ""
    if(!show) return
    if(tables === undefined) return
    renderTableList()
    setupTableButton()
}


function renderTableList() {
    const tablesLen = tables.length
    let out = ""
    
    for (let i = 0; i < tablesLen; i++) {
        let id = ELEMENT.CHOOSE_TABLE_TO_MOVE_ORDER_BUTTON + tables[i].tableid
        out +=  `<button type='button' id='${id}' class='tsf-button'>${tables[i].name}</button>`
    }
    tablesElement.innerHTML = out
}


function setupTableButton() {
    for (let i = 0; i < tables.length; i++) {
        const tableButton = document.getElementById(ELEMENT.CHOOSE_TABLE_TO_MOVE_ORDER_BUTTON + tables[i].tableid)
        tableButton.addEventListener('click', function(event) {
            switchMode(false)
            if(order === undefined) WSS.moveOrdersToNewTable(TableSelector.getSelectedTableID(), tables[i].tableid)
            else WSS.move1OrderToNewTable(order.orderid, tables[i].tableid)
        })
    }
}