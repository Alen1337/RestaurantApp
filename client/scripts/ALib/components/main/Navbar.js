
const outputElement = document.getElementById("navbar")
const orderManagerIcon = `<img src='/public/img/orderManagerIcon.png' class="w-[45px] hue-rotate-15">`
const orderMakerIcon = `<img src='/public/img/orderMakerIcon.png' class="w-[45px] hue-rotate-15">`
const orderDeliveryIcon = `<img src='/public/img/orderDeliveryIcon.png' class="w-[42px] hue-rotate-15">`
const payIcon = `<img src='/public/img/payIcon.png' class="w-[50px] hue-rotate-15">`
const adminPanelIcon = `<img src='/public/img/adminPanelIcon.png' class="w-[35px] hue-rotate-15">`
const logoutIcon = `<img src='/public/img/logoutIcon.png' class="w-[30px] hue-rotate-15">`
const logoIcon = `<img src='/public/img/logo.png' class="w-[45px] hue-rotate-15">`
export function render() {
    let out = `<div class="navbar-container">`
    out += renderButton(logoIcon)
    out += "<hr class='navbar-hr'>"
    out += renderButton(orderManagerIcon, ELEMENT.NAV_ORDER_MANAGER_BUTTON)
    out += renderButton(orderMakerIcon, ELEMENT.NAV_ORDER_MAKER_BUTTON)
    out += renderButton(orderDeliveryIcon, ELEMENT.NAV_ORDER_DELIVERY_BUTTON)
    out += renderButton(payIcon, ELEMENT.NAV_PAY_BUTTON)
    out += "<hr class='navbar-hr'>"
    out += "<hr class='navbar-hr'>"
    out += "<br>"
    out += renderButton(adminPanelIcon, ELEMENT.NAV_ADMIN_PANEL_BUTTON)
    out += renderButton(logoutIcon, ELEMENT.NAV_LOGOUT_BUTTON)

    out += `</div>`
    outputElement.innerHTML = out
    setupButtons()
}

function renderButton(icon, id) {

    let out = `<div class="navbar-icon-div group" id="${id}">${icon}</div>`
    return out
}

function setupButtons() {
    let orderManagerButt = document.getElementById(ELEMENT.NAV_ORDER_MANAGER_BUTTON)
    let orderMakerButt = document.getElementById(ELEMENT.NAV_ORDER_MAKER_BUTTON)
    let orderDeliveryButt = document.getElementById(ELEMENT.NAV_ORDER_DELIVERY_BUTTON)
    let payButt = document.getElementById(ELEMENT.NAV_PAY_BUTTON)
    let adminPanelButt = document.getElementById(ELEMENT.NAV_ADMIN_PANEL_BUTTON)
    let logoutButt = document.getElementById(ELEMENT.NAV_LOGOUT_BUTTON)

    orderManagerButt.addEventListener('click', ()=> {
        window.location.replace("/order-manager");
    })
    orderMakerButt.addEventListener('click', ()=> {
        window.location.replace("/order-maker");
    })
    orderDeliveryButt .addEventListener('click', ()=> {
        window.location.replace("/order-delivery");
    })
    payButt.addEventListener('click', ()=> {
        window.location.replace("/pay");
    })
    adminPanelButt.addEventListener('click', ()=> {
        window.location.replace("/admin-panel");
    })
    logoutButt .addEventListener('click', ()=> {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5000/logout");
        xhr.send()
        window.location.replace("/auth");
    })

}