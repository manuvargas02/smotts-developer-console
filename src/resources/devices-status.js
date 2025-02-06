class DeviceStatus {
    /**
     * Updates the status indicator color based on the connection status of devices.
     * @param {Object} screen - The screen object containing status indicators.
     * @param {string} indicatorKey - The key of the device's indicator to update.
     * @param {string} status - The status of the device ("connected" or "disconnected").
     */
    static updateIndicator(screen, indicatorKey, status) {
        screen[indicatorKey].style.backgroundColor = status === "connected" ? "#0F0" : "#F00";
    }

    /**
     * Updates the hub connection status indicator.
     * @param {Object} screen - The screen object containing status indicator.
     * @param {string} status - The connection status ("connected" or "disconnected").
     */
    static getHubStatus(screen, status) {
        this.updateIndicator(screen, "hubIndicator", status);
    }

    /**
     * Updates the BCI connection status indicator.
     * @param {Object} screen - The screen object containing status indicator.
     * @param {string} status - The connection status ("connected" or "disconnected").
     */
    static getBciStatus(screen, status) {
        this.updateIndicator(screen, "bciIndicator", status);
    }

    /**
     * Updates the wristband connection status indicator.
     * @param {Object} screen - The screen object containing status indicator.
     * @param {string} status - The connection status ("connected" or "disconnected").
     */
    static getWristbandStatus(screen, status) {
        this.updateIndicator(screen, "wristIndicator", status);
    }

    /**
     * Updates the html elements with study data values.
     * @param {Object} data - An object containing study data.
     */
    static getStudyData(data) {
        UIAcqStatus.studyData.bciStatus.innerHTML = data["BCI status"];
        UIAcqStatus.studyData.wristbandStatus.innerHTML = data["Wristband status"];
        UIAcqStatus.studyData.bciFreq.innerHTML = `${data["BCI frequency"]} Hz`;
        UIAcqStatus.studyData.wristbandFreq.innerHTML = `${data["Wristband frequency"]} Hz`;
        UIAcqStatus.studyData.bciGain.innerHTML = data["BCI gain"];
        UIAcqStatus.studyData.wristbandGain.innerHTML = data["Wristband gain"];
        UIAcqStatus.studyData.bciChannels.innerHTML = data["BCI channels"];
        UIAcqStatus.studyData.wristbandChannels.innerHTML = data["Wristband channels"];
    }
}
