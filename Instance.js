
const { FindMultiColors, RandomPress, HasMenu, HasMenuClose, WaitUntilPageBack, FindBlueBtn, Sleep, IsMoving, PageBack, WaitUntil, IsHaltMode, ExitHaltMode,
    FindImg, IsInCity, WaitUntilMenu, EnterMenuItemPage, FindNumber,
    ChangeHaltModeTime, ChangeRecoverPotionPercentToNormal, ClickAuto,
    DeathCheck,
    IsLocked, IsInQuest, IsAuto_active, IsAuto_inactive, IsNoPotion,
    LoadImgList,
    FindImgInList, FindRedBtn, FindGoldBtn,

    HasPopupClose, HaveDailyMissionIcon, HaveFinished, HasMap,
    PressToAuto,
    RecycleImgList, ReadConfig, RewriteConfig,

    MatchTemplateList,
    SwipeSlowly,
    ClearPage,
    ChangeGameSetting,
    OpenBackpack,
    GoToTheNPC,
    HasPageback,
    EnterHaltMode,
    ReturnHome,
    specialConfig,
} = require("./utils");
const { ComprehensiveImprovement_Instance, DailyQuest, LoginProps } = require("./CommonFlow");
const { UnAutoPotion, DecomposeEquipment } = require("./Backpack");


const MapIconColorList = [
    ["#c9ba89", [[16, 2, "#50452f"], [8, 14, "#d0bf8d"], [-2, 15, "#dccb96"], [16, 16, "#d7c692"]]],
    ["#cfbe8d", [[-1, 16, "#dccb96"], [7, 20, "#dac994"], [16, 17, "#d1c18f"], [17, 17, "#d7c692"]]],
    ["#cbba89", [[4, -7, "#dccb96"], [7, -2, "#dccb96"], [-2, 15, "#dccb96"], [18, 17, "#958863"]]],
    ["#cbba89", [[6, -1, "#d7c692"], [3, 6, "#dccb96"], [-1, 15, "#dccb96"], [16, 17, "#d9c894"]]],
    ["#c8b889", [[5, 1, "#dbc996"], [-2, 16, "#dccb96"], [16, 17, "#cebd8b"], [6, 20, "#d3c18f"]]],
    ["#ccbb89", [[6, 0, "#d7c692"], [-1, 16, "#dccb96"], [7, 20, "#d3c18f"], [16, 18, "#d9c894"]]],
    ["#c8b888", [[5, 0, "#dbc996"], [-2, 15, "#dccb96"], [6, 19, "#d3c18f"], [16, 16, "#cebd8b"]]]

];
const MapIconGrayColorList = [
    ["#8a8a8b", [[5, -1, "#8f8f8f"], [9, 14, "#494b4b"], [-2, 16, "#989898"], [16, 18, "#3e3f40"]]],
    ["#8b8b8b", [[6, 0, "#949494"], [16, 3, "#888888"], [-1, 15, "#949494"], [7, 19, "#949494"]]]
];

const InInstanceColorList = [
    ["#ffffff", [[7, -6, "#ffffff"], [7, -4, "#ffffff"], [14, -1, "#fcfcfc"], [13, 12, "#e6e6e5"]]],
    ["#ffffff", [[-6, 3, "#fefefd"], [-5, 15, "#e3e3e3"], [7, 2, "#ededed"], [5, 16, "#e6e6e5"]]]
];

const FirstLevel = [
    [20, 181, 31, 40],
    [20, 247, 31, 40],
    [20, 317, 32, 40],
    [20, 380, 33, 40]
];

const SecondLevel = [];
for (let i = 0; i < 5; i++)
{
    SecondLevel.push([100, 220 + i * 51, 130, 30]);
}

const ThirdLevel = [];
for (let i = 0; i < 8; i++)
{
    ThirdLevel.push([950, 130 + i * 53, 200, 30]);
}

let instance_mode = "hangUpInstance";
let lastHangUpWildTime, lastTimeEnterHaltMode = new Date().getTime();
let lastTimeEnterInstance = 1726208812345;
let lastTimeClickDailyMission = 1726208812345;

let clickDailyMissionAwardsTimes = 0;

let tradingHours = null;
let mapName = null;
let monsterMapList = null;


const death_haltMode = LoadImgList("special/death_haltmode");


