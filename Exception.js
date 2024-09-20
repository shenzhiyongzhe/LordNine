

const {
    ClickSkip, CloseMenu, ChangeHaltModeTime, CloseBackpack,
    ExitHaltMode,
    FindImg, FindMultiColors, FindRedBtn, FindImgInList, FindBlueBtn,
    ReadImg, RandomPress, Sleep, OpenMenu,
    HollowPress,
    HasPageback, PageBack, HasMenu,
    GetVerificationCode,
    IsInCity, SwipeSlowly,
    WaitUntilMenu, WaitUntilPageBack,
    ReadConfig,
    HasSkip,
    IsHaltMode,
    LoadImgList, IsBackpackFull, LaunchGame,
    RewriteConfig,
    PressBlank,
    HasPopupClose,
    RestartGame,
    TapBlankToContinue,
    WaitUntil,



} = require("./utils.js");

const { WearEquipments, StrengthenEquipment, DecomposeEquipment } = require("./Backpack.js");

const { LoginProps } = require("./CommonFlow.js");

const { HasTip } = require("./MainStory.js");

const { NoPotionColorList, LordNineWordColorList, WhiteAvatarColorList, StartBtnSettingColorList } = require("./Color/ExceptionColorList.js");

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
    [989, 54, 59, 52],//
    [795, 94, 40, 45],//购买药水弹窗
    [746, 98, 44, 46], //活动页面卡片弹窗
    [1130, 58, 58, 48], //活动页面窗口
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
        const BuySomeItem = () =>
        {
            let isBuyPotion = false;
            let isBuySpeedBook = false;
            let isBuyHealBook = false;
            RandomPress([154, 93, 164, 39]); //小药的图标位置
            RandomPress([600, 338, 30, 5]); //药水滚动条，购买量为50% ~ 60%负重
            if (FindBlueBtn([648, 566, 175, 56]))
            {
                RandomPress([667, 578, 133, 29]);
                Sleep();
                console.log("购买药水成功！");
                isBuyPotion = true;
            }
            RandomPress([168, 336, 126, 32]);
            WaitUntil(() => HasPopupClose([791, 114, 46, 46]), 200, 30);
            if (FindBlueBtn([644, 543, 180, 62]))
            {
                console.log("购买速度增加咒文书");
                RandomPress([669, 556, 134, 32]);
                Sleep();
                isBuySpeedBook = true;
            }
            if (HasPopupClose([789, 86, 54, 58]))
            {
                RandomPress([806, 106, 18, 20]);
            }
            RandomPress([159, 489, 148, 40]);
            WaitUntil(() => HasPopupClose([791, 114, 46, 46]), 200, 30);
            if (FindBlueBtn([644, 543, 180, 62]))
            {
                RandomPress([669, 556, 134, 32]);
                console.log("购买恢复增加咒文书");
                isBuyHealBook = true;
            }
            if (isBuyPotion && isBuySpeedBook && isBuyHealBook)
            {
                return true;
            }
            else
            {
                return false;
            }
        };
        if (WaitUntilPageBack())
        {

            BuySomeItem();
            if (HasPopupClose([794, 91, 45, 50]))
            {
                console.log("购买药水失败，当前背包已满，需要先清理背包");
                RandomPress([482, 576, 131, 29]); //点击取消购买
                console.log("点击取消购买");
                PageBack();
                BackpackFullFlow();
                RandomPress([995, 433, 42, 41]); //grocery store
                if (WaitUntilPageBack())
                {
                    BuySomeItem();
                }
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
        console.log("背包已满，开始清理背包");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }
};

