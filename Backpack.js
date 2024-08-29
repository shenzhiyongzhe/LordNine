const { RedBtnColorList } = require("./Color/Color.js");
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
const NormalBoxColorList = [
    ["#282828", [[43, 0, "#292929"], [2, 35, "#3b3b3b"], [4, 7, "#835f2b"], [4, 12, "#584125"], [16, 10, "#6b4e30"], [26, 8, "#453932"], [32, 8, "#715832"], [39, 20, "#335066"], [31, 30, "#563e21"], [16, 25, "#342924"], [10, 19, "#211b1a"]]],
    ["#222221", [[3, 38, "#343434"], [44, 2, "#282828"], [4, 12, "#674b25"], [17, 12, "#6a5030"], [32, 13, "#6e4e2f"], [9, 22, "#1e1a19"], [27, 24, "#1e1a18"], [39, 23, "#3a5d76"], [23, 31, "#221f1b"], [9, 28, "#362b26"]]],
    ["#2c2c2c", [[4, 3, "#765527"], [18, 3, "#77643d"], [32, 3, "#735b33"], [13, 15, "#231d1c"], [25, 16, "#221e1d"], [11, 21, "#342d28"], [25, 23, "#2a2421"], [32, 26, "#493319"], [38, 22, "#14232d"]]]
];
const GreenEquipmentBoxColorList = [
    ["#2c341d", [[18, 3, "#b4825e"], [13, 6, "#4f3827"], [4, 29, "#97634a"], [31, 27, "#0c1214"]]],
    ["#b17e5a", [[-12, 4, "#8c5b39"], [-18, 26, "#916c48"], [9, 16, "#0f1617"], [11, 26, "#151f20"]]]
];
const IdentifyColorList = [
    ["#3e3e3e", [[5, 0, "#f8e7b2"], [8, 0, "#3e3e3e"], [11, 0, "#3f3c3f"], [0, 2, "#f1e2ae"], [5, 2, "#a99e7c"], [11, 2, "#f0e0ac"], [10, 2, "#eddcab"], [1, 3, "#3f3f3f"], [4, 4, "#7f7762"], [8, 4, "#e7d7a6"], [-2, 7, "#424242"], [1, 7, "#d4c699"],
    [5, 7, "#f8e8b2"], [10, 7, "#91886d"], [-2, 10, "#424342"], [2, 10, "#beb28b"], [5, 10, "#f8e8b3"], [10, 10, "#414040"], [-2, 11, "#424342"], [0, 11, "#f5e5b1"], [4, 11, "#fcecb6"], [5, 11, "#feeeb8"], [-1, 13, "#6f6a5b"], [2, 13, "#444444"],
    [6, 13, "#92896e"], [9, 13, "#aba07f"]]]
];
const BackpackMenuCloseList = [
    ["#877a5f", [[5, 6, "#736951"], [12, 12, "#665d47"], [12, 0, "#80745a"], [-1, 12, "#7b6f56"]]]
];



const BackpackItemDetailColorList = {
    "white": [
        ["#28292b", [[22, 6, "#28292b"], [46, -1, "#28292b"], [43, 22, "#28292b"], [3, 18, "#28292b"]]]
    ],
    "green": [
        ["#243028", [[30, 3, "#243028"], [70, 1, "#243028"], [51, 25, "#243028"], [1, 19, "#243028"]]],
        ["#243028", [[35, 1, "#243028"], [68, 2, "#243028"], [41, 22, "#243028"], [9, 19, "#243028"]]]
    ],
    "blue": [
        ["#202c43", [[22, 1, "#202c43"], [44, 1, "#202c43"], [74, 7, "#202c43"], [29, 20, "#202c43"]]],
        ["#202c43", [[31, -1, "#202c43"], [80, 5, "#202c43"], [2, 16, "#202c43"], [51, 17, "#202c43"]]],
        ["#202c43", [[26, -6, "#202c43"], [76, 3, "#202c43"], [8, 14, "#202c43"], [51, 15, "#202c43"]]]
    ]

};
const GridEmptyColorList = [
    ["#161818", [[14, 1, "#18181b"], [30, 8, "#151618"], [21, 18, "#161818"], [6, 10, "#18181b"]]]
];

