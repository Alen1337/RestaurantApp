import * as TableSelector from "/public/js/ALib/components/main/TableSelector.js"
import * as ProductSearch from "/public/js/ALib/components/main/ProductSearch.js"
import * as OrderList from "/public/js/ALib/components/main/OrderList.js"
import * as PopupMSG from "/public/js/ALib/components/util/PopupMSG.js"
import * as PayButton from "/public/js/ALib/components/buttons/PayButton.js"
import * as TableIsFreeButton from "/public/js/ALib/components/buttons/TableIsFreeButton.js"
import * as DeleteVirtualTableButton from "/public/js/ALib/components/buttons/DeleteVirtualTableButton.js"
import * as MoveOrdersButton from "/public/js/ALib/components/buttons/MoveOrderButton.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as MoveOrderTableSelector from "/public/js/ALib/components/main/MoveOrderTableSelector.js"

const searchbar = document.getElementById("searchbar");
const matches = document.getElementById("matches")
const tableList = document.getElementById('tableList')
const selectedTableDiv = document.getElementById('selectedTable')
const ordersByTableDiv = document.getElementById('ordersByTable')
const newVirtualTableButton = document.getElementById('newVirtualTableButton')
const payButtonDiv = document.getElementById('payButtonDiv')
const setTableIsFreeButton = document.getElementById("setTableIsfreeButtonDiv")
const deleteVirtualTableButtonDiv = document.getElementById("deleteVirtualTableButtonDiv")
const deliverModeSpan = document.getElementById("deliverModeSpan")
const moveOrdersButtonDiv = document.getElementById("moveOrdersButtonDiv")
const selectTableToMoveDiv = document.getElementById("selectTableToMoveDiv")

function init() {
    WSS.init(TARGET.ORDER_MANAGER)

    searchbar.addEventListener('keyup', function() { WSS.sendSearch(searchbar.value) })
    WSS.getSocket().addEventListener('open', (event) => { 
        WSS.sendSearch(searchbar.value)
        WSS.getAllTable()
        WSS.getAllOrder()
    })
    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data)
        
        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSErrorRes(dataParsed) 
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });
    newVirtualTableButton.addEventListener('click', (event) => {
        WSS.sendNewVirtualTable()
    })

    TableSelector.init(WSS, tableList, selectedTableDiv)
    ProductSearch.init(matches, deliverModeSpan)
    PayButton.init(payButtonDiv)
    PayButton.render()
    TableIsFreeButton.init(setTableIsFreeButton)
    TableIsFreeButton.render()
    DeleteVirtualTableButton.init(deleteVirtualTableButtonDiv)
    DeleteVirtualTableButton.render()
    MoveOrdersButton.init(moveOrdersButtonDiv, selectTableToMoveDiv)
    MoveOrdersButton.render()
}

function WSSuccessRes(res) {
    if(res.action === REQ_ACTION.TABLES) {
        TableSelector.render(res.msg)
        TableIsFreeButton.render()
        DeleteVirtualTableButton.render()
        MoveOrderTableSelector.setTables(res.msg)
    }
    else if(res.action === REQ_ACTION.SEARCH_RESULTS) {
        ProductSearch.render(res.msg)
    }
    else if(res.action === REQ_ACTION.INSERT_ORDER) {
        PopupMSG.init()
        PopupMSG.render(res.msg)
    }
    else if(res.action === REQ_ACTION.ORDERS_BY_TABLE)  {
        OrderList.init(ordersByTableDiv)
        OrderList.render(res.msg)
        PayButton.render()
        TableIsFreeButton.render()
        DeleteVirtualTableButton.render()
        MoveOrdersButton.render()
        MoveOrderTableSelector.switchMode(false)
    }
    else if(res.action === REQ_ACTION.DELETE_VIRTUAL_TABLE)  {
        TableSelector.resetSelectedTable()
    }
}

function WSErrorRes(res) {
    PopupMSG.init()
    PopupMSG.render(res.msg)
}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.ORDERS_BY_TABLE) WSS.getOrdersByTable(TableSelector.getSelectedTableID())
    else if(msg.action === REQ_ACTION.ORDERS) WSS.getAllOrder()
    else if(msg.action === REQ_ACTION.TABLES) WSS.getAllTable()
}

window.onload = init