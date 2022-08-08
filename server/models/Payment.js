const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    collectorid: Number,
    amount: Number,
    date: Date
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;