const SkillBookColorList = [
    ["#242424", [[12, 2, "#bda97f"], [31, 3, "#8b6c45"], [6, 28, "#5f4023"], [24, 32, "#452e17"]]],
    ["#262626", [[12, 3, "#cdad71"], [31, 3, "#86683b"], [6, 27, "#714d2a"], [25, 32, "#452f17"]]],
    ["#262626", [[11, 4, "#a99067"], [31, 5, "#7d5d3e"], [6, 30, "#6c5235"], [24, 34, "#432f13"]]],
    ["#252525", [[15, 4, "#c3ab6e"], [34, 7, "#3e2d1a"], [6, 29, "#664b25"], [27, 35, "#4e3523"]]],
    ["#202020", [[13, 5, "#c1a374"], [32, 6, "#8e674d"], [6, 31, "#604426"], [26, 36, "#372215"]]],
    ["#202020", [[15, 3, "#d6bc78"], [32, 4, "#61472e"], [6, 28, "#614d26"], [26, 33, "#493117"]]],
    ["#262626", [[11, 5, "#c9a26d"], [28, 5, "#735430"], [3, 28, "#6a4b26"], [23, 33, "#472f17"]]],
    ["#262626", [[8, 2, "#d7ac81"], [31, 3, "#b79d82"], [2, 27, "#715028"], [23, 33, "#513521"]]]
];


const DetailOnColorList = [
    ["#1d5d55", [[5, 0, "#1d5d55"], [10, 3, "#1d5d55"], [0, 4, "#1d5d55"], [6, 8, "#1d5d55"]]]
];

const SingleStrengthenColorList = [
    ["#e6e5e5", [[2, 0, "#e6e5e5"], [5, 0, "#e6e5e5"], [10, 0, "#e6e5e5"], [2, 1, "#d7d6d4"]]]
];

const IdentifyClickScreenColorList = [
    ["#625240", [[4, 0, "#a89376"], [9, 3, "#a69272"], [14, -1, "#a68a6a"], [18, 0, "#6c5a47"]]]
];


// ********************  check ----------------------
const IsEquiped = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EquipColorList, region, shot); };

const IsEmpty = (region, shot) => FindMultiColors(GridEmptyColorList, region, shot);
const IsOnDetail = () => FindMultiColors(DetailOnColorList, [1044, 572, 30, 27]);


// **************   check ----------------------




// ***** operation ---------------------

const WaitUntilEnterBackpackMenu = () => WaitUntil(HasPopupClose([1095, 32, 39, 46]));

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
const OpenNormalBox = () =>
{
    const hasNormalBox = FindMultiColors(NormalBoxColorList, [928, 157, 262, 437]);
    if (hasNormalBox)
    {
        RandomPress([hasNormalBox.x, hasNormalBox.y, 30, 30]);
        RandomPress([hasNormalBox.x, hasNormalBox.y, 30, 30]);
        if (IsMultipleBox())
        {
            RandomPress([665, 519, 140, 35]);
        }
        Sleep();
        PressBlank();
    }
};


/**
 * 
 * @param {string} type "weapon" "armor" 
 */
