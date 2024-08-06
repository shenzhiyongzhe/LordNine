"ui";

const { RewriteConfig, Sleep, } = require("./utils");
const { ExceptionFlow, MakeSureInGame } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");

let isRunning = false;
let gameConfig = { ui: {}, game: {} };

function StartScript(data)
{
    if (isRunning == true)
    {
        console.log("结束");
        java.lang.System.exit(0);
        // engines.stopAllAndToast();
        // exit();
    }
    else if (isRunning == false)
    {
        threads.start(function ()
        {
            isRunning = true;
            auto();
            images.requestScreenCapture(true);
            MainFlow(data);
        }
        );
    }
}
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
};

console.setGlobalLogConfig({
    "file": "/sdcard/NineLord/log.txt",
    "filePattern": "%d{dd日}%m%n"
});
// const { ExceptionFlow } = require("./Exception.js");
// const { MainStoryFlow } = require("./MainStory.js");
// const { Sleep } = require("./utils.js");





const MainFlow = (data) =>
{
    toastLog("脚本已启动" + data);
    data = JSON.parse(data);
    RewriteConfig("ui", data);
    MakeSureInGame();
    const gameMode = data.gameMode;
    while (true)
    {
        MainStoryFlow();
        ExceptionFlow(gameMode);
        Sleep(2);
    }
};

UI();
