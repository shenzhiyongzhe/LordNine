
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    HollowPress,
    FindBlueBtn, HasPageback, PageBack, HasMenu, CloseBackpack,
    IsInCity, SwipeSlowly,
    WaitUntilMenu, WaitUntilPageBack,
    ClickSkip,
    ReadConfig,
    FindBlackScreen,
    HasSkip

} = require("./utils.js");


const CrucifixColorList = [
    ["#bcaa51", [[19, 0, "#bba950"], [10, -10, "#eed967"], [9, 18, "#bca952"], [9, 0, "#1a1d1a"]]]
];
const NoPotionColorList = [
    ["#070101", [[18, 0, "#363635"], [39, 2, "#040000"], [16, 14, "#fefefd"], [21, 14, "#fbfbfa"]]],
    ["#555555", [[3, 0, "#474747"], [1, 6, "#494949"], [0, 19, "#ffffff"], [5, 20, "#fcfcfc"]]],
    ["#70706f", [[3, 8, "#4d4d4d"], [3, 9, "#474747"], [2, 21, "#ffffff"], [7, 23, "#fefefd"]]],
    ["#555555", [[0, 8, "#414140"], [-2, 18, "#fbfbfa"], [4, 18, "#fefefd"], [1, 14, "#f8f8f8"]]]
];
const TouchToStartColorList = [
    ["#ae8852", [[0, 13, "#a47e4f"], [14, -2, "#b8925c"], [15, 8, "#a27c4c"], [15, 17, "#8d673f"]]],
];
const GameMainUIColorList = [
    ["#a1a1a0", [[2, 12, "#b4b4b3"], [34, 5, "#e4e4e3"], [41, 6, "#fdfdfd"], [49, 6, "#ffffff"]]],
    ["#b1b1b1", [[7, 0, "#b7b7b6"], [5, 2, "#b6b6b6"], [3, 8, "#afafaf"], [-3, 13, "#999998"]]]
];
const blueBtnPosList = [
    [[506, 592, 269, 69], [547, 610, 196, 33]], // 制造，确认
    [[655, 444, 200, 64], [689, 462, 139, 30]], //传送，确认
    [[538, 419, 207, 68], [567, 435, 149, 34]], //death 
    [[917, 639, 273, 68], [963, 658, 197, 35]], //start game
    [[1061, 644, 209, 62], [1092, 658, 149, 29]], //horse confirm
];


const NoPotionCheck = () =>
{
    const hasNoPotion = FindMultiColors(NoPotionColorList, [325, 636, 55, 60]);
    if (hasNoPotion)
    {
        console.log("character is use out of  potion. ");
        return true;
    }
    return false;
};
const NoPotionFlow = () =>
{
    console.log("回家买药水...");
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        alert("当前页面没有菜单按钮", "没有药水，无法回城");
    }
    if (!IsInCity())
    {
        RandomPress([46, 253, 19, 19]);
        Sleep(10);
        WaitUntilMenu();
        Sleep(2);
    }

    RandomPress([995, 433, 42, 41]); //grocery store
    Sleep(5);
    if (WaitUntilPageBack())
    {
        RandomPress([154, 93, 164, 39]); //potion
        RandomPress([474, 434, 146, 25]); // 80%
        if (FindBlueBtn([648, 566, 175, 56]))
        {
            RandomPress([667, 578, 133, 29]);
            console.log("购买药水成功！");
        }
        PageBack();
    }
};


const ClickAllBlueBtn = (shot) =>
{
    shot = shot || captureScreen();
    for (let i = 0; i < blueBtnPosList.length; i++)
    {
        let hasBlueBtn = FindBlueBtn(blueBtnPosList[i][0], shot);
        if (hasBlueBtn)
        {
            RandomPress(blueBtnPosList[i][1]);
            break;
        }
    }
};
const CloseAllWindows = () =>
{
    const hasMenu = HasMenu();
    if (hasMenu)
    {
        return;
    }
    CloseMenu();
    PageBack();
    CloseBackpack();
};

