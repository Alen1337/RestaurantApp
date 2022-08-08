export function render(table) {
    const id = ELEMENT.TB_TABLE_ID + table.tableid
    let color = "color: yellow; "
    let bgcolor = "background-color: red; "
    if(table.isFree) bgcolor = "background-color: green; "
    if(table.isVirtual) color = "color: blue; "
    let style = color + bgcolor
    return `<button type='button' style="${style}" id='${id}'>${table.name}</button>`
}