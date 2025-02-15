
const {
    BuySkillBook,
    CloseBackpack, ClearPage, ClickSkip, CloseMenu,
    FindImg, FindBlueBtn, FindGoldBtn, FindCheckMark, FindImgInList, FindMultiColors,
    GoToTheNPC,
    HasSkip, HasMenu, HasPopupClose, HasBackpackMenuClose, HasBackpackClose,
    IsInCity,
    LoadImgList,
    WaitUntil, WaitUntilPageBack,
    OpenBackpack, OpenBackpackMenu, OpenMenu,
    PageBack, PressBlank, PullDownSkill,
    RecycleImgList, RandomPress, ReadImg, ReturnHome,
    SwipeSlowly, Sleep,
    ReadConfig,
    FindNumber,
    EnterMenuItemPage,
    RewriteConfig,
    FindWhiteCheckMark,
    GetRandom,

} = require("./utils.js");

const EquipColorList = [
    ["#5d4e3a", [[5, -1, "#f8f8f8"], [5, 5, "#f8f8f8"], [8, 1, "#dcdcdc"], [13, 1, "#6a5842"]]],
    ["#6a5841", [[4, -3, "#f8f8f8"], [4, 2, "#f8f8f8"], [7, 0, "#e3e3e3"], [12, 0, "#6a5842"]]],
    ["#6a5841", [[4, -1, "#e8e8e7"], [4, 4, "#e8e8e7"], [7, 1, "#f6f6f6"], [12, 1, "#675640"]]],
    ["#6a5841", [[5, -3, "#e3e3e3"], [5, 0, "#f2f2f2"], [5, 3, "#e3e3e3"], [13, 1, "#6b5842"]]],
    ["#e9e9e9", [[0, 2, "#e8e8e7"], [0, 4, "#e8e8e7"], [0, 6, "#e8e8e7"], [0, 7, "#ededed"]]],
    ["#e3e3e3", [[0, 1, "#e3e3e3"], [0, 2, "#e6e6e5"], [0, 4, "#e3e3e3"], [0, 5, "#e3e3e3"]]],
    ["#efefef", [[0, 1, "#efefef"], [0, 3, "#efefef"], [0, 4, "#efefef"], [0, 5, "#efefef"]]],
    ["#f4f4f4", [[0, 1, "#f4f4f4"], [0, 3, "#f4f4f4"], [0, 4, "#f4f4f4"], [0, 5, "#f4f4f4"]]],
    ["#d5d5d4", [[0, 1, "#d6d6d6"], [0, 2, "#e5e5e5"], [0, 4, "#d5d5d4"], [0, 5, "#d6d6d6"]]],
    ["#efefef", [[0, 1, "#efefef"], [0, 2, "#f4f4f4"], [0, 3, "#efefef"], [0, 5, "#efefef"]]],
    ["#fefefd", [[0, 1, "#fefefd"], [0, 2, "#fefefd"], [0, 3, "#fefefd"], [3, 2, "#f0f0f0"]]]
];

const BackpackItemDetailColorList = {
    "white": [
        ["#28292b", [[22, 6, "#28292b"], [46, -1, "#28292b"], [43, 22, "#28292b"], [3, 18, "#28292b"]]],
        ["#28292b", [[27, -2, "#28292b"], [75, -1, "#28292b"], [58, 19, "#28292b"], [7, 20, "#28292b"]]]
    ],
    "green": [
        ["#243028", [[30, 3, "#243028"], [70, 1, "#243028"], [51, 25, "#243028"], [1, 19, "#243028"]]],
        ["#243028", [[35, 1, "#243028"], [68, 2, "#243028"], [41, 22, "#243028"], [9, 19, "#243028"]]],
        ["#243028", [[14, -2, "#243028"], [37, 0, "#243028"], [59, 10, "#243028"], [15, 22, "#243028"]]],
    ],
    "blue": [
        ["#202c43", [[22, 1, "#202c43"], [44, 1, "#202c43"], [74, 7, "#202c43"], [29, 20, "#202c43"]]],
        ["#202c43", [[31, -1, "#202c43"], [80, 5, "#202c43"], [2, 16, "#202c43"], [51, 17, "#202c43"]]],
        ["#202c43", [[26, -6, "#202c43"], [76, 3, "#202c43"], [8, 14, "#202c43"], [51, 15, "#202c43"]]]
    ],
    "purple": [
        ["#2d2438", [[12, 2, "#2d2438"], [35, 2, "#2d2438"], [34, 16, "#2d2438"], [-6, 20, "#2d2438"]]],
        ["#2d2438", [[17, 3, "#2d2438"], [40, 12, "#2d2438"], [28, 24, "#2d2438"], [3, 19, "#2d2438"]]]
    ],
    "orange": [
        ["#3f2e22", [[17, -1, "#3f2e22"], [51, 2, "#3f2e22"], [35, 12, "#3f2e22"], [9, 11, "#3f2e22"]]]
    ],
    "red": [
        ["#412022", [[15, 1, "#412022"], [33, 1, "#412022"], [26, 18, "#412022"], [5, 17, "#412022"]]]
    ]
};

const emptyGridImgList = LoadImgList("backpack/emptyGrid");
// const isEquipedImgList = LoadImgList("backpack/isEquiped");


const DetailOnColorList = [
    ["#1d5d55", [[5, 0, "#1d5d55"], [10, 3, "#1d5d55"], [0, 4, "#1d5d55"], [6, 8, "#1d5d55"]]]
];

const SingleStrengthenColorList = [
    ["#e6e5e5", [[2, 0, "#e6e5e5"], [5, 0, "#e6e5e5"], [10, 0, "#e6e5e5"], [2, 1, "#d7d6d4"]]]
];

// ********************  check ----------------------
const IsEquiped = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EquipColorList, region, shot); };
// const IsEquiped = (region, shot) => { shot = shot || captureScreen(); return FindImgInList(isEquipedImgList, region, shot); };

// const IsEmpty = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EmptyGridColorList, region, shot); };
const IsEmpty = (region, shot) => { shot = shot || captureScreen(); return FindImgInList(emptyGridImgList, region, shot); };

const IsOnDetail = () => FindMultiColors(DetailOnColorList, [1044, 572, 30, 27]);


// ***** operation ---------------------

const WaitUntilEnterBackpackMenu = () => WaitUntil(() => HasPopupClose([1095, 32, 39, 46]));

const CloseDetail = () =>
{
    if (IsOnDetail())
    {
        RandomPress([963, 575, 89, 14]);
    }
};
const SingleStrengthen = () =>
{
    if (FindMultiColors(SingleStrengthenColorList, [405, 91, 30, 16]))
    {
        return true;
    }
    else
    {
        RandomPress([401, 93, 54, 12]);
    }
};
const backpackRegion = [925, 155, 250, 450];
const IsMultipleBox = () => FindBlueBtn([646, 506, 177, 59]);
const PressUseBtn = () => RandomPress([850, 594, 51, 28])
const randomSwipeBackpackUp = () => SwipeSlowly([1000, 400, 10, 10], [1000, 200, 10, 10], 1);
const randomSwipeBackpackDown = () => SwipeSlowly([1000, 200, 10, 10], [1000, 400, 10, 10], 1);

