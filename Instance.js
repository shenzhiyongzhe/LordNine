const { Auto_activeColorList, Auto_inactiveColorList } = require("./Color/MainStoryColorList");
const { ComprehensiveImprovement } = require("./CommonFlow");
const { DeathImgList, FindMultiColors, RandomPress, HasMenu, WaitUntilPageBack, FindBlueBtn, Sleep, IsMoving, PageBack, WaitUntil, IsHaltMode, ExitHaltMode, FindImg, IsInCity, WaitUntilMenu, EnterMenuItemPage, FindNumber } = require("./utils");


const MapIconColorList = [
    ["#c9ba89", [[16, 2, "#50452f"], [8, 14, "#d0bf8d"], [-2, 15, "#dccb96"], [16, 16, "#d7c692"]]],
    ["#cfbe8d", [[-1, 16, "#dccb96"], [7, 20, "#dac994"], [16, 17, "#d1c18f"], [17, 17, "#d7c692"]]]

];
const MapIconGrayColorList = [
    ["#8a8a8b", [[5, -1, "#8f8f8f"], [9, 14, "#494b4b"], [-2, 16, "#989898"], [16, 18, "#3e3f40"]]]
];
const AutoMovingColorList = [
    ["#fbfbfa", [[3, 0, "#fbfbfa"], [22, 2, "#f1f1f0"], [28, 2, "#f4f4f4"], [48, 0, "#f9f9f8"]]]
];
const InInstanceColorList = [
    ["#ffffff", [[7, -6, "#ffffff"], [7, -4, "#ffffff"], [14, -1, "#fcfcfc"], [13, 12, "#e6e6e5"]]]
];
const FirstLevel = [
    [18, 137, 26, 30],
    [19, 205, 27, 28],
    [16, 269, 28, 31],
    [18, 335, 26, 35]
];
const SecondLevel = [
    [89, 241, 162, 29],
    [81, 292, 171, 28],
    [81, 344, 162, 25],
    [82, 393, 164, 33]
];
const ThirdLevel = [
    [959, 137, 143, 23],
    [964, 191, 158, 28],
    [961, 242, 162, 23]
];

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
    return false;
};

const IsAutoMoving = () =>
{

    for (let i = 0; i < 3; i++)
    {
        if (FindMultiColors(AutoMovingColorList, [33, 116, 45, 56]))
        {
            return true;
        }
        Sleep();
    }
    if (HasMenu())
    {
        if (IsMoving())
        {
            return true;
        }
    }
    return false;
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

const AutoLevelingFlow = (mapName) =>
{
    console.log("auto leveling");
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
    console.log("wait until stop moving");
    WaitUntilMenu();
    if (!IsAutoAttacking())
    {
        if (FindMultiColors(Auto_inactiveColorList, [1129, 420, 59, 63]))
        {
            RandomPress([1144, 433, 30, 24]);
            console.log("auto leveling success");
            return true;
        }
    }
    console.log("auto leveling fail");
    return false;
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
        console.log("no exp increase");
        return false;
    }
    else
    {
        return true;
    }
};
const DeathFlow = () =>
{
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    ComprehensiveImprovement();
};
const InstanceExceptionCheck = () =>
{
    if (DeathCheck())
    {
        DeathFlow();
    }
    else if (IsInCity())
    {
        console.log("in city, go to map to auoto leveling");
        AutoLevelingFlow();
    }
    if (IsHaltMode())
    {
        if (!IsExpIncrease())
        {
            AutoLevelingFlow();
        }
    }
};


let lastEnterHour = new Date().getHours();
let hasSuccessfully = false;

const InstanceFlow = () =>
{
    const mapName = [0, 2, 0];

    if (hasSuccessfully == false)
    {
        let hasEntered = AutoLevelingFlow(mapName);
        if (hasEntered)
        {
            hasSuccessfully = true;
        }
        // else
        // {
        //     console.log("auto leveling fail");
        //     if (Math.abs(new Date().getMinutes() - lastEnterMinute) > 10)
        //     {
        //         lastEnterMinute = new Date().getMinutes();
        //         AutoLevelingFlow(mapName);
        //     }
        // }
    }
    else
    {
        if (Math.abs(new Date().getHours() - lastEnterHour) >= 2)
        {
            lastEnterHour = new Date().getHours();
            AutoLevelingFlow(mapName);
        }
    }
    InstanceExceptionCheck();
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
const EnterInstanceFlow = () =>
{
    console.log("EnterInstanceFlow");
    const hasEnterInstancePage = EnterMenuItemPage("instance");
    if (!hasEnterInstancePage)
    {
        console.log("enter instance page failed");
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



module.exports = {
    InstanceFlow
};



// EnterInstanceFlow();
// FindNumber("combatPower", [1147, 490, 114, 45]);
// console.log(FindNumber("combatPower", [1162, 535, 82, 49]));
// AutoLevelingFlow([0, 2, 0]);
// InstanceFlow();
// OpenMap();

