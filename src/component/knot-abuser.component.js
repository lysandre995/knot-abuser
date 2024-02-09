const constants = require("../constants")

class KnotAbuserComponent {
    render() {
        return `
        <!DOCTYPE html>
        <html lang="en-US">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Knot Abuser</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container mt-5">
                    <h2 class="mb-4">Knot Abuser</h2>
        
                    <form>
                        <div class="form-group">
                            <label for="ipAddress">IP Address:</label>
                            <input type="text" class="form-control" id="ipAddress" placeholder="Enter IP Address">
                        </div>
        
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter Username">
                        </div>
        
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter Password">
                        </div>
        
                        <div class="form-group">
                            <label for="meter">Meter Ids:</label>
                            <input type="text" class="form-control" id="meter" placeholder="Enter meter slave ids separated by commas">
                        </div>
        
                        <button type="button" class="btn btn-primary" onclick="connectToKnot()">Connect</button>
                    </form>
                </div>
        
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                <script>
                    const connectToKnot = async () => {
                        const ipAddress = document.getElementById("ipAddress").value;
                        const username = document.getElementById("username").value;
                        const password = document.getElementById("password").value;
                        const meters = document.getElementById("meter").value.split(",");
                        
                        const oldElement = document.getElementById("display-knot-information");
                        if (oldElement) {
                            oldElement.remove();
                        }
                        
                        const newElement = document.createElement("div");                        
                        newElement.innerHTML = createHtmlFromData(await collectData(ipAddress, username, password, meters));
                        newElement.id = "display-knot-information";
                        document.body.appendChild(newElement);
                    }
                    
                    const createHtmlFromData = (data) => {
                        let html = "";
                        for (const category of Object.keys(data)) {
                            const title = (() => {
                                switch(category) {
                                    case "knotData":
                                        return "Knot Info";
                                    case "meterRegisterData":
                                        return "Meter Registers";
                                    case "meterParameterData":
                                        return "Meter Parameters";
                                    default:
                                        return "Field Invalid";
                                }
                            })();
                            const tableRecords = Object.keys(data[category])
                                .map(registerName => \`
                                    <tr>
                                        <td>\${registerName}</td>
                                        <td>\${data[category][registerName]}</td>
                                    </tr>
                                \`).join("\\n");
                            html += \`
                                <div class="container mt-5">
                                  <h2 class="mb-4">\${title}</h2>
                                  <table class="table">
                                    <tbody>
                                        \${tableRecords}
                                    </tbody>
                                  </table>
                                </div>
                            \`;
                        }
                        return html;
                    };

                    const collectData = async (ipAddress, username, password, meters) => {
                        const queryParamsWithoutMeters = "?ipAddress=" + ipAddress + "&username=" + username + "&password=" + password;
                        const queryParamsWithMeters = queryParamsWithoutMeters + "&meters=" + JSON.stringify(meters);
                        const socket = "http://localhost:" + "` + constants.port + `";
                        const knotData = await (await fetch(socket + "/knot" + queryParamsWithoutMeters)).json();
                        const meterRegisterData = await (await fetch(socket + "/meter-register" + queryParamsWithMeters)).json();
                        const meterParameterData = await (await fetch(socket + "/meter-parameter" + queryParamsWithMeters)).json();
                        return { knotData, meterRegisterData, meterParameterData }
                    };
                </script>
            </body>
        </html>
        `
    }
}

module.exports = KnotAbuserComponent;
