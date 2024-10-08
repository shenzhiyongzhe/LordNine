
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
    ]

};

const emptyGridImgList = LoadImgList("backpack/emptyGrid");
const isEquipedImgList = LoadImgList("backpack/isEquiped");
const EmptyGridColorList = [
    ["#131415", [[16, 2, "#181618"], [32, 2, "#151618"], [0, 15, "#151518"], [19, 17, "#18181b"], [30, 17, "#181818"], [6, 28, "#161718"], [22, 29, "#181818"], [38, 31, "#151518"]]]
];

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
/**
 * 
 * @param {string} type "normalBox" 
 */
const IsMultipleBox = () => FindBlueBtn([646, 506, 177, 59]);

/**
 * 
 * @param {string} type "weapon" "armor" 
 */
const OpenEquipmentBox = (type) =>
{
    let equipmentImgList = LoadImgList(`backpack/box/${type}Box`);
    let tapRegion = null;
    let hasOpenedBox = false;

    if (type == "weapon")
    {
        tapRegion = [518, 359, 39, 36];
        console.log("打开武器箱子");
    }
    else if (type == "armor")
    {
        tapRegion = [660, 294, 33, 31];
        console.log("打开防具箱子");
    }

    let hasEquipment = null;
    const shot = captureScreen();
    console.log("装备素材数量：" + equipmentImgList.length);
    for (let i = 0; i < equipmentImgList.length; i++)
    {
        hasEquipment = FindImg(equipmentImgList[i], [933, 158, 258, 438], shot);
        if (hasEquipment)
        {
            RandomPress([hasEquipment.x, hasEquipment.y, 30, 30]);
            RandomPress([hasEquipment.x, hasEquipment.y, 30, 30]);
            if (IsMultipleBox())
            {
                RandomPress([666, 520, 138, 30]);
            }
            console.log("wait until popup close " + tapRegion);
            if (WaitUntil(() => HasPopupClose([823, 211, 35, 38]), 10, 500))
            {
                console.log("has popup");
                RandomPress(tapRegion);
            }
            if (FindBlueBtn([537, 438, 206, 67]))
            {
                RandomPress([561, 456, 161, 32]);
                PressBlank();
                hasOpenedBox = true;
            }
        }
    }
    RecycleImgList(equipmentImgList);
    console.log("是否打开箱子:  " + hasOpenedBox);
    return hasOpenedBox;
};

const OpenPropsBox = () =>
{
    console.log("打开道具箱子");
    const PropsImgList = LoadImgList("backpack/box/propsBox");
    let hasOpenPropsBox = false;
    let hasPropsBox = null;

    for (let i = 0; i < PropsImgList.length; i++)
    {
        hasPropsBox = FindImg(PropsImgList[i], [933, 158, 258, 438]);
        if (hasPropsBox)
        {
            RandomPress([hasPropsBox.x, hasPropsBox.y, 30, 30]);
            RandomPress([hasPropsBox.x, hasPropsBox.y, 30, 30]);
            if (IsMultipleBox())
            {
                RandomPress([666, 520, 138, 30]);
            }
            Sleep();
            PressBlank();
            hasOpenPropsBox = true;
        }
    }

    RecycleImgList(PropsImgList);
    console.log("结束，是否打开道具箱子 " + hasOpenPropsBox);
    return hasOpenPropsBox;
};

