
const {
    FindImg, FindBlueBtn, FindGoldBtn, FindCheckMark,
    CloseBackpack,
    RandomPress, ReadImg, Sleep, CloseMenu, ClickSkip,
    FindMultiColors,
    HasSkip, HasMenu, HasPopupClose, HasBackpackMenuClose,
    PullDownSkill,
    HasBackpackClose,


    PressBlank,

    WaitUntil,
    OpenBackpack, OpenBackpackMenu, OpenMenu,
    SwipeSlowly,
    WaitUntilPageBack,
    PageBack,
    LoadImgList,
    RecycleImgList,
    FindImgInList,
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

const DetailOnColorList = [
    ["#1d5d55", [[5, 0, "#1d5d55"], [10, 3, "#1d5d55"], [0, 4, "#1d5d55"], [6, 8, "#1d5d55"]]]
];

const SingleStrengthenColorList = [
    ["#e6e5e5", [[2, 0, "#e6e5e5"], [5, 0, "#e6e5e5"], [10, 0, "#e6e5e5"], [2, 1, "#d7d6d4"]]]
];

// ********************  check ----------------------
const IsEquiped = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EquipColorList, region, shot); };

const IsEmpty = (region, shot) => FindImgInList(emptyGridImgList, region, shot);
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
    let hasSkillBook = false;
    let hasOpened = false;
    const skillBookImgList = LoadImgList("backpack/skillBook");
    for (let i = 0; i < skillBookImgList.length; i++)
    {
        hasSkillBook = FindImg(skillBookImgList[i], [931, 160, 260, 445]);
        if (hasSkillBook)
        {
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            Sleep(3);
            RandomPress([hasSkillBook.x, hasSkillBook.y, 30, 30]);
            Sleep(3);
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
    let hasOpenPropsBox = OpenPropsBox();

    if (!hasOpenedWeaponBox && !hasOpenedArmorBox && !hasOpenPropsBox)
    {
        console.log("no box to open");
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
    const hasOpenBackpack = OpenBackpack("equipment");
    if (!hasOpenBackpack)
    {
        console.log("打开背包失败");
        return false;
    }
    SortEquipment();

    let shot = null;
    const magicWandImgList = {
        "white": ReadImg("icon/font/magicWand_white"),
        "green": ReadImg("icon/font/magicWand_green"),
        "blue": ReadImg("icon/font/magicWand_blue")
    };
    const identifyTapScreenImgList = LoadImgList("backpack/identifyTapScreen");

    let hasWornEquipment = false;
    const IdentifyEquipment = () =>
    {
        console.log("identify equipment");
        for (let i = 0; i < 10; i++)
        {
            if (FindBlueBtn([383, 565, 222, 75]))
            {
                RandomPress([411, 582, 169, 35]);
                Sleep(2);
                if (WaitUntil(() => FindImgInList(identifyTapScreenImgList, [573, 597, 123, 51]), 20, 500))
                {
                    RandomPress([243, 434, 899, 153]);
                }
                if (WaitUntil(() => FindBlueBtn([509, 593, 270, 69]), 20, 500))
                {
                    RandomPress([536, 611, 212, 29]);
                }
                CloseBackpack();
                break;
            }
        }
    };

    out: for (let i = 0; i < 6; i++)
    {
        shot = captureScreen();
        for (let j = 0; j < 4; j++)
        {
            if (IsEmpty([922 + j * 62, 148 + i * 62, 42, 40], shot))
            {
                console.log(" found blank! 已经遍历完所有装备,结束");
                break out;
            }

            if (IsEquiped([922 + j * 62, 148 + i * 62, 42, 40]))
            {
                console.log("equiped jump...");
                continue;
            }
            if (!HasMenu())
            {
                console.log("not find menu break out");
                break out;
            }

            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
            Sleep();
            if (FindImg(magicWandImgList.white, [618, 152, 56, 36]) || FindImg(magicWandImgList.green, [618, 152, 56, 36]) || FindImg(magicWandImgList.blue, [618, 152, 56, 36]))
            {
                console.log("发现发张");
                if (FindImg(magicWandImgList.white, [307, 147, 65, 41]) || FindImg(magicWandImgList.green, [307, 147, 65, 41]) || FindImg(magicWandImgList.blue, [307, 147, 65, 41]))
                {
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
                            shot = captureScreen();
                        }
                        hasWornEquipment = true;
                        return hasWornEquipment;
                        // SortEquipment();
                    }
                    continue;
                }
                else
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
                        shot = captureScreen();
                    }
                    hasWornEquipment = true;
                    return hasWornEquipment;
                    // SortEquipment();
                    continue;
                }

            }

            if (IsBetterQuality())
            {
                console.log("the equipment is better quality");
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
        }
    }
    console.log("finish wearing equipment");

    for (let key in magicWandImgList)
    {
        magicWandImgList[key].recycle();
    }
    RecycleImgList(identifyTapScreenImgList);
    return hasWornEquipment;
};
const WearEquipments = () =>
{
    console.log("start to wear equipmentssss");
    for (let i = 0; i < 6; i++)
    {
        let hasWornNewEquipment = WearEquipment();
        if (!hasWornNewEquipment)
            break;
    }
};


// --------------------------- skill book ---------------------------------



const AutoReleaseSkill = () =>
{
    console.log("start to release skill");
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        console.log("not find menu. return false");
        return false;
    }
    RandomPress([1095, 26, 21, 21]); // icon
    Sleep();

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

