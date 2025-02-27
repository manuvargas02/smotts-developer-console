/**
 * Class for managing and updating device status indicators in the UI.
 */
class DeviceStatus {
    /**
     * Updates the status indicator color and text based on the connection status of a device.
     * @param {Object} screen - The screen object containing status indicators.
     * @param {string} indicatorCircleKey - The key of the device's indicator circle to update.
     * @param {string} indicatorTextKey - The key of the device's indicator text to update.
     * @param {string} status - The connection status of the device ("connected" or "disconnected").
     */
    static updateIndicator(screen, indicatorCircleKey, indicatorTextKey, status) {
        screen[indicatorCircleKey].style.backgroundColor = status === "connected" ? Constants.enfasisColor : Constants.errorColor;
        if (indicatorTextKey === "bciTextStatus") {
            screen[indicatorTextKey].innerHTML = status === "connected" ? "BCI Online" : "BCI Offline";
        }
        else if (indicatorTextKey === "emgTextStatus") {
            screen[indicatorTextKey].innerHTML = status === "connected" ? "EMG Online" : "EMG Offline";
        }
    }

    /**
     * Updates the hub connection status indicator based on predefined states.
     * @param {Object} screen - The screen object containing the hub status indicator.
     * @param {string} statusKey - The key representing the current hub status.
     */
    static getHubStatus(screen, status) {
        // Define the hub status dictionary
        const hubStatusDict = {
            "ready_to_connect": { type: "success", message: "Ready to connect" },
            "connecting_sensors": { type: "warning", message: "Connecting sensors" },
            "ready_to_check": { type: "success", message: "Ready to check" },
            "checking_sensors": { type: "warning", message: "Checking sensors" },
            "ready_to_acquire": { type: "success", message: "Ready to acquire" },
            "acquiring": { type: "success", message: "Running study" },
            "processing_data": { type: "warning", message: "Processing data" },
            "diagnostic_sent": { type: "success", message: "Diagnostic sent" }
        };

        // Get current status
        const currentStatus = hubStatusDict[status["status"]];

        // If there is no status, set the indicator to default
        if (!currentStatus) {
            screen["hubStatus"].style.backgroundColor = Constants.infoColor;
            screen["hubStatus"].innerText = "-";
            return;
        }

        // Set the color based on the status type
        let color;
        console.log(currentStatus.type);
        switch (currentStatus.type) {
            case "success":
                color = Constants.enfasisColor;
                break;
            case "warning":
                color = Constants.warningColor;
                break;
            case "error":
                color = Constants.errorColor;
                break;
        }
        console.log("color", color);

        screen["hubStatus"].innerText = currentStatus.message;
        screen["hubStatus"].style.color = color;
    }

    /**
     * Updates the BCI (Brain-Computer Interface) connection status indicator.
     * @param {Object} screen - The screen object containing status indicators.
     * @param {string} status - The connection status of the BCI ("connected" or "disconnected").
     */
    static getBciStatus(screen, status) {
        this.updateIndicator(screen, "bciCircleStatus", "bciTextStatus", status);
    }

    /**
     * Updates the EMG (Electromyography) connection status indicator.
     * @param {Object} screen - The screen object containing status indicators.
     * @param {string} status - The connection status of the EMG device ("connected" or "disconnected").
     */
    static getEmgStatus(screen, status) {
        this.updateIndicator(screen, "emgCircleStatus", "emgTextStatus", status);
    }

    /**
     * Updates the UI elements with study data values such as BCI status, frequency, and gain.
     * @param {Object} data - An object containing study data.
     * @param {string} data.BCI status - The current status of the BCI device.
     * @param {number} data.BCI frequency - The frequency of the BCI device in Hz.
     * @param {number} data.BCI gain - The gain value of the BCI device.
     */
    static getStudyData(data) {
        if (data["BCI status"] === "connected") {
            UIAcqStatus.studyData.bciStatus.innerHTML = "Online";
        }
        else {
            UIAcqStatus.studyData.bciStatus.innerHTML = "Offline";
        }
        UIAcqStatus.studyData.bciFreq.innerHTML = `${data["BCI frequency"]} Hz`;
        UIAcqStatus.studyData.bciGain.innerHTML = data["BCI gain"];
    }
}
