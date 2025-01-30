class UIAcqStatus {    
    static get btnStop(){
        return document.getElementById("btn-stop");
    }

    static get connectionIndicator(){
        return document.getElementById("connection-indicator-1");
    }

    static get hubIndicator(){
        return document.getElementById("hub-status-1");
    }

    static get bciIndicator(){
        return document.getElementById("bci-status-1");
    }

    static get wristIndicator(){
        return document.getElementById("wristband-status-1");
    }
    
    static get studyData(){
            let bci_status = document.getElementById("bci-status-info");
            let wristband_status = document.getElementById("wristband-status-info");
            let bci_freq = document.getElementById("bci-freq-info");
            let wristband_freq = document.getElementById("wristband-freq-info");
            let bci_gain = document.getElementById("bci-gain-info");
            let wristband_gain = document.getElementById("wristband-gain-info");
            let bci_channels = document.getElementById("bci-channels-info");
            let wristband_channels = document.getElementById("wristband-channels-info");
            return {bci_status, wristband_status, bci_freq, wristband_freq, bci_gain, wristband_gain, bci_channels, wristband_channels};
    }
}

