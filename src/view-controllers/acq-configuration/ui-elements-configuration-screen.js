class UIAcqConfiguration {
    static get idScreen() {
        if (!UIAcqConfiguration._idScreen) {
            UIAcqConfiguration._idScreen = document.getElementById("configuration-screen");
        }
        return UIAcqConfiguration._idScreen;
    }

    static get btnStart() {
        if (!UIAcqConfiguration._btnStart) {
            UIAcqConfiguration._btnStart = document.getElementById("start-study-btn");
        }
        return UIAcqConfiguration._btnStart;
    }
   
    static get hubStatus() {
        if (!UIAcqConfiguration._hubIndicator) {
            UIAcqConfiguration._hubIndicator = document.getElementById("hub-status-2");
        }
        return UIAcqConfiguration._hubIndicator;
    }

    static get bciCircleStatus() {
        if (!UIAcqConfiguration._bciCircleStatus) {
            UIAcqConfiguration._bciCircleStatus = document.getElementById("bci-circle-status-2");
        }
        return UIAcqConfiguration._bciCircleStatus;
    }

    static get bciTextStatus() {
        if (!UIAcqConfiguration._bciTextStatus) {
            UIAcqConfiguration._bciTextStatus = document.getElementById("bci-text-status-2");
        }
        return UIAcqConfiguration._bciTextStatus;
    }

    static get emgCircleStatus() {
        if (!UIAcqConfiguration._emgCircleStatus) {
            UIAcqConfiguration._emgCircleStatus = document.getElementById("emg-circle-status-2");
        }
        return UIAcqConfiguration._emgCircleStatus;
    }

    static get emgTextStatus() {
        if (!UIAcqConfiguration._emgTextStatus) {
            UIAcqConfiguration._emgTextStatus = document.getElementById("emg-text-status-2");
        }
        return UIAcqConfiguration._emgTextStatus;
    }   

    static get bciConfigButtons() {
        if (!UIAcqConfiguration._bciConfigButtons) {
            UIAcqConfiguration._bciConfigButtons = {
                freq: document.getElementById("freq-bci"),
                gain: document.getElementById("gain-bci"),
                inputType: document.getElementById("input-type-bci"),
            };
        }
        return UIAcqConfiguration._bciConfigButtons;
    }

    static get wristbandConfigButtons() {
        if (!UIAcqConfiguration._wristbandConfigButtons) {
            UIAcqConfiguration._wristbandConfigButtons = {
                freq: document.getElementById("freq-wristband"),
                gain: document.getElementById("gain-wristband"),
                inputType: document.getElementById("input-type-wristband"),
                channel: document.getElementById("channels-wristband")
            };
        }
        return UIAcqConfiguration._wristbandConfigButtons;
    }

    static get btnSendBciConfig() {
        if (!UIAcqConfiguration._btnSendBciConfig) {
            UIAcqConfiguration._btnSendBciConfig = document.getElementById("send-btn-bci");
        }
        return UIAcqConfiguration._btnSendBciConfig;
    }

    static get btnSendWristbandConfig() {
        if (!UIAcqConfiguration._btnSendWristbandConfig) {
            UIAcqConfiguration._btnSendWristbandConfig = document.getElementById("send-btn-wristband");
        }
        return UIAcqConfiguration._btnSendWristbandConfig;
    }

    static get btnGetBciConfig() {
        if (!UIAcqConfiguration._btnGetBciConfig) {
            UIAcqConfiguration._btnGetBciConfig = document.getElementById("get-btn-bci");
        }
        return UIAcqConfiguration._btnGetBciConfig;
    }

    static get btnGetWristbandConfig() {
        if (!UIAcqConfiguration._btnGetWristbandConfig) {
            UIAcqConfiguration._btnGetWristbandConfig = document.getElementById("get-btn-wristband");
        }
        return UIAcqConfiguration._btnGetWristbandConfig;
    }

    static get btnTestBci() {
        if (!UIAcqConfiguration._btnTestBci) {
            UIAcqConfiguration._btnTestBci = document.getElementById("test-electrodes-bci");
        }
        return UIAcqConfiguration._btnTestBci;
    }

    static get btnTestWristband() {
        if (!UIAcqConfiguration._btnTestWristband) {
            UIAcqConfiguration._btnTestWristband = document.getElementById("test-btn-wristband");
        }
        return UIAcqConfiguration._btnTestWristband;
    }

    static get btnBciElectrodes() {
        if (!UIAcqConfiguration._btnBciElectrodes) {
            UIAcqConfiguration._btnBciElectrodes = [
                document.getElementById("bci-electrode-1"),
                document.getElementById("bci-electrode-2"),
                document.getElementById("bci-electrode-3"),
                document.getElementById("bci-electrode-4"),
                document.getElementById("bci-electrode-5"),
                document.getElementById("bci-electrode-6"),
                document.getElementById("bci-electrode-7"),
                document.getElementById("bci-electrode-8"),
                document.getElementById("bci-electrode-9")
            ];
        }
        return UIAcqConfiguration._btnBciElectrodes;
    }

    static get btnWristbandElectrodes() {
        if (!UIAcqConfiguration._btnWristbandElectrodes) {
            UIAcqConfiguration._btnWristbandElectrodes = [
                document.getElementById("wristband-electrode-1"),
                document.getElementById("wristband-electrode-2"),
                document.getElementById("wristband-electrode-3"),
                document.getElementById("wristband-electrode-4"),
                document.getElementById("wristband-electrode-5"),
                document.getElementById("wristband-electrode-6"),
                document.getElementById("wristband-electrode-7"),
                document.getElementById("wristband-electrode-8"),
                document.getElementById("wristband-electrode-9")
            ];
        }
        return UIAcqConfiguration._btnWristbandElectrodes;
    }
}
