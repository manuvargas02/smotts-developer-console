
function main(){
    const AcqConfiguration = new AcqConfigurationScreen(Constants.serverIP, Constants.serverPort);
    const AcqStatus = new AcqStatusScreen(Constants.serverIP, Constants.serverPort);
    socket = AcqConfiguration.socket;

    this.socket.on("START", (data) => {
        const parsedResponse = JSON.parse(data);
        if (parsedResponse.success) {
            AcqConfiguration.console.addSuccess("Data Acquisition started successfully");
            console.log("Data Acquisition started successfully");
            AcqConfiguration.hide();
            AcqStatus.show();
        } else {
            AcqConfiguration.console.addError("Failed to start Data Acquisition");
            console.log("Failed to start Data Acquisition");
        }
    });
    
    this.socket.on("STOP", (data) => {
        const parsedResponse = JSON.parse(data);
        if (parsedResponse.success) {
            AcqStatus.hide();
            AcqConfiguration.show();
            AcqStatus.console.addSuccess("Data Acquisition stopped successfully");
            console.log("Data Acquisition stopped successfully");
        } else {
            console.log("Failed to stop Data Acquisition");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => main());