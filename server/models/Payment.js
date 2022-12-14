const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    paymentid: Number,
    collectorid: Number,
    amount: Number,
    tableid: Number,
    orderidList: [Number],
    date: Date
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;