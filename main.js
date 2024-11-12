"ui";

const { RewriteConfig, Sleep, specialConfig, LaunchGame, ReadConfig, } = require("./utils");
const { ExceptionFlow } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");

const { InstanceFlow } = require("./Instance.js");

let isRunning = false;

let mainThread;
let launch_ui_config = null;

const GetCaptureScreenPermission = () =>
{
    threads.start(function ()
    {
        auto();
        images.requestScreenCapture(true);
    });

    threads.start(function ()
    {
        let hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(10000);
        if (hasOpen)
        {
            hasOpen.click();
        }
    });
};

const StopScript = () => java.lang.System.exit(0);

function StartScript(uiData)
{
    console.log("JSBridge，页面数据为: " + uiData);

    if (isRunning == true)
    {
        console.log("结束");
        StopScript();
        // engines.stopAllAndToast();
        // exit();
    }
    else if (isRunning == false)
    {
        mainThread = threads.start(function ()
        {
            isRunning = true;
            uiData = JSON.parse(uiData);
            launch_ui_config = uiData;
            specialConfig.gameMode = uiData.gameMode;
            specialConfig.initGameMode = uiData.gameMode;
            MainFlow(uiData);
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

        //     let hasUpdate = textMatches(/(.*업데이트.*|.*更新.*)/).findOne(5000);
        //     if (hasUpdate)
        //     {
        //         hasUpdate.click();
        //         // sleep(2000);
        //     }

        //     let hasOpen = textMatches(/(.*열기.*|.*打开.*)/).findOne(15000);
        //     if (hasOpen)
        //     {
        //         console.log("open");
        //         hasOpen.click();
        //     }
    }
};
const UpdateScript = () => DownLoadApk("LordNine.apk", "LordNine/LordNine.apk");
const UpdateToBetaScript = () => DownLoadApk("LordNineBeta.apk", "LordNine/LordNineBeta.apk");
const DownloadAutoJs = () => DownLoadApk("AutoJs.apk", "AutoJs.apk");
const ChangeVPNSetting = () =>
{
    app.launch("fun.kitsunebi.kitsunebi4android");

    let disallowListConfig = {
        "autoJs": false,
        "lordnine": false,
    };
    threads.start(function ()
    {
        for (let i = 0; i < 10; i++)
        {
            let hasRefreshBtn_0 = desc("Measure Latency").findOne(20);
            if (hasRefreshBtn_0)
            {
                let add_btn = id("add_btn").findOne(20);
                if (add_btn)
                {
                    add_btn.click();
                }
            }
            let has_AddEndpointGroup = text("Add Endpoint Group").findOne(20);
            if (has_AddEndpointGroup)
            {
                let settings = text("Settings").findOne(20);
                if (settings)
                {
                    click(settings.bounds().centerX(), settings.bounds().centerY());
                }
            }

            let per_app_vpn = text("Configure Per-App VPN.").findOne(20);
            if (per_app_vpn)
            {
                if (text("Settings").findOne(20))
                {
                    click(per_app_vpn.bounds().centerX(), per_app_vpn.bounds().centerY());
                }
            }
            let enabled_per_app_vpn = text("Enable Per-App VPN").findOne(20);
            if (enabled_per_app_vpn)
            {
                let enabled_per_app_vpn_switch = enabled_per_app_vpn.parent().parent().children()[1].children()[0];
                let isOpen = enabled_per_app_vpn_switch.checked();
                console.log("分应用代理是否打开：" + isOpen);
                if (!isOpen)
                {

                    console.log("点击打开: " + enabled_per_app_vpn.parent().parent().click());
                }
            }
            let current_list = textMatches(/(.*You may either use the allowed list.*)/).findOne(20);
            if (current_list)
            {
                let hasAllowedList = textMatches(/(.*current Allowed List.*)/).findOne(20);
                if (hasAllowedList)
                {
                    console.log("当前是允许列表，需要改动");
                    click(hasAllowedList.bounds().centerX(), hasAllowedList.bounds().centerY());

                    let has_per_app_mode = id("alertTitle").findOne(1000);
                    if (has_per_app_mode)
                    {
                        let hasMode_disallowedList = text("Disallowed List").findOne(1000);
                        if (hasMode_disallowedList)
                        {
                            hasMode_disallowedList.click();
                        }
                    }
                    let DisallowedList = text("Selected apps are disallowed to use the VPN tunnel, others will be allowed.").findOne(2000);
                    if (DisallowedList)
                    {
                        click(DisallowedList.bounds().centerX(), DisallowedList.bounds().centerY());
                    }
                }
                let hasDisallowedList = textMatches(/(.*current Disallowed List.*)/).findOne(20);
                if (hasDisallowedList)
                {
                    console.log("当前已经是不允许列表，不需要改动");
                }
            }
            let select_disallowedList = textMatches(/(.*Selected apps are disallowed.*)/).findOne(20);
            if (select_disallowedList)
            {
                click(select_disallowedList.bounds().centerX(), select_disallowedList.bounds().centerY());
            }
            //确保当前页面为不允许列表
            if (desc("위로 이동").findOne(20) && text("Disallowed List").findOne(20) && id("add_btn").findOne(20))
            {
                let lordnine = text("com.lordnine").findOne(20);
                if (lordnine)
                {
                    let is_lordnine_on = lordnine.parent().children()[3];
                    if (is_lordnine_on.checked() == true)
                    {
                        console.log("已经打开，不需要操作");
                        disallowListConfig.lordnine = true;
                    }
                    else if (is_lordnine_on.checked() == false)
                    {
                        console.log("autoJs 未打开不允许列表，点击打开");
                        lordnine.parent().click();
                    }
                    let autoJs = text("org.autojs.autoxjs.v6").findOne(20);
                    if (autoJs)
                    {
                        let is_autoJs_on = autoJs.parent().children()[3];
                        if (is_autoJs_on.checked() == true)
                        {
                            console.log("已经打开，不需要操作");
                            disallowListConfig.autoJs = true;
                        }
                        else if (is_autoJs_on.checked() == false)
                        {
                            console.log("autoJs 未打开不允许列表，点击打开");
                            autoJs.parent().click();
                        }
                    }
                    else
                    {
                        console.log("没有发现auto js 默认跳过");
                        disallowListConfig.autoJs = true;
                    }
                }
                else
                {
                    console.log("滚动当前页面");
                    scrollForward();
                }
                if (disallowListConfig.lordnine == true && disallowListConfig.autoJs == true)
                {
                    console.log("已设置完毕，返回到主页面");
                    break;
                }
            }

            Sleep(1);
        }

        for (let i = 0; i < 10; i++)
        {
            let backBtn = desc("위로 이동").findOne(20);
            if (backBtn)
            {
                backBtn.click();
            }
            let refreshBtn = desc("Measure Latency").findOne(20);
            if (refreshBtn)
            {
                refreshBtn.click();
                break;
            }
            Sleep(0.5);
        }
    });

    console.log("设置完毕");
};
const UI = () =>
{
    ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`);

    ui.web.loadUrl("file://" + files.path("./UI/ui.html"));
    ui.web.jsBridge.registerHandler("StartScript", (uiData, callBack) =>
    {
        StartScript(uiData);
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });
    ui.web.jsBridge.registerHandler("UpdateScript", (data, callBack) =>
    {
        UpdateScript();
        // AutoInstallApk("LordNine/LordNine.apk");
        callBack("successful");
    });
    ui.web.jsBridge.registerHandler("UpdateToBetaVersion", (data, callBack) =>
    {
        toast("开始测试版脚本");
        UpdateToBetaScript();

        // AutoInstallApk("LordNine/LordNine.apk");
        callBack("successful");
    });
    ui.web.jsBridge.registerHandler("DownloadAutoJs", (data, callBack) =>
    {
        DownloadAutoJs();
        callBack("successful");
    });
    ui.web.jsBridge.registerHandler("ChangeVPNSetting", (data, callBack) =>
    {
        ChangeVPNSetting();
        callBack("change vpn successfully");
    });
    ui.web.jsBridge.registerHandler("GetCaptureScreenPermission", (data, callBack) =>
    {
        console.log(data);
        GetCaptureScreenPermission();
        callBack("获取屏幕权限成功");
    });
    ui.web.jsBridge.registerHandler("StopScript", (data, callBack) =>
    {
        console.log(data);
        StopScript();
        callBack("ui点击事件：停止脚本");
    });
    setTimeout(() =>
    {
        const localJson = ReadConfig();
        if (!localJson.game.delayTime)
        {
            localJson.game.delayTime = random(0, 600);
            RewriteConfig(localJson);
        }
        ui.web.jsBridge.callHandler("GetConfig", JSON.stringify(localJson), (callBack) =>
        {
            toastLog("读取配置文件成功");
            console.log(JSON.stringify(localJson));
            callBack("set config successfully");
        }
        );
    }, 3000);

};

console.setGlobalLogConfig({
    "file": "/sdcard/LordNine/log.txt",
    "filePattern": "%d{dd日}%m%n"
});
// const react_icon = "file://img/react.png";
const cat_icon = "file://img/cat.png";
const floaty_window = floaty.window(
    <frame gravity="center" id="switch" alpha="1" w="18" h="18" bg="#ffffff">
        {/* <text id="delay" color="#ff5722" h="12" textSize="12sp">999</text> */}

        <img src="{{cat_icon}}"></img>
    </frame>
);

floaty_window.setPosition(0, 682);

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
            MainFlow(launch_ui_config);
        }
        );
    }
});

const Start = (uidata) =>
{
    LaunchGame();
    const config = ReadConfig();
    config.ui = uidata;
    RewriteConfig(config);
    if (uidata.createCharacter == true)
    {
        console.log("开始导入创建角色模块");
        const { CreateCharacterFlow } = require("./CreateCharacter.js");
        CreateCharacterFlow(uidata.serverName);
    }
    Sleep(3);
};

const Update = () =>
{
    while (true)
    {
        ExceptionFlow();

        if (specialConfig.gameMode == "mainStory")
        {
            MainStoryFlow();
        }
        else if (specialConfig.gameMode == "instance")
        {
            InstanceFlow(launch_ui_config);
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
        sleep(100);
    }
};

const MainFlow = (uidata) =>
{
    Start(uidata);
    Update();
};

UI();


