const paymentsMenuButton = document.getElementById("paymentsMenuButton")
const usersMenuButton = document.getElementById("usersMenuButton")
const rolesMenuButton = document.getElementById("rolesMenuButton")
const productsMenuButton = document.getElementById("productsMenuButton")
const tablesMenuButton = document.getElementById("tablesMenuButton")
const ordersMenuButton = document.getElementById("ordersMenuButton")

const payments1 = document.getElementById("payments1")
const payments2 = document.getElementById("payments2")
const users = document.getElementById("users")
const roles = document.getElementById("roles")
const products = document.getElementById("products")
const tables = document.getElementById("tables")
const orders = document.getElementById("orders")


export function init() 
{  
    paymentsMenuButton.addEventListener('click', () => {
        hideall()
        payments1.style.display = "block";
        payments2.style.display = "block";
    })
    usersMenuButton.addEventListener('click', () => {
        hideall()
        users.style.display = "block";
    })
    rolesMenuButton.addEventListener('click', () => {
        hideall()
        roles.style.display = "block";
    })
    productsMenuButton.addEventListener('click', () => {
        hideall()
        products.style.display = "block";
    })
    tablesMenuButton.addEventListener('click', () => {
        hideall()
        tables.style.display = "block";
    })
    ordersMenuButton.addEventListener('click', () => {
        hideall()
        orders.style.display = "block";
    })

    hideall()
    payments1.style.display = "block";
    payments2.style.display = "block";
}

function hideall() {
    payments1.style.display = 'none'
    payments2.style.display = 'none'
    users.style.display = 'none'
    roles.style.display = 'none'
    products.style.display = 'none'
    tables.style.display = 'none'
    orders.style.display = 'none'
}