const OpenSkillBook = () =>
{
    console.log("fn:打开技能书");
    const hadOpenBackpack = OpenBackpack("props", true);
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败，退出");
        return false;
    }

    let hasSkillBook = false;
    let hasOpened = false;
    const skillBookImgList = LoadImgList("backpack/skillBook");
    const unableToUse = LoadImgList("backpack/unableToUse");
    const haveLearned = LoadImgList("backpack/haveLearned");
    for (let i = 0; i < skillBookImgList.length; i++)
    {
        hasSkillBook = FindImg(skillBookImgList[i], backpackRegion);
        if (hasSkillBook)
        {
            if (FindImgInList(unableToUse, [hasSkillBook.x - 30, hasSkillBook.y - 20, 40, 40]))
            {
                console.log("无法使用，跳过");
                continue;
            }
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            if (FindImgInList(haveLearned, [569, 97, 131, 51]))
            {
                console.log("已经学会该技能，丢弃该技能书");
                RandomPress([992, 663, 20, 26]);
                for (let i = 0; i < 10; i++)
                {
                    if (FindBlueBtn([649, 451, 171, 61]))
                    {
                        console.log("确认丢弃");
                        RandomPress([672, 468, 127, 25]);
                    }
                    else if (FindBlueBtn([651, 520, 166, 51]))
                    {
                        console.log("确认丢弃所有");
                        RandomPress([667, 530, 133, 27]);
                    }
                }

            }
            else
            {
                hasOpened = true;
            }
        }
    }
    RecycleImgList(skillBookImgList);
    RecycleImgList(unableToUse);
    RecycleImgList(haveLearned);
    Sleep();
    return hasOpened;
};

const OpenSuit = () =>
{
    console.log("开始打开时装");
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    let hadOpenSuit = false;

    const JumpAnimationColorList = [
        ["#ffffff", [[4, 3, "#ffffff"], [6, 5, "#ffffff"], [10, 1, "#ffffff"], [13, -1, "#ffffff"]]]
    ];
    const IsJumpAnimation = () => FindMultiColors(JumpAnimationColorList, [12, 657, 49, 54]);

    const suitImgList = LoadImgList("backpack/card/suit");
    const unableToUse = LoadImgList("backpack/unableToUse");

    const swipeToConfirmImgList = LoadImgList("icon/font/swipeToConfirm");

    for (let i = 0; i < suitImgList.length; i++)
    {
        let hasOpenedSuit = FindImg(suitImgList[i], backpackRegion);
        if (hasOpenedSuit)
        {
            console.log("发现时装抽卡")
            if (FindImgInList(unableToUse, [hasOpenedSuit.x - 30, hasOpenedSuit.y - 20, 40, 40]))
            {
                console.log("无法使用，跳过");
                continue;
            }
            RandomPress([hasOpenedSuit.x, hasOpenedSuit.y, 30, 30]);
            PressUseBtn()
            for (let i = 0; i < 60; i++)
            {
                if (HasSkip())
                {
                    ClickSkip();
                }
                if (FindBlueBtn([642, 503, 182, 64]))
                {
                    RandomPress([673, 519, 126, 33])
                }
                if (FindImgInList(swipeToConfirmImgList, [504, 598, 254, 66]))
                {
                    // SwipeSlowly([483, 640, 42, 10], [770, 640, 30, 10], 1);
                    swipe(520, 650, 770, 650, 500);
                    Sleep(5);
                    if (!IsJumpAnimation())
                    {
                        RandomPress([61, 675, 137, 14]);
                    }
                }
                if (FindBlueBtn([1061, 575, 205, 60]))
                {
                    console.log("点击查看全部")
                    RandomPress([1082, 586, 166, 39])
                    hadOpenSuit = true;
                }
                if (FindBlueBtn([1055, 639, 214, 72]))
                {
                    if (!FindWhiteCheckMark([20, 667, 38, 33]))
                    {
                        RandomPress([66, 673, 142, 17])
                    }
                    RandomPress([1080, 656, 166, 36]);
                    hadOpenSuit = true;
                    break;
                }
                Sleep();
            }
        }
    }
    RecycleImgList(unableToUse)
    RecycleImgList(swipeToConfirmImgList);
    RecycleImgList(suitImgList)
    return hadOpenSuit;
};
const OpenRune = () =>
{
    console.log("打开符文抽卡");
    if (!OpenBackpack("props"))
    {
        console.log("打开背包失败，退出");
        return false;
    }
    const runeImgList = LoadImgList("backpack/card/rune")

    let haveRune = FindImgInList(runeImgList, backpackRegion)
    if (haveRune)
    {
        console.log("发现符文抽卡");
        RandomPress([haveRune.x, haveRune.y, 30, 30], 4)
        PressUseBtn()
        Sleep(2)
        if (FindBlueBtn([640, 504, 186, 62]))
        {
            RandomPress([672, 522, 128, 29], 3)
        }
        ClickSkip()
        if (WaitUntil(() => FindBlueBtn([510, 629, 260, 80])))
        {
            RandomPress([538, 650, 210, 38], 3)
            RandomPress([538, 650, 210, 38], 3)
        }
        if (!FindCheckMark([22, 663, 38, 41]))
        {
            RandomPress([67, 674, 105, 16]) //skip anination
        }
        for (let i = 0; i < 30; i++)
        {

            if (FindBlueBtn([648, 632, 231, 77]))
            {
                RandomPress([677, 651, 177, 39]) // again
            }
            if (FindBlueBtn([510, 629, 260, 80]))
            {
                RandomPress([538, 650, 210, 38], 3)
            }
            if (FindBlueBtn([407, 635, 231, 71]))
            {
                RandomPress([441, 654, 171, 31])
            }
            if (HasMenu())
            {
                break;
            }
            Sleep()
        }
    }
    RecycleImgList(runeImgList)
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            return true;
        }
        else if (FindBlueBtn([647, 506, 174, 58]))
        {
            RandomPress([672, 519, 127, 32])
        }
        else if (FindBlueBtn([511, 636, 262, 67]))
        {
            RandomPress([540, 651, 209, 36])
            console.log("点击观察结果")
        }
        else if (FindBlueBtn([405, 635, 231, 71]))
        {
            RandomPress([435, 652, 179, 36])
            console.log("点击离开")
        }
        Sleep()
    }
}
const UseHolyGrail = () =>
{
    console.log("开始使用圣杯");
    let hasUsedHolyGrail = false;
    OpenBackpack("props");
    const holyGrailImgList = LoadImgList("backpack/props/holyGrail");
    const hasHolyGrail = FindImgInList(holyGrailImgList, backpackRegion);
    if (hasHolyGrail)
    {
        RandomPress([hasHolyGrail.x, hasHolyGrail.y, 15, 25]);
        PressUseBtn()
        for (let i = 0; i < 5; i++)
        {
            if (FindBlueBtn([646, 506, 175, 57]))
            {
                RandomPress([668, 520, 138, 30]);
                hasUsedHolyGrail = true;
                Sleep();
                break;
            }
            Sleep();
        }
    }
    RecycleImgList(holyGrailImgList);
    return hasUsedHolyGrail;
};
const OpenHorse = () =>
{
    console.log("使用道具坐骑");
    if (!OpenBackpack("props"))
    {
        return false;
    }
    const horseImgList = LoadImgList("backpack/props/horse");
    const haveHorse = FindImgInList(horseImgList, backpackRegion);
    RecycleImgList(horseImgList);
    if (haveHorse)
    {
        console.log("发现坐骑");
        RandomPress([haveHorse.x, haveHorse.y, 30, 30]);
        PressUseBtn()
        WaitUntil(() => FindBlueBtn([1057, 642, 214, 67]));
        RandomPress([1078, 657, 172, 35]);
        return true;
    }
    return false;
}