const OpenSkillBook = () =>
{
    console.log("开始打开技能书");
    const hadOpenBackpack = OpenBackpack("props");
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败，退出");
        return false;
    }

    let hasSkillBook = false;
    let hasOpened = false;
    const skillBookImgList = LoadImgList("backpack/skillBook");
    for (let i = 0; i < skillBookImgList.length; i++)
    {
        hasSkillBook = FindImg(skillBookImgList[i], [931, 160, 260, 445]);
        if (hasSkillBook)
        {
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            hasOpened = true;
        }
    }
    RecycleImgList(skillBookImgList);
    Sleep();
    console.log("结束，是否使用技能书： " + hasOpened);

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
    SortEquipment();
    let hadOpenSuit = false;

    const JumpAnimationColorList = [
        ["#ffffff", [[4, 3, "#ffffff"], [6, 5, "#ffffff"], [10, 1, "#ffffff"], [13, -1, "#ffffff"]]]
    ];
    const IsJumpAnimation = () => FindMultiColors(JumpAnimationColorList, [12, 657, 49, 54]);

    const suitImgList = LoadImgList("backpack/suit");

    const swipeToConfirmImgList = LoadImgList("icon/font/swipeToConfirm");

    for (let i = 0; i < suitImgList.length; i++)
    {
        let hasOpenedSuit = FindImg(suitImgList[i], [932, 155, 256, 447]);
        console.log(hasOpenedSuit);
        if (hasOpenedSuit)
        {
            RandomPress([hasOpenedSuit.x, hasOpenedSuit.y, 30, 30]);
            RandomPress([hasOpenedSuit.x, hasOpenedSuit.y, 30, 30]);
            for (let i = 0; i < 60; i++)
            {
                if (HasSkip())
                {
                    ClickSkip();
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
                if (FindBlueBtn([1055, 639, 214, 72]))
                {
                    RandomPress([1080, 656, 166, 36]);
                    hadOpenSuit = true;
                    break;
                }
                Sleep();
            }
        }
    }
    console.log("结束，是否打开时装：" + hadOpenSuit);
    RecycleImgList(swipeToConfirmImgList);
    return hadOpenSuit;
};
const OpenSelectedPropsBox = () =>
{
    console.log("打开道具自选箱子，默认第三个选项");
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("打开背包失败");
        return false;
    }
    for (let i = 0; i < 5; i++)
    {

    }
};
const OpenAllBox = () =>
{
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    let hasOpenedWeaponBox = OpenEquipmentBox("weapon");
    let hasOpenedArmorBox = OpenEquipmentBox("armor");
    OpenPropsBox();

    if (hasOpenedWeaponBox || hasOpenedArmorBox)
    {
        console.log("有装备箱子被打开，优先穿装备");
        WearEquipments();
        OpenBackpack("props");
    }
    const hasOpenSkill = OpenSkillBook();
    if (hasOpenSkill)
    {
        console.log("使用了技能书，开始自动释放");
        AutoReleaseSkill();
        OpenMenu();
        OpenBackpack("props");
    }
    const hasOpenSuit = OpenSuit();
    if (hasOpenSuit)
    {
        console.log("had open suit card, start to wear suit");
        WearBestSuit();
    }
    UseHolyGrail();
    Sleep();
    console.log("结束：已打开所有箱子");
    return true;
};


const WearBestSuit = () =>
{
    console.log("start to wear best suit");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("open menu failed");
        return false;
    }
    RandomPress([1028, 112, 32, 35]);
    if (!WaitUntilPageBack())
    {
        console.log("enter suit page failed");
        return false;
    }
    Sleep();
    RandomPress([1241, 675, 20, 22]);
    const GreenSuitColorList = [
        ["#384836", [[-2, 8, "#384837"], [-5, 20, "#3e4f3d"], [34, 5, "#3a4a38"], [43, 21, "#303e2e"]]],
        ["#384736", [[0, 12, "#425340"], [-11, 22, "#384836"], [35, 5, "#374735"], [43, 13, "#2d3b2c"]]],
        ["#354434", [[2, 12, "#3c4c3a"], [-9, 19, "#394937"], [37, 3, "#374635"], [47, 16, "#2d3a2b"]]],
        ["#394938", [[-2, 11, "#495d47"], [-8, 21, "#41523e"], [40, -1, "#374635"], [47, 20, "#2c392b"]]]
    ];
    const BlueSuitColorList = [
        ["#293a51", [[-3, 7, "#384f6c"], [-8, 17, "#324661"], [40, -9, "#223246"], [54, 15, "#1b2838"]]],
        ["#27374d", [[-5, 9, "#354a66"], [-8, 17, "#2e405a"], [39, 1, "#2d4059"], [48, 16, "#202e42"]]],
        ["#293b52", [[-2, 5, "#354a66"], [-5, 14, "#2e415a"], [38, -7, "#25354a"], [46, 13, "#223246"]]]
    ];

    const region = [882, 158, 319, 497];
    const hasBlueSuit = FindMultiColors(BlueSuitColorList, region);
    const hasGreenSuit = FindMultiColors(GreenSuitColorList, region);

    if (hasBlueSuit)
    {
        RandomPress([hasBlueSuit.x, hasBlueSuit.y, 30, 30]);
        if (FindBlueBtn([1034, 656, 190, 61]))
        {
            RandomPress([1053, 667, 152, 35]);
        }
    }
    else if (hasGreenSuit)
    {
        RandomPress([hasGreenSuit.x, hasGreenSuit.y, 30, 30]);
        if (FindBlueBtn([1034, 656, 190, 61]))
        {
            RandomPress([1053, 667, 152, 35]);
        }
    }
    PageBack();
};
// --------------------------- wear equipment ---------------------------------

