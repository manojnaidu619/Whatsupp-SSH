const express = require("express")
const masterProcess = require("./utils/masterProcess")
const requestLogger = require("./logger/requestLogger")
const cdTracker = require("./utils/cdTracker")

const app = express()

app.use(express.json())

app.use(requestLogger)

console.log("initial Load")

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    command = req.body.command.toString()
    cdTracker()
        .then(cwd => {
            masterProcess(command, cwd)
                .then(data => res.send(data))
                .catch(err => res.send(err))
        })
        .catch(err => console.log(err))
})

app.listen(3000)