const DeathFlow_HaltMode = (shot) =>
{
    if (FindImgInList(death_haltMode, [582, 526, 119, 60], shot))
    {
        console.log("省电模式：死亡");
        ExitHaltMode();
    }
};


const HangUpInstance = () =>
{
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    if (!HasMenu() && !HasMenuClose())
    {
        console.log("fn: 副本，没有菜单，退出");
        return false;
    }

    DailyQuest();
    const config = ReadConfig();

    if (!config.game.changeGameSetting)
    {
        const isChangeSuccess = ChangeGameSetting();
        if (isChangeSuccess)
        {
            config.game.changeGameSetting = true;
        }
    }

    const hasEnterInstancePage = EnterMenuItemPage("instance");
    if (!hasEnterInstancePage)
    {
        console.log("进入副本失败");
        if (IsLocked([873, 309, 27, 31]))
        {
            console.log("副本暂未解锁，跳过副本");

            config.game.dailyInstance = true;
            RewriteConfig(config);
            instance_mode = "dailyMission";
        }
        return false;
    }

    const instancePos = [
        [90, 100, 250, 100],
        [90, 280, 250, 100],
        [90, 450, 250, 100],
        [90, 620, 250, 50]
    ];
    const timeOverImgList = LoadImgList("icon/instance/timeOver");

    let curCombatPower = FindNumber("combatPower", [1141, 535, 115, 47]);
    console.log("当前战力为：" + curCombatPower);

    const CanEnterInstance = () => FindBlueBtn([979, 637, 276, 74]);
    const PressEnterInstanceBtn = () => { RandomPress([1010, 656, 214, 37]); Sleep(10); WaitUntilMenu(); PressToAuto(); };

    let haveAvalableInstance = false;

    const shot = captureScreen();
    for (let i = 0; i < instancePos.length; i++)
    {
        if (FindImgInList(timeOverImgList, [317, 170 + i * 170, 70, 34], shot))
        {
            console.log("该副本已结束");
            continue;
        }
        RandomPress(instancePos[i]);
        let canEnterInstance = CanEnterInstance();
        let hadPressSecondLevel = false;
        if (canEnterInstance)
        {
            if (curCombatPower > 23500)
            {
                console.log("战力大于23500，点击第二层");
                RandomPress([990, 361, 55, 49]);
                hadPressSecondLevel = true;
            }
            let requireCombatPower = FindNumber("combatPower", [1143, 494, 108, 45]);
            if (hadPressSecondLevel)
            {
                if (curCombatPower < requireCombatPower)
                {
                    RandomPress([700, 361, 49, 51]); //first level
                    requireCombatPower = FindNumber("combatPower", [1143, 494, 108, 45]);
                }
            }

            if (curCombatPower > requireCombatPower)
            {
                console.log(curCombatPower + "  >>>  " + requireCombatPower);
                PressEnterInstanceBtn();
                lastTimeEnterInstance = new Date().getTime();
                instance_mode = "hangUpInstance";
                haveAvalableInstance = true;
                break;
            }
        }
    }
    if (!haveAvalableInstance)
    {
        config.game.dailyInstance = true;
        instance_mode = "dailyMission";
        console.log("没有副本可以进入，开始每日任务");
        PageBack();
        for (let i = 0; i < 10; i++)
        {
            if (HasMenu())
            {
                break;
            }
            else if (HasPopupClose([1031, 84, 51, 54]))
            {
                RandomPress([1031, 84, 51, 54]);
            }
            ClearPage();
            Sleep();
        }
    }
    else
    {
        if (!IsInCity())
        {
            EnterHaltMode();
        }

    }
    config.game.combatPower = curCombatPower;
    RewriteConfig(config);

    return false;
};
//接受任务
const AcceptDailyMission = () =>
{
    console.log("fn: " + "接受每日任务");
    const dailyMissionItem = LoadImgList("icon/font/dailyMission/dailyMissionItem");
    const weeklyMissionItem = LoadImgList("icon/font/dailyMission/weeklyMissionItem");

    const inProgressImgList = LoadImgList("icon/font/dailyMission/inProgress");
    const isCompleteImgList = LoadImgList("icon/font/dailyMission/complete");
    const accepteMaxImgList = LoadImgList("icon/font/dailyMission/accepteMax");

    const missionAwardImgList = LoadImgList("icon/font/dailyMission/missionCompleteAward");
    const weeklyMissionGoalImgList = LoadImgList("icon/font/dailyMission/weeklyMissionGoal");

    const weeklyMissionIconImgList = LoadImgList("icon/font/dailyMission/weeklyMissionIcon");
    let dailyMissionItemPoints;

    let haveAccepteMax = false;

    out: for (let i = 0; i < 10; i++)
    {
        for (let n = 0; n < 2; n++)
        {
            if (FindImgInList(accepteMaxImgList, [1225, 611, 50, 51]))
            {
                console.log("@今日已经接受了10个任务");
                haveAccepteMax = true;
                break out;
            }
            for (let k = 0; k < 10; k++)
            {
                dailyMissionItemPoints = MatchTemplateList(dailyMissionItem, [331, 101, 82, 549]);
                for (let j = 0; j < dailyMissionItemPoints.length; j++)
                {
                    if (FindImgInList(inProgressImgList, [680, dailyMissionItemPoints[j].y - 12, 70, 30]))
                    {
                        console.log("正在进行中...");
                    }
                    else if (FindImgInList(isCompleteImgList, [700, dailyMissionItemPoints[j].y - 15, 40, 25]))
                    {
                        console.log("已完成");
                    }
                    else
                    {
                        RandomPress([300, dailyMissionItemPoints[j].y - 20, 350, 40]);
                        if (FindBlueBtn([1069, 646, 205, 60]))
                        {
                            console.log("接受此任务");
                            RandomPress([1091, 661, 164, 28]);
                            break;
                        }
                    }
                }
                if (FindImgInList(missionAwardImgList, [572, 162, 137, 64]))
                {
                    console.log("任务完成奖励，点击领取");
                    RandomPress([454, 435, 375, 48]);
                }
            }
            SwipeSlowly([450, 500, 10, 10], [450, 300, 10, 10], 2);
        }
        RandomPress([62, 664, 105, 21]);
        WaitUntil(() => HasPopupClose([819, 207, 53, 50]));
        if (FindBlueBtn([657, 444, 197, 64]))
        {
            console.log("刷新任务列表");
            RandomPress([678, 459, 154, 33], 2);
            hadRefresh = true;
        }
        else
        {
            console.log("刷新任务列表失败");
            break;
        }
    }

    console.log("接受周任务");

    for (let i = 0; i < 5; i++)
    {
        if (!FindImgInList(weeklyMissionIconImgList, [243, 119, 47, 187]))
        {
            RandomPress([194, 78, 63, 16], 3);
        }
    }
    let isCorrectNum = 0;
    for (let i = 0; i < 3; i++)
    {
        if (isCorrectNum >= 3)
        {
            console.log("已检查周任务，已接受，返回");
            break;
        }
        let weeklyMissionItemPoints = MatchTemplateList(weeklyMissionItem, [282, 122, 118, 518]);
        for (let j = 0; j < weeklyMissionItemPoints.length; j++)
        {
            if (FindImgInList(inProgressImgList, [675, weeklyMissionItemPoints[j].y - 15, 80, 30]))
            {
                console.log("正在进行中");
                isCorrectNum++;
            }
            else if (FindImgInList(isCompleteImgList, [690, weeklyMissionItemPoints[j].y - 15, 80, 30]))
            {
                console.log("已完成");
                isCorrectNum++;
            }
            else
            {
                RandomPress([350, weeklyMissionItemPoints[j].y - 15, 300, 30]);
                if (FindBlueBtn([1069, 645, 210, 62]))
                {
                    console.log("接受此周任务");
                    RandomPress([1101, 661, 153, 31]);
                    isCorrectNum++;
                }
            }
        }
        //纠错，防止接受错误周任务
        let inProgressPoints = MatchTemplateList(inProgressImgList, [677, 113, 96, 530]);
        for (let k = 0; k < inProgressPoints.length; k++)
        {
            if (FindImgInList(weeklyMissionItem, [285, inProgressPoints[k].y + 5, 100, 30]))
            {
                console.log("检查周任务：正确");
            }
            else
            {
                console.log("接受错误周任务");
                RandomPress([285, inProgressPoints[k].y - 10, 300, 30]);
                if (FindImgInList(weeklyMissionGoalImgList, [781, 249, 248, 62]))
                {
                    console.log("是周任务，不需要放弃");
                    isCorrectNum++;
                }
                else if (FindRedBtn([1072, 647, 202, 59]))
                {
                    console.log("点击放弃");
                    RandomPress([1097, 659, 158, 32]);
                }
            }
        }
        SwipeSlowly([450, 500, 10, 10], [450, 300, 10, 10], 2);
    }

    RecycleImgList(dailyMissionItem);
    RecycleImgList(weeklyMissionItem);

    RecycleImgList(inProgressImgList);
    RecycleImgList(isCompleteImgList);
    RecycleImgList(accepteMaxImgList);

    RecycleImgList(missionAwardImgList);
    RecycleImgList(weeklyMissionGoalImgList);

    if (haveAccepteMax)
    {
        const config = ReadConfig();
        config.game.accepteDailyMission = true;
        RewriteConfig(config);
    }
    for (let i = 0; i < 10; i++)
    {
        PageBack();
        if (HasMenu())
        {
            console.log("接受每日任务流程结束。");
            break;
        }
        if (HasPopupClose([819, 207, 53, 50]))
        {
            RandomPress([835, 219, 26, 24]);
        }
    }
};
const ClickDailyMission = () =>
{
    console.log("fn: 点击成长任务");
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    if (!HasMenu())
    {
        return false;
    }

    const shot = captureScreen();
    const haveDailyMissionIcon = HaveDailyMissionIcon(shot);
    if (haveDailyMissionIcon)
    {
        Sleep(random(1, 5));
        RandomPress([haveDailyMissionIcon.x, haveDailyMissionIcon.y, 100, 40]);
        instance_mode = "dailyMission";
    }
    else 
    {
        console.log("未发现每日任务图标。");
        const config = ReadConfig();
        if (config.game.accepteDailyMission)
        {
            console.log("每日任务已做完，切换到野外挂机");
            instance_mode = "hangUpWild";
        }
    }

};
const DailyMission = () =>
{
    console.log("fn: 每日任务流程");
    const config = ReadConfig();
    if (config.game.accepteDailyMission)
    {
        console.log("已接受每日任务");
    }
    else
    {
        console.log("开始每日任务");
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        const hasEnter = EnterMenuItemPage("mission");
        if (!hasEnter)
        {
            console.log("进入每日任务页面 失败");
            if (IsLocked([1100, 199, 52, 66]))
            {
                console.log("每日任务暂未解锁，跳过daily mission");

                config.game.accepteDailyMission = true;

                config.gameMode = "mainStory";
                specialConfig.gameMode = "instance";
                specialConfig.initGameMode = "mainStory";
                RewriteConfig(config);
                instance_mode = "hangUpWild";
            }
            return false;
        }
        else
        {
            const missionMap = [25, 181, 188, 27];
            RandomPress(missionMap);
            if (!FindBlueBtn([1071, 647, 208, 61]))
            {
                console.log("地图未解锁，主线错误");
                config.game.accepteDailyMission = true;

                config.gameMode = "mainStory";
                specialConfig.gameMode = "instance";
                specialConfig.initGameMode = "mainStory";
                RewriteConfig(config);
                return false;
            }
            AcceptDailyMission();

        }

    }

    ClickDailyMission();
};
const HasTransformScroll_secretLab = () =>
{
    let hasScroll = null;
    if (!OpenBackpack("props", true))
    {
        console.log("打开背包失败，退出");
        return false;
    }
    const transformScroll_secretLab = LoadImgList("backpack/transformScroll/secretLab");
    hasScroll = FindImgInList(transformScroll_secretLab, [935, 157, 252, 438]);
    if (hasScroll)
    {
        console.log("发现秘密实验室传送卷轴");
    }
    else
    {
        console.log("没有发现秘密实验室传送卷轴");
    }
    RecycleImgList(transformScroll_secretLab);
    return hasScroll;
};
const UseScroll = () =>
{
    const randomPosition = [
        [411, 362, 67, 75],
        [556, 167, 50, 51],
        [521, 401, 47, 60]];
    let hasScroll = HasTransformScroll_secretLab();
    if (hasScroll)
    {
        RandomPress([hasScroll.x, hasScroll.y, 10, 10]);
        RandomPress([hasScroll.x, hasScroll.y, 10, 10], 12);
        WaitUntil(HasMenu);
        Sleep(random(1, 10));
        RandomPress([140, 161, 116, 107]); //map
        WaitUntil(HasPageback);
        Sleep();
        let clip = images.clip(captureScreen(), 336, 345, 45, 54);
        for (let i = 0; i < 1000; i++)
        {
            RandomPress(randomPosition[random(0, 2)], 10);
            if (!FindImg(clip, [321, 333, 80, 81]))
            {
                console.log("正在移动中...");
                break;
            }
            else
            {
                console.log("没有移动，重新点击");
                RandomPress(randomPosition[random(0, 2)], 10);
            }
        }
        PageBack();
        Sleep(15);
        WaitUntil(() => !IsMoving());
        PressToAuto();
    }
};


