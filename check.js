import { Alert, Platform } from "react-native";
import { fetch } from "@react-native-community/netinfo";
import { BluetoothStatus } from 'react-native-bluetooth-status';
import Geolocation from 'react-native-geolocation-service'

async function checkGPS(element, disabled) {
    console.log(element.state)
    Geolocation.getCurrentPosition(
        () => {
            if (disabled.length > 0) {
                Alert.alert(
                    "Error",
                    "Please enable " + disabled.join(', ') + " to use the positioning function",
                    [
                        {text: "OK", onPress: () => null}
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
        },
        () => {
            disabled.push("GPS");
            if (disabled.length > 0) {
                Alert.alert(
                    "Error",
                    "Please enable " + disabled.join(', ') + " to use the positioning function",
                    [
                        {text: "OK", onPress: () => null}
                    ]
                )
            }
            element.setState({enablePositioning: false})
        }
    );
}
async function checkWifi() {
    let state = await fetch();
    // allow turn on wifi not connect to anything for android
    // have to connect some wifi stuff for iOS
    return Platform.OS === "android" ? state.isWifiEnabled : state.type.toLowerCase() === "wifi";
}
async function checkBluetooth() {
    return await BluetoothStatus.state();
}

function checkAll(element) {
    return async () => {
        let disabled = [];
        if (!await checkWifi()) { disabled.push("wifi"); }
        if (!await checkBluetooth()) { disabled.push("Bluetooth")}
        await checkGPS(element, disabled)
    }
}

module.exports = {
    checkAll: checkAll
}