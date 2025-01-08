

const {
    globalTimePlay,
    ClickSkip, ChangeHaltModeTime, ClearPage,
    ExitHaltMode,
    FindImg, FindMultiColors, FindRedBtn, FindImgInList, FindBlueBtn, FindGoldBtn,
    GetVerificationCode,
    HasPageback, HasMenu, HasPopupClose, HaveMainStoryIcon,
    IsInCity, IsHaltMode, LoadImgList, IsBackpackFull, IsNoPotion,
    LaunchGame,
    PressBlank, PageBack, RewriteConfig, RecycleImgList,
    ReadConfig, RestartGame, ReadImg, RandomPress,
    Sleep, SwipeSlowly,
    WaitUntil, WaitUntilMenu, WaitUntilPageBack,
    ReturnHome,
    ChangeGameSetting,
    DeathCheck,
    TapTip,
    SetCountryAndBirth,
    StopScript,
} = require("./utils.js");

const { WearEquipments, StrengthenEquipment, DecomposeEquipment, BuyPotion } = require("./Backpack.js");

const { LoginProps, needWearEquipment } = require("./CommonFlow.js");

const { LordNineWordColorList, WhiteAvatarColorList, StartBtnSettingColorList } = require("./Color/ExceptionColorList.js");
const { TipColorList } = require("./Color/MainStoryColorList.js");

let lastTimeOfBuyingPotion = 1726208812345;

let randomTimeToClearBackpack = random(150, 200);

const ExceptionImgList = {
    disconnection: LoadImgList("special/disconnection"),
    preventAutoLogin: LoadImgList("special/preventAutoLogin"),
    missionFinishPickAward: LoadImgList("special/missionFinishPickAward"),
    notice_confirm: LoadImgList("special/notice_confirm"),
    identifySuccessfully: LoadImgList("backpack/identifySuccessfully"),
    loading: LoadImgList("special/loading"),
    confirmToGo: LoadImgList("special/confirmToGo"),
    quickMoving: LoadImgList("icon/font/quickMoving"),
    crucifixIcon: LoadImgList("icon/crucifixIcon")
};
const HasTip = (region, shot) =>
{
    region = region || [0, 0, 1280, 720];
    shot = shot || captureScreen();
    return FindMultiColors(TipColorList, region, shot);
};
const HaveLordNineWord = (shot) =>
{
    shot = shot || captureScreen();
    return FindMultiColors(LordNineWordColorList, [313, 333, 728, 354], shot);
};
// flow -----
const NoPotionFlow = (shot) =>
{
    if (IsNoPotion(shot))
    {
        const deathBtn = DeathCheck();
        if (deathBtn)
        {
            if (FindBlueBtn([524, 581, 245, 94])) 
            {
                Sleep(3);
                RandomPress([572, 611, 141, 29], 10);
                console.log("死亡流程: 确认死亡");
            }
            if (FindBlueBtn([536, 415, 204, 77]))
            {
                Sleep(3);
                RandomPress([568, 437, 151, 30], 10);
                console.log("死亡流程: 确认死亡");
            }
        }

        Sleep(delayTime);
        if (IsBackpackFull())
        {
            globalTimePlay.lastTimeClearBackpack_haltMode = new Date().getTime();
            LoginProps();
            DecomposeEquipment("partial");
        }
        const buyPotionInterval = (new Date().getTime() - lastTimeOfBuyingPotion) / 60000;
        if (buyPotionInterval < 10) 
        {
            console.log("连续购买药水时间间隔小于10分钟，不重复购买");
            return false;
        }
        else
        {
            console.log("回家买药水...");
            const delayTime = random(0, 32);
            console.log("角色当前没有药水了 延迟" + delayTime + "s");
            BuyPotion();
            lastTimeOfBuyingPotion = new Date().getTime();
        }
    }
};
const NoPotionFlow_HaltMode = (shot) =>
{
    if (IsNoPotion(shot, [1145, 633, 51, 78]))
    {
        console.log("省电模式：没有药水");
        ExitHaltMode();
        const deathBtn = DeathCheck();
        if (deathBtn)
        {
            if (FindBlueBtn([524, 581, 245, 94])) 
            {
                Sleep(3);
                RandomPress([572, 611, 141, 29], 10);
                console.log("死亡流程: 确认死亡");
            }
            if (FindBlueBtn([536, 415, 204, 77]))
            {
                Sleep(3);
                RandomPress([568, 437, 151, 30], 10);
                console.log("死亡流程: 确认死亡");
            }
        }
        BuyPotion();
    }
};

