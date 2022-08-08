const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const session = require('express-session');
const websocket = require('ws')
const path = require('path');

const serverSettings = require("../server/config/serverSettings.js")
const logger = require("../server/utils/logger").msgLogger
const WSRouter = require("../server/main/Route/WSRouter")
const User = require("../server/models/user")
const TokenHandler = require("../server/main/TokenHandler").deleteAllTokens


//Init stuffs
console.log("------------------------------------------------------------------------")
logger("Starting server...")

// Express body parser
app.use(express.urlencoded({ extended: true }));

//database connection
require("../server/main/Database/Database").connect()

//ejs, layout
//app.use(expressLayouts);
app.set("view-engine", "ejs")
app.set('views', './client/views');

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
})
app.use(sessionParser);
//logger
app.use(require("../server/utils/logger").requestLogger)

//router
app.use(require("../server/main/Route/HTTPRouter"))

//final stuffs
const server = app.listen(serverSettings.port, () => {
    logger("Server is running on port " + serverSettings.port )
})

//websocket
const wss = new websocket.Server({ server: server });

WSRouter(wss)
TokenHandler()






