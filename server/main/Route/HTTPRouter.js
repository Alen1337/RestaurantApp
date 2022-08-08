const express = require('express');
const router = express.Router();
const fs = require("fs");


//controllers
const auth = require("../../controllers/Auth")
const homepage = require("../../controllers/Homepage")
const orderManager = require("../../controllers/OrderManager")
const adminPanel = require("../../controllers/AdminPanel")
const orderMaker = require("../../controllers/OrderMaker")
const orderDelivery = require("../../controllers/OrderDelivery")
const pay = require("../../controllers/Pay")

//auth
router.get('/auth', auth.getRequest)
router.post('/auth', auth.postRequest)

//homepage
router.get('/', homepage.getRequest)
router.post('/', homepage.postRequest)

//orderManager
router.get('/order-manager', orderManager.getRequest)
router.post('/order-manager', orderManager.postRequest)

//orderMaker
router.get('/order-maker', orderMaker.getRequest)
router.post('/order-maker', orderMaker.postRequest)


//adminPanel
router.get('/admin-panel', adminPanel.getRequest)
router.post('/admin-panel', adminPanel.postRequest)

//orderDelivery
router.get('/order-delivery', orderDelivery.getRequest)
router.post('/order-delivery', orderDelivery.postRequest)

//pay
router.get('/pay', pay.getRequest)
router.post('/pay', pay.postRequest)
router.get('/pay/:tableid', pay.getRequest)

//logout
router.post('/logout', (req, res, next) => { 
    req.logout((err) => {
        if(err) return next(err)
        res.redirect('/auth')
    })
 })

//public css
router.get('/public/css/*', (req, res) => { getCSS(req.url, res) })

//public javascripts

router.get('/public/js/*', (req, res) => { getJS(req.url, res) })
router.get('/ws-states.js', (req, res) => { getWSStatesJS(res) })

//public imgs
router.get('/public/img/*', (req, res) => { getIMG(req.url, res) })



//helper functions
function getJS(filename, res) {
    fs.readFile("client/scripts" + filename.split('/public/js')[1], (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
}
function getCSS(filename, res) {
    fs.readFile("client/css" + filename.split('/public/css')[1], (err, data) => {
        res.setHeader("Content-Type", "text/css");
        res.end(data)
    })
}
function getIMG(filename, res) {
    fs.readFile("client/img" + filename.split('/public/img')[1], (err, data) => {
        const format = filename.split('/public/img')[1].split(".")[1]
        if(format === "jpg") res.setHeader("Content-Type", "image/jpeg");
        else if(format === "png") res.setHeader("Content-Type", "image/png");
        res.end(data)
    })
}

function getWSStatesJS(res) {
    fs.readFile("server/utils/STATES.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data.toString().split("//*STATES*")[1])
    })
}








module.exports = router