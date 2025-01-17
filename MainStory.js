
const {
    specialConfig,
    BuySkillBook,
    ClearPage, ClickSkip, CloseMenu, CloseBackpack, ChangeRecoverPotionPercentToMax, ChangeGameSetting,
    DeathCheck,
    ExitHaltMode, EnterMenuItemPage,
    FindBlueBtn, FindNumber, FindRedBtn, FindGoldBtn, FindImgInList, FindImg, FindMultiColors,
    GetCharacterLv,
    HasMenu, HasPageback, HasBackpackMenuClose, HasSkip, HasPopupClose, HaveMainStoryIcon, HasTransformIcon,
    HaveDailyMissionIcon, HaveFinished, HasTip,
    IsHaltMode, IsInCity, IsMoving, IsInQuest, IsAuto_active, IsAuto_inactive,
    LoadImgList,
    OpenBackpack, OpenBackpackMenu, OpenMenu,
    PullDownSkill, PageBack, PressBlank,
    ReadConfig, RewriteConfig, RecycleImgList, ReturnHome, ReadImg, RandomPress,
    SwipeSlowly, Sleep, SwipeUp, SwipeDown, SwipeLeft, SwipeRight,
    TapTip,
    WaitUntil, WaitUntilPageBack, WaitUntilMenu,
} = require("./utils.js");

const { NextColorList, TalkBubbleColorList, SpeedUpOffColorList, } = require("./Color/MainStoryColorList.js");

const { WearEquipments, StrengthenEquipment, OpenAllBox, DecomposeEquipment, AutoReleaseSkill, AutoPotion, BuyPotion } = require("./Backpack.js");

const { ComprehensiveImprovement, GuildDonation } = require("./CommonFlow.js");


let storyMode = "mainMission";
// storyMode = "dailyMission";


let lastTransformationTime = 1726208812345;
let challengeBossTimeArray = [];

let isSameMainStory = null;
let isSameMainStoryTime = 0;
let lostGrowthMissionTitle = 0;
let clickGrowthMissionTimes = 0;

let clickDailyMissionTimes = 0;


const GrowthMissionColorList = [
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 7, "#c7a5ef"], [1, 9, "#d5b0ff"], [9, 8, "#b595d8"]]],
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 6, "#b696da"], [2, 7, "#d5b0ff"], [10, 7, "#c6a3ed"]]],
    ["#d5b0ff", [[5, 0, "#d1aefc"], [-6, 7, "#d0acf8"], [11, 7, "#c6a3ed"], [2, 9, "#d5b0ff"]]],
    ["#d3affc", [[1, 1, "#d5b0ff"], [5, 1, "#d5b0ff"], [2, 8, "#d4affd"], [2, 11, "#c6a3ed"]]],
    ["#e1befd", [[-1, 4, "#e7c3ff"], [-6, 10, "#e2bfff"], [9, 10, "#d8b7f2"], [1, 12, "#e7c3ff"]]],
    ["#e3bfff", [[-2, -1, "#d7b6f6"], [4, 0, "#e4c1ff"], [1, 8, "#e4c1ff"], [8, 8, "#e3bfff"]]],
    ["#d4affd", [[5, 0, "#d5b0ff"], [0, 1, "#d5b0ff"], [2, 8, "#d5b0ff"], [11, 7, "#c6a3ed"]]],
    ["#c7a4ed", [[-1, 0, "#d4affd"], [-1, 2, "#d5b0ff"], [3, -1, "#d5afff"], [4, -1, "#d5b0ff"]]],
    ["#ceaaf4", [[0, 1, "#d4affc"], [0, 2, "#c19fe5"], [0, 3, "#d5affc"], [0, 5, "#c2a0e7"]]]
];


const growthMissionIconImgList = LoadImgList("icon/growthMissionIcon");
const secretLabImgList = LoadImgList("special/notMoving/secretLab");
const talkBubbleImgList = LoadImgList("icon/talkBubble");
const npcTalk_leaveImgList = LoadImgList("icon/npcTalk_leave");
const backpackTrashIcon = LoadImgList("backpack/trash");
const bossFlagIcon = LoadImgList("icon/bossFlagIcon")