const OpenActivityBox = () =>
{
    console.log("fn: 打开道具箱子");
    if (!OpenBackpack("props"))
    {
        return false;
    }
    const PropsImgList = LoadImgList('backpack/box/activityBox', 30);
    const openBoxPopupImgList = LoadImgList("backpack/box/font/openBoxPopup");

    let hasOpenPropsBox = false;
    let hasPropsBox = null;
    let shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        hasPropsBox = FindImgInList(PropsImgList, backpackRegion, shot);
        if (hasPropsBox)
        {
            RandomPress([hasPropsBox.x, hasPropsBox.y, 30, 30]);
            PressUseBtn()
            if (IsMultipleBox())
            {
                RandomPress([666, 520, 138, 30]);
            }
            console.log("等待弹窗出现。");
            if (WaitUntil(() => FindImgInList(openBoxPopupImgList, [552, 150, 171, 94])))
            {
                RandomPress([479, 357, 303, 192], 2);//press blank
                console.log("open successfully");
                hasOpenPropsBox = true;
                shot = captureScreen();
            }
        }
        else
        {
            hasOpenPropsBox = false;
        }
        if (!hasOpenPropsBox)
        {
            break;
        }
        Sleep();
    }

    RecycleImgList(PropsImgList);
    RecycleImgList(openBoxPopupImgList);
    if (IsMultipleBox())
    {
        RandomPress([666, 520, 138, 30]);
    }
    return hasOpenPropsBox;
};

const OpenNoOptionBox = () =>
{
    console.log("打开道具箱子");
    if (!OpenBackpack("props"))
    {
        return false;
    }
    const PropsImgList = LoadImgList('backpack/box/propsBox', 30);
    const openBoxPopupImgList = LoadImgList("backpack/box/font/openBoxPopup");

    let hasOpenPropsBox = false;
    let hasPropsBox = null;
    if (GetRandom() > 80)
    {
        randomSwipeBackpackUp()
    }
    let shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        hasPropsBox = FindImgInList(PropsImgList, backpackRegion, shot);
        if (hasPropsBox)
        {
            RandomPress([hasPropsBox.x, hasPropsBox.y, 30, 30]);
            PressUseBtn()
            if (IsMultipleBox())
            {
                RandomPress([666, 520, 138, 30]);
            }
            console.log("等待弹窗出现。");
            if (WaitUntil(() => FindImgInList(openBoxPopupImgList, [552, 150, 171, 94])))
            {
                RandomPress([479, 357, 303, 192], 2);//press blank
                console.log("open successfully");
                hasOpenPropsBox = true;
                shot = captureScreen();
            }
        }
        else
        {
            hasOpenPropsBox = false;
        }
        if (!hasOpenPropsBox)
        {
            break;
        }
        Sleep();
    }

    RecycleImgList(PropsImgList);
    RecycleImgList(openBoxPopupImgList);
    if (IsMultipleBox())
    {
        RandomPress([666, 520, 138, 30]);
    }
    return hasOpenPropsBox;
};
const OpenOptionalBox = () =>
{
    console.log("打开可选择箱子");
    if (!OpenBackpack("props"))
    {
        console.log("open backpack failed");
        return false;
    }
    const optionalBoxItemRegion = [
        [515, 283, 39, 38],
        [589, 283, 36, 41],
        [661, 286, 35, 37],
        [731, 284, 35, 41],
        [518, 358, 36, 34],
    ];

    const type_0 = LoadImgList("backpack/box/optionalBoxType/0");
    const type_2 = LoadImgList("backpack/box/optionalBoxType/2");
    const type_4 = LoadImgList("backpack/box/optionalBoxType/4");

    const openBoxPopupImgList = LoadImgList("backpack/box/font/openBoxPopup");
    const optionalBoxImgList = LoadImgList("backpack/box/optionalBox", 30);

    const backpackRegion = [924, 152, 267, 451];
    const getOptionalType = () =>
    {

        const region = [617, 297, 272, 106];
        const shot = captureScreen();
        let type = -1;
        if (FindImgInList(type_0, region, shot))
        {
            type = 0;
        }
        else if (FindImgInList(type_2, region, shot))
        {
            type = 2;
        }
        else if (FindImgInList(type_4, region, shot))
        {
            type = 4;
        }
        return type;
    };

    let haveOpened = false;
    if (GetRandom() > 90)
    {
        randomSwipeBackpackDown()
    } else if (GetRandom() > 90)
    {
        randomSwipeBackpackUp()
    }
    for (let i = 0; i < 5; i++)
    {
        let haveBox = FindImgInList(optionalBoxImgList, backpackRegion);
        if (haveBox)
        {
            RandomPress([haveBox.x, haveBox.y, 20, 20]);
            let type = getOptionalType();
            if (type != -1)
            {
                PressUseBtn()
                if (IsMultipleBox())
                {
                    RandomPress([666, 520, 138, 30]);
                }
                if (WaitUntil(() => HasPopupClose([816, 208, 46, 45])))
                {
                    console.log("选择:" + (type + 1) + "个");
                    RandomPress(optionalBoxItemRegion[type]);
                    if (FindBlueBtn([542, 439, 201, 66]))
                    {
                        console.log("确认");
                        RandomPress([566, 455, 145, 31]);
                        console.log("等待弹窗出现。");
                        if (WaitUntil(() => FindImgInList(openBoxPopupImgList, [552, 150, 171, 94])))
                        {
                            RandomPress([479, 357, 303, 192], 2);//press blank
                            console.log("open successfully");
                            haveOpened = true;
                        }
                    }
                }
            }
        }
        else
        {
            break;
        }
        Sleep();
    }
    RecycleImgList(type_0);
    RecycleImgList(type_2);
    RecycleImgList(type_4);
    RecycleImgList(openBoxPopupImgList);
    RecycleImgList(optionalBoxImgList);
    return haveOpened;
};
const useNormalProps = (type) =>
{
    if (!OpenBackpack("props"))
    {
        return false;
    }
    type = type || "certificate";
    console.log("使用普通道具：" + type);
    const imgList = LoadImgList(`backpack/props/${type}`);
    const hasProps = FindImgInList(imgList, backpackRegion);
    RecycleImgList(imgList);
    if (hasProps)
    {
        RandomPress([hasProps.x, hasProps.y, 30, 30]);
        PressUseBtn()
        return true;
    }
    return false;
}

