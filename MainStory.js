
const {
    specialConfig,
    DeathImgList,
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu, ChangeRecoverPotionPercentToMax, CloseBackpack,
    FindBlueBtn,
    PageBack,
    HasMenu, HasPageback, HasBackpackMenuClose, HasSkip, ClickSkip, FindImgInList, IsHaltMode, ExitHaltMode,
    IsInCity, IsMoving,
    PullDownSkill,
    WaitUntilPageBack, WaitUntilMenu,
    SwipeSlowly,
    OpenBackpack,
    OpenBackpackMenu,
    FindGoldBtn,
    HasPopupClose,
    EnterMenuItemPage,
    WaitUntil,
    LoadImgList,
    ReadConfig,
    RewriteConfig,
    FindNumber,
    FindRedBtn,



} = require("./utils.js");

const { TipColorList, ArrowColorList, BlankColorList, QuestionMarkColorList, NextColorList, Auto_inactiveColorList,
    Auto_activeColorList, QuestColorList, TalkBubbleColorList,
    SpeedUpOffColorList,
} = require("./Color/MainStoryColorList.js");

const { LordNineWordColorList, WhiteAvatarColorList } = require("./Color/ExceptionColorList.js");

const { WearEquipments, StrengthenEquipment, OpenAllBox, DecomposeEquipment, AutoReleaseSkill, AutoPotion } = require("./Backpack.js");

const { ComprehensiveImprovement, StrengthenHorseEquipment } = require("./CommonFlow.js");

const PageImg = {
    "abilityPage": ReadImg('icon/beginner/growthMission/abilityPage')
};


let storyMode = "mainMission";

