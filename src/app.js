const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);


function main(){
    const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);
};

document.addEventListener("DOMContentLoaded", () => main());