const OpenAllBox = () =>
{
    if (!OpenBackpack("props", true))
    {
        console.log("打开背包失败，退出。");
        return false;
    }
    Sleep();
    const haveOpenProps = OpenNoOptionBox();
    const haveOpenOptionalBox = OpenOptionalBox();
    const hasOpenSkill = OpenSkillBook();
    const hasOpenSuit = OpenSuit();
    if (GetRandom() > 80)
    {
        OpenActivityBox()
    }
    if (GetRandom() > 80)
    {
        UseHolyGrail();
    }
    if (GetRandom() > 80)
    {
        OpenRune()
    }
    if (GetRandom() > 80)
    {
        OpenHorse()
    }
    if (GetRandom() > 80)
    {
        useNormalProps("certificate")
    }
    Sleep();
    console.log("结束：已打开所有箱子");

    if (hasOpenSkill)
    {
        console.log("使用了技能书，开始自动释放");
        AutoReleaseSkill();
    }
    if (hasOpenSuit)
    {
        console.log("had open suit card, start to wear suit");
        WearBestSuit();
    }
    if (HasPopupClose([817, 203, 46, 54]))
    {
        RandomPress([829, 216, 22, 25]);
    }
    return haveOpenOptionalBox || haveOpenProps;
};

const WearBestSuit = () =>
{
    console.log("开始穿戴时装");

    if (!EnterMenuItemPage("suit"))
    {
        console.log("进入时装页面失败，退出");
        return false;
    }
    const BlueSuitColorList = [
        ["#30435e", [[0, 5, "#394e6d"], [-1, 19, "#324660"], [62, -9, "#202e42"], [74, 17, "#405779"]]],
        ["#31435f", [[-3, 17, "#384e6c"], [-6, 27, "#334662"], [73, 6, "#2a3b53"], [72, 23, "#3d5273"]]],
        ["#2f425b", [[-2, 17, "#3d5273"], [-4, 29, "#334662"], [71, -2, "#243348"], [77, 18, "#344763"]]],
        ["#2f405b", [[-2, 11, "#31455f"], [-4, 21, "#364a69"], [64, -7, "#1f2c40"], [75, 17, "#394f6e"]]]
    ];

    Sleep();
    if (FindBlueBtn([1037, 656, 185, 61]))
    {
        console.log("点击穿戴");
        RandomPress([1063, 671, 134, 29]);
    }

    const HasBlueSuit = (region, shot) => FindMultiColors(BlueSuitColorList, region, shot);
    const shot = captureScreen();
    let currentDefense = FindNumber("combatPower", [67, 236, 54, 37], shot);
    const config = ReadConfig()
    const epicSuit = LoadImgList("page/suit/epic")
    if (config.game.lv >= 57)
    {
        console.log("等级大于57，查看是否有紫装");
        for (let i = 0; i < 2; i++)
        {
            RandomPress([1003 + i * 107, 209, 72, 84], 2)
            if (FindImgInList(epicSuit, [61, 107, 55, 51]))
            {
                console.log("$$$ 发现紫色时装，点击穿戴。$$$");
                let defense = FindNumber("combatPower", [67, 236, 54, 37]);
                console.log("防御力加成为：" + defense);
                if (currentDefense >= 0 && defense >= currentDefense)
                {
                    if (FindBlueBtn([1037, 656, 185, 61]))
                    {
                        console.log("此时装品质更好，点击穿戴");
                        RandomPress([1063, 671, 134, 29]);
                        break;
                    }
                }
            }
        }
    }
    else
    {
        console.log("等级小于57级");
        for (let j = 0; j < 3; j++)
        {
            let hasBlueSuit = HasBlueSuit([875 + j * 107, 160, 110, 100], shot);
            if (hasBlueSuit)
            {
                RandomPress([hasBlueSuit.x, hasBlueSuit.y, 60, 60]);
                let defense = FindNumber("combatPower", [67, 236, 54, 37]);
                console.log("防御力加成为：" + defense);
                if (currentDefense >= 0 && defense >= currentDefense)
                {
                    if (FindBlueBtn([1037, 656, 185, 61]))
                    {
                        console.log("此时装品质更好，点击穿戴");
                        RandomPress([1063, 671, 134, 29]);
                        break;
                    }
                }
            }
        }
    }
    RecycleImgList(epicSuit)

    PageBack();
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            console.log("穿戴时装流程结束");
            break;
        }
        else
        {
            ClearPage();
        }
        Sleep();
    }
};
// --------------------------- wear equipment ---------------------------------
const getItemColor = (region, shot) =>
{
    region = region || [620, 175, 122, 53];
    shot = shot || captureScreen();
    let color = null;
    for (let key in BackpackItemDetailColorList)
    {
        color = FindMultiColors(BackpackItemDetailColorList[key], region, shot);
        if (color)
        {
            return key;
        }
    }
    return null;
};

