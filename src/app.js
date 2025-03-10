
function main(){
    const AcqConfiguration = new AcqConfigurationScreen(Constants.serverIP, Constants.serverPort);
    const AcqStatus = new AcqStatusScreen(Constants.serverIP, Constants.serverPort);
    socket = AcqConfiguration.socket;

    UIAcqConfiguration.btnStart.addEventListener("click", () => {
        this.socket.on("START", (data) => {
            const parsedResponse = JSON.parse(data);
            if (parsedResponse.success) {
                console.log("Data Acquisition started successfully!");
                AcqConfiguration.hide();
                AcqStatus.show();
            } else {
                console.log("Failed to start Data Acquisition");
            }
        });
    });
    
    UIAcqStatus.btnStop.addEventListener("click", () => {
        this.socket.on("STOP", (data) => {
            const parsedResponse = JSON.parse(data);
            if (parsedResponse.success) {
                AcqStatus.hide();
                AcqConfiguration.show();
                console.log("Data Acquisition stopped successfully!");
            } else {
                console.log("Failed to stop Data Acquisition");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => main());