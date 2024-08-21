import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
const tableList = document.getElementById('tableList')

export function render(res) {
    let out = "<div class='tablelist-results-container'>"
    const resLen = res.length

    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='tablelist-table-container'>
            <div class=''>${renderTable(res[i])}</div>
        </div>
        
        `
    }


    out+="</div>"
    tableList.innerHTML = out
}

function renderTable(res) {
    return `
    <div>
        ID: ${res.tableid}
    </div>
    <div>
        ${res.name}
    </div>
    `
}