
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    HollowPress,
    FindBlueBtn,
    PageBack,
    CloseBackpack,
    HasMenu, HasPageback, HasBackpackMenuClose, HasSkip, ClickSkip,
    IsInCity,
    PullDownSkill,
    WaitUntilPageBack, WaitUntilMenu,
    SwipeSlowly,
    OpenBackpack,
    OpenBackpackMenu,
    FindGoldBtn,
    HasPopupClose,
    EnterMenuItemPage,
    WaitUntil,
    LoadImgList
} = require("./utils.js");

const { TipColorList, ArrowColorList, BlankColorList, QuestionMarkColorList, NextColorList, Auto_inactiveColorList,
    Auto_activeColorList, QuestColorList, RidingColorList, TalkColorList, LeaveColorList, TalkBubbleColorList,
    SpeedUpOffColorList,
} = require("./Color/MainStoryColorList.js");

const { WearEquipment, StrengthenEquipment, UseSkillBook, EquipSkill, OpenAllBox, DecomposeEquipment } = require("./Backpack.js");

const { ComprehensiveImprovement, StrengthenHorseEquipment } = require("./CommonFlow.js");

const PageImg = {
    "abilityPage": ReadImg('icon/beginner/growthMission/abilityPage')
};

let DeathImgList = [];
DeathImgList = LoadImgList("special/death");

let storyMode = "mainMission";


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
        let hasRightArrow = FindMultiColors(ArrowColorList.right, region, shot);
        if (hasRightArrow)
        {
            return ["right", hasRightArrow];
        }

        sleep(0.02);
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
            // const randomStart_x = hasTip.x - 150 > 0 ? hasTip.x - 150 : 0;
            // const randomStart_y = hasTip.y - 100 > 0 ? hasTip.y - 100 : 0;
            // const w = hasTip.x + 150 < 1280 ? 300 : 1280 - hasTip.x;
            // const h = hasTip.y + 100 < 720 ? 200 : 720 - hasTip.y;
            // RandomPress([randomStart_x, randomStart_y, w, h]);
            RandomPress([753, 86, 333, 401]);
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
                case "rightUp":
                    RandomPress([position.x + 30, position.y - 30, 30, 30]);
                    break;
                default:
                    RandomPress([508, 196, 265, 264]);
                    break;
            }
        }

    }
};

