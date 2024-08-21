import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
const userList = document.getElementById('userList')

export function render(res) {
    let out = "<div class='userlist-results-container'>"
    const resLen = res.length

    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='userlist-user-container'>
            <div class=''>${renderUser(res[i])}</div>
            <button type='button' id='delete-user:${res[i].userid}' class='tsf-button'>Törlés</button>
        </div>
        
        `
    }

    out+="</div>"
    userList.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-user:" + res[i].userid).addEventListener('click', function(event) {
            WSS.sendDeleteUser(res[i].userid)
        })
    }

}

function renderUser(res) {
    return `
    <div>
        ID: ${res.userid}
    </div>
    <div>
        Role: ${res.rolename}
    </div>
    <div>
        Name:  ${res.username}
    </div>
    `
}