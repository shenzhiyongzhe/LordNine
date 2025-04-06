
const { RewriteConfig, specialConfig, LaunchGame, ReadConfig, ReadAccountFile, StopScript, GetRandom } = require("./utils.js");
const { ExceptionFlow } = require("./Exception");
const { MainStoryFlow } = require("./MainStory.js");

const { InstanceFlow } = require("./Instance.js");
const { dhyanaFlow } = require("./dhyana.js");

const version = `${app.versionName}`
const versionColorList = ["#004d40", "#005B8C", "#8a4a9e", "#c54b1f", "#b30000", "#1C2331", "#AE445A", "#EB3678", "#EB3678"]
const versionColor = versionColorList[parseInt(version.split('.')[2])];
let serverName = null;

let loginGoogleDelay = 0;
let createCharacterDelay = 0;
let isDhyana = false;
let isGlobalServer = false;

function Init()
{
    const config = ReadConfig();
    if (config.dhyana)
    {
        console.log("当前配置为禅模式")
        specialConfig.gameMode = "dhyana"
        specialConfig.initGameMode = "dhyana"
        isDhyana = true;
    }
    else
    {
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
    }


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

    threads.start(() =>
    {
        let hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(80000);
        if (hasOpen)
        {
            hasOpen.click();
            sleep(500);
            const img = captureScreen();
            toastLog("分辨率：" + img.getWidth() + " x " + img.getHeight());
        }
    });

    const isSuccess = requestScreenCapture(true);
    if (!isSuccess)
    {
        console.log("截图权限申请失败,重新申请");
        StopScript();
    }

};

const uiFloaty = () =>
{
    const floatyWindow = floaty.window(
        <card gravity="center|top" alpha="1" cardBackgroundColor="#71c9ce" cardCornerRadius="10">
            <text id="stop" color="#ffffff" w="30" h="30" bg="#71c9ce" marginLeft="100">✕</text>
            <vertical gravity="center|top" >
                <text id="delayTime" h='0' gravity="center" color="#ffffff" textSize="40sp" ></text>
                <button id="start" h="40" w="120" color="#ffffff" bg="#a6e3e9" marginTop="20">开始</button>
                <text textSize="14" textStyle="italic" w="120" color={versionColor} marginTop="10" marginLeft="17">version：{version}</text>
                <text id="more" textSize="20" h="25" gravity="center" marginTop="5">﹀</text>
                <linear id="more_container" h="0" w="120" marginTop="5">
                    <text id="loginGoogle" w="70" textSize="12" color="#ffffff"  >谷歌登录</text>
                    <text id="createCharacter" w="70" textSize="12" color="#ffffff" >创建角色</text>
                </linear>
                <horizontal gravity="center">
                    <checkbox id="gameMode_dhyana" w="100" text="模式：禅" textSize="12" checked="{{isDhyana}}" />
                    <checkbox id="globalServer" w="100" text="国际服" textSize="12" />
                </horizontal>

            </vertical>
        </card>
    );
    floatyWindow.setSize(450, 300);
    floatyWindow.setPosition(162, 300);
    GetCaptureScreenPermission()

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

        setTimeout(() =>
        {
            console.log("版本号为：" + version);
            console.log("《《《 游戏开始 》》》");
            console.log("游戏模式为：" + specialConfig.gameMode);
            threads.start(MainFlow);
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
            serverName = name.toString()
            if (serverName === "999")
            {
                console.log("开始随机生成一个服务器");
                if (isGlobalServer)
                {
                    console.log("国际服随机生成");
                    serverName = [8, random(0, 9)]
                }
                else
                {
                    console.log("韩服随机生成");
                    serverName = [random(0, 7), random(0, 9)]
                }
            }
            else
            {
                try
                {
                    const arr = serverName.split(".")
                    arr.map((item, index) => arr[index] = parseInt(item - 1))
                    serverName = arr
                } catch (error)
                {
                    alert(error)
                    console.log(error)
                    StopScript()
                }
            }
            console.log("serverName:" + serverName);
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
        floatyWindow.setSize(450, 450);
        floatyWindow.more_container.attr("h", 30);
        floatyWindow.more.attr("h", 0);
    });

    floatyWindow.gameMode_dhyana.on("check", (checked) =>
    {
        if (checked)
        {
            console.log("打开禅模式");
            config.dhyana = true;
            specialConfig.gameMode = "dhyana"
            specialConfig.initGameMode = "dhyana"
        } else
        {
            console.log("关闭禅模式");
            config.dhyana = false;
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
        }
        RewriteConfig(config)
    })

    floatyWindow.globalServer.on("check", (checked) =>
    {
        if (checked)
        {
            console.log("勾选国际服");
            isGlobalServer = true;
        }
        else
        {
            console.log("取消勾选国际服");
            isGlobalServer = false;
        }
    })
    floatyWindow.stop.click(StopScript);
};

