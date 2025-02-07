class AcqConfigurationScreen {
    constructor(socket) {
        this.socket = socket;
        //UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
        this._connect();
        this._disconnect();
        this._hubStatus();
        this._bciStatus();
        this._wristbandStatus();
        this._start();
        this._setBciConfiguration();
        this._getBciConfiguration();
        this._setWristbandConfiguration();
        this._getWristbandConfiguration();
        this._testBciElectrodes();
        this._testWristbandElectrodes();
    }

    _connect() {
        this.socket.on("connect", () => {
            console.log("Connected to server");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#0F0";
        });
    }
    
    _disconnect() {
        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server");
            UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
        });
    }

    _hubStatus() {
        this.socket.on("STATUS_HUB", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Hub status:", parsedData.status);
            DeviceStatus.getHubStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getWristbandStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _start() {
        UIAcqConfiguration.btnStart.addEventListener("click", () => {
            this.socket.emit("START", '{"start": true}');
            this.socket.on("START", (data) => {
                const parsedResponse = JSON.parse(data);
                if (parsedResponse.success) {
                    console.log("Data Acquisition started successfully!");
                } else {
                    console.log("Failed to start Data Acquisition");
                }
            });
        });
    }

    _setBciConfiguration() {
        UIAcqConfiguration.btnSendBciConfig.addEventListener("click", () => {
            console.log("Setting BCI configuration...");
            const config = ConfigPanel.setConfig("bci");
            console.log(config);
            this.socket.emit("BCI_ACQ_CONFIG", JSON.stringify(config));
        });
    }

    _getBciConfiguration() {
        UIAcqConfiguration.btnGetBciConfig.addEventListener("click", () => {
            console.log("Getting BCI configuration...");
            this.socket.emit("BCI_ACQ_CONFIG", JSON.stringify({ operation: "get_config" }));
        });
        this.socket.on("BCI_ACQ_CONFIG", (response) => {
            const parsedResponse = JSON.parse(response);
            console.log(parsedResponse);    
            if (parsedResponse.operation === "get_config") {
                ConfigPanel.getConfig("bci", parsedResponse.data);
            } 
            else if (parsedResponse.operation === "set_config") {
                if (parsedResponse.success) {
                    console.log("BCI Configuration set successfully!");
                } else {
                    console.log("Failed to set BCI Configuration.");
                }
            }
        });
    }

    _setWristbandConfiguration() {
        UIAcqConfiguration.btnSendWristbandConfig.addEventListener("click", () => {
            console.log("Setting Wristband configuration...");
            const config = ConfigPanel.setConfig("wristband");
            console.log(config);
            this.socket.emit("WRISTBAND_ACQ_CONFIG", JSON.stringify(config));
        });
    }

    _getWristbandConfiguration() {
        UIAcqConfiguration.btnGetWristbandConfig.addEventListener("click", () => {
            console.log("Getting Wristband configuration...");
            this.socket.emit("WRISTBAND_ACQ_CONFIG", JSON.stringify({ operation: "get_config" }));
        });
        this.socket.on("WRISTBAND_ACQ_CONFIG", (response) => {
            const parsedResponse = JSON.parse(response);
            console.log(parsedResponse);    
            if (parsedResponse.operation === "get_config") {
                ConfigPanel.getConfig("wristband", parsedResponse.data);
            } 
            else if (parsedResponse.operation === "set_config") {
                if (parsedResponse.success) {
                    console.log("Wristband Configuration set successfully!");
                } else {
                    console.log("Failed to set Wristband Configuration.");
                }
            }
        });
    }

    _testBciElectrodes() {
        UIAcqConfiguration.btnTestBci.addEventListener("click", () => {
            console.log("Testing BCI electrodes...");
            this.socket.emit("TEST_BCI_ELECTRODES", '{"test": true}');
        });
        this.socket.on("BCI_ELECTRODES_STATUS", (data) => {
            const parsedResponse = JSON.parse(data);
            if (parsedResponse.status_ok) {
                console.log("BCI electrodes tested successfully!");
                ConfigPanel.testElectrodes("Bci", parsedResponse.electrodes_status);
            } else {
                console.log("Failed to test BCI electrodes.");
            }
        });
    }

    _testWristbandElectrodes() {
        UIAcqConfiguration.btnTestWristband.addEventListener("click", () => {
            console.log("Testing Wristband electrodes...");
            this.socket.emit("TEST_WRISTBAND_ELECTRODES", '{"test": true}');
        });
        this.socket.on("WRISTBAND_ELECTRODES_STATUS", (data) => {
            const parsedResponse = JSON.parse(data);
            if (parsedResponse.status_ok) {
                console.log("Wristband electrodes tested successfully!");
                ConfigPanel.testElectrodes("Wristband", parsedResponse.electrodes_status);
            } else {
                console.log("Failed to test Wristband electrodes.");
            }
        });
    }
}
