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
}

