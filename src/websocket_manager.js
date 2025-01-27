class WebSocketManager {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.socket = io.connect(`http://${this.ip}:${this.port}`);
    };

    connect() {
        this.socket.on("connect", () => {
            console.log("Connecting to server...");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#0F0";
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#0F0";
        });
    };

    disconnect() {
        this.socket.on("disconnect", (reason) => {
            console.log("Disconnecting from the server...");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
        });
    }

    hubStatus() {
        this.socket.on("STATUS_HUB", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Hub status:", parsedData.status);
            DeviceStatus.getHubStatus(parsedData.status);
        });
    }

    bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(parsedData.status);
        });
    }

    wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getWristbandStatus(parsedData.status);
        });
    }
}
