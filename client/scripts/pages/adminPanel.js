import * as Navbar from "/public/js/ALib/components/main/Navbar.js"
import * as HeaderBar from "/public/js/ALib/components/main/HeaderBar.js"
import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as PaymentSummary from "/public/js/ALib/components/adminpanel/PaymentSummary.js"
import * as PaymentList from "/public/js/ALib/components/adminpanel/PaymentList.js"
import * as OrderStateList from "/public/js/ALib/components/adminpanel/OrderStateList.js"
import * as OrdersList from "/public/js/ALib/components/adminpanel/OrdersList.js"
import * as LoginTokenList from "/public/js/ALib/components/adminpanel/LoginTokenList.js"
import * as UserList from "/public/js/ALib/components/adminpanel/UserList.js"
import * as RoleList from "/public/js/ALib/components/adminpanel/RoleList.js"
import * as ProductList from "/public/js/ALib/components/adminpanel/ProductList.js"
import * as TableList from "/public/js/ALib/components/adminpanel/TableList.js"
import * as Menu from "/public/js/ALib/components/adminpanel/Menu.js"
import * as Loader from "/public/js/ALib/components/Main/Loader.js"


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
    

    newUserButton.addEventListener('click', ()=>{sendNewUser(socket)})
    newProductButton.addEventListener('click', ()=>{sendNewProduct(socket)})
    newTableButton.addEventListener('click', ()=>{sendNewTable(socket)})
    

    WSS.init(TARGET.ADMIN_PANEL)

    WSS.getSocket().addEventListener('open', (event) => {
        WSS.getAllUsers()
        WSS.getAllProducts()
        WSS.getAllRoles()
        WSS.getAllTables()
        WSS.getAllOrders()
        WSS.getAllOrderStates()
        WSS.getAllLoginTokens()
        WSS.getAllPayments()

        HeaderBar.init(WSS)
        Menu.init()
        Navbar.render()
        
    })

    WSS.getSocket().addEventListener('message', function (event) {
        let dataParsed = JSON.parse(event.data) 

        if(dataParsed.type === RES_TYPES.SUCCESS) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.ERROR) WSSuccessRes(dataParsed)
        else if(dataParsed.type === RES_TYPES.UPDATE) WSUpdateMSG(dataParsed)
    });



    

    
    Loader.hide()

}

function WSSuccessRes(dataParsed) {
    if(dataParsed.action === REQ_ACTION.USERS) { UserList.render(dataParsed.msg) }    
    else if(dataParsed.action === REQ_ACTION.PRODUCTS) { ProductList.render(dataParsed.msg) }
    else if(dataParsed.action === REQ_ACTION.TABLES) { TableList.render(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ROLES) { RoleList.render(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDERS) { OrdersList.render(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.ORDER_STATES) { OrderStateList.render(dataParsed.msg)} 
    else if(dataParsed.action === REQ_ACTION.LOGIN_TOKENS) { LoginTokenList.render(dataParsed.msg) } 
    else if(dataParsed.action === REQ_ACTION.PAYMENTS) { 
        PaymentList.render(dataParsed.msg) 
        PaymentSummary.render(dataParsed.msg)
    } 
    else if(dataParsed.action === REQ_ACTION.DISPLAY_USER) HeaderBar.setUser(dataParsed.msg)
}
function WSErrorRes(res) {

}

function WSUpdateMSG(msg) {
    if(msg.action === REQ_ACTION.USERS) WSS.getAllUsers()
    else if(msg.action === REQ_ACTION.ORDERS) WSS.getAllOrders()
    else if(msg.action === REQ_ACTION.TABLES) WSS.getAllTables()
    else if(msg.action === REQ_ACTION.PAYMENTS) WSS.getAllPayments()
}

function displayError(res) {
    console.log(res)
} 







window.onload = init