const IsTimeout = () =>
{
    app.launch("fun.kitsunebi.kitsunebi4android");
    let hasTimeOut = text("timeout").findOne(3000);
    if (hasTimeOut)
    {
        return true;
    }
    return false;
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
            let isTimeout = IsTimeout();
            if (isTimeout)
            {
                console.log("vpn is time out");
                alert("vpn time out", "需要更换ip");
            }

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
            console.log("点击开始游戏 有区服的主页面");
        }
        else
        {
            console.log("点击开始 主页面");
            PressBlank();
        }
    }
};


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
    const hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*|.*Choose an account.*)/).findOne(20);
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

    BackpackFullFlow(shot);
    NoPotionFlow(shot);

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
        fullScreenClip = shot;
        return true;
    }
    let screenInterval = (new Date().getTime() - lastGetFullScreen) / 1000;
    console.log("screen interval:" + screenInterval);
    if (screenInterval > 10)
    {
        console.log("全屏截图");
        lastGetFullScreen = new Date().getTime();
        let isSame = FindImg(fullScreenClip);
        console.log("当前页面是否无变化：" + isSame);
        if (isSame)
        {
            console.log("10分钟了，屏幕内容一样，重启游戏。");
            RestartGame("com.smilegate.lordnine.stove.google");
        }
    }
};

const PressCommonBtn = () =>
{
    const shot = captureScreen();
    if (FindBlueBtn([931, 639, 261, 71], shot))
    {
        if (FindMultiColors(StartBtnSettingColorList, [1205, 15, 56, 53], shot))
        {
            console.log("发现游戏开始按钮，点击开始");
            RandomPress([955, 655, 208, 37]);
        }
        else
        {
            console.log("右下角蓝色按钮,制作");
            RandomPress([1030, 659, 95, 34]);
        }
    }
    else if (FindBlueBtn([657, 382, 203, 68], shot))
    {
        if (FindRedBtn([419, 381, 207, 69], shot))
        {
            console.log("发现地图传送弹窗，点击传送");
            RandomPress([684, 400, 152, 30]);
        }
    }
    else if (FindBlueBtn([654, 444, 202, 66], shot))
    {
        if (FindRedBtn([423, 438, 219, 77]))
        {
            console.log("主线传送按钮...");
            RandomPress([684, 460, 152, 31]);
        }

    }
    else if (FindBlueBtn([655, 380, 207, 68], shot))
    {
        if (FindRedBtn([423, 380, 204, 69], shot))
        {
            console.log("怪物图鉴快速移动按钮");
            RandomPress([681, 399, 149, 33]);

        }
    }
    else if (FindBlueBtn([645, 563, 185, 61], shot))
    {
        if (FindRedBtn([456, 566, 181, 55], shot))
        {
            console.log("发现药水弹窗，点击购买");
            RandomPress([485, 559, 131, 26]);
        }
    }
    else if (FindBlueBtn([1055, 637, 219, 71], shot))
    {
        if (HasPageback())
        {
            console.log("坐骑页面，强化装备按钮");
            RandomPress([1077, 656, 173, 35]);
        }

    }
    else if (FindBlueBtn([655, 443, 197, 65], shot))
    {
        if (FindRedBtn([429, 445, 200, 63], shot))
        {
            console.log("发现申请加入工会弹窗，点击确认");
            RandomPress([678, 460, 156, 30]);
        }
    }
    else if (FindBlueBtn([487, 621, 307, 76], shot))
    {
        console.log("发现制作核萌的确认按钮，点击确认");
        RandomPress([527, 639, 243, 36]);
    }
};

const MakeSureInGame = (shot) =>
{
    if (!HasMenu())
    {
        if (IsHaltMode())
        {
            ExitHaltMode();
            ChangeHaltModeTime();
        }
        TapBlankToContinue();

        PressCommonBtn();

        CloseBackpack();
        PageBack();
        ClickSkip();
        CloseMenu();
        ClosePopupWindows(shot);
        ClickRate();

        ReLoginFlow();
        MainUIFlow(shot);
        InputVerificationFlow(shot);
        // LongTimeSamePage(shot);
        DisconnectionFlow(shot);
    }
};


module.exports = {
    ExceptionFlow
};



// console.log(FindBlueBtn([645, 562, 179, 61]));

// console.log(CloseBackpack());
// console.time("exception");
// ExceptionFlow("mainStory");
// console.timeEnd("exception");
// console.log(HasTouchToStart());
// MakeSureInGame();
// DeathFlow();
// while (true)
// {
//     ExceptionFlow("mainStory");
//     Sleep();
// }
// GameModeFlow("mainStory");
// ExceptionFlow();
// MakeSureInGame();
// console.log(MainUICheck());
// console.log(FindMultiColors(NoPotionColorList, [331, 633, 46, 70]));
// console.log(FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]));
