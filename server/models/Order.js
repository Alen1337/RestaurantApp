const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderid: Number,
  createdBy: Number,
  tableid: Number,
  productid: Number,
  orderstateid: Number,
  makerid: Number,
  deliverid: Number,
  isPayed: Boolean,
  hasToDeliver: Boolean,
  round: Number,
  date: Number,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;