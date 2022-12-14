const paymentsDiv = document.getElementById('paymentsDiv')

export function render(res) {
    var result = [];
    var out = "";
    res.reduce(function(res, value) {
        if (!res[value.collectorName]) {
            res[value.collectorName] = { collectorName: value.collectorName, allAmount: 0 };
            result.push(res[value.collectorName])
        }
        res[value.collectorName].allAmount += value.amount;
        return res;
    }, {});

    out = "<div class='payment-summary-result-container'>"
    for (let i = 0; i < result.length; i++) {
        out += 
        `
        <div class='payment-summary-user-container'>
            <div>${result[i].collectorName}</div>
            <div>${result[i].allAmount} Ft</div>
        </div>
        `
    }
    out += "</div>"
    
    paymentsDiv.innerHTML = out
}