

const {
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


} = require("./utils.js");

const { WearEquipments, StrengthenEquipment, DecomposeEquipment, BuyPotion } = require("./Backpack.js");

const { LoginProps } = require("./CommonFlow.js");

const { LordNineWordColorList, WhiteAvatarColorList, StartBtnSettingColorList, CrucifixColorList } = require("./Color/ExceptionColorList.js");
const { TipColorList } = require("./Color/MainStoryColorList.js");

let lastTimeOfBuyingPotion = 1726208812345;
let lastTimeClearBackpack = 1726208812345;
let lastTimeClearBackpack_haltMode = new Date().getTime();
let randomTimeToClearBackpack = random(120, 180);

let lastGetVerificationCodeTime = 0;
let totalGetVerificationCodeTimes = 0;

let lastGetFullScreen = new Date().getTime(); // 异常判断，每10分钟截屏一次
let fullScreenClip = null;

let lastResetConfigTime = 1726208812345;


const ExceptionImgList = {
    disconnection: LoadImgList("special/disconnection"),
    preventAutoLogin: LoadImgList("special/preventAutoLogin"),
    missionFinishPickAward: LoadImgList("special/missionFinishPickAward"),
    notice_confirm: LoadImgList("special/notice_confirm"),
    identifySuccessfully: LoadImgList("backpack/identifySuccessfully"),
    loading: LoadImgList("special/loading"),
    confirmToGo: LoadImgList("special/confirmToGo"),
    quickMoving: LoadImgList("icon/font/quickMoving"),
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
        const delayTime = random(0, 32);

        console.log("角色当前没有药水了 延迟" + delayTime + "s");
        Sleep(delayTime);
        if (IsBackpackFull())
        {
            lastTimeClearBackpack = new Date().getTime();
            LoginProps();
            DecomposeEquipment("partial");
        }
        const buyPotionInterval = (new Date().getTime() - lastTimeOfBuyingPotion) / 60000;
        if (buyPotionInterval < 2) 
        {
            console.log("连续购买药水时间间隔小于2分钟，不重复购买");
            return false;
        }
        else
        {
            console.log("回家买药水...");
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
        BuyPotion();
    }
};


