

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
// java.lang.System.exit(0);
//com.smilegate.lordnine.stove.google

// adb -s 10.245.81.17:5555  pull /sdcard/脚本/LordNine/build/lordnine_v1.0.0.apk C:/nginx/Rom/LordNine.apk
// adb -s 10.1.99.24:5555  pull /sdcard/脚本/LordNine/build/lordnine_v12.23.1.apk C:/nginx/Rom/LordNine.apk