const HasNext = (shot) => FindMultiColors(NextColorList, [1219, 670, 31, 31], shot);
const ClickNext = (shot) => RandomPress([1152, 678, 53, 14], shot);
const HasTalkBubble = (shot) => FindMultiColors(TalkBubbleColorList, [465, 389, 140, 35], shot);
const IsSpeedUpOff = (shot) => FindMultiColors(SpeedUpOffColorList, [1208, 27, 46, 33], shot);
const ClickMainStory = () => RandomPress([905, 134, 226, 34]);
const IsInQuest = (region) => FindMultiColors(QuestColorList, region);
// 点击对话
const TapDialog = () =>
{
    const shot = captureScreen();
    const hasSkip = HasSkip(shot);
    const hasNext = HasNext(shot);
    const hasTalkBubble = HasTalkBubble(shot);
    const isSpeedUpOff = IsSpeedUpOff(shot);
    if (hasSkip)
    {
        RandomPress([517, 399, 223, 15]);
        ClickSkip();
    }
    else if (hasNext)
    {
        ClickNext();
    }
    else if (hasTalkBubble)
    {
        RandomPress([538, 399, 206, 17]);
    }
    else if (isSpeedUpOff)
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
        return false;
    }
    else if (!hasAuto_active && hasAuto_inactive)
    {
        if (!IsMoving())
        {
            ClickMainStory();

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
    ["#fd2d03", [[1, 0, "#ff2d00"], [4, 0, "#fb2e07"], [6, 0, "#fd2d01"], [37, -1, "#fb2d03"]]]
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
        else if (FindImg(DeathImgList[i], [600, 591, 76, 65], shot))
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
    if (FindBlueBtn([532, 590, 217, 67]))
    {
        RandomPress([563, 610, 157, 29]);
    }
    else if (FindBlueBtn([536, 415, 204, 77]))
    {
        RandomPress([568, 437, 151, 30]);
    }

    storyMode = "growthMission";
    const hasMenu = WaitUntilMenu();
    if (!hasMenu)
    {
        console.log("Death Flow: 未发现菜单按钮");
    }
    ComprehensiveImprovement();
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
    const LowHPColorList = [
        ["#881918", [[0, 2, "#881b18"], [0, 5, "#8c1f1b"], [0, 8, "#b82a26"], [1, 3, "#440d08"]]],
        ["#8b1918", [[0, 2, "#9d1e1d"], [0, 4, "#8d1c1a"], [0, 6, "#8b1e1b"], [1, 7, "#5b120c"]]]
    ];

    const IsLowHP = () => FindMultiColors(LowHPColorList, [519, 64, 70, 24]);
    const IsBossDead = () =>
    {
        const bossTitle = FindMultiColors(BossTitleColorList, [899, 151, 114, 27]);
        if (!bossTitle)
        {
            console.log("Lost Boss Title!");
            lostTitleCount++;
            console.log("lost title count: " + lostTitleCount);
            if (lostTitleCount > 10)
            {

                return true;
            }
        }
        return false;
    };
    SwipeRight(3);
    let isDead = false;
    let isBossDead = false;
    let time = 0;

    let moveTimeArr = [
        [3, 3, 3, 3],
        [2.8, 2.8, 2.8, 2.8],
        [3.5, 3.5, 3.5, 3.5],
    ];

    while (isDead == false && isBossDead == false)
    {
        const moveTime = moveTimeArr[number];
        if (FindMultiColors(Auto_inactiveColorList, [1127, 431, 51, 33]))
        {
            console.log("auto attack boss");
            RandomPress([1137, 439, 30, 18]);
        }
        if (IsLowHP())
        {
            console.log("boss is low hp");
            RandomPress([1136, 437, 33, 17]);
            SwipeRight(30);
        }

        isDead = DeathCheck();
        isBossDead = IsBossDead();


        SwipeRight(moveTime[2]);
        Sleep(1);
        SwipeUp(moveTime[3]);
        Sleep(1);
        SwipeLeft(moveTime[0]);
        Sleep(1);
        SwipeDown(moveTime[1]);
        Sleep(1);
        if (number != 0)
        {
            time++;
            console.log("time: " + time);
            if (time > 12 && time < 24)
            {
                click(1095, 443);
                console.log("switch enemy...");
                Sleep(0.1);
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
    // const hasSkillPopup = HasPopupClose([1216, 111, 25, 25]);
    // if (hasSkillPopup)
    // {
    //     PullDownSkill([420, 640]);
    //     console.log("start to change setting...");
    //     const changeSuccess = ChangeGameSetting();
    //     if (!changeSuccess)
    //     {
    //         console.log("change setting failed!");
    //     }
    // }
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
        console.log("start to change weapon...");
        OpenAllBox();
        OpenAllBox();
        WearEquipment();
        UseSkillBook();
        Sleep();
        EquipSkill();
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
const IsMoving = () =>
{
    const clip = images.clip(captureScreen(), 180, 187, 42, 35);
    Sleep(3);
    return FindImg(clip, [166, 178, 72, 57]) ? false : true;
};

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
        else if (FindBlueBtn([654, 444, 202, 66], shot))
        {
            console.log("main story transform...");
            RandomPress([683, 460, 151, 30]);
        }
        else if (FindBlueBtn([1055, 637, 219, 71], shot))
        {
            console.log("horse page confirm");
            RandomPress([1077, 656, 173, 35]);
        }
        else if (FindBlueBtn([481, 620, 316, 76], shot))
        {
            console.log("animal confirm");
            RandomPress([525, 639, 244, 34]);
        }
        else if (FindBlueBtn([655, 380, 207, 68], shot))
        {
            console.log("monster collection quickly transform btn");
            RandomPress([681, 399, 149, 33]);
        }
    }
    else
    {
        if (IsAttackBoss())
        {
            console.log("start attacking boss");
            if (FindMultiColors(Auto_inactiveColorList, [1127, 431, 51, 33]))
            {
                console.log("auto attack boss");
                click(1150, 450);
            }
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
                    // 3: []
                };
                for (let i = 0; i < 4; i++)
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
                for (let i = 0; i < 3; i++)
                {
                    for (let j = 0; j < 10; j++)
                    {
                        if (!bossImgList[i][j])
                        {
                            break;
                        }
                        if (FindImg(bossImgList[i][j], [478, 3, 353, 44], shot))
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

            AttackingBossFlow(GetBossIndex());
            console.log("finish boss flow");
        }
        else if (!IsMoving())
        {
            const isQuest = MainStoryQuestCheck();
            if (isQuest)
            {
                return true;
            }
            const hasMainStoryQuestIcon = HasMainStoryQuestIcon();
            if (hasMainStoryQuestIcon && storyMode == "mainMission")
            {
                ClickMainStory();
                if (!IsMoving())
                {
                    console.log("hasMainStory: " + hasMainStoryQuestIcon);
                    console.log("character is stop moving!!!");
                    if (HasMainStoryQuestIcon())
                    {
                        gesture(3000, [240, 496], [440, 496]);
                    }
                }
            }
        }

    }

    if (FindMultiColors(BlankColorList, [582, 529, 119, 32], shot))
    {
        console.log("need press blank...");
        RandomPress([461, 520, 309, 114]);
    }

    else if (FindMultiColors(BlankColorList, [588, 650, 109, 39], shot))
    {
        RandomPress([492, 498, 332, 142]);
    }

    else if (FindMultiColors(MissionAwardSelectColorList, [587, 257, 118, 36], shot))
    {
        RandomPress([779, 438, 50, 50]);
        Sleep(3);
    }

};

const GrowthMissionColorList = [
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 7, "#c7a5ef"], [1, 9, "#d5b0ff"], [9, 8, "#b595d8"]]],
    ["#d4affd", [[5, 0, "#d3affc"], [-5, 6, "#b696da"], [2, 7, "#d5b0ff"], [10, 7, "#c6a3ed"]]],
    ["#d5b0ff", [[5, 0, "#d1aefc"], [-6, 7, "#d0acf8"], [11, 7, "#c6a3ed"], [2, 9, "#d5b0ff"]]],
    ["#d3affc", [[1, 1, "#d5b0ff"], [5, 1, "#d5b0ff"], [2, 8, "#d4affd"], [2, 11, "#c6a3ed"]]]
];
const TransformIconColorList = [
    ["#998b5f", [[2, -6, "#c6b37c"], [6, -5, "#c7b57e"], [12, -3, "#a89869"], [9, 5, "#b3a271"]]],
    ["#c8b67f", [[-3, 4, "#ccb981"], [7, 4, "#cbb880"], [-2, 10, "#b9a874"], [5, 11, "#b9a874"]]]
];
const GrowthImgList = {
    skillBookMerchantPage: ReadImg("icon/beginner/growthMission/skillBookMerchant"),
    weaponSkillPage: ReadImg("icon/beginner/growthMission/weaponSkillPage"),
    joinGulidPage: ReadImg("icon/beginner/growthMission/joinGuildPage"),
    dailyMissionPage: ReadImg("icon/beginner/growthMission/dailyMissionPage"),
    towerOfTrialsPage: ReadImg("icon/beginner/growthMission/towerOfTrialsPage"),
};
const FinishedMissionColorList = [
    ["#e8e8e7", [[10, -1, "#f0f0ef"], [3, 3, "#dbdbda"], [16, 2, "#eaeae9"], [23, 9, "#fcfcfc"]]],
    ["#3e3d3d", [[3, 7, "#eaeae9"], [13, 4, "#f0f0f0"], [20, 6, "#fdfdfd"], [24, 10, "#f6f6f6"]]],
    ["#fbfbfa", [[3, 0, "#fbfbfa"], [14, 1, "#fefefd"], [21, 5, "#fcfcfc"], [24, 8, "#fafafa"]]],
    ["#fdfdfd", [[2, 0, "#fdfdfd"], [13, 4, "#fdfdfd"], [20, 8, "#fcfcfc"], [21, 9, "#fafafa"]]]
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
            const isNoReaction = FindImg(clip, [876, 184, 208, 59]);
            if (isNoReaction)
            {
                storyMode = "mainMission";
                console.log("switch story mode to main mission");
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

    const shot = captureScreen();

    const hasSkillBookPage = FindImg(GrowthImgList.skillBookMerchantPage, [83, 160, 60, 59], shot);
    if (hasSkillBookPage)
    {
        console.log("growthMission 2: buy skill book");
        const AlreadyLearnedSkillColorList = [
            ["#dbd373", [[18, 3, "#d4cc6f"], [31, 3, "#dcd474"], [45, 6, "#dcd474"], [29, 6, "#d8cf72"]]]
        ];
        const HasLearnTheSkill = (region) => FindMultiColors(AlreadyLearnedSkillColorList, region);
        for (let i = 0; i < 5; i++)
        {
            if (HasLearnTheSkill([74, 88 + i * 79, 79, 45]))
            {
                continue;
            }
            else
            {
                RandomPress([162, 98 + i * 79, 136, 32]);
                if (FindBlueBtn([645, 544, 179, 58]))
                {
                    RandomPress([664, 558, 142, 30]);
                }
            }
        }
        PageBack();
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
    const hasGuildPage = FindImg(GrowthImgList.joinGulidPage, [570, 650, 54, 57], shot);
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
        PageBack();
    }
    const hasDailyMissionPage = FindImg(GrowthImgList.dailyMissionPage, [26, 60, 105, 51], shot);
    if (hasDailyMissionPage)
    {
        console.log("growth mission 10: start daily mission");
        if (FindBlueBtn([1065, 644, 213, 67]))
        {
            const MissionInProcessingColorList = [
                ["#314d54", [[0, 3, "#304c54"], [0, 7, "#2f4951"], [50, -1, "#385760"], [47, 5, "#304c54"]]]
            ];
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
            WearEquipment();
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


// storyMode = "growthMission";

const MainStoryFlow = () =>
{
    const hasMenu = HasMenu();
    if (hasMenu && storyMode == "mainMission")
    {
        AutoMainStory();
    }
    else
    {
        TapDialog();
    }
    if (storyMode == "growthMission")
    {
        GrowthMissionFlow();
    }
    else if (storyMode == "dailyMission")
    {
        DailyMissionFlow();
    }
    TapTip();
    MainStoryBranch();
    MainStoryException();
};



module.exports = { HasTip, MainStoryFlow };

// DeathCheck();

// console.log(FindMultiColors(DeathFontColorList, [560, 239, 145, 64]));
// AttackingBossFlow(2);
//
// console.log(HasTip());
// while (true)
// {
// MainStoryFlow();
//     Sleep(1);
// }


