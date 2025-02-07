const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);


function main(){
    const AcqStatus = new AcqStatusScreen(wsManager.socket);
    const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);
};

document.addEventListener("DOMContentLoaded", () => main());