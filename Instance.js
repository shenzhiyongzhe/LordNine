const { Auto_activeColorList, Auto_inactiveColorList } = require("./Color/MainStoryColorList");
const { DeathImgList, FindMultiColors, RandomPress, HasMenu, WaitUntilPageBack, FindBlueBtn, Sleep, IsMoving, PageBack, WaitUntil, IsHaltMode, ExitHaltMode,
    FindImg, IsInCity, WaitUntilMenu, EnterMenuItemPage, FindNumber } = require("./utils");
const { ComprehensiveImprovement } = require("./CommonFlow");


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

const GreenLoopColorList = [
    ["#93c187", [[2, 1, "#95be88"], [0, 1, "#93c187"], [-9, 1, "#8bb87c"], [1, 10, "#88b47e"]]],
    ["#92bf82", [[2, 0, "#92ba83"], [0, 1, "#93c187"], [2, 1, "#96bf89"], [1, 2, "#95be88"]]],
    // []
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


let instance_mode = "hangUpWild";
let lastHangUpWildTime = 1726208812345;


const PressAuto = () =>
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

const HangUpWild = (mapName) =>
{

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
        console.log("open map fail");
        return false;
    }
    const hasMovedToMap = EnterMap(mapName);
    if (!hasMovedToMap)
    {
        console.log("enter map fail");
        return false;
    }

    console.log("等待传送到目的地...");
    WaitUntilMenu();
    lastHangUpWildTime = new Date().getTime();
    for (let i = 0; i < 30; i++)
    {
        if (FindMultiColors(Auto_inactiveColorList, [1129, 420, 59, 63]))
        {
            RandomPress([1144, 433, 30, 24]);
            console.log("去野外挂机成功");
            return true;
        }
        Sleep();
    }



};

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
        else if (FindImg(DeathImgList[i], [600, 591, 76, 65], shot))
        {
            console.log("character is dead! in halt mode");
            return true;
        }
    }
    return false;
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
    ComprehensiveImprovement();
    console.log("死亡提升结束");
};
const InstanceExceptionCheck = (uiData) =>
{
    if (DeathCheck())
    {
        DeathFlow();
    }
    else if (IsInCity())
    {
        console.log("in city, go to map");
        if (instance_mode == "hangUpWild")
        {
            HangUpWild(uiData.hangUpMap);

        }
    }
    if (IsHaltMode())
    {
        if (!IsExpIncrease())
        {
            console.log("没有经验增加。");
            ExitHaltMode();
            Sleep();
            HangUpWild(uiData.hangUpMap);
        }
    }
    else
    {
        if (HasMenu())
        {
            if (!IsAutoAttacking())
            {
                if (FindMultiColors(Auto_inactiveColorList, [1118, 418, 66, 58]))
                {
                    RandomPress([1136, 437, 30, 19]);
                }
            }
        }
    }
};

const InInstanceCheck = () =>
{
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    const hasInstanceIcon = FindMultiColors(InInstanceColorList, [86, 290, 35, 39]);
    if (hasInstanceIcon)
    {
        return true;
    }
    else
    {
        return false;
    }
};
const HangUpInstance = () =>
{
    console.log("EnterInstanceFlow");
    const hasEnterInstancePage = EnterMenuItemPage("instance");
    if (!hasEnterInstancePage)
    {
        console.log("enter instance page failed");
        return false;
    }
    let curCombatPower = FindNumber("combatPower", []);
    if (curCombatPower < 14000)
    {
        console.log("当前战力不足，暂不进入副本,当前战力为：" + curCombatPower);
        PageBack();
        return false;
    }
    const CanEnterInstance = () => FindBlueBtn([979, 637, 276, 74]);
    const PressEnterInstanceBtn = () => { RandomPress([1010, 656, 214, 37]); Sleep(10); WaitUntilMenu(); PressAuto(); };

    RandomPress([72, 107, 294, 96]); //first instance
    const canEnterFirstInstance = CanEnterInstance();
    if (canEnterFirstInstance)
    {
        console.log("enter first instance");

        PressEnterInstanceBtn();
        if (InInstanceCheck())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    RandomPress([78, 280, 304, 103]); //second instance
    const canEnterSecondendInstance = CanEnterInstance();
    if (canEnterSecondendInstance)
    {
        console.log("enter second instance");
        PressEnterInstanceBtn();

        if (InInstanceCheck())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    RandomPress([75, 449, 276, 90]); // third instance
    const canEnterThirdInstance = CanEnterInstance();
    if (canEnterThirdInstance)
    {
        console.log("enter third instance");
        PressEnterInstanceBtn();

        if (InInstanceCheck())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
};

const CollectMonsterCollection = () =>
{
    const hadOpenMap = OpenMap();

};
const InstanceFlow = (uiData) =>
{
    InstanceExceptionCheck(uiData);

    if (instance_mode == "hangUpWild")
    {
        if ((lastHangUpWildTime - new Date().getTime()) / 3600000 >= 2)
        {
            HangUpWild(uiData.hangUpMap);
        }
    }
    else if (instance_mode == "monsterCollection")
    {
        console.log("monster mode");
    }
};

// module.exports = {
//     InstanceFlow
// };

//是否有绿环
// console.log(FindMultiColors(GreenLoopColorList, [916, 238, 41, 41]));
// while (true)
// {
//     InstanceFlow();
//     sleep(1000);
// }

// EnterInstanceFlow();
// FindNumber("combatPower", [1147, 490, 114, 45]);
// console.log(FindNumber("combatPower", [1162, 535, 82, 49]));
// HangUpWild([0, 2, 0]);
// InstanceFlow();
// OpenMap();

