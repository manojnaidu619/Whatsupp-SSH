const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, "..", "cdTracker.txt")
const homeDir = process.env.HOME

const cdTracker = () => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                fs.writeFile(filePath, homeDir, (err) => { if (err) reject(err) })
                resolve(homeDir)
                return
            }
            fs.readFile(filePath, (err, currDir) => {
                if (err) { reject(err) }
                currDir = currDir.toString().trim()
                resolve(currDir)
            });
        })
    })
    
}

module.exports = cdTracker