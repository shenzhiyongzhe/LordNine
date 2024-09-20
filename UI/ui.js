
const serverNameList = document.querySelectorAll("input[name=serverName]");

const startScript = document.querySelector("#startScript");
const updateScript = document.querySelector("#updateScript");
const reset = document.querySelector("#reset");

const UIData = {
    createCharacter: false,
    serverName: "00",
    gameMode: "mainStory",
    monsterMapList: [],
    hangUpMap: "03",
    manualInstance: false
};

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


// //开始按钮点击事件
startScript.addEventListener("click", () =>
{
    $autox.callHandler("StartScript", JSON.stringify(UIData), (callBackData) =>
    {
        startScript.innerHTML = "Stop";
        startScript.style.cssText = "background: red";
        console.log(callBackData);
    });

});

//更新脚本点击事件
updateScript.addEventListener("click", () =>
{
    $autox.callHandler("UpdateScript", "update script", (callBackData) =>
    {
        console.log(callBackData);
    });
});

document.addEventListener("AutoxJsBridgeReady", () =>
{
    console.log("AutoxJsBridegReady");
});

document.querySelector("#downloadAutoJs").addEventListener("click", () =>
{
    $autox.callHandler("DownloadAutoJs", "download autojs", (callBackData) =>
    {
        console.log(callBackData);
    });
});

document.querySelector("#vpnSetting").addEventListener("click", () =>
{
    $autox.callHandler("ChangeVPNSetting", "ChangeVPNSetting", (callBackData) =>
    {
        console.log(callBackData);
    });
});
document.querySelector("input[name=manualInstance]").addEventListener("click", () =>
{
    UIData.manualInstance = document.querySelector("input[name=manualInstance]").checked;
    UIData.gameMode = "instance";
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