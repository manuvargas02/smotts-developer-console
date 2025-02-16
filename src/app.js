const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);

function main(){
    const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);
    const AcqStatus = new AcqStatusScreen(wsManager.socket);

    UIAcqConfiguration.btnStart.addEventListener("click", () => {
        AcqConfiguration.hide();
        AcqStatus.show();
    });

    UIAcqStatus.btnStop.addEventListener("click", () => {
        AcqStatus.hide();
        AcqConfiguration.show();
    });
};

document.addEventListener("DOMContentLoaded", () => main());