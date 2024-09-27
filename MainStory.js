
const {
    specialConfig,
    DeathImgList,
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu, ChangeRecoverPotionPercentToMax, CloseBackpack,
    FindBlueBtn, FindNumber, FindRedBtn, FindGoldBtn,
    PageBack,
    HasMenu, HasPageback, HasBackpackMenuClose, HasSkip, ClickSkip, FindImgInList, IsHaltMode, ExitHaltMode,
    IsInCity, IsMoving,
    PullDownSkill,
    WaitUntilPageBack, WaitUntilMenu,
    SwipeSlowly,
    OpenBackpack,
    OpenBackpackMenu,

    HasPopupClose,
    EnterMenuItemPage,
    WaitUntil,
    LoadImgList,
    ReadConfig,
    RewriteConfig,

    PressBlank,
    RecycleImgList,
    ClearPage,


} = require("./utils.js");

const { TipColorList, ArrowColorList, BlankColorList, QuestionMarkColorList, NextColorList, Auto_inactiveColorList,
    Auto_activeColorList, QuestColorList, TalkBubbleColorList,
    SpeedUpOffColorList,
} = require("./Color/MainStoryColorList.js");

const { LordNineWordColorList, WhiteAvatarColorList } = require("./Color/ExceptionColorList.js");

const { WearEquipments, StrengthenEquipment, OpenAllBox, DecomposeEquipment, AutoReleaseSkill, AutoPotion } = require("./Backpack.js");

const { ComprehensiveImprovement, StrengthenHorseEquipment } = require("./CommonFlow.js");


let storyMode = "mainMission";

let lastTransformationTime = 1726208812345;

let tapTipIndex = 0;

const CommonTipList = [
    [720, 387, 96, 22], //药水 100
    [705, 578, 58, 26], //药水 确认
    [907, 132, 35, 34],//游戏开始的第一个tip
    [807, 142, 21, 29],//游戏开始的第一个紫色问好
    [1212, 23, 26, 28], //菜单
    [1149, 116, 26, 29], //核萌
];

let challengeBossTimeArray = [];

let isSameMainStory = null;
let lostGrowthMissionTitle = 0;
let clickGrowthMissionTimes = 0;

const auto_activeImgList = LoadImgList("icon/auto/auto_active");
const auto_inactiveImgList = LoadImgList("icon/auto/auto_inactive");
const auto_questImgList = LoadImgList("icon/auto/quest");
const IsAuto_active = (shot) => { shot = shot || captureScreen(); return FindImgInList(auto_activeImgList, [1127, 423, 61, 45]); };
const IsAuto_inactive = (shot) => { shot = shot || captureScreen(); return FindImgInList(auto_inactiveImgList, [1127, 423, 61, 45]); };
const IsAuto_quest = (shot) => { shot = shot || captureScreen(); return FindImgInList(auto_questImgList, [1127, 423, 61, 45]); };
const ArrowImgList = {
    "up": LoadImgList("icon/arrow/up"),
    "right": LoadImgList("icon/arrow/right"),
    "down": LoadImgList("icon/arrow/down"),
    "left": LoadImgList("icon/arrow/left"),
};
const GrowthMissionColorList = [
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 7, "#c7a5ef"], [1, 9, "#d5b0ff"], [9, 8, "#b595d8"]]],
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 6, "#b696da"], [2, 7, "#d5b0ff"], [10, 7, "#c6a3ed"]]],
    ["#d5b0ff", [[5, 0, "#d1aefc"], [-6, 7, "#d0acf8"], [11, 7, "#c6a3ed"], [2, 9, "#d5b0ff"]]],
    ["#d3affc", [[1, 1, "#d5b0ff"], [5, 1, "#d5b0ff"], [2, 8, "#d4affd"], [2, 11, "#c6a3ed"]]],
    ["#e1befd", [[-1, 4, "#e7c3ff"], [-6, 10, "#e2bfff"], [9, 10, "#d8b7f2"], [1, 12, "#e7c3ff"]]],
    ["#e3bfff", [[-2, -1, "#d7b6f6"], [4, 0, "#e4c1ff"], [1, 8, "#e4c1ff"], [8, 8, "#e3bfff"]]]
];
const MainStoryBranchImgList = {
    manufacturePage: LoadImgList("icon/beginner/growthMission/manufacturePage"),
    abilityPage: LoadImgList('icon/beginner/growthMission/abilityPage'),
};
const GrowthImgList = {
    coreAnimalPage: LoadImgList("icon/beginner/growthMission/coreAnimalPage"),
    skillBookMerchantPage: ReadImg("icon/beginner/growthMission/skillBookMerchant"),
    weaponFeaturesPage: LoadImgList("icon/beginner/growthMission/weaponFeaturesPage"),
    joinGulidPage: LoadImgList("icon/beginner/growthMission/joinGuild"),
    holyRelicPage: LoadImgList("icon/beginner/growthMission/holyRelicPage"),
    dailyMissionPage: ReadImg("icon/beginner/growthMission/dailyMissionPage"),
    towerOfTrialsPage: ReadImg("icon/beginner/growthMission/towerOfTrialsPage"),
};
// const GrowthMissionTitleImgList = LoadImgList("icon/beginner/growthMission/growthMissionTitle");

