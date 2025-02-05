const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);
const AcqStatus = new AcqStatusScreen(wsManager.socket);
const AcqConfiguration = new AcqConfigurationScreen(wsManager.socket);

function main(){
    graph1 = AcqStatus.createElectrodeGraph("myChart", "Fp1", 300, -1, 1);
    AcqStatus.clearGraph(graph1);
    graph2 = AcqStatus.createElectrodeGraph("myChart2", "Fp2", 300, -1, 1);
    AcqStatus.clearGraph(graph2);
    graph3 = AcqStatus.createElectrodeGraph("myChart3", "AF7/F7", 300, -1, 1);
    AcqStatus.clearGraph(graph3);
    graph4 = AcqStatus.createElectrodeGraph("myChart4", "AF8/F8", 300, -1, 1);
    AcqStatus.clearGraph(graph4);
};

document.addEventListener("DOMContentLoaded", () => main());

const consoleUI = new ConsoleController("CONSOLE", 400, 300, 2);
consoleUI.addInfo("Mensaje de información.");
consoleUI.addWarning("Mensaje de advertencia.");
consoleUI.addError("Mensaje de error.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");
consoleUI.addSuccess("Mensaje de éxito.");