console.setGlobalLogConfig({
    "file": `/sdcard/LordNine/log/${new Date().toJSON().slice(0, 10)}.log`,
    "filePattern": "%d{dd日}%m%n"
});

const stateFloaty = () =>
{
    console.log("脚本logo");
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
        if (specialConfig.gameMode == "dhyana")
        {
            dhyanaFlow()
        }
        else
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


/*只有心跳失败的情况下，才会收到接口返回来的消息*/
function 接收心跳失败方法(心跳失败的结果)
{

    console.log("心跳 错误编码：" + 心跳失败的结果.错误编码 + "   错误消息：" + 心跳失败的结果.错误消息);
    let dialogsValue = dialogs.build({
        title: "提示信息",
        content: "错误编码：" + 心跳失败的结果.错误编码 + "   错误消息：" + 心跳失败的结果.错误消息,
        positive: "确定",
        cancelable: false
    }).on("positive", () =>
    {
        //只要收到心跳错误消息，那么就说明您的软件是非正常运行，那么处理了您的业务逻辑代码后，直接强制把您软件整个关闭吧！
        瑞科验证SDK.强制关闭本应用();
        dialogsValue.dismiss();
    }).show();


}

var 瑞科验证配制参数 =
{
    "平台用户编码": "db2443c69c3d61b0",  //如何获取：后台-->个人中心-->个人详情-->平台用户编码
    "软件编码": "7ed67e3599d2b6d0",     //如何获取：后台-->软件管理-->软件列表-->添加软件-->软件编码
    "软件版本号": "v1.0",               //如果在此设置的版本号与你后台设置的不一样的话，那么会弹出“版本更新”提示界面，后台版本号设置是在：后台-->软件管理-->版本列表，中进行设置
    "通讯方式": 1,                      //1:DES加密通讯方式  3:RC4加密通讯方式，注意：此处设置的值必须与后台设置的一致。在此只能填写1或者3
    "加密Key": "0d9ba790",             //如何获取：后台-->软件管理-->软件列表-->选择一个已添加的软件-->编辑-->通讯方式-->选择DES或者RC4-->加密Key
    "签名盐": "e94b385c",              //如何获取：后台-->软件管理-->软件列表-->选择一个已添加的软件-->编辑-->通讯方式-->选择DES或者RC4-->签名盐
    "接收心跳失败方法": 接收心跳失败方法, //当心跳失败的时候，瑞科验证SDK会调用此方法通知到您软件，然后你可以做相应的处理。注意，此方法是被SDK在线程里面调用的
};

var 瑞科验证SDK = new require('sdk.js')(瑞科验证配制参数);

const codeVerification = () =>
{
    console.log("进行卡密校验")
    let ticketKey = "";
    let isVerifiedSuccessfully = false;
    let 结果
    const config = ReadConfig()
    if (!config.ticketKey)
    {
        console.log("需要输入卡密")
        rawInput("请输入卡密", "", (name) =>
        {
            ticketKey = name;
            结果 = 瑞科验证SDK.卡密登录(ticketKey);
            if (结果.错误编码 != 0)
            {
                delete config.ticketKey;
                RewriteConfig(config)
                alert("登录失败\r\n错误编码：" + 结果.错误编码 + "\r\n错误消息：" + 结果.错误消息)
            }
            else
            {
                console.log("卡密校验成功")
                isVerifiedSuccessfully = true;
            }
        })
    }
    else
    {
        console.log("读取配置卡密")
        ticketKey = config.ticketKey;
        结果 = 瑞科验证SDK.卡密登录(ticketKey);
        if (结果.错误编码 != 0)
        {
            delete config.ticketKey;
            RewriteConfig(config)
            alert("登录失败\r\n错误编码：" + 结果.错误编码 + "\r\n错误消息：" + 结果.错误消息)

        }
        else
        {
            console.log("卡密校验成功")
            isVerifiedSuccessfully = true;
        }
    }


    if (isVerifiedSuccessfully)
    {
        config.ticketKey = ticketKey;
        RewriteConfig(config)
    }
    return isVerifiedSuccessfully;
}


Init()

const needCodeVerification = false;
if (needCodeVerification)
{
    const isVerifiedSuccessfully = codeVerification()
    if (isVerifiedSuccessfully)
    {
        uiFloaty()
    }
}
else
{
    uiFloaty()
}