const TransformIconColorList = [
    ["#998b5f", [[2, -6, "#c6b37c"], [6, -5, "#c7b57e"], [12, -3, "#a89869"], [9, 5, "#b3a271"]]],
    ["#c8b67f", [[-3, 4, "#ccb981"], [7, 4, "#cbb880"], [-2, 10, "#b9a874"], [5, 11, "#b9a874"]]]
];
const IsContinuouslyChallengeBoss = () =>
{
    console.log("检查是否连续挑战boss");
    if (challengeBossTimeArray.length < 2)
    {
        return false;
    }
    const reverseTimeArray = challengeBossTimeArray.reverse();
    let challengeInterval = (reverseTimeArray[0] - reverseTimeArray[1]) / 60000;
    console.log("连续挑战boss间隔为：" + challengeInterval + "分钟");
    if (challengeInterval < 40)
    {
        return true;
    }
    else
    {
        return false;
    }
};
// 点击提示
const HasTip = () => FindMultiColors(TipColorList, [19, 17, 1238, 688]);
const FindArrow = () =>
{
    const region = [0, 0, 1280, 720];
    const shot = captureScreen();
    for (let key in ArrowImgList)
    {
        let hasArrow = FindImgInList(ArrowImgList[key], region, shot);
        if (hasArrow)
        {
            return [key, hasArrow];
        }
    }
    return false;
};

const TapTip = () =>
{
    const hasTip = HasTip();
    if (hasTip)
    {
        console.log("提示: " + hasTip);
        const hasArrow = FindArrow();

        if (!hasArrow)
        {
            console.log("未发现箭头。");
            if (tapTipIndex < CommonTipList.length)
            {
                RandomPress(CommonTipList[tapTipIndex]);
                tapTipIndex++;
            }
            else
            {
                RandomPress([720, 387, 96, 22]);
                tapTipIndex = 0;
            }
            console.log("按顺序点击常见卡点提示,当前索引为：" + tapTipIndex);
        }
        else
        {
            const [direction, position] = hasArrow;
            console.log("箭头：" + direction + " " + position);
            switch (direction)
            {
                case "up":
                    RandomPress([position.x - 5, position.y - 48, 10, 30]);
                    break;
                case "down":
                    RandomPress([position.x, position.y + 20, 10, 10]);
                    break;
                case "left":
                    RandomPress([position.x - 20, position.y, 10, 10]);
                    break;
                case "right":
                    RandomPress([position.x + 10, position.y, 30, 10]);
                    break;

                default:
                    RandomPress(CommonTipList[random(0, CommonTipList.length - 1)]);
                    break;
            }
        }

    }
};

const HasNext = (shot) => FindMultiColors(NextColorList, [1219, 670, 31, 31], shot);
const ClickNext = (shot) => RandomPress([1152, 678, 53, 14], shot);
const HasTalkBubble = (shot) => FindMultiColors(TalkBubbleColorList, [465, 389, 140, 35], shot);
const IsSpeedUpOff = (shot) => FindMultiColors(SpeedUpOffColorList, [1208, 27, 46, 33], shot);
const TransformMainStory = () =>
{
    console.log("主线传送");
    RandomPress([1149, 126, 19, 20]);
    if (FindBlueBtn([653, 443, 204, 65]))
    {
        RandomPress([689, 461, 145, 31]);
        lastTransformationTime = new Date().getTime();
        Sleep(5);
    }
};
const ClickMainStory = () => 
{
    if (IsAuto_quest())
    {
        return true;
    }
    else if (IsAuto_active() || IsInCity() || IsAuto_inactive())
    {
        if ((new Date().getTime() - lastTransformationTime) / 60000 < 4)
        {
            RandomPress([905, 134, 226, 34]);
        }
        else if (FindMultiColors(TransformIconColorList, [1136, 119, 51, 48]))
        {
            TransformMainStory();
        }
        else
        {
            RandomPress([905, 134, 226, 34]);
        }
        console.log("点击主线,并等待三秒");
        Sleep(3);
    }

    if (isSameMainStory == null)
    {
        isSameMainStory = images.clip(captureScreen(), 898, 157, 81, 17);
        return true;
    }

    let isLongTimeNoContinue = FindImg(isSameMainStory, [876, 138, 120, 54]);
    if (isLongTimeNoContinue)
    {
        if (!IsMoving())
        {
            console.log("连续主线的任务相同，可能被卡住，随机移动");
            let randomDirection = random(0, 3);
            if (randomDirection == 0)
            {
                SwipeUp(3);
            }
            else if (randomDirection == 1)
            {
                SwipeRight(3);
            }
            else if (randomDirection == 2)
            {
                SwipeDown(3);
            }
            else if (randomDirection == 3)
            {
                SwipeLeft(3);
            }
        }

    }


};
const ClickGrowthMission = () =>
{
    console.log("点击成长任务。");
    clickGrowthMissionTimes++;
    if (clickGrowthMissionTimes > 10)
    {
        console.log("点击成长任务次数过多，切换为主线");
        storyMode = "mainMission";
        lostGrowthMissionTitle = 0;
        clickGrowthMissionTimes = 0;
    }
    const shot = captureScreen();

    // const hasGrowthMissionTitle = FindImgInList(GrowthMissionTitleImgList, [877, 176, 132, 49], shot);
    let hasGrowthMissionTitle = FindMultiColors(GrowthMissionColorList, [859, 179, 40, 44]);
    if (hasGrowthMissionTitle)
    {
        let clip = images.clip(captureScreen(), 931, 196, 115, 34);

        if (FindMultiColors(TransformIconColorList, [1136, 177, 39, 43], shot))
        {
            if (!IsInCity())
            {
                RandomPress([1147, 195, 20, 14]);
                if (FindBlueBtn([653, 443, 205, 65]))
                {
                    RandomPress([678, 461, 157, 31]);
                    Sleep(5);
                }
            }
            else
            {
                RandomPress([909, 197, 181, 31]);
            }
        }
        else
        {
            RandomPress([905, 200, 218, 28]);
        }
        Sleep(5);
        let isNoReaction = FindImg(clip, [876, 184, 208, 59]);
        if (isNoReaction)
        {
            RandomPress([901, 194, 259, 38]);
            lostGrowthMissionTitle++;
            clickGrowthMissionTimes++;
            if (lostGrowthMissionTitle > 3)
            {
                console.log("点击没有反应，切换为主线任务");
                storyMode = "mainMission";
                lostGrowthMissionTitle = 0;
                clickGrowthMissionTimes = 0;
            }

        }
        console.log("点击进行成长任务");
    }
    else
    {
        console.log("未发现成长任务标题");
        lostGrowthMissionTitle++;
        if (lostGrowthMissionTitle > 5)
        {
            storyMode = "mainMission";
            lostGrowthMissionTitle = 0;
            clickGrowthMissionTimes = 0;
            console.log("多次未找到成长任务，切换为主线任务");
        }
    }
};
const IsInQuest = (region) => FindMultiColors(QuestColorList, region);
// 点击对话
const TapDialog = () =>
{
    const shot = captureScreen();
    const hasNext = HasNext(shot);
    const hasTalkBubble = HasTalkBubble(shot);
    const isSpeedUpOff = IsSpeedUpOff(shot);

    if (hasNext)
    {
        ClickNext();
    }
    else if (hasTalkBubble)
    {
        RandomPress([538, 399, 206, 17]);
    }
    if (isSpeedUpOff)
    {
        RandomPress([1109, 39, 139, 14]);
        RandomPress([1174, 88, 71, 18]);
        RandomPress([1174, 88, 71, 18]);
    }
};