let lastTransformationTime = 0;
let changeRecoverPotionPercentTime = 0;
let tapTipIndex = 0;
const CommonTipList = [
    [720, 387, 96, 22], //药水 100
    [705, 578, 58, 26], //药水 确认
    [907, 132, 35, 34],//游戏开始的第一个tip
    [807, 142, 21, 29],//游戏开始的第一个紫色问好
];
// 点击提示
const HasTip = () => FindMultiColors(TipColorList, [19, 17, 1238, 688]);
const FindArrow = (region) =>
{
    for (let i = 0; i < 40; i++)
    {
        let shot = captureScreen();
        let hasUpArrow = FindMultiColors(ArrowColorList.up, region, shot);
        if (hasUpArrow)
        {
            return ["up", hasUpArrow];
        }
        let hasRightArrow = FindMultiColors(ArrowColorList.right, region, shot);
        if (hasRightArrow)
        {
            return ["right", hasRightArrow];
        }
        let hasDownArrow = FindMultiColors(ArrowColorList.down, region, shot);
        if (hasDownArrow)
        {
            return ["down", hasDownArrow];
        }
        let hasLeftArrow = FindMultiColors(ArrowColorList.left, region, shot);
        if (hasLeftArrow)
        {
            return ["left", hasLeftArrow];
        }

        sleep(100);
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
    console.log("transform main story");
    RandomPress([1149, 126, 19, 20]);
    if (FindBlueBtn([653, 443, 204, 65]))
    {
        RandomPress([689, 461, 145, 31]);
        lastTransformationTime = new Date().getMinutes();
        Sleep(5);
    }
};
const ClickMainStory = () => 
{
    if (Math.abs(lastTransformationTime - new Date().getMinutes()) < 10)
    {
        RandomPress([905, 134, 226, 34]);
    }
    else
    {
        TransformMainStory();
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

    else if (!hasAuto_active && !hasAuto_inactive)
    {
        if (HasMenu())
        {
            if (!IsMoving())
            {
                console.log("玩家在主城，继续主线");
                ClickMainStory();
            }
            return true;
        }
        return false;
    }
    else if (!hasAuto_active && hasAuto_inactive)
    {
        if (!IsMoving())
        {
            console.log("main story:  character is not moving");
            if (Math.abs(lastTransformationTime - new Date().getMinutes()) < 10)
            {
                ClickMainStory();
            }
            else
            {
                TransformMainStory();
            }
        }
        return true;
    }
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

const AbilityPopupCloseColorList = [
    ["#a59674", [[8, 9, "#625945"], [16, 16, "#746a51"], [16, 0, "#7c7157"], [1, 15, "#655b46"]]],
    ["#97896a", [[6, 7, "#635945"], [14, 15, "#635945"], [13, 1, "#7b6f55"], [-1, 14, "#6a604a"]]]
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
    for (let i = 0; i < DeathImgList.length; i++)
    {
        if (FindImg(DeathImgList[i], [596, 423, 84, 59], shot))
        {
            console.log("character is dead");
            return true;
        }
        else if (FindImg(DeathImgList[i], [527, 584, 217, 85], shot)) 
        {
            console.log("character is dead! lost ability point");
            return true;
        }
    }
    return false;
};

const DeathFlow = () =>
{
    console.log("Main Story Death Flow: Start  Death Flow!");
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
    const hasMenu = WaitUntilMenu();
    if (!hasMenu)
    {
        console.log("Death Flow: 未发现菜单按钮");
    }
    if (changeRecoverPotionPercentTime < 3)
    {
        let isChangePotion = ChangeRecoverPotionPercentToMax();
        if (isChangePotion)
        {
            console.log("改变药水百分比成功，当前修改次数加一：" + changeRecoverPotionPercentTime);
            changeRecoverPotionPercentTime++;
        }
    }
    let isSuccess = ComprehensiveImprovement();
    if (isSuccess == false)
    {
        console.log("综合提升没有执行到位,重新执行");
        if (IsHaltMode())
        {
            ExitHaltMode();
            ChangeGameSetting();
        }
        CloseMenu();
        CloseBackpack();
        PageBack();
    }

    storyMode = "growthMission";

    const config = ReadConfig();
    config.game.deathTime++;

    if (config.game.deathTime >= 100)
    {
        alert("异常处理", "死亡次数过多，当前死亡次数为： " + config.game.deathTime);
    }
    RewriteConfig("game", config.game);
};

const ChangeGameSetting = () =>
{

    const hasEnterSettingPage = EnterMenuItemPage("setting");
    if (!hasEnterSettingPage)
    {
        console.log("change setting error!");
    }
    RandomPress([357, 77, 33, 20]);
    Sleep();
    SwipeSlowly([640, 620, 10, 10], [640, 160, 10, 10], 1.5);
    SwipeSlowly([640, 620, 10, 10], [640, 160, 10, 10], 1.5);
    RandomPress([1126, 207, 115, 26]); //关闭后期处理
    RandomPress([1119, 441, 123, 25]); //效果 低
    RandomPress([1122, 560, 120, 25]); //镜头晃动 关闭
    RandomPress([1124, 618, 117, 25]); //人物显示上限
    RandomPress([647, 76, 37, 24]); // 语言栏
    RandomPress([731, 391, 167, 24]); // select btn
    RandomPress([931, 415, 156, 30]); // choose chinese
    PageBack();

    if (FindBlueBtn([655, 443, 200, 67]))
    {
        console.log("修改配置成功!");
        RandomPress([678, 456, 155, 36]); //confirm
        Sleep(10);
        WaitUntil(() => HasSkip());
        ClickSkip();

        if (FindBlueBtn([651, 426, 171, 61]))
        {
            console.log("start to download chinese package...");
            RandomPress([670, 444, 133, 26]);
            let hadDownloadFinished = false;
            const voiceIconColorList = [
                ["#ccbc8b", [[7, -2, "#d7c692"], [9, -3, "#d4c391"], [10, 1, "#dac894"], [9, 2, "#dac894"]]]
            ];
            for (let i = 0; i < 500; i++)
            {
                if (FindMultiColors(voiceIconColorList, [1207, 27, 48, 47]))
                {
                    Sleep(60);
                }
                else
                {
                    if (HasMainUI())
                    {
                        console.log("download finished!");
                        break;
                    }
                }
            }
            if (hadDownloadFinished == false)
            {
                alert("download failed!! ", "下载中文包失败");
            }
        }
        return true;
    }
    else
    {
        return false;
    }
};
const IsAttackBoss = () => FindMultiColors(BossTitleColorList, [893, 153, 228, 23]);

let lostTitleCount = 0;

const AttackingBossFlow = (number) =>
{
    const BossLowHPImgList = LoadImgList("icon/bossHP");
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
    if (number != 0)
    {
        console.log("是四个大boss中的一个，需要使用攻速与恢复药水");
        const config = ReadConfig();
        if (!config.game.autoPotion)
        {
            console.log("自动药水未开启，首先自动使用药水");
            let isSuccess = AutoPotion();
            if (isSuccess)
            {
                config.game.autoPotion = true;
                RewriteConfig("game", config.game);
            }
        }
        else
        {
            console.log("已经打开了恢复药水");
        }
    }
    if (number == 0 || number == 1)
    {
        console.log("swipe to right: 3s");
        SwipeRight(3);
    }
    else if (number == 2)
    {
        console.log("swipe to left: 5s");
        SwipeLeft(5);
    }
    let isDead = false;
    let isBossDead = false;
    let time = 0;

    let moveTimeArr = [
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [2.8, 2.8, 2.8, 2.8],
        [3.2, 3.2, 3.2, 3.2],
        [3, 3, 3, 3],
    ];

    while (isDead == false && isBossDead == false)
    {
        const moveTime = moveTimeArr[number];
        if (FindMultiColors(Auto_inactiveColorList, [1127, 431, 51, 33]))
        {
            console.log("没有自动攻击，点击自动攻击");
            click(1150, 450);
            sleep(20);
        }

        isDead = DeathCheck();
        isBossDead = IsBossDead();
        if (HasMenu())
        {
            if (number == 3)
            {
                SwipeLeft(moveTime[0]);
                Sleep(1);
                SwipeDown(moveTime[1]);
                Sleep(1);
                SwipeRight(moveTime[2]);
                Sleep(1);
                SwipeUp(moveTime[3]);
                Sleep(1);
            }
            else if (number == 1)
            {
                SwipeRight(moveTime[2]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避,向左移动15秒");
                    SwipeLeft(15);
                }
                SwipeUp(moveTime[3]);
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
                SwipeDown(moveTime[1]);
                Sleep(5);
                if (IsBossLowHP())
                {
                    console.log("boss当前血量较低，即将发绝招，需躲避，向上移动15秒");
                    SwipeUp(15);
                }
            }
            else
            {
                SwipeRight(moveTime[2]);
                Sleep(1);
                SwipeUp(moveTime[3]);
                Sleep(1);
                SwipeLeft(moveTime[0]);
                Sleep(1);
                SwipeDown(moveTime[1]);
                Sleep(1);
            }
        }

        if (number != 0 && number != 1)
        {
            time++;
            console.log("time: " + time);
            if (time > 10 && time < 36)
            {
                click(1095, 443);
                console.log("switch enemy...");
                Sleep(0.02);
            }
        }
    }
};

const MainStoryBranch = () =>
{
    const shot = captureScreen();

    const hasWeaponSelect = FindMultiColors(weaponSelectColorList, [47, 62, 1180, 493], shot);
    if (hasWeaponSelect)
    {
        console.log("start to select weapon...");
        RandomPress([677, 184, 77, 305]);
        Sleep(3);
        if (FindBlueBtn([1032, 621, 197, 62]))
        {
            RandomPress([1052, 636, 157, 33]);
        }
        return true;
    }
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
        console.log("start to trace on main story...");
        return true;
    }

    const hasAbilityPopup = FindMultiColors(AbilityPopupCloseColorList, [35, 103, 37, 38], shot);
    if (hasAbilityPopup)
    {
        console.log("first time to add ability ");
        RandomPress([283, 361, 16, 15]);
        RandomPress([520, 170, 94, 21]);
        RandomPress([685, 348, 21, 24]);
        RandomPress([586, 659, 163, 26]);
        RandomPress([45, 113, 21, 22]); //close popup 

        PullDownSkill([420, 640]);
        console.log("start to change setting...");
        const changeSuccess = ChangeGameSetting();
        if (!changeSuccess)
        {
            console.log("change setting failed!");
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
                WearEquipments();
                OpenAllBox();
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
    const hasAbilitySkillPage = FindImg(PageImg.abilityPage, [796, 645, 61, 67], shot);
    if (hasAbilitySkillPage)
    {
        console.log("main story branch:start to equip ability skill!");
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
        console.log("equip ability skill finish");
    }
};
// -----------------------------     exception    ----------------------------------
const MainStoryQuestIconColorList = [
    ["#dbc996", [[7, -8, "#d9c894"], [12, 0, "#dbc996"], [3, 8, "#c2b384"], [12, 8, "#d1bf8f"]]],
    ["#dccb96", [[1, 8, "#cebd8d"], [12, 0, "#dccb96"], [12, 3, "#dcc996"], [7, 10, "#bfb082"]]],
    ["#dccb96", [[7, -8, "#d8c692"], [13, -2, "#dccb96"], [13, 1, "#dbc996"], [9, 6, "#d8c794"]]]
];

const MissionAwardSelectColorList = [
    ["#564926", [[2, 0, "#564926"], [5, 0, "#564926"], [6, 0, "#564926"], [25, 0, "#554926"]]]
];

const HasMainStoryQuestIcon = () => FindMultiColors(MainStoryQuestIconColorList, [1208, 125, 33, 40]);

const PressBlank = () => RandomPress([417, 496, 401, 160]);

const MainStoryException = () =>
{
    const shot = captureScreen();
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        if (DeathCheck())
        {
            DeathFlow();
        }
    }
    else
    {
        if (IsAttackBoss())
        {
            console.log("start attacking boss");
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
            click(1150, 450);
            SwipeLeft(3);
            Sleep(1);
            SwipeDown(3);
            Sleep(1);
            SwipeRight(3);
            Sleep(1);
            SwipeUp(3);

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
    }


    if (FindMultiColors(MissionAwardSelectColorList, [587, 257, 118, 36], shot))
    {
        console.log("选择奖励...");
        RandomPress([779, 438, 50, 50]);
        Sleep(3);
    }
};

const GrowthMissionColorList = [
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 7, "#c7a5ef"], [1, 9, "#d5b0ff"], [9, 8, "#b595d8"]]],
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 6, "#b696da"], [2, 7, "#d5b0ff"], [10, 7, "#c6a3ed"]]],
    ["#d5b0ff", [[5, 0, "#d1aefc"], [-6, 7, "#d0acf8"], [11, 7, "#c6a3ed"], [2, 9, "#d5b0ff"]]],
    ["#d3affc", [[1, 1, "#d5b0ff"], [5, 1, "#d5b0ff"], [2, 8, "#d4affd"], [2, 11, "#c6a3ed"]]],
    ["#e1befd", [[-1, 4, "#e7c3ff"], [-6, 10, "#e2bfff"], [9, 10, "#d8b7f2"], [1, 12, "#e7c3ff"]]],
    ["#e3bfff", [[-2, -1, "#d7b6f6"], [4, 0, "#e4c1ff"], [1, 8, "#e4c1ff"], [8, 8, "#e3bfff"]]]
];
const TransformIconColorList = [
    ["#998b5f", [[2, -6, "#c6b37c"], [6, -5, "#c7b57e"], [12, -3, "#a89869"], [9, 5, "#b3a271"]]],
    ["#c8b67f", [[-3, 4, "#ccb981"], [7, 4, "#cbb880"], [-2, 10, "#b9a874"], [5, 11, "#b9a874"]]]
];

