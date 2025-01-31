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
            DeviceStatus.getHubStatus(UIAcqStatus, parsedData.status);
        });
    };

    bciStatus() {
        this.socket.on("STATUS_BCI", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getBciStatus(UIAcqStatus, parsedData.status);
        });
    };

    wristbandStatus() {
        this.socket.on("STATUS_WRISTBAND", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getWristbandStatus(UIAcqStatus, parsedData.status);
        });
    };

    stop() {
        UIAcqStatus.btnStop.addEventListener("click", () => {
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
    };

    getStudyData() {
        this.socket.on("STUDY_DATA", (data) => {
            const parsedData = JSON.parse(data);
            DeviceStatus.getStudyData(parsedData.data);
        });
    }

    createElectrodeGraph(html_element, electrode, max_points, y_min, y_max, width, height, border_radius, bg_color, line_color, x_legend, y_legend, line_width) {
        const graph = new ElectrodeGraph(html_element, max_points, y_min, y_max, width, height, border_radius, bg_color, line_color, x_legend, y_legend, line_width);
        this.socket.on("EEG_DATA", (data) => {
            const parsedData = JSON.parse(data);
            let electrodeData = parsedData.data[electrode];
            graph.addPoints(electrodeData);
            console.log(electrodeData);
        });
    }

};
