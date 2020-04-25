const client = require('twilio')
const twilio = require('./twilio')

const url = process.env.TWILIO_URL
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioWebhookValidator = (req, res, next) => {
    const twilioSignature = req.headers['x-twilio-signature']
    const params = req.body
    if (client.validateRequest(authToken, twilioSignature, url, params)) {
        next()
    } else {
        twilio("NOT AUTHORIZED!", res)
    }
}

module.exports = twilioWebhookValidator