const BuyCloak = () =>
{
    console.log("fn:购买披风");

    const config = ReadConfig();
    if (config.game.diamond < 100)
    {
        console.log("小于100钻石，不购买");
        return false;
    }

    if (!EnterMenuItemPage("trade"))
    {
        console.log("打开交易所失败，退出");
        return false;
    }

    let haveBought = false;

    const cloakMenuItem = LoadImgList("page/trade/menu/cloak");
    const breakCloak = LoadImgList("page/trade/menu/breakCloak");
    const price_10 = LoadImgList("page/trade/price/10")
    let haveOpenedCloakPage = false;
    for (let i = 0; i < 10; i++)
    {
        SwipeSlowly([130, 600, 5, 5], [130, 300, 5, 5], 1);

        let hasCloakMenu = FindImgInList(cloakMenuItem, [2, 106, 80, 556]);
        if (hasCloakMenu)
        {
            RandomPress([hasCloakMenu.x, hasCloakMenu.y, 150, 15]);
        }
        let hasBreakCloak = FindImgInList(breakCloak, [7, 106, 158, 529]);
        if (hasBreakCloak)
        {
            RandomPress([hasBreakCloak.x, hasBreakCloak.y, 100, 15]);
        }
        if (FindImgInList(breakCloak, [315, 105, 126, 64]))
        {
            console.log("已打开破裂披风页面");
            haveOpenedCloakPage = true;
            break;
        }
        Sleep();
    }
    if (haveOpenedCloakPage)
    {
        for (let j = 0; j < 5; j++)
        {
            SwipeSlowly([630, 540, 5, 5], [630, 240, 5, 5], 3);

            let purchasePrice = FindImgInList(price_10, [390, 185, 107, 465]);
            if (purchasePrice)
            {
                console.log("发现价格等于10的披风");
                RandomPress([400, purchasePrice.y - 30, 500, 50], 3);
                purchasePrice = FindImgInList(price_10, [871, 195, 68, 289])
                if (purchasePrice)
                {
                    RandomPress([400, purchasePrice.y - 10, 500, 30], 3)
                    WaitUntil(() => HasPopupClose([905, 63, 48, 47]))
                    if (FindBlueBtn([710, 595, 185, 58]))
                    {
                        if (FindNumber("sellPrice", [874, 501, 59, 45]) == 10)
                        {
                            console.log("点击购买")
                            RandomPress([733, 609, 139, 31], 2)
                            if (FindBlueBtn([545, 403, 187, 63]))
                            {
                                console.log("确定购买")
                                RandomPress([568, 421, 144, 28]);
                                haveBought = true;
                                break;
                            }
                        }
                    }

                }
            }

        }
    }
    RecycleImgList(cloakMenuItem)
    RecycleImgList(breakCloak)

    if (HasPopupClose([905, 63, 48, 47]))
    {
        RandomPress([918, 74, 20, 23])
    }
    else if (HasPopupClose([793, 249, 41, 44]))
    {
        RandomPress([804, 260, 21, 20])
    }
    PageBack()
    return haveBought;
};

const WearEquipment = () =>
{
    console.log("开始穿装备");
    let hasOpenBackpack = OpenBackpack("equipment", true);
    if (!hasOpenBackpack)
    {
        console.log("打开背包失败，清理页面尝试重新打开");
        return false;
    }

    const magicWandImgList = LoadImgList("backpack/magicWand");
    const identifyTapScreenImgList = LoadImgList("backpack/identifyTapScreen");

    const IsBetterToWear = () =>
    {
        const shot = captureScreen();
        const left_color = getItemColor([310, 172, 128, 56], shot);
        const right_color = getItemColor([620, 175, 122, 53], shot);

        console.log(left_color, right_color);

        if (left_color == null)
        {
            console.log("新装备，穿戴");
            return true;
        }
        else if (left_color == right_color)
        {
            const left_material = getEquipmentMaterial([344, 146, 58, 42], shot);
            const right_material = getEquipmentMaterial([658, 147, 48, 40], shot);
            if (left_material == "fabric" && right_material != "fabric")
            {
                console.log("已穿戴布料装备");
                return false;
            }
            else if (left_material != "fabric" && right_material == "fabric")
            {
                console.log("优先穿戴布料装备");
                return true;
            }
            else
            {
                const left_lv = getStrengtheningLv([307, 110, 49, 37], shot);
                const right_lv = getStrengtheningLv([617, 109, 46, 38], shot);
                if (left_lv < right_lv)
                {
                    console.log("穿戴布料，并且强化等级高的装备");
                    return true;
                }
                else
                {
                    return false;
                }
            }

        }
        else if (left_color == "white" && (right_color == "green" || right_color == "blue" || right_color == "purple"))
        {
            return true;
        }
        if (left_color == "green" && (right_color == "blue" || right_color == "purple"))
        {
            return true;
        }
        else if (left_color == "blue" && right_color == "purple")
        {
            return true;
        }
        else if (left_color == "purple" && right_color == "orange")
        {
            return true;
        }
        else
        {
            return false;
        }

    };

    const lv5 = LoadImgList("backpack/font/strengtheningLv/lv5");
    const lv6 = LoadImgList("backpack/font/strengtheningLv/lv6");
    const lv7 = LoadImgList("backpack/font/strengtheningLv/lv7");
    const getStrengtheningLv = (region, shot) =>
    {
        shot = shot || captureScreen();
        if (FindImgInList(lv5, region, shot))
        {
            return 5;
        }
        else if (FindImgInList(lv6, region, shot))
        {
            return 6;
        }
        else if (FindImgInList(lv7, region, shot))
        {
            return 7;
        }
        return 0;
    };
    const fabric = LoadImgList("backpack/font/equipmentMaterial/fabric");
    const leather = LoadImgList("backpack/font/equipmentMaterial/leather");
    const metal = LoadImgList("backpack/font/equipmentMaterial/metal");
    const getEquipmentMaterial = (region, shot) =>
    {
        shot = shot || captureScreen();
        if (FindImgInList(fabric, region, shot))
        {
            return "fabric";
        }
        else if (FindImgInList(leather, region, shot))
        {
            return "leather";
        }
        else if (FindImgInList(metal, region, shot))
        {
            return "metal";
        }
        else
        {
            return null;
        }
    };

    const GetTheEquippedInfo = () =>
    {
        console.log("获取穿戴的装备颜色与强化等级");
        if (!OpenBackpack())
        {
            console.log("打开背包失败，退出");
            return false;
        }

        const equippedPosition = [
            [421, 430, 30, 46],
            [488, 431, 31, 44],
            [555, 432, 32, 45],
            [420, 515, 34, 44],
            [486, 514, 33, 47],
            [552, 512, 33, 45],
        ];

        const colors = [];
        const lvList = [];
        if (HasPopupClose([873, 105, 41, 47]))
        {
            RandomPress([881, 116, 20, 21]);
        }
        for (let i = 0; i < equippedPosition.length; i++)
        {
            if (i == 3)
            {
                RandomPress([880, 114, 26, 25])
            }
            RandomPress(equippedPosition[i]);
            let shot = captureScreen();
            colors.push(getItemColor([623, 170, 120, 61], shot));
            lvList.push(getStrengtheningLv([616, 105, 50, 47], shot));
        }

        if (colors.length != 6)
        {
            return false;
        }
        const config = ReadConfig();
        const equipments = {};
        equipments.helmet = [colors[0], lvList[0]];
        equipments.guard = [colors[1], lvList[1]];
        equipments.pants = [colors[2], lvList[2]];
        equipments.cloak = [colors[3], lvList[3]]
        equipments.gloves = [colors[4], lvList[4]];
        equipments.boots = [colors[5], lvList[5]];
        config.equipments = equipments;
        RewriteConfig(config);
    };
    let hasWornEquipment = false;
    const IdentifyEquipment = () =>
    {
        console.log("开始鉴定装备");
        for (let i = 0; i < 30; i++)
        {
            if (FindBlueBtn([383, 565, 222, 75]))
            {
                RandomPress([411, 582, 169, 35], 4);
            }
            if (FindImgInList(identifyTapScreenImgList, [568, 595, 136, 58]))
            {
                console.log("鉴定，点击空白继续");
                PressBlank();
            }
            if (FindBlueBtn([509, 593, 270, 69]))
            {
                console.log("鉴定成功，确认");
                RandomPress([543, 611, 196, 30]);
            }
            if (HasBackpackMenuClose())
            {
                console.log("鉴定完成，退回到背包页面");
                CloseBackpack();
                break;
            }
            Sleep();
        }
    };
    out: for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (IsEquiped([922 + j * 62, 148 + i * 62, 42, 40]))
            {
                console.log("已穿戴，跳过...");
                continue;
            }
            if (!HasMenu())
            {
                console.log("不在背包页面，退出");
                break out;
            }
            if (IsEmpty([935 + j * 62, 155 + i * 62, 70, 70]))
            {
                console.log("已经遍历完所有装备,结束");
                break out;
            }
            RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 3);
            if (FindImgInList(magicWandImgList, [618, 152, 56, 36]))
            {
                console.log("发现武器法杖。");
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前装备已是法杖，判断品质是否更好");
                    if (IsBetterToWear())
                    {
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                        if (!HasBackpackClose() && HasBackpackMenuClose())
                        {
                            IdentifyEquipment();
                            OpenBackpack("equipment", true);
                            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                            PressUseBtn()
                            Sleep();
                        }
                        hasWornEquipment = true;
                        break out;
                    }
                    continue;
                }
                else
                {
                    console.log("当前身上穿的不是法杖，切换武器为法杖");
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                    if (!HasBackpackClose() && HasBackpackMenuClose())
                    {
                        IdentifyEquipment();
                        OpenBackpack("equipment", true);
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        Sleep();
                    }
                    hasWornEquipment = true;
                    break out;

                }

            }

            else if (IsBetterToWear())
            {
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前穿的是法杖，暂不穿戴更高级的非法杖装备");
                    continue;
                }
                console.log("点击穿戴");
                RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                if (!HasBackpackClose() && HasBackpackMenuClose())
                {
                    IdentifyEquipment();
                    OpenBackpack("equipment", true);
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    PressUseBtn()
                    shot = captureScreen();
                }
                hasWornEquipment = true;
                break out;
            }
        }
    }
    console.log("穿戴完成");

    if (!hasWornEquipment)
    {
        GetTheEquippedInfo();
    }

    RecycleImgList(magicWandImgList);
    RecycleImgList(identifyTapScreenImgList);
    RecycleImgList(lv5);
    RecycleImgList(lv6);
    RecycleImgList(lv7);
    RecycleImgList(fabric);
    RecycleImgList(leather);
    RecycleImgList(metal);

    return hasWornEquipment;
};

