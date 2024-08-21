const orderStatesList = document.getElementById('orderStatesList')

export function render(res) {
    let out = "<div class='orderstateslist-results-container'>"
    const resLen = res.length
    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='orderstateslist-orderstate-container'>
            <div>${res[i].name}</div>
            <div>${res[i].orderstateid}</div>
        </div>
        `
    }
    out+="</div>"
    orderStatesList.innerHTML = out
}