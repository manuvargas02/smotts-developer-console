class ConfigPanel {
    static setConfig(device_panel) {
        const config = {
            freq: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].freq).value,10),
            gain: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].gain).value,10),
            input_type: (UIAcqConfiguration[`${device_panel}ConfigButtons`].input_type).value,
            channels: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].channel).value,16), 
        };

        return {
            operation: "set_config",
            data: config
        };
    };
    
    static getConfig(device_panel, config) {
        UIAcqConfiguration[`${device_panel}ConfigButtons`].freq.value = config.freq;
        UIAcqConfiguration[`${device_panel}ConfigButtons`].gain.value = config.gain;
        UIAcqConfiguration[`${device_panel}ConfigButtons`].input_type.value = config.input_type;
        UIAcqConfiguration[`${device_panel}ConfigButtons`].channel.value = config.channels;
    };

    static testElectrodes(device, data) {
        const electrodes = UIAcqConfiguration[`btn${device}Electrodes`];
        console.log("Electrode Status:", data);
        electrodes.forEach((electrode, index) => {
            electrode.style.backgroundColor = data[index] ? "green" : "red";
        });
    }
    
};