const AutoMainStory = () =>
{
    if (!HasMenu())
    {
        return false;
    }
    const shot = captureScreen();
    const hasQuest = FindMultiColors(QuestColorList, [1132, 430, 54, 36], shot);
    if (hasQuest)
    {
        return true;
    }
    const hasAuto_inactive = FindMultiColors(Auto_inactiveColorList, [1132, 430, 54, 36], shot);
    const hasAuto_active = FindMultiColors(Auto_activeColorList, [1132, 430, 54, 36], shot);

    if (hasAuto_active && !hasAuto_inactive)
    {
        ClickMainStory();
        return true;
    }
    else if (IsInCity())
    {
        if (!IsMoving())
        {
            ClickMainStory();
        }
    }
    console.log("auto main story");
};

// 
const MainStoryQuestCheck = () => FindMultiColors(QuestColorList, [1132, 435, 55, 24]);

const SwipeUp = (sec) => gesture(sec * 1000, [229, 550], [229, 450]);
const SwipeDown = (sec) => gesture(sec * 1000, [229, 600], [229, 680]);
const SwipeLeft = (sec) => gesture(sec * 1000, [200, 572], [100, 572]);
const SwipeRight = (sec) => gesture(sec * 1000, [250, 572], [350, 572]);

// ------------------------------------------  main story branch -------------------------------------------
const weaponSelectColorList = [
    ["#3c302a", [[292, -96, "#746d62"], [434, 0, "#535355"], [586, -140, "#877662"], [791, -123, "#363224"]]]
];
const PurpleMainStoryColorList = [
    ["#d5b0ff", [[3, 1, "#d5b0ff"], [10, 6, "#b898dc"], [355, 9, "#dbc996"], [342, 8, "#dccb96"]]]
];


const BossTitleColorList = [
    ["#fc2d01", [[17, -1, "#fd2d00"], [31, -7, "#ff2d00"], [31, 5, "#fd2d00"], [47, -1, "#fd2d00"]]],
    ["#ee2b05", [[16, 3, "#fd2d00"], [30, -2, "#ff2d00"], [47, -4, "#fe2d00"], [52, 2, "#f62c02"]]],
    ["#fc2c01", [[6, 3, "#fc2d01"], [20, 3, "#ff2d00"], [35, 1, "#ff2d00"], [52, -1, "#fd2d00"]]],
    ["#ff2d00", [[5, 4, "#fd2d01"], [14, 4, "#ff2d00"], [35, 6, "#ee2c0e"], [54, 4, "#fe2d01"]]],
    ["#f92d0a", [[13, -2, "#ff2d00"], [33, -1, "#fc2d04"], [53, -3, "#fe2d01"], [63, -3, "#fb2d03"]]],
    ["#e92a07", [[0, 9, "#f22f17"], [27, 1, "#b32618"], [30, 3, "#fd2d00"], [50, 4, "#fe2d02"]]],
    ["#fd2d01", [[18, 1, "#fa2e0b"], [35, 3, "#fc2d03"], [52, 0, "#fe2d02"], [35, 2, "#f92c02"]]],
    ["#fe2d00", [[4, 1, "#fd2d01"], [10, 1, "#fe2d00"], [17, 0, "#fd2d04"], [24, 2, "#fe2d02"]]],
    ["#f92d04", [[9, -1, "#fa2d06"], [19, -1, "#f72c03"], [26, 3, "#fc2e07"], [33, 0, "#f1321e"]]],
    ["#fe2d02", [[4, -1, "#fe2d02"], [10, 2, "#f72f14"], [28, -1, "#f83118"], [28, 4, "#fa2d08"]]],
    ["#ff2d00", [[23, 2, "#f92e0c"], [36, 2, "#fb2d04"], [52, 3, "#ff2d00"], [105, 8, "#fe2d01"]]],
    ["#fb2d05", [[1, 0, "#fd2d02"], [6, 0, "#fe2d00"], [10, 0, "#fb2d07"], [16, 0, "#ff2d00"]]],
    ["#fd2d03", [[1, 0, "#ff2d00"], [4, 0, "#fb2e07"], [6, 0, "#fd2d01"], [37, -1, "#fb2d03"]]],
    ["#ff2d00", [[0, 4, "#ff2d00"], [9, 4, "#fc2d05"], [17, 7, "#ff2d00"], [23, 2, "#ff2d00"]]],
    ["#fa2d07", [[0, 5, "#fa2d04"], [18, -2, "#ff2d00"], [18, 4, "#ff2d00"], [22, 2, "#f72d06"]]],
    ["#f22b02", [[0, 3, "#f02b03"], [15, -3, "#fe2d00"], [32, -4, "#ff2d00"], [47, -7, "#fd2d00"]]],
    ["#ff2d00", [[-2, 2, "#fe2d00"], [16, -2, "#ff2d00"], [27, 0, "#fe2d00"], [44, 5, "#ff2d00"]]],
    ["#fe2d00", [[6, 0, "#fe2d00"], [20, -4, "#ff2d00"], [21, 5, "#fe2d01"], [49, -4, "#fe2d01"]]]
];

