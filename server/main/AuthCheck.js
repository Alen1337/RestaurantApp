const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//models
const User = require("../models/user")
const LoginToken = require("../models/LoginToken")

async function isAuthenticated(req) {
    if(!req.headers.cookie) return false
    let sessionKey = req.headers.cookie.split('sessionKey=')[1]
    if(!sessionKey) return false;

    try {
        const lt = await LoginToken.findOne({ key: sessionKey })
        if(!lt) return false

        const user = await User.findOne({userid: lt.userid},
             { username: 1, userid: 1, userrole: 1, roleid:1, _id: 0, date: 1})
        return user;

    } catch(err) {
        console.log(err)
    }
    

    
}

module.exports = { isAuthenticated }