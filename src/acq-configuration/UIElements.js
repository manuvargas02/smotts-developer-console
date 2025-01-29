class UIAcqConfiguration {
    static get btnStart(){
        return document.getElementById("btn-start");
   }
   
   static get connectionIndicator(){
       return document.getElementById("connection-indicator-2");
   }

   static get hubIndicator(){
       return document.getElementById("hub-status-2");
   }

   static get bciIndicator(){
       return document.getElementById("bci-status-2");
   }

   static get wristIndicator(){
       return document.getElementById("wristband-status-2");
   }

   static get bciConfigButtons(){
        let freq = document.getElementById("freq-bci");
        let gain = document.getElementById("gain-bci");
        let input_type = document.getElementById("input-type-bci");
        let channel = document.getElementById("channels-bci");
        return {freq, gain, input_type, channel};
   }

   static get wristbandConfigButtons(){
        let freq = document.getElementById("freq-wristband");
        let gain = document.getElementById("gain-wristband");
        let input_type = document.getElementById("input-type-wristband");
        let channel = document.getElementById("channels-wristband");
        return {freq, gain, input_type, channel};
    }

   static get btnSendBciConfig(){
       return document.getElementById("send-btn-bci");
   }

   static get btnSendWristbandConfig(){
       return document.getElementById("send-btn-wristband");
   }

   static get btnGetBciConfig(){
         return document.getElementById("get-btn-bci");
    }

    static get btnGetWristbandConfig(){
        return document.getElementById("get-btn-wristband");
    }

    static get btnTestBci(){
        return document.getElementById("test-btn-bci");
    }

    static get btnTestWristband(){
        return document.getElementById("test-btn-wristband");
    }

    static get btnBciElectrodes(){
        return [
            document.getElementById("bci-electrode-1"),
            document.getElementById("bci-electrode-2"),
            document.getElementById("bci-electrode-3"),
            document.getElementById("bci-electrode-4"),
            document.getElementById("bci-electrode-5"),
            document.getElementById("bci-electrode-6"),
            document.getElementById("bci-electrode-7"),
            document.getElementById("bci-electrode-8"),
        ];
    }

    static get btnWristbandElectrodes(){
        return [
            document.getElementById("wristband-electrode-1"),
            document.getElementById("wristband-electrode-2"),
            document.getElementById("wristband-electrode-3"),
            document.getElementById("wristband-electrode-4"),
            document.getElementById("wristband-electrode-5"),
            document.getElementById("wristband-electrode-6"),
            document.getElementById("wristband-electrode-7"),
            document.getElementById("wristband-electrode-8"),
        ];
    }

}