const GrowthImgList = {
    skillBookMerchantPage: ReadImg("icon/beginner/growthMission/skillBookMerchant"),
    weaponSkillPage: ReadImg("icon/beginner/growthMission/weaponSkillPage"),
    joinGulidPage: LoadImgList("icon/beginner/growthMission/joinGuild"),
    dailyMissionPage: ReadImg("icon/beginner/growthMission/dailyMissionPage"),
    towerOfTrialsPage: ReadImg("icon/beginner/growthMission/towerOfTrialsPage"),
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
//04 weapon skill
//05 lv15
//06 join gulic
//07 lv20
//08 strengthen holy 
//09 lv25
//10 finish daily mission
//11 lv30 
//12 考验之塔
//13 lv35
//14 decompose equipment
// 15 lv40
// 16 animal
const GrowthMissionFlow = () =>
{
    const hasGrowthIcon = FindMultiColors(GrowthMissionColorList, [862, 187, 32, 32]);
    if (hasGrowthIcon)
    {
        if (FindMultiColors(TransformIconColorList, [1132, 184, 50, 39]))
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
            RandomPress([901, 194, 259, 38]);
            Sleep(3);
            let clip = images.clip(captureScreen(), 931, 196, 115, 34);
            Sleep(5);
            let isNoReaction = FindImg(clip, [876, 184, 208, 59]);
            if (isNoReaction)
            {
                RandomPress([901, 194, 259, 38]);
                Sleep(3);
                clip = images.clip(captureScreen(), 931, 196, 115, 34);
                Sleep(5);
                isNoReaction = FindImg(clip, [876, 184, 208, 59]);
                if (isNoReaction)
                {
                    storyMode = "mainMission";
                    console.log("点击成长任务没有反应，改变模式为 主线任务");
                }

            }
        }
    }
    else if (FindMultiColors(FinishedMissionColorList, [1126, 210, 57, 33]))
    {
        RandomPress([907, 197, 218, 34]);
        Sleep(3);
        RandomPress([907, 197, 218, 34]);
        Sleep(3);
    }
    else
    {
        console.log("没有发现成长任务图标，改变模式为主线任务");
        storyMode = "mainMission";

    }
    if (storyMode == "mainMission")
    {
        console.log("判断等级是否是34级");
        const config = ReadConfig();
        const lv = config.game.lv;
        console.log("当前等级为：" + lv);
        if (lv < 35 || lv == null)
        {
            console.log("等级小于34级，切换模式为挂机模式，去地图挂机");
            specialConfig.gameMode = "instance";
            specialConfig.lastModeChangeTime = new Date();
        }
        return true;
    }
    const shot = captureScreen();

    const hasSkillBookPage = FindImg(GrowthImgList.skillBookMerchantPage, [1031, 3, 202, 60], shot);
    if (hasSkillBookPage)
    {
        console.log("成长任务2: 购买技能书");
        const skillBookImgList = LoadImgList("backpack/skillBook");

        for (let i = 0; i < 5; i++)
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
        PageBack();
        OpenAllBox();
    }
    const hasWeaponSkillPage = FindImg(GrowthImgList.weaponSkillPage, [116, 288, 73, 73], shot);
    if (hasWeaponSkillPage)
    {
        console.log("growth mission: 4 weapon skill ");
        RandomPress([631, 178, 21, 23]);
        if (FindBlueBtn([996, 638, 207, 66]))
        {
            RandomPress([1018, 652, 162, 31]);
        }
        PageBack();
        StrengthenHorseEquipment();
    }
    const hasGuildPage = FindImgInList(GrowthImgList.joinGulidPage, [561, 644, 72, 69], shot);
    if (hasGuildPage)
    {
        console.log("growth mission 6: join guild");
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
        RandomPress([1189, 19, 52, 25]);
    }
    const hasDailyMissionPage = FindImg(GrowthImgList.dailyMissionPage, [26, 60, 105, 51], shot);
    if (hasDailyMissionPage)
    {
        console.log("growth mission 10: start daily mission");
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
        console.log("growth mission 12: tower of trials");
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
        console.log("growth mission 14: decompose equipment");
        DecomposeEquipment();
        if (FindMultiColors(FinishedMissionColorList, [1126, 210, 57, 33]))
        {
            RandomPress([900, 195, 268, 42]);
            Sleep(4);
            storyMode = "mainMission";
            OpenAllBox();
            WearEquipments();
            StrengthenEquipment();
        }
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

const MainStoryFlow = () =>
{
    if (storyMode == "mainMission")
    {
        AutoMainStory();
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
    MainStoryBranch();
    MainStoryException();
};


module.exports = { HasTip, MainStoryFlow };

// console.log(FindMultiColors(Auto_inactiveColorList, [1132, 430, 54, 36]));
// console.log(FindArrow());

// console.time("MainStoryFlow");
// while (true)
// {
//     MainStoryFlow();
//     Sleep(0.2);
// }

// console.timeEnd("MainStoryFlow")
// console.log(HasPopupClose([991, 54, 49, 51]));
// MainStoryException();
