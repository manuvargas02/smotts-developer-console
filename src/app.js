socket = Constants.socket;
socket.on("connect", () => {
    console.log("Connecting to server...");
    UI.connectionIndicator.style.backgroundColor = "#0F0"
});

socket.on("disconnect", (reason) => {
    console.log("Disconnecting from the server...")
    UI.connectionIndicator.style.backgroundColor = "#F00"
});

socket.on("bci_status", (status) => {
    console.log("BCI status: ", status);
    if (status == "on"){
        UI.bciIndicator.style.backgroundColor = "#0F0";
    } else {
        UI.bciIndicator.style.backgroundColor = "#F00";
    }
});

socket.on("wrist_status", (status) => {
    console.log("Wrist status: ", status);
    if (status == "on"){
        UI.wristIndicator.style.backgroundColor = "#0F0";
    } else {
        UI.wristIndicator.style.backgroundColor = "#F00";
    }
});

socket.on("hub_status", (status) => {
    console.log("Hub status: ", status);
    if (status == "on"){
        UI.hubIndicator.style.backgroundColor = "#0F0";
    } else {
        UI.hubIndicator.style.backgroundColor = "#F00";
    }
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