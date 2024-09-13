

const {
    ClickSkip, CloseMenu,
    ExitHaltMode,
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu,
    HollowPress,
    FindBlueBtn, HasPageback, PageBack, HasMenu, CloseBackpack,
    GetVerificationCode,
    IsInCity, SwipeSlowly,
    WaitUntilMenu, WaitUntilPageBack,
    ReadConfig,
    HasSkip,
    IsHaltMode,
    LoadImgList, IsBackpackFull, LaunchGame,
    RewriteConfig,
    FindImgInList,
    HasPopupClose,
    RestartGame,

} = require("./utils.js");

const { WearEquipments, StrengthenEquipment, DecomposeEquipment } = require("./Backpack.js");

const { LoginProps } = require("./CommonFlow.js");

const { HasTip } = require("./MainStory.js");

const { NoPotionColorList, LordNineWordColorList, WhiteAvatarColorList } = require("./Color/ExceptionColorList.js");

let lastTimeOfBuyingPotion = 99;
let lastDebugModeTime = 0;
let lastGetVerificationCodeTime = 0;
let totalGetVerificationCodeTimes = 0;

let lastGetFullScreen = new Date().getTime(); // 异常判断，每10分钟截屏一次
let fullScreenClip = null;

let gameConfig = ReadConfig();
gameConfig = gameConfig.game;


const ExceptionImgList = {
    disconnection: LoadImgList("special/disconnection"),
    preventAutoLogin: LoadImgList("special/preventAutoLogin"),
};

const popupCloseRegionList = [
    [989, 54, 59, 52]
];
// flow -----
const NoPotionFlow = (shot) =>
{
    const hasNoPotion = FindMultiColors(NoPotionColorList, [325, 636, 55, 60], shot);
    const hasNoPotion_haltMode = FindMultiColors(NoPotionColorList, [1143, 639, 61, 68], shot);
    if (hasNoPotion || hasNoPotion_haltMode)
    {
        console.log("character is use out of  potion. ");
        const buyPotionInterval = Math.abs(lastTimeOfBuyingPotion - new Date().getHours());
        if (buyPotionInterval < 1) 
        {
            console.log("连续购买药水时间间隔较短，不重复购买");
            console.log("last time of buying potion: " + lastTimeOfBuyingPotion);
            console.log("current time: " + new Date().getHours());
            console.log("interval: " + buyPotionInterval);
            return true;
        }

        console.log("回家买药水...");
        lastTimeOfBuyingPotion = new Date().getHours();

        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        const hasMenu = HasMenu();
        if (!hasMenu)
        {
            console.log("未发现菜单按钮");
            return false;
        }
        if (!IsInCity())
        {
            console.log("不在主城，先传送回家");
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
    }
};
const BackpackFullFlow = (shot) =>
{
    const isBackpackFull = IsBackpackFull(shot);
    if (isBackpackFull)
    {
        console.log("backpack is full");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }
};
const DisconnectionFlow = (shot) =>
{
    let hasDisconnection = false;
    for (let i = 0; i < ExceptionImgList.disconnection.length; i++)
    {
        hasDisconnection = FindImg(ExceptionImgList.disconnection[i], [451, 264, 381, 225], shot);
        if (hasDisconnection)
        {
            break;
        }
    }
    if (hasDisconnection)
    {
        console.log("game disconnection");
        let hasBlueBtn = FindBlueBtn([446, 323, 396, 173]);
        if (hasBlueBtn)
        {
            RandomPress([hasBlueBtn.x, hasBlueBtn.y, 15, 5]);
            const delayTime = random(300, 600);
            console.log("延迟启动时间: " + delayTime + "s");
            Sleep(delayTime);
            LaunchGame();
            if (typeof gameConfig.reconnectionTime == "number")
            {
                gameConfig.reconnectionTime++;
            }
            else
            {
                gameConfig.reconnectionTime = 1;
            }
            console.log("重连次数: " + gameConfig.reconnectionTime);
            RewriteConfig("game", gameConfig);
            if (gameConfig.reconnectionTime >= 100)
            {
                console.log("重连次数超过100次，退出游戏");
                alert("Disconnection", "重连次数超过100次，退出游戏");
            }
        }
    }

};
const InputVerificationFlow = (shot) =>
{
    const hasPreventAutoLogin = FindImgInList(ExceptionImgList.preventAutoLogin, [535, 205, 206, 55], shot);
    if (hasPreventAutoLogin)
    {
        console.log("发现防自动登录窗口,开始获取验证码并输入");
        const getVerificationCodeTimeInterval = Math.abs(lastGetVerificationCodeTime - new Date().getMinutes());
        if (getVerificationCodeTimeInterval < 1)
        {
            console.log("获取验证码间隔时间太短,跳过获取验证码");
            return true;
        }
        if (totalGetVerificationCodeTimes >= 10)
        {
            alert("获取验证码次数过多", "获取验证码次数过多");
            return true;
        }
        const code = GetVerificationCode();
        console.log("验证码为: " + code);
        totalGetVerificationCodeTimes++;


        RandomPress([476, 422, 331, 21]);
        setText(code);
        const hasConfirm = textMatches(/(.*확인.*|.*确认.*)/).findOne(100);
        if (hasConfirm)
        {
            hasConfirm.click();
            Sleep();
        }
        RandomPress([1172, 667, 85, 37]);
        const hasBlueConfirm = FindBlueBtn([503, 328, 279, 184]);
        if (hasBlueConfirm)
        {
            click(hasBlueConfirm.x, hasBlueConfirm.y);
        }
    }
};
const MainUIFlow = (shot) =>
{
    if (FindMultiColors(LordNineWordColorList, [313, 333, 728, 354], shot))
    {
        if (FindMultiColors(WhiteAvatarColorList, [32, 600, 52, 49], shot))
        {
            PressBlank();
            console.log("find main ui find white avatar");
        }
        else
        {
            console.log("find main ui");
            PressBlank();
        }
    }
};


const PressBlank = () => RandomPress([361, 264, 525, 263]);

const HasStartBlueBtn = () => FindBlueBtn([931, 639, 261, 71]);
const PressStartBtn = () => RandomPress([955, 655, 208, 37]);

const ResetConfig = () =>
{
    if (gameConfig.today != new Date().getDate())
    {
        console.log("reset config");
        gameConfig.today = new Date().getDate();
        gameConfig.deathTime = 0;
        gameConfig.reconnectionTime = 0;
        RewriteConfig("game", gameConfig);
    }
};

const ReLoginFlow = () =>
{
    const hasGoogleLogin = textMatches(/(.*Google.*)/).findOne(20);
    if (hasGoogleLogin)
    {
        hasGoogleLogin.parent().click();
    }
    const hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*)/).findOne(20);
    if (hasSelectAccount)
    {
        const hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20).parent().parent();
        if (hasAccount)
        {
            hasAccount.click();
        }
    }

};
const ClosePopupWindows = (shot) =>
{
    let hasPopup = null;
    for (let i = 0; i < popupCloseRegionList.length; i++)
    {
        hasPopup = HasPopupClose(popupCloseRegionList[i], shot);
        if (hasPopup)
        {
            console.log("发现弹窗：" + i);
            RandomPress([hasPopup.x, hasPopup.y, 10, 10]);
        }
    }
};
const ExceptionFlow = (gameMode) =>
{
    const shot = captureScreen();

    let curMinute = new Date().getMinutes();
    if (curMinute != lastDebugModeTime)
    {
        console.log("debug mode: " + gameMode);
        lastDebugModeTime = curMinute;
    }

    if (gameMode == "mainStory")
    {
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
    }

    NoPotionFlow(shot);
    BackpackFullFlow(shot);
    DisconnectionFlow(shot);

    ResetConfig();

    MakeSureInGame(shot);
};
// *******************************************************************  确保在游戏中 *********************************************************************

