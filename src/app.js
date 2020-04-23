const express = require("express")
const bodyParser = require('body-parser')

const masterProcess = require("./utils/masterProcess")
const requestLogger = require("./logger/requestLogger")
const cdTracker = require("./utils/cdTracker")
const twilio = require("./utils/twilio")
const helperCommands = require('./utils/helperCommands')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(requestLogger)

const PORT = 3000
console.log("initial Load")

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    command = req.body.Body.toString() 
    helperCommands(command, res)
    cdTracker()
        .then(cwd => {
            masterProcess(command, cwd)
                .then(data => twilio(data, res))
                .catch(err => twilio(err, res))
        })
        .catch(err => twilio(err, res))
})

app.listen(PORT, () => console.log(`Listening on port : ${PORT}`))