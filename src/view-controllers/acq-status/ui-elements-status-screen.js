class UIAcqStatus {    
    static get idScreen() {
        if (!UIAcqStatus._idScreen) {
            UIAcqStatus._idScreen = document.getElementById("status-screen");
        }
        return UIAcqStatus._idScreen;
    }

    static get btnStop() {
        if (!UIAcqStatus._btnStop) {
            UIAcqStatus._btnStop = document.getElementById("btn-stop");
        }
        return UIAcqStatus._btnStop;
    }

    static get hubStatus() {
        if (!UIAcqStatus._hubIndicator) {
            UIAcqStatus._hubIndicator = document.getElementById("hub-status-1");
        }
        return UIAcqStatus._hubIndicator;
    }

    static get bciCircleStatus() {
        if (!UIAcqStatus._bciCircleStatus) {
            UIAcqStatus._bciCircleStatus = document.getElementById("bci-circle-status-1");
        }
        return UIAcqStatus._bciCircleStatus;
    }

    static get bciTextStatus() {
        if (!UIAcqStatus._bciTextStatus) {
            UIAcqStatus._bciTextStatus = document.getElementById("bci-text-status-1");
        }
        return UIAcqStatus._bciTextStatus;
    }

    static get emgCircleStatus() {
        if (!UIAcqStatus._emgCircleStatus) {
            UIAcqStatus._emgCircleStatus = document.getElementById("emg-circle-status-1");
        }
        return UIAcqStatus._emgCircleStatus;
    }

    static get emgTextStatus() {
        if (!UIAcqStatus._emgTextStatus) {
            UIAcqStatus._emgTextStatus = document.getElementById("emg-text-status-1");
        }
        return UIAcqStatus._emgTextStatus;
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