const DeathCheck = () =>
{
    const shot = captureScreen();
    if (FindBlueBtn([539, 420, 205, 67], shot) || FindBlueBtn([539, 590, 207, 70], shot))
    {
        for (let i = 0; i < DeathImgList.length; i++)
        {
            if (FindImg(DeathImgList[i], [596, 423, 84, 59], shot))
            {
                console.log("角色死亡");
                return true;
            }
            else if (FindImg(DeathImgList[i], [527, 584, 217, 85], shot)) 
            {
                console.log("角色死亡! 失去能力点");
                return true;
            }
        }
    }
    return false;
};

const DeathFlow = (message) =>
{
    console.log("主线角色死亡，开始死亡流程");
    Sleep(3);
    for (let i = 0; i < 30; i++)
    {
        if (FindBlueBtn([524, 581, 245, 94])) 
        {
            Sleep(3);
            RandomPress([572, 611, 141, 29]);
            console.log("死亡流程: 确认死亡");
            break;
        }
        if (FindBlueBtn([536, 415, 204, 77]))
        {
            Sleep(3);
            RandomPress([568, 437, 151, 30]);
            console.log("死亡流程: 确认死亡");
            break;
        }
        Sleep();
    }

    const config = ReadConfig();
    config.game.deathTime++;
    if (message != null)
    {
        console.log("death message: " + message);
        if (message.includes("death"))
        {
            if (config.game[message])
            {
                config.game[message]++;
            }
            else
            {
                config.game[message] = 0;
            }
        }
    }

    const hasMenu = WaitUntilMenu();
    if (!hasMenu)
    {
        console.log("Death Flow: 未发现菜单按钮");
    }
    const isContinuouslyChallengeBoss = IsContinuouslyChallengeBoss();
    if (isContinuouslyChallengeBoss)
    {
        console.log("正在连续挑战boss，检查是否100%恢复，是否自动使用攻速药与恢复药");
        if (!config.game.autoPotion || config.game.deathTime % 5 == 0)
        {
            const isChangePotionSuccess = ChangeRecoverPotionPercentToMax();
            const isAutoSuccess = AutoPotion();
            if (isAutoSuccess && isChangePotionSuccess)
            {
                config.game.autoPotion = true;
            }
            else
            {
                config.game.autoPotion = false;
            }
        }
        else
        {
            console.log("已经设置100%恢复与自动使用攻速药与恢复药");
        }
    }

    let isSuccess = ComprehensiveImprovement();
    if (isSuccess == false)
    {
        console.log("综合提升没有执行到位,重新执行");
        ClearPage();
        ComprehensiveImprovement(true);
    }

    storyMode = "growthMission";


    if (config.game.deathTime >= 100)
    {
        alert("异常处理", "死亡次数过多，当前死亡次数为： " + config.game.deathTime);
    }
    RewriteConfig("game", config.game);
};

const ChangeGameSetting = () =>
{
    console.log("开始修改游戏画面设置");
    let isChangeSuccess = false;
    const hasEnterSettingPage = EnterMenuItemPage("setting");
    if (!hasEnterSettingPage)
    {
        console.log("change setting error!");
    }
    RandomPress([357, 77, 33, 20], 3);
    SwipeSlowly([640, 620, 10, 10], [640, 160, 10, 10], 1.5);
    SwipeSlowly([640, 620, 10, 10], [640, 160, 10, 10], 1.5);
    RandomPress([1126, 207, 115, 26]); //关闭后期处理
    RandomPress([1119, 441, 123, 25]); //效果 低
    RandomPress([1122, 560, 120, 25]); //镜头晃动 关闭
    RandomPress([1124, 618, 117, 25]); //人物显示上限
    RandomPress([647, 76, 37, 24]); // 语言栏
    RandomPress([731, 391, 167, 24]); // select btn
    RandomPress([931, 415, 156, 30]); // choose chinese
    //改变省电模式为不进入省电模式
    RandomPress([174, 74, 107, 27]);
    RandomPress([631, 324, 115, 23]);
    PageBack();
    Sleep(3);
    if (FindBlueBtn([655, 443, 200, 67]))
    {
        console.log("修改配置成功!");
        RandomPress([678, 456, 155, 36]); //confirm
        isChangeSuccess = true;
        Sleep(10);
        let voiceIcon = LoadImgList("icon/voice");
        for (let i = 0; i < 500; i++)
        {
            ClickSkip();
            if (FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]))
            {
                console.log("更改设置，回到了主页面，退出");
                break;
            }
            if (FindBlueBtn([651, 426, 171, 61]))
            {
                console.log("开始下载中文包。。。");
                RandomPress([670, 444, 133, 26]);
            }
            if (FindImgInList(voiceIcon, [1202, 22, 62, 61]))
            {
                console.log("正在下载中...");
                Sleep(60);
            }
            Sleep();
        }
    }
    return isChangeSuccess;
};
const IsAttackBoss = () => FindMultiColors(BossTitleColorList, [893, 153, 228, 23]);

