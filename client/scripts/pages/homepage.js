import * as WSS from "/public/js/ALib/Websocket/SendMSG.js"
import * as Navbar from "/public/js/ALib/components/main/Navbar.js"
import * as HeaderBar from "/public/js/ALib/components/main/HeaderBar.js"

const loggedUserNameDiv = document.getElementById("loggedUserName")
const loggedUserRoleDiv = document.getElementById("loggedUserRole")


function init() {
    WSS.init(TARGET.HOMEPAGE)
    WSS.getSocket().addEventListener('open', (event) => { 
        HeaderBar.init(WSS)
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
    });
    Navbar.render()
    
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.DISPLAY_USER) HeaderBar.setUser(res.msg)
}

function WSErrorRes(res) {

}

window.onload = init