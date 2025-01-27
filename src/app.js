const wsManager = new WebSocketManager(Constants.serverIP, Constants.serverPort);

wsManager.connect();
wsManager.disconnect();
wsManager.hubStatus();
wsManager.bciStatus();
wsManager.wristbandStatus();



function main(){
    UI.connectionIndicator.style.backgroundColor = "#F00"
    UI.btnStart.addEventListener("click", () => {
        console.log("Start");
        socket.emit("START", {});  
    });

    UI.btnStop.addEventListener("click", () => {
        console.log("Stop");
        socket.emit("STOP", {});  
    });

    UI.btnTestBci.addEventListener("click", () => { 
        console.log("Test BCI");
        socket.emit("TEST_BCI_ELECTRODES", {});
    });

};

document.addEventListener("DOMContentLoaded", () => main());