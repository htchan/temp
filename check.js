import { Alert, Platform } from "react-native";
import { fetch } from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service'
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import RNOpenEspecificsSettings from 'react-native-open-especifics-settings';
import DeviceSettings from 'react-native-device-settings';

async function checkGPS(element, disabled) {
    return new Promise( (resolve, reject) => {
        Geolocation.getCurrentPosition(
            () => {
                if (disabled.length > 0) {
                    Alert.alert(
                        "Warning",
                        "Please enable " + disabled.join(', ') + " to use the positioning function",
                        [
                            {text: "Later", onPress: () => null},
                            {text: "Enable", onPress: () => {
                                RNOpenEspecificsSettings.openSettings('network')
                            }}
                        ]
                    );
                    element.setState({
                        enablePositioning: false
                    })
                } else {
                    element.setState({
                        enablePositioning: true
                    })
                }
                return resolve(true);
            },
            () => {
                disabled.push("GPS");
                if (disabled.length > 1) {
                    Alert.alert(
                        "Warning",
                        "Please enable " + disabled.join(', ') + " to use the positioning function",
                        [
                            {text: "Later", onPress: () => null},
                            {text: "Enable", onPress: () => {
                                BluetoothStateManager.openSettings()
                                DeviceSettings.wifi();
                            }}
                        ]
                    )
                } else {
                    Alert.alert(
                        "Error", "you have to turn on GPS to access the positioning service"
                    )
                }
                element.setState({enablePositioning: false});
                return resolve(false)
            }
        )
    });
}
async function checkWifi() {
    return (await fetch()).type.toLowerCase() === "wifi";
}
async function checkBluetooth() {
    return (await BluetoothStateManager.getState()).toLowerCase() === "poweredon";
}

function checkAll(element) {
    return async () => {
        let disabled = [];
        if (!await checkWifi()) { disabled.push("wifi"); }
        if (!await checkBluetooth()) { disabled.push("Bluetooth")}
        await checkGPS(element, disabled)
        console.log('hello')
    }
}

module.exports = {
    checkAll: checkAll
}