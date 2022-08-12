import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"

export function render(table) {
    const id = ELEMENT.TB_TABLE_ID + table.tableid
    let c = "table-button"
    if(!table.isFree) c = "non-free-table-button"
    if(table.tableid === TableSelector.getSelectedTableID()) c += " selected-table-button"
    return `<button type='button' class='${c}' id='${id}'>${table.name}</button>`
}