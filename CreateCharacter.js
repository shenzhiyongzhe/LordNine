const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, SwipeSlowly,
    ClickSkip,
    FindBlueBtn, FindCheckMark, FindBlackScreen,

} = require("./utils.js");


function GenerateRandomName()
{
    const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
        // "ㄱ", 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
        // 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
        // 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
        // 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ',
    ];

    let name = [];
    for (let i = 0; i < 8; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    return name.join("");
}

// 是否需要选区

const ServerListPopupColorList = [
    ["#c7bf9b", [[10, 0, "#c3bc99"], [17, 0, "#c7bf9b"], [44, 0, "#c2bb98"], [61, 1, "#bab392"]]]
];
const GameMainUIColorList = [
    ["#a1a1a0", [[2, 12, "#b4b4b3"], [34, 5, "#e4e4e3"], [41, 6, "#fdfdfd"], [49, 6, "#ffffff"]]]
];
const CanNotCreateCharacterColorList = [
    ["#862f30", [[5, 0, "#802d2f"], [14, 0, "#8a3031"], [20, 1, "#893031"], [37, -1, "#882f30"]]],
    ["#8b3031", [[7, 0, "#8a3031"], [14, 0, "#8b3031"], [21, 0, "#7e2d2e"], [33, 2, "#8b3031"]]],
    ["#832f2f", [[5, 1, "#893031"], [14, 1, "#8b3031"], [20, 1, "#8b3031"], [34, 1, "#842f2f"]]]
];
const TouchToStartColorList = [
    ["#b3ada6", [[13, -2, "#b7b1ab"], [33, 1, "#b6b1ab"], [52, 1, "#b7b2ae"], [81, 3, "#b6b2ae"]]],
    ["#b4afa8", [[12, 3, "#b6afa9"], [33, 4, "#b6b1ab"], [52, 4, "#b7b2ab"], [71, 3, "#b6b3ae"]]]
];

const RedBtnColorList = [
    ["#381a1a", [[41, -2, "#3d1c1c"], [137, 1, "#3d1d1d"], [120, 27, "#421f1f"], [16, 27, "#432020"]]],
];

const RandPressBlank = () => RandomPress([361, 264, 525, 263]);

//*****************************************************main******************************************** */
const TouchToStartCheck = () => FindMultiColors(TouchToStartColorList, [519, 561, 213, 38]);
const FindRedBtn = (region) => FindMultiColors(RedBtnColorList, region);

const MainUICheck = () => FindMultiColors(GameMainUIColorList, [43, 604, 110, 37]);

const ServerSelectCheck = () => FindMultiColors(ServerListPopupColorList, [590, 68, 98, 39]);
const LaunchGameCheck = () =>
{
    for (let i = 0; i < 30; i++)
    {
        if (TouchToStartCheck())
        {
            RandPressBlank();
            Sleep(15);
            for (let j = 0; j < 30; j++)
            {
                if (MainUICheck())
                {
                    return true;
                }
                Sleep();
            }
        }
        if (ClickSkip())
        {
            Sleep(8);
        }
        Sleep();
    }
    return false;
};