const CollectMonsterCollection = () =>
{
    console.log("开始怪物图鉴");
    if (monsterMapList == null)
    {
        const config = ReadConfig();
        monsterMapList = config.ui.monsterMapList;
    }
    const hadOpenMap = OpenMap();
    for (let i = 0; i < monsterMapList.length; i++)
    {
        let monsterMap = monsterMapList[i];
        if (monsterMap)
        {
            let bigMap = monsterMap.split();
        }
    }
};

const OpenMap = () =>
{
    console.log("打开地图");
    for (let i = 0; i < 10; i++)
    {
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        if (FindMultiColors(MapIconColorList, [33, 116, 45, 56]) || HasMap())
        {
            RandomPress([132, 144, 157, 124]);
            if (WaitUntilPageBack())
            {
                return true;
            }
        }
        Sleep();
        ClearPage();
    }
    console.log("打开地图失败");
    return false;
};


const EnterMap = (mapName) =>
{
    console.log("fn：进入地图：" + mapName);
    const [firstLevel, secondLevel, thirdLevel] = mapName;

    let hasMoved = false;

    RandomPress(FirstLevel[firstLevel]);
    RandomPress(SecondLevel[secondLevel]);
    RandomPress(ThirdLevel[thirdLevel]);
    if (FindBlueBtn([1066, 647, 162, 67]))
    {
        RandomPress([1086, 664, 120, 30]);
        if (FindBlueBtn([651, 382, 217, 69]))
        {
            RandomPress([681, 401, 150, 28]);
            console.log("@等待传送...");
            Sleep(15);
            if (WaitUntil(HasMenu, 2000, 30))
            {
                hasMoved = true;
            }
        }
    }
    else if (FindBlueBtn([907, 651, 162, 61]))
    {
        RandomPress([936, 667, 111, 27]);
        PageBack();
        hasMoved = true;
    }
    return hasMoved;
};

