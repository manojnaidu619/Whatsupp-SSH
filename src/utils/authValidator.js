const fs = require('fs')
const path = require('path')
const twilio = require('./twilio')
const process = require('process')

const authValidator = (req, res, next) => {
    console.log("hello from authvalidator")
    //twilio("Please authenticate!", res)
    new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "..", "authTime.txt"), (err, data) => {
            if (err && err.errno == -2) {
                console.log("inside line 12")
                fs.writeFile(path.join(__dirname, "..", "authTime.txt"), Date.now(), (err) => { "AuthTime written in authvalidator - 1" })
                resolve("Please authenticate...")
            } else { 
                data = parseInt(data.toString().trim())
                console.log("inside line 17")
                if ((parseInt(Date.now()) - data) > 60000 && req.body.Body !== process.env.SSH_PSWD.toString().trim()) {
                    console.log("From line 19")
                    resolve("Please authenticate! line 20")
                } else if ((parseInt(Date.now()) - data) > 60000 && req.body.Body === process.env.SSH_PSWD.toString().trim()) {
                    fs.writeFile(path.join(__dirname, "..", "authTime.txt"), Date.now(), (err) => { "AuthTime written in authvalidator - 2" })
                    resolve("Authenticated!")
                } 
             }
        })
    })
        .then(data => twilio(data,res))
        .catch(err => twilio(err, res))
    next()
}

module.exports = authValidator