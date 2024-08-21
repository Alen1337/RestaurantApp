import * as WSS from "/public/js/ALib/WebSocket/SendMSG.js"
import * as Product from "/public/js/ALib/components/objects/Product.js"
const productList = document.getElementById('productList')

export function render(res) {
    let out = "<div class='productlist-results-container'>"
    const resLen = res.length

    for (let i = 0; i < resLen; i++) {
        out += 
        `
        <div class='productlist-product-container'>
            <div class=''>${Product.render(res[i])}</div>
            <button type='button' id='delete-product:${res[i].productid}' class='tsf-button'>Törlés</button>
        </div>
        
        `
    }

    out+="</div>"
    productList.innerHTML = out

    /*for (let i = 0; i < resLen; i++) {
        document.getElementById("delete-user:" + res[i].userid).addEventListener('click', function(event) {
            WSS.sendDeleteUser(res[i].userid)
        })
    }*/

}