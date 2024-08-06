
const GetCaptureScreenPermission = () =>
{
    requestScreenCapture(true);
    const img = captureScreen();
    toast(img.getWidth() + " x " + img.getHeight());
};
GetCaptureScreenPermission();

// adb pull / sdcard / 脚本 / RomProj / build / Rom_v1.0.0703.apk  C: /nginx/Rom / Rom.apk
//*******************************  adb ip list ------------------------------------------------**********************
// 006: 10.245.81.16
// 007:  10.245.81.17
// 08: 10.245.81.23



