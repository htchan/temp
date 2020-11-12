import { Alert, Platform } from "react-native";
import { fetch } from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service'
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import RNOpenEspecificsSettings from 'react-native-open-especifics-settings';
import DeviceSettings from 'react-native-device-settings';
import { gpsPermission } from './permission';

async function checkGPS() {
    return new Promise( (resolve, reject) => {
        Geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false)
        )
    });
}
async function checkWifi() {
    return (await fetch()).type.toLowerCase() === "wifi";
}
async function checkBluetooth() {
    return (await BluetoothStateManager.getState()).toLowerCase() === "poweredon";
}

async function checkAll(element) {
    let disabled = [];
    if (!await checkWifi()) { disabled.push("wifi"); }
    if (!await checkBluetooth()) { disabled.push("Bluetooth"); }
    if (!await checkGPS()) { disabled.push("GPS"); }
    if (disabled.length > 0) {
        Alert.alert(
            "Warning",
            "Please enable " + disabled.join(', ') + " to use the positioning function",
            [
                {text: "Ok", onPress: () => null},
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
}

function checkAllRender(element) {
    return async() => {
        await checkAll(element)
    }
}

function product(element) {
    return async () => {
        await gpsPermission();
        await checkAll(element);
    }
}

module.exports = {
    checkAll: checkAllRender,
    product: product
}