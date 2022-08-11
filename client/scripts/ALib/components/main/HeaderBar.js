const loggedUserNameDiv = document.getElementById("loggedUserName")
const loggedUserRoleDiv = document.getElementById("loggedUserRole")
const headerDiv = document.getElementById("header")
let time = "Betöltés"
let user
export function init(WSS) {
    WSS.getDisplayUser()
    setInterval(updateTime, 1000)
}

export function setUser(_user) {
    user = _user
    render()
}

function render() {
    let a = `<span class="text-green-400">[${user.roleName}] </span>`

    let out = `<div class="header-container">`
    out +=`<div class="appname-container"><span">RestaurantApp v1.0</span></div>`
    out +=`<div class="user-container">`
    if(user.roleName === "Admin") a = `<span>[${user.roleName}] </span>`
    out += a
    out +=`<span>${user.username}</span></div>`

    out += `<div class="time-container">${time}</div>`
    out += `</div>`

    headerDiv.innerHTML = out
}


function updateTime() {
    time = new Date().toLocaleTimeString()
    render()
}

