class ConfigPanel {
    static setConfig(device_panel) {
        const config = {
            freq: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].freq).value,10),
            gain: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].gain).value,10),
            input_type: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].input_type).value,10),
            channels: parseInt((UIAcqConfiguration[`${device_panel}ConfigButtons`].channel).value,10), 
        };

        return {
            operation: "set_config",
            data: config
        };
    }
}

