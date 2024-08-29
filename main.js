"ui";

const { RewriteConfig, Sleep, } = require("./utils");
const { ExceptionFlow, MakeSureInGame } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");
const { ListenServerFlow } = require("./ListenServer.js");

let isRunning = false;
let gameConfig = { ui: {}, game: {} };
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
            images.requestScreenCapture(true);
            data = JSON.parse(data);
            launchData = data;
            toast(launchData);

            MainFlow(data);
        }
        );
    }
}
const DownLoadApk = (downloadUrl, savePath) =>
{
    threads.start(function ()
    {
        if (files.exists("/sdcard/AutoJs.apk"))
        {
            app.viewFile("/sdcard/AutoJs.apk");
            let is_sure = textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
            if (is_sure.enabled())
            {
                textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
            }
        }
        else
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
                // sleep(400);
                // click(580, 765);
                // sleep(2000);
                // click(580, 765);
            }
            else
            {
                alert('下载失败');
            }
        }

    });
};
const UpdateScript = function ()
{
    threads.start(function ()
    {
        console.log("start update scripte:");
        const url = "http://10.6.130.129:82/LordNine.apk";
        const apkUrl = "/sdcard/LordNine/LordNine.apk";
        let r = http.client().newCall(
            http.buildRequest(url, {
                method: "GET",
            })
        ).execute();
        files.createWithDirs("/sdcard/LordNine/");
        let fs = new java.io.FileOutputStream(apkUrl);

        let is = r.body().byteStream();
        const buffer = util.java.array("byte", 1024);
        let byteRead; //每次读取的byte数
        while ((byteRead = is.read(buffer)) != -1)
        {
            fs.write(buffer, 0, byteRead); //读取
        }
        if (files.exists(apkUrl))
        {
            app.viewFile(apkUrl);
            sleep(400);
            click(580, 765);
            // sleep(2000);
            // click(580, 765);
        } else
        {
            alert('下载失败');
        }
    });
};
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
// const { ExceptionFlow } = require("./Exception.js");
// const { MainStoryFlow } = require("./MainStory.js");
// const { Sleep } = require("./utils.js");

const floaty_window = floaty.window(
    <frame gravity="center" id="switch" w="42" h="20" bg="#F5EDED" alpha="1">
        <text id="monthlyIncome" textColor="#7FA1C3">ʕ̡̢̡ʘ̅͟͜͡ʘ̲̅ʔ̢̡̢</text>
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
            auto();
            images.requestScreenCapture(true);
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
        MainStoryFlow();
        ExceptionFlow();
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