const CreateCharacterFlow = (serverName) =>
{
    console.log("import select server flow");
    const hasServerSelectList = ServerSelectCheck();
    const hasMainUI = MainUICheck();
    const hasStartGame = TouchToStartCheck();
    if (!hasServerSelectList && !hasMainUI && !hasStartGame)
    {
        if (!LaunchGameCheck())
        {
            alert("创建角色失败:1,", "未找到游戏界面");
            return false;
        }
        if (!MainUICheck())
        {
            alert("创建角色失败:2,", "未找到游戏界面");
            return false;
        }
        else
        {
            RandomPress([600, 594, 84, 19]); // select server
            Sleep(3);
        }
        if (!ServerSelectCheck())
        {
            alert("创建角色失败:3,", "未找到服务器列表");
            return false;
        }
    }
    if (hasMainUI)
    {
        console.log("click and select server");
        RandomPress([600, 594, 84, 19]); // select server
        Sleep(3);
    }
    else if (hasStartGame)
    {
        console.log("touch to start game");
        RandPressBlank();
        Sleep(15);
        for (let j = 0; j < 30; j++)
        {
            if (MainUICheck())
            {
                RandomPress([600, 594, 84, 19]); // select server
                Sleep(3);
                break;
            }
            Sleep();
        }
    }
    else if (hasServerSelectList)
    {
        console.log("start select server...");
    }
    const bigServer = parseInt(serverName.slice(0, 1));
    const littleServer = parseInt(serverName.slice(1, 2));
    console.log("server name : " + (bigServer + 1) + "区 " + (littleServer + 1));
    let shiftX = littleServer <= 4 ? littleServer : littleServer - 5;
    let shiftY = littleServer <= 4 ? 0 : 1;
    const serverNameImgList = [];
    for (let i = 0; i < 7; i++)
    {
        let img = ReadImg(`icon/beginner/serverNameList/${i}`);
        if (!img)
        {
            break;
        }
        serverNameImgList.push(img);
    }

    for (let i = 0; i < bigServer; i++)
    {
        SwipeSlowly([750, 600, 400, 10], [750, 370, 400, 10], 3.4);
    }
    let hasServerName = FindImg(serverNameImgList[bigServer], [73, 162, 228, 434]);
    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    if (hasServerName.y > 445)
    {
        SwipeSlowly([750, 500, 400, 10], [750, 400, 400, 10], 1);
    }
    hasServerName = FindImg(serverNameImgList[bigServer], [73, 162, 228, 434]);

    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    const isFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServerName.x + shiftX * 230 - 100, hasServerName.y + shiftY * 110 + 30, 120, 30]);
    console.log("isFull : " + isFull);
    if (isFull)
    {
        alert("创建角色失败,", "服务器已满");
        return false;
    }

    console.log("创建角色,选择服务器成功 " + (bigServer + 1) + "区 " + (littleServer + 1));
    RandomPress([hasServerName.x + shiftX * 230, hasServerName.y + shiftY * 110, 10, 10]);
    Sleep(5);
    RandPressBlank();
    Sleep(25);
    for (let i = 0; i < 500; i++)
    {
        if (FindRedBtn([535, 494, 212, 69]))
        {
            console.log("排队等待中......");
            Sleep(180);
        }
        else
        {
            if (FindRedBtn([535, 494, 212, 69]))
            {
                alert("创建角色失败,", "排队超时");
                return false;
            }
            console.log("^_^ 排队结束");
            Sleep(15);
            break;
        }
    }

    ClickSkip();
    Sleep(5);
    console.log("begin create character...");
    if (!FindBlueBtn([1011, 647, 212, 64]))
    {
        alert("创建失败", "未发现创建按钮");
        return false;
    }

    console.log("点击创建角色");
    RandomPress([1045, 665, 152, 25]); //create btn
    RandomPress([449, 347, 383, 30]); //input box
    setText(GenerateRandomName());
    Sleep();
    RandomPress([1175, 647, 51, 22]); // keyboard confirm btn
    Sleep();
    RandomPress([686, 452, 77, 17]); //confirm
    Sleep();
    RandomPress([685, 452, 84, 19]); //confirm

    for (let i = 0; i < 5; i++)
    {
        Sleep(5);
        if (FindCheckMark([667, 442, 48, 42]))
        {
            console.log("name error, try again");
            RandomPress([449, 347, 383, 30]); //input box
            setText(GenerateRandomName());
            Sleep();
            RandomPress([1175, 647, 51, 22]); // keyboard confirm btn
            RandomPress([685, 452, 84, 19]); //confirm
            RandomPress([685, 452, 84, 19]); //confirm
        }
        else
        {
            console.log("name ok, create character success");
            break;
        }
    }

    Sleep(5);
    let hasStartBtn = false;
    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([930, 640, 264, 69]))
        {
            hasStartBtn = true;
            break;
        }
        Sleep();
    }
    if (!hasStartBtn)
    {
        alert("创建角色成功", "未发现开始按钮");
        return false;
    }
    RandomPress([963, 659, 200, 32]);
    Sleep(30);
    ClickSkip();
    Sleep(3);
    RandomPress([905, 135, 260, 25]);
    return true;
};

module.exports = {
    CreateCharacterFlow,
};
// CreateCharacterFlow("28");