const OpenEquipmentBox = (type) =>
{
    console.log("start open equipment box");
    const equipmentImgList = [];
    let img = null;
    let tapRegion = null;
    let hasOpenedBox = false;

    if (type == "weapon")
    {
        tapRegion = [518, 359, 39, 36];
    }
    else if (type == "armor")
    {
        tapRegion = [660, 294, 33, 31];
    }
    for (let i = 0; i < 10; i++)
    {
        img = ReadImg(`backpack/box/${type}Box/${i}`);
        if (img == null)
        {
            break;
        }
        equipmentImgList.push(img);
    }

    let hasEquipment = null;
    const shot = captureScreen();
    console.log("equipmentImgList length " + equipmentImgList.length);
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
            if (WaitUntil(() => HasPopupClose([823, 211, 35, 38])))
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
    for (let i = 0; i < equipmentImgList.length; i++)
    {
        equipmentImgList[i].recycle();
    }
    console.log("finish open equipment box");
    return hasOpenedBox;
};
const OpenPropsBox = () =>
{
    console.log("start open props box");
    const PropsImgList = [];
    let hasOpenPropsBox = false;
    let hasPropsBox = null;
    let img = null;
    for (let i = 0; i < 10; i++)
    {
        img = ReadImg(`backpack/box/propsBox/${i}`);
        if (img == null)
        {
            break;
        }
        PropsImgList.push(img);
    }
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
    for (let i = 0; i < PropsImgList.length; i++)
    {
        PropsImgList[i].recycle();
    }
    console.log("finish open props box");
    return hasOpenPropsBox;
};
const OpenAllBox = () =>
{
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    OpenNormalBox();

    let hasOpenedWeaponBox = OpenEquipmentBox("weapon");
    let hasOpenedArmorBox = OpenEquipmentBox("armor");
    let hasOpenPropsBox = OpenPropsBox();
    if (!hasOpenedWeaponBox && !hasOpenedArmorBox && !hasOpenPropsBox)
    {
        console.log("no box to open");
    }
    Sleep();

};

const OpenSuit = () =>
{
    console.log("start open suit");
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    SortEquipment();
    const JumpAnimationColorList = [
        ["#ffffff", [[4, 3, "#ffffff"], [6, 5, "#ffffff"], [10, 1, "#ffffff"], [13, -1, "#ffffff"]]]
    ];
    const IsJumpAnimation = () => FindMultiColors(JumpAnimationColorList, [12, 657, 49, 54]);
    const suitImgList = [];
    const SwipeBarColorList = [
        ["#3e3f3e", [[30, 0, "#3e403f"], [69, 1, "#3e403f"], [104, 3, "#3f403f"], [163, 4, "#3f4040"]]],
        ["#3e3f3f", [[30, 0, "#3e3f3f"], [69, 0, "#3e403f"], [137, 0, "#3f4040"], [173, 0, "#404140"]]]
    ];
    for (let i = 0; i < 10; i++)
    {
        let img = ReadImg(`backpack/suit/${i}`);
        if (img == null)
        {
            break;
        }
        suitImgList.push(img);
    }
    for (let i = 0; i < suitImgList.length; i++)
    {
        let hasOpenedSuit = FindImg(suitImgList[i], [932, 155, 256, 447]);
        if (hasOpenedSuit)
        {
            RandomPress([hasOpenedSuit.x, hasOpenedSuit.y, 30, 30]);
            RandomPress([hasOpenedSuit.x, hasOpenedSuit.y, 30, 30]);
            if (HasSkip())
            {
                ClickSkip();
            }
            else
            {
                Sleep(30);
            }
            if (FindMultiColors(SwipeBarColorList, [513, 635, 251, 34]))
            {
                SwipeSlowly([483, 614, 42, 43], [770, 621, 30, 41], 1);
                Sleep(5);
                if (!IsJumpAnimation())
                {
                    RandomPress([61, 675, 137, 14]);
                }
            }
            if (FindBlueBtn([1055, 639, 214, 72]))
            {
                RandomPress([1080, 656, 166, 36]);
            }
        }
    }
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
        RandomPress([hasBlueSuit.x, hasBlueSuit.y, 30, 30]);
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

const SortEquipment = () => RandomPress([1097, 668, 17, 19]);
const WearEquipment = () =>
{
    console.log("start to wear equipment");
    const hasOpenBackpack = OpenBackpack("equipment");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    SortEquipment();

    let shot = null;
    const magicWandImgList = {
        "white": ReadImg("icon/font/magicWand_white"),
        "green": ReadImg("icon/font/magicWand_green"),
        "blue": ReadImg("icon/font/magicWand_blue")
    };
    const IdentifyEquipment = () =>
    {
        console.log("identify equipment");
        for (let i = 0; i < 10; i++)
        {
            if (FindBlueBtn([383, 565, 222, 75]))
            {
                RandomPress([411, 582, 169, 35]);
                Sleep(2);
                if (WaitUntil(() => FindMultiColors(IdentifyClickScreenColorList, [610, 631, 62, 25])))
                {
                    RandomPress([243, 434, 899, 153]);
                }
                if (WaitUntil(() => FindBlueBtn([509, 593, 270, 69])))
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

            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
            Sleep();
            if (FindImg(magicWandImgList.white, [618, 152, 56, 36]) || FindImg(magicWandImgList.green, [618, 152, 56, 36]) || FindImg(magicWandImgList.blue, [618, 152, 56, 36]))
            {
                console.log("find magic wand");
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
                            Sleep(3);
                            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                            RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                            Sleep();
                            shot = captureScreen();
                        }
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
                        Sleep(3);
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                        Sleep();
                        shot = captureScreen();
                    }
                    continue;
                }

            }

            if (IsBetterQuality())
            {
                RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                Sleep(3.5);
                if (!HasBackpackClose() && HasBackpackMenuClose())
                {
                    IdentifyEquipment();
                    OpenBackpack("equipment");
                    SortEquipment();
                    Sleep(3);
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26]);
                    Sleep();
                    shot = captureScreen();
                }
            }
        }
    }
    console.log("finish wearing equipment");

    for (let key in magicWandImgList)
    {
        magicWandImgList[key].recycle();
    }
    return true;
};