const WearEquipments = () =>
{
    console.log("//开始连续穿戴装备//");
    let haveWorn = false;
    for (let i = 0; i < 6; i++)
    {
        let hasWornNewEquipment = WearEquipment();
        if (!hasWornNewEquipment)
        {
            break;
        }
        else
        {
            haveWorn = true;
        }
    }
    console.log("//连续穿戴装备结束//");
    return haveWorn;
};

// --------------------------- skill book ---------------------------------

const AutoReleaseSkill = () =>
{
    console.log("开始自动释放技能");
    let hadOpen = false;
    const skillBookPageImgList = LoadImgList("backpack/skillBookPage");
    for (let i = 0; i < 10; i++)
    {
        if (FindImgInList(skillBookPageImgList, [1010, 99, 93, 47]))
        {
            console.log("已打开技能书页面");
            hadOpen = true;
            break;
        }
        else if (HasMenu())
        {
            RandomPress([1096, 23, 18, 26], 3);
        }
        else
        {
            ClearPage();
        }
        Sleep();
    }
    RecycleImgList(skillBookPageImgList);

    if (!hadOpen)
    {
        console.log("打开技能书页面失败，退出");
        return false;
    }
    //
    RandomPress([944, 309, 37, 34]);
    RandomPress([407, 650, 36, 32]);
    PullDownSkill([420, 650]);
    RandomPress([407, 650, 36, 32]);
    //
    RandomPress([1011, 312, 30, 31]);
    RandomPress([470, 652, 33, 36]);
    PullDownSkill([480, 650]);
    RandomPress([470, 652, 33, 36]);
    //
    RandomPress([1072, 305, 35, 35]);
    RandomPress([529, 653, 40, 32]);
    PullDownSkill([540, 650]);
    RandomPress([532, 653, 33, 35]);
    //
    const config = ReadConfig();
    if (config.game.lv >= 45)
    {
        RandomPress([1133, 302, 32, 38]);
        RandomPress([594, 650, 32, 36]);
        // PullDownSkill([610, 650]);
        // RandomPress([594, 650, 32, 36]);
        //
        RandomPress([946, 365, 32, 35]);
        RandomPress([657, 651, 33, 37]);
        // PullDownSkill([670, 650]);
        // RandomPress([657, 651, 33, 37]);
    }

    if (HasPopupClose([1208, 102, 38, 42]))
    {
        RandomPress([1217, 112, 20, 21]);
    }
};

const HaveAllSkill = () =>
{
    let number = 3;
    const config = ReadConfig();
    if (config.game.lv >= 45)
    {
        number = 5;
    }
    console.log("检查技能个数为：" + number);
    const checkPos = [
        [390, 620, 90, 90],
        [450, 620, 90, 90],
        [510, 620, 90, 90],
        [570, 620, 90, 90],
        [630, 620, 90, 90],
    ];

    const quickItem_skillImgList = [];

    for (let i = 0; i < 5; i++)
    {
        quickItem_skillImgList.push(LoadImgList(`icon/quickItem_skill/${i}`));
    }
    const isReleaseSkill = [];

    let shot = captureScreen();
    for (let i = 0; i < number; i++)
    {
        let isAuto = FindImgInList(quickItem_skillImgList[i], checkPos[i], shot);
        if (isAuto)
        {
            console.log("第" + (i + 1) + "个技能已开启自动释放");
            isReleaseSkill.push(true);
        } else
        {
            console.log("第" + (i + 1) + "个技能未开启自动释放");
        }
    }

    quickItem_skillImgList.forEach(imgList => RecycleImgList(imgList));
    if (isReleaseSkill.length == number)
    {
        console.log("技能已全部开启自动释放");
        return true;
    }
    else
    {
        return false;
    }
};

