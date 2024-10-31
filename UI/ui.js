
const serverNameList = document.querySelectorAll("input[name=serverName]");

const startScript = document.querySelector("#startScript");

// const reset = document.querySelector("#reset");
const countdown = document.querySelector("#countdown");
const gameModeNode = document.querySelectorAll("input[name=gameMode]");

let countdownEnds = false;
const UIData = {
    createCharacter: false,
    serverName: "00",
    gameMode: "mainStory",
    monsterMapList: [],
    hangUpMap: "03",
};
let delayTime = null;
//下拉菜单的点击事件
const selects = document.querySelectorAll(".select");
const option_list = document.querySelectorAll(".option-list");
selects.forEach((select, index) => select.addEventListener("click", () => option_list[index].classList.toggle("active")));

//主线副本的模式选择
document.querySelectorAll("input[name=gameMode]").forEach(item => item.addEventListener("click", () => UIData.gameMode = item.value));

const SelectServer = () =>
{
    const createCharacter = document.querySelector("input[name=createCharacter]");

    serverNameList.forEach((item) =>
    {
        item.addEventListener("click", () =>
        {
            UIData.serverName = item.value;
        });
    }
    );

    createCharacter.addEventListener("click", () =>
    {
        UIData.createCharacter = createCharacter.checked;
    });
};
SelectServer();

document.addEventListener("AutoxJsBridgeReady", () =>
{
    console.log("AutoxJsBridegReady");
});

//读取本地配置
$autox.registerHandler("GetConfig", (data, callBack) =>
{
    const config = JSON.parse(data);

    UIData.gameMode = config.ui.gameMode;
    UIData.serverName = config.ui.serverName;
    UIData.hangUpMap = config.ui.hangUpMap;
    delayTime = config.game.delayTime || random(0, 600);
    if (UIData.gameMode == "mainStory")
    {
        gameModeNode[0].checked = "true";
    }
    else if (UIData.gameMode == "instance")
    {
        gameModeNode[1].checked = "true";
    }
    setTimeout(() =>
    {
        //回调安卓
        callBack(data);
    }, 1000);

});


const ShowCountDownPopup = (delayTime, func) =>
{
    countdownEnds = false;
    countdown.style.cssText = "height: 140px";
    countdown.innerHTML = `${delayTime}s`;
    let countdownTime = delayTime;
    let countInterval = setInterval(() =>
    {
        countdownTime--;
        countdown.innerHTML = `${countdownTime}s`;
        if (countdownTime < 0)
        {
            countdown.style.cssText = "height: 0";
            countdown.innerHTML = '';
            countdownEnds = true;
            clearInterval(countInterval);

        }
    }, 1000);
    let excuteFunc = setInterval(() =>
    {
        if (countdownEnds)
        {
            func();
            clearInterval(excuteFunc);
        }
    }, 1000);
};
// //开始按钮点击事件
startScript.addEventListener("click", () =>
{
    if (startScript.innerHTML == "Stop")
    {
        $autox.callHandler("StopScript", "ui点击指令：停止运行脚本", (callBackData) =>
        {
            console.log(callBackData);
        });
    }
    else
    {
        $autox.callHandler("GetCaptureScreenPermission", "get captureScreen permission", (callBackData) =>
        {
            console.log(callBackData);
        });

        ShowCountDownPopup(delayTime, () =>
        {
            $autox.callHandler("StartScript", JSON.stringify(UIData), (callBackData) =>
            {
                startScript.innerHTML = "Stop";
                startScript.style.cssText = "background: red";
                console.log(callBackData);
            });
        });
    }

});

//更新脚本点击事件
document.querySelector("#updateScript").addEventListener("click", () =>
{
    $autox.callHandler("UpdateScript", "update script", (callBackData) =>
    {
        console.log(callBackData);
    });
});

//更新至测试版脚本
document.querySelector("#updateToBetaVersion").addEventListener("click", () =>
{
    $autox.callHandler("UpdateToBetaVersion", "更新至测试版脚本", (callBackData) =>
    {
        console.log(callBackData);
    });
});



//下载autojs
document.querySelector("#downloadAutoJs").addEventListener("click", () =>
{
    $autox.callHandler("DownloadAutoJs", "download autojs", (callBackData) =>
    {
        console.log(callBackData);
    });
});

//更改vpn设置
document.querySelector("#vpnSetting").addEventListener("click", () =>
{
    $autox.callHandler("ChangeVPNSetting", "ChangeVPNSetting", (callBackData) =>
    {
        console.log(callBackData);
    });
});

//怪物图鉴地图选择
const SelectMonsterMap = () =>
{
    const monsterMapNodeList = document.querySelectorAll("input[name=monsterMap]");

    monsterMapNodeList.forEach((item) =>
    {
        item.addEventListener("click", () =>
        {
            if (item.checked == true)
            {
                UIData.monsterMapList.push(item.value);
            }
            else
            {
                UIData.monsterMapList = UIData.monsterMapList.filter(map => map != item.value);
            }
        });
    }
    );
};
SelectMonsterMap();

//选择挂机地图的点击事件
const SelectHangUpMap = () =>
{
    const hangUpMapNodeList = document.querySelectorAll("input[name=hangUpWildMap]");
    hangUpMapNodeList.forEach(item =>
    {
        item.addEventListener("click", () =>
        {
            UIData.hangUpMap = item.value;
        });
    });
};
SelectHangUpMap();



$autox.registerHandler("ShowCountDownPopup", (data, callBack) =>
{
    ShowCountDownPopup(parseInt(data), () => console.log("倒计时结束"));
    callBack(`show count down popup callback: 倒计时结束 ${data}`);
});