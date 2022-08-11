const allTableDiv = document.getElementById("allTableDiv")
const tableProductsDiv = document.getElementById("tableProductsDiv")
const totalAmountSpan = document.getElementById("totalAmountSpan")
const selectedTableSpan = document.getElementById("selectedTableSpan")
const payButton = document.getElementById("payButton")
import * as Navbar from "/public/js/ALib/components/main/Navbar.js"
import * as HeaderBar from "/public/js/ALib/components/main/HeaderBar.js"
let socket
let selectedTable = {
    name: "Nincs",
    tableid: Number(document.location.pathname.split('pay/')[1])
}


selectedTableSpan.innerHTML = selectedTable.name

function init() {
    payButton.addEventListener('click', () => {
        sendPay(selectedTable.tableid)
    })
    socket = new WebSocket('ws://localhost:5000/pay')
    socket.addEventListener('open', (event) => { 
        getAllTable()
        if(selectedTable.tableid) {
            
            getOrdersByTable(selectedTable.tableid)
            getTableNameByID(selectedTable.tableid)
        }
        HeaderBar.init(WSS)
    })

    socket.addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });
    Navbar.render()
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.TABLES) displayAllTable(res.msg)
    if(res.action === REQ_ACTION.ORDERS_BY_TABLE) displayOrdersByTable(res.msg)
    if(res.action === REQ_ACTION.TABLE_BY_ID) displaySelectedTableName(res.msg)
    else if(res.action === REQ_ACTION.DISPLAY_USER) HeaderBar.setUser(res.msg)
}

function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.ORDERS_BY_TABLE) getOrdersByTable(selectedTable.tableid)
    else if(msg.action === REQ_ACTION.TABLES) getAllTable()
}

function getAllTable() {
    socket.send(JSON.stringify({ 
        target: TARGET.PAY,
        type: REQ_TYPES.GET, 
        action: REQ_ACTION.TABLES, 
        }))
}

function displayAllTable(res) {
    const tablesLen = res.length
    let out = ""
    for (let i = 0; i < tablesLen; i++) {
        out +="<button type='button' id='" + res[i].name + "'>" + res[i].name + "</button>"
    }
    allTableDiv.innerHTML = out

    for (let i = 0; i < tablesLen; i++) {
        document.getElementById(res[i].name).addEventListener('click', function(event) {
            selectedTable = { name: res[i].name, tableid: res[i].tableid }
            selectedTableSpan.innerHTML = selectedTable.name
            getOrdersByTable(selectedTable.tableid)
        })
    }
}

function displayOrdersByTable(orders) {
    let priceSum = 0;
    let out = "<ol>"
    const resLen = orders.length
    for (let i = 0; i < resLen; i++) {
        out +="<li>"
        out += "Termék: " + orders[i].productName + " | Ár: " + orders[i].productPrice + " Ft"
        out +="</li>"
        priceSum += orders[i].productPrice
    }
    out+="</ol>"
    tableProductsDiv.innerHTML = out
    totalAmountSpan.innerHTML = priceSum
}

function displaySelectedTableName(table) {
    selectedTableSpan.innerHTML = table.name
}

function getOrdersByTable(tableid) {
    socket.send(JSON.stringify({ 
        target: TARGET.PAY, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.ORDERS_BY_TABLE, 
        tableid:  tableid
        }))
}

function getTableNameByID(tableid) {
    socket.send(JSON.stringify({ 
        target: TARGET.PAY, 
        type: REQ_TYPES.GET,
        action: REQ_ACTION.TABLE_BY_ID, 
        tableid:  tableid
        }))
}

function sendPay(tableid) {
    socket.send(JSON.stringify({ 
        target: TARGET.PAY, 
        type: REQ_TYPES.POST,
        action: REQ_ACTION.PAY, 
        tableid:  tableid
        }))
}



window.onload = init