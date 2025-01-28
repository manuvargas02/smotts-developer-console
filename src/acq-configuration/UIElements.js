class UIAcqConfiguration {
    static get btnStart(){
        return document.getElementById("btn-start");
   }
   
   static get btnTestBci(){
       return document.getElementById("btn-test-bci");
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

   static get sendBciConfig(){
       return document.getElementById("send-btn-bci");
   }

   static get sendWristbandConfig(){
       return document.getElementById("send-btn-wristband");
   }


}

