const userList = get('userList')
const productList = get('productList')
const tableList = get('tableList')
const rolesList = get('rolesList')
const ordersList = get('ordersList')
const orderStatesList = get('orderStatesList')
const loginTokensList = get('loginTokensList')
const paymentsDiv = get('paymentsDiv')
const AllPaymentDiv = get('allPaymentDiv')


const username = get('username').value
const password = get('password').value
const role = get('role').value
const newUserButton = get('addNewUserButton')
const productName = get('productName').value
const productPrice = get('productPrice').value
const newProductButton = get('addNewProductButton')
const tableName = get('tableName').value
const newTableButton = get('addNewTableButton')
let socket

function get(id) {
    return document.getElementById(id)
}

function init() {
    socket = new WebSocket('ws://localhost:5000/admin-panel');
    
    socket.addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data) 

        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });

    socket.addEventListener('open', (event) => {
        getUsers(socket)
        getProducts(socket)
        getRoles(socket)
        getTables(socket)
        getOrders(socket)
        getOrderStates(socket)
        getLoginTokens(socket)
        getAllPayment()
    })

    newUserButton.addEventListener('click', ()=>{sendNewUser(socket)})
    newProductButton.addEventListener('click', ()=>{sendNewProduct(socket)})
    newTableButton.addEventListener('click', ()=>{sendNewTable(socket)})
}

function WSSuccessRes(dataParsed) {
    if(dataParsed.action === REQ_ACTION.USERS) { displayUserList(dataParsed.msg) }    
    else if(dataParsed.action === REQ_ACTION.PRODUCTS) { displayProductList(dataParsed.msg) }
    else if(dataParsed.action === REQ_ACTION.TABLES) { displayTableList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ROLES) { displayRolesList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDERS) { displayOrdersList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDER_STATES) { displayOrderStatesList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.LOGIN_TOKENS) { displayLoginTokensList(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.PAYMENTS) { displayPayments(dataParsed.msg) } 
}
function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.USERS) getUsers(socket)
    else if(msg.action === REQ_ACTION.ORDERS) getOrders(socket)
    else if(msg.action === REQ_ACTION.TABLES) getTables()
}


function displayPayments(res) {
    let out = "<ol>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out +="<li> Fizettető: " + res[i].collectorName + " - Összeg: " + res[i].amount + " Ft"
        out +=" <button type='button' id='delete-payment:" + res[i].paymentid + "'>Törlés</button>"
        out +="</li>" 
    }
    out+="</ol>"
    AllPaymentDiv.innerHTML = out

    for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-payment:" + res[i].paymentid).addEventListener('click', function(event) {
            sendDeleteUser(socket, res[i].paymentid)
        })
    }

    var result = [];
    res.reduce(function(res, value) {
        if (!res[value.collectorName]) {
            res[value.collectorName] = { collectorName: value.collectorName, allAmount: 0 };
            result.push(res[value.collectorName])
        }
        res[value.collectorName].allAmount += value.amount;
        return res;
    }, {});

    out = "<ol>"
    for (let i = 0; i < result.length; i++) {
        out += "<li>"
        out += "Felhasználó: " + result[i].collectorName + " Összeg: " + result[i].allAmount + " Ft"
        out += "</li>"
    }
    out += "</ol>"
    
    paymentsDiv.innerHTML = out
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
    socket.send(JSON.stringify(req))
}

function sendNewUser(socket) {
    let user = { 
        username: get('username').value, 
        password: get('password').value, 
        roleid: get('role').value 
    }
    socket.send(JSON.stringify({ target: TARGET.ADMIN_PANEL, type: REQ_TYPES.POST, action: REQ_ACTION.USER, user}))
}
function sendNewProduct(socket) {
    const product = { 
        name: get('productName').value, 
        price: get('productPrice').value 
    }
    socket.send(JSON.stringify({ target: "admin-panel",  type: "post", action: 'postNewProduct', product}))
}
function sendNewTable(socket) {
    const table = { name:get('tableName').value }
    socket.send(JSON.stringify({ target: "admin-panel", type: "post", action: 'postNewTable', table}))
}
function sendDeleteOrder(socket, orderid) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DELETE_ORDER,
        orderid: orderid
    }
    socket.send(JSON.stringify(req))
}
function sendDeleteUser(socket, userid) {
    const req = {
        target: TARGET.ADMIN_PANEL,
        type: REQ_TYPES.POST,
        action: REQ_ACTION.DELETE_USER,
        userid: userid
    }
    socket.send(JSON.stringify(req))
}
function sendRole(socket) {
    const newRole = { 
        name: get('roleName').value, 
        isAdmin: get('isAdmin').isChecked,
        isWaiter: get('isWaiter').isChecked,
        isBartender: get('isBartender').isChecked,
    }
    socket.send(JSON.stringify({
        target: TARGET.ADMIN_PANEL, 
        type: REQ_TYPES.POST, 
        action: REQ_ACTION.ROLE,
        role: newRole
        }))
}



window.onload = init