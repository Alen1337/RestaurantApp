const mongoose = require('mongoose');

const OrderStateSchema = new mongoose.Schema({
    name: String,
    orderstateid: Number
});

const OrderState = mongoose.model('OrderState', OrderStateSchema);

module.exports = OrderState;