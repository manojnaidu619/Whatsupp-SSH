const cdTracker = require('./cdTracker')
const masterProcess = require('./masterProcess')
const twilio = require('./twilio')

const systemCommandExecutor = async (command, res) => {
    try {
        const cwd = await cdTracker()
        const data = await masterProcess(command, cwd)
        twilio(data, res)
    }
    catch (err) {
        twilio(err, res)
    }
} 

module.exports = systemCommandExecutor