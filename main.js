"ui";

const { RewriteConfig, Sleep, specialConfig } = require("./utils");
const { ExceptionFlow, MakeSureInGame } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");
const { ListenServerFlow } = require("./ListenServer.js");
const { InstanceFlow } = require("./Instance.js");

let isRunning = false;

let mainThread;
let launchData = {};
function StartScript(data)
{
    console.log("start script data: " + data);
    if (isRunning == true)
    {
        console.log("结束");
        java.lang.System.exit(0);
        // engines.stopAllAndToast();
        // exit();
    }
    else if (isRunning == false)
    {
        mainThread = threads.start(function ()
        {
            isRunning = true;
            auto();
            threads.start(function () { images.requestScreenCapture(true); });
            threads.start(function ()
            {
                const hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(2000);
                if (hasOpen)
                {
                    hasOpen.click();
                }
            });
            data = JSON.parse(data);
            launchData = data;
            toast("game start");
            specialConfig.gameMode = data.gameMode;
            specialConfig.initGameMode = data.gameMode;
            MainFlow(data);
        }
        );
    }
}
const DownLoadApk = (downloadUrl, savePath) =>
{
    threads.start(function ()
    {
        const url = `http://10.6.130.129:82/${downloadUrl}`;
        const fullSavePath = `/sdcard/${savePath}`;

        let r = http.client().newCall(
            http.buildRequest(url, {
                method: "GET",
            })
        ).execute();

        let fs = new java.io.FileOutputStream(fullSavePath);

        let is = r.body().byteStream();
        const buffer = util.java.array("byte", 1024);
        let byteRead; //每次读取的byte数
        while ((byteRead = is.read(buffer)) != -1)
        {
            fs.write(buffer, 0, byteRead); //读取
        }
        if (files.exists(fullSavePath))
        {
            app.viewFile(fullSavePath);
        }
        else
        {
            alert('下载失败');
        }
    }
    );
};
const AutoInstallApk = (url) =>
{
    if (files.exists(`/sdcard/${url}`))
    {
        app.viewFile(`/sdcard/${url}`);

        let hasUpdate = text("업데이트").findOne(15000);
        if (hasUpdate)
        {
            hasUpdate.click();
            // sleep(2000);
        }
        let hasOpen = text("열기").findOne(15000);
        if (hasOpen)
        {
            console.log("open");
            hasOpen.click();
        }

    }
};
const UpdateScript = () => DownLoadApk("LordNine.apk", "LordNine/LordNine.apk");
const DownloadAutoJs = () => DownLoadApk("AutoJs.apk", "AutoJs.apk");

const UI = () =>
{
    ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`);

    ui.web.loadUrl("file://" + files.path("./UI/ui.html"));
    ui.web.jsBridge.registerHandler("StartScript", (data, callBack) =>
    {
        StartScript(data);
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });
    ui.web.jsBridge.registerHandler("UpdateScript", (data, callBack) =>
    {
        UpdateScript();
        AutoInstallApk("LordNine/LordNine.apk");
        callBack("successful");
    });
    ui.web.jsBridge.registerHandler("DownloadAutoJs", (data, callBack) =>
    {
        DownloadAutoJs();
        callBack("successful");
    });
};

console.setGlobalLogConfig({
    "file": "/sdcard/LordNine/log.txt",
    "filePattern": "%d{dd日}%m%n"
});


const floaty_window = floaty.window(
    <frame gravity="center" id="switch" w="12" h="20" bg="#F5EDED" alpha="1">
        <text id="debug" textColor="#7FA1C3"></text>
    </frame>
);


floaty_window.setPosition(10, 650);

floaty_window.switch.click(function ()
{
    console.log("floaty window is clicked!!!");
    let alpha = floaty_window.switch.attr("alpha");
    if (alpha == "1")
    {
        floaty_window.switch.attr("alpha", "0.3");
        threads.shutDownAll();
        console.log("main thread is stoped ");
    }
    else
    {
        floaty_window.switch.attr("alpha", "1");
        mainThread = threads.start(function ()
        {
            isRunning = true;
            threads.start(function ()
            {
                const hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(2000);
                if (hasOpen)
                {
                    hasOpen.click();
                }
            });
            MainFlow(launchData);
        }
        );
    }
});

const Start = (data) =>
{
    RewriteConfig("ui", data);
    MakeSureInGame();
};

const Update = () =>
{
    while (true)
    {
        if (specialConfig.gameMode == "mainStory")
        {
            MainStoryFlow();
        }
        else if (specialConfig.gameMode == "instance")
        {
            InstanceFlow();
        }
        if (specialConfig.gameMode != specialConfig.initGameMode)
        {
            if (Math.abs(specialConfig.lastModeChangeTime.getTime() - new Date().getTime()) / (3600 * 1000) >= 5)
            {
                console.log("--- game mode changed ----");
                console.log("game mode changed over 5 hours");
                console.log("back to main story");
                specialConfig.gameMode = "mainStory";
            }
        }
        ExceptionFlow(specialConfig.gameMode);
        sleep(100);
    }
};

const MainFlow = (data) =>
{
    Start(data);
    Update();
    // app.launch("com.smilegate.lordnine.stove.google");
    // ListenServerFlow();
};

UI();