const CheckSkillAutoRelease = () =>
{
    console.log("检查技能是否装备与自动是否");

    let haveThreeSkill = HaveAllSkill();
    if (haveThreeSkill)
    {
        console.log("已学完所有技能，退出");
        return true;
    }
    else
    {
        console.log("技能未全部开启自动释放");
        console.log("开始使用技能书与装备技能");
        OpenSkillBook() && AutoReleaseSkill();
        haveThreeSkill = HaveAllSkill();
        if (!haveThreeSkill)
        {
            console.log("需要去技能书商人那里购买技能书");
            GoToTheNPC("skill");
            BuySkillBook();
            ClearPage();
            OpenSkillBook();
            AutoReleaseSkill();
            ClearPage();
        }
    }
    console.log("检查完毕");
};
const StrengthenEquipment = () =>
{
    console.log("开始强化装备");
    let hasOpenBackpackMenu = OpenBackpackMenu("strengthen");
    if (!hasOpenBackpackMenu)
    {
        ClearPage();
        hasOpenBackpackMenu = OpenBackpackMenu("strengthen");
        if (!hasOpenBackpackMenu)
        {
            console.log("打开强化页面失败，退出");
            return false;
        }
    }
    const Strengthen100RateColorList = [
        ["#ffffff", [[6, 0, "#ffffff"], [20, 1, "#ffffff"], [33, -2, "#ffffff"], [49, 5, "#ffffff"]]],
        ["#ffffff", [[5, 2, "#ffffff"], [12, 2, "#ffffff"], [15, 2, "#ffffff"], [22, 2, "#ffffff"]]]
    ];

    const CanStillStrengthen = () => FindMultiColors(Strengthen100RateColorList, [446, 198, 92, 95]);

    RandomPress([384, 41, 90, 27]); //强化页面
    CloseDetail();
    SingleStrengthen();
    // first to strengthen weapon

    //-----------------------------  strengthen armor and ornement---------------------------------
    const LoopStrengthen = (type) =>
    {
        let isEquiped = false;
        let hadStrengthened = false;
        let strengthenBtnRecPos = [387, 566, 213, 70]
        let strengthenBtnClickPos = [422, 581, 154, 36]
        if (type == "weapon")
        {
            RandomPress([1090, 152, 39, 43]);
        }
        else if (type == "armor")
        {
            RandomPress([1088, 214, 40, 48]); //防具页面
        }
        else if (type == "ornament")
        {
            RandomPress([1090, 279, 40, 38]); //ornement页面
            strengthenBtnRecPos = [497, 564, 218, 70];
            strengthenBtnClickPos = [521, 577, 168, 40]
        }
        out: for (let i = 0; i < 2; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                RandomPress([863 + j * 58, 94 + i * 58, 27, 30]);
                isEquiped = IsEquiped([284, 207, 33, 34]);
                if (isEquiped)
                {
                    for (let k = 0; k < 5; k++)
                    {
                        let canStillStrengthenArmor = CanStillStrengthen();
                        if (canStillStrengthenArmor)
                        {
                            if (FindBlueBtn(strengthenBtnRecPos))
                            {
                                RandomPress(strengthenBtnClickPos, 6);
                                hadStrengthened = true;
                            }
                            else
                            {
                                console.log("无法继续强化，退出");
                                break;
                            }
                        }
                    }

                }
                else
                {
                    console.log("遍历到没有穿戴的装备，退出");
                    break out;
                }
                if (IsEmpty([845 + j * 58, 80 + i * 58, 60, 60]))
                {
                    console.log("点击到空白，退出强化");
                    break out;
                }
            }
        };
        return hadStrengthened;
    };

    LoopStrengthen("weapon");
    LoopStrengthen("armor");
    LoopStrengthen("ornament");
    CloseBackpack();
    ClearPage();
};
const DropSomeItem = () =>
{
    console.log("丢弃一些物品");

};
/**
 * 清理背包
 * @param {*} type "total" or “partial"
 * @returns 
 */
let firstDecomposeEquipment = false;
const DecomposeEquipment = (type) =>
{
    type = type || "partial";
    let needDecompose = true;
    if (type == "total")
    {
        console.log("开始分解全部装备包括蓝装");
    }
    else
    {
        console.log("开始分解除部分装备（不包括蓝装）");
    }
    let hasOpen = OpenBackpack();
    if (hasOpen)
    {
        const backpackFull_gridMax = LoadImgList("backpack/backpackFull_gridMax")
        if (FindImgInList(backpackFull_gridMax, [1122, 649, 72, 53]))
        {
            console.log("背包格子已经满了，优先扩充背包");
            ExpandBackpackCapacity()
        }
        RecycleImgList(backpackFull_gridMax)
        RandomPress([1043, 665, 23, 26]);
    }
    if (!WaitUntilEnterBackpackMenu())
    {
        ClearPage();
        hasOpen = OpenBackpack();
        RandomPress([1043, 665, 23, 26]);
        if (!hasOpen)
        {
            console.log("进入分解页面失败，退出");
            return false;
        }
    }
    if (IsEmpty([845, 80, 55, 55]))
    {
        console.log("背包是空的，退出");
        needDecompose = false;
    }
    const isDetailOnColorList = [
        ["#1d5d55", [[4, 0, "#ffffff"], [8, 0, "#ffffff"], [15, 0, "#1d5d55"], [36, 0, "#1d5d55"]]]
    ];
    if (FindMultiColors(isDetailOnColorList, [1015, 570, 64, 31]))
    {
        RandomPress([962, 575, 102, 16]);
        console.log("关闭详细资讯");
    }
    //修改自动登录设置
    const SetDecomposeSetting = (type) =>
    {
        if (FindGoldBtn([961, 604, 118, 47]))
        {
            console.log("修改自动登录设置");
            RandomPress([1099, 616, 30, 26]); //设置图标
            WaitUntil(() => HasPopupClose([865, 125, 35, 34]));
            Sleep();
            if (type == "total")
            {
                console.log("全部分解");
                if (!FindCheckMark([651, 234, 64, 38]))
                {
                    console.log("分解蓝色装备");
                    RandomPress([667, 230, 42, 13]);
                }
            }
            else if (type == "partial")
            {
                console.log("部分分解");
                if (FindCheckMark([651, 234, 64, 38]))
                {
                    console.log("取消蓝色装备");
                    RandomPress([667, 230, 42, 13]);
                }
                if (FindCheckMark([774, 214, 39, 47]))
                {
                    RandomPress([787, 231, 48, 15]);
                }
            }
            if (FindCheckMark([404, 396, 44, 46]))
            {
                console.log("不取消可记录装备");
                RandomPress([442, 409, 67, 18]);
            }
            if (FindCheckMark([529, 396, 38, 44]))
            {
                console.log("不取消可强化装备");
                RandomPress([569, 408, 76, 19]);
            }
            if (FindGoldBtn([553, 544, 177, 50]))
            {
                console.log("自动登录设置完毕");
                RandomPress([575, 556, 134, 25]);
            }

        }
    }
    let haveSet = false;
    const config = ReadConfig()
    if (needDecompose)
    {
        if (type == "total")
        {
            if (!config.game.decomposeBlueSuit)
            {
                SetDecomposeSetting("total")
                haveSet = true;
                config.game.decomposeBlueSuit = true;
            }
        }
        else if (type == "partial")
        {
            if (config.game.decomposeBlueSuit || !firstDecomposeEquipment)
            {
                SetDecomposeSetting("partial")
                haveSet = true;
                config.game.decomposeBlueSuit = false;
            }
        }
    }

    const selectedMarkImgList = LoadImgList("backpack/selectedMark");

    if (type == "total" && needDecompose)
    {
        console.log("手动勾选已强化装备");
        const strengthenedShot = captureScreen();
        out: for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                if (IsEmpty([845 + j * 57, 80 + i * 57, 55, 55]))
                {
                    break out;
                }
                if (!FindImgInList(selectedMarkImgList, [873 + j * 57, 75 + i * 57, 39, 30], strengthenedShot))
                {
                    RandomPress([857 + j * 57, 92 + i * 57, 34, 31]);
                }
            }
        }
    }
    if (!haveSet && needDecompose)
    {
        if (FindGoldBtn([955, 602, 127, 51]))
        {
            RandomPress([979, 616, 82, 22])
        }
    }
    else if (haveSet)
    {
        RewriteConfig(config)
    }
    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([379, 562, 230, 79]))
        {
            RandomPress([415, 582, 137, 36], 3);
            for (let i = 0; i < 5; i++)
            {
                PressBlank();
                if (HasBackpackMenuClose())
                {
                    break;
                }
                Sleep();
            }
            console.log("分解装备结束");
            break;
        }
        else
        {
            SetDecomposeSetting("partial")
        }
        Sleep()
    }

    RecycleImgList(selectedMarkImgList);
    CloseBackpack();
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        let shot = captureScreen();
        if (HasPopupClose([868, 121, 32, 40], shot))
        {
            RandomPress([874, 131, 22, 23]);
        }
        if (HasPopupClose([1089, 66, 39, 36], shot))
        {
            RandomPress([1100, 41, 27, 28], shot);
        }
        if (HasPopupClose([870, 48, 39, 37], shot))
        {
            RandomPress([877, 57, 23, 20]);
        }
        RandomPress([1102, 40, 21, 22]);
        Sleep();
    }
};

