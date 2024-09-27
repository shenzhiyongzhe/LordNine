
const { FindImg, ReadImg, FindMultiColors, SwipeSlowly, RestartGame, Sleep, HasSkip, ClickSkip, RandomPress, HasPopupClose, LoadImgList, FindImgInList } = require("./utils");

const { LordNineWordColorList, WhiteAvatarColorList } = require("./Color/ExceptionColorList.js");

const CanNotCreateCharacterColorList = [
    ["#862f30", [[5, 0, "#802d2f"], [14, 0, "#8a3031"], [20, 1, "#893031"], [37, -1, "#882f30"]]],
    ["#8b3031", [[7, 0, "#8a3031"], [14, 0, "#8b3031"], [21, 0, "#7e2d2e"], [33, 2, "#8b3031"]]],
    ["#832f2f", [[5, 1, "#893031"], [14, 1, "#8b3031"], [20, 1, "#8b3031"], [34, 1, "#842f2f"]]],
    ["#832e2f", [[18, -3, "#8a3031"], [33, -1, "#832e2f"], [44, 0, "#762b2c"], [32, -6, "#862f30"]]],
    ["#8a3031", [[15, 2, "#882f30"], [29, 2, "#872f30"], [41, -2, "#8b3031"], [44, -2, "#8b3031"]]],
    ["#8b3031", [[5, 0, "#8a3031"], [16, 5, "#832e2f"], [32, 2, "#892f31"], [50, 0, "#8b3031"]]],
    ["#8b3031", [[20, 1, "#8b3031"], [32, 4, "#882f30"], [45, -2, "#882f30"], [49, 2, "#7d2d2e"]]],
    ["#8b3031", [[14, 0, "#8b3031"], [20, 0, "#8b3031"], [33, 3, "#8b3031"], [50, 2, "#8b3031"]]]
];
const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

const ListenServer = () =>
{
    console.log("start server...");

    let serverNameImgList = [];
    for (let i = 0; i < 7; i++)
    {
        let imgList = LoadImgList(`icon/beginner/serverNameList/${i}`);
        serverNameImgList.push(imgList);
    }

    let hasServer = null;
    let isServerFull = null;
    for (let n = 0; n < 7; n++)
    {
        if (n != 0)
        {
            SwipeSlowly([600, 540, 10, 10], [600, 320, 10, 10], 6);
        }
        hasServer = FindImgInList(serverNameImgList[n], [73, 162, 228, 434]);
        if (hasServer)
        {
            console.log("find server: " + (n + 1));
            if (hasServer.y > 445)
            {
                SwipeSlowly([750, 500, 10, 10], [750, 400, 10, 10], 1);
            }
            hasServer = FindImgInList(serverNameImgList[n], [73, 162, 228, 434]);
            for (let i = 0; i < 2; i++)
            {
                for (let j = 0; j < 5; j++)
                {
                    isServerFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServer.x + j * 230 - 100, hasServer.y + i * 110 + 20, 120, 40]);
                    // console.log("region: " + "{" + (hasServer.x + j * 230 - 100) + "," + (hasServer.y + i * 110 + 20) + "," + 120 + "," + 40 + "}");
                    if (!isServerFull)
                    {
                        console.log("server is not full: " + (n + 1) + "大区" + (5 * i + j + 1) + "小区");
                        return true;
                    }
                }
            }
            console.log("--------------------------------");
        }
    }
    for (let i = 0; i < 6; i++)
    {
        SwipeSlowly([600, 250, 10, 10], [600, 550, 10, 10], 1);
    }
    return false;
};

const ListenServerFlow = () =>
{
    let time = null;
    let hasAvalableServer = false;
    let lastTime = null;
    while (hasAvalableServer == false)
    {
        time = new Date().getMinutes();
        if (lastTime != time)
        {
            console.log("正在监听服务器中，当前分钟为：" + time);
            lastTime = time;
        }
        if (time == 20 || time == 40 || time == 59)
        {
            for (let i = 0; i < 10; i++)
            {
                if (HasMainUI())
                {
                    let hasWhiteAvatar = FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]);
                    if (!hasWhiteAvatar)
                    {
                        Sleep(3);
                        RandomPress([586, 583, 117, 36]);
                        Sleep(5);
                    } else
                    {

                        RandomPress([573, 584, 130, 38]);
                    }
                }
                else if (HasPopupClose([1163, 64, 54, 52]))
                {
                    break;
                }
            }
            hasAvalableServer = ListenServer();
        }

        else if (time == 30)
        {
            RestartGame("com.smilegate.lordnine.stove.google");
            out: for (let i = 0; i < 30; i++)
            {
                if (HasSkip())
                {
                    ClickSkip();
                    Sleep(5);

                }
                if (HasMainUI())
                {
                    let hasWhiteAvatar = FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]);
                    if (!hasWhiteAvatar)
                    {
                        Sleep(3);
                        RandomPress([586, 583, 117, 36]);
                        Sleep(5);
                    }
                }
                else if (HasPopupClose([1168, 66, 47, 47]))
                {
                    console.log("enter server list page success...");
                    break out;
                }
                Sleep();

            }
        }
        Sleep(10);
    }
    return hasAvalableServer;
};


module.exports = { ListenServer, ListenServerFlow };

// ListenServerFlow();
// console.log(FindImg(ReadImg(`icon/beginner/serverNameList/${4}`), [73, 162, 228, 434]));
// console.log(FindMultiColors(CanNotCreateCharacterColorList, [291, 326, 101, 41]));