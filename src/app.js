const express = require("express")
const masterProcess = require("./utils/masterProcess")
const app = express()

app.use(express.json())

var cwd = process.env.HOME

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    command = req.body.command.toString()
    masterProcess(command, cwd)
        .then(data => { res.send(data) })
        .catch(err => {res.send(`'${err.cmd}' is not a valid command. error code : ${err.code}`)})
})

app.listen(3000)