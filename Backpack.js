const {
    FindImg, FindBlueBtn,
    OpenBackpack, CloseBackpack,
    RandomPress, ReadImg, Sleep,
    FindMultiColors,
} = require("./utils.js");

const EquipColorList = [
    ["#5d4e3a", [[5, -1, "#f8f8f8"], [5, 5, "#f8f8f8"], [8, 1, "#dcdcdc"], [13, 1, "#6a5842"]]]
];
const NormalBoxColorList = [
    ["#282828", [[43, 0, "#292929"], [2, 35, "#3b3b3b"], [4, 7, "#835f2b"], [4, 12, "#584125"], [16, 10, "#6b4e30"], [26, 8, "#453932"], [32, 8, "#715832"], [39, 20, "#335066"], [31, 30, "#563e21"], [16, 25, "#342924"], [10, 19, "#211b1a"]]],
    ["#222221", [[3, 38, "#343434"], [44, 2, "#282828"], [4, 12, "#674b25"], [17, 12, "#6a5030"], [32, 13, "#6e4e2f"], [9, 22, "#1e1a19"], [27, 24, "#1e1a18"], [39, 23, "#3a5d76"], [23, 31, "#221f1b"], [9, 28, "#362b26"]]]
];
const NotIdentifyColorList = [
    ["#f9be5b", [[3, -3, "#ffc35d"], [7, 1, "#eab355"], [3, 4, "#d1a14b"], [5, 1, "#283443"]]],
    ["#ffc35d", [[4, -4, "#ffc35d"], [8, 0, "#c69746"], [4, 3, "#d3a24d"], [4, -1, "#283443"]]]
];


const MagicWandWeaponColorList = [
    ["#28292b", [[3, 0, "#838383"], [7, 0, "#dededc"], [11, 0, "#747474"], [0, 3, "#28292b"], [3, 3, "#929292"], [7, 3, "#e6e6e5"], [10, 3, "#d0d0cf"], [1, 6, "#929291"], [4, 6, "#878787"], [6, 6, "#f5f5f4"],
    [12, 6, "#a8a8a8"], [0, 10, "#28292b"], [4, 10, "#828283"], [7, 10, "#cececd"], [12, 10, "#28292b"], [14, 2, "#ababab"], [18, 2, "#d3d3d1"], [16, 0, "#f5f5f4"], [16, 2, "#fafafa"], [16, 4, "#fcfcfc"],
    [16, 10, "#f3f3f2"], [15, 6, "#eeeeed"], [18, 5, "#dfdfdf"], [21, 2, "#b1b1b2"], [24, 2, "#cbcbcb"], [23, 0, "#d9d9d8"], [23, 4, "#c8c8c8"], [22, 7, "#f0f0ef"], [19, 10, "#cfcfcf"], [20, 6, "#e7e7e7"], [21, 8, "#fdfdfd"], [24, 10, "#fcfcfc"]]]
];

const BackpackItemColorList = {
    "white": [
        ["#2f2f2f", [[0, 10, "#2f2f2f"], [43, 10, "#2e2e2e"], [42, 2, "#2e2e2e"], [18, 28, "#2f2f2f"]]],
        ["#2f2f2f", [[37, 3, "#2e2e2e"], [30, 16, "#323232"], [17, 26, "#2b2b2b"], [-2, 23, "#2f2f2f"]]],
        ["#2e2e2e", [[2, 19, "#2f2f2f"], [44, -2, "#262625"], [41, 16, "#292929"], [31, 27, "#2b2b2b"]]],
        ["#2e2e2e", [[1, 13, "#2f2f2f"], [17, 19, "#2f2f2f"], [31, -6, "#2c2c2c"], [36, 7, "#2e2e2e"]]],
        ["#2f2f2f", [[1, 16, "#2c2c2c"], [28, -9, "#2a2a29"], [34, 7, "#2f2f2e"], [22, 29, "#262626"]]],
        ["#2b2b2a", [[-18, 10, "#2f2f2f"], [-12, 25, "#2c2c2c"], [10, 31, "#2e2e2e"], [19, 17, "#2c2c2c"]]],
        ["#2f2f2f", [[0, 7, "#2e2e2e"], [2, 18, "#2f2f2f"], [15, 27, "#2e2e2e"], [41, 11, "#2d2d2d"]]],
        ["#2f2f2f", [[-1, 11, "#2f2f2f"], [19, 20, "#2f2f2f"], [37, 18, "#2f2f2f"], [38, 4, "#2f2f2f"]]],
        ["#2c2c2c", [[2, 10, "#2f2f2f"], [4, 35, "#2c2c2c"], [34, 34, "#303030"], [35, 16, "#2f2f2f"]]],
        ["#282828", [[2, 14, "#2f2f2f"], [16, 34, "#282828"], [32, 35, "#2f2f2f"], [36, 2, "#2b2b2a"]]],
        ["#2c2c2c", [[0, 10, "#2f2f2f"], [38, -9, "#222222"], [38, 15, "#323232"], [3, 31, "#2f2f2f"]]],
    ]
};

