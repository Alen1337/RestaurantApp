const allTableDiv = document.getElementById("allTableDiv")
const tableProductsDiv = document.getElementById("tableProductsDiv")
const totalAmountSpan = document.getElementById("totalAmountSpan")
const selectedTableSpan = document.getElementById("selectedTableSpan")
const payButton = document.getElementById("payButton")
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as Navbar from "/public/js/ALib/components/main/Navbar.js"
import * as HeaderBar from "/public/js/ALib/components/main/HeaderBar.js"
import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as OrderList from "/public/js/ALib/components/main/OrderList.js"
let socket
let selectedTable = {
    name: "Nincs",
    tableid: Number(document.location.pathname.split('pay/')[1])
}


selectedTableSpan.innerHTML = selectedTable.name

function init() {
    WSS.init(TARGET.PAY)
    payButton.addEventListener('click', () => {
        sendPay(selectedTable.tableid)
    })
    WSS.getSocket().addEventListener('open', (event) => { 
        WSS.getAllTable()
        if(selectedTable.tableid) {
            
            getOrdersByTable(selectedTable.tableid)
            getTableNameByID(selectedTable.tableid)
        }
        HeaderBar.init(WSS)
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed)   
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });
    Navbar.render()
    TableSelector.init(WSS, allTableDiv, selectedTableSpan)
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.TABLES) TableSelector.setTables(res.msg)
    if(res.action === REQ_ACTION.ORDERS_BY_TABLE) {
        OrderList.init(tableProductsDiv)
        OrderList.render(res.msg)
        totalAmountSpan.innerHTML = getTableContentsPrice(res.msg)
    }
    if(res.action === REQ_ACTION.TABLE_BY_ID) displaySelectedTableName(res.msg)
    else if(res.action === REQ_ACTION.DISPLAY_USER) HeaderBar.setUser(res.msg)
}

function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.ORDERS_BY_TABLE) WSS.getOrdersByTable(selectedTable.tableid)
    else if(msg.action === REQ_ACTION.TABLES) WSS.getAllTable()
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
            WSS.getOrdersByTable(selectedTable.tableid)
        })
    }
}

function getTableContentsPrice(orders) {
    let priceSum = 0;
    const resLen = orders.length
    for (let i = 0; i < resLen; i++) {
        priceSum += orders[i].productPrice
    }
    return priceSum
}

function displaySelectedTableName(table) {
    selectedTableSpan.innerHTML = table.name
}





window.onload = init