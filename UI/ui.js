

const serverNameList = document.querySelectorAll("input[name=serverName]");
const monsterMapList = document.querySelectorAll("input[name=monsterMap]");

const startScript = document.querySelector("#startScript");
const updateScript = document.querySelector("#updateScript");
const reset = document.querySelector("#reset");

const UIData = {
    createCharacter: false,
    serverName: "00",
    gameMode: "mainStory",
    monsterMapList: []
};

const selects = document.querySelectorAll(".select");
const option_list = document.querySelectorAll(".option-list");
selects.forEach((select, index) => select.addEventListener("click", () => option_list[index].classList.toggle("active")));


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

//怪物图鉴地图选择
const SelectMonsterMap = () =>
{
    monsterMapList.forEach((item) =>
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
