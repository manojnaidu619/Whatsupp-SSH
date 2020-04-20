const express = require("express")
const masterProcess = require("./utils/masterProcess")
const requestLogger = require("./logger/requestLogger")
const app = express()

app.use(express.json())
app.use(requestLogger)

global.cwd = '/Users/manojnaidu619/Desktop'

console.log("index : ", cwd)

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    command = req.body.command.toString()
    masterProcess(command, cwd)
        .then(data => res.send(data))
        .catch(err => res.send(err))
        //.catch(err => {res.send(`'${err.cmd}' is not a valid command. error code : ${err.code}`)})
})

app.listen(3000)