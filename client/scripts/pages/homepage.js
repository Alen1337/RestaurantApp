import * as WSS from "/public/js/ALib/Websocket/SendMSG.js"

const loggedUserNameDiv = document.getElementById("loggedUserName")
const loggedUserRoleDiv = document.getElementById("loggedUserRole")

function init() {
    WSS.init(TARGET.HOMEPAGE)
    WSS.getSocket().addEventListener('open', (event) => { 
        WSS.getDisplayUser()
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
    });
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.DISPLAY_USER) displayUser(res.msg)
}

function WSErrorRes(res) {

}

function displayUser(user) {
    loggedUserNameDiv.innerHTML = user.username
    loggedUserRoleDiv.innerHTML = user.roleName
}

window.onload = init