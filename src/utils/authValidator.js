const fs = require('fs')
const path = require('path')
const twilio = require('./twilio')
const authTime = 60000             // in milliseconds

const authValidator = (req, res, next) => {
    const reqData = req.body.Body
    const sshPassword = process.env.SSH_PSWD.toString().trim()
    new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "..", "authTime.txt"), (err, data) => {
            if (err && err.errno == -2) {
                fs.writeFileSync(path.join(__dirname, "..", "authTime.txt"), Date.now(), (err) => { if (err) reject(err) })
            }
            resolve(parseInt(data.toString().trim()))
        })
    }).then(lastAuthTime => {
        if ((Date.now() - lastAuthTime) > authTime) {
            if (reqData != sshPassword) {
                twilio("Please authenticate...", res); return
            }
            fs.writeFileSync(path.join(__dirname, "..", "authTime.txt"), Date.now(), (err) => { if (err) reject(err) })
            twilio("Authenticated!", res)
        } else {
            next()
        }
    }).catch(err => console.log(err))
}

module.exports = authValidator