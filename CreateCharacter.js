const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, SwipeSlowly,
    ClickSkip,
    FindBlueBtn, FindCheckMark, FindBlackScreen, PressBlank,
    HasSkip,

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

const LordNineWordColorList = [
    ["#cda465", [[75, -4, "#d8b773"], [139, -8, "#d8b77e"], [189, -5, "#c79959"], [205, 13, "#a67c41"]]],
    ["#dbbb87", [[25, 3, "#be985b"], [49, 8, "#c8a263"], [99, 4, "#e2b980"], [124, 1, "#dab66d"]]]
];
const WhiteAvatarColorList = [
    ["#a4a4a3", [[2, 0, "#b1b1b1"], [7, 1, "#b4b4b3"], [2, 4, "#bababa"], [5, 13, "#b6b6b6"]]],
    ["#a4a4a3", [[1, 0, "#a6a6a5"], [2, 0, "#b1b1b1"], [5, 3, "#b4b4b3"], [3, 10, "#b8b8b8"]]]
];
const ServerListPopupColorList = [
    ["#b2b2b2", [[5, 1, "#bababa"], [2, 4, "#babab9"], [3, 10, "#bcbcbc"], [6, 13, "#b8b8b8"]]]
];

const CanNotCreateCharacterColorList = [
    ["#862f30", [[5, 0, "#802d2f"], [14, 0, "#8a3031"], [20, 1, "#893031"], [37, -1, "#882f30"]]],
    ["#8b3031", [[7, 0, "#8a3031"], [14, 0, "#8b3031"], [21, 0, "#7e2d2e"], [33, 2, "#8b3031"]]],
    ["#832f2f", [[5, 1, "#893031"], [14, 1, "#8b3031"], [20, 1, "#8b3031"], [34, 1, "#842f2f"]]],
    ["#832e2f", [[18, -3, "#8a3031"], [33, -1, "#832e2f"], [44, 0, "#762b2c"], [32, -6, "#862f30"]]],
    ["#8a3031", [[15, 2, "#882f30"], [29, 2, "#872f30"], [41, -2, "#8b3031"], [44, -2, "#8b3031"]]],
];


const RedBtnColorList = [
    ["#381a1a", [[41, -2, "#3d1c1c"], [137, 1, "#3d1d1d"], [120, 27, "#421f1f"], [16, 27, "#432020"]]],
];
const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

const RandPressBlank = () => RandomPress([361, 264, 525, 263]);

//*****************************************************main******************************************** */
const TouchToStartCheck = () => FindMultiColors(TouchToStartColorList, [519, 561, 213, 38]);
const FindRedBtn = (region) => FindMultiColors(RedBtnColorList, region);

const MainUICheck = () => FindMultiColors(GameMainUIColorList, [43, 604, 110, 37]);

const ServerSelectCheck = () => FindMultiColors(ServerListPopupColorList, [902, 113, 29, 33]);


const CreateCharacterFlow = (serverName) =>
{
    console.log("import select server flow");
    const hasServerSelectList = ServerSelectCheck();

    let hasEnterMainUI = false;
    if (hasServerSelectList)
    {
        console.log("start select server...");

    }
    else
    {
        for (let i = 0; i < 30; i++)
        {
            console.log("waite until have main ui...");
            ClickSkip();
            if (HasMainUI())
            {
                console.log("has found main ui...");
                let hasWhiteAvatar = FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]);
                if (!hasWhiteAvatar)
                {
                    Sleep(3);
                    PressBlank();
                    console.log("wait unitl have avatar...");
                    Sleep(5);
                    for (let i = 0; i < 30; i++)
                    {
                        hasWhiteAvatar = FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]);
                        if (hasWhiteAvatar)
                        {
                            hasEnterMainUI = true;
                            console.log("found avatar!!");
                            break;
                        }
                        if (FindBlueBtn([555, 429, 176, 56]))
                        {
                            console.log("server is full !");
                            RandomPress([576, 445, 130, 25]);
                            Sleep(5);
                        }
                        Sleep();
                    }
                }
                else 
                {
                    hasEnterMainUI = true;
                    break;
                }
            }
            Sleep();
        }
        if (hasEnterMainUI)
        {
            console.log("click and select server");
            RandomPress([600, 594, 84, 19]); // select server
            Sleep(3);
        }
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
        SwipeSlowly([600, 550, 10, 10], [600, 320, 10, 10], 3.3);
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
    Sleep(15);
    for (let i = 0; i < 500; i++)
    {
        if (FindRedBtn([535, 494, 212, 69]))
        {
            console.log("排队等待中......");
            Sleep(180);
        }
        else if (HasSkip())
        {
            ClickSkip();
            break;
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

    Sleep(5);
    console.log("begin create character...");
    let hasCreateCharacterBtn = false;
    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([1011, 647, 212, 64]))
        {
            console.log("found create btn! start get a name!");
            hasCreateCharacterBtn = true;
            break;
        }
        Sleep();
    }
    if (hasCreateCharacterBtn)
    {
        console.log("点击创建角色");
        RandomPress([1045, 665, 152, 25]); //create btn
        Sleep();
        RandomPress([449, 347, 383, 30]); //input box
        setText(GenerateRandomName());
        Sleep();
        RandomPress([1175, 647, 51, 22]); // keyboard confirm btn
        Sleep();
        RandomPress([686, 452, 77, 17]); //confirm
        Sleep();
        RandomPress([685, 452, 84, 19]); //confirm 
    }

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

    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([930, 640, 264, 69]))
        {
            RandomPress([963, 659, 200, 32]);
            Sleep(10);
            for (let i = 0; i < 30; i++)
            {
                if (HasSkip())
                {
                    ClickSkip();
                    Sleep(3);
                    RandomPress([905, 135, 260, 25]);
                    console.log("create character flow finished!!! oh yeah!!!");
                    return true;
                }
                Sleep();
            }


        }
        Sleep();
    }
};

module.exports = {
    CreateCharacterFlow,
};
// CreateCharacterFlow("28");
// console.log(HasMainUI());