let lostTitleCount = 0;

const AttackingBossFlow = (number) =>
{
    const BossLowHPImgList = LoadImgList("icon/bossLowHP");
    // const BossHalfHPImgList = LoadImgList("icon/bossHalfHP");
    const IsBossDead = () =>
    {
        const bossTitle = FindMultiColors(BossTitleColorList, [899, 151, 114, 27]);
        if (!bossTitle)
        {
            lostTitleCount++;
            console.log("失去boss目标次数: " + lostTitleCount);
            if (lostTitleCount > 8)
            {
                return true;
            }
        }
        return false;
    };
    const IsBossLowHP = () => FindImgInList(BossLowHPImgList, [519, 67, 80, 30]);
    // const IsBossHalfHP = () => FindImgInList(BossHalfHPImgList, [620, 65, 25, 12]);

    challengeBossTimeArray.push(new Date().getTime());

    if (number == 0 || number == 1 || number == 2 || number == 3)
    {
        console.log("先向右移动: 4s");
        SwipeRight(4);
    }
    // else if (number == 3)
    // {
    //     console.log("swipe to left: 5s");
    //     SwipeLeft(5);
    // }
    let isDead = false;
    let isBossDead = false;
    let time = 0;

    let moveTimeArr = [
        [2],
        [3],
        [2.8],
        [3.2],
        [3],
    ];

    const moveTime = moveTimeArr[number];

    const TapSwitchEnemy = () => RandomPress([1082, 434, 25, 23], 0.05);

    const AimAtBossColorList = [
        ["#d80802", [[0, -3, "#ea0700"], [17, -2, "#e70700"], [30, -2, "#d90904"], [38, -3, "#eb0700"]]],
        ["#d80701", [[17, -1, "#df0700"], [34, -2, "#e30700"], [49, -2, "#de0701"], [57, 4, "#cb0600"]]],
        ["#cc0b06", [[1, 0, "#e40700"], [1, 3, "#d80701"], [18, -3, "#f00700"], [18, 0, "#e60700"]]]
    ];
    const IsAimAtBoss = () => FindMultiColors(AimAtBossColorList, [540, 11, 205, 31]);

    while (isDead == false && isBossDead == false)
    {
        if (FindMultiColors(Auto_inactiveColorList, [1127, 431, 51, 33]))
        {
            console.log("没有自动攻击，点击自动攻击");
            RandomPress([1140, 437, 24, 18], 0.05);
        }

        isDead = DeathCheck();
        if (isDead)
        {
            const deathMessage = `death_Boss${number}`;
            DeathFlow(deathMessage);
            break;
        }
        isBossDead = IsBossDead();
        if (HasMenu())
        {
            time++;
            if (number != 1)
            {
                if (time > 10 && time < 30)
                {
                    if (IsAimAtBoss())
                    {
                        TapSwitchEnemy();
                    }
                }
            }
            if (number == 1)
            {
                SwipeRight(moveTime[0]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避,向左移动15秒");
                    SwipeLeft(15);
                }
                SwipeUp(moveTime[0]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避,向下移动15秒");
                    SwipeDown(15);
                }

                SwipeLeft(moveTime[0]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避，向右移动15秒");
                    SwipeRight(15);
                }
                SwipeDown(moveTime[0]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避，向上移动15秒");
                    SwipeUp(15);
                }
            }
            else if (number == 2)
            {
                SwipeUp(moveTime[0]);
                Sleep(1);
                SwipeRight(moveTime[0]);
                Sleep(1);
                SwipeDown(moveTime[0]);
                Sleep(1);
                SwipeLeft(moveTime[0]);
                Sleep(1);
            }
            else if (number == 3)
            {
                SwipeLeft(moveTime[0]);
                Sleep(1);
                SwipeDown(moveTime[0]);
                Sleep(1);
                SwipeRight(moveTime[0]);
                Sleep(1);
                SwipeUp(moveTime[0]);
                Sleep(1);
            }
            else if (number == 4)
            {
                // if (IsBossHalfHP())
                // {
                //     console.log("boss已经半血，开始点击切换敌人");
                //     isBossHalfHP = true;
                // }
                if (time > 10 && time < 30)
                {
                    if (IsAimAtBoss())
                    {
                        TapSwitchEnemy();
                    }
                }
                SwipeRight(moveTime[0]);
                Sleep(1);
                if (time > 10 && time < 20)
                {
                    if (IsAimAtBoss())
                    {
                        TapSwitchEnemy();
                    }
                }
                SwipeUp(moveTime[0]);
                Sleep(1);
                if (time > 10 && time < 20)
                {
                    if (IsAimAtBoss())
                    {
                        TapSwitchEnemy();
                    }
                }
                SwipeLeft(moveTime[0]);
                Sleep(1);
                if (time > 10 && time < 20)
                {
                    if (IsAimAtBoss())
                    {
                        TapSwitchEnemy();
                    }
                }
                SwipeDown(moveTime[0]);
                Sleep(1);
            }
            else
            {
                SwipeRight(moveTime[0]);
                Sleep(1);
                SwipeUp(moveTime[0]);
                Sleep(1);
                SwipeLeft(moveTime[0]);
                Sleep(1);
                SwipeDown(moveTime[0]);
                Sleep(1);
            }
        }
        console.log("圈数: " + time);

        // if (number != 0 && number != 1)
        // {
        //     time++;
        //     console.log("圈数: " + time);
        //     if (time > 10 && time < 36)
        //     {
        //         if (HasMenu())
        //         {
        //             console.log("点击切换目标");
        //         }

        //     }
        // }
    }
    console.log("攻击boss循环结束");
    RecycleImgList(BossLowHPImgList);
    // RecycleImgList(BossHalfHPImgList);
};

