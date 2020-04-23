const fs = require('fs')
const path = require("path")

const cdTracker = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "..", "cdTracker.txt"), (err, data)=>{
            if (err) {
                console.log(err)
                if (err.errno == -2) {
                    fs.writeFile(path.join(__dirname, "..", "cdTracker.txt"), "", (err) => { console.log("Data written") })
                }else{reject(err)}
            }
            data = data.toString().trim()
            if (data === '') {
                fs.writeFile(path.join(__dirname, "..", "cdTracker.txt"), process.env.HOME, (err) => { console.log("Data written in cdTracker.js") })
                console.log("resolved from line 13 cdTracker")
                resolve(process.env.HOME)
            } else {
                console.log("resolved from line 16 cdTracker")
                resolve(data)
            }
        });
    })
    
}

module.exports = cdTracker