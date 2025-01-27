socket = Constants.socket;
socket.on("connect", () => {
    console.log("Connecting to server...");
    UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#0F0"
    UIAcqStatus.connectionIndicator.style.backgroundColor = "#0F0"
});

socket.on("disconnect", (reason) => {
    console.log("Disconnecting from the server...")
    UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00"
    UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00"
});

socket.on("STATUS_HUB", (data) => {
    const parsedData = JSON.parse(data);
    console.log("Hub status:", parsedData.status);
    DeviceStatus.getHubStatus(parsedData.status);
});

socket.on("STATUS_BCI", (data) => {
    const parsedData = JSON.parse(data); 
    console.log("BCI status:", parsedData.status);
    DeviceStatus.getBciStatus(parsedData.status);
});

socket.on("STATUS_WRISTBAND", (data) => {
    const parsedData = JSON.parse(data);
    console.log("Wristband status:", parsedData.status);
    DeviceStatus.getWristbandStatus(parsedData.status);
});



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