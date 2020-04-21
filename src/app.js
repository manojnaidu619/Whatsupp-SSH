const express = require("express")
const masterProcess = require("./utils/masterProcess")
const requestLogger = require("./logger/requestLogger")
const cdTracker = require("./utils/cdTracker")

const app = express()

app.use(express.json())

app.use(requestLogger)

//global.cwd = '/Users/manojnaidu619/Desktop'
console.log("initial Load")

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    command = req.body.command.toString()
    cdTracker()
        .then(cwd => {
            masterProcess(command, cwd)
                .then(data => res.send(data))
                .catch(err => res.send(err))
                    //.catch(err => {res.send(`'${err.cmd}' is not a valid command. error code : ${err.code}`)})

        })
        .catch(err => console.log(err))
})

app.listen(3000)