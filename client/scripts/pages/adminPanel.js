import * as Navbar from "/public/js/ALib/components/main/Navbar.js"
import * as HeaderBar from "/public/js/ALib/components/main/HeaderBar.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as PaymentSummary from "/public/js/ALib/components/adminpanel/PaymentSummary.js"
import * as PaymentList from "/public/js/ALib/components/adminpanel/PaymentList.js"

const userList = get('userList')
const productList = get('productList')
const tableList = get('tableList')
const rolesList = get('rolesList')
const ordersList = get('ordersList')
const orderStatesList = get('orderStatesList')
const loginTokensList = get('loginTokensList')


const username = get('username').value
const password = get('password').value
const role = get('role').value
const newUserButton = get('addNewUserButton')
const productName = get('productName').value
const productPrice = get('productPrice').value
const newProductButton = get('addNewProductButton')
const tableName = get('tableName').value
const newTableButton = get('addNewTableButton')

function get(id) {
    return document.getElementById(id)
}

function init() {
    WSS.init(TARGET.ADMIN_PANEL)
    
    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data) 

        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });

    WSS.getSocket().addEventListener('open', (event) => {
        getUsers(WSS.getSocket())
        getProducts(WSS.getSocket())
        getRoles(WSS.getSocket())
        getTables(WSS.getSocket())
        getOrders(WSS.getSocket())
        getOrderStates(WSS.getSocket())
        getLoginTokens(WSS.getSocket())
        getAllPayment()

        WSS.getUsers()
        HeaderBar.init(WSS)
    })

    newUserButton.addEventListener('click', ()=>{sendNewUser(socket)})
    newProductButton.addEventListener('click', ()=>{sendNewProduct(socket)})
    newTableButton.addEventListener('click', ()=>{sendNewTable(socket)})
    Navbar.render()
}

function WSSuccessRes(dataParsed) {
    if(dataParsed.action === REQ_ACTION.USERS) { displayUserList(dataParsed.msg) }    
    else if(dataParsed.action === REQ_ACTION.PRODUCTS) { displayProductList(dataParsed.msg) }
    else if(dataParsed.action === REQ_ACTION.TABLES) { displayTableList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ROLES) { displayRolesList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDERS) { displayOrdersList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDER_STATES) { displayOrderStatesList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.LOGIN_TOKENS) { displayLoginTokensList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.PAYMENTS) { 
        PaymentList.render(dataParsed.msg) 
        PaymentSummary.render(dataParsed.msg)
    } 
    else if(dataParsed.action === REQ_ACTION.DISPLAY_USER) HeaderBar.setUser(dataParsed.msg)
}
function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.USERS) getUsers(socket)
    else if(msg.action === REQ_ACTION.ORDERS) WSS.get
    else if(msg.action === REQ_ACTION.TABLES) getTables()
}

function displayError(res) {
    console.log(res)
} 
function displayUserList(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out +="<li> Roleid: " + res[i].roleid + " | Name: "+ res[i].username
        out +=" <button type='button' id='delete-user:" + res[i].userid + "'>Törlés</button>"
        out +="</li>" 
    }
    out+="</ol>"
    userList.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-user:" + res[i].userid).addEventListener('click', function(event) {
            sendDeleteUser(socket, res[i].userid)
        })
    }
}
function displayProductList(res) {
            let out = "<ol>"
            for (let i = 0; i < res.length; i++) {
                out +="<li>[ID=" + res[i].productid + "] - " + res[i].name + " " + res[i].price + " ft" + "</li>" 
            }
            out+="</ol>"
            productList.innerHTML = out
}
function displayTableList(res) {
    const tablesLen = res.length
    let out = ""
    for (let i = 0; i < tablesLen; i++) {
        out +="<button type='button'>" + res[i].name + "</button>"
    }
    tableList.innerHTML = out
}
function displayOrdersList(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        let payed = "FIZETVE"
        if(!res[i].isPayed) payed = "NEM FIZETVE"
        if(res[i].makerName === undefined) res[i].makerName = "MÉG SENKI"
        out +="<li>[" + res[i].tableName + "] - [" + res[i].state + "] - [" + res[i].makerName + "]"
        out += " - [" + payed + "]"
        out +=  " - "+ res[i].productName + " - Pincér: " + res[i].username 

        out +=" <button type='button' id='delete-order:" + res[i].orderid + "'>Törlés</button>"
        out += "</li>"
    }
    out+="</ol>"
    ordersList.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-order:" + res[i].orderid).addEventListener('click', function(event) {
            sendDeleteOrder(socket, res[i].orderid)
        })
    }
}
function displayOrderStatesList(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out+= "<li> Name:" + res[i].name + " | OrderStateID: " + res[i].orderstateid + "</li>"
    }
    out+="</ol>"
    orderStatesList.innerHTML = out
}
function displayRolesList(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        //out += JSON.stringify(res[i])
        out+= "<li>Name: " + res[i].name + " | Roleid: " + res[i].roleid + "</li>"
    }
    out+="</ol>"
    rolesList.innerHTML = out
}
function displayLoginTokensList(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out+= "<li> Key: " + res[i].key + "<br>Userid: " + res[i].userid + "</li>"
    }
    out+="</ol>"
    loginTokensList.innerHTML = out
}

function getRoles(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ROLES
    }
    socket.send(JSON.stringify(req))
}
function getUsers(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.USERS
    }
    socket.send(JSON.stringify(req))
}
function getProducts(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.PRODUCTS
    }
    socket.send(JSON.stringify(req))
}
function getTables(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.TABLES
    }
    socket.send(JSON.stringify(req))
}
function getOrders(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ORDERS
    }
    socket.send(JSON.stringify(req))
}
function getOrderStates(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ORDER_STATES
    }
    socket.send(JSON.stringify(req))
}
function getLoginTokens(socket) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.LOGIN_TOKENS
    }
    socket.send(JSON.stringify(req))
}
function getAllPayment() {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.GET,
        action: REQ_ACTION.PAYMENTS
    }
    WSS.getSocket().send(JSON.stringify(req))
}





window.onload = init