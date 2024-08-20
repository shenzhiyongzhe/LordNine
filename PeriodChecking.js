const { EquipSkill, UseSkillBook } = require("./Backpack.js");
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    HollowPress,
    FindBlueBtn,
    PageBack,
    CloseBackpack,
    HasMenu, HasPageback, HasBackpackMenuClose, HasSkip, ClickSkip,
    IsInCity,
    PullDownSkill,
    WaitUntilPageBack,
    SwipeSlowly,
    OpenBackpack,
    OpenBackpackMenu,
    FindTipPoint,
    FindCheckMark,
    FindRedBtn,
    ReturnHome,
    GoToTheNPC
} = require("./utils.js");


const LoginBtnColorList = [
    ["#283735", [[18, -1, "#283735"], [113, 0, "#283735"], [0, 16, "#283735"], [128, 15, "#283735"]]]
];
const NoMoreLoginItemColorList = [
    ["#1f1e1e", [[2, 0, "#1f1e1e"], [4, 0, "#1e1e1e"], [6, 0, "#1e1e1e"], [8, 0, "#1e1e1e"], [0, 2, "#1f1f1e"],
    [2, 2, "#1f1e1e"], [4, 2, "#1f1e1e"], [6, 2, "#1e1e1e"], [8, 2, "#1e1e1e"], [8, 4, "#1e1e1e"], [6, 4, "#1f1e1e"],
    [4, 4, "#1f1e1e"], [2, 4, "#1f1f1e"], [0, 4, "#201f1e"], [0, 6, "#21201e"], [2, 6, "#201f1e"], [4, 6, "#1f1f1e"], [6, 6, "#1f1e1e"], [8, 6, "#1f1e1e"]]]
];

const NotCheckedColorList = [
    ["#303030", [[5, 0, "#303030"], [11, 1, "#303030"], [-2, 7, "#303030"], [7, 7, "#303030"]]]
];
const GrowthMissionColorList = [
    ["#d3affc", [[5, 0, "#d5b0ff"], [-5, 6, "#c7a5ef"], [2, 6, "#d5b0ff"], [10, 6, "#c6a3ed"]]],
];
const AlreadyLearnedSkillColorList = [
    ["#dbd373", [[18, 3, "#d4cc6f"], [31, 3, "#dcd474"], [45, 6, "#dcd474"], [29, 6, "#d8cf72"]]]
];


const PressBlank = () => RandomPress([452, 501, 389, 104]);

const IsNotCheck = (region) => FindMultiColors(NotCheckedColorList, region);

const HasGrowthMission = (region) => FindMultiColors(GrowthMissionColorList, region);
const HasLearnTheSkill = (region) => FindMultiColors(AlreadyLearnedSkillColorList, region);
const GetEmail = () =>
{
    const hasOpenMenu = OpenMenu();
    const hasEmailPoint = FindTipPoint([1054, 520, 25, 27]);
    if (!hasOpenMenu)
    {
        console.log("do not have menu button");
        return false;
    }
    if (!hasEmailPoint)
    {
        console.log("do not have avaliable email");
        return false;
    }
    RandomPress([1033, 555, 25, 16]); // email icon
    const hasEnterEmailPage = WaitUntilPageBack();
    if (!hasEnterEmailPage)
    {
        console.log("enter email page failed!");
        return false;
    }
    console.log("entered email page");
    let shot = captureScreen();
    let hasTipPoint;
    for (let i = 0; i < 6; i++)
    {
        hasTipPoint = FindTipPoint([69, 50, 828, 39], shot);
        if (hasTipPoint)
        {
            RandomPress([hasTipPoint.x - 70, hasTipPoint.y + 5, 70, 20]);
            Sleep();
            if (FindGoldBtn([671, 650, 139, 52]))
            {
                RandomPress([687, 662, 109, 28]);
                if (FindBlueBtn([656, 444, 200, 64])) // character only
                {
                    RandomPress([682, 461, 150, 29]);
                }
                PressBlank();
                Sleep();
                shot = captureScreen();
            }
        }
        else
        {
            break;
        }
    }
    PageBack();
    console.log("get email finish");
};
const GetAchievement = () =>
{
    console.log("get achievement");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("do not have menu button");
        return false;
    }
    const hasAchievementPoint = FindTipPoint([1173, 182, 22, 25]);
    if (!hasAchievementPoint)
    {
        console.log("do not have avaliable achievement");
        return false;
    }
    RandomPress([1153, 204, 21, 33]);
    const hasEnterAchievementPage = WaitUntilPageBack();
    if (!hasEnterAchievementPage)
    {
        console.log("enter achievement page failed!");
        return false;
    }
    console.log("entered achievement page");
    let hasTipPoint;
    hasTipPoint = FindTipPoint([114, 63, 31, 26]);

    if (hasTipPoint)
    {
        if (FindBlueBtn([1103, 651, 164, 56]))
        {
            RandomPress([1118, 661, 136, 34]);
            Sleep();
            PressBlank();
            Sleep();
        }
    }
    hasTipPoint = FindTipPoint([262, 63, 31, 27]);
    if (hasTipPoint)
    {
        RandomPress([201, 74, 69, 29]);
        if (FindBlueBtn([1103, 651, 164, 56]))
        {
            RandomPress([1118, 661, 136, 34]);
            Sleep();
            PressBlank();
            Sleep();
        }
    }
    console.log("finish get achievement");
    PageBack();
};
const GetMonsterKnowledgeAward = () =>
{
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("do not have menu button");
        return false;
    }
    const hasMonsterKnowledgeAwardPoint = FindTipPoint([1111, 269, 29, 29]);
    if (!hasMonsterKnowledgeAwardPoint)
    {
        console.log("do not have avaliable monster knowledge award");
        return false;
    }
    RandomPress([1091, 292, 25, 28]);
    WaitUntilPageBack();
    if (FindBlueBtn([10, 657, 235, 58]))
    {
        RandomPress([33, 672, 183, 26]);
        Sleep();
        PressBlank();
        Sleep();
    }
    PageBack();
    console.log("get monster knowledge award");
};

