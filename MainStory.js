
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    HollowPress,
    FindBlueBtn, HasPageback,
    PageBack,
    HasMenu,
    CloseBackpack,
    HasBackpackMenuClose,
    HasSkip, ClickSkip,
    IsInCity,
    PullDownSkill,
    WaitUntilPageBack,
    SwipeSlowly,
    OpenBackpack
} = require("./utils.js");

const { TipColorList, ArrowColorList, BlankColorList, QuestionMarkColorList, NextColorList, Auto_inactiveColorList,
    Auto_activeColorList, QuestColorList, RidingColorList, TalkColorList, LeaveColorList, TalkBubbleColorList,
    SpeedUpOffColorList,
} = require("./Color/MainStoryColorList.js");

// 点击提示
const FindTip = () => FindMultiColors(TipColorList, [19, 17, 1238, 688]);
const FindArrow = (region) =>
{
    region = region || [0, 0, 1280, 720];
    let [x, y, w, h] = region;
    if (x + w >= 1280)
    {
        w = 1280 - x;
    }
    if (y + h >= 720)
    {
        h = 720 - y;
    }

    for (let i = 0; i < 20; i++)
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
        let hasRightUpArrow = FindMultiColors(ArrowColorList.rightUp, [830, 166, 45, 43], shot);
        if (hasRightUpArrow)
        {
            return ["rightUp", hasRightUpArrow];
        }
        Sleep(0.2);
    }
    return false;
};

const TapTip = () =>
{
    const hasTip = FindTip();
    if (hasTip)
    {
        console.log("发现提示: " + hasTip);
        const hasArrow = FindArrow();
        if (!hasArrow)
        {
            console.log("未发现箭头。");
            RandomPress([hasTip.x, hasTip.y, 30, 10]);
        }
        else
        {
            const [direction, position] = hasArrow;
            console.log("发现箭头：" + direction);
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
const HasTalkBubble = (shot) => FindMultiColors(TalkBubbleColorList, [526, 391, 33, 32], shot);
const IsSpeedUpOff = (shot) => FindMultiColors(SpeedUpOffColorList, [1208, 27, 46, 33], shot);
const ClickMainStory = () => RandomPress([905, 134, 226, 34]);
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
        return false;
    }
};

// 
const MainStoryQuestCheck = () => FindMultiColors(QuestColorList, [1130, 418, 57, 56]);


// ------------------------------------------  main story branch -------------------------------------------
const weaponSelectColorList = [
    ["#3c302a", [[292, -96, "#746d62"], [434, 0, "#535355"], [586, -140, "#877662"], [791, -123, "#363224"]]]
];
const PurpleMainStoryColorList = [
    ["#d5b0ff", [[3, 1, "#d5b0ff"], [10, 6, "#b898dc"], [355, 9, "#dbc996"], [342, 8, "#dccb96"]]]
];
const SkillPopupCloseColorList = [
    ["#878786", [[7, 7, "#636363"], [15, 15, "#6d6d6d"], [13, 0, "#90908f"], [0, 14, "#686867"]]]
];
const AbilityPopupCloseColorList = [
    ["#a59674", [[8, 9, "#625945"], [16, 16, "#746a51"], [16, 0, "#7c7157"], [1, 15, "#655b46"]]]
];
const ChangeGameSetting = () =>
{
    if (!OpenMenu())
    {
        alert("修改游戏设置失败", "未发现菜单按钮");
    }
    RandomPress([1151, 549, 26, 29]);
    if (!WaitUntilPageBack())
    {
        alert("修改游戏设置失败", "打开设置失败");
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
        Sleep(16);

        ClickSkip();
        Sleep(5);
        RandomPress([396, 192, 379, 193]);
        Sleep(3);
        if (FindBlueBtn([652, 429, 171, 59]))
        {
            RandomPress([679, 444, 124, 28]); // start download chinese package
            Sleep(30);
            const downloadingColorList = [
                ["#c1b183", [[8, 0, "#dac894"], [8, -2, "#d3c28f"], [13, 3, "#cebd8b"], [19, 2, "#c8b989"]]]
            ];
            const HasStartBlueBtn = () => FindBlueBtn([931, 639, 261, 71]);
            const PressStartBtn = () => RandomPress([955, 655, 208, 37]);
            for (let i = 0; i < 100; i++)
            {
                let isDownloading = FindMultiColors(downloadingColorList, [1210, 30, 47, 38]);
                if (isDownloading)
                {
                    console.log("正在下载中文包...");
                    Sleep(60);
                }
                else
                {
                    console.log("下载中文包完成!");
                    RandomPress([383, 73, 578, 184]);//
                    Sleep(5);
                    for (let i = 0; i < 30; i++)
                    {
                        if (HasStartBlueBtn())
                        {
                            PressStartBtn();
                            break;
                        }
                        Sleep();
                    }

                    for (let i = 0; i < 30; i++)
                    {
                        if (HasMenu())
                        {
                            console.log("已经进入游戏！");
                            return true;
                        }
                        Sleep();
                    }
                    console.log("进入游戏失败！");
                    return false;
                }
            }
        }
    }
};
const ChangeInitWeapon = () =>
{
    const hasOpened = OpenBackpack("props");
    if (!hasOpened)
    {
        return false;
    }

};

const MainStoryBranch = () =>
{
    const shot = captureScreen();

    const hasWeaponSelect = FindMultiColors(weaponSelectColorList, [47, 62, 1180, 493], shot);
    if (hasWeaponSelect)
    {
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
        RandomPress([902, 131, 273, 36]);
        return true;
    }
    const hasSkillPopup = FindMultiColors(SkillPopupCloseColorList, [1209, 105, 39, 34], shot);
    if (hasSkillPopup)
    {
        PullDownSkill([420, 640]);
        console.log("start to change setting...");
        const changeSuccess = ChangeGameSetting();
        if (changeSuccess)
        {
            OpenBackpack();
        }
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
        // start to change weapon
        console.log("start to change weapon...");

    }
};
// -----------------------------     exception    ----------------------------------
const MainStoryTransformPosColorList = [
    ["#b8a673", [[-3, 1, "#c6b47c"], [-5, 3, "#ccb981"], [-5, 9, "#bcaa76"], [-1, 14, "#a69667"]]]
];
const HasMainStoryPosIcon = () => FindMultiColors(MainStoryTransformPosColorList, [1139, 119, 36, 36]);
const IsMoving = () =>
{
    const clip = images.clip(captureScreen(), 180, 187, 42, 35);
    Sleep(3);
    return FindImg(clip, [166, 178, 72, 57]) ? false : true;
};
const MainStoryException = () =>
{
    if (!IsMoving())
    {
        const isQuest = MainStoryQuestCheck();
        if (isQuest)
        {
            return true;
        }
        if (HasMainStoryPosIcon())
        {
            gesture(3000, [240, 496], [440, 496]);
            ClickMainStory();
        }

    }
    if (FindBlueBtn([654, 444, 202, 66]))
    {
        console.log("main story transform...");
        RandomPress([683, 460, 151, 30]);
    }
};
const MainStoryFlow = () =>
{
    const hasMenu = HasMenu();
    if (hasMenu)
    {
        AutoMainStory();
    }
    else
    {
        TapTip();
        TapDialog();
    }
    MainStoryBranch();
    MainStoryException();
};
// CloseBackpack();
// ChangeGameSetting();
// module.exports = { MainStoryFlow };
// while (true)
// {
//     MainStoryFlow();
//     Sleep();
// }
// MainStoryFlow();

ChangeInitWeapon();