const IsBetterQuality = () =>
{
    let left_color = null;
    let right_color = null;
    let hasLeftColor = false;
    let hasRightColor = false;
    const shot = captureScreen();
    for (let key in BackpackItemDetailColorList)
    {
        hasLeftColor = FindMultiColors(BackpackItemDetailColorList[key], [310, 172, 128, 56], shot);
        if (hasLeftColor)
        {
            left_color = key;
            break;
        }
    }
    for (let key in BackpackItemDetailColorList)
    {
        hasRightColor = FindMultiColors(BackpackItemDetailColorList[key], [620, 175, 122, 53], shot);
        if (hasRightColor)
        {
            right_color = key;
            break;
        }

    }
    console.log(left_color, right_color);
    if (left_color == null)
    {
        return true;
    }
    else if (left_color == "white")
    {
        if (right_color == "white" || right_color == null)
        {
            return false;
        }
        return true;
    }
    else if (left_color == "green")
    {
        if (right_color == "green" || right_color == "white" || right_color == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else if (left_color == "blue")
    {
        if (right_color == "blue" || right_color == "green" || right_color == "white" || right_color == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    console.log("is better quality identify failed");
    return false;
};

const SortEquipment = () => { RandomPress([1097, 668, 17, 19]); Sleep(3); };
const WearEquipment = () =>
{
    console.log("开始穿装备");
    let hasOpenBackpack = OpenBackpack("equipment");
    if (!hasOpenBackpack)
    {
        console.log("打开背包失败，清理页面尝试重新打开");
        ClearPage();
        hasOpenBackpack = OpenBackpack("equipment");
        if (!hasOpenBackpack)
        {
            return false;
        }
    }

    SortEquipment();
    const magicWandImgList = LoadImgList("backpack/magicWand");
    const identifyTapScreenImgList = LoadImgList("backpack/identifyTapScreen");

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

            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
            Sleep();
            if (FindImgInList(magicWandImgList, [618, 152, 56, 36]))
            {
                console.log("发现武器法杖。");
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前装备已是法杖，判断品质是否更好");
                    if (IsBetterQuality())
                    {
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        Sleep(3.5);
                        if (!HasBackpackClose() && HasBackpackMenuClose())
                        {
                            IdentifyEquipment();
                            OpenBackpack("equipment");
                            SortEquipment();
                            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                            Sleep();
                        }
                        hasWornEquipment = true;
                        return hasWornEquipment;
                        // SortEquipment();
                    }
                    continue;
                }
                else
                {
                    console.log("当前身上穿的不是法杖，切换武器为法杖");
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    Sleep(3.5);
                    if (!HasBackpackClose() && HasBackpackMenuClose())
                    {
                        IdentifyEquipment();
                        OpenBackpack("equipment");
                        SortEquipment();
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        Sleep();
                    }
                    hasWornEquipment = true;
                    return hasWornEquipment;

                }

            }

            else if (IsBetterQuality())
            {
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前穿的是法杖，暂不穿戴更高级的非法杖装备");
                    continue;
                }
                console.log("当前装备品质更高");
                RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                Sleep(3.5);
                if (!HasBackpackClose() && HasBackpackMenuClose())
                {
                    IdentifyEquipment();
                    OpenBackpack("equipment");
                    SortEquipment();
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    Sleep();
                    shot = captureScreen();
                }
                hasWornEquipment = true;
                return hasWornEquipment;
                // SortEquipment();
            }
            if (IsEmpty([935 + j * 62, 155 + i * 62, 70, 70]))
            {
                console.log("已经遍历完所有装备,结束");
                break out;
            }
        }
    }
    console.log("穿戴完成");

    for (let key in magicWandImgList)
    {
        magicWandImgList[key].recycle();
    }
    RecycleImgList(identifyTapScreenImgList);
    return hasWornEquipment;
};
const WearEquipments = () =>
{
    console.log("//开始连续穿戴装备//");
    for (let i = 0; i < 6; i++)
    {
        let hasWornNewEquipment = WearEquipment();
        if (!hasWornNewEquipment)
            break;
    }
    console.log("//连续穿戴装备结束//");
};

// --------------------------- skill book ---------------------------------



