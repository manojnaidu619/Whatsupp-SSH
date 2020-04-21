const exec = require('child_process').exec;
const fs = require('fs')
const path = require("path")

const masterProcess = (command, cwd) => {
    console.log("(line 6 masterprocess)current working dir : ", cwd, command)
    if (command.startsWith('cd')){
        return new Promise((resolve, reject) => {
            exec(`${command} && pwd`, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    console.log("from line 11")
                    reject(`ERROR -> ${stderr}`);
                    return
                }
                console.log("from line 16 masterprocess")
                fs.writeFile(path.join(__dirname, "..", "cdTracker.txt"), stdout, (err) => {console.log("Data written from masterprocess!")})
                resolve(`current directory : ${stdout}`)
            })
        })
    } else {
        return new Promise((resolve, reject)=> {
            exec(command.toString(), {cwd}, (error, stdout, stderr) => {
                if (error) {
                    console.log("from line 25 masterprocess")
                    reject(`ERROR -> something wrong with command (${error.cmd}) \n Error code : ${error.code}`)
                    return
                }
                console.log("from line 30 masterprocess")
                resolve(stdout)
            });
        })
    }
}

module.exports = masterProcess