const BackpackFlow_HaltMode = () =>
{

    if ((new Date().getTime() - lastTimeClearBackpack_haltMode) / 60000 > randomTimeToClearBackpack)
    {
        console.log("到达随机清理背包时间。");
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        if (new Date().getDate() % 2 == 0)
        {
            console.log("2的整数倍，穿戴装备");
            WearEquipments();
            StrengthenEquipment();
        }
        lastTimeClearBackpack_haltMode = new Date().getTime();
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
        if ((new Date().getTime() - lastTimeClearBackpack) / 60000 > 10)
        {
            if (new Date().getHours % 4 == 0)
            {
                console.log("8的整数倍，穿戴装备");
                WearEquipments();
                StrengthenEquipment();
            }
            lastTimeClearBackpack = new Date().getTime();
            LoginProps();
            DecomposeEquipment("partial");
        }
        // else
        // {
        //     console.log("退出：连续清理背包时间间隔小于10分钟");
        //     LoginProps();
        //     DecomposeEquipment("partial");
        // }
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
    if (FindBlueBtn([556, 430, 167, 55], shot) || FindBlueBtn([530, 436, 215, 77], shot))
    {
        let hasDisconnection = FindImgInList(ExceptionImgList.disconnection, [551, 222, 172, 65], shot);
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
            app.launch("com.lordnine");

            ui.web.jsBridge.callHandler("ShowCountDownPopup", delayTime, (data) => console.log(data));
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
            if (config.game.reconnectionTime >= 100)
            {
                console.log("重连次数超过100次，退出游戏");
                alert("Disconnection", "重连次数超过100次，退出游戏");
            }

        }
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
            RestartGame("com.smilegate.lordnine.stove.google", 3);
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
    if (HaveLordNineWord(shot))
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

const ResetConfig = () =>
{
    if ((new Date().getTime() - lastResetConfigTime) / 3600000 > 3)
    {
        lastResetConfigTime = new Date().getTime();
        const config = ReadConfig();
        const newDay = new Date().getDate();
        if (config.game.today != newDay && new Date().getHours() > 4)
        {
            console.log("新的一天，重置配置");
            config.game.today = newDay;
            config.game.deathTime = 0;
            config.game.reconnectionTime = 0;

            config.game.dailyInstance = false;
            config.game.dailyMission = false;

            config.game.guildDonation = false;
            config.game.friendshipDonation = false;
            config.game.dailyShop = false;
            config.game.friendshipShop = false;
            config.game.accepteDailyMission = false;

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
    const hasUpdateNotice = textMatches(/.*詳細維護資訊請參考官方公告。.*/).findOne(20);
    if (hasUpdateNotice)
    {
        console.log("发现游戏公告弹窗，关闭脚本");
        engines.stopAllAndToast();
    }
    const hasLimitAccount = textMatches(/(.*服務使用限制介紹.*)/).findOne(20);
    if (hasLimitAccount)
    {
        console.log("检测到账号被封，关闭脚本");
        engines.stopAllAndToast();
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
        const hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20).parent().parent();
        if (hasAccount)
        {
            hasAccount.click();
        }
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
    if (FindBlueBtn([657, 382, 203, 68], shot))
    {
        if (FindImgInList(ExceptionImgList.quickMoving, [657, 443, 198, 65], shot))
        {
            console.log("快速移动按钮...");
            RandomPress([677, 458, 155, 30], 5);
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
    if (FindBlueBtn([655, 443, 197, 65], shot))
    {
        if (FindRedBtn([429, 445, 200, 63], shot))
        {
            console.log("发现申请加入工会弹窗，点击确认");
            RandomPress([678, 460, 156, 30]);
        }
    }
    if (FindBlueBtn([487, 621, 307, 76], shot))
    {
        const joinGuildPageImgList = LoadImgList("icon/beginner/growthMission/joinGuild");
        const hasGuildPage = FindImgInList(joinGuildPageImgList, [561, 644, 72, 69], shot);
        if (hasGuildPage)
        {
            console.log("成长任务 6: 加入公会");
            if (HasTip([446, 494, 70, 44], shot))
            {
                RandomPress([536, 659, 213, 35]);
            }
            const RightOnJoinGuildImg = ReadImg('icon/font/rightNow');
            const FindStraightAwayBtn = (region) => FindImg(RightOnJoinGuildImg, region);
            let hasStrBtn = false;
            for (let i = 0; i < 15; i++)
            {
                hasStrBtn = FindStraightAwayBtn([1136, 199, 54, 353]);
                if (!hasStrBtn)
                {
                    SwipeSlowly([492, 516, 76, 27], [496, 210, 70, 25], 4);
                }
                else
                {
                    console.log("发现立即加入的按钮" + hasStrBtn);
                    RandomPress([hasStrBtn.x - 20, hasStrBtn.y, 100, 20]);
                    Sleep(3);
                    RandomPress([1228, 19, 21, 21]);
                }
            }
            RightOnJoinGuildImg.recycle();
            RecycleImgList(joinGuildPageImgList);
            Sleep();
            RandomPress([1228, 20, 36, 25]);
        }
        const blueBtnImgList = LoadImgList("blueBtn/confirmBtn");
        if (FindImgInList(blueBtnImgList, [588, 621, 99, 74]))
        {
            console.log("发现制作核萌的确认按钮，点击确认");
            RandomPress([529, 637, 226, 37]);
        }
        RecycleImgList(blueBtnImgList);
        RecycleImgList(joinGuildPageImgList);
    }
    if (FindBlueBtn([655, 445, 196, 66], shot))
    {
        if (FindImgInList(ExceptionImgList.confirmToGo, [492, 330, 298, 63], shot))
        {
            console.log("确定要前往新地图吗？");
            console.log("点击确认");
            RandomPress([680, 459, 149, 32]);
        }
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
        InputVerificationFlow(shot);
        PickMissionFinishAward();
        if (FindImgInList(ExceptionImgList.identifySuccessfully, [586, 61, 109, 51], shot))
        {
            console.log("发现鉴定成功，点击确定");
            if (FindBlueBtn([505, 592, 271, 69]))
            {
                RandomPress([544, 609, 202, 34]);
            }
        }
        if (IsHaltMode())
        {
            ExitHaltMode();
            ChangeGameSetting();
        }
    }
    else
    {
        HasCrucifixIcon() && PickUpAbilityPoint();

    }
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

// ExceptionFlow()
// DeathFlow_HaltMode(captureScreen())


