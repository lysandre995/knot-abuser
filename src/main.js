const express = require("express");

const KnotCommandDispatcher = require("./service/knot-command-dispatcher.service");
const KnotLoginComponent = require("./component/knot-abuser.component");
const shellCommands = require("./command/shell.commands");
const constants = require("./constants");

const app = express();
const knotCommandDispatcher = new KnotCommandDispatcher();

app.get("/", (req, res) => {
    const knotLoginComponent = new KnotLoginComponent();
    res.send(knotLoginComponent.render());
});

const controllerFn = async (namespace, commandsNameObject, req, res) => {
    const {ipAddress, username, password, meters} = req.query;
    const parsedMeters = typeof meters === "string" ? JSON.parse(meters) : meters;
    const commands = [];
    for (const command of Object.keys(commandsNameObject)) {
        const params = commandsNameObject[command];
        const shellCommand = shellCommands[namespace][params.method];
        if (parsedMeters) {
            for (const meterId of parsedMeters) {
                params.meterId = meterId;
            }
        }
        commands.push({ command, shellCommand, params });
    }
    const results = await knotCommandDispatcher.executeRemoteCommand(ipAddress, username, password, namespace, commands);
    res.send(results);
};

app.get("/knot", async (req, res) => {
    await controllerFn("knot", constants.knot, req, res);
});

app.get("/meter-register", async (req, res) => {
    await controllerFn("meterRegister", constants.meterRegister, req, res);
});

app.get("/meter-parameter", async (req, res) => {
    await controllerFn("meterParameter", constants.meterParameter, req, res);
});

app.listen(constants.port, async () => {
    await import("open").then(async (open) => await open.default(`http://localhost:${(constants.port)}`)).catch((e) => console.log(e));
    console.log(`App listening on port ${(constants.port)}`);
});