const HaveGrowthMissionIcon = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(GrowthMissionColorList, [859, 179, 40, 44], shot))
    {
        return true;
    }
    if (FindImgInList(growthMissionIconImgList, [858, 180, 42, 43]))
    {
        return true;
    }
    return false;
};

const TapMainStory = () => RandomPress([905, 131, 224, 36], 3);

const MainStoryBranchImgList = {
    manufacturePage: LoadImgList("icon/beginner/growthMission/manufacturePage"),
    abilityPage: LoadImgList('icon/beginner/growthMission/abilityPage'),
    skillBookPage: LoadImgList('backpack/skillBookPage')
};
const GrowthImgList = {
    coreAnimalPage: LoadImgList("icon/beginner/growthMission/coreAnimalPage"),
    skillBookMerchantPage: ReadImg("icon/beginner/growthMission/skillBookMerchant"),
    weaponFeaturesPage: LoadImgList("icon/beginner/growthMission/weaponFeaturesPage"),
    joinGuildPage: LoadImgList("icon/beginner/growthMission/joinGuild"),
    holyRelicPage: LoadImgList("icon/beginner/growthMission/holyRelicPage"),
    dailyMissionPage: ReadImg("icon/beginner/growthMission/dailyMissionPage"),
    towerOfTrialsPage: ReadImg("icon/beginner/growthMission/towerOfTrialsPage"),
};
// const GrowthMissionTitleImgList = LoadImgList("icon/beginner/growthMission/growthMissionTitle");

