class UIAcqStatus {    
    static get btnStop() {
        if (!UIAcqStatus._btnStop) {
            UIAcqStatus._btnStop = document.getElementById("btn-stop");
        }
        return UIAcqStatus._btnStop;
    }

    static get connectionIndicator() {
        if (!UIAcqStatus._connectionIndicator) {
            UIAcqStatus._connectionIndicator = document.getElementById("connection-indicator-1");
        }
        return UIAcqStatus._connectionIndicator;
    }

    static get hubIndicator() {
        if (!UIAcqStatus._hubIndicator) {
            UIAcqStatus._hubIndicator = document.getElementById("hub-status-1");
        }
        return UIAcqStatus._hubIndicator;
    }

    static get bciIndicator() {
        if (!UIAcqStatus._bciIndicator) {
            UIAcqStatus._bciIndicator = document.getElementById("bci-status-1");
        }
        return UIAcqStatus._bciIndicator;
    }

    static get wristIndicator() {
        if (!UIAcqStatus._wristIndicator) {
            UIAcqStatus._wristIndicator = document.getElementById("wristband-status-1");
        }
        return UIAcqStatus._wristIndicator;
    }

    static get btnClear() {  
        if (!UIAcqStatus._btnClear) {
            UIAcqStatus._btnClear = document.getElementById("btn-clear");
        }
        return UIAcqStatus._btnClear;
    }
    
    static get studyData() {
        if (!UIAcqStatus._studyData) {
            UIAcqStatus._studyData = {
                bciStatus: document.getElementById("bci-status-info"),
                wristbandStatus: document.getElementById("wristband-status-info"),
                bciFreq: document.getElementById("bci-freq-info"),
                wristbandFreq: document.getElementById("wristband-freq-info"),
                bciGain: document.getElementById("bci-gain-info"),
                wristbandGain: document.getElementById("wristband-gain-info"),
                bciChannels: document.getElementById("bci-channels-info"),
                wristbandChannels: document.getElementById("wristband-channels-info")
            };
        }
        return UIAcqStatus._studyData;
    }
}