const IsNoMoreLoginItem = () => FindMultiColors(NoMoreLoginItemColorList, [102, 88, 8, 6]);
const CanPressLoginBtn = () => FindMultiColors(LoginBtnColorList, [1088, 506, 170, 50]);
const LoginProps = () =>
{
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("do not have menu button");
        return false;
    }
    const hasLoginPropsPoint = FindTipPoint([1232, 96, 22, 23]);
    if (!hasLoginPropsPoint)
    {
        console.log("do not have avaliable login props");
        return false;
    }
    RandomPress([1209, 116, 21, 26]); // login props icon
    const hasEnterLoginPropsPage = WaitUntilPageBack();
    if (!hasEnterLoginPropsPage)
    {
        console.log("enter login props page failed!");
        return false;
    }
    console.log("entered login props page");
    let hasTipPoint;
    let loginCount = 0;
    for (let i = 0; i < 10; i++)
    {
        if (IsNoMoreLoginItem())
        {
            console.log("no more login item");
            break;
        }
        hasTipPoint = FindTipPoint([511, 122, 421, 494]);
        if (hasTipPoint)
        {
            RandomPress([hasTipPoint.x - 40, hasTipPoint.y, 40, 40]);
            if (CanPressLoginBtn())
            {
                RandomPress([1103, 521, 144, 23]);
                Sleep(4);
                loginCount++;
            }
        }
        else
        {
            SwipeSlowly([394, 555, 56, 25], [397, 259, 54, 24], 4);
        }
    }
    PageBack();
    console.log("finish get login props, login count: " + loginCount);
};
// 2024/8/9 10：39
//
const ShopBuy = () =>
{
    //buy strengthening stone 
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("no menu button");
        return false;
    }
    RandomPress([975, 20, 27, 27]);
    Sleep();
    const hasEnterShopPage = WaitUntilPageBack();
    if (!hasEnterShopPage)
    {
        console.log("enter shop page failed!");
        PageBack();
        return false;
    }
    console.log("entered shop page");
    let isSuccess = false;
    if (FindBlueBtn([10, 642, 221, 65]))
    {
        RandomPress([37, 658, 172, 32]);
        const shot = captureScreen();
        for (let i = 0; i < 5; i++)
        {
            if (IsNotCheck([234, 144 + i * 85, 56, 62]))
            {
                RandomPress([250, 162 + i * 85, 21, 22]);
            }
        }
        if (FindBlueBtn([652, 556, 238, 78])) // comfirm button
        {
            RandomPress([679, 574, 191, 41]);
            Sleep();
            PressBlank();
            isSuccess = true;
        }
        else if (FindRedBtn([383, 560, 240, 65]))
        {
            RandomPress([414, 574, 184, 33]); //cancel button
        }
    }
    PageBack();
    console.log("finish bulk buy! isSuccess: " + isSuccess);
};

const BuySkillBook = () =>
{
    const hasEnter = GoToTheNPC("skill");
    if (!hasEnter)
    {
        console.log("enter npc failed!");
        return false;
    }
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
};

const BuyUseEquipSkill = () =>
{
    let hasGrowthMisstion = HasGrowthMission([864, 188, 31, 30]);
    if (!hasGrowthMisstion)
    {
        return false;
    }
    BuySkillBook();
    UseSkillBook();
    EquipSkill();
};

const JoinGuild = () =>
{
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("no menu button");
        return false;
    }
    RandomPress([856, 374, 27, 41]);
    Sleep(3);
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
};

const UpgradeHolyRelics = () =>
{
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("no menu button");
        return false;
    }
    RandomPress([971, 290, 33, 31]);
    const hasEnterHolyRelicsPage = WaitUntilPageBack();
    if (!hasEnterHolyRelicsPage)
    {
        console.log("enter holy relics page failed!");
        PageBack();
        return false;
    }
    for (let i = 0; i < 3; i++)
    {
        if (FindBlueBtn([1106, 646, 158, 57]))
        {
            RandomPress([1126, 659, 122, 28]);
            if (FindBlueBtn([657, 446, 200, 61]))
            {
                RandomPress([680, 460, 152, 33]);
                Sleep(5);
            }
        }
        else
        {
            break;
        }
    }
    PageBack();
    console.log("finish upgrade holy relics");
};

const GetDailyMission = () =>
{
    console.log("get every mission");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("no menu button");
        return false;
    }
    RandomPress([1088, 203, 30, 31]);
    const hasEnterDailyMissionPage = WaitUntilPageBack();
    if (!hasEnterDailyMissionPage)
    {
        console.log("enter daily mission page failed!");
        return false;
    }

};


// OpenMenu();
// GetEmail();
// GetAchievement();
// GetMonsterKnowledgeAward();
// console.log(FindBlueBtn([1103, 651, 164, 56]));
const PeriodSetting = {
    cleanBackpack: 2
};
const PeriodRecord = {

};
const PeriodChecking = () =>
{

};
// StartGrowthMission();

// ShopBuy();
// console.log(FindCheckMark([234, 149, 55, 53]));
// module.exports = { GetEmail, GetAchievement, GetMonsterKnowledgeAward, PeriodChecking };
// LoginProps();
// console.log(IsNoMoreLoginItem());
// JoinGuild();
// GetEmail();
// UpgradeHolyRelics();