const BackpackFlow_HaltMode = () =>
{
    if ((new Date().getTime() - globalTimePlay.lastTimeClearBackpack_haltMode) / 60000 > randomTimeToClearBackpack)
    {
        console.log("到达随机清理背包时间。");
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        globalTimePlay.lastTimeClearBackpack_haltMode = new Date().getTime();
        randomTimeToClearBackpack = random(300, 240);
        LoginProps();
        DecomposeEquipment("partial");
    }
};

const BackpackFullFlow = (shot) =>
{
    const isBackpackFull = IsBackpackFull(shot);
    if (isBackpackFull)
    {
        console.log("背包已满，开始清理背包");
        if ((new Date().getTime() - globalTimePlay.lastTimeClearBackpack_haltMode) / 60000 > 10)
        {
            globalTimePlay.lastTimeClearBackpack_haltMode = new Date().getTime();
            const config = ReadConfig()
            if (!config.unlockTrade)
            {
                console.log("未完成主线，穿戴装备");
                WearEquipments();
                StrengthenEquipment();
                LoginProps();
            }
            else
            {
                if (random(1, 100) > 70)
                {
                    LoginProps();
                }
            }

            DecomposeEquipment("partial");
        }
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

let clickMainUITimes = 0;

const DisconnectionFlow = (shot) =>
{
    if (FindBlueBtn([556, 430, 167, 55], shot) || FindBlueBtn([530, 436, 215, 77], shot))
    {
        let hasDisconnection = FindImgInList(ExceptionImgList.disconnection, [554, 188, 180, 124], shot);
        if (hasDisconnection)
        {
            console.log("@游戏断开连接");
            RandomPress([587, 445, 111, 22], 20);
            if (HaveLordNineWord())
            {
                console.log("游戏没有退出，继续游戏");
                return true;
            }
            const delayTime = random(600, 900);
            console.log("游戏延迟启动时间: " + delayTime + "s");
            let isTimeout = IsTimeout();
            if (isTimeout)
            {
                console.log("vpn is time out");
                alert("time out", "需要更换ip");
            }
            CountDownFloaty(delayTime)
            Sleep(delayTime);
            LaunchGame();
            const config = ReadConfig();

            if (typeof config.game.reconnectionTime == "number")
            {
                config.game.reconnectionTime++;
            }
            else
            {
                config.game.reconnectionTime = 1;
            }
            console.log("今日重连次数: " + config.game.reconnectionTime);
            RewriteConfig(config);
            if (config.game.reconnectionTime >= 10)
            {
                console.log("重连次数超过100次，退出游戏");
                alert("Disconnection", "重连次数超过10次，退出游戏");
            }

        }
        console.log("发现服务器弹窗按钮，重置点击次数");
        clickMainUITimes = 0;
    }

    if (FindImgInList(ExceptionImgList.loading, [23, 664, 59, 43]))
    {
        console.log("@正在加载地图中...");
        console.log("开始等待地图加载完成");
        let needRestartGame = true;
        for (let i = 0; i < 60; i++)
        {
            if (HasMenu())
            {
                console.log("地图加载完成");
                needRestartGame = false;
                break;
            }
            else if (HaveMainStoryIcon())
            {
                console.log("地图加载完成");
                needRestartGame = false;
                break;
            }
            Sleep(3);
        }
        if (needRestartGame)
        {
            console.log("加载时间过长，开始重启游戏");
            RestartGame("com.smilegate.lordnine.stove.google");
        }
    }
    if (FindBlueBtn([650, 428, 173, 59], shot))
    {
        const serverMaintenance = LoadImgList('special/serverMaintenance')
        const haveServerMaintenance = FindImgInList(serverMaintenance, [565, 227, 147, 53], shot)
        RecycleImgList(serverMaintenance)

        if (haveServerMaintenance)
        {
            const serverMaintenanceDelayTime = random(1, 100)
            console.log(`发现服务器维护弹窗，延迟${serverMaintenanceDelayTime}s 点击结束，并弹窗提示。`);
            Sleep(serverMaintenanceDelayTime)
            RandomPress([674, 443, 127, 29])
            alert("服务器维护中", "检测到游戏服务器维护中")
            StopScript()
        }
    }
};
const MainUIFlow = (shot) =>
{
    if (HaveLordNineWord(shot))
    {
        if (FindMultiColors(WhiteAvatarColorList, [32, 600, 52, 49], shot))
        {
            const whiteCheckMark = [["#ffffff", [[5, 4, "#ffffff"], [10, 0, "#ffffff"]]]]
            if (!FindMultiColors(whiteCheckMark, [38, 662, 37, 37]))
            {
                RandomPress([83, 669, 90, 17])
            }
            Sleep(random(1, 10));
            RandomPress([416, 173, 438, 358])
            Sleep(5);
            console.log("点击开始游戏 有区服的主页面");
        }
        else
        {
            console.log("点击开始 主页面");
            Sleep(random(1, 10));
            RandomPress([416, 173, 438, 358])
            Sleep(5);
        }
        clickMainUITimes++;
        if (clickMainUITimes >= 30)
        {
            console.log('点击主屏幕次数过多，弹窗提醒');
            alert("异常检测", "点击主屏幕次数过多")
        }
    }
};

const HasCrucifixIcon = (shot) => { shot = shot || captureScreen(); return FindImgInList(ExceptionImgList.crucifixIcon, [326, 63, 43, 42]) }

const PickUpAbilityPoint = () =>
{
    console.log("开始恢复属性点或装备");
    let hadPickupEquipment = false;
    const lostEquipmentImgList = LoadImgList("icon/deathPunishment/lostEquipment");
    const lostAbilityPointImgList = LoadImgList("icon/deathPunishment/lostAbilityPoint");
    RandomPress([337, 73, 21, 23]);
    if (WaitUntil(() => HasPopupClose([34, 94, 46, 53])))
    {
        const abilityPontType = FindImgInList(lostAbilityPointImgList, [170, 167, 60, 358]);
        if (abilityPontType)
        {
            console.log("发现红色属性点");
            RandomPress([365, abilityPontType.y - 2, 10, 10]);
        }
        RandomPress([122, 546, 95, 45]);
        if (FindBlueBtn([145, 607, 203, 62]))
        {
            RandomPress([177, 620, 143, 31]);
        }

        if (!FindImgInList(lostEquipmentImgList, [306, 102, 40, 43]))
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
    RecycleImgList(lostEquipmentImgList);
    RecycleImgList(lostAbilityPointImgList);
};

let lastTimeOfResettingConfig = 1726208812345;

let haveResetDailyConfig = false;

const ResetConfig = () =>
{
    const date = new Date();
    if ((date.getTime() - lastTimeOfResettingConfig) / 600000 < 10)
    {
        return false;
    }
    else
    {
        lastTimeOfResettingConfig = date.getTime()
        const config = ReadConfig()
        const today = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        if (config.game.today != today && hours >= config.resetHour)
        {
            console.log(`早上${config.resetHour}:${minutes}点，重置每日事项`);
            config.game.today = today

            config.resetHour = random(4, 12)

            haveResetDailyConfig = true;
            haveResetDailyDiamond = false;

            config.delayTime = random(3, 1200)
            config.game.deathTime = 0;
            config.game.reconnectionTime = 0;
            config.game.tradingTimes = 0;
            config.game.dailyDiamond = 0;

            config.daily.dailyInstance = false;
            config.daily.acceptDailyMission = false;
            config.daily.hangUpSecretLab = 0;

            config.daily.guildDonation = false;
            config.daily.friendshipDonation = false;
            config.daily.dailyShop = false;
            config.daily.friendshipShop = false;

            if (date.getDay() == 1)
            {
                console.log("每周一，重置周事件")
                config.dailyTradingHours = [
                    `${random(8, 12).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
                    `${random(13, 17).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
                    `${random(18, 22).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
                ];
            }
            console.log("reset config")
            RewriteConfig(config);
        }
    }


};

// *******************************************************************  确保在游戏中 *********************************************************************

const StovePopup = () =>
{
    let hasRate = text("나중에").findOne(20);
    if (hasRate)
    {
        console.log("发现游戏评分窗口，点击返回");
        click(hasRate.bounds().centerX(), hasRate.bounds().centerY());
    }
    let hasRate_ch = text("以后再说").findOne(20);
    if (hasRate_ch)
    {
        console.log("发现游戏评分窗口，以后再说");
        click(hasRate_ch.bounds().centerX(), hasRate_ch.bounds().centerY());
    }
    const hasUpdateNotice = textMatches(/.*臨時維護公告.*/).findOne(20);
    if (hasUpdateNotice)
    {
        console.log("游戏维护，关闭脚本");
        alert("游戏维护中...", "维护中...")
        engines.stopAllAndToast();
    }
    const hasLimitAccount = textMatches(/(.*服務使用限制介紹.*)/).findOne(20);
    if (hasLimitAccount)
    {
        console.log("检测到账号被封，关闭脚本");
        const config = ReadConfig()
        try
        {
            http.post(`http://47.76.112.107:8001/devices/${config.game.vm}/off`)

        }
        catch (error)
        {
            console.log(error);
        }
        alert("游戏账户被封禁，", "检测到游戏账号被封禁")
        StopScript()
    }
    const agreeAllToContinue = text("全部同意後繼續（包含可選項目）").findOne(20);
    if (agreeAllToContinue)
    {
        console.log("发现游戏协议弹窗，点击同意");
        agreeAllToContinue.click();
    }
    const hasGoogleLogin = textMatches(/(.*Google.*)/).findOne(20);
    if (hasGoogleLogin)
    {
        hasGoogleLogin.parent().click();
    }
    const hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*|.*Choose an account.*|.*选择帐号.*)/).findOne(20);
    if (hasSelectAccount)
    {
        const hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20);
        if (hasAccount)
        {
            RandomPress([392, 288, 521, 42])
        }
    }
    const loginAccountImgList = LoadImgList("special/loginAccount")
    if (FindImgInList(loginAccountImgList, [267, 364, 163, 100]))
    {
        RandomPress([392, 288, 521, 42])
    }
    RecycleImgList(loginAccountImgList)

    const haveServiceAndRule = text('條款及條件').findOne(20)
    if (haveServiceAndRule)
    {
        const haveConfirm = text('確定').findOne(20)
        if (haveConfirm)
        {
            haveConfirm.click()
            console.log("输入日期弹窗")
        }
    }
    const haveConfirmInfo = text('確認資訊').findOne(20)
    if (haveConfirmInfo)
    {
        SetCountryAndBirth()
    }
};
const PressSomeTip = (shot) =>
{
    shot = shot || captureScreen();
    if (HasTip([446, 494, 70, 44], shot))
    {
        console.log("公会tip");
        RandomPress([536, 659, 213, 35]);
    }
    if (HasTip([277, 481, 35, 25], shot))
    {
        console.log("第一个技能，tip");
        RandomPress([408, 651, 29, 30]);
    }
    if (HasTip([768, 431, 43, 29], shot))
    {
        console.log("第一个装备穿戴的tip");
        RandomPress([851, 596, 47, 23]);
    }
    if (HasTip([572, 112, 74, 50]))
    {
        console.log("第一个装备栏tip");
        RandomPress([947, 171, 38, 34]);
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
    if (FindBlueBtn([657, 443, 192, 65], shot))
    {
        if (FindImgInList(ExceptionImgList.quickMoving, [565, 203, 142, 59], shot))
        {
            console.log("快速移动按钮...");
            RandomPress([677, 458, 155, 30], 5);
        }
        else if (FindImgInList(ExceptionImgList.confirmToGo, [492, 330, 298, 63], shot))
        {
            console.log("确定要前往新地图吗？");
            console.log("点击确认");
            RandomPress([680, 459, 149, 32]);
        }
        else if (FindBlueBtn([655, 443, 197, 65], shot))
        {
            if (FindRedBtn([429, 445, 200, 63], shot))
            {
                console.log("发现申请加入工会弹窗，点击确认");
                RandomPress([678, 460, 156, 30]);
            }
        }
    }

    if (FindBlueBtn([655, 380, 207, 68], shot))
    {
        if (FindRedBtn([423, 380, 204, 69], shot))
        {
            console.log("怪物图鉴快速移动按钮");
            RandomPress([681, 399, 149, 33]);

        }
    }
    if (FindBlueBtn([645, 563, 185, 61], shot))
    {
        if (FindRedBtn([456, 566, 181, 55], shot))
        {
            console.log("发现药水弹窗，点击购买");
            RandomPress([485, 559, 131, 26]);
        }
    }
    if (FindBlueBtn([1055, 637, 219, 71], shot))
    {
        if (HasPageback())
        {
            console.log("坐骑页面，强化装备按钮");
            RandomPress([1077, 656, 173, 35]);
        }

    }

    if (FindBlueBtn([487, 621, 307, 76], shot))
    {
        const blueBtnImgList = LoadImgList("icon/font/confirmBtn");
        if (FindImgInList(blueBtnImgList, [588, 621, 99, 74]))
        {
            console.log("发现制作核萌的确认按钮，点击确认");
            RandomPress([529, 637, 226, 37]);
        }
        RecycleImgList(blueBtnImgList);
    }

};
const PickMissionFinishAward = () =>
{
    if (FindImgInList(ExceptionImgList.missionFinishPickAward, [556, 159, 159, 69]))
    {
        console.log("发现任务完成，点击选择奖励");
        RandomPress([449, 437, 384, 45]);
    }
};
const MakeSureInGame = (shot) =>
{
    if (!HasMenu())
    {
        MainUIFlow(shot);
        PressCommonBtn();
        PressSomeTip(shot);
        ClickSkip();
        PickMissionFinishAward();
        if (FindImgInList(ExceptionImgList.identifySuccessfully, [586, 61, 109, 51], shot))
        {
            console.log("发现鉴定成功，点击确定");
            if (FindBlueBtn([505, 592, 271, 69]))
            {
                RandomPress([544, 609, 202, 34]);
            }
        }
    }
    else
    {
        HasCrucifixIcon() && PickUpAbilityPoint();

    }
    TapTip();
    StovePopup();
    ClearPage();
};

const ExceptionFlow = () =>
{
    const shot = captureScreen();

    if (IsHaltMode())
    {
        NoPotionFlow_HaltMode(shot);
        BackpackFlow_HaltMode(shot);
    }
    else
    {
        BackpackFullFlow(shot);
        NoPotionFlow(shot);
        MakeSureInGame(shot);
    }

    DisconnectionFlow(shot);
    ResetConfig();
};

module.exports = { ExceptionFlow };




