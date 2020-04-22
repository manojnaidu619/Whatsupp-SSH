const express = require("express")
const bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const masterProcess = require("./utils/masterProcess")
const requestLogger = require("./logger/requestLogger")
const cdTracker = require("./utils/cdTracker")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(requestLogger)
console.log("initial Load")

// Listening for requests in /SMSsh
app.post('/SMSsh', (req, res) => { 
    const twiml = new MessagingResponse();
    command = req.body.Body.toString()
    cdTracker()
        .then(cwd => {
            masterProcess(command, cwd)
                .then(data => {
                    twiml.message(data)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                })
                .catch(err => {
                    twiml.message(err)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                })
        })
        .catch(err => {
            twiml.message(err)
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        })
})

app.listen(3000)