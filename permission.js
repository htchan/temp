import Geolocation from 'react-native-geolocation-service'
import { Platform, PermissionsAndroid } from "react-native"

async function _requestAndroidGPSPermission() {
    try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (err) { alert(err) }
}
async function _requestIOSGPSPermission() {
    await Geolocation.requestAuthorization('whenInUse');
}

async function requestGPSPermission(platform=null) {
    if (typeof(platform) !== String) { platform = Platform.OS; }
    if (platform === "android") {
        await _requestAndroidGPSPermission();
    } else if (platform === "ios") {
        await _requestIOSGPSPermission();
    } else {
        alert( + ' OS not found in database')
    }
}

async function _requestAndroidCameraPermission() {
    try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    } catch (err) { alert(err) }

}
async function _requestIOSCameraPermission() {

}
async function requestCameraPermission(platform) {
    if (typeof(platform) !== String) { platform = Platform.OS; }
    if (platform === "android") {
        await _requestAndroidCameraPermission();
    } else if (platform === "ios") {
        await _requestIOSCameraPermission();
    } else {
        alert("error")
    }

}

// check we need to use WiFi permission or not

async function requestAllPermission() {
    let platform = Platform.OS;
    await requestGPSPermission(platform)
    await requestCameraPermission(platform)
}

module.exports = {
    allPermission : requestAllPermission,
    gpsPermission : requestGPSPermission,
    cameraPermission : requestCameraPermission
}