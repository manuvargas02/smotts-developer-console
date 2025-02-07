class AcqStatusScreen {
    constructor(socket) {
        this.socket = socket;
        //UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
        this._connect();
        this._disconnect();
        this._hubStatus();
        this._bciStatus();
        this._wristbandStatus();
        this._stop();
        this._getStudyData();
        this._sendDataGraph("graph-1", "Fp1");
        this._sendConsoleMessage();
    }

    _connect() {
        this.socket.on("connect", () => {
            console.log("Connected to server");
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#0F0";
        });
    }
    
    _disconnect() {
        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server");
            UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
        });
    }

    _hubStatus() {
        this.socket.on("STATUS_HUB", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getHubStatus(UIAcqStatus, parsedData.status);
        });
    }

    _bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getBciStatus(UIAcqStatus, parsedData.status);
        });
    }

    _wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getWristbandStatus(UIAcqStatus, parsedData.status);
        });
    }

    _stop() {
        UIAcqStatus.btnStop.addEventListener("click", () => {
            this.socket.emit("STOP", '{"stop": true}');
            this.socket.on("STOP", (data) => {
                const parsedResponse = JSON.parse(data);
                if (parsedResponse.success) {
                    console.log("Data Acquisition stopped successfully!");
                } else {
                    console.log("Failed to stop Data Acquisition");
                }
            });
        });
    }

    _getStudyData() {
        this.socket.on("STUDY_DATA", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getStudyData(parsedData.data);
        });
    }

    _sendDataGraph(htmlElement, electrode) {
        const graph = new ElectrodeGraph(htmlElement, 300, -1, 1);
        this.socket.on("EEG_DATA", (data) => {
            const parsedData = JSON.parse(data);
            let electrodeData = parsedData.data[electrode];
            graph.addPoints(electrodeData);
        });
        this._clearGraph(graph);
    }

    _clearGraph(graph) {
        UIAcqStatus.btnClear.addEventListener("click", () => {
            graph.clear();
            console.log("Graph cleared!");
        });
    }

    _sendConsoleMessage() {
        const console = new ConsoleController("console", "CONSOLE", 800, 200, 300);
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
