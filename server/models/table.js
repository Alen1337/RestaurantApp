const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productid: Number,
    isPayed: Boolean
})

const TableSchema = new mongoose.Schema({
  tableid: Number,
  name: String,
  products: [{
    productid: Number,
    isPayed: Boolean
  }],
  isVirtual: Boolean,
  isFree: Boolean,
});

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;