const StrengthenEquipment = () =>
{
    console.log("start to strengthen equipment");
    const hasOpenBackpackMenu = OpenBackpackMenu("strengthen");
    if (!hasOpenBackpackMenu)
    {
        return false;
    }

    const Strengthen100RateColorList = [
        ["#ffffff", [[6, 0, "#ffffff"], [20, 1, "#ffffff"], [33, -2, "#ffffff"], [49, 5, "#ffffff"]]],
        ["#ffffff", [[5, 2, "#ffffff"], [12, 2, "#ffffff"], [15, 2, "#ffffff"], [22, 2, "#ffffff"]]]
    ];

    const CanStillStrengthen = (region) => FindMultiColors(Strengthen100RateColorList, region);

    RandomPress([384, 41, 90, 27]);
    CloseDetail();
    SingleStrengthen();
    // first to strengthen weapon
    RandomPress([1102, 159, 25, 33]);
    const hasEquipedWeapon = IsEquiped([842, 76, 233, 37], captureScreen());
    if (!hasEquipedWeapon)
    {
        console.log("没有装备武器，无法强化");
    }
    else
    {
        RandomPress([hasEquipedWeapon.x, hasEquipedWeapon.y, 25, 33]);
        for (let i = 0; i < 7; i++)
        {
            let canStillStrengthenWeapon = CanStillStrengthen();
            if (canStillStrengthenWeapon)
            {
                if (FindBlueBtn([387, 566, 213, 70]))
                {
                    RandomPress([422, 581, 154, 36]);
                    Sleep(4);
                }
            }
        }
    }
    //-----------------------------  strengthen armor and ornement---------------------------------
    const LoopStrengthen = (region) =>
    {
        const pageShot = captureScreen();
        let isEquiped = false;

        out: for (let i = 0; i < 2; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                RandomPress([720, 96, 102, 84]);
                RandomPress([720, 96, 102, 84]);
                RandomPress([720, 96, 102, 84]);
                isEquiped = IsEquiped([836 + j * 58, 69 + i * 58, 38, 42], pageShot);
                if (isEquiped)
                {
                    RandomPress([863 + j * 58, 101 + i * 58, 24, 22]);
                    for (let k = 0; k < 5; k++)
                    {
                        let canStillStrengthenArmor = CanStillStrengthen(region);
                        if (canStillStrengthenArmor)
                        {
                            if (FindBlueBtn([387, 566, 213, 70]))
                            {
                                RandomPress([422, 581, 154, 36]);
                                Sleep(4);
                            }
                        }
                    }

                }
                else
                {
                    break out;
                }
            }
        };
    };

    RandomPress([1094, 220, 38, 34]);
    LoopStrengthen([459, 242, 68, 25]);
    //ornament
    RandomPress([1093, 276, 38, 41]);
    LoopStrengthen([468, 217, 53, 25]);
    CloseBackpack();

    CloseMenu();
    console.log("stengthen equipment finish");
};
const DecomposeEquipment = () =>
{
    const hasOpen = OpenBackpack();
    if (hasOpen)
    {
        RandomPress([1043, 665, 23, 26]);
    }
    if (!WaitUntilEnterBackpackMenu())
    {
        console.log("cannot find enter backpack menu button");
        return false;
    }
    const isAutoSelectCheckedColorList = [
        ["#1b1b1b", [[16, 0, "#1a1a1a"], [33, 9, "#1a1a1a"], [28, 30, "#181919"], [-1, 20, "#1a1a1a"]]]
    ];
    if (FindGoldBtn([960, 599, 123, 52]))
    {
        RandomPress([975, 615, 92, 23]);
    }
    // change setting
    if (FindMultiColors(isAutoSelectCheckedColorList, [490, 109, 168, 66]))
    {
        console.log("selected equipment is few check setting");
        RandomPress([1105, 619, 16, 18]);
        if (FindCheckMark([397, 394, 54, 50]))
        {
            RandomPress([421, 409, 83, 17]);
        }
        if (FindCheckMark([525, 395, 57, 50]))
        {
            RandomPress([541, 410, 95, 15]);
        }
        if (FindGoldBtn([552, 542, 181, 55]))
        {
            RandomPress([572, 557, 141, 25]);
        }
    }

    if (FindBlueBtn([379, 562, 230, 79]))
    {
        RandomPress([407, 583, 171, 34]);
        Sleep(3);
        PressBlank();
    }
    CloseBackpack();
};

const UseHolyGrail = () =>
{
    console.log("start to use holy grail");
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
    const autoPotionImgList = LoadImgList("icon/font/autoPotion");
    const hadOpenBackpack = OpenBackpack("auto");
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败");
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
            RandomPress([948 + j * 62, 175 + i * 62, 33, 31], 1);
            if (FindImgInList(autoPotionImgList, [685, 579, 90, 60]))
            {
                RandomPress([704, 596, 50, 24], 0.5);
                isSuccess = true;
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
    const unAutoPotionImgList = LoadImgList("icon/font/unAutoPotion");
    const hadOpenBackpack = OpenBackpack("auto");
    if (!hadOpenBackpack)
    {
        console.log("打开背包失败");
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
            RandomPress([948 + j * 62, 175 + i * 62, 33, 31], 1);
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
module.exports = { OpenAllBox, AutoReleaseSkill, WearEquipments, OpenSkillBook, StrengthenEquipment, DecomposeEquipment, UseHolyGrail, WearBestSuit, AutoPotion, UnAutoPotion, };
// UnAutoPotion();

// WearBestSuit();
// OpenSkillBook()
// OpenAllBox();
// WearEquipments()
// AutoReleaseSkill();
