
const GetCaptureScreenPermission = () =>
{
    requestScreenCapture(true);
    const img = captureScreen();
    toast(img.getWidth() + " x " + img.getHeight());
};
GetCaptureScreenPermission();


//adb pull /sdcard/脚本/LordNine/build/lordnine_v1.0.0.apk C:/nginx/Rom/LordNine.apk
//*******************************  adb ip list ------------------------------------------------**********************
// 001: 10.245.81.71
// 003: 10.245.81.15
// 004: 10.245.81.193
// 006: 10.245.81.16
// 007:  10.245.81.17
// 08: 10.245.81.23
// 09:10.245.81.24
//012: 10.245.81.79