const IsContinuouslyChallengeBoss = () =>
{
    console.log("检查是否连续挑战boss");
    if (challengeBossTimeArray.length < 2)
    {
        console.log("没有连续挑战boss");
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

const HasNext = (shot) => { shot = shot || captureScreen(); return FindMultiColors(NextColorList, [1219, 670, 31, 31], shot); };
const ClickNext = (shot) => RandomPress([1152, 678, 53, 14], shot);
const HasTalkBubble = (shot) =>
{
    if (FindMultiColors(TalkBubbleColorList, [480, 385, 293, 43], shot))
    {
        return true;
    }
    if (FindImgInList(talkBubbleImgList, [480, 385, 293, 43], shot))
    {
        return true;
    }
};
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
const settingIcon = LoadImgList("icon/beginner/settingIcon")
const IsBeginnerStage = () => FindImgInList(settingIcon, [1197, 6, 75, 65])

const ClickMainStory = () => 
{
    if (IsInQuest())
    {
        return true;
    }

    if (IsBeginnerStage() && !IsInQuest())
    {
        console.log("新手阶段，点击主线，等待10秒");
        TapMainStory()
        Sleep(random(5, 15))
    }
    else if (!HasMenu() && !HaveMainStoryIcon())
    {
        return false;
    }

    if (IsMoving())
    {
        return true;
    }
    if (IsAuto_active() || IsInCity() || IsAuto_inactive())
    {
        if ((new Date().getTime() - lastTransformationTime) / 60000 < 4)
        {
            TapMainStory();
        }
        else if (HasTransformIcon())
        {
            TransformMainStory();
        }
        else
        {
            TapMainStory();
        }
        Sleep(random(3, 30));
        console.log("点击主线,并等待随机时间");
    }
    else
    {
        ClearPage();
        TapMainStory();
        console.log("图片识别有问题，默认点击主线位置");
        Sleep(3);
    }
};
const ClickGrowthMission = () =>
{
    clickGrowthMissionTimes++;
    if (clickGrowthMissionTimes > 20)
    {
        console.log("点击成长任务次数过多，切换为主线");
        storyMode = "mainMission";
        lostGrowthMissionTitle = 0;
        clickGrowthMissionTimes = 0;
    }
    const shot = captureScreen();

    // const hasGrowthMissionTitle = FindImgInList(GrowthMissionTitleImgList, [877, 176, 132, 49], shot);
    let hasGrowthMissionTitle = HaveGrowthMissionIcon(shot);
    if (hasGrowthMissionTitle)
    {
        let clip = images.clip(captureScreen(), 931, 196, 115, 34);

        if (HasTransformIcon(shot, [1135, 173, 45, 52]))
        {
            if (!IsInCity())
            {
                RandomPress([1147, 195, 20, 14]);
                if (FindBlueBtn([653, 443, 205, 65]))
                {
                    RandomPress([678, 461, 157, 31]);
                    console.log("开始成长任务传送");
                    Sleep(5);
                }
            }
            else
            {
                RandomPress([909, 197, 181, 31], 3);
            }
        }
        else
        {
            RandomPress([905, 200, 218, 28], 3);
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
        console.log("点击 成长任务");
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

// 点击对话
const TapDialog = () =>
{
    const shot = captureScreen();
    const hasNext = HasNext(shot);
    const hasTalkBubble = HasTalkBubble(shot);

    if (hasNext)
    {
        ClickNext();
    }
    if (hasTalkBubble)
    {
        RandomPress([488, 398, 248, 17]);
        console.log("点击对话气泡")
        if (IsSpeedUpOff(shot))
        {
            RandomPress([1109, 39, 139, 14]);
            RandomPress([1174, 88, 71, 18]);
            RandomPress([1174, 88, 71, 18]);
        }
        return true;
    }
    if (HasSkip())
    {
        ClickSkip();
    }
    if (HasNext())
    {
        ClickNext();
    }
    if (FindImgInList(npcTalk_leaveImgList, [900, 408, 48, 50]))
    {
        console.log("发现npc 对话，离开选项");
        RandomPress([478, 394, 312, 24], 3) //气泡位置
        RandomPress([916, 419, 97, 31]);
    }
};

// ------------------------------------------  main story branch -------------------------------------------
const weaponSelectColorList = [
    ["#3c302a", [[292, -96, "#746d62"], [434, 0, "#535355"], [586, -140, "#877662"], [791, -123, "#363224"]]]
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
    ["#fe2d00", [[6, 0, "#fe2d00"], [20, -4, "#ff2d00"], [21, 5, "#fe2d01"], [49, -4, "#fe2d01"]]],
    ["#2e2f2f", [[497, 96, "#ff2d00"], [497, 99, "#ff2d00"], [497, 102, "#ff2d00"], [501, 101, "#fe2d01"]]],
    ["#fc2e03", [[3, 0, "#ff2d00"], [5, 0, "#fc2e03"], [6, 0, "#fc2e03"], [8, 0, "#f42f08"]]]
];


const DeathFlow = (message) =>
{
    console.log("主线角色死亡，开始死亡流程");
    Sleep(3);
    for (let i = 0; i < 30; i++)
    {
        if (FindBlueBtn([524, 581, 245, 94])) 
        {
            Sleep(3);
            RandomPress([572, 611, 141, 29], 10);
            console.log("死亡流程: 确认死亡");
            break;
        }
        if (FindBlueBtn([536, 415, 204, 77]))
        {
            Sleep(3);
            RandomPress([568, 437, 151, 30], 10);
            console.log("死亡流程: 确认死亡");
            break;
        }
        Sleep();
    }

    const config = ReadConfig();
    config.game.deathTime++;
    config.totalDeathTimes = config.totalDeathTimes ? config.totalDeathTimes : 0;
    config.totalDeathTimes++;
    if (message != null)
    {
        console.log("death message: " + message);
        if (message.includes("death"))
        {
            // if (config.game[message] == null || config.game[message] == undefined)
            if (!config.game[message])
            {
                config.game[message] = 1;
            }
            else
            {
                config.game[message] = config.game[message] + 1;
            }
        }
    }
    if (!WaitUntilMenu())
    {
        console.log("Death Flow: 未发现菜单按钮");
    }
    const isContinuouslyChallengeBoss = IsContinuouslyChallengeBoss();
    if (isContinuouslyChallengeBoss)
    {
        console.log("正在连续挑战boss，检查是否100%恢复，是否自动使用攻速药与恢复药");
        if (!config.game.autoPotion || config.game.deathTime % 5 == 0)
        {
            // if (config.game.deathTime % 20 == 0)
            // {
            //     console.log("死亡20次，额外购买一次药水");
            //     BuyPotion();
            // }

            console.log("死亡五次，检测自动使用攻速药与恢复药");
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
    if (!config.game.changeGameSetting)
    {
        ChangeGameSetting();
    }
    RewriteConfig(config);

    ComprehensiveImprovement();

    storyMode = "growthMission";
};

const IsAttackBoss = () =>
{
    const shot = captureScreen()
    if (FindMultiColors(BossTitleColorList, [893, 153, 228, 23], shot) || FindImgInList(bossFlagIcon, [462, 38, 63, 72], shot))
    {
        return true;
    }
    else
    {
        return false;
    }
}

const AttackingBossFlow = (number) =>
{
    console.log("开始挑战boss流程...");

    let lostTitleCount = 0;
    let switchEnemyToBossTimes = 0;
    let hadInstanceEnemy = false;
    let hadEliminateUnderlings = false;
    let escapeTimes = 0;

    const BossLowHPImgList = LoadImgList("icon/bossLowHP");
    const TapSwitchEnemy = () =>
    {
        if (hadEliminateUnderlings)
        {
            console.log("小兵已经消灭，不需要切tab");
            return true;
        }
        if (hadInstanceEnemy && !IsAimAtBoss())
        {
            console.log("当前目标是小兵，不需要切换目标");
            return true;
        }
        RandomPress([1082, 434, 25, 23], 0.05);
        console.log("tap switch enemy");
        threads.start(function ()
        {
            setTimeout(() =>
            {
                const isAimToBoss = IsAimAtBoss();
                if (!isAimToBoss)
                {
                    hadInstanceEnemy = true;
                    console.log("boss已经召唤小兵");
                }
                if (hadInstanceEnemy && isAimToBoss)
                {
                    switchEnemyToBossTimes++;
                }
                if (switchEnemyToBossTimes > 10)
                {
                    console.log("小兵已经消灭");
                    hadEliminateUnderlings = true;
                }
            }, 2000);
        });
    };

    const AimAtBossColorList = [
        ["#d80802", [[0, -3, "#ea0700"], [17, -2, "#e70700"], [30, -2, "#d90904"], [38, -3, "#eb0700"]]],
        ["#d80701", [[17, -1, "#df0700"], [34, -2, "#e30700"], [49, -2, "#de0701"], [57, 4, "#cb0600"]]],
        ["#cc0b06", [[1, 0, "#e40700"], [1, 3, "#d80701"], [18, -3, "#f00700"], [18, 0, "#e60700"]]],
        ["#d02408", [[-1, 0, "#ea2700"], [-1, 1, "#e62600"], [-1, 3, "#de2500"], [0, 6, "#b92007"]]],
        ["#f22900", [[0, 1, "#ef2800"], [0, 3, "#e62600"], [0, 6, "#d92400"], [0, 9, "#cb2200"]]],
        ["#ee2800", [[0, 1, "#ea2700"], [0, 3, "#e22600"], [0, 4, "#de2500"], [0, 5, "#d92400"]]],
        ["#f62900", [[0, 3, "#eb2700"], [0, 5, "#e22600"], [0, 6, "#de2500"], [0, 7, "#d92400"]]],
        ["#f22900", [[0, 2, "#ea2700"], [0, 3, "#e62600"], [11, 1, "#ef2800"], [11, 3, "#e62600"]]],
        ["#f22900", [[0, 2, "#ea2700"], [0, 5, "#de2500"], [11, 1, "#ef2800"], [11, 5, "#de2500"]]],
        ["#ee2800", [[0, 3, "#e22600"], [-3, 5, "#d02507"], [11, 1, "#eb2700"], [11, 5, "#d92400"]]],
        ["#f22900", [[0, 3, "#e62600"], [0, 5, "#de2500"], [6, 9, "#cb2200"], [8, 9, "#cb2200"]]]
    ];

    // console.log(FindMultiColors(CharacterLowHPColorList, [101, 13, 19, 32]));
    const RedColorList = ["#922A30", "#A02F35", "#A63137", "#AA3239", "#AC333A", "#AF343B", "#B7373E", "#C43C43", "#C63C44", "#CD3F47"];
    const IsCharacterLowHP = (pos) =>
    {
        let isSimilar = false;
        pos = pos || [637, 268];
        const pos_length = pos[0] + 5;
        const shot = captureScreen();
        for (let i = pos[0]; i < pos_length; i++)
        {
            let color2 = images.pixel(shot, i, pos[1]);
            for (let i = 0; i < RedColorList.length; i++)
            {
                isSimilar = colors.isSimilar(RedColorList[i], color2, 20);
                if (isSimilar)
                {
                    return false;
                }
            }
        }
        return true;
    };

    const IsAimAtBoss = () =>
    {
        const shot = captureScreen();
        if (FindMultiColors(AimAtBossColorList, [533, 4, 218, 42], shot) || FindImgInList(bossFlagIcon, [462, 38, 63, 72], shot))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    // const BossHalfHPImgList = LoadImgList("icon/bossHalfHP");
    const IsBossDead = () =>
    {
        const bossTitle = FindMultiColors(BossTitleColorList, [899, 151, 114, 27]);
        if (!bossTitle)
        {
            if (!IsAimAtBoss())
            {
                lostTitleCount++;
                console.log("失去boss目标次数: " + lostTitleCount);
                if (lostTitleCount > 3)
                {
                    console.log("boss 目标丢失，退出boss 流程");
                    return true;
                }
            }

        }
        return false;
    };
    // const IsBossLowHP = () => FindImgInList(BossLowHPImgList, [518, 65, 68, 30]);
    const IsBossLowHP = () =>
    {
        let isSimilar = false;
        const shot = captureScreen();
        for (let i = 580; i < 582; i++)
        {
            let color2 = images.pixel(shot, i, 73);
            for (let i = 0; i < RedColorList.length; i++)
            {
                isSimilar = colors.isSimilar(RedColorList[i], color2, 20);
                if (isSimilar)
                {
                    return false;
                }
            }
        }
        return true;
    };


    challengeBossTimeArray.push(new Date().getTime());
    if (number == 1)
    {
        console.log("初始位置向左偏移: 1s");
        SwipeRight(1);
    }
    else if (number == 2)
    {
        console.log("初始位置向右偏移: 3s");
        SwipeRight(3);
    }
    // else if (number == 3)
    // {
    //     console.log("初始位置向下偏移: 3s");
    //     SwipeDown(3);
    // }
    else if (number == 4)
    {
        console.log("初始位置向上移动: 6s");
        SwipeUp(6);
        Sleep(1);
        SwipeRight(3);
        Sleep(1);
        SwipeDown(3);
        Sleep(1);
    }
    let isDead = false;
    let isBossDead = false;
    let time = 0;

    let moveTimeArr = [
        [2.3],
        [2.6],
        [2.8],
        [2.6],
        [3, 2.7, 3, 2.7],
    ];
    const moveTime = moveTimeArr[number];

    while (isDead == false && isBossDead == false)
    {
        if (IsAuto_inactive())
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
            if (number == 0)
            {
                TapSwitchEnemy();
                SwipeDown(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeRight(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeUp(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeLeft(moveTime[0]);
                Sleep(1);
            }
            else if (number == 1)
            {
                SwipeRight(moveTime[0]);
                Sleep(3);
                if (IsBossLowHP())
                {
                    escapeTimes++;
                    if (escapeTimes < 2)
                    {
                        console.log("boss当前血量较低，即将发绝招，需躲避,向左移动15秒");
                        SwipeLeft(15);
                    }
                }
                SwipeUp(moveTime[0]);
                Sleep(3);
                if (IsBossLowHP())
                {
                    escapeTimes++;
                    if (escapeTimes < 2)
                    {
                        console.log("boss当前血量较低，即将发绝招，需躲避,向下移动15秒");
                        SwipeDown(15);
                    }
                }

                SwipeLeft(moveTime[0]);
                Sleep(3);
                if (IsBossLowHP())
                {
                    escapeTimes++;
                    if (escapeTimes < 2)
                    {
                        console.log("boss当前血量较低，即将发绝招，需躲避，向右移动15秒");
                        SwipeRight(15);
                    }

                }
                SwipeDown(moveTime[0]);
                Sleep(3);
                if (IsBossLowHP())
                {
                    escapeTimes++;
                    if (escapeTimes < 2)
                    {
                        console.log("boss当前血量较低，即将发绝招，需躲避，向上移动15秒");
                        SwipeUp(15);
                    }

                }
            }
            else if (number == 2)
            {
                TapSwitchEnemy();
                SwipeUp(moveTime[0]);
                Sleep(1);
                TapSwitchEnemy();
                SwipeRight(moveTime[0]);
                Sleep(1);
                TapSwitchEnemy();
                SwipeDown(moveTime[0]);
                Sleep(1);
                TapSwitchEnemy();
                SwipeLeft(moveTime[0]);
                Sleep(1);

            }
            else if (number == 3)
            {
                TapSwitchEnemy();
                SwipeDown(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeRight(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeUp(moveTime[0]);
                Sleep(1);

                TapSwitchEnemy();
                SwipeLeft(moveTime[0]);
                Sleep(1);

            }
            else if (number == 4)
            {
                SwipeLeft(moveTime[0]);
                TapSwitchEnemy();
                if (!hadInstanceEnemy)
                {
                    if (IsCharacterLowHP())
                    {
                        console.log("角色血量较低，停止攻击");
                        SwipeLeft(moveTime[0]);
                    }
                    else
                    {
                        Sleep(1);
                    }
                }
                else
                {
                    Sleep(1);
                }

                SwipeDown(moveTime[1]);
                if (!hadInstanceEnemy)
                {
                    if (IsCharacterLowHP())
                    {
                        console.log("角色血量较低，停止攻击");
                        SwipeDown(moveTime[1]);
                    }
                    else
                    {
                        Sleep(1);
                    }
                }
                else
                {
                    Sleep(1);
                }

                SwipeRight(moveTime[2]);

                TapSwitchEnemy();
                if (!hadInstanceEnemy)
                {
                    if (IsCharacterLowHP())
                    {
                        console.log("角色血量较低，停止攻击");
                        SwipeRight(moveTime[2]);
                    }
                    else
                    {
                        Sleep(1);
                    }
                }
                else
                {
                    Sleep(1);
                }

                SwipeUp(moveTime[3]);

                TapSwitchEnemy();
                if (!hadInstanceEnemy)
                {
                    if (IsCharacterLowHP())
                    {
                        console.log("角色血量较低，停止攻击");
                        SwipeUp(moveTime[3]);
                    }
                    else
                    {
                        Sleep(1);
                    }
                }
                else
                {
                    Sleep(1);
                }

            }
            console.log("圈数: " + time);
        }

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
    console.log("挑战boss循环结束");
    RecycleImgList(BossLowHPImgList);
    if (isBossDead)
    {
        console.log(`@第${number}个boss已击败`);

    }
    // RecycleImgList(BossHalfHPImgList);
};

const MainStoryBranch = () =>
{
    const shot = captureScreen();

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
        else
        {
            RandomPress([222, 243, 748, 235], 3)
            if (FindBlueBtn([1032, 621, 197, 62]))
            {
                RandomPress([1052, 636, 157, 33]);
            }
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
        ChangeGameSetting();
        for (let i = 0; i < 30; i++)
        {
            if (HasMenu())
            {
                break;
            }
            ClearPage()
            Sleep()
        }
        if (HasMenu())
        {
            console.log("开始开新手箱子...");
            ComprehensiveImprovement()
            AutoReleaseSkill();
            Sleep();
        }
        Sleep();
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
    const hasBackpackClose = FindImgInList(backpackTrashIcon, [978, 651, 50, 51], shot);
    if (hasBackpackClose)
    {
        if (HasTip())
        {
            console.log("背包tip");
            RandomPress([946, 170, 37, 36]);
        }
        else
        {
            OpenAllBox();
            WearEquipments();
        }

    }
    const hasSkillBookPage = FindImgInList(MainStoryBranchImgList.skillBookPage, [1005, 100, 107, 45], shot)
    if (hasSkillBookPage)
    {
        console.log("发现技能书页面，开始穿戴技能")
        AutoReleaseSkill()

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
            if (FindBlueBtn([1008, 646, 271, 61]))
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
        let isDetectTime = 0;
        console.log("检测到目标为boss。是否需要跳过动画");
        for (let i = 0; i < 60; i++)
        {
            if (HasSkip())
            {
                console.log("点击跳过打boss动画");
                ClickSkip();
                Sleep();
            }
            if (IsAttackBoss())
            {
                isDetectTime++;
                console.log("isDetectTime :" + isDetectTime);
            }
            if (isDetectTime > 3)
            {
                console.log("已经跳过动画，直接打boss");
                break;
            }
            sleep(100);
        }
        RandomPress([1144, 438, 29, 14]); //auto attack
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

    if (FindRedBtn([427, 504, 200, 62]))
    {
        console.log("不小心点击了公会详情，点击离开");
        RandomPress([457, 514, 146, 39]);
    }

    if (DeathCheck())
    {
        DeathFlow();
    }
    if (IsHaltMode())
    {
        ExitHaltMode()
        ChangeGameSetting()
    }
    IsNotMovingCheck();
};


//01: lv5
//02: buy skill book
//03 lv10
//04 weapon skill 武器特性
//05 lv15
//06 join guild 加入公会
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
    if (!HasMenu())
    {
        return false;
    }
    if (IsMoving())
    {
        return true;
    }
    console.log("成长任务流程");
    if (HaveGrowthMissionIcon())
    {
        ClickGrowthMission();
    }
    else if (HaveFinished([1112, 118, 85, 243]))
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
    let hadMissionFinished = HaveFinished([1126, 108, 69, 268], shot);
    if (hadMissionFinished)
    {
        console.log("发现有任务完成，点击完成");
        RandomPress([hadMissionFinished.x, hadMissionFinished.y, 10, 10], 3);
        RandomPress([777, 435, 50, 53]);
        Sleep(4);
    }
    const hasSkillBookPage = FindImg(GrowthImgList.skillBookMerchantPage, [1031, 3, 202, 60], shot);
    if (hasSkillBookPage)
    {
        console.log("成长任务2: 购买技能书");
        BuySkillBook(true);
        ClearPage();
        OpenAllBox();
    }
    const hasWeaponFeaturesPage = FindImgInList(GrowthImgList.weaponFeaturesPage, [1095, 6, 133, 53], shot);
    if (hasWeaponFeaturesPage)
    {
        console.log("成长任务4：武器特性 ");
        RandomPress([631, 178, 21, 23]);
        if (FindBlueBtn([996, 638, 207, 66]))
        {
            RandomPress([1018, 652, 162, 31]);
        }
        ClearPage();

    }
    const hasGuildPage = FindImgInList(GrowthImgList.joinGuildPage, [561, 644, 72, 69], shot);
    if (hasGuildPage)
    {
        console.log("成长任务 6: 加入公会");
        RandomPress([1227, 19, 28, 28]);//page back
        GuildDonation();
        storyMode = "mainMission";
        lostGrowthMissionTitle = 0;
        clickGrowthMissionTimes = 0;
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
            console.log("Change 主线模式为每日任务模式。");
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
        if (HaveFinished([1126, 210, 57, 33]))
        {
            RandomPress([900, 195, 268, 42]);
            Sleep(4);
            OpenAllBox();
            WearEquipments();
            StrengthenEquipment();
        }
        storyMode = "mainMission";
    }
    const hasCoreAnimalPage = FindImgInList(GrowthImgList.coreAnimalPage, [1141, 8, 124, 53], shot);
    if (hasCoreAnimalPage)
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
        console.log("成长任务，已切换到主线模式，判断是否需要挂机");
        console.log("判断等级是否是34级");
        const config = ReadConfig();
        let lv = config.game.lv;
        console.log("当前等级为：" + lv);
        if (!lv) 
        {
            console.log("配置文件没有等级信息,重新识别等级");
            lv = GetCharacterLv();
            config.game.lv = lv;
            RewriteConfig(config);
        }
        if (!lv || lv < 35)
        {
            console.log("等级小于34级，切换模式为挂机模式，去地图挂机");
            specialConfig.gameMode = "instance";
            specialConfig.lastModeChangeTime = new Date();
        }
        else if (config.unlockTrade && config.game.deathTime >= 3)
        {
            console.log("后续推进主线死亡三次，返回主线挂机")
            specialConfig.gameMode = "instance"
            specialConfig.lastModeChangeTime = new Date();
        }
        else if (!config.unlockTrade && config.game.deathTime >= 20)
        {
            console.log("今日死亡次数过多，先去挂机,死亡次数为：" + config.game.deathTime);
            specialConfig.gameMode = "instance";
            specialConfig.lastModeChangeTime = new Date();
        }
        return true;
    }

};

const DailyMissionFlow = () =>
{
    const shot = captureScreen();
    const isQuest = IsInQuest();
    if (isQuest)
    {
        return true;
    }
    if (!HaveMainStoryIcon())
    {
        return false;
    }
    console.log("正在进行成长任务...");
    const isFinished = HaveFinished([1080, 118, 114, 251], shot);
    if (isFinished)
    {
        console.log("每日任务完成 !");
        RandomPress([911, 257, 259, 35], 3);
        // select the last card
        RandomPress([777, 435, 50, 53]);
        Sleep(4);
        storyMode = "growthMission";
    }
    let hasDailyMission = HaveDailyMissionIcon(shot);
    if (hasDailyMission)
    {
        //是否有传送图标
        let dailyTransformIcon = HasTransformIcon(shot, [hasDailyMission.x + 260, hasDailyMission.y - 20, 60, 60]);
        if (dailyTransformIcon)
        {
            if ((new Date().getTime() - lastTransformationTime) / 60000 > 4)
            {
                console.log("每日任务，直接传送");
                RandomPress([dailyTransformIcon.x, dailyTransformIcon.y, 5, 5], 3);
                if (FindBlueBtn([655, 445, 201, 62]))
                {
                    RandomPress([680, 462, 152, 30], 15);
                    console.log("确认传送");
                    lastTransformationTime = new Date().getTime();
                    clickDailyMissionTimes++;
                }
            }
            else
            {
                RandomPress([hasDailyMission.x, hasDailyMission.y, 100, 20], 10);
                clickDailyMissionTimes++;
            }

        }
        else
        {
            RandomPress([hasDailyMission.x, hasDailyMission.y, 100, 20], 10);
            clickDailyMissionTimes++;
        }
        if (clickDailyMissionTimes > 20)
        {
            console.log("Change 每日任务，点击次数过多，切换模式为成长任务");
            storyMode = "growthMission";
            clickDailyMissionTimes = 0;
        }

    }
    else
    {
        console.log("未发现每日任务图标，切换模式为成长任务");
        storyMode = "growthMission";
    }
};
const IsNotMovingCheck = () =>
{
    if (!HaveMainStoryIcon())
    {
        return false;
    }
    if (IsMoving() || IsInQuest())
    {
        return true;
    }
    console.log("未移动异常检测");
    if (storyMode == "mainMission")
    {
        ClickMainStory();
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
    if (isSameMainStoryTime == 0)
    {
        console.log("记录当前任务");
        isSameMainStory = images.clip(captureScreen(), 903, 156, 70, 15);
        isSameMainStoryTime++;
    }
    else
    {
        TapMainStory();
        let isLongTimeNoContinue = FindImg(isSameMainStory, [887, 143, 109, 45]);
        if (isLongTimeNoContinue)
        {
            isSameMainStoryTime++;
            console.log("点击到相同任务，次数加一，当前次数为：" + isSameMainStoryTime);
            if (isSameMainStoryTime > 2)
            {
                isSameMainStoryTime = 0;
                console.log("连续主线的任务相同，可能被卡住，随机移动");
                console.log("当前任务模式为：" + storyMode);
                const isInSecretLab = FindImgInList(secretLabImgList, [139, 112, 115, 55]);
                if (isInSecretLab)
                {
                    console.log("在秘密实验室停止移动，回到主城继续主线");
                    ReturnHome();
                    return true;
                }
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
    }
};
// storyMode = "growthMission";
const MainStoryFlow = () =>
{
    if (storyMode == "mainMission")
    {
        ClickMainStory();
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


module.exports = { MainStoryFlow };

// ClickMainStory()