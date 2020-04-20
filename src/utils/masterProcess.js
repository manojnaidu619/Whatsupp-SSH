const exec = require('child_process').exec;

const masterProcess = (command, cwd) => {
    return new Promise((resolve, reject)=> {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) { reject(error) }
            resolve(stdout)
        });
    })
}

module.exports = masterProcess