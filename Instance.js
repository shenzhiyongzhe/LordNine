const { Auto_activeColorList, Auto_inactiveColorList } = require("./Color/MainStoryColorList");
const { DeathCheck, FindMultiColors, RandomPress, HasMenu, HasMenuClose, WaitUntilPageBack, FindBlueBtn, Sleep, IsMoving, PageBack, WaitUntil, IsHaltMode, ExitHaltMode,
    FindImg, IsInCity, WaitUntilMenu, EnterMenuItemPage, FindNumber,
    ChangeHaltModeTime,
    ChangeRecoverPotionPercentToNormal,
    ReadConfig,
    RewriteConfig,
    IsLocked,
    LoadImgList,
    FindImgInList,
    SwipeSlowly,
    HasPopupClose,
    RecycleImgList,
    FindGoldBtn,
    FindRedBtn,
    IsInQuest,
    HaveDailyMissionIcon,
    HaveFinished } = require("./utils");
const { ComprehensiveImprovement_Instance } = require("./CommonFlow");
const { UnAutoPotion } = require("./Backpack");


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
    [18, 137, 26, 30],
    [19, 205, 27, 28],
    [16, 269, 28, 31],
    [18, 335, 26, 35]
];
const SecondLevel = [
    [120, 185, 128, 34],
    [120, 242, 125, 27],
    [120, 290, 129, 33],
    [120, 345, 121, 25]
];
const ThirdLevel = [
    [959, 137, 143, 23],
    [964, 191, 158, 28],
    [961, 242, 162, 23]
];

let instance_mode = "hangUpInstance";
let lastHangUpWildTime = 1726208812345;
let lastTimeEnterInstance = 1726208812345;


let tradingHours = null;
let mapName = null;
let monsterMapList = null;
// const comprehensiveTime = [[random(0, 11), random(0, 59)], [random(12, 23), random(0, 59)]];
// // const comprehensiveTime = [[11, new Date().getMinutes()], [random(12, 23), random(0, 59)]];
// console.log("初始化副本模式挂机随机提升战力时刻，为：" + comprehensiveTime[0][0] + "时" + comprehensiveTime[0][1] + "分；" + comprehensiveTime[1][0] + "时" + comprehensiveTime[1][1] + "分");

const PressToAuto = () =>
{
    const hasAuto_inactive = FindMultiColors(Auto_inactiveColorList, [1123, 421, 55, 52]);
    if (hasAuto_inactive)
    {
        RandomPress([1137, 434, 29, 23]);
        return true;
    }
    const hasAuto_active = FindMultiColors(Auto_activeColorList, [1124, 415, 69, 65]);
    if (hasAuto_active)
    {
        return true;
    }
};
const PressAuto = () => RandomPress([1137, 434, 29, 23]);
const OpenMap = () =>
{
    console.log("open map");
    const hasMapIcon = FindMultiColors(MapIconColorList, [33, 116, 45, 56]);
    if (hasMapIcon)
    {
        console.log("find map icon");
        RandomPress([132, 144, 157, 124]);
        if (WaitUntilPageBack())
        {
            return true;
        }
    }
    else if (HasMenu())
    {
        if (FindMultiColors(MapIconGrayColorList, [33, 116, 45, 56]))
        {
            console.log("map icon is gray");
            RandomPress([46, 130, 19, 26]);
            if (FindMultiColors(MapIconColorList, [33, 116, 45, 56]))
            {
                RandomPress([132, 144, 157, 124]);
                if (WaitUntilPageBack())
                {
                    return true;
                }
            }
        }
    }
    else
    {
        console.log("not find map icon");
        return false;
    }
};


