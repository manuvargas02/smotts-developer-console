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
        const electrodes = UIAcqConfiguration[`switchElectrodes`];
        let binaryValue = "";
    
        electrodes.forEach(checkbox => {
            binaryValue += checkbox && checkbox.checked ? "1" : "0"; // Si está marcado, agrega "1", si no "0"
        });

        const channels = parseInt(binaryValue, 2);
        console.log(channels);

        const config = {
            freq: parseInt(UIAcqConfiguration[`${devicePanel}ConfigButtons`].freq.value, 10),
            gain: parseInt(UIAcqConfiguration[`${devicePanel}ConfigButtons`].gain.value, 10),
            input_type: UIAcqConfiguration[`${devicePanel}ConfigButtons`].inputType.value,
            channels: channels 
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
        let channel = config.channels;
        const electrodes = UIAcqConfiguration[`switchElectrodes`];
        // Convert the channel value to a binary string
        console.log(channel);
        channel = parseInt(channel, 10).toString(2);
        // Add leading zeros to the binary string
        const binaryString = channel.padStart(electrodes.length, "0");
        console.log(binaryString);
        // Update the switches based on the binary string
        electrodes.forEach((electrode, index) => {
            if (electrode) {
                electrode.checked = binaryString[index] === "1"; 
            }
        });
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