const MainStoryBranch = () =>
{
    const shot = captureScreen();
    const hasPurpleMainStory = FindMultiColors(PurpleMainStoryColorList, [859, 117, 390, 54], shot);
    if (hasPurpleMainStory)
    {
        const hasQuest = MainStoryQuestCheck();
        if (hasQuest)
        {
            return true;
        }
        if (!IsMoving())
        {
            RandomPress([902, 131, 273, 36]);
        }
        console.log("继续紫色主线...");
        return true;
    }

    const hasWeaponSelect = FindMultiColors(weaponSelectColorList, [47, 62, 1180, 493], shot);
    if (hasWeaponSelect)
    {
        console.log("开始选择武器...");
        RandomPress([677, 184, 77, 305]);
        Sleep(3);
        if (FindBlueBtn([1032, 621, 197, 62]))
        {
            RandomPress([1052, 636, 157, 33]);
        }
        return true;
    }

    const hasAbilityPopup = HasPopupClose([35, 103, 37, 38], shot);
    if (hasAbilityPopup)
    {
        console.log("新手第一次能力加点");
        RandomPress([283, 361, 16, 15]);
        RandomPress([520, 170, 94, 21]);
        RandomPress([685, 348, 21, 24]);
        RandomPress([586, 659, 163, 26]);
        RandomPress([45, 113, 21, 22]); //close popup 

        PullDownSkill([420, 640]);
        console.log("开始改变画面设置");
        const changeSuccess = ChangeGameSetting();
        if (!changeSuccess)
        {
            console.log("修改设置失败!");
        }
        // start to change weapon

        for (let i = 0; i < 30; i++)
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
            if (FindBlueBtn([931, 639, 261, 71]))
            {
                RandomPress([955, 655, 208, 37]); // 点击开始按钮
            }
            if (HasMenu())
            {
                console.log("start to change weapon...");
                OpenAllBox();
                OpenAllBox();
                WearEquipments();
                AutoReleaseSkill();
                Sleep();
                break;
            }
            Sleep();
        }
    }
    const hasBackpackMenuClose = HasBackpackMenuClose();
    if (hasBackpackMenuClose)
    {
        console.log("strength equipment branch ==>");
        const hasOpenBackpackMenu = OpenBackpackMenu();
        if (!hasOpenBackpackMenu)
        {
            console.log("识别错误:", "强化装备未找到相应页面");
            return false;
        }
        StrengthenEquipment();
    }
    if (HasPageback())
    {
        const hadAbilityPage = FindImgInList(MainStoryBranchImgList.abilityPage, [1139, 3, 87, 57]);
        if (hadAbilityPage)
        {
            console.log("主线分支:能力!");
            RandomPress([79, 342, 89, 122]);
            RandomPress([79, 342, 89, 122]);
            RandomPress([132, 165, 34, 35]);
            //second
            RandomPress([218, 341, 87, 118]);
            RandomPress([218, 341, 87, 118]);
            RandomPress([219, 167, 32, 31]);
            //third
            RandomPress([351, 342, 91, 118]);
            RandomPress([351, 342, 91, 118]);
            RandomPress([399, 164, 37, 36]);
            //forth
            RandomPress([488, 343, 90, 117]);
            RandomPress([488, 343, 90, 117]);
            RandomPress([488, 167, 32, 29]);
            //fifth
            RandomPress([620, 345, 92, 116]);
            RandomPress([620, 345, 92, 116]);
            RandomPress([667, 164, 37, 37]);
            //sixth
            RandomPress([757, 339, 89, 115]);
            RandomPress([757, 339, 89, 115]);
            RandomPress([757, 168, 30, 27]);
            Sleep(6);
            PressBlank();
            PageBack();
            PullDownSkill([1060, 650]);
            Sleep();
            PullDownSkill([1130, 650]);
            Sleep();
            PullDownSkill([1190, 650]);
            Sleep();
            console.log("能力搭配结束");
        }
        const hasManufacturePage = FindImgInList(MainStoryBranchImgList.manufacturePage, [1130, 8, 113, 47]);
        if (hasManufacturePage)
        {
            console.log("主线分支，制作装备");
            if (FindMultiColors([1008, 646, 271, 61]))
            {
                RandomPress([1039, 659, 219, 36], 10);
                PressBlank();
                PageBack();
            }
        }
    }

};
// -----------------------------     exception    ----------------------------------

const MainStoryException = () =>
{
    if (IsAttackBoss())
    {
        console.log("检测到目标为boss。");
        for (let i = 0; i < 30; i++)
        {
            if (HasSkip())
            {
                console.log("attack boss find skip button");
                ClickSkip();
                Sleep();
                break;
            }
            sleep(100);
        }
        WaitUntil(
            () => IsAttackBoss(),
            100,
            30
        );
        RandomPress([1144, 438, 29, 14], 0.02);
        SwipeLeft(3);
        Sleep(1);
        SwipeDown(3);
        Sleep(1);
        const GetBossIndex = () =>
        {
            const bossImgList = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            };
            for (let i = 0; i < 5; i++)
            {
                for (let j = 0; j < 10; j++)
                {
                    let img = ReadImg(`icon/boss/${i}/${j}`);
                    if (img == null) break;
                    bossImgList[i].push(img);
                }
            }
            const shot = captureScreen();
            let index = false;
            for (let i = 0; i < 5; i++)
            {
                for (let j = 0; j < 10; j++)
                {
                    if (!bossImgList[i][j])
                    {
                        break;
                    }
                    if (FindImg(bossImgList[i][j], [507, 4, 284, 46], shot))
                    {
                        console.log("find boss index: " + i);
                        index = i;
                        break;
                    }
                }
            }
            for (let key in bossImgList)
            {
                bossImgList[key].forEach(element =>
                {
                    element.recycle();
                });
            }
            if (index == false)
            {
                console.log("not find boss index: return 0");
                return 0;
            }
            else
            {
                console.log("find boss index: " + index);
                return index;
            }
        };
        const BossIndex = GetBossIndex();
        console.log("正在打第" + BossIndex + " boss");

        AttackingBossFlow(BossIndex);
        console.log("boss流程结束");
    }
    else if (!IsMoving())
    {
        console.log("玩家没有移动");
        if (storyMode == "mainMission")
        {
            ClickMainStory();
            MainStoryBranch();
        }
        else if (storyMode == "growthMission")
        {
            ClickGrowthMission();
        }
    }
    if (FindRedBtn([427, 504, 200, 62]))
    {
        console.log("不小心点击了公会详情，点击离开");
        RandomPress([457, 514, 146, 39]);
    }
    if (FindBlueBtn([653, 445, 199, 61]))
    {
        console.log("申请加入公会？");
        RandomPress([682, 459, 141, 33]);
    }
    if (DeathCheck())
    {
        DeathFlow();
    }
};

