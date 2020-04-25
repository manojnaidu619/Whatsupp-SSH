const fs = require('fs')
const path = require('path')
const twilio = require('./twilio')

const authTime = 300000             // in milliseconds (5 minutes by default)
const filePath = path.join(__dirname, "..", "..", "trackers", "authTime.txt")
const sshPassword = process.env.SSH_PSWD.toString().trim()
global.initialLogin = false

const writeDataToFile = (data, res) => {
    fs.writeFileSync(filePath, data, (err) => { if (err) twilio(err, res) })
}

const twilioHandler = () => {
    new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                initialLogin = true
                writeDataToFile(Date.now(), res)
            }
            resolve(null)
        })
    })
}

const authValidator = async (req, res, next) => {
    const reqData = req.body.Body
    try{
        await twilioHandler(res)
        fs.readFile(filePath, (err, data) => { 
            const lastAuthTime = parseInt(data.toString().trim())
            const currTime = Date.now() - lastAuthTime
            if (currTime > authTime || initialLogin) {
                if (reqData != sshPassword) {
                    twilio("Please authenticate... 🔐", res)
                    return
                }
                writeDataToFile(Date.now(), res)
                initialLogin = false
                twilio("Authenticated! 🔓", res)
            } else {
                next()
            }
        })
    } catch (err) {
        twilio(err, res)
    }
    
}

module.exports = authValidator
