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
                bciStatus: document.getElementById("status"),
                bciFreq: document.getElementById("frequency"),
                bciGain: document.getElementById("gain")
            };
        }
        return UIAcqStatus._studyData;
    }

    static get btnBciElectrodes() {
        if (!UIAcqStatus._btnBciElectrodes) {
            UIAcqStatus._btnBciElectrodes = [
                document.getElementById("bci-electrode-11"),
                document.getElementById("bci-electrode-12"),
                document.getElementById("bci-electrode-13"),
                document.getElementById("bci-electrode-14"),
                document.getElementById("bci-electrode-15"),
                document.getElementById("bci-electrode-16"),
                document.getElementById("bci-electrode-17"),
                document.getElementById("bci-electrode-18"),
                document.getElementById("bci-electrode-19")
            ];
        }
        return UIAcqStatus._btnBciElectrodes;
    }
}