// ********************  check ----------------------
const IsEquiped = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EquipColorList, region); };
const NeedIdentify = (region) => { shot = shot || captureScreen(); return FindMultiColors(NotIdentifyColorList, region); };
const IsMagicWandWeapon = (region) => { shot = shot || captureScreen(); return FindMultiColors(MagicWandWeaponColorList, region); };




// **************   check ----------------------




// ***** operation ---------------------
const PressBlank = () => RandomPress([439, 467, 357, 122]);

const WaitUntilEnterItemPage = () =>
{
    const closeIcon = ReadImg("backpack/backpack_close");
    let hasEntered = false;
    for (let i = 0; i < 10; i++)
    {
        let hasClose = FindImg(closeIcon, [1081, 20, 64, 65]);
        if (hasClose)
        {
            Sleep(2);
            hasEntered = true;
            break;
        }
        Sleep(1);
    }
    closeIcon.recycle();
    return hasEntered;
};



const OpenBackpackMenu = () =>
{
    const hasOpened = OpenBackpack();
    if (!hasOpened)
    {
        return false;
    }
    RandomPress([1042, 667, 22, 21]);
    if (!WaitUntilEnterItemPage())
    {
        return false;
    }
    return true;
};
/**
 * 
 * @param {string} type "equipment" 'props' "gold" "auto"
 */
const OpenBox = (type) =>
{
    if (OpenBackpack("props") == false)
    {
        return false;
    }
    Sleep();
    if (type == "normalBox")
    {
        const hasNormalBox = FindMultiColors(NormalBoxColorList, [928, 157, 262, 437]);
        if (hasNormalBox)
        {
            RandomPress([hasNormalBox.x, hasNormalBox.y, 30, 30]);
            console.log(hasNormalBox);
            RandomPress([hasNormalBox.x, hasNormalBox.y, 30, 30]);
            PressBlank();
        }
    }
};
const GetEquipmentType = (region, shot) =>
{

};
const GetWeaponColor = (region, shot) =>
{
    for (let key of BackpackItemColorList)
    {

    }
};
const WearEquipment = () =>
{
    if (!OpenBackpack("equipment"))
    {
        console.log("open backpack failed");
        return false;
    }


};
const SetEquipment = () =>
{
    RandomPress([258, 41, 63, 23]);
    RandomPress([532, 91, 56, 15]);
    RandomPress([975, 615, 88, 23]);
    if (FindBlueBtn([384, 567, 220, 70]))
    {
        RandomPress([407, 582, 173, 35]);
        Sleep(2);
        RandomPress([384, 252, 264, 250]);
        Sleep(2);
        if (FindBlueBtn([]))
        {
            RandomPress([]);
        }
    }
    CloseBackpack();
};

const StrengthenEquipment = () =>
{
    RandomPress([394, 41, 61, 25]); // strenghten page
    RandomPress([529, 92, 63, 14]); // multi strenghten

    if (FindBlueBtn([382, 566, 221, 66]))
    {
        RandomPress([406, 582, 177, 37]);
    }
};
const DecomposeEquipment = () =>
{
    const hasOpen = OpenBackpackMenu();
    if (!hasOpen)
    {
        return false;
    }

    RandomPress([976, 615, 89, 24]);
    Sleep(2);
    if (FindBlueBtn([379, 562, 230, 79]))
    {
        RandomPress([407, 583, 171, 34]);
    }
    CloseBackpack();
};


// console.log(IsEquiped([901, 194, 25, 24]));
OpenBox("normalBox");