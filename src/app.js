const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);
const AcqStatus = new AcqStatusScreen(wsManager.socket);
const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);

//Call the methods of the Acq Status Screen
AcqStatus.connect();
AcqStatus.disconnect();
AcqStatus.hubStatus();
AcqStatus.bciStatus();
AcqStatus.wristbandStatus();

//Call the methods of the Acq Configuration Screen
AcqConfiguration.connect();
AcqConfiguration.disconnect();
AcqConfiguration.hubStatus();
AcqConfiguration.bciStatus();
AcqConfiguration.wristbandStatus();



function main(){
    AcqStatus.stop();
    AcqConfiguration.setBciConfiguration();
    AcqConfiguration.getBciConfiguration();
};

document.addEventListener("DOMContentLoaded", () => main());