const parsingCommands = require("../command/parsing.commands")
const Ssh = require("ssh2-promise");

class KnotCommandDispatcherService {
    async executeRemoteCommand(ipAddress, username, password, namespace, commands) {
        const outputData = {};
        const ssh = new Ssh({
            host: ipAddress,
            port: 22,
            username,
            password
        });
        ssh.connect();
        console.log("Connected via SSH");

        const dataBufferPromises = [];
        const dataTags = [];
        const dataParsers = [];
        for (const c of commands) {
            const shellCommandParsed = this.parseShellCommand(c.shellCommand, c.params);
            dataBufferPromises.push(ssh.exec(shellCommandParsed));
            dataTags.push(c.params.name);
            dataParsers.push(parsingCommands[namespace][c.params.method]);
            console.log(`Command for ${c.params.name} processed`);
        }

        (await Promise.all(dataBufferPromises))
            .forEach((data, index) => {
                outputData[dataTags[index]] = (dataParsers[index](data))
            });

        await ssh.close()
        console.log("SSH Disconnected");

        return outputData;
    }

    parseShellCommand(shellCommand, params) {
        return shellCommand.replace(/%(\w+)%/g, (match, key) => {
            switch (key) {
                case "meterId":
                    return params[key];
                case "startAddress":
                case "numberOfRegisters":
                    let hex = params[key].toString(16);
                    while (hex.length < 4) {
                        hex = "0" + hex;
                    }
                    return hex;
                default:
                    return params[key] || match;
            }
        });
    }
}

module.exports = KnotCommandDispatcherService;
