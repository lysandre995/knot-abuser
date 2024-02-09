# Knot Abuser
Knot Abuser is a tool for SSH access and command execution on routers that support RouterOS.

The tool can be easily customized.

The program is rough draft and serves more as an example, it's uncertain whether it will be further improved and optimized.
## Usage
The program currently is a simple application using NodeJS and express. Just download the source, install node packages.
```shell
npm install
```
and run it hitting
```shell
npm run start
```
This should open a tab in your browser for the graphic interface. Just insert the requested data and click `Connect`.

The operations currently performed by the tool involve executing simple queries to retrieve parameters from the router or any connected Modbus device. The `Meter Ids` field corresponds to the slave ids of each meter; you can list multiple slave ids, separating each one with a comma.

You can enhance the functionality by adding commands in the files *command/shell.commands.js*, *command/parsing.commands.js*, and *src/constants.js*. The first two files respectively specify the command to be executed in the router's SSH terminal (configurable via the pattern "%%" as explained below) and the procedure for parsing the resulting string. The last file outlines, for each namespace command (note that all commands are grouped under a namespace), the associated commands, the method to use, the name of the retrieved property, and, optionally, the startAddress and numberOfRegisters in case the property is located within one of the meter registers.

## String parameterization
For example having a string in the file *shell.commands.js*

```javascript
module.exports = {
    knot: {
        greetFriend: "echo hello %name%"
    }
}
```
and a corresponding structure in the *constants.js* file:
```javascript
module.exports = {
    knot: {
        greetFriend: {
            name: "Frank",
            method: "greetFriend"
        }
    }
}
```
Will be parsed to `"echo hello Frank"` and executed on the router, returning `"hello Frank"`.
