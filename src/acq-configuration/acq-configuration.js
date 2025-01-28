class AcqConfigurationScreen {
    constructor(socket) {
        this.socket = socket;
        UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
    };

    connect() {
        this.socket.on("connect", () => {
            console.log("Connecting to server...");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#0F0";
        });
    };
    
    disconnect() {
        this.socket.on("disconnect", () => {
            console.log("Disconnecting from the server...");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
        });
    };

    hubStatus() {
        this.socket.on("STATUS_HUB", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Hub status:", parsedData.status);
            DeviceStatus.getHubStatus(UIAcqConfiguration, parsedData.status);
        });
    };

    bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(UIAcqConfiguration, parsedData.status);
        });
    };

    wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getWristbandStatus(UIAcqConfiguration, parsedData.status);
        });
    };

    start() {
        UIAcqConfiguration.btnStop.addEventListener("click", () => {
            console.log("Start");
            this.socket.emit("START", {});  
        });
    };

    setBciConfiguration() {
        UIAcqConfiguration.sendBciConfig.addEventListener("click", () => {
            console.log("Setting BCI configuration...");
            const config = ConfigPanel.setConfig("bci");
            console.log(config);
            this.socket.emit("BCI_ACQ_CONFIG", JSON.stringify(config));
            this.socket.on("BCI_ACQ_CONFIG", (response) => {
                const parsedResponse = JSON.parse(response);
                
                if (parsedResponse.success) {
                    console.log("BCI Configuration set successfully!");
                } else {
                    console.log("Failed to set BCI Configuration.");
                }
            });
        });
    };

    setWristbandConfiguration() {
        UIAcqConfiguration.sendWristbandConfig.addEventListener("click", () => {
            console.log("Setting Wristband configuration...");
            const config = ConfigPanel.setConfig("wristband");
            this.socket.emit("WRISTBAND_ACQ_CONFIG", JSON.stringify(config));
            this.socket.on("WRISTBAND_ACQ_CONFIG", (response) => {
                const parsedResponse = JSON.parse(response);
                
                if (parsedResponse.success) {
                    console.log("Wristband Configuration set successfully!");
                } else {
                    console.log("Failed to set Wristband Configuration.");
                }
            });
        });
    };

};
