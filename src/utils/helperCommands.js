const twilio = require('./twilio')
const path = require('path')
const fs = require('fs')
const os = require('os')

const helpercommands = (command, res) => {
    switch (command) {
        
        case 'ssh-help':
            const helpData = "history -> gives you the request info \n" + 
                         "status -> gives you the system status \n"
            twilio(helpData, res)
            break
        
        case 'history':
            new Promise((resolve, reject) => {
                fs.readFile(path.join(__dirname, "..", "..", "logs", "requestLogs.log"), (err, data) => {
                    if (err) {reject(err)}
                    resolve(data.toString())
                })
            })
                .then((data) => twilio(data, res))
                .catch(err => {
                    if (err.errno == -2) { twilio("ERROR : File doesn't exist", res) }
                    else{ twilio(err,res)}
                })
            break
        
        case 'stats':
            const data = `platform : ${os.platform()} ${os.arch()} \n` +
                `userInfo : ${JSON.stringify(os.userInfo())} \n` +
                `total memory : ${os.totalmem()}(in bytes) \n` +
                `free memory : ${os.freemem()}(in bytes) \n` +
                `uptime : ${os.uptime()}(in seconds) \n` +
                `CPUs : ${JSON.stringify(os.cpus())} \n`
            twilio(data, res)
            break
        
        default: return true
    }
}

module.exports = helpercommands