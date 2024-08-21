import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
const rolesList = document.getElementById('rolesList')

export function render(res) {
    let out = "<div class='rolelist-results-container'>"
    const resLen = res.length

    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='rolelist-role-container'>
            <div class=''>${renderRole(res[i])}</div>
        </div>
        `
    }

    out+="</div>"
    rolesList.innerHTML = out
}

function renderRole(res) {
    return `
    <div>
        ID: ${res.roleid}
    </div>
    <div>
        Name:  ${res.name}
    </div>
    `
}