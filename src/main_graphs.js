const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);
const AcqStatus = new AcqStatusScreen(wsManager.socket);
const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);
const consoleUI = new ConsoleController("console", "CONSOLE", 800, 200, 300);

function main(){
    graph1 = AcqStatus.createElectrodeGraph("myChart", "Fp1", 300, -1, 1);
    AcqStatus.clearGraph(graph1);
    graph2 = AcqStatus.createElectrodeGraph("myChart2", "Fp2", 300, -1, 1);
    AcqStatus.clearGraph(graph2);
    graph3 = AcqStatus.createElectrodeGraph("myChart3", "AF7/F7", 300, -1, 1);
    AcqStatus.clearGraph(graph3);
    graph4 = AcqStatus.createElectrodeGraph("myChart4", "AF8/F8", 300, -1, 1);
    AcqStatus.clearGraph(graph4);
    AcqStatus.sendConsoleMessage(consoleUI);
};

document.addEventListener("DOMContentLoaded", () => main());

