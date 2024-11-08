

const GetCaptureScreenPermission = () =>
{
    threads.start(() =>    
    {
        requestScreenCapture(true);

    });
    device.setMusicVolume(0);
    threads.start(() =>
    {
        let hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(2000);
        if (hasOpen)
        {
            hasOpen.click();
            sleep(500);
            const img = captureScreen();
            toast(img.getWidth() + " x " + img.getHeight());
        }
    });
};

GetCaptureScreenPermission();

// engines.stopAllAndToast();
//com.smilegate.lordnine.stove.google
// 10.6.130.129
//adb -s 10.245.81.17:5555  pull /sdcard/脚本/LordNine/build/lordnine_v1.0.0.apk C:/nginx/Rom/LordNine.apk
//adb -s 10.245.81.17:5555  pull /sdcard/脚本/LordNine/build/lordnine_v1.0.1.apk C:/nginx/Rom/LordNineBeta.apk

//adb -s 10.245.81.17:5555  shell pm enable org.autojs.autoxjs.v6

//adb shell sh /sdcard/Android/data/com.omarea.vtools/up.sh
//adb shell sh /storage/emulated/0/Android/data/com.omarea.vtools/up.sh
//*******************************  adb ip list ------------------------------------------------**********************
// 001: 10.245.81.71
// 003: 10.245.81.15
// 004: 10.245.81.193
// 006: 10.245.81.16
// 007: 10.245.81.17
// 008: 10.245.81.23
// 009: 10.245.81.24
// 011: 10.245.81.31
// 012: 10.245.81.79
// 014: 10.245.81.87

// 4k: 001 10.245.76.49
// 4k: 002 10.245.76.50
// 4k: 005 10.240.130.93
// 4k: 006 10.240.130.94
// 4k: 007 10.240.130.95
// 4k: 008 10.240.130.96
//
// 4k: 009 10.245.76.41

