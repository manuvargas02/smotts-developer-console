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
}