const LaunchGameCheck = () => FindBlackScreen([584, 630, 88, 51]);
const TouchToStartCheck = () => FindMultiColors(TouchToStartColorList, [623, 492, 48, 59]);

const MainUICheck = () => FindMultiColors(GameMainUIColorList, [43, 604, 110, 37]);

const RandPressBlank = () => RandomPress([361, 264, 525, 263]);

const HasStartBlueBtn = () => FindBlueBtn([931, 639, 261, 71]);
const PressStartBtn = () => RandomPress([955, 655, 208, 37]);

const LaunchGameFlow = () =>
{
    Sleep(10);
    for (let i = 0; i < 10; i++)
    {
        if (HasSkip())
        {
            ClickSkip();
            Sleep(3);
            TouchToStartFlow();
            break;
        }
        Sleep();
    }

};
const TouchToStartFlow = () =>
{
    console.log("touch to start game flow...");
    RandPressBlank();
    Sleep(22);
    for (let i = 0; i < 30; i++)
    {
        if (MainUICheck())
        {
            Sleep(3);
            RandPressBlank();
            Sleep(5);
            break;
        }
        Sleep();
    }

    for (let i = 0; i < 30; i++)
    {
        if (HasStartBlueBtn())
        {
            PressStartBtn();
            break;
        }
        Sleep();
    }

    for (let i = 0; i < 30; i++)
    {
        if (HasMenu())
        {
            console.log("已经进入游戏！");
            return true;
        }
        Sleep();
    }
    console.log("进入游戏失败！");
    return false;
};
const MainUIFlow = () =>
{
    console.log("main ui flow...");
    RandPressBlank();
    Sleep(5);
    for (let i = 0; i < 30; i++)
    {
        if (HasStartBlueBtn())
        {
            PressStartBtn();
            break;
        }
        Sleep();
    }

    for (let i = 0; i < 30; i++)
    {
        if (HasMenu())
        {
            console.log("已经进入游戏！");
            return true;
        }
        Sleep();
    }
    console.log("进入游戏失败！");
    return false;
};
const IsMoving = () =>
{
    const clip = images.clip(captureScreen(), 180, 187, 42, 35);
    Sleep(3);
    return FindImg(clip, [166, 178, 72, 57]) ? false : true;
};
const GameModeFlow = (mode) =>
{
    if (mode == "mainStory")
    {
        const isInCity = IsInCity();

        if (isInCity)
        {
            const isMoving = IsMoving();
            if (!isMoving)
            {
                console.log("gameMode: " + mode + " not moving! keep on");
                RandomPress([904, 135, 220, 31]);
            }
        }
    }
};

const ExceptionFlow = (gameMode) =>
{
    ClickAllBlueBtn();
    CloseAllWindows();
    if (gameMode == "instance")
    {

        NoPotionCheck() && NoPotionFlow();
    }
    GameModeFlow(gameMode);
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        LaunchGameCheck() && LaunchGameFlow();
        TouchToStartCheck() && TouchToStartFlow();
        MainUICheck() && MainUIFlow();
    }
};
// *******************************************************************  确保在游戏中 *********************************************************************


const MakeSureInGame = () =>
{
    app.launch("com.smilegate.lordnine.stove.google");
    Sleep(3);
    const config = ReadConfig();
    if (config.ui.createCharacter)
    {
        const { CreateCharacterFlow } = require("./CreateCharacter.js");
        CreateCharacterFlow(config.ui.serverName);
    }

    if (HasMenu())
    {
        console.log("already in game...");
        return true;
    }
    if (HasStartBlueBtn())
    {
        PressStartBtn();
        Sleep(10);
        for (let i = 0; i < 30; i++)
        {
            if (HasMenu())
            {
                break;
            }
            Sleep();
        }
    }
    LaunchGameCheck() && LaunchGameFlow();
    TouchToStartCheck() && TouchToStartFlow();
    MainUICheck() && MainUIFlow();
    console.log("make sure in game finished...");
};
// *******************************************************************  确保在游戏中 *********************************************************************

module.exports = {
    ExceptionFlow, MakeSureInGame
};
// GameModeFlow("mainStory");

// MakeSureInGame()

