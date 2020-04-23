const twilio = require('./twilio')
const path = require('path')
const fs = require('fs')
const os = require('os')

const helpercommands = (command, res) => {
    switch (command) {

        case 'ssh-help':
            const helpData = "ssh-history -> gives you the request info \n" + 
                "ssh-status -> gives you the system status \n" +
                "ssh-reset -> stuck in trouble?, reset SSH cwd. (Doesn't affect prior executed commands) \n"
            twilio(helpData, res)
            break
        
        case 'ssh-history':
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
        
        case 'ssh-status':
            const data = `platform : ${os.platform()} ${os.arch()} \n` +
                `userInfo : ${JSON.stringify(os.userInfo())} \n` +
                `total memory : ${os.totalmem()}(in bytes) \n` +
                `free memory : ${os.freemem()}(in bytes) \n` +
                `uptime : ${os.uptime()}(in seconds) \n` +
                `CPUs : ${JSON.stringify(os.cpus())} \n`
            twilio(data, res)
            break
        
        case 'ssh-reset':
            fs.writeFile(path.join(__dirname, "..", "cdTracker.txt"), '', () => twilio('Done!', res))
            break
        
        default: return true
    }
}

module.exports = helpercommands