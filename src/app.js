
function main(){
    const AcqConfiguration = new AcqConfigurationScreen(Constants.serverIP, Constants.serverPort);
    const AcqStatus = new AcqStatusScreen(Constants.serverIP, Constants.serverPort);

    UIAcqConfiguration.btnStart.addEventListener("click", () => {
        AcqConfiguration.hide();
        AcqStatus.show();
    });

    UIAcqStatus.btnStop.addEventListener("click", () => {
        AcqStatus.hide();
        AcqConfiguration.show();
    });
};

document.addEventListener("DOMContentLoaded", () => main());