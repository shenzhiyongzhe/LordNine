

const {
    ClickSkip, ChangeHaltModeTime, ClearPage,
    ExitHaltMode,
    FindImg, FindMultiColors, FindRedBtn, FindImgInList, FindBlueBtn, FindGoldBtn,
    GetVerificationCode,
    HasPageback, HasMenu, HasPopupClose,
    IsInCity, IsHaltMode, LoadImgList, IsBackpackFull, LaunchGame,
    PressBlank, PageBack, RewriteConfig,
    ReadConfig, RestartGame, ReadImg, RandomPress, Sleep,
    WaitUntil, WaitUntilMenu, WaitUntilPageBack,
    ReturnHome,

} = require("./utils.js");

const { WearEquipments, StrengthenEquipment, DecomposeEquipment } = require("./Backpack.js");

const { LoginProps } = require("./CommonFlow.js");

const { HasTip } = require("./MainStory.js");

const { NoPotionColorList, LordNineWordColorList, WhiteAvatarColorList, StartBtnSettingColorList, CrucifixColorList } = require("./Color/ExceptionColorList.js");

let lastTimeOfBuyingPotion = 1726208812345;
let lastTimeClearBackpack = 1726208812345;
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


// flow -----
const NoPotionFlow = (shot) =>
{
    const hasNoPotion = FindMultiColors(NoPotionColorList, [325, 636, 55, 60], shot);
    if (hasNoPotion)
    {
        console.log("角色当前没有药水了 ");
        const buyPotionInterval = (new Date().getTime() - lastTimeOfBuyingPotion) / 60000;
        if (buyPotionInterval < 10) 
        {
            console.log("连续购买药水时间间隔小于10分钟，不重复购买");
            return true;
        }
        console.log("回家买药水...");
        lastTimeOfBuyingPotion = new Date().getTime();
        const hasMenu = HasMenu();
        if (!hasMenu)
        {
            console.log("未发现菜单按钮");
            return false;
        }
        if (!IsInCity())
        {
            console.log("不在主城，先传送回家");
            ReturnHome();
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
        if ((new Date().getTime() - lastTimeClearBackpack) / 6000 < 10)
        {
            console.log("退出：连续清理背包时间间隔小于10分钟");
        }
        lastTimeClearBackpack = new Date().getTime();
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }
};

const IsTimeout = () =>
{
    app.launch("fun.kitsunebi.kitsunebi4android");
    let refreshBtn = id("measure_latency_btn").findOne(5000);
    if (refreshBtn)
    {
        refreshBtn.click();
        console.log("点击刷新");
        Sleep(5);
    }
    let hasTimeOut = text("timeout").findOne(3000);
    if (hasTimeOut)
    {
        return true;
    }
    return false;
};
const DisconnectionFlow = (shot) =>
{
    let hasDisconnection = FindImgInList(ExceptionImgList.disconnection, [595, 229, 84, 49], shot);
    if (hasDisconnection)
    {
        console.log("game disconnection");
        let hasBlueBtn = FindBlueBtn([446, 323, 396, 173]);
        if (hasBlueBtn)
        {
            RandomPress([hasBlueBtn.x, hasBlueBtn.y, 15, 5]);
            const delayTime = random(300, 600);
            console.log("游戏延迟启动时间: " + delayTime + "s");
            let isTimeout = IsTimeout();
            if (isTimeout)
            {
                console.log("vpn is time out");
                alert("time out", "需要更换ip");
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

const HasCrucifixIcon = () => FindMultiColors(CrucifixColorList, [327, 60, 40, 43]);
const PickUpAbilityPoint = () =>
{
    console.log("开始恢复属性点或装备");
    let hadPickupEquipment = false;

    const LostEquipmentColorList = [
        ["#b6b6b6", [[1, 0, "#b7b7b6"], [9, 0, "#b6b6b6"], [11, 0, "#b7b7b6"], [5, 4, "#b7b7b6"]]]
    ];
    RandomPress([337, 73, 21, 23]);
    if (WaitUntil(() => HasPopupClose([34, 94, 46, 53])))
    {
        if (FindBlueBtn([142, 602, 214, 70]))
        {
            RandomPress([167, 619, 162, 37]);
        }
        else
        {
            console.log("免费次数使用完，使用金币恢复");
            RandomPress([365, 263, 16, 17]);
            RandomPress([123, 547, 98, 43]);
            if (FindBlueBtn([138, 604, 216, 66]))
            {
                RandomPress([170, 622, 157, 30]);
            }
        }
        if (FindMultiColors(LostEquipmentColorList, [272, 103, 58, 41]))
        {
            console.log("发现死亡次数过多，丢失装备");
            RandomPress([286, 112, 94, 25]); //装备页面
            RandomPress([186, 174, 203, 39]); //固定点击第一个装备
            //是否有免费次数
            if (FindBlueBtn([142, 602, 214, 70]))
            {
                RandomPress([167, 619, 162, 37]);
            }
            else
            {
                RandomPress([122, 548, 98, 40]);
                if (FindBlueBtn([147, 607, 201, 61]))
                {
                    console.log("使用金币恢复装备");
                    RandomPress([174, 621, 150, 33]);
                }
                else
                {
                    console.log("没有金币，无法恢复装备");
                }
            }
            hadPickupEquipment = true;
        }
    }
    if (HasPopupClose([34, 94, 46, 53]))
    {
        console.log("拾取能力或装备结束");
        RandomPress([47, 109, 20, 21]);
    }
    if (hadPickupEquipment)
    {
        WearEquipments();
    }
};
const AddAttributePoint = () =>
{
    const PlusAbilityIcon = [
        ["#8f7f4f", [[14, 0, "#ab995f"], [6, -7, "#b19d62"], [7, 0, "#af9c62"], [7, 6, "#b7a366"]]],
        ["#86774a", [[3, 0, "#90804f"], [15, 0, "#b4a165"], [9, -6, "#e8cf84"], [8, 6, "#928251"]]],
        ["#86774a", [[7, 0, "#978754"], [14, 0, "#b09d62"], [9, -6, "#e8cf84"], [9, 5, "#b4a165"]]],
        ["#8e7e4e", [[6, 0, "#837448"], [13, 0, "#b7a366"], [7, -7, "#f0d789"], [7, 6, "#b6a266"]]]
    ];
    if (!FindMultiColors(PlusAbilityIcon, [615, 461, 57, 58]))
    {
        return false;
    }
    else
    {
        console.log("开始点击属性点");
        RandomPress([632, 479, 19, 20]);
        console.log("等到属性点窗口出现...");
        WaitUntil(() => HasPopupClose([32, 96, 47, 54]));
        for (let i = 0; i < 10; i++)
        {
            RandomPress([522, 171, 98, 22]); // dex 
            RandomPress([695, 349, 25, 21]); //max dex
            if (FindGoldBtn([580, 657, 167, 29]))
            {
                RandomPress([587, 659, 161, 28]);
            }
            if (HasPopupClose([37, 107, 33, 33]))
            {
                RandomPress([45, 112, 21, 21]);
                break;
            }
            Sleep(1);
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
        gameConfig.dailyInstance = false;
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



const ExceptionFlow = () =>
{
    const shot = captureScreen();
    // let curMinute = new Date().getMinutes();
    // if (curMinute != lastDebugModeTime)
    // {
    //     console.log("debug mode: " + gameMode);
    //     lastDebugModeTime = curMinute;
    // }

    BackpackFullFlow(shot);
    NoPotionFlow(shot);
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
        MainUIFlow(shot);
        ReLoginFlow();
        PressCommonBtn();
        ClickSkip();
        InputVerificationFlow(shot);
    }
    else
    {
        AddAttributePoint();
        HasCrucifixIcon() && PickUpAbilityPoint();

    }
    ClickRate();
    ClearPage();
};


module.exports = {
    ExceptionFlow
};

// console.log(FindImgInList(ExceptionImgList.disconnection, [595, 229, 84, 49]));

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