const FinishedMissionColorList = [
    ["#e8e8e7", [[10, -1, "#f0f0ef"], [3, 3, "#dbdbda"], [16, 2, "#eaeae9"], [23, 9, "#fcfcfc"]]],
    ["#3e3d3d", [[3, 7, "#eaeae9"], [13, 4, "#f0f0f0"], [20, 6, "#fdfdfd"], [24, 10, "#f6f6f6"]]],
    ["#fbfbfa", [[3, 0, "#fbfbfa"], [14, 1, "#fefefd"], [21, 5, "#fcfcfc"], [24, 8, "#fafafa"]]],
    ["#fdfdfd", [[2, 0, "#fdfdfd"], [13, 4, "#fdfdfd"], [20, 8, "#fcfcfc"], [21, 9, "#fafafa"]]],
    ["#fcfcfc", [[2, 0, "#fcfcfc"], [0, 6, "#ffffff"], [3, 6, "#ffffff"], [14, 1, "#f5f5f4"]]]
];

//01: lv5
//02: buy skill book
//03 lv10
//04 weapon skill 武器特性
//05 lv15
//06 join gulic 加入公会
//07 lv20
//08 strengthen holy 
//09 lv25
//10 finish daily mission 完成每日任务
//11 lv30 
//12 考验之塔
//13 lv35
//14 decompose equipment 分解装备
// 15 lv40
// 16 animal

