const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//models
const LoginToken = require("../models/LoginToken")

//accesskeys
const accessKeys = require("../config/accessKeys")

//logger
const logger = require("../utils/logger").msgLogger

async function deleteOldTokens() {
    logger("Deleting old tokens...")

    const allToken = await LoginToken.find();
    const tokensToDelete = []
    let count = 0;
    for (let i = 0; i < allToken.length; i++) {
        let n = Number(allToken[i].createdAt) + allToken[i].expireAfterSeconds * 1000;
        let n2 = Date.now()
        
        let isExpired = n < n2
        if(isExpired) {
            await LoginToken.deleteOne({key: allToken[i].key})
            count++
        }


        console.log(n + " " + n2 + ' ' + isExpired)
        
    }

    logger(count + " old token deleted")
    
}

async function deleteAllTokens() {
    logger("Deleting tokens...")

    const allToken = await LoginToken.find();
    const tokensToDelete = []
    let count = 0;
    for (let i = 0; i < allToken.length; i++) {
        await LoginToken.deleteOne({key: allToken[i].key})
        count++
    }

    logger(count + " token deleted")
}

async function submitNewToken(userid) {
    const key = jsonwebtoken.sign(
        { id: userid },
        accessKeys.sessionKEY,
        { expiresIn: '24h' }
    )
    

    const createdAt = Date.now()
    const expireAfterSeconds = 300
    const token = new LoginToken({key,userid,createdAt,expireAfterSeconds})
    
    
    const t = await token.save()
    return t

}


module.exports = { deleteAllTokens, deleteOldTokens, submitNewToken }