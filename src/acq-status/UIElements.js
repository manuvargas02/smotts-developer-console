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

    static get btnClear(){  
        return document.getElementById("btn-clear");
    }
    
    static get studyData() {
        let bciStatus = document.getElementById("bci-status-info");
        let wristbandStatus = document.getElementById("wristband-status-info");
        let bciFreq = document.getElementById("bci-freq-info");
        let wristbandFreq = document.getElementById("wristband-freq-info");
        let bciGain = document.getElementById("bci-gain-info");
        let wristbandGain = document.getElementById("wristband-gain-info");
        let bciChannels = document.getElementById("bci-channels-info");
        let wristbandChannels = document.getElementById("wristband-channels-info");
    
        return { bciStatus, wristbandStatus, bciFreq, wristbandFreq, bciGain, wristbandGain, bciChannels, wristbandChannels };
    }
    
}