const HangUpSecretLab = () =>
{
    console.log("fn: 秘密实验室流程");

    if (!OpenMap())
    {
        return false;
    }
    if (!EnterMap([0, 3, 2]))
    {
        console.log("进入地图失败，退出");
        return false;
    }
    console.log("到达秘密实验室前。");
    if (!OpenMap())
    {
        return false;
    }
    RandomPress(SecondLevel[3]);
    RandomPress(ThirdLevel[5]);
    let hadArrived = false;
    if (FindBlueBtn([938, 648, 256, 62]))
    {
        console.log("点击自动移动");
        RandomPress([967, 663, 203, 35]);
        if (WaitUntil(() => FindBlueBtn([657, 445, 200, 64])), 2000, 30)
        {
            console.log("点击前往新地图");
            RandomPress([681, 461, 154, 31], 10);
            if (WaitUntil(HasMenu, 2000, 30))
            {
                console.log("到达秘密实验室");
                hadArrived = true;
            }
        }
    }
    if (hadArrived)
    {
        if (!OpenMap())
        {
            return false;
        }
        const randomPosition = [
            [411, 362, 67, 75],
            [556, 167, 50, 51],
            [521, 401, 47, 60]
        ];

        let clip = images.clip(captureScreen(), 336, 345, 45, 54);
        for (let i = 0; i < 100; i++)
        {
            RandomPress(randomPosition[random(0, 2)], 10);
            console.log("点击目的地");
            if (!FindImg(clip, [321, 333, 80, 81]))
            {
                console.log("正在移动中...");
                break;
            }
            else
            {
                console.log("没有移动，重新点击");
                RandomPress(randomPosition[random(0, 2)], 10);
            }
        }
        PageBack();
        Sleep(10);
        WaitUntil(() => !IsMoving(), 2000, 30);
        PressToAuto();
        const config = ReadConfig();
        if (!config.game.hangUpSecretLab)
        {
            config.game.hangUpSecretLab = true;
            config.game.hangUpSecretLabTime = new Date().getTime();
            RewriteConfig(config);
        }

    }

};
const HangUpWild = () =>
{
    console.log("fn: 去野外挂机");

    const config = ReadConfig();

    if (!config.game.hangUpSecretLab)
    {
        HangUpSecretLab();
        return true;
    }
    else
    {
        if ((new Date().getTime() - config.game.hangUpSecretLabTime) / 3600000 < 4)
        {
            console.log("实验室挂机时间小于4小时，重新回到实验室挂机。");
            HangUpSecretLab();
            return true;
        }
    }
    if (mapName == null)
    {
        const combatPower = config.game.combatPower;
        if (combatPower < 18000)
        {
            mapName = [0, 3, random(0, 2)];
            console.log("去被污染的盆地挂机");
        }
        else if (combatPower >= 18000 && combatPower < 26000)
        {
            mapName = [1, 1, random(0, 2)];
            console.log("去新月湖挂机");
        }
        else if (config.game.combatPower >= 26000)
        {
            mapName = [1, 2, random(0, 2)];
            console.log("去暮光之丘挂机");
        }
        else
        {
            console.log("@异常情况，默认去被污染的土地挂机");
            mapName = [0, 3, random(0, 2)];
        }

    }

    const hasOpenMap = OpenMap();
    if (!hasOpenMap)
    {
        console.log("打开地图失败");
        return false;
    }
    const hasMovedToMap = EnterMap(mapName);
    if (!hasMovedToMap)
    {
        console.log("进入地图失败");
        return false;
    }

    console.log("等待传送到目的地...");
    WaitUntilMenu();
    Sleep(random(1, 5));

    lastHangUpWildTime = new Date().getTime();

    if (IsAuto_inactive())
    {
        if (config.game.autoPotion == true)
        {
            ChangeRecoverPotionPercentToNormal();
            let isSuccess = UnAutoPotion();
            if (isSuccess)
            {
                console.log("关闭自动使用药水成功");
                config.game.autoPotion = false;
                RewriteConfig(config);
            }
        }
        PressToAuto();
        console.log("去野外挂机成功");
        EnterHaltMode();
        return true;
    }
    else
    {
        return false;
    }
};
const IsNoExp = () =>
{
    let clip = images.clip(captureScreen(), 90, 610, 140, 15);
    Sleep(30);
    return FindImg(clip, [90, 610, 140, 15]);
};
const InstanceExceptionCheck = () =>
{
    if (IsHaltMode())
    {
        if (IsNoExp())
        {
            console.log("@没有经验增加");
            ExitHaltMode();
        }
        if (instance_mode == "dailyMission")
        {
            ExitHaltMode();
        }
        DeathFlow_HaltMode();

    }
    else
    {
        const deathBtn = DeathCheck();
        if (deathBtn)
        {
            RandomPress([deathBtn.x - 50, deathBtn.y, 150, 20], 15);
        }

        const config = ReadConfig();
        if (IsInCity() && !IsMoving())
        {
            console.log("在主城, 未移动，挂机模式为" + instance_mode);
            if (instance_mode == "hangUpInstance")
            {

                if (!config.game.dailyInstance)
                {
                    HangUpInstance();
                }
                else
                {
                    instance_mode = "dailyMission";
                }

            }
            else if (instance_mode == "dailyMission")
            {

                if (!config.game.accepteDailyMission)
                {
                    DailyMission();
                }
                else
                {
                    ClickDailyMission();
                }
            }
            else if (instance_mode == "hangUpWild")
            {
                HangUpWild();
            }
        }
        if (HasMenu())
        {
            if (instance_mode == "hangUpInstance" || instance_mode == "hangUpWild")
            {
                if (!IsAuto_active() && IsAuto_inactive())
                {
                    console.log("instance check: 没有自动攻击，点击自动攻击");
                    PressToAuto();
                }
            }
            else if (instance_mode == "dailyMission")
            {
                if (IsAuto_active())
                {
                    DailyMission();
                }
                else if (IsAuto_inactive() && !IsMoving())
                {
                    DailyMission();
                    for (let i = 0; i < 6; i++)
                    {
                        if (!IsMoving() && !IsInQuest())
                        {
                            console.log('随机点屏幕，随机移动');
                            RandomPress([337, 157, 508, 314]);
                            instance_mode = "dailyMission";
                            break;
                        }
                        Sleep();
                    }
                }
                let haveAccomplete = HaveFinished([1119, 99, 73, 274]);
                if (haveAccomplete)
                {
                    const delayClick = random(10, 120);
                    console.log("完成任务，延迟点击:" + delayClick + "s");
                    Sleep(delayClick);
                    RandomPress([haveAccomplete.x - 100, haveAccomplete.y, 100, 20], 2);
                    RandomPress([449, 437, 384, 45]);
                    clickDailyMissionAwardsTimes++;
                    if (clickDailyMissionAwardsTimes > 10)
                    {
                        console.log("点击完成次数过多！！！");
                        LoginProps();
                        DecomposeEquipment();
                        clickDailyMissionAwardsTimes = 0;
                    }
                }
                if (!HaveDailyMissionIcon())
                {
                    if (config.game.accepteDailyMission)
                    {
                        instance_mode == "hangUpWild";
                        console.log("今日每日任务已做完，切换模式为：野外挂机");
                        clickDailyMissionAwardsTimes = 0;
                    }
                    else
                    {
                        DailyMission();
                    }
                }
            }

            if ((instance_mode == "hangUpInstance" || instance_mode == "hangUpWild") && !IsInCity())
            {
                if (!IsHaltMode())
                {
                    PressToAuto();
                    const currentTime = new Date().getTime();
                    if ((currentTime - lastTimeEnterHaltMode) / 60000 > 5)
                    {
                        console.log("挂机异常检测：不在省电模式");
                        console.log("不在省电模式，已过五分钟，手动进省电模式");
                        EnterHaltMode();
                        lastTimeEnterHaltMode = currentTime;
                    }

                }

            }
        }
    }



};
const IsTimeToComprehensive = () =>
{
    if (tradingHours == null)
    {
        const config = ReadConfig();

        console.log("随机生成交易时间");
        tradingHours = [
            [random(0, 3), random(0, 59)],
            [random(4, 7), random(0, 59)],
            [random(8, 11), random(0, 59)],
            [random(12, 15), random(0, 59)],
            [random(16, 19), random(0, 59)],
            [random(20, 23), random(0, 59)],
        ];
        config.dailyTradingHours = tradingHours;

        RewriteConfig(config);
    }
    const curTime = new Date();
    const hours = curTime.getHours();
    const minute = curTime.getMinutes();
    let isTimeToComprehensive = false;
    tradingHours.forEach(time =>
    {
        if (time[0] == hours && time[1] == minute)
        {
            isTimeToComprehensive = true;
            console.log("当前时间：" + hours + ":" + minute);
            console.log("综合提升时间为：" + time[0] + "时" + time[1] + "分");
        }
    });
    return isTimeToComprehensive;
};
const InstanceFlow = () =>
{
    InstanceExceptionCheck();

    if (IsTimeToComprehensive())
    {
        console.log("到达随机提升时间，开始提升。");

        ComprehensiveImprovement_Instance();
    }

    let curTime = new Date().getTime();

    if ((curTime - lastTimeEnterInstance) / 3600000 > 1)
    {
        console.log("》》》 一小时检查");
        let config = ReadConfig();

        if (!config.game.dailyInstance)
        {
            console.log("今日副本暂未完成，优先进副本");
            HangUpInstance();
        }
        else if (!config.game.accepteDailyMission)
        {
            console.log("每日任务未完成. 优先进行每日任务");
            DailyMission();
            lastTimeEnterInstance = curTime;
        }
        else
        {
            lastTimeEnterInstance = curTime;
        }
    }

    if (instance_mode == "hangUpWild")
    {
        if ((curTime - lastHangUpWildTime) / 3600000 >= 5)
        {
            HangUpWild();
        }

    }
    else if (instance_mode == "dailyMission")
    {
        if ((curTime - lastTimeClickDailyMission) / 60000 > 30)
        {
            console.log("30min 点击每日任务");
            if (IsHaltMode())
            {
                ExitHaltMode();
            }

            ClickDailyMission();
            lastTimeClickDailyMission = curTime;
        }
    }
    else if (instance_mode == "monsterCollection")
    {
        console.log("monster mode");
    }

};


module.exports = { InstanceFlow };











