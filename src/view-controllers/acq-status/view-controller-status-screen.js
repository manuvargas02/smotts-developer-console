class AcqStatusScreen {
    constructor(socket) {
        this.socket = socket;
        this._connect();
        this._disconnect();
        this._hubStatus();
        this._bciStatus();
        this._emgStatus();
        this._stop();
        this._getStudyData();
        this._maxPoints = 30
        const graph1 = new ElectrodeGraph("graph-1", this._maxPoints, -0.00007, 0.00006, 1038, 155.5);
        const graph2 = new ElectrodeGraph("graph-2", this._maxPoints, -0.00007, 0.00006, 1038, 155.5);
        const graph3 = new ElectrodeGraph("graph-3", this._maxPoints, -0.00007, 0.00006, 1038, 155.5);
        const graph4 = new ElectrodeGraph("graph-4", this._maxPoints, -0.3, 0.3, 1038, 133.79);
        this._sendDataGraph(graph1,0);
        this._sendDataGraph(graph2, 1);
        this._sendDataGraph(graph3, 2);
        this._sendDataGraph(graph4, 3);
        this._sendConsoleMessage();
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
            DeviceStatus.getHubStatus(UIAcqStatus, parsedData.status);
        });
    }

    _bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(UIAcqStatus, parsedData.status);
        });
    }

    _emgStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            console.log("Wristband status:", parsedData.status);
            DeviceStatus.getEmgStatus(UIAcqStatus, parsedData.status);
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

    _sendDataGraph(graph, electrodeIndex) {
        // Listen for EEG data and update the graph
        this.socket.on("EEG_DATA", (data) => {
            // Parse the data
            const parsedData = JSON.parse(data);
            // Get the keys (names) of the data object
            const electrodeKeys = Object.keys(parsedData.data);
            // Get the name of the electrode in the specified index
            const electrodeName = electrodeKeys[electrodeIndex];
            // Get the data of the electrode with the name for the specified index
            let electrodeData = parsedData.data[electrodeName];
            // Add the data to the graph
            graph.addPoints(electrodeData);
        });
    }

    _clearGraph(graph) {
        this._clearGraphListener = () => {
            graph.clear();
            console.log("Graph cleared!");
        };
        UIAcqStatus.btnClear.addEventListener("click", this._clearGraphListener);
    }

    _sendConsoleMessage() {
        const console = new ConsoleController("console-status-screen", "Console Output", 1685, 219, 300, "20px", "180px");
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