const EnterMap = (mapName) =>
{
    console.log("enter map");
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
            console.log("wait for transform");
            Sleep(10);
            hasMoved = true;
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
const IsAutoAttacking = () => FindMultiColors(Auto_activeColorList, [1124, 415, 69, 65]);

const HangUpWild = () =>
{
    const config = ReadConfig();

    if (mapName == null)
    {
        mapName = config.ui.hangUpMap;
        if (config.ui.gameMode == "instance")
        {
            mapName = "11";
        }
    }

    console.log("进入的地图名称为，mapname：" + mapName);
    if (mapName == undefined || mapName == "03")
    {
        mapName = [0, 3, random(0, 2)];
        console.log("去被污染的盆地挂机");
    }
    else if (mapName == "11")
    {
        mapName = [1, 1, random(0, 2)];
        console.log("去新月湖挂机");
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
    lastHangUpWildTime = new Date().getTime();
    for (let i = 0; i < 30; i++)
    {
        if (FindMultiColors(Auto_inactiveColorList, [1129, 420, 59, 63]))
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
            return true;
        }
        Sleep();
    }
};


const IsExpIncrease = () =>
{
    const clip = images.clip(captureScreen(), 55, 572, 118, 25);
    Sleep(10);
    if (FindImg(clip, [38, 555, 179, 57]))
    {
        return false;
    }
    else
    {
        return true;
    }
};

const DeathFlow = () =>
{
    console.log("开始死亡提升");
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    Sleep(3);
    for (let i = 0; i < 30; i++)
    {
        if (FindBlueBtn([524, 581, 245, 94])) 
        {
            Sleep(5);
            RandomPress([572, 611, 141, 29]);
            break;
        }
        if (FindBlueBtn([536, 415, 204, 77]))
        {
            Sleep(3);
            RandomPress([568, 437, 151, 30]);
            break;
        }
        Sleep();
    }

};
const InstanceExceptionCheck = () =>
{
    if (DeathCheck())
    {
        DeathFlow();
    }
    else if (IsInCity())
    {
        console.log("在主城, 准备去挂机");
        console.log("挂机模式为：" + instance_mode);
        const config = ReadConfig();
        if (instance_mode == "hangUpInstance")
        {

            if (!config.game.dailyInstance)
            {
                HangUpInstance();
                return true;
            }
            else
            {
                instance_mode = "dailyMission";
            }

        }
        else if (instance_mode == "dailyMission")
        {
            if (!config.game.dailyMission)
            {
                DailyMission();
            }
            else
            {
                instance_mode = "hangUpWild";
            }
        }
        else if (instance_mode == "hangUpWild")
        {
            HangUpWild();
        }
    }

    if (HasMenu())
    {
        if (instance_mode == "instance" || instance_mode == "hangUpWild")
        {
            if (!IsAutoAttacking())
            {
                if (FindMultiColors(Auto_inactiveColorList, [1118, 418, 66, 58]))
                {
                    console.log("没有自动攻击，点击自动攻击");
                    RandomPress([1136, 437, 30, 19]);
                }
            }
        }
        else if (instance_mode == "dailyMission")
        {
            if (!IsInQuest())
            {
                if (!IsMoving())
                {
                    let haveDailyMissionIcon = HaveDailyMissionIcon();
                    if (haveDailyMissionIcon)
                    {
                        RandomPress([haveDailyMissionIcon.x, haveDailyMissionIcon.y, 100, 40]);
                    }
                }

            }
            if (!HaveDailyMissionIcon() && !HaveFinished([1119, 99, 73, 274]))
            {
                instance_mode == "hangUpWild";
            }
        }
        let haveAccomplete = HaveFinished([1119, 99, 73, 274]);
        if (haveAccomplete)
        {
            RandomPress([haveAccomplete.x - 100, haveAccomplete.y, 100, 20], 2);
            RandomPress([449, 437, 384, 45]);
        }
    }
};

const HangUpInstance = () =>
{
    if (!HasMenu() && !HasMenuClose())
    {
        console.log("没有菜单，无法进入副本");
        return false;
    }
    const config = ReadConfig();

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
    let curCombatPower = FindNumber("combatPower", [1141, 535, 115, 47]);
    console.log("当前战力为：" + curCombatPower);

    const CanEnterInstance = () => FindBlueBtn([979, 637, 276, 74]);
    const PressEnterInstanceBtn = () => { RandomPress([1010, 656, 214, 37]); Sleep(10); WaitUntilMenu(); PressToAuto(); };

    let haveAvalableInstance = false;
    for (let i = 0; i < instancePos.length; i++)
    {
        RandomPress(instancePos[i]);
        let canEnterInstance = CanEnterInstance();
        if (canEnterInstance)
        {
            let requireCombatPower = FindNumber("combatPower", [1143, 494, 108, 45]);
            console.log(curCombatPower + " <--*--> " + requireCombatPower);
            if (curCombatPower > requireCombatPower)
            {
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
    }

    config.game.combatPower = curCombatPower;
    RewriteConfig(config);
    // ComprehensiveImprovement_Instance();
    return false;
};
//接受任务
const AcceptDailyMission = () =>
{
    const dailyMissionItem = LoadImgList("icon/font/dailyMission/dailyMissionItem/friendlyCertificate");

    const inProgressImgList = LoadImgList("icon/font/dailyMission/inProgress");
    const isCompleteImgList = LoadImgList("icon/font/dailyMission/complete");
    const accepteMaxImgList = LoadImgList("icon/font/dailyMission/accepteMax");

    // const accepteWeeklyMissionMax = LoadImgList("icon/font/dailyMission/acceptWeeklyMissionMax");

    const weeklyMissionItem = LoadImgList("icon/font/dailyMission/weeklyMission");

    const dailyMissionIconImgList = LoadImgList("icon/font/dailyMission/dailyMissionIcon");
    const weeklyMissionIconImgList = LoadImgList("icon/font/dailyMission/weeklyMissionIcon");

    let isDailyMissionItem = false;
    let isInProgress = false;
    let isComplete = false;

    let missionNumber = 0;

    let shot = captureScreen();
    let icon;

    out: for (let i = 0; i < 10; i++)
    {
        for (let n = 0; n < 2; n++)
        {
            if (FindImgInList(accepteMaxImgList, [1225, 611, 50, 51], shot))
            {
                console.log("@今日已经接受了10个任务");
                break out;
            }
            icon = FindImgInList(dailyMissionIconImgList, [246, 116, 42, 90], shot);

            for (let j = 0; j < 8; j++)
            {
                if (icon)
                {
                    for (let combo = 0; combo < 10; combo++)
                    {
                        isDailyMissionItem = FindImgInList(dailyMissionItem, [326, icon.y + j * 62, 121, 40], shot);
                        if (isDailyMissionItem)
                        {
                            isInProgress = FindImgInList(inProgressImgList, [675, isDailyMissionItem.y - 15, 80, 30], shot);
                            isComplete = FindImgInList(isCompleteImgList, [690, isDailyMissionItem.y - 15, 80, 30], shot);
                            if (isInProgress)
                            {
                                console.log("正在进行中");
                                break;
                            }
                            else if (isComplete)
                            {
                                console.log("已完成");
                                break;
                            }
                            else
                            {
                                console.log("友好证书任务");
                                RandomPress([350, isDailyMissionItem.y - 20, 300, 34]);
                                if (FindBlueBtn([1069, 645, 210, 62]))
                                {
                                    console.log("点击接受");
                                    RandomPress([1101, 661, 153, 31]);
                                    missionNumber += 1;
                                    console.log("已接受数量：" + missionNumber);
                                }
                                shot = captureScreen();
                                if (FindImgInList(accepteMaxImgList, [1225, 611, 50, 51], shot))
                                {
                                    console.log("@今日已经接受了10个任务");
                                    const config = ReadConfig();
                                    config.game.accepteDailyMission = true;
                                    RewriteConfig(config);
                                    break out;
                                }
                                if (missionNumber >= 10)
                                {
                                    console.log("一次接受10个任务");
                                    break out;
                                }
                            }
                        }
                    }
                }


            }
            SwipeSlowly([450, 500, 10, 10], [450, 300, 10, 10], 2);
            shot = captureScreen();
        }
        RandomPress([62, 664, 105, 21]);
        WaitUntil(() => HasPopupClose([819, 207, 53, 50]));
        if (FindBlueBtn([657, 444, 197, 64]))
        {
            console.log("刷新任务列表");
            RandomPress([678, 459, 154, 33]);
        }
        else
        {
            console.log("刷新任务列表失败");
            break;
        }
    }

    console.log("接受周任务");
    RandomPress([189, 73, 77, 25]);
    let weeklyMissionIcon;
    for (let i = 0; i < 3; i++)
    {
        let shot = captureScreen();
        weeklyMissionIcon = FindImgInList(weeklyMissionIconImgList, [241, 117, 50, 89], shot);
        if (weeklyMissionIcon)
        {
            for (let j = 0; j < 8; j++)
            {
                let shot = captureScreen();
                let defaultWeeklyMission = FindImgInList(weeklyMissionItem, [286, weeklyMissionIcon.y + j * 62, 149, 50], shot);
                if (defaultWeeklyMission)
                {
                    isInProgress = FindImgInList(inProgressImgList, [675, defaultWeeklyMission.y - 15, 80, 30], shot);
                    isComplete = FindImgInList(isCompleteImgList, [690, defaultWeeklyMission.y - 15, 80, 30], shot);
                    if (isInProgress)
                    {
                        console.log("正在进行中");
                    }
                    else if (isComplete)
                    {
                        console.log("已完成");
                    }
                    else
                    {
                        RandomPress([350, defaultWeeklyMission.y - 20, 300, 34]);
                        if (FindBlueBtn([1069, 645, 210, 62]))
                        {
                            console.log("接受周任务");
                            RandomPress([1101, 661, 153, 31]);
                            shot = captureScreen();
                        }
                    }
                }
                isInProgress = FindImgInList(inProgressImgList, [666, weeklyMissionIcon.y + j * 62, 107, 61], shot);
                if (isInProgress)
                {
                    let isWeeklyMission = FindImgInList(weeklyMissionItem, [280, isInProgress.y, 120, 40], shot);
                    if (!isWeeklyMission)
                    {
                        console.log("接受了错误的每周任务，点击取消");
                        RandomPress([300, isInProgress.y - 10, 345, 10]);
                        if (FindRedBtn([1075, 644, 199, 60]))
                        {
                            RandomPress([1099, 662, 147, 25]);
                            shot = captureScreen();
                        }
                    }
                }
            }
            SwipeSlowly([450, 500, 10, 10], [450, 300, 10, 10], 2);
        }
    }

    RecycleImgList(dailyMissionItem);
    RecycleImgList(inProgressImgList);
    RecycleImgList(isCompleteImgList);
    RecycleImgList(accepteMaxImgList);
    RecycleImgList(weeklyMissionItem);

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
const DailyMission = () =>
{
    const config = ReadConfig();
    if (config.game.accepteDailyMission && config.game.today == new Date().getDate())
    {
        console.log("today the daily mission have been accepted");
        return true;
    }
    console.log("开始每日任务");
    const hasEnter = EnterMenuItemPage("mission");
    if (!hasEnter)
    {
        console.log("进入每日任务页面失败");
        return false;
    }
    const missionMap = [25, 181, 188, 27];
    RandomPress(missionMap);
    AcceptDailyMission();
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

const IsTimeToComprehensive = () =>
{
    if (tradingHours == null)
    {
        const config = ReadConfig();
        tradingHours = config.game.dailyTradingHours;
        if (!tradingHours)
        {
            console.log("配置文件没有交易时间，随机生成交易时间");
            tradingHours = [[random(0, 11), random(0, 59)], [random(12, 23), random(0, 59)]];
            config.game.dailyTradingHours = tradingHours;
        }
        if (config.game["dailyTrandingHours"])
        {
            delete (config.game["dailyTrandingHours"]);
        }
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
        if (IsHaltMode())
        {
            ExitHaltMode();
        }
        if (IsAutoAttacking())
        {
            PressAuto();
        }
        ComprehensiveImprovement_Instance();
    }

    let curTime = new Date().getTime();

    if ((curTime - lastTimeEnterInstance) / 3600000 > 1)
    {
        let config = ReadConfig();

        if (!config.game.dailyInstance)
        {
            console.log("今日副本暂未完成，优先进副本");
            HangUpInstance();
        }

    }

    if (instance_mode == "hangUpWild")
    {
        if ((curTime - lastHangUpWildTime) / 3600000 >= 8)
        {
            HangUpWild();
        }

    }
    else if (instance_mode == "monsterCollection")
    {
        console.log("monster mode");
    }

};


module.exports = { InstanceFlow };

// AcceptDailyMission();


