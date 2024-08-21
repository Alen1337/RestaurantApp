import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
const loginTokensList = document.getElementById('loginTokensList')

export function render(res) {
    let out = "<div class='logintokenlist-results-container'>"
    const resLen = res.length
    
    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='logintokenlist-token-container'>
            <div class=''>${renderToken(res[i])}</div>
        </div>
        
        `
    }
    out+="</div>"
    loginTokensList.innerHTML = out
}

function renderToken(res) {
    return `
            <div>
                Userid: ${res.userid}
            </div>
            <div class='logintokenlist-tokenkey'>
                Key: ${res.key} 
            </div>
            `
}