class DeviceStatus {
    static updateIndicator(screen, indicatorKey, status) {
        screen[indicatorKey].style.backgroundColor = status === "connected" ? "#0F0" : "#F00";
    }

    static getHubStatus(screen, status) {
        this.updateIndicator(screen, "hubIndicator", status);
    }

    static getBciStatus(screen, status) {
        this.updateIndicator(screen, "bciIndicator", status);
    }

    static getWristbandStatus(screen, status) {
        this.updateIndicator(screen, "wristIndicator", status);
    }

    static getStudyData(data) {
        UIAcqStatus.studyData.bci_status.innerHTML = data["BCI status"]
        UIAcqStatus.studyData.wristband_status.innerHTML = data["Wristband status"]
        UIAcqStatus.studyData.bci_freq.innerHTML = data["BCI frequency"] + " Hz"
        UIAcqStatus.studyData.wristband_freq.innerHTML = data["Wristband frequency"] + " Hz"
        UIAcqStatus.studyData.bci_gain.innerHTML = data["BCI gain"]
        UIAcqStatus.studyData.wristband_gain.innerHTML = data["Wristband gain"]
        UIAcqStatus.studyData.bci_channels.innerHTML = data["BCI channels"]
        UIAcqStatus.studyData.wristband_channels.innerHTML = data["Wristband channels"]
    }
}
