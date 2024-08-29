
const { WearEquipment, StrengthenEquipment, DecomposeEquipment } = require("./Backpack.js");
const { LoginProps, AddAttributePoint, HasCrucifixIcon, PickUpAbilityPoint } = require("./CommonFlow.js");

const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    HollowPress,
    FindBlueBtn, HasPageback, PageBack, HasMenu, CloseBackpack,
    IsInCity, SwipeSlowly,
    WaitUntilMenu, WaitUntilPageBack,
    ClickSkip,
    ReadConfig,
    HasSkip,
    IsHaltMode,
    ExitHaltMode,

} = require("./utils.js");

const { HasTip } = require("./MainStory.js");

let lastTimeOfBuyingPotion = new Date().getMinutes();

const NoPotionColorList = [
    ["#070101", [[18, 0, "#363635"], [39, 2, "#040000"], [16, 14, "#fefefd"], [21, 14, "#fbfbfa"]]],
    ["#555555", [[3, 0, "#474747"], [1, 6, "#494949"], [0, 19, "#ffffff"], [5, 20, "#fcfcfc"]]],
    ["#70706f", [[3, 8, "#4d4d4d"], [3, 9, "#474747"], [2, 21, "#ffffff"], [7, 23, "#fefefd"]]],
    ["#555555", [[0, 8, "#414140"], [-2, 18, "#fbfbfa"], [4, 18, "#fefefd"], [1, 14, "#f8f8f8"]]]
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
// exception btn
const LongTimeNoInputColorList = [
    ["#ffe9be", [[-1, 6, "#fbe5bc"], [5, 5, "#f1dcb5"], [13, 4, "#224148"], [18, 10, "#edd8b2"]]]
];

const BackpackFullColorList = [
    ["#fda763", [[3, 0, "#fda763"], [6, 0, "#fda763"], [9, 0, "#fda763"], [13, 0, "#fda763"]]]
];
const AddAttributeIconColorList = [
    ["#a8965e", [[7, 0, "#918150"], [13, 0, "#dfc67e"], [8, -8, "#efd587"], [8, 6, "#b5a165"]]]
];
// check ----

const HasAttributeIcon = (shot) => FindMultiColors(AddAttributeIconColorList, [618, 468, 46, 39], shot);
const IsNoPotion = (shot) =>
{
    const hasNoPotion = FindMultiColors(NoPotionColorList, [325, 636, 55, 60], shot);
    if (hasNoPotion)
    {
        console.log("character is use out of  potion. ");
        return true;
    }
    return false;
};
const IsBackpackFull = (shot) => FindMultiColors(BackpackFullColorList, [1145, 48, 36, 13], shot);

// flow -----
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
        else
        {
            RandomPress([953, 77, 242, 503]);
        }
        Sleep();
        PageBack();
    }
};

const BlueBtnCheck = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(LongTimeNoInputColorList, [621, 444, 43, 25], shot))
    {
        console.log("long time no input! click and restart game");
        RandomPress([577, 443, 127, 28]);
        Sleep(5);
        app.launch("");
    }

};

// ------------------------------ make sure in game ---------------------

const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);
const PressBlank = () => RandomPress([361, 264, 525, 263]);

const HasStartBlueBtn = () => FindBlueBtn([931, 639, 261, 71]);
const PressStartBtn = () => RandomPress([955, 655, 208, 37]);


const MainUIFlow = () =>
{
    const hasWhiteAvatar = FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]);
    if (!hasWhiteAvatar)
    {
        Sleep(3);
        PressBlank();
        console.log("touch to start game flow...");
        Sleep(5);
        for (let i = 0; i < 30; i++)
        {
            if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
            {
                break;
            }
            Sleep();
        }
    }
    PressBlank();
    console.log("press to enter game...");
    Sleep(10);

    for (let i = 0; i < 30; i++)
    {
        if (HasStartBlueBtn())
        {
            console.log("press start btn");
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

const ExceptionFlow = () =>
{
    const shot = captureScreen();
    const hasMenu = HasMenu();
    if (hasMenu)
    {
        const isBackpackFull = IsBackpackFull(shot);
        if (isBackpackFull)
        {
            console.log("backpack is full");
            WearEquipment();
            StrengthenEquipment();
            LoginProps();
            DecomposeEquipment();
        }
        const isNoption = IsNoPotion(shot);
        if (isNoption)
        {
            if (new Date().getMinutes() - lastTimeOfBuyingPotion < 10)
            {
                console.log("连续购买药水时间间隔较短，暂不购买");
            }
            else
            {
                console.log("no potion");
                NoPotionFlow();
            }

        }
        HasAttributeIcon(shot) && AddAttributePoint();
        HasCrucifixIcon() && PickUpAbilityPoint();
    }
    else
    {
        if (HasMainUI())
        {
            MakeSureInGame();
        }
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
    }
    BlueBtnCheck(shot);
    PageBack();
    CloseMenu();
    CloseBackpack();
};
// *******************************************************************  确保在游戏中 *********************************************************************


const MakeSureInGame = () =>
{
    app.launch("com.smilegate.lordnine.stove.google");
    Sleep(3);
    console.log("make sure in game flow");

    if (HasMenu())
    {
        console.log("find menu in game! return ");
        return true;
    }
    if (HasTip())
    {
        console.log("exception: found tip! return ");
        return true;
    }
    if (HasPageback())
    {
        console.log("found packback! return true;");
        return true;
    }
    for (let i = 0; i < 15; i++)
    {
        if (HasSkip())
        {
            ClickSkip();
            break;
        }
        else if (HasMainUI())
        {
            break;
        }
        Sleep();
    }
    const config = ReadConfig();
    if (config.ui.createCharacter)
    {
        const { CreateCharacterFlow } = require("./CreateCharacter.js");
        CreateCharacterFlow(config.ui.serverName);
    }
    else
    {
        for (let i = 0; i < 60; i++)
        {
            if (HasMenu())
            {
                console.log("already in game...");
                return true;
            }
            else if (HasStartBlueBtn())
            {
                PressStartBtn();
                Sleep(10);
                for (let i = 0; i < 30; i++)
                {
                    if (HasMenu())
                    {
                        return;
                    }
                    Sleep();
                }
            }

            else if (HasMainUI())
            {
                MainUIFlow();
                return true;
            }
            Sleep(1);
        }
        console.log("make sure in game failed...");
    }

};
// *******************************************************************  确保在游戏中 *********************************************************************

module.exports = {
    ExceptionFlow, MakeSureInGame, HasMainUI
};

// console.time("exception");
// ExceptionFlow();
// console.timeEnd("exception");
// console.log(HasTouchToStart());
// MakeSureInGame();
// DeathFlow();
// GameModeFlow("mainStory");
// ExceptionFlow();
// MakeSureInGame();
// console.log(MainUICheck());

