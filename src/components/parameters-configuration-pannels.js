/**
 * Class responsible for managing device configuration and electrode testing.
 */
class ConfigPanel {
    /**
     * Sets the configuration for a specific device panel.
     * @param {string} devicePanel - The name of the device panel.
     * @returns {Object} An object containing the operation type and configuration data for the device.
     */
    static setConfig(devicePanel) {
        const config = {
            freq: parseInt(UIAcqConfiguration[`${devicePanel}ConfigButtons`].freq.value, 10),
            gain: parseInt(UIAcqConfiguration[`${devicePanel}ConfigButtons`].gain.value, 10),
            inputType: UIAcqConfiguration[`${devicePanel}ConfigButtons`].inputType.value,
        };

        return {
            operation: "set_config",
            data: config
        };
    }

    /**
     * Updates the html elements with the provided configuration for a device panel.
     * @param {string} devicePanel - The name of the device panel.
     * @param {Object} config - The configuration data to apply.
     */
    static getConfig(devicePanel, config) {
        UIAcqConfiguration[`${devicePanel}ConfigButtons`].freq.value = config.freq;
        UIAcqConfiguration[`${devicePanel}ConfigButtons`].gain.value = config.gain;
        UIAcqConfiguration[`${devicePanel}ConfigButtons`].inputType.value = config.input_type;
    }

    /**
     * Tests electrodes for a given device and updates their visual representation.
     * @param {string} device - The name of the device being tested.
     * @param {Array<boolean>} data - An array indicating the status of each electrode (true for active, false for inactive).
     */
    static testElectrodes(device, data) {
        const electrodes_config = UIAcqConfiguration[`btn${device}Electrodes`];
        const electrodes_status = UIAcqStatus[`btn${device}Electrodes`];

        electrodes_config.forEach((electrode, index) => {
            electrode.style.backgroundColor = data[index] ? "green" : "red";
        });

        electrodes_status.forEach((electrode, index) => {
            electrode.style.backgroundColor = data[index] ? "green" : "red";
        });
        
    }
}
