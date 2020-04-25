const cdTracker = require('../validators/cdTracker')
const masterProcess = require('./masterProcess')
const twilio = require('../validators/twilio')

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