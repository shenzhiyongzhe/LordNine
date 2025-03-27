const {
    globalTimePlay,
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
    humanSwipe, Sleep,
    ReadConfig,
    FindNumber,
    EnterMenuItemPage,
    RewriteConfig,
    FindWhiteCheckMark,
    GetRandom,
} = require("./utils.js");
const GetTheEquippedInfo = () => {
    console.log("获取穿戴的装备颜色与强化等级");
    if (!OpenBackpack()) {
        console.log("打开背包失败，退出");
        return false;
    }
    const config = ReadConfig()
    if (!config.unlockTrade) {
        console.log("暂未解锁交易所，不检查装备穿戴");
        return false;
    }
    const equippedPosition = [
        [421, 430, 30, 46],
        [488, 431, 31, 44],
        [555, 432, 32, 45],
        [420, 515, 34, 44],
        [486, 514, 33, 47],
        [552, 512, 33, 45],

        [696, 432, 33, 45],
        [764, 432, 31, 43],
        [828, 431, 34, 43],
        [698, 515, 30, 43],
        [764, 516, 31, 44]
    ];
    const equipments = {
        helmet: null,
        tops: null,
        underClothes: null,
        cloak: null,
        gloves: null,
        shoes: null,

        earring: null,
        necklace: null,
        bracelet: null,
        ring: null,
        belt: null,
    }
    const keys = Object.keys(equipments)
    if (HasPopupClose([873, 105, 41, 47])) {
        RandomPress([881, 116, 20, 21]);
    }

    for (let i = 0; i < keys.length; i++) {
        if (["cloak", "earring", "necklace", "bracelet", "ring", "belt"].includes(keys[i])) {
            RandomPress([880, 114, 26, 25])
        }
        RandomPress(equippedPosition[i]);
        let shot = captureScreen();
        equipments[keys[i]] = getItemColor([623, 170, 120, 61], shot)
    }
    if (HasPopupClose([873, 105, 41, 47])) {
        RandomPress([881, 116, 20, 21]);
    }
    config.equipments = equipments;
    RewriteConfig(config)

};
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
const IsEmpty = (region, shot) => { shot = shot || captureScreen(); return FindImgInList(emptyGridImgList, region, shot); };
const emptyGridImgList = LoadImgList("backpack/emptyGrid");
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
const IsEquipped = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(EquipColorList, region, shot, 7); };
const getItemColor = (region, shot) => {
    region = region || [620, 175, 122, 53];
    shot = shot || captureScreen();
    let color = null;
    for (let key in BackpackItemDetailColorList) {
        color = FindMultiColors(BackpackItemDetailColorList[key], region, shot);
        if (color) {
            return key;
        }
    }
    return null;
};
const WearEquipment = () => {
    console.log("开始穿装备");
    let hasOpenBackpack = OpenBackpack("equipment", true);
    if (!hasOpenBackpack) {
        console.log("打开背包失败，清理页面尝试重新打开");
        return false;
    }

    const magicWandImgList = LoadImgList("backpack/magicWand");
    const identifyTapScreenImgList = LoadImgList("backpack/identifyTapScreen");

    const IsBetterToWear = () => {
        const shot = captureScreen();
        const left_color = getItemColor([310, 172, 128, 56], shot);
        const right_color = getItemColor([620, 175, 122, 53], shot);

        console.log(left_color, right_color);

        if (left_color == null) {
            console.log("新装备，穿戴");
            return true;
        }
        else if (left_color == right_color) {
            const left_material = getEquipmentMaterial([344, 146, 58, 42], shot);
            const right_material = getEquipmentMaterial([658, 147, 48, 40], shot);
            if (left_material == "fabric" && right_material != "fabric") {
                console.log("已穿戴布料装备");
                return false;
            }
            else if (left_material != "fabric" && right_material == "fabric") {
                console.log("优先穿戴布料装备");
                return true;
            }
            else {
                const left_lv = getStrengtheningLv([307, 110, 49, 37], shot);
                const right_lv = getStrengtheningLv([617, 109, 46, 38], shot);
                if (left_lv < right_lv) {
                    console.log("穿戴布料，并且强化等级高的装备");
                    return true;
                }
                else {
                    return false;
                }
            }

        }
        else if (left_color == "white" && (right_color == "green" || right_color == "blue" || right_color == "purple")) {
            return true;
        }
        if (left_color == "green" && (right_color == "blue" || right_color == "purple")) {
            return true;
        }
        else if (left_color == "blue" && right_color == "purple") {
            return true;
        }
        else if (left_color == "purple" && right_color == "orange") {
            return true;
        }
        else {
            return false;
        }

    };

    const lv5 = LoadImgList("backpack/font/strengtheningLv/lv5");
    const lv6 = LoadImgList("backpack/font/strengtheningLv/lv6");
    const lv7 = LoadImgList("backpack/font/strengtheningLv/lv7");
    const getStrengtheningLv = (region, shot) => {
        shot = shot || captureScreen();
        if (FindImgInList(lv5, region, shot)) {
            return 5;
        }
        else if (FindImgInList(lv6, region, shot)) {
            return 6;
        }
        else if (FindImgInList(lv7, region, shot)) {
            return 7;
        }
        return 0;
    };
    const fabric = LoadImgList("backpack/font/equipmentMaterial/fabric");
    const leather = LoadImgList("backpack/font/equipmentMaterial/leather");
    const metal = LoadImgList("backpack/font/equipmentMaterial/metal");
    const getEquipmentMaterial = (region, shot) => {
        shot = shot || captureScreen();
        if (FindImgInList(fabric, region, shot)) {
            return "fabric";
        }
        else if (FindImgInList(leather, region, shot)) {
            return "leather";
        }
        else if (FindImgInList(metal, region, shot)) {
            return "metal";
        }
        else {
            return null;
        }
    };


    let hasWornEquipment = false;
    const IdentifyEquipment = () => {
        console.log("开始鉴定装备");
        for (let i = 0; i < 30; i++) {
            if (FindBlueBtn([383, 565, 222, 75])) {
                RandomPress([411, 582, 169, 35], 4);
            }
            if (FindImgInList(identifyTapScreenImgList, [568, 595, 136, 58])) {
                console.log("鉴定，点击空白继续");
                PressBlank();
            }
            if (FindBlueBtn([509, 593, 270, 69])) {
                console.log("鉴定成功，确认");
                RandomPress([543, 611, 196, 30]);
            }
            if (HasBackpackMenuClose()) {
                console.log("鉴定完成，退回到背包页面");
                CloseBackpack();
                break;
            }
            Sleep();
        }
    };
    out: for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (IsEquipped([922 + j * 62, 148 + i * 62, 42, 40])) {
                continue;
            }
            if (!HasMenu()) {
                console.log("不在背包页面，退出");
                break out;
            }
            if (IsEmpty([935 + j * 62, 155 + i * 62, 70, 70])) {
                console.log("已经遍历完所有装备,结束");
                break out;
            }
            RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 3);
            if (FindImgInList(magicWandImgList, [618, 152, 56, 36])) {
                console.log("发现武器法杖。");
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前装备已是法杖，判断品质是否更好");
                    if (IsBetterToWear()) {
                        RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                        if (!HasBackpackClose() && HasBackpackMenuClose()) {
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
                else {
                    console.log("当前身上穿的不是法杖，切换武器为法杖");
                    RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                    if (!HasBackpackClose() && HasBackpackMenuClose()) {
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

            else if (IsBetterToWear()) {
                if (FindImgInList(magicWandImgList, [307, 147, 65, 41])) //当前身上是不是法杖
                {
                    console.log("当前穿的是法杖，暂不穿戴更高级的非法杖装备");
                    continue;
                }
                console.log("点击穿戴");
                RandomPress([955 + j * 62, 179 + i * 62, 24, 26], 5);
                if (!HasBackpackClose() && HasBackpackMenuClose()) {
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

const WearEquipments = () => {
    console.log("//开始连续穿戴装备//");
    let haveWorn = false;
    for (let i = 0; i < 6; i++) {
        let hasWornNewEquipment = WearEquipment();
        if (!hasWornNewEquipment) {
            break;
        }
        else {
            haveWorn = true;
        }
    }
    GetTheEquippedInfo();
    console.log("//连续穿戴装备结束//");
    return haveWorn;
};


// const ChangeAbility = (changeList) => {
//     console.log("改变能力配置，默认配置为战斗，防御，咒术");
//     const hasEnter = EnterMenuItemPage("ability");
//     if (!hasEnter) {
//         console.log("enter ability failed");
//         return false;
//     }
//     let nengli = [{ "imageName": "zhandou" }, { "imageName": "fangyu" }, { "imageName": "zhouwen" }]
//     for (let i = 0; i < 9; i++) {
//         if (nengli.length <= 0) {
//             console.log("完成配置");
//             break
//         }
//         let imageName = nengli[0].imageName
//         let tmpe = images.read("./img/icon/capablematch/" + imageName + ".png")
//         shot = captureScreen();
//         let mathes = images.matchTemplate(shot, tmpe, { region: [15, 116, 558, 513], max: 9 });
//         if (mathes.matches.length >= 2) {
//             let resoultArray = shuffleArray(mathes.matches)

//             console.log(resoultArray[0].point.x);

//             for (let j = 0; j < 2; j++) {
//                 RandomPress([resoultArray[j].point.x, resoultArray[j].point.y, 60, 31])//选中
//                 RandomPress([resoultArray[j].point.x, resoultArray[j].point.y, 60, 31])//配置
//                 if (imageName == "zhandou") {
//                     if (j == 0) {
//                         RandomPress([675, 169, 32, 30])//放入
//                     } else {
//                         RandomPress([764, 168, 28, 29])//放入
//                     }
//                 } else if (imageName == "fangyu") {
//                     if (j == 0) {
//                         RandomPress([672, 300, 34, 32])//放入
//                     } else {
//                         RandomPress([763, 302, 29, 30])//放入
//                     }
//                 } else if (imageName == "zhouwen") {
//                     if (j == 0) {
//                         RandomPress([675, 435, 32, 30])//放入
//                     } else {
//                         RandomPress([763, 437, 31, 24])//放入
//                     }
//                 }
//                 Sleep(2)
//                 RandomPress([526, 666, 120, 32])
//                 if (j >= 1) {
//                     nengli.shift()
//                 }

//             }
//         } else {
//             console.log("未找到俩个以上，滑动");
//             humanSwipe([126, 485, 335, 52], [108, 259, 362, 93])
//         }
//         tmpe.recycle()
//         Sleep()
//     }
//     console.log("完成能力配置");
// };
// ChangeAbility()
WearEquipments()