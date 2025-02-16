class AcqConfigurationScreen {
    constructor(socket) {
        this.socket = socket;
        // UIAcqConfiguration.connectionIndicator.style.backgroundColor = "#F00";
        this._connect();
        this._disconnect();
        //this._hubStatus();
        this._bciStatus();
        this._emgStatus();
        this._start();
        this._setBciConfiguration();
        this._getBciConfiguration();
        this._testBciElectrodes();
        this._sendConsoleMessage();
    }

    destructor() {
        this.socket.off("connect");
        this.socket.off("disconnect");
        this.socket.off("STATUS_HUB");
        this.socket.off("STATUS_BCI");
        this.socket.off("STATUS_WRISTBAND");
        this.socket.off("START");
        this.socket.off("BCI_ACQ_CONFIG");
        this.socket.off("WRISTBAND_ACQ_CONFIG");
        this.socket.off("BCI_ELECTRODES_STATUS");
        this.socket.off("WRISTBAND_ELECTRODES_STATUS");

        UIAcqConfiguration.btnStart.removeEventListener("click", this._startListener);
        UIAcqConfiguration.btnSendBciConfig.removeEventListener("click", this._setBciConfigListener);
        UIAcqConfiguration.btnGetBciConfig.removeEventListener("click", this._getBciConfigListener);
        UIAcqConfiguration.btnSendWristbandConfig.removeEventListener("click", this._setWristbandConfigListener);
        UIAcqConfiguration.btnGetWristbandConfig.removeEventListener("click", this._getWristbandConfigListener);
        UIAcqConfiguration.btnTestBci.removeEventListener("click", this._testBciElectrodesListener);
        UIAcqConfiguration.btnTestWristband.removeEventListener("click", this._testWristbandElectrodesListener);

        this.socket = null;
    }

    show() {
        UIAcqConfiguration.idScreen.style.display = "block";
    }

    hide() {
        UIAcqConfiguration.idScreen.style.display = "none";
    }

    _connect() {
        this.socket.on("connect", () => {
            console.log("Connected to server");
        });
    }

    _disconnect() {
        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server");
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

    _emgStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getEmgStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _start() {
        this._startListener = () => {
            this.socket.emit("START", '{"start": true}');
            this.socket.on("START", (data) => {
                const parsedResponse = JSON.parse(data);
                console.log(parsedResponse.success ? "Data Acquisition started successfully!" : "Failed to start Data Acquisition");
            });
        };
        UIAcqConfiguration.btnStart.addEventListener("click", this._startListener);
    }

    _setBciConfiguration() {
        this._setBciConfigListener = () => {
            console.log("Setting BCI configuration...");
            const config = ConfigPanel.setConfig("bci");
            console.log(config);
            this.socket.emit("BCI_ACQ_CONFIG", JSON.stringify(config));
        };
        UIAcqConfiguration.btnSendBciConfig.addEventListener("click", this._setBciConfigListener);
    }

    _getBciConfiguration() {
        this._getBciConfigListener = () => {
            console.log("Getting BCI configuration...");
            this.socket.emit("BCI_ACQ_CONFIG", JSON.stringify({ operation: "get_config" }));
        };
        UIAcqConfiguration.btnGetBciConfig.addEventListener("click", this._getBciConfigListener);

        this.socket.on("BCI_ACQ_CONFIG", (response) => {
            const parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse.operation === "get_config") {
                ConfigPanel.getConfig("bci", parsedResponse.data);
            } else if (parsedResponse.operation === "set_config") {
                console.log(parsedResponse.success ? "BCI Configuration set successfully!" : "Failed to set BCI Configuration.");
            }
        });
    }

    _setWristbandConfiguration() {
        this._setWristbandConfigListener = () => {
            console.log("Setting Wristband configuration...");
            const config = ConfigPanel.setConfig("wristband");
            console.log(config);
            this.socket.emit("WRISTBAND_ACQ_CONFIG", JSON.stringify(config));
        };
        UIAcqConfiguration.btnSendWristbandConfig.addEventListener("click", this._setWristbandConfigListener);
    }

    _getWristbandConfiguration() {
        this._getWristbandConfigListener = () => {
            console.log("Getting Wristband configuration...");
            this.socket.emit("WRISTBAND_ACQ_CONFIG", JSON.stringify({ operation: "get_config" }));
        };
        UIAcqConfiguration.btnGetWristbandConfig.addEventListener("click", this._getWristbandConfigListener);

        this.socket.on("WRISTBAND_ACQ_CONFIG", (response) => {
            const parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse.operation === "get_config") {
                ConfigPanel.getConfig("wristband", parsedResponse.data);
            } else if (parsedResponse.operation === "set_config") {
                console.log(parsedResponse.success ? "Wristband Configuration set successfully!" : "Failed to set Wristband Configuration.");
            }
        });
    }

    _testBciElectrodes() {
        this._testBciElectrodesListener = () => {
            console.log("Testing BCI electrodes...");
            this.socket.emit("TEST_BCI_ELECTRODES", '{"test": true}');
        };
        UIAcqConfiguration.btnTestBci.addEventListener("click", this._testBciElectrodesListener);

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
        this._testWristbandElectrodesListener = () => {
            console.log("Testing Wristband electrodes...");
            this.socket.emit("TEST_WRISTBAND_ELECTRODES", '{"test": true}');
        };
        UIAcqConfiguration.btnTestWristband.addEventListener("click", this._testWristbandElectrodesListener);

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

    _sendConsoleMessage() {    
        const console = new ConsoleController("console", "Console Output", 1685, 219, 300, "20px");
        this.socket.on("LOG_CONSOLE", (data) => {
            try {
                const parsedData = JSON.parse(data);
    
                if (parsedData["operation"] === "info") {
                    console.addInfo(parsedData["data"]);
                } 
                else if (parsedData["operation"] === "warning") {
                    console.addWarning(parsedData["data"]);
                } 
                else if (parsedData["operation"] === "error") {
                    console.addError(parsedData["data"]);
                } 
                else {
                    console.addSuccess(parsedData["data"]);
                }
            } catch (error) {
                console.addError(`Error receiving console data: ${error.message}`);
            }
        });
    }
}
