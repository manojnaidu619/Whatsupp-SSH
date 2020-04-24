const fs = require('fs')
const path = require('path')
const twilio = require('./twilio')

const authTime = 600000             // in milliseconds
const filePath = path.join(__dirname, "..", "authTime.txt")
const sshPassword = process.env.SSH_PSWD.toString().trim()
global.initialLogin = true

const writeDataToFile = (data, res) => {
    fs.writeFile(filePath, data, (err) => { if (err) twilio(err, res) })
}

const authValidator = (req, res, next) => {
    const reqData = req.body.Body
    new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                writeDataToFile(Date.now(), res)
            }
            resolve(null)
        })
    }).then(() => { 
        fs.readFile(filePath, (err, data) => { 
            const lastAuthTime = parseInt(data.toString().trim())
            const currTime = (Date.now() - lastAuthTime)
            if (currTime > authTime || initialLogin) {
                if (reqData != sshPassword) {
                    twilio("Please authenticate 🔐", res)
                    return
                }
                writeDataToFile(Date.now(), res)
                initialLogin = false
                twilio("Authenticated! 🔓", res)
            } else {
                next()
            }
        })
    })
}

module.exports = authValidator