const twilio = require('./twilio')
const path = require('path')
const fs = require('fs')

const helpercommands = (command, res) => {
    // const helpercmds = ["help", "history", "status"]
    switch (command) {
        case 'help':
            const data = "history -> gives you the request info \n" + 
                         "status -> gives you the system status \n"
            twilio(data, res)
            break
        
        case 'history':
            fs.readFile(path.join(__dirname, "..", "..", "logs", "requestLogs.log"), (err, data) => {
                if (err) { twilio(err, res); return }
                twilio(data.toString(), res)
            })

    }
}

module.exports = helpercommands