class AcqConfigurationScreen {
    constructor(ip, port) {
        // Connect to the server
        this.ip = ip;
        this.port = port;
        this.socket = io.connect(`http://${this.ip}:${this.port}`);
        
        // Intialize private methods and create console of the screen
        this._connect();
        this._disconnect();
        this._hubStatus();
        this._bciStatus();
        this._emgStatus();
        this._start();
        this._setBciConfiguration();
        this._getBciConfiguration();
        this._testBciElectrodes();
        this.startedSucess = false;
        this.console = new ConsoleController("console-configuration-screen", "Console Output", 1685, 219, 300, "20px");
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
            DeviceStatus.getHubStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            if (parsedData.status === "connected") {
                this.console.addSuccess("BCI connected successfully!");
            } else {
                this.console.addError("BCI disconnected!");
            }
            DeviceStatus.getBciStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _emgStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            if (parsedData.status === "connected") {
                this.console.addSuccess("EMG connected successfully!");
            } else {
                this.console.addError("EMG disconnected!");
            }
            DeviceStatus.getEmgStatus(UIAcqConfiguration, parsedData.status);
        });
    }

    _start() {
        this._startListener = () => {
            this.socket.emit("START", '{"start": true}');
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
                this.console.addSuccess("BCI configuration received");
            } else if (parsedResponse.operation === "set_config") {
                console.log(parsedResponse.success ? "BCI Configuration set successfully!" : "Failed to set BCI Configuration.");
                this.console.addSuccess(parsedResponse.success ? "BCI Configuration set successfully!" : "Failed to set BCI Configuration.");
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
            if (data.status_ok) {
                console.log("Electrodes tested successfully!");
                this.console.addWarning("Testing electrodes...")
                this.console.addSuccess("Electrodes tested successfully!");
                ConfigPanel.testElectrodes("Bci", data.electrodes_status);
            } else {
                console.log("Failed to test electrodes.");
                this.console.addError("Failed to test electrodes.");
            }
        });
    }

    _sendConsoleMessage(message, type) {
        try {
            if (type === "info") {
                console.addInfo(message);
            } 
            else if (type === "error") {
                console.addError(message);
            }
            else if (type === "warning") {
                console.addWarning(message);
            }
            else {
                console.addSuccess(message);
            }
        } catch (error) {
            console.addError(`Error receiving console data: ${error.message}`);
        }
    }
}