const ExpandBackpackCapacity = () =>
{
    console.log("开始扩充背包！");
    if (!OpenBackpack())
    {
        return console.log("打开背包失败，退出");
    }

    const HasConfirmBtn = () => FindBlueBtn([644, 544, 163, 59]);
    const c500Img = LoadImgList("backpack/capacity/c500")
    if (FindImgInList(c500Img, [1182, 652, 51, 49]))
    {
        console.log("已经扩充至500，不需要操作");
        return true;
    }
    console.log("开始扩充操作");
    RandomPress([1145, 668, 96, 15]);
    if (WaitUntil(HasConfirmBtn))
    {
        console.log("点击+100");
        RandomPress([610, 415, 65, 27]);
        if (HasConfirmBtn())
        {
            RandomPress([665, 560, 123, 28]);
            console.log("点击确定");
            if (!HasConfirmBtn())
            {
                console.log("扩充成功");
            }
            else
            {
                console.log("扩充失败");
            }
        }
    }

    if (HasConfirmBtn())
    {
        RandomPress([497, 559, 117, 28]);
    }
};

const AutoPotion = () =>
{
    console.log("自动使用身上的药水");
    const autoPotionImgList = LoadImgList("backpack/autoPotion");
    let hadOpenBackpack = OpenBackpack("auto");
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败");
        ClearPage();
        hadOpenBackpack = OpenBackpack("auto");
        if (!hadOpenBackpack)
        {
            return false;
        }
    }
    let shot = captureScreen();
    let isSuccess = false;
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            RandomPress([948 + j * 62, 175 + i * 62, 33, 31]);
            if (FindImgInList(autoPotionImgList, [685, 579, 90, 60]))
            {
                RandomPress([704, 596, 50, 24], 0.5);
                isSuccess = true;
            }
            if (IsEmpty([917 + j * 62, 144 + i * 62, 96, 93], shot))
            {
                console.log("已经遍历完，退出");
                break out;
            }
        }
    }
    RecycleImgList(autoPotionImgList);
    CloseBackpack();
    if (isSuccess)
    {
        const config = ReadConfig()
        config.game.autoPotion = true;
        RewriteConfig(config)
    }
    return isSuccess;
};
const UnAutoPotion = () =>
{
    console.log("取消自动使用药水");
    const unAutoPotionImgList = LoadImgList("backpack/unAutoPotion");
    const hadOpenBackpack = OpenBackpack("auto");
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败");
        return false;
    }
    let shot = captureScreen();
    let isSuccess = false;
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (IsEmpty([917 + j * 62, 144 + i * 62, 96, 93], shot))
            {
                console.log("已经遍历完，退出");
                break out;
            }
            RandomPress([948 + j * 62, 175 + i * 62, 33, 31]);
            if (FindImgInList(unAutoPotionImgList, [685, 579, 90, 60]))
            {
                RandomPress([704, 596, 50, 24], 0.5);
                isSuccess = true;
            }
        }
    }
    RecycleImgList(unAutoPotionImgList);
    CloseBackpack();
    if (isSuccess)
    {
        const config = ReadConfig()
        config.game.autoPotion = false;
        RewriteConfig(config)
    }
    return isSuccess;
};
const BuyPotion = () =>
{
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        for (let i = 0; i < 10; i++)
        {
            ClearPage();
            Sleep();
            if (HasMenu())
            {
                break;
            }
        }
        console.log("购买药水失败：未发现菜单按钮,退出");
        return false;
    }

    GoToTheNPC("grocery");
    const BuySomeItem = () =>
    {
        let isBuyPotion = false;
        RandomPress([158, 97, 146, 37]); //小药的图标位置
        RandomPress([630, 338, 30, 5]); //药水滚动条，购买量为50% ~ 60%负重
        if (FindBlueBtn([648, 566, 175, 56]))
        {
            RandomPress([667, 578, 133, 29]);
            Sleep();
            console.log("购买药水成功！");
            isBuyPotion = true;
        }
        const config = ReadConfig();
        if (config.gameMode == "mainStory")
        {
            RandomPress([168, 336, 126, 32]);
            WaitUntil(() => HasPopupClose([791, 114, 46, 46]), 200, 30);
            if (FindBlueBtn([644, 543, 180, 62]))
            {
                console.log("购买速度增加咒文书");
                RandomPress([669, 556, 134, 32]);
                Sleep();
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
            }
        }
        return isBuyPotion;
    };
    if (WaitUntilPageBack())
    {
        const isBuySuccess = BuySomeItem();
        Sleep();
        PageBack();
        console.log("购买药水是否成功：" + isBuySuccess);
        return isBuySuccess;
    }
    else
    {
        console.log("购买失败");
        return false;
    }
};
const IdentifyRandomEquipment = () =>
{
    console.log("鉴定随机装备");
    if (!EnterMenuItemPage("equipment"))
    {
        console.log("进入装备工坊失败");
        return false;
    }

}

module.exports = {
    BuyCloak,
    IsEmpty, getItemColor,
    OpenAllBox,
    OpenSkillBook, AutoReleaseSkill, CheckSkillAutoRelease,
    WearEquipments, StrengthenEquipment, DecomposeEquipment,
    UseHolyGrail, WearBestSuit,
    AutoPotion, UnAutoPotion, BuyPotion, ExpandBackpackCapacity
};
