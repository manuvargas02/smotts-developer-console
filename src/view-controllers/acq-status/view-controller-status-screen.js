class AcqStatusScreen {
    constructor(socket) {
        this.socket = socket;
        //UIAcqStatus.connectionIndicator.style.backgroundColor = "#F00";
        this._connect();
        this._disconnect();
        this._bciStatus();
        this._emgStatus();
        this._stop();
        this._getStudyData();
        this._sendDataGraph("graph-1", "Fp1");
        //this._sendConsoleMessage();
        this.hide();
    }

    destructor() {
        this.socket.off("connect");
        this.socket.off("disconnect");
        this.socket.off("STATUS_HUB");
        this.socket.off("STATUS_BCI");
        this.socket.off("STATUS_WRISTBAND");
        this.socket.off("STOP");
        this.socket.off("STUDY_DATA");
        this.socket.off("EEG_DATA");
        this.socket.off("LOG_CONSOLE");

        UIAcqStatus.btnStop.removeEventListener("click", this._stopListener);
        UIAcqStatus.btnClear.removeEventListener("click", this._clearListener);

        this.socket = null;

    }

    show() {
        UIAcqStatus.idScreen.style.display = "block";
    }

    hide() {
        UIAcqStatus.idScreen.style.display = "none";
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

    _stop() {
        this._stopListener = () => {
            this.socket.emit("STOP", '{"stop": true}');
            this.socket.on("STOP", (data) => {
                const parsedResponse = JSON.parse(data);
                if (parsedResponse.success) {
                    console.log("Data Acquisition stopped successfully!");
                } else {
                    console.log("Failed to stop Data Acquisition");
                }
            });
        };
        UIAcqStatus.btnStop.addEventListener("click", this._stopListener);
    }

    _getStudyData() {
        this.socket.on("STUDY_DATA", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getStudyData(parsedData.data);
        });
    }

    _sendDataGraph(htmlElement, electrode) {
        const graph = new ElectrodeGraph(htmlElement, 300, -1, 1, 1038, 463);
        this.socket.on("EEG_DATA", (data) => {
            const parsedData = JSON.parse(data);
            let electrodeData = parsedData.data[electrode];
            graph.addPoints(electrodeData);
        });
        this._clearGraph(graph);
    }

    _clearGraph(graph) {
        this._clearGraphListener = () => {
            graph.clear();
            console.log("Graph cleared!");
        };
        UIAcqStatus.btnClear.addEventListener("click", this._clearGraphListener);
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