const ClickRate = () =>
{
    let hasRate = text("나중에").findOne(20);
    if (hasRate)
    {
        console.log("发现游戏评分窗口，点击返回");
        click(hasRate.bounds().centerX(), hasRate.bounds().centerY());
    }
};
const LongTimeSamePage = (shot) =>
{
    if (fullScreenClip == null)
    {
        fullScreenClip = captureScreen();
        return true;
    }
    let screenInterval = (new Date().getTime() - lastGetFullScreen) / 600000;
    if (screenInterval > 10)
    {
        console.log("全屏截图");
        lastGetFullScreen = new Date().getTime();
        let isSame = FindImg(fullScreenClip, [0, 0, 1280, 720], shot);
        if (isSame)
        {
            console.log("10分钟了，屏幕内容一样，重启游戏。");
            RestartGame("com.smilegate.lordnine.stove.google");
        }
    }
};
const MakeSureInGame = (shot) =>
{
    CloseBackpack();
    PageBack();
    ClickSkip();
    CloseMenu();
    ClosePopupWindows(shot);
    ClickRate();

    ReLoginFlow();
    MainUIFlow(shot);
    HasStartBlueBtn() && PressStartBtn();
    InputVerificationFlow(shot);
    LongTimeSamePage(shot);

};




module.exports = {
    ExceptionFlow
};


// console.log(CloseBackpack());
// console.time("exception");
// ExceptionFlow("mainStory");
// console.timeEnd("exception");
// console.log(HasTouchToStart());
// MakeSureInGame();
// DeathFlow();
// GameModeFlow("mainStory");
// ExceptionFlow();
// MakeSureInGame();
// console.log(MainUICheck());
// console.log(FindMultiColors(NoPotionColorList, [331, 633, 46, 70]));
// console.log(FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]));
