const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: String,
    roleid: Number,
    isAdmin: Boolean,
    isWaiter: Boolean,
    isBartender: Boolean,
    isRunner: Boolean,
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;