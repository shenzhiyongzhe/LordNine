const {
    FindMultiColors,
    RandomPress,
    HasMenu,
    HasMenuClose,
    WaitUntilPageBack,
    FindBlueBtn,
    Sleep,
    IsMoving,
    PageBack,
    WaitUntil,
    IsHaltMode,
    ExitHaltMode,
    FindImg,
    IsInCity,
    WaitUntilMenu,
    EnterMenuItemPage,
    FindNumber,
    DeathCheck,
    IsLocked,
    IsInQuest,
    IsAuto_active,
    IsAuto_inactive,
    LoadImgList,
    FindImgInList,
    FindRedBtn,
    FindGoldBtn,
    HasPopupClose,
    HaveDailyMissionIcon,
    HaveFinished,
    HasMap,
    PressToAuto,
    RecycleImgList,
    ReadConfig,
    RewriteConfig,

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
    FindCheckMark,
    StopScript,
    SwipeUp,
    SwipeDown,
    SwipeLeft,
    SwipeRight,
    ChangeRecoverPotionPercentToNormal, OpenMap,
} = require("./utils");
const { ComprehensiveImprovement_Instance, DailyQuest, LoginProps } = require("./CommonFlow");
const { DecomposeEquipment } = require("./Backpack");


const FirstLevel = [
    [20, 181, 31, 40],
    [20, 247, 31, 40],
    [20, 317, 32, 40],
    [20, 380, 33, 40],
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

let instance_mode = "hangUpWild";
let lastHangUpWildTime = new Date().getTime()
let lastTimeEnterHaltMode = lastHangUpWildTime

let lastTimeComprehensiveImprovement = 1726208812345;
let clickDailyMissionAwardsTimes = 0;

let tradingHours = null;
let mapName = null;

const death_haltMode = LoadImgList("special/death_haltmode");

const DeathCheck_HaltMode = (shot) =>
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
        return false;
    }
    if (random(1, 100) < 10)
    {
        DailyQuest();
    }
    const config = ReadConfig();

    if (!config.game.changeGameSetting)
    {
        console.log("没有修改设置");
        ChangeGameSetting();
    }
    if (!config.game["normalPotionPercent"])
    {
        console.log("没有修改正常的药水使用百分比。");
        ChangeRecoverPotionPercentToNormal()
    }
    const hasEnterInstancePage = EnterMenuItemPage("instance");
    if (!hasEnterInstancePage)
    {
        console.log("进入副本失败");
        if (IsLocked([873, 309, 27, 31]))
        {
            console.log("副本暂未解锁，跳过副本");
            config.daily.dailyInstance = true;
            config.daily.acceptDailyMission = true;
            RewriteConfig(config);
            instance_mode = "hangUpWild";
        }
        return false;
    }

    const instancePos = [
        [90, 100, 250, 100],
        [90, 280, 250, 100],
        [90, 450, 250, 100],
        // [90, 620, 250, 50]
    ];
    const timeOverImgList = LoadImgList("icon/instance/timeOver");
    const unsafeImgList = LoadImgList("page/instance/unsafe")

    let curCombatPower = FindNumber("combatPower", [1154, 600, 111, 43]);
    console.log("当前战力为：" + curCombatPower);

    const CanEnterInstance = () => FindBlueBtn([979, 637, 276, 74]);
    const PressEnterInstanceBtn = () =>
    {
        RandomPress([1010, 656, 214, 37]);
        Sleep(10);
        WaitUntilMenu();
        PressToAuto();
    };

    let haveAvailableInstance = false;
    const shot = captureScreen();
    for (let i = 0; i < instancePos.length; i++)
    {
        if (FindImgInList(timeOverImgList, [317, 170 + i * 170, 70, 34], shot))
        {
            console.log("该副本已结束");
            continue;
        }
        else if (FindImgInList(unsafeImgList, [355, 116 + i * 170, 90, 56], shot))
        {
            console.log("该副本不安全，跳过");
            continue;
        }
        // if (i != 1 && random(1, 100) > 80)
        // {
        //     console.log("副本鉴定失败，暂不进入该副本");
        //     continue;
        // }
        RandomPress(instancePos[i]);
        let canEnterInstance = CanEnterInstance();
        let requireCombatPower = FindNumber("combatPower", [1171, 494, 81, 39]);

        if (canEnterInstance)
        {
            if (curCombatPower - requireCombatPower > 10000)
            {
                console.log("战力高于需求战力10000点，点击第二层");
                RandomPress([990, 361, 55, 49]);
            }
            console.log(curCombatPower + "  >>>  " + requireCombatPower);
            PressEnterInstanceBtn();
            lastTimeEnterInstance = new Date().getTime();
            haveAvailableInstance = true;
            break;
        }
    }
    if (!haveAvailableInstance)
    {
        config.daily.dailyInstance = true;
        console.log("没有副本可以进入，更新配置：每日副本完成。");
        PageBack();
        for (let i = 0; i < 10; i++)
        {
            if (HasMenu())
            {
                break;
            } else if (HasPopupClose([1031, 84, 51, 54]))
            {
                RandomPress([1031, 84, 51, 54]);
            }
            ClearPage();
            Sleep();
        }
        InstanceBranchManager()
    }
    else
    {
        if (!IsInCity())
        {
            EnterHaltMode();
        }
    }

    RecycleImgList(timeOverImgList)
    RecycleImgList(unsafeImgList)

    config.game.combatPower = curCombatPower;
    RewriteConfig(config);

    return false;
};
//接受任务
const AcceptDailyMission = () =>
{
    console.log("fn: " + "接受每日任务");
    const config = ReadConfig();

    if (config.game.lv < 35)
    {
        console.log("等级小于35级，暂不接受每日任务");
        config.daily.acceptDailyMission = true;
        RewriteConfig(config);
    }

    const dailyMissionItem = LoadImgList("icon/font/dailyMission/dailyMissionItem");
    const weeklyMissionItem = LoadImgList("icon/font/dailyMission/weeklyMissionItem");

    const inProgressImgList = LoadImgList("icon/font/dailyMission/inProgress");
    const isCompleteImgList = LoadImgList("icon/font/dailyMission/complete");
    const acceptMaxImgList = LoadImgList("icon/font/dailyMission/accepteMax");

    const missionAwardImgList = LoadImgList("icon/font/dailyMission/missionCompleteAward");
    const weeklyMissionGoalImgList = LoadImgList("icon/font/dailyMission/weeklyMissionGoal");

    const weeklyMissionIconImgList = LoadImgList("icon/font/dailyMission/weeklyMissionIcon");
    let dailyMissionItemPoints;

    let acceptNum = 0;
    const randomAcceptNum = random(3, 10)
    out: for (let i = 0; i < 4; i++)
    {
        for (let n = 0; n < 2; n++)
        {
            if (FindImgInList(acceptMaxImgList, [1225, 611, 50, 51]))
            {
                console.log("@今日已经接受了10个任务");
                break out;
            }

            for (let k = 0; k < 5; k++)
            {
                dailyMissionItemPoints = MatchTemplateList(dailyMissionItem, [335, 130, 100, 520]);
                for (let j = 0; j < dailyMissionItemPoints.length; j++)
                {
                    if (FindImgInList(inProgressImgList, [680, dailyMissionItemPoints[j].y - 12, 100, 30]))
                    {
                        console.log("正在进行中...");
                    } else if (FindImgInList(isCompleteImgList, [700, dailyMissionItemPoints[j].y - 15, 40, 25]))
                    {
                        console.log("已完成");
                    } else
                    {
                        RandomPress([300, dailyMissionItemPoints[j].y - 20, 350, 40]);
                        if (FindBlueBtn([1069, 646, 205, 60]))
                        {
                            console.log("接受此任务");
                            RandomPress([1091, 661, 164, 28]);
                            acceptNum++;
                            if (acceptNum >= randomAcceptNum)
                            {
                                console.log("随机接受的每日任务数量为：" + randomAcceptNum);
                                break out;
                            }
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
        } else
        {
            console.log("刷新任务列表失败");
            break;
        }
    }
    const acceptWeeklyMissionProbability = 60;
    if (random(1, 100) > acceptWeeklyMissionProbability)
    {
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
                } else if (FindImgInList(isCompleteImgList, [690, weeklyMissionItemPoints[j].y - 15, 80, 30]))
                {
                    console.log("已完成");
                    isCorrectNum++;
                } else
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
                } else
                {
                    console.log("接受错误周任务");
                    RandomPress([285, inProgressPoints[k].y - 10, 300, 30]);
                    if (FindImgInList(weeklyMissionGoalImgList, [781, 249, 248, 62]))
                    {
                        console.log("是周任务，不需要放弃");
                        isCorrectNum++;
                    } else if (FindRedBtn([1072, 647, 202, 59]))
                    {
                        console.log("点击放弃");
                        RandomPress([1097, 659, 158, 32]);
                    }
                }
            }
            SwipeSlowly([450, 500, 10, 10], [450, 300, 10, 10], 2);
        }
    }


    RecycleImgList(dailyMissionItem);
    RecycleImgList(weeklyMissionItem);

    RecycleImgList(inProgressImgList);
    RecycleImgList(isCompleteImgList);
    RecycleImgList(acceptMaxImgList);

    RecycleImgList(missionAwardImgList);
    RecycleImgList(weeklyMissionGoalImgList);

    config.daily.acceptDailyMission = true;
    RewriteConfig(config);
    PageBack();

    for (let i = 0; i < 10; i++)
    {
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
    console.log("fn: 点击每日任务");

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
        console.log("点击每日任务图标，开始进行");
        return true;
    } else
    {
        console.log("未发现每日任务图标。");
        ClearPage();
        const config = ReadConfig();
        if (config.daily.acceptDailyMission)
        {
            console.log("每日任务已做完，切换到野外挂机");
            instance_mode = "hangUpWild";
            return false;
        } else
        {
            console.log("未接受每日任务。");
            return true;
        }
    }
};

