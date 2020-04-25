const MessagingResponse = require('twilio').twiml.MessagingResponse;

const twilio = (data, res) => {
  const twiml = new MessagingResponse();
  twiml.message(data)
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString())
}

module.exports = twilio
