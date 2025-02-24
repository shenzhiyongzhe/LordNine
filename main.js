
const { RewriteConfig, Sleep, specialConfig, LaunchGame, ReadConfig, ReadAccountFile, StopScript, GetRandom } = require("./utils.js");
const { ExceptionFlow } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");

const { InstanceFlow } = require("./Instance.js");

const version = `${app.versionName}`
const versionColorList = ["#004d40", "#005B8C", "#8a4a9e", "#c54b1f", "#b30000", "#1C2331", "#AE445A", "#EB3678", "#EB3678"]
const versionColor = versionColorList[parseInt(version.split('.')[2])];
let mainThread = null;
let serverName = null;

let loginGoogleDelay = 0;
let createCharacterDelay = 0;

let gameMode = null;

function Init()
{
    const config = ReadConfig();

    if (config.unlockTrade)
    {
        specialConfig.gameMode = "instance";
        specialConfig.initGameMode = "instance"
        config.gameMode = "instance"
    }
    else
    {
        specialConfig.gameMode = "mainStory"
        specialConfig.initGameMode = "mainStory"
        config.gameMode = "mainStory"
    }

    gameMode = config.gameMode;


    if (!config.delayTime)
    {
        config.delayTime = random(1, 1200)
    }
    if (!config.randomDayOfTheWeek || typeof config.randomDayOfTheWeek != "object")
    {
        config.randomDayOfTheWeek = [random(1, 7), GetRandom() > 50 ? random(1, 7) : 0, GetRandom() > 50 ? random(1, 7) : 0]
    }
    if (!config.resetHour)
    {
        config.resetHour = random(8, 22)
        console.log("增加新的配置选项：resetHour")
    }
    if (!config.totalDeathTimes)
    {
        config.totalDeathTimes = 0;
    }
    if (!config.game.tradingTimes)
    {
        config.game.tradingTimes = 0;
    }
    if (!config.manufacture)
    {
        config.manufacture = [random(1, 15), random(16, 30)];
    }
    if (!config.randomEventTime)
    {
        config.randomEventTime = [
            `${random(8, 12).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
            `${random(13, 17).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
            `${random(18, 22).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
        ];
    }
    if (!config.dailyTradingHours)
    {
        config.dailyTradingHours = [
            `${random(8, 12).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
            `${random(13, 17).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
            `${random(18, 22).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
        ];
    }
    if (!config.autoHuntingTime)
    {
        config.autoHuntingTime = `${random(0, 23).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`
    }
    if (!config.daily.dailyHunting)
    {
        config.daily.dailyHunting = false;
    }
    if (!config.accountInfo || Object.keys(config.accountInfo).length != 5)
    {
        console.log('@配置不存在账号信息，开始读取账号文件');
        const { id, instance, account, password, auxiliary_mailbox } = ReadAccountFile();
        const accountInfo = {
            id,
            instance,
            account,
            password,
            auxiliary_mailbox
        }
        // console.log(`${id} ${instance} ${account} ${password} ${auxiliary_mailbox}`);
        config.accountInfo = accountInfo;
    }
    if (!config.equipments || !config.equipments.ring)
    {
        config.equipments = {
            helmet: null,
            guard: null,
            pants: null,
            gloves: null,
            boots: null,
            cloak: null,

            earring: null,
            necklace: null,
            bracelet: null,
            ring: null,
            belt: null,
        }
    }
    if (config.daily.dailyTrading == undefined)
    {
        config.daily.dailyTrading = false;
    }
    if (config.daily.dailyTradingTimes == undefined)
    {
        config.daily.dailyTradingTimes = random(1, 3)
    }
    RewriteConfig(config)

}

const GetCaptureScreenPermission = () =>
{
    threads.start(function ()
    {
        auto();
        images.requestScreenCapture(true);
    });
    threads.start(function ()
    {
        let hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(800000);
        if (hasOpen)
        {
            hasOpen.click();
        }
        else
        {
            console.log("获取截图权限失败");
            StopScript()
        }
    });
};


const uiFloaty = () =>
{
    Init()
    const floatyWindow = floaty.window(
        <card gravity="center|top" alpha="1" cardBackgroundColor="#71c9ce" cardCornerRadius="10">
            <text id="stop" color="#ffffff" w="30" h="30" bg="#71c9ce" marginLeft="85">✕</text>
            <vertical gravity="center|top" >
                <text id="delayTime" h='0' gravity="center" color="#ffffff" textSize="40sp" ></text>
                <button id="start" h="40" w="120" color="#ffffff" bg="#a6e3e9" marginTop="20">开始</button>
                <text id="more" textSize="20" h="25" gravity="center" marginTop="10">﹀</text>
                <vertical id="more_container" gravity="center" h="0" marginTop="10">
                    <radiogroup orientation="horizontal" gravity="center" color="#ffffff">
                        <radio id="mainStory" text="主线" textSize="10" checked="{{gameMode == 'mainStory' ? true : false}}" />
                        <radio id="instance" text="挂机" textSize="10" checked="{{gameMode == 'instance' ? true : false}}" />
                    </radiogroup>
                    <horizontal gravity="center">
                        <text id="createCharacter" w="60" textSize="12" color="#ffffff">创建角色</text>
                        <text textSize="12" textStyle="italic" color={versionColor} >版本：{version}</text>
                    </horizontal>
                    <linear orientation="horizontal" gravity="center" >
                        <text id="loginGoogle" w="60" textSize="12" color="#ffffff" >谷歌登录</text>
                    </linear>
                </vertical>
            </vertical>
        </card>
    );

    floatyWindow.setSize(400, 270);
    floatyWindow.setPosition(185, 300);

    const config = ReadConfig()

    const uiInterval = setInterval(() =>
    {
    }, 1000);

    floatyWindow.start.click(() =>
    {
        const totalDelayTime = config.delayTime + loginGoogleDelay + createCharacterDelay;
        let count = totalDelayTime
        floatyWindow.delayTime.attr("h", 60);
        floatyWindow.start.attr("h", 0);
        floatyWindow.delayTime.setText(`${count}s`);
        console.log(`游戏延迟${totalDelayTime}s,等待启动中...`);
        const delayInterval = setInterval(() =>
        {
            ui.run(() =>
            {
                floatyWindow.delayTime.setText(`${count}s`);
            });
            count--;
            if (count <= 0)
            {
                clearInterval(delayInterval);
                floatyWindow.close()
            }
        }, 1000);
        try
        {
            GetCaptureScreenPermission();

        }
        catch (error)
        {
            alert("异常", "获取截图权限失败。")
        }

        setTimeout(() =>
        {
            console.log("版本号为：" + version);
            console.log("《《《 游戏开始 》》》");
            console.log("游戏模式为：" + specialConfig.gameMode);
            mainThread = threads.start(MainFlow);
            clearInterval(uiInterval);
        }, (totalDelayTime + 1) * 1000);
    });

    floatyWindow.createCharacter.click(() =>
    {
        dialogs.input("请输入延迟时间（单位 秒）", "15000", (time) =>
        {
            console.log("登录谷歌延迟时间为:" + time);
            createCharacterDelay = parseInt(time);
            createCharacterDelay = random(0, createCharacterDelay) + 1;
            toastLog(`延迟时间为${createCharacterDelay + config.delayTime}s`)
        });
        dialogs.input("请输入区服编号", "999", (name) =>
        {
            console.log("serverName:" + name);
            serverName = name;
        });
    });

    floatyWindow.loginGoogle.click(() =>
    {
        dialogs.input("请输入延迟时间（单位 秒）", "3", (time) =>
        {
            console.log("登录谷歌延迟时间为:" + time);
            loginGoogleDelay = parseInt(time);
            loginGoogleDelay = random(0, loginGoogleDelay) + 1
            toastLog(`延迟时间为${loginGoogleDelay + config.delayTime}s`)
        });
    });

    floatyWindow.more.click(() =>
    {
        floatyWindow.setSize(400, 400);
        floatyWindow.more_container.attr("h", 80);
        floatyWindow.more.attr("h", 0);
    });

    floatyWindow.stop.click(StopScript);

    floatyWindow.mainStory.click(() =>
    {
        gameMode = "mainStory";
        config.gameMode = "mainStory";
        config.unlockTrade = false;
        console.log("悬浮窗点击事件：更改模式为主线")
        RewriteConfig(config);
    });

    floatyWindow.instance.click(() =>
    {
        gameMode = "instance";
        config.gameMode = "instance";
        console.log("悬浮窗点击事件：更改模式为挂机")
        config.unlockTrade = true;
        RewriteConfig(config);

    });
};

console.setGlobalLogConfig({
    "file": `/sdcard/LordNine/log/${new Date().toJSON().slice(0, 10)}.log`,
    "filePattern": "%d{dd日}%m%n"
});

const stateFloaty = () =>
{
    const floaty_window = floaty.window(
        <frame gravity="center" id="switch" w="18" h="18" >
            <text color="#ffffff">🎯</text>
        </frame>
    );
    floaty_window.setPosition(0, 682);
    floaty_window.switch.click(() => threads.shutDownAll());
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
            InstanceFlow();
        }
        if (specialConfig.gameMode != specialConfig.initGameMode)
        {
            if (Math.abs(specialConfig.lastModeChangeTime.getTime() - new Date().getTime()) / (3600 * 1000) >= 4)
            {
                console.log("--- game mode changed ----");
                console.log("game mode changed over 5 hours");
                const config = ReadConfig()
                if (config.unlockTrade)
                {
                    specialConfig.gameMode = "instance"
                }
                else
                {
                    specialConfig.gameMode = "mainStory";
                }
                specialConfig.lastModeChangeTime = new Date()
            }
        }
        sleep(100);
    }
};

const MainFlow = () =>
{
    stateFloaty();
    LaunchGame();
    if (serverName != null)
    {
        console.log("开始导入创建角色模块");
        const { CreateCharacterFlow } = require("./CreateCharacter.js");
        CreateCharacterFlow(serverName);
        console.log("&&& 创建角色流程结束 &&&")
    }
    if (loginGoogleDelay != 0)
    {
        console.log("仅谷歌登录")
        const { temporaryLoginGoogle } = require("./CreateCharacter.js");
        temporaryLoginGoogle()
    }
    Update();
};

uiFloaty()