const AutoReleaseSkill = () =>
{
    console.log("开始自动释放技能");
    const skillBookPageImgList = LoadImgList("backpack/skillBookPage");
    for (let i = 0; i < 30; i++)
    {
        if (FindImgInList(skillBookPageImgList, [1010, 99, 93, 47]))
        {
            console.log("已打开技能书页面");
            break;
        }
        if (HasMenu())
        {
            RandomPress([1096, 23, 18, 26]);
        }
        Sleep();
    }

    RandomPress([944, 309, 37, 34]);
    RandomPress([407, 650, 36, 32]);
    PullDownSkill([420, 650]);
    RandomPress([407, 650, 36, 32]);

    RandomPress([1011, 312, 30, 31]);
    RandomPress([470, 652, 33, 36]);
    PullDownSkill([480, 650]);
    RandomPress([470, 652, 33, 36]);

    RandomPress([1072, 305, 35, 35]);
    RandomPress([529, 653, 40, 32]);
    PullDownSkill([540, 650]);
    RandomPress([532, 653, 33, 35]);

    if (HasPopupClose([1208, 102, 38, 42]))
    {
        RandomPress([1217, 112, 20, 21]);
    }
};
const CheckSkillAutoRelease = () =>
{
    console.log("检查技能是否装备与自动是否");
    const HaveThreeSkill = () =>
    {
        const checkPos = [
            [390, 620, 90, 90],
            [450, 620, 90, 90],
            [510, 620, 90, 90]
        ];
        const quickItem_skillImgList = [
            LoadImgList("icon/quickItem_skill/firstSkill"),
            LoadImgList("icon/quickItem_skill/secondSkill"),
            LoadImgList("icon/quickItem_skill/thirdSkill")
        ];
        const isReleaseSkill = [];

        let shot = captureScreen();
        for (let i = 0; i < checkPos.length; i++)
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
        if (isReleaseSkill.length == 3)
        {
            console.log("技能已全部开启自动释放");
            return true;
        }
        else
        {
            return false;
        }
    };
    let haveThreeSkill = HaveThreeSkill();
    if (haveThreeSkill)
    {
        return true;
    }
    else
    {
        console.log("技能未全部开启自动释放");
        console.log("开始使用技能书与装备技能");
        OpenSkillBook();
        AutoReleaseSkill();
        haveThreeSkill = HaveThreeSkill();
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
        if (type == "weapon")
        {
            RandomPress([1090, 152, 39, 43]);
        }
        else if (type == "armor")
        {
            RandomPress([1088, 214, 40, 48]); //防具页面
        }
        else if (type == "ornement")
        {
            RandomPress([1090, 279, 40, 38]); //ornement页面
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
                            if (FindBlueBtn([387, 566, 213, 70]))
                            {
                                RandomPress([422, 581, 154, 36]);
                                Sleep(4);
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

    const hadStrengthenedWeapon = LoopStrengthen("weapon");
    const hadStrengthenArmor = LoopStrengthen("armor");
    const hadStrengthenOrnament = LoopStrengthen("ornement");
    console.log("强化装备结束，是否强化武器：" + hadStrengthenedWeapon);
    console.log("是否强化武器：" + hadStrengthenArmor);
    console.log("是否强化武器：" + hadStrengthenOrnament);
};
const DropSomeItem = () =>
{
    console.log("丢弃一些物品");

};
const DecomposeEquipment = () =>
{
    console.log("开始分解装备");
    let hasOpen = OpenBackpack();
    if (hasOpen)
    {
        RandomPress([1043, 665, 23, 26]);
    }
    if (!WaitUntilEnterBackpackMenu())
    {
        ClearPage();
        hasOpen = OpenBackpack();
        if (!hasOpen)
        {
            console.log("进入分解页面失败，退出");
            return false;
        }
    }
    const isDetailOnColorList = [
        ["#1d5d55", [[4, 0, "#ffffff"], [8, 0, "#ffffff"], [15, 0, "#1d5d55"], [36, 0, "#1d5d55"]]]
    ];
    if (!FindMultiColors(isDetailOnColorList, [1015, 570, 64, 31]))
    {
        RandomPress([962, 575, 102, 16]);
        console.log("展开详细资讯");
    }

    if (FindGoldBtn([960, 599, 123, 52]))
    {
        RandomPress([975, 615, 92, 23], 2);
        console.log("自动登录");
        RandomPress([575, 123, 40, 40]);
        // change setting
        if (!HasPopupClose([1088, 69, 41, 36]))
        {
            console.log("分解数量较少，检查自动分解选项");
            RandomPress([1105, 619, 16, 18]);
            for (let i = 0; i < 10; i++)
            {
                if (FindCheckMark([407, 397, 37, 44])) //取消可记录装备
                {
                    RandomPress([420, 408, 96, 17]);
                }
                if (FindCheckMark([397, 394, 54, 50])) //包含强化装备
                {
                    RandomPress([540, 408, 105, 17]);
                }
                if (FindGoldBtn([552, 542, 181, 55]))
                {
                    RandomPress([572, 557, 141, 25]);
                    break;
                }
                Sleep();
            }

        }
    }

    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([379, 562, 230, 79]))
        {
            RandomPress([415, 582, 137, 36], 3);
            if (FindBlueBtn([379, 562, 230, 79]))
            {
                console.log("背包空间不足，先不分解");
                for (let i = 0; i < 8; i++)
                {
                    RandomPress([240, 127, 37, 36], 2);
                }
                if (FindBlueBtn([379, 562, 230, 79]))
                {
                    RandomPress([415, 582, 137, 36], 3);
                    PressBlank();
                    CloseBackpack();

                    console.log("分解装备结束");
                    if (HasMenu())
                    {
                        return true;
                    }
                }

            }
            else
            {
                PressBlank();
                CloseBackpack();
                console.log("分解装备结束");
                if (HasMenu())
                {
                    return true;
                }
            }


        }
        if (HasMenu())
        {
            return true;
        }
        else
        {
            ClearPage();
        }
        Sleep();
    }

};

const UseHolyGrail = () =>
{
    console.log("开始使用圣杯");
    let hasUsedHolyGrail = false;
    OpenBackpack("props");
    SortEquipment();
    const holyGrailImgList = LoadImgList("backpack/props/holyGrail");
    const hasHolyGrail = FindImgInList(holyGrailImgList, [926, 151, 263, 138]);
    if (hasHolyGrail)
    {
        RandomPress([hasHolyGrail.x, hasHolyGrail.y, 15, 25]);
        RandomPress([hasHolyGrail.x, hasHolyGrail.y, 15, 25]);
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
        console.log("未发现菜单按钮,退出");
        return false;
    }
    ClearPage();
    if (!IsInCity())
    {
        console.log("不在主城，先传送回家");
        ReturnHome();
    }
    RandomPress([995, 433, 42, 41]); //grocery store
    Sleep(5);
    const BuySomeItem = () =>
    {
        let isBuyPotion = false;
        let isBuySpeedBook = false;
        let isBuyHealBook = false;
        RandomPress([154, 93, 164, 39]); //小药的图标位置
        RandomPress([600, 338, 30, 5]); //药水滚动条，购买量为50% ~ 60%负重
        if (FindBlueBtn([648, 566, 175, 56]))
        {
            RandomPress([667, 578, 133, 29]);
            Sleep();
            console.log("购买药水成功！");
            isBuyPotion = true;
        }
        RandomPress([168, 336, 126, 32]);
        WaitUntil(() => HasPopupClose([791, 114, 46, 46]), 200, 30);
        if (FindBlueBtn([644, 543, 180, 62]))
        {
            console.log("购买速度增加咒文书");
            RandomPress([669, 556, 134, 32]);
            Sleep();
            isBuySpeedBook = true;
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
            isBuyHealBook = true;
        }
        if (isBuyPotion && isBuySpeedBook && isBuyHealBook)
        {
            return true;
        }
        else
        {
            return false;
        }
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

module.exports = {
    OpenAllBox,
    OpenSkillBook, AutoReleaseSkill, CheckSkillAutoRelease,
    WearEquipments, StrengthenEquipment, DecomposeEquipment,
    UseHolyGrail, WearBestSuit,
    AutoPotion, UnAutoPotion, BuyPotion,
};
// BuyPotion();
// DecomposeEquipment();
// WearEquipments();
// const magicWandImgList = LoadImgList("backpack/magicWand");
// console.log(FindImgInList(magicWandImgList, [296, 141, 73, 49]));
// console.log(IsEmpty([282, 199, 39, 50]));
// console.log(IsEquiped([283, 205, 31, 40]));

// UnAutoPotion();
// OpenEquipmentBox("armor");
// WearBestSuit();
// OpenSkillBook();
// OpenAllBox();
// WearEquipments();
// console.log(FindImgInList(magicWandImgList, [616, 147, 58, 40]));
// AutoReleaseSkill();
// OpenBackpack();
// AutoPotion();
// UnAutoPotion();
// StrengthenEquipment();

