socket = Constants.socket;
socket.on("connect", () => {
    console.log("Connecting to server...");
    UI.connectionIndicator.style.backgroundColor = "#0F0"
});

socket.on("disconnect", (reason) => {
    console.log("Disconnecting from the server...")
    UI.connectionIndicator.style.backgroundColor = "#F00"
});

socket.on("caschetto_status", (status) => {
    console.log("Caschetto status: ", status);
    if (status == "on"){
        UI.caschettoIndicator.style.backgroundColor = "#0F0";
    } else {
        UI.caschettoIndicator.style.backgroundColor = "#F00";
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
    UI.btnStart.addEventListener("click", ()=>{
        console.log("Start");
        socket.emit("app_data_handler", {"operation": "START_DATA_ACQ"});
    });
    
    UI.btnStop.addEventListener("click", ()=>{
        console.log("Stop");
        socket.emit("app_data_handler", {"operation": "STOP_DATA_ACQ"});
    });
};

document.addEventListener("DOMContentLoaded", () => main());
