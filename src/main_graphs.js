const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);
const AcqStatus = new AcqStatusScreen(wsManager.socket);
const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);
const consoleUI = new ConsoleController("console", "CONSOLE", 800, 200, 300);

function main(){
    graph1 = new ElectrodeGraph("myChart", 300, -1, 1);
    AcqStatus.sendDataGraph(graph1, "Fp1");
    AcqStatus.clearGraph(graph1);
    graph2 = new ElectrodeGraph("myChart2", 300, -1, 1);
    AcqStatus.sendDataGraph(graph2, "Fp2");
    AcqStatus.clearGraph(graph2);
    graph3 = new ElectrodeGraph("myChart3", 300, -1, 1);
    AcqStatus.sendDataGraph(graph3, "AF7/F7");
    AcqStatus.clearGraph(graph3);
    graph4 = new ElectrodeGraph("myChart4", 300, -1, 1);
    AcqStatus.sendDataGraph(graph4, "AF8/F8");
    AcqStatus.clearGraph(graph4);
    AcqStatus.sendConsoleMessage(consoleUI);
};

document.addEventListener("DOMContentLoaded", () => main());