const DailyMission = () =>
{
    console.log("fn: 每日任务流程");
    const config = ReadConfig();
    if (config.daily.acceptDailyMission)
    {
        console.log("已接受每日任务");
    } else
    {
        console.log("开始接受每日任务");
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

                config.daily.acceptDailyMission = true;
                config.daily.dailyInstance = true;
                config.gameMode = "mainStory";
                specialConfig.gameMode = "instance";
                specialConfig.initGameMode = "mainStory";
                RewriteConfig(config);
                instance_mode = "hangUpWild";
            }
            return false;
        } else
        {
            let missionMap = [25, 181, 188, 27];
            // if (config.game.combatPower >= 25000)
            // {
            //     missionMap = [31, 231, 169, 32]
            //     console.log("接受暮光之丘的每日任务")
            // }
            RandomPress(missionMap);
            if (!FindBlueBtn([1071, 647, 208, 61]))
            {
                console.log("地图未解锁，主线错误");
                config.daily.acceptDailyMission = true;
                config.daily.dailyInstance = true;
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


const EnterMap = (mapName) =>
{
    console.log("fn：进入地图：" + mapName);
    console.log("开始掷骰子，质检是否直接传送");
    const randomIndex = random(1, 100);
    console.log("投掷结果为：" + randomIndex);
    const [firstLevel, secondLevel, thirdLevel] = mapName;

    let hasMoved = false;

    RandomPress(FirstLevel[firstLevel]);
    RandomPress(SecondLevel[secondLevel]);
    RandomPress(ThirdLevel[thirdLevel]);

    if (randomIndex > 50)
    {
        console.log("۞快速移动鉴定成功,直接传送");
        if (FindBlueBtn([1066, 647, 162, 67]))
        {
            RandomPress([1086, 664, 120, 30], random(2, 5));
            if (FindBlueBtn([651, 382, 217, 69]))
            {
                console.log("@等待传送...");
                RandomPress([681, 401, 150, 28], random(12, 30));
                if (WaitUntil(HasMenu, 2000, 30))
                {
                    hasMoved = true;
                }
            }
        } else if (FindBlueBtn([907, 651, 162, 61]))
        {
            RandomPress([936, 667, 111, 27]);
            PageBack();
            hasMoved = true;
        }
    } else
    {
        console.log("۞快速移动鉴定失败，开始走路过去。");
        if (FindBlueBtn([911, 655, 155, 52]))
        {
            RandomPress([937, 665, 109, 30]);
            console.log("点击自动移动");
            PageBack();
            console.log("等待10秒");
            Sleep(10);
            console.log("等待停止移动");
            for (let i = 0; i < 120; i++)
            {
                if (!IsMoving())
                {
                    console.log("已到达目的地，已停止移动");
                    hasMoved = true;
                    break;
                }
                sleep(5000);
            }
        } else
        {
            return false;
        }
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
    Sleep(random(1, 15));
    if (!OpenMap())
    {
        console.log("第二次打开地图失败。退出");
        return false;
    }
    const randomIndex = random(1, 4);
    RandomPress(SecondLevel[4]);
    RandomPress(ThirdLevel[randomIndex]);

    const config = ReadConfig();
    const area_30 = [
        [408, 369, 74, 77],
        [509, 241, 25, 18],
        [531, 202, 47, 43],
        [551, 166, 50, 55],
        [508, 305, 25, 32],
        [542, 265, 50, 61],
        [584, 319, 31, 34],
        [512, 404, 64, 48]
    ]
    const area_50 = [
        [635, 224, 37, 25],
        [651, 270, 68, 48],
        [715, 259, 19, 17],
        [643, 376, 47, 43],
        [687, 349, 34, 27],
        [705, 320, 45, 35],
        [736, 305, 31, 26],
        [698, 438, 34, 26],
        [745, 381, 68, 45],
        [790, 340, 59, 47],
        [850, 326, 49, 33],
        [703, 537, 63, 60]
    ]

    if (FindBlueBtn([936, 646, 251, 67]))
    {
        RandomPress([967, 663, 203, 35]);
        console.log("前往秘密实验室，自动移动中...");
        if (WaitUntil(() => HasMenu(), 3000, 40))
        {
            console.log("@到达秘密实验室");
            if (config.game.combatPower <= 27000 || (config.game.combatPower > 27000 && random(0, 100) < 50))
            {
                console.log("战力小于27000，只进入30级区域");
                PressToAuto(area_30);

            } else
            {
                console.log("战力大于27000，随机到50级区域的秘密实验室");
                PressToAuto(area_50)
            }
        }
    }
};
const upArrow = LoadImgList("page/map/arrow/up");
const downArrow = LoadImgList("page/map/arrow/down");

const randomMoveOperation = () =>
{
    console.log("@开始一些随机操作");
    const randomClick = () =>
    {
        const clickPosArr = [
            [338, 127, 223, 149],
            [147, 314, 360, 167],
            [728, 296, 263, 203],
        ];
        let clickProbability = 1;
        let clickPosIndex = random(0, clickPosArr.length - 1);
        for (let i = 0; i < 10; i++)
        {
            if (clickProbability >= 50)
            {
                RandomPress(clickPosArr[clickPosIndex], 2);
                console.log("随机点击一个位置: " + clickPosArr[clickPosIndex]);
            }
            clickProbability = random(1, 100);
        }
    };
    const continueSwipe = (fn, arr) =>
    {
        for (let i = 0; i < arr.length; i++)
        {
            fn(arr[i]);
        }
    };
    const randomSwipe = () =>
    {
        console.log("随机移动");
        swipeDirectionIndex = random(0, 4);
        const moveTime = [random(5, 50), random(5, 50), random(5, 50)];
        if (swipeDirectionIndex == 0)
        {
            console.log("随机向上移动");
            continueSwipe(SwipeUp, moveTime);
        } else if (swipeDirectionIndex == 1)
        {
            console.log("随机向下移动");
            continueSwipe(SwipeDown, moveTime);
        } else if (swipeDirectionIndex == 2)
        {
            console.log("随机向左移动");
            continueSwipe(SwipeLeft, moveTime);
        } else if (swipeDirectionIndex == 3)
        {
            console.log("随机向右移动");
            continueSwipe(SwipeRight, moveTime);
        }
    };
    const randomIllustrations = () =>
    {
        console.log("随机选择怪物移动过去");
        if (!OpenMap())
        {
            console.log("打开背包失败");
            return false;
        }
        RandomPress([1240, 211, 31, 35]);
        RandomPress([967, 130, 226, 456], 3);

        const shot = captureScreen();
        const haveUpArrow = FindImgInList(upArrow, [1152, 111, 72, 553], shot);
        if (!haveUpArrow)
        {
            console.log("未发现向上箭头，退出");
            return false;
        }

        console.log("发现向上的箭头，寻找向下的箭头:" + haveUpArrow);
        for (let i = 0; i < 9; i++)
        {
            let haveDownArrow = FindImgInList(
                downArrow,
                [1160, haveUpArrow.y + 50 + i * 53 >= 720 ? 670 : haveUpArrow.y + 50 + i * 53, 50, 40],
                shot
            );
            let clickableRange = [];
            if (haveDownArrow)
            {
                console.log("发现向下箭头:" + haveDownArrow);
                clickableRange = [980, haveUpArrow.y + 50, 200, haveDownArrow.y - 40 - haveUpArrow.y + 30];
                console.log("可点击区域为：" + clickableRange);
                RandomPress(clickableRange);
                break;
            } else if (i == 8)
            {
                console.log("循环结束：未发现向下箭头");
                clickableRange = [980, haveUpArrow.y + 60, 200, 660 - haveUpArrow.y];
                console.log("可点击区域为：" + clickableRange);
                RandomPress(clickableRange);
            }
        }
        let canAutoMove = false;
        let canQuickMove = false;
        if (FindBlueBtn([563, 604, 161, 59]))
        {
            console.log("可自动移动");
            canAutoMove = true;
        }
        if (FindBlueBtn([731, 605, 157, 57]))
        {
            console.log("可快速移动");
            canQuickMove = true;
        }

        if (canAutoMove && canQuickMove)
        {
            if (random(1, 100))
            {
                console.log("随机：点击自动移动");
                RandomPress([590, 616, 114, 32]);
            } else
            {
                console.log("随机：点击快速移动");
                RandomPress([755, 618, 118, 29]);
            }
        } else if (canAutoMove)
        {
            console.log("只能自动移动");
            RandomPress([590, 616, 114, 32]);
        } else if (canQuickMove)
        {
            console.log("可以快速移动。");
            RandomPress([755, 618, 118, 29]);
        }
        PageBack();
    };
    const operationFunc = [randomClick, randomSwipe, randomIllustrations];
    const randomIndex = Math.floor(Math.random() * operationFunc.length);
    console.log("随机索引为：" + randomIndex);
    operationFunc[randomIndex]();
};

const HangUpWild = () =>
{
    console.log("fn: 去野外挂机");
    if (random(1, 100) < 10)
    {
        DailyQuest();
    }
    const config = ReadConfig()
    if (mapName == null)
    {
        const combatPower = config.game.combatPower;
        if (combatPower < 18000)
        {
            mapName = [0, 3, random(0, 2)];
            console.log("去被污染的盆地挂机");
        } else if (combatPower >= 18000 && combatPower < 24000)
        {
            mapName = [1, 1, random(0, 2)];
            console.log("去新月湖挂机");
        } else if (combatPower >= 24000 && combatPower < 28000)
        {
            mapName = [1, 2, random(0, 2)];
            console.log("去暮光之丘挂机");
        } else if (combatPower >= 28000)
        {
            mapName = [2, 1, 0];
            console.log("去鸟兰挂机");
        } else
        {
            console.log("@异常情况，默认去新月湖挂机");
            mapName = [1, 1, random(0, 2)];
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
    if (random(1, 100) > 90)
    {
        randomMoveOperation();
    }
    if (IsAuto_inactive())
    {
        PressToAuto();
        console.log("去野外挂机成功");
        if (!config.game["normalPotionPercent"])
        {
            console.log("没有修改正常的药水使用百分比。");
            ChangeRecoverPotionPercentToNormal()
        }
        EnterHaltMode();
        return true;
    } else
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
let enterHaltModeSecond = random(300, 900)
const InstanceExceptionCheck = () =>
{
    if (IsHaltMode())
    {
        if (IsNoExp())
        {
            console.log("@没有经验增加");
            PressToAuto()
        }
        if (instance_mode == "dailyMission")
        {
            console.log("每日任务，取消省电模式");
            ExitHaltMode();
        }
        DeathCheck_HaltMode();
    } else
    {
        const deathBtn = DeathCheck();
        const config = ReadConfig();

        if (deathBtn)
        {
            RandomPress([deathBtn.x - 50, deathBtn.y, 150, 20], random(10, 30));
            config.totalDeathTimes = config.totalDeathTimes ? config.totalDeathTimes : 0;
            config.totalDeathTimes++;
            RewriteConfig(config);
        }

        if (IsInCity() && !IsMoving())
        {
            console.log("异常检测：在主城, 未移动");
            InstanceBranchManager()
        }
        if (HasMenu())
        {
            if (instance_mode != "dailyMission")
            {
                if (!IsAuto_active() && IsAuto_inactive())
                {
                    console.log("instance check: 没有自动攻击，点击自动攻击");
                    PressToAuto();
                }
            } else
            {
                if (IsAuto_active())
                {
                    DailyMission();
                } else if (IsAuto_inactive() && !IsMoving())
                {
                    DailyMission();
                    for (let i = 0; i < 6; i++)
                    {
                        if (!IsMoving() && !IsInQuest())
                        {
                            console.log("随机点屏幕，随机移动");
                            RandomPress([337, 157, 508, 314]);
                            instance_mode = "dailyMission";
                            break;
                        }
                        Sleep();
                    }
                }
                let haveFinished = HaveFinished([1119, 99, 73, 274]);
                if (haveFinished)
                {
                    const delayClick = random(3, 60);
                    console.log("完成任务，延迟点击:" + delayClick + "s");
                    Sleep(delayClick);
                    RandomPress([haveFinished.x - 100, haveFinished.y, 100, 20], 2);
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
            }

            if (instance_mode != "dailyMission" && !IsInCity())
            {
                if (!IsHaltMode())
                {
                    PressToAuto();
                    const currentTime = new Date().getTime();
                    if ((currentTime - lastTimeEnterHaltMode) / 1000 > enterHaltModeSecond)
                    {
                        console.log("挂机异常检测：不在省电模式");
                        console.log(`不在省电模式，${enterHaltModeSecond}，手动进省电模式`);
                        enterHaltModeSecond = random(300, 600)
                        EnterHaltMode();
                        lastTimeEnterHaltMode = currentTime;
                    }
                }
            }
        }
    }
};

const TimeToTrade = () =>
{
    if (tradingHours == null)
    {
        const config = ReadConfig();
        if (!config.dailyTradingHours || config.dailyTradingHours.length != 3)
        {
            console.log("生成随机交易时间");
            tradingHours = [
                `${random(8, 12).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
                `${random(13, 17).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
                `${random(18, 22).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`,
            ];
            config.dailyTradingHours = tradingHours;
            RewriteConfig(config);
        } else
        {
            tradingHours = config.dailyTradingHours;
        }
    }
    const currentTimeString = new Date().toString().slice(16, 21)
    let isTimeToTrade = false;
    tradingHours.map((time) =>
    {
        if (currentTimeString == time)
        {
            console.log(currentTimeString + " --- " + time);
            console.log("到达随机交易时间");
            isTimeToTrade = true;
        }
    });
    return isTimeToTrade;
};

let switchMapTime = parseFloat((Math.random() * 5 + 5).toFixed(2));

let oneHourCheck = new Date().getTime()
let checkCycle = parseFloat((Math.random() + 1).toFixed(2));

const TimeChecker = () =>
{
    let curTime = new Date().getTime();
    if ((curTime - oneHourCheck) / 36000000 < checkCycle)
    {
        return;
    }
    console.log(`--- 一小时检查,检查间隔为:${checkCycle} ---`);
    oneHourCheck = curTime;
    checkCycle = parseFloat((Math.random() + 1).toFixed(2));
    const config = ReadConfig()
    tradingHours = config.dailyTradingHours;

    InstanceBranchManager()
}

const InstanceBranchManager = () =>
{
    const config = ReadConfig()
    if (!config.daily.dailyInstance)
    {
        console.log("今日副本未完成，开始刷副本");
        HangUpInstance()
        return true;
    }
    let curTime = new Date().getTime();
    const randomIndex = random(1, 100)
    console.log(`挂机分支索引为：${JSON.stringify({ randomIndex })}`);

    if (randomIndex < 33)
    {
        console.log("随机到{每日任务分支}");
        if (!config.daily.acceptDailyMission)
        {
            DailyMission()
        }
        else
        {
            if (random(1, 100) < 50)
            {
                console.log("随机到{秘密实验室分支}");

                if (((curTime - lastHangUpWildTime) / 3600000 >= switchMapTime && new Date().getHours() > 7) || IsInCity())
                {
                    console.log(`@${switchMapTime}小时，切换地图`);
                    switchMapTime = parseFloat((Math.random() * 10 + 5).toFixed(2));
                    lastHangUpWildTime = curTime
                    HangUpSecretLab()
                    return true;
                }
                else
                {
                    console.log("未到切换地图时间");
                }
            }
            else
            {
                console.log("随机到{野外挂机分支}");
                if (((curTime - lastHangUpWildTime) / 3600000 >= switchMapTime && new Date().getHours() > 7) || IsInCity())
                {
                    console.log(`@${switchMapTime}小时，切换地图`);
                    switchMapTime = parseFloat((Math.random() * 5 + 5).toFixed(2));
                    lastHangUpWildTime = curTime
                    HangUpWild()
                    return true;
                }
                else
                {
                    console.log("未到切换地图时间");
                }
            }
        }
    }
    else if (randomIndex >= 33 && randomIndex < 66)
    {
        console.log("随机到{秘密实验室分支}");
        if (((curTime - lastHangUpWildTime) / 3600000 >= switchMapTime && new Date().getHours() > 7) || IsInCity())
        {
            console.log(`@${switchMapTime}小时，切换地图`);
            switchMapTime = parseFloat((Math.random() * 10 + 5).toFixed(2));
            lastHangUpWildTime = curTime
            HangUpSecretLab()
            return true;
        }
        else
        {
            console.log("未到切换地图时间");
        }
    }
    else
    {
        console.log("随机到{野外挂机分支}");
        if (((curTime - lastHangUpWildTime) / 3600000 >= switchMapTime && new Date().getHours() > 7) || IsInCity())
        {
            console.log(`@${switchMapTime}小时，切换地图`);
            switchMapTime = parseFloat((Math.random() * 5 + 5).toFixed(2));
            lastHangUpWildTime = curTime
            HangUpWild()
            return true;
        }
        else
        {
            console.log("未到切换地图时间");
        }
    }
}

const InstanceFlow = () =>
{
    InstanceExceptionCheck();
    TimeChecker();
    if (TimeToTrade())
    {
        ComprehensiveImprovement_Instance();
    }
};

module.exports = { InstanceFlow };


