class DeviceStatus {
    static updateIndicator(indicator, status) {
        indicator.style.backgroundColor = status === "connected" ? "#0F0" : "#F00";
    }

    static getHubStatus(status) {
        this.updateIndicator(UIAcqConfiguration.hubIndicator, status);
        this.updateIndicator(UIAcqStatus.hubIndicator, status);
    };

    static getBciStatus(status) {
        this.updateIndicator(UIAcqConfiguration.bciIndicator, status);
        this.updateIndicator(UIAcqStatus.bciIndicator, status);
    };

    static getWristbandStatus(status) {
        this.updateIndicator(UIAcqConfiguration.wristIndicator, status);
        this.updateIndicator(UIAcqStatus.wristIndicator, status);
    };
};