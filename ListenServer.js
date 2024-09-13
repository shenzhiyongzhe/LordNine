
const { FindImg, ReadImg, FindMultiColors, SwipeSlowly, RestartGame, Sleep, HasSkip, ClickSkip, RandomPress, HasPopupClose, LoadImgList } = require("./utils");


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
const LordNineWordColorList = [
    ["#cca967", [[75, 4, "#deb371"], [138, -6, "#d8b77e"], [195, 3, "#c8a266"], [205, 16, "#a77a40"]]],
    ["#cda465", [[75, -4, "#d8b773"], [139, -8, "#d8b77e"], [189, -5, "#c79959"], [205, 13, "#a67c41"]]],
    ["#dbbb87", [[25, 3, "#be985b"], [49, 8, "#c8a263"], [99, 4, "#e2b980"], [124, 1, "#dab66d"]]]
];
const WhiteAvatarColorList = [
    ["#a4a4a3", [[2, 0, "#b1b1b1"], [7, 1, "#b4b4b3"], [2, 4, "#bababa"], [5, 13, "#b6b6b6"]]],
    ["#a4a4a3", [[1, 0, "#a6a6a5"], [2, 0, "#b1b1b1"], [5, 3, "#b4b4b3"], [3, 10, "#b8b8b8"]]]
];
const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

const ListenServer = () =>
{
    console.log("start server...");

    serverNameImgList = LoadImgList("icon/beginner/serverNameList");

    let hasServer = null;
    let isServerFull = null;
    for (let n = 0; n < 7; n++)
    {
        if (n != 0)
        {
            SwipeSlowly([600, 540, 10, 10], [600, 320, 10, 10], 6);
        }
        hasServer = FindImg(serverNameImgList[n], [73, 162, 228, 434]);
        if (hasServer)
        {
            console.log("find server: " + (n + 1));
            if (hasServer.y > 445)
            {
                SwipeSlowly([750, 500, 10, 10], [750, 400, 10, 10], 1);
            }
            hasServer = FindImg(serverNameImgList[n], [73, 162, 228, 434]);
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