// --------------------------- skill book ---------------------------------
const FindSkillBook = () => FindMultiColors(SkillBookColorList, [930, 156, 256, 442]);

const UseSkillBook = () =>
{
    console.log("start to use skill book");
    const hasOpenBackpack = OpenBackpack("props");
    if (!hasOpenBackpack)
    {
        console.log("open backpack failed");
        return false;
    }
    let hasSkillBook = null;
    Sleep();
    for (let i = 0; i < 8; i++)
    {
        hasSkillBook = FindSkillBook();
        if (!hasSkillBook)
        {
            break;
        }
        else
        {
            RandomPress([hasSkillBook.x, hasSkillBook.y, 24, 24]);
            RandomPress([hasSkillBook.x, hasSkillBook.y, 24, 24]);
            Sleep();
        }
    }
    CloseBackpack();
    console.log("finish using skill book");
    return true;
};

const CloseSkillPopup = () =>
{
    if (random() > 0.5)
    {
        RandomPress([1216, 111, 22, 21]);
    }
    else
    {
        RandomPress([1094, 22, 20, 30]);
    }
};
const EquipSkill = () =>
{
    if (!HasMenu())
    {
        console.log("当前页面没有菜单按钮！装备技能失败");
        return false;
    }
    console.log("start to equip skill");
    RandomPress([1095, 22, 19, 29]);
    const SkillEquipedColorList = [
        ["#ffffff", [[0, 1, "#ffffff"], [0, 3, "#ffffff"], [0, 5, "#ffffff"], [0, 6, "#ffffff"]]],
        ["#fbfbfa", [[0, 1, "#fbfbfa"], [0, 3, "#fbfbfa"], [0, 4, "#fbfbfa"], [0, 6, "#fbfbfa"]]],
        ["#ffffff", [[0, 1, "#ffffff"], [0, 3, "#ffffff"], [0, 4, "#ffffff"], [0, 6, "#ffffff"]]],
        ["#ffffff", [[0, 2, "#ffffff"], [0, 4, "#ffffff"], [0, 5, "#ffffff"], [0, 6, "#ffffff"]]]
    ];
    const IsLearnedColorList = [
        ["#a28a5f", [[0, 7, "#d8b980"], [0, 19, "#d7b87f"], [25, -1, "#a99062"], [55, 18, "#c7aa74"]]],
        ["#a48b5f", [[0, 8, "#a48b5f"], [14, -7, "#b59969"], [56, 3, "#574930"], [55, 13, "#b19767"]]],
        ["#8c7750", [[0, 6, "#ac9263"], [0, 23, "#9d885b"], [26, -2, "#a99062"], [55, 19, "#9d865b"]]]
    ];
    const IsSkillAutoColorList = [
        ["#f7c931", [[2, 0, "#ffda2f"], [5, 0, "#fff235"], [7, 0, "#fffa35"], [10, 0, "#fffa37"]]],
        ["#ffe234", [[1, 0, "#ffea34"], [3, 0, "#fff635"], [6, 0, "#fffb35"], [8, 0, "#fff93a"]]],
        ["#eac133", [[2, 0, "#fdcf35"], [4, 0, "#ffe035"], [8, 0, "#fffa37"], [12, 0, "#fff834"]]],
        ["#ffdb30", [[2, 0, "#ffec32"], [5, 0, "#fffa34"], [6, 0, "#fffb34"], [11, 0, "#ffeb32"]]]
    ];
    const CancelColorList = [
        ["#a29971", [[7, 7, "#6b6349"], [14, 13, "#8f8663"], [13, 1, "#9e946e"], [1, 13, "#7d7455"]]],
        ["#a39971", [[7, 7, "#817959"], [13, 13, "#7e7556"], [13, -1, "#b7ab80"], [1, 11, "#877f5d"]]],
        ["#a59972", [[5, 6, "#7f7657"], [11, 11, "#7b7355"], [11, 1, "#a49972"], [0, 12, "#827a5a"]]]
    ];
    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (FindMultiColors(SkillEquipedColorList, [925 + j * 62, 282 + i * 62, 38, 36]))
            {
                if (!FindMultiColors(IsSkillAutoColorList, [384 + (i + 1) * j * 62, 627, 77, 24]))
                {
                    console.log((i + 1) * j + " skill is equiped but  is not auto");
                    PullDownSkill([420 + (i + 1) * j * 62, 650]);
                    Sleep();
                }
            }
            else if (FindMultiColors(IsLearnedColorList, [925 + j * 62, 282 + i * 62, 73, 78])) 
            {
                if (!FindMultiColors(SkillEquipedColorList, [925 + j * 62, 282 + i * 62, 38, 36]))
                {
                    console.log((i + 1) * j + " learn but not equiped this skill");
                    console.log("shift: " + (407 + (i + 1) * j * 62));
                    RandomPress([948 + j * 62, 305 + i * 62, 29, 30]);
                    RandomPress([407 + (i + 1) * j * 62, 652, 33, 33]);
                    PullDownSkill([420 + (i + 1) * j * 62, 650]);
                    Sleep();
                    if (FindMultiColors(CancelColorList, [399 + (i + 1) * j * 62, 647, 49, 45]))
                    {
                        RandomPress([406 + (i + 1) * j * 62, 652, 35, 38]);
                    }
                    Sleep();
                }
                else if (!FindMultiColors(IsSkillAutoColorList, [384, 627, 77, 24]))
                {
                    console.log((i + 1) * j + " not equiped this skill");

                    PullDownSkill([420 + (i + 1) * j * 62, 650]);
                    Sleep();
                }

            }
        }
    }
    CloseSkillPopup();
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
        Sleep();
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
    const holyGrailImg = ReadImg("backpack/props/holyGrail");
    const hasHolyGrail = FindImg(holyGrailImg, [926, 151, 263, 138]);
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
    return hasUsedHolyGrail;
};


module.exports = { OpenAllBox, WearEquipment, UseSkillBook, EquipSkill, StrengthenEquipment, DecomposeEquipment, UseHolyGrail };


// OpenAllBox();
// console.log(FindImg(ReadImg("backpack/box/weaponBox/1"), [925, 149, 275, 215]));
// console.log(ReadImg("backpack/box/weaponBox/1"));
// OpenPropsBox();
// WearEquipment();
// OpenSuit();
// console.log(IsEmpty([930, 216, 71, 75]));
// OpenAllBox();
// OpenGreenArmorBox();
// DecomposeEquipment();
// console.log(FindCheckMark([404, 311, 44, 36]));
// OpenBox("greenEquipmentBox");
// OpenGreenEquipmentBox();
// WearEquipment();
// StrengthenEquipment();
// console.log(IsEquiped([842, 135, 27, 25], captureScreen()));
// OpenBackpackMenu("strengthen");
// OpenBox("normalBox");
// console.log(FindSkillBook());
// console.log(IsEquiped([953, 74, 35, 34]));
// StrengthenEquipment();
// OpenBackpackMenu("strengthen");
// EquipSkill();
// WearEquipment();
// WearBestSuit();
