const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const PORT = 3003

const requestLogger = require("./logger/requestLogger")
const helperCommands = require('./utils/helperCommands')
const authValidator = require('./utils/authValidator')
const twilioWebhookValidator = require('./utils/twilioWebhookValidator')
const systemCommandExecutor = require('./utils/SystemCommandExecutor')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ limit: '10kb' }))     // to prevent DOS attack

//app.use(twilioWebhookValidator)         // Verifies whether request is actually sent by twilio
app.use(authValidator)                  // Verifies if user is authenticated yet 
app.use(requestLogger)                  // custom requests logger   

// Listening for requests in /SMSsh
app.post('/Whatsupp-SSH', (req, res) => { 
    command = req.body.Body.toString() 
    if (!helperCommands(command, res)) {
        systemCommandExecutor(command, res)     // calls only if it is not a helper command
    }
})

app.listen(PORT, () => console.log(`Listening on port : ${PORT}`))