const fs = require('fs')
const path = require("path")

const requestLogger = (req, res, next) => {
    let date_ob = new Date();
    console.log("req logger")

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // date & time in YYYY-MM-DD HH:MM:SS format
    let currDate = year + "-" + month + "-" + date
    let currTime = hours + ":" + minutes + ":" + seconds 

    // Appending command with timestamp to file
    fs.appendFile(path.join(__dirname, "..", "..", "logs", "requestLogs.log").toString(),
        `\n ${req.body.Body} - ${currDate}(${currTime})`,
        (err) => { })
    
    next()
}

module.exports = requestLogger