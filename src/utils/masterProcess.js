const exec = require('child_process').exec;

const masterProcess = (command, cwd) => {
    if (command.startsWith('cd')){
        return new Promise((resolve, reject) => {
            exec(`${command} && pwd`, { cwd }, (error, stdout, stderr) => {
                if (error) { reject(error); return }
                cwd = stdout
                resolve(stdout)
            })
        })
    } else {
        return new Promise((resolve, reject)=> {
            exec(command, {cwd}, (error, stdout, stderr) => {
                if (error) { reject(error) }
                resolve(stdout)
            });
        })
    }
}

module.exports = masterProcess
