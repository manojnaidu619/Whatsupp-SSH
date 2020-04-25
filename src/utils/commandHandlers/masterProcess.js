const exec = require('child_process').exec;
const fs = require('fs')
const path = require("path")

const filePath = path.join(__dirname, "..", "..", "trackers", "cdTracker.txt")

const masterProcess = (command, cwd) => {
    if (command.startsWith('cd')){
        return new Promise((resolve, reject) => {
            exec(`${command} && pwd`, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    reject(`❗️${stderr}`);
                    return
                }
                fs.writeFile(filePath, stdout, (err) => {if(err) reject(err)})
                resolve(`🗂 : ${stdout}`)
            })
        })
    } else {
        return new Promise((resolve, reject)=> {
            exec(command.toString(), {cwd}, (error, stdout, stderr) => {
                if (error) {
                    reject(`❗️${stderr} Error code : ${error.code}`)
                    return
                }
                if (stdout === '') resolve(`✅ (${command}) executed successfully`)
                resolve(stdout)
            });
        })
    }
}

module.exports = masterProcess
