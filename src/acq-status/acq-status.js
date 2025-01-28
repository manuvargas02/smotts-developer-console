class AcqStatusScreen {
    constructor(socket) {
        this.socket = socket;
        UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
    };

    connect() {
        this.socket.on("connect", () => {
            console.log("Connecting to server...");
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#0F0";
        });
    };
    
    disconnect() {
        this.socket.on("disconnect", () => {
            console.log("Disconnecting from the server...");
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
        });
    };

    hubStatus() {
        this.socket.on("STATUS_HUB", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Hub status:", parsedData.status);
            DeviceStatus.getHubStatus(UIAcqStatus, parsedData.status);
        });
    };

    bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(UIAcqStatus, parsedData.status);
        });
    };

    wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getWristbandStatus(UIAcqStatus, parsedData.status);
        });
    };

    stop() {
        UIAcqStatus.btnStop.addEventListener("click", () => {
            console.log("Stop");
            this.socket.emit("STOP", '{"stop": true}');
            this.socket.on("STOP", (data) => {
                const parsedResponse = JSON.parse(data);
                if (parsedResponse.success) {
                    console.log(" Data Adquisition stopped successfully!");
                } else {
                    console.log(" Failed to stop Data Adquisition");
                }
            });
        });
    }
};
