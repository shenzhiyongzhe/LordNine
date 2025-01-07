
const { RewriteConfig, Sleep, specialConfig, LaunchGame, ReadConfig, ReadAccountFile, StopScript } = require("./utils.js");
const { ExceptionFlow } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");

const { InstanceFlow } = require("./Instance.js");

const version = `${app.versionName}`

const versionColor = "#16C47F";
let mainThread = null;
let serverName = null;

let loginGoogleDelay = 0;
let createCharacterDelay = 0;

let gameMode = null;

function Init()
{
    const config = ReadConfig();

    if (config.ui || !config.gameMode)
    {
        FormatConfig()
    }

    let needRewrite = false;

    if (!config.delayTime)
    {
        config.delayTime = random(1, 1200)
        needRewrite = true;
    }
    if (!config.randomDayOfTheWeek)
    {
        config.randomDayOfTheWeek = random(1, 7)
        needRewrite = true;
    }
    if (!config.resetHour)
    {
        config.resetHour = random(4, 12)
        console.log("增加新的配置选项：resetHour")
        needRewrite = true;
    }
    if (!config.totalDeathTimes)
    {
        config.totalDeathTimes = 0;
        needRewrite = true;
    }
    if (!config.game.tradingTimes)
    {
        config.game.tradingTimes = 0;
        needRewrite = true;
    }
    if (!config.manufacture)
    {
        config.manufacture = [random(1, 15), random(16, 30)];
        needRewrite = true;
    }

    if (!config.googleAccount || !config.game.vm || config.game.vm.length < 10)
    {
        console.log('@配置不存在账号信息，开始读取账号文件');
        const account = ReadAccountFile();
        config.createCharacterTime = new Date().toJSON()
        config.game.vm = account[3];
        config.googleAccount = account[0];
        config.googlePassword = account[1]
        needRewrite = true;
    }

    if (needRewrite)
    {
        RewriteConfig(config)
    }

    if (config.unlockTrade)
    {
        specialConfig.gameMode = "instance";
        specialConfig.initGameMode = "instance"
    }
    else
    {
        specialConfig.gameMode = "mainStory"
        specialConfig.initGameMode = "mainStory"
    }

    gameMode = config.gameMode;
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
        let hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(10000);
        if (hasOpen)
        {
            hasOpen.click();
        }
    });
};

const FormatConfig = () =>
{
    console.log("格式化配置")
    const config = ReadConfig()
    const formattedConfig = {
        game: {},
        daily: {}
    }
    try
    {
        formattedConfig.gameMode = config.gameMode;
        formattedConfig.delayTime = config.delayTime ? config.delayTime : random(0, 600);
        formattedConfig.resetHour = config.resetHour ? config.resetHour : random(4, 12);
        formattedConfig.randomDayOfTheWeek = config.randomDayOfTheWeek ? config.randomDayOfTheWeek : random(1, 7);
        formattedConfig.unlockTrade = config.unlockTrade ? config.unlockTrade : false;
        formattedConfig.accountSuspended = config.accountSuspended ? config.accountSuspended : false;
        formattedConfig.totalDeathTimes = config.totalDeathTimes ? config.totalDeathTimes : 0;
        formattedConfig.manufacture = config.manufacture ? config.manufacture : [random(1, 15), random(16, 30)];

        formattedConfig.game.today = config.game.today;
        formattedConfig.game.deathTime = config.game.deathTime;
        formattedConfig.game.reconnectionTime = config.game.reconnectionTime ? config.game.reconnectionTime : 0;
        formattedConfig.game.serverName = config.game.serverName ? config.game.serverName : "999";
        formattedConfig.game.name = config.game.name ? config.game.name : '';
        formattedConfig.game.lv = config.game.lv ? config.game.lv : 0;
        formattedConfig.game.autoPotion = config.game.autoPotion ? config.game.autoPotion : false;
        formattedConfig.game.diamond = config.game.diamond ? config.game.diamond : 0;
        formattedConfig.game.monthlyIncome = config.game.monthlyIncome ? config.game.monthlyIncome : 0;
        formattedConfig.game.dailyDiamond = config.game.dailyDiamond ? config.game.dailyDiamond : 0;
        formattedConfig.game.combatPower = config.game.combatPower ? config.game.combatPower : 0;
        formattedConfig.game.tradingTimes = config.game.tradingTimes ? config.game.tradingTimes : 0;
        formattedConfig.game.changeGameSetting = config.game.changeGameSetting ? config.game.changeGameSetting : false;
        formattedConfig.game.engraving_0 = config.game["engraving_0"] ? config.game["engraving_0"] : false;
        formattedConfig.game.engraving_1 = config.game["engraving_1"] ? config.game["engraving_1"] : false;

        formattedConfig.daily.dailyInstance = false;
        formattedConfig.daily.acceptDailyMission = false;
        formattedConfig.daily.hangUpSecretLab = 0;

        formattedConfig.daily.guildDonation = false;
        formattedConfig.daily.dailyShop = false;
        formattedConfig.daily.friendshipDonation = false;
        formattedConfig.daily.friendshipShop = false;

        RewriteConfig(formattedConfig)
        console.log("配置格式化完成")
    } catch (error)
    {
        console.log("格式化失败")
        console.log(error)
    }

}

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
        // defaultAutoStartTime--
        // if (defaultAutoStartTime <= 0)
        // {
        //     toastLog('3分钟未操作，默认开始脚本')
        //     startBtnEvent()
        // }
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

        GetCaptureScreenPermission();

        setTimeout(() =>
        {
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

