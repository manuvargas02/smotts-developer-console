class AcqStatusScreen {
    constructor(ip, port) {
        // Connect to the server
        this.ip = ip;
        this.port = port;
        this.socket = io.connect(`http://${this.ip}:${this.port}`);

        // Intialize private methods and create graphs and console of the screen
        this._connect();
        this._disconnect();
        this._hubStatus();
        this._bciStatus();
        this._emgStatus();
        this._stop();
        this._getStudyData();
        this._maxPoints = 300;
        this._graphSize = 150;

        this.graph1 = new ElectrodeGraph("graph-1", this._maxPoints, -0.00007, 0.00006, {width: 1038, height: this._graphSize});
        this.graph2 = new ElectrodeGraph("graph-2", this._maxPoints, -0.00007, 0.00006, {width: 1038, height: this._graphSize});
        this.graph3 = new ElectrodeGraph("graph-3", this._maxPoints, -0.00007, 0.00006, {width: 1038, height: this._graphSize});
        this.graph4 = new ElectrodeGraph("graph-4", this._maxPoints, -0.00007, 0.00006, {width: 1038, height: this._graphSize});
 /*       // Create first set of graphs
        this.graphSet1 = [
            new ElectrodeGraph("graph-1", this._maxPoints, -0.00007, 0.00006, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-2", this._maxPoints, -0.00007, 0.00006, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-3", this._maxPoints, -0.00007, 0.00006, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-4", this._maxPoints, -0.3, 0.3, { width: 1038, height: this._graphSize }),
        ];

        // Create second set of graphs
        this.graphSet2 = [
            new ElectrodeGraph("graph-5", this._maxPoints, -0.00005, 0.00005, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-6", this._maxPoints, -0.00006, 0.00007, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-7", this._maxPoints, -0.00008, 0.00009, { width: 1038, height: this._graphSize }),
            new ElectrodeGraph("graph-8", this._maxPoints, -0.2, 0.2, { width: 1038, height: this._graphSize }),
        ];
*/
        this.currentGraphSet = this.graphSet1;

        this.console = new ConsoleController("console-status-screen", "Console Output", 1685, 219, 300, "20px", "180px");
        //this.hide();
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
        this._sendDataGraph(this.graph1,0);
        this._sendDataGraph(this.graph2, 1);
        this._sendDataGraph(this.graph3, 2);
        this._sendDataGraph(this.graph4, 3);
    }

    hide() {
        UIAcqStatus.idScreen.style.display = "none";
        this.graph1.clear();
        this.graph2.clear();
        this.graph3.clear();
        this.graph4.clear();
        this.socket.off("EEG_DATA");
    }

    showGraphs() {
        this.currentGraphSet.forEach((graph, index) => {
            document.getElementById(`graph-${index}`).style.display = "none";
            graph.clear();
        });
    }

    hideGraphs() {
        this.currentGraphSet.forEach((graph, index) => {
            document.getElementById(`graph-${index}`).style.display = "none";
            graph.clear();
        });
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
            if (parsedData.status === "connected") {
                this.console.addSuccess("BCI connected successfully!");
            } else {
                this.console.addError("BCI disconnected!");
            }
            console.log("BCI status:", parsedData.status);
            DeviceStatus.getBciStatus(UIAcqStatus, parsedData.status);
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
                    this.console.addSuccess("Data Acquisition stopped successfully!");
                } else {
                    console.log("Failed to stop Data Acquisition");
                    this.console.addError("Failed to stop Data Acquisition");
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

    _swtichGraphs() {
        UIAcqStatus.btnSwitch.addEventListener("change", (event) => {
            this.hideGraphs();
            this.currentGraphSet = (UIAcqStatus.btnSwitch === "Set 1") ? this.graphSet1 : this.graphSet2;
            this.showGraphs();
        });
    }

    _sendConsoleMessage(message, type) {
        const console = new ConsoleController("console-status-screen", "Console Output", 1685, 219, 300, "20px", "180px");
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