const GrowthMissionFlow = () =>
{
    console.log("成长任务流程");
    // const hasGrowthIcon = FindImgInList(GrowthMissionTitleImgList, [889, 181, 102, 37]);
    const hasGrowthIcon = FindMultiColors(GrowthMissionColorList, [859, 176, 42, 49]);
    if (hasGrowthIcon)
    {
        ClickGrowthMission();
    }
    else if (FindMultiColors(FinishedMissionColorList, [1126, 210, 57, 33]))
    {
        console.log("完成成长任务");
        RandomPress([907, 197, 218, 34]);
        Sleep(3);
        RandomPress([907, 197, 218, 34]);
        Sleep(3);
    }
    else
    {
        console.log("未找到成长任务图标，返回主线");
        storyMode = "mainMission";
        lostGrowthMissionTitle = 0;
        clickGrowthMissionTimes = 0;
    }
    Sleep(5);
    const shot = captureScreen();

    const hasSkillBookPage = FindImg(GrowthImgList.skillBookMerchantPage, [1031, 3, 202, 60], shot);
    if (hasSkillBookPage)
    {
        console.log("成长任务2: 购买技能书");
        const skillBookImgList = LoadImgList("backpack/skillBook");

        for (let i = 0; i < 2; i++)
        {
            let hasSkillBook = FindImgInList(skillBookImgList, [72, 69 + i * 79, 82, 92]);
            if (hasSkillBook)
            {
                RandomPress([hasSkillBook.x + 50, hasSkillBook.y, 100, 30]);
                if (FindBlueBtn([645, 544, 179, 58]))
                {
                    RandomPress([664, 558, 142, 30]);
                    console.log("购买技能书成功");
                }
            }
            Sleep();
        }
        console.log("没有可以购买的技能书了");
        ClearPage();
        OpenAllBox();
    }
    const hasweaponFeaturesPage = FindImgInList(GrowthImgList.weaponFeaturesPage, [1095, 6, 133, 53], shot);
    if (hasweaponFeaturesPage)
    {
        console.log("成长任务4：武器特性 ");
        RandomPress([631, 178, 21, 23]);
        if (FindBlueBtn([996, 638, 207, 66]))
        {
            RandomPress([1018, 652, 162, 31]);
        }
        ClearPage();

    }
    const hasGuildPage = FindImgInList(GrowthImgList.joinGulidPage, [561, 644, 72, 69], shot);
    if (hasGuildPage)
    {
        console.log("成长任务 6: 加入公会");
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
                console.log("find straight away btn" + hasStrBtn);
                RandomPress([hasStrBtn.x - 20, hasStrBtn.y, 100, 20]);
                Sleep(3);
                RandomPress([1228, 19, 21, 21]);
                break;
            }
        }
        RightOnJoinGuildImg.recycle();
        Sleep();
        // RandomPress([1189, 19, 52, 25]);
        RandomPress([1228, 20, 36, 25]);
    }
    const hasHolyRelicPage = FindImgInList(GrowthImgList.holyRelicPage, [1148, 8, 79, 52], shot);
    if (hasHolyRelicPage)
    {
        console.log("成长任务8：升级圣物");
        if (FindBlueBtn([1104, 640, 159, 66]))
        {
            RandomPress([1126, 657, 119, 31], 3);
            if (FindBlueBtn([656, 447, 201, 60]))
            {
                RandomPress([677, 463, 160, 28]);
            }
        }
        ClearPage();
    }
    const hasDailyMissionPage = FindImg(GrowthImgList.dailyMissionPage, [26, 60, 105, 51], shot);
    if (hasDailyMissionPage)
    {
        console.log("成长任务10: 每日任务");
        if (FindBlueBtn([1065, 644, 213, 67]))
        {
            RandomPress([1091, 659, 166, 32]); //accept
            storyMode = "dailyMission";
        }
        PageBack();
    }
    const hasTowerOfTrialsPage = FindImg(GrowthImgList.towerOfTrialsPage, [942, 74, 58, 65], shot);
    if (hasTowerOfTrialsPage)
    {
        console.log("成长任务 12: 试炼之塔");
        if (FindBlueBtn([944, 637, 333, 77]))
        {
            RandomPress([986, 658, 262, 35]);
            Sleep(10);
        }
        storyMode = "mainMission";
    }

    const hasDecomposeEquipmentPage = HasBackpackMenuClose();
    if (hasDecomposeEquipmentPage)
    {
        console.log("成长任务14: 分解装备");
        DecomposeEquipment();
        if (FindMultiColors(FinishedMissionColorList, [1126, 210, 57, 33]))
        {
            RandomPress([900, 195, 268, 42]);
            Sleep(4);
            OpenAllBox();
            WearEquipments();
            StrengthenEquipment();
        }
        storyMode = "mainMission";

    }
    const hasCoreAinmalPage = FindImgInList(GrowthImgList.coreAnimalPage, [1141, 8, 124, 53], shot);
    if (hasCoreAinmalPage)
    {
        console.log("成长任务 16: 合成核萌");
        // cell gap 
        for (let i = 0; i < 30; i++)
        {
            RandomPress([204, 75, 84, 25]); //培育页面
            if (FindRedBtn([421, 644, 218, 69]))
            {
                for (let j = 0; j < 30; j++)
                {
                    RandomPress([1000, 140 + (j % 6) * 90, 200, 30]); //第一个合成材料
                    if (FindBlueBtn([645, 646, 213, 68]))
                    {
                        console.log("已经可以合成了");
                        RandomPress([665, 661, 171, 33]); //培育
                        for (let k = 0; k < 30; k++)
                        {
                            if (FindBlueBtn([490, 622, 305, 72]))
                            {
                                RandomPress([517, 639, 250, 34]); //合成 确认 
                                Sleep(10);
                                PageBack();
                                ClearPage();
                                break;
                            }
                            Sleep();
                        }
                        break;
                    }
                    Sleep();
                }
                break;
            }
            Sleep();
        }
    }
    if (storyMode == "mainMission")
    {
        console.log("判断等级是否是34级");
        const config = ReadConfig();
        const lv = config.game.lv;
        console.log("当前等级为：" + lv);
        if (lv < 35)
        {
            console.log("等级小于34级，切换模式为挂机模式，去地图挂机");
            specialConfig.gameMode = "instance";
            specialConfig.lastModeChangeTime = new Date();
        }

        else if (config.game.deathTime >= 30)
        {
            console.log("今日死亡次数过多，先去挂机,死亡次数为：" + config.game.deathTime);
            specialConfig.gameMode = "instance";
            specialConfig.lastModeChangeTime = new Date();
        }
        return true;
    }
};
const DailyMissionColorList = [
    ["#c4edb5", [[4, 0, "#c4edb5"], [7, 1, "#c4edb5"], [0, 8, "#b3d7a3"], [6, 8, "#b3d7a3"]]]
];
const DailyMissionFlow = () =>
{
    const shot = captureScreen();
    const isQuest = IsInQuest();
    if (isQuest)
    {
        return true;
    }
    const isFinished = FindMultiColors(FinishedMissionColorList, [1126, 271, 62, 39], shot);
    if (isFinished)
    {
        console.log("daily mission Finished !");
        RandomPress([911, 257, 259, 35]);
        // select the last card
        RandomPress([777, 435, 50, 53]);
        Sleep(4);
        storyMode = "growthMission";
    }
    const hasDailyMission = FindMultiColors(DailyMissionColorList, [862, 242, 38, 47]);
    if (hasDailyMission)
    {
        RandomPress([1146, 252, 22, 25]);
        if (FindBlueBtn([654, 443, 200, 66]))
        {
            RandomPress([678, 459, 159, 35]);
            Sleep(10);
            for (let i = 0; i < 100; i++)
            {
                if (IsInQuest())
                {
                    break;
                }
                Sleep();
            }
        }
    }
};

// storyMode = "growthMission";
const MainStoryFlow = () =>
{
    if (storyMode == "mainMission")
    {
        AutoMainStory();
        MainStoryBranch();
    }

    else if (storyMode == "growthMission")
    {
        GrowthMissionFlow();
    }
    else if (storyMode == "dailyMission")
    {
        DailyMissionFlow();
    }
    TapDialog();
    TapTip();
    MainStoryException();
};


module.exports = { HasTip, MainStoryFlow };


// console.log(FindImgInList(GrowthImgList.abilityPage, [1139, 3, 87, 57]));
// console.log(HasPageback());

// console.time("mainStoryFlow");
// MainStoryFlow();
// AutoMainStory();
// TapDialog();
// TapTip();
// MainStoryBranch();
// DeathCheck();
// MainStoryException();
// console.timeEnd("mainStoryFlow");

// while (true)
// {
//     MainStoryFlow();
//     sleep(100);
// }
// console.log(FindImgInList(GrowthMissionTitleImgList, [887, 175, 97, 51]));