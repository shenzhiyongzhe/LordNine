
const {
    specialConfig, globalTimePlay,
    ClickSkip, CloseMenu, CloseBackpack, ClearPage,
    EnterMenuItemPage, ExitHaltMode,
    FindBlueBtn, FindTipPoint, FindCheckMark, FindRedBtn, FindGoldBtn, FindGreenBtn, FindNumber, FindImgInList, FindFloatNumber, FindImg,
    GetDateTime, GoToTheNPC, GetServerName, GetCharacterLv,
    HasMenu, HasPageback, HasPopupClose, HasSkip, HasMenuClose, HasTip, HaveToTapBlank,
    IsBackpackFull, IsHaltMode, IsInCity,
    FindMultiColors,
    LoadImgList,

    WaitUntilPageBack,
    SwipeSlowly, Sleep,

    PressBlank, WaitUntil,
    TapBlankToContinue, PullDownSkill, ReadConfig, RewriteConfig, PageBack,

    OpenBackpack, OpenMenu,

    ReadDealRecord, ReadAccountFile, RecycleImgList, ReadDailyDiamondRecord, ReadTradeRecord, ReadImg, RandomPress, ReturnHome,

    UpdateTradeRecord,
    ChangeRecoverPotionPercentToNormal,
    ChangeGameSetting,


} = require("./utils.js");

const { IsEmpty, WearEquipments, StrengthenEquipment, OpenAllBox, UseHolyGrail, DecomposeEquipment, WearBestSuit, CheckSkillAutoRelease, BuyCloak, UnAutoPotion, getItemColor } = require("./Backpack.js");

let lastComprehensiveImproveTime = 1726208812345;

const GetEmail = () =>
{
    console.log("领取邮件");
    let hasOpenMenu = OpenMenu();
    const hasEmailPoint = FindTipPoint([1054, 520, 25, 27]);
    if (!hasOpenMenu)
    {
        ClearPage();
        hasOpenMenu = OpenMenu();
        if (!hasOpenMenu)
        {
            return false;
        }
    }
    if (!hasEmailPoint)
    {
        console.log("没有可领取邮件，退出");
        return false;
    }
    RandomPress([1033, 555, 25, 16]); // email icon
    const hasEnterEmailPage = WaitUntilPageBack();
    if (!hasEnterEmailPage)
    {
        console.log("进入邮件页面失败，退出");
        return false;
    }
    Sleep();
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
                Sleep();
                PressBlank();
                shot = captureScreen();
            }
        }
        else if (FindGoldBtn([671, 647, 144, 61]))
        {
            RandomPress([687, 663, 108, 26]);
            PressBlank();
        }
    }
    for (let i = 0; i < 10; i++)
    {
        PressBlank();
        PageBack();
        if (HasMenu())
        {
            break;
        }
        ClearPage();
        Sleep();
    }
    return true;
};

const GetAchievement = () =>
{
    console.log("领取成就奖励");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("没有发现菜单按钮，退出");
        return false;
    }
    const hasAchievementPoint = FindTipPoint([1173, 182, 22, 25]);
    if (!hasAchievementPoint)
    {
        console.log("没有可领取的成就奖励，退出");
        return false;
    }
    RandomPress([1153, 204, 21, 33]);
    const hasEnterAchievementPage = WaitUntilPageBack();
    if (!hasEnterAchievementPage)
    {
        console.log("进入成就界面失败，退出");
        return false;
    }
    let hasTipPoint;
    hasTipPoint = FindTipPoint([114, 63, 31, 26]);

    if (hasTipPoint)
    {
        if (FindBlueBtn([1103, 651, 164, 56]))
        {
            RandomPress([1118, 661, 136, 34], 4);
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
            RandomPress([1118, 661, 136, 34], 4);
            PressBlank();
            Sleep();
        }
    }
    PageBack();
    return true;
};

const GetMonsterKnowledgeAward = () =>
{
    console.log("开始领取怪物图鉴奖励");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("没有发现菜单按钮，退出");
        return false;
    }
    const hasMonsterKnowledgeAwardPoint = FindTipPoint([1111, 269, 29, 29]);
    if (!hasMonsterKnowledgeAwardPoint)
    {
        console.log("没有可领取的怪物图鉴奖励，退出");
        return false;
    }
    RandomPress([1091, 292, 25, 28]);
    WaitUntilPageBack();
    Sleep(3);
    if (FindBlueBtn([7, 657, 160, 55]))
    {
        RandomPress([47, 669, 103, 29], 4);
        PressBlank();
        Sleep(3);
    }
    PageBack();
};
const GetPassAward = () =>
{
    console.log("开始领取通行证奖励");
    if (!FindTipPoint([882, 2, 19, 20]))
    {
        console.log("退出：没有可以领取的通行证奖励");
        return false;
    }
    RandomPress([855, 20, 29, 25]);
    const hasEnterPassPage = WaitUntilPageBack();
    if (!hasEnterPassPage)
    {
        console.log("enter pass page failed");
        PageBack();
        return false;
    }
    if (FindBlueBtn([749, 244, 202, 72]))
    {
        RandomPress([770, 265, 158, 31], 5);
        PressBlank();
        PageBack();
        console.log("领取通行证奖励结束");
        return true;
    }
    PageBack();
    return false;
};
const GetActivitiesAward = () =>
{
    console.log("开始领取活动奖励");
    let hadPickAward = false;
    if (!FindTipPoint([942, 3, 17, 19]))
    {
        console.log("没有可以领取的活动奖励");
        return false;
    }

    RandomPress([917, 18, 27, 28]);
    if (!WaitUntil(() => HasPopupClose([1145, 63, 36, 36])))
    {
        console.log("进入活动页面失败，退出");
        return false;
    }
    Sleep(3);
    let haveAvailable;
    for (let i = 0; i < 10; i++)
    {
        let hasTipPoint = FindTipPoint([286, 113, 35, 403]);
        if (hasTipPoint)
        {
            RandomPress([hasTipPoint.x - 150, hasTipPoint.y, 150, 20]);
            let pageShot = captureScreen();
            for (let i = 0; i < 7; i++)
            {
                haveAvailable = FindTipPoint([425 + i * 116, 265, 45, 260], pageShot);
                if (FindTipPoint([1137, 159, 45, 50], pageShot))
                {
                    console.log("领取最终奖励")
                    RandomPress([1106, 188, 46, 50])
                    RandomPress([602, 173, 274, 105])
                }
                if (haveAvailable)
                {
                    console.log("发现可领取物品，点击领取");
                    RandomPress([haveAvailable.x - 50, haveAvailable.y, 50, 50], 3);
                    PressBlank();
                    hadPickAward = true;
                    if (HasPopupClose([746, 97, 44, 48]))
                    {
                        RandomPress([848, 287, 269, 293]);
                    }
                    break;
                }
            }
            //任务进度条 奖励
            let hasBar = FindTipPoint([727, 315, 35, 282]);
            if (hasBar)
            {
                RandomPress([hasBar.x - 100, hasBar.y + 10, 100, 30]);
                PressBlank();
            }
            let hasBar_right = FindTipPoint([1151, 319, 30, 274]);
            if (hasBar_right)
            {
                RandomPress([hasBar_right.x - 100, hasBar_right.y + 10, 100, 20]);
                PressBlank();
            }
            //点击分页
            if (!hasBar && !hasBar_right)
            {
                RandomPress([360, 273, 72, 27])
                hasBar = FindTipPoint([727, 315, 35, 282]);
                if (hasBar)
                {
                    RandomPress([hasBar.x - 100, hasBar.y + 10, 100, 30]);
                    PressBlank();
                }
                hasBar_right = FindTipPoint([1151, 319, 30, 274]);
                if (hasBar_right)
                {
                    RandomPress([hasBar_right.x - 100, hasBar_right.y + 10, 100, 20]);
                    PressBlank();
                }
                RandomPress([478, 274, 71, 27])
                hasBar = FindTipPoint([727, 315, 35, 282]);
                if (hasBar)
                {
                    RandomPress([hasBar.x - 100, hasBar.y + 10, 100, 30]);
                    PressBlank();
                }
                hasBar_right = FindTipPoint([1151, 319, 30, 274]);
                if (hasBar_right)
                {
                    RandomPress([hasBar_right.x - 100, hasBar_right.y + 10, 100, 20]);
                    PressBlank();
                }
            }
        }
        Sleep();
    }

    for (let i = 0; i < 10; i++)
    {
        if (HasPopupClose([745, 97, 46, 47]))
        {
            RandomPress([760, 108, 19, 20]);
        }
        else if (HasPopupClose([1143, 55, 42, 51]))
        {
            RandomPress([1157, 74, 14, 18]);
        }
        else if (HasMenu() || HasMenuClose())
        {
            break;
        }
        Sleep();
    }
    console.log("结束：是否领取活动奖励：" + hadPickAward);
    return true;
};
const GetTravelLogAward = () =>
{
    console.log("开始领取日志奖励");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("打开菜单失败!");
        return false;
    }
    const hasLogTip = FindTipPoint([1232, 187, 21, 20]);
    if (!hasLogTip)
    {
        console.log("没有可以领取的奖励，退出");
        return false;
    }

    RandomPress([1207, 201, 31, 36]);
    const hasEnterLogPage = WaitUntilPageBack();
    if (!hasEnterLogPage)
    {
        console.log("enter page failed");
        PageBack();
        return false;
    }
    Sleep(3);

    if (!FindTipPoint([602, 608, 28, 38]))
    {
        console.log("没有发现小红点，退出");
        PageBack();
        return false;
    }
    if (!FindBlueBtn([551, 448, 209, 74]))
    {
        console.log("没有发现可领取按钮，退出");
        PageBack();
        return false;
    }
    RandomPress([581, 466, 151, 33]); // open travel log
    Sleep(3);
    for (let i = 0; i < 5; i++)
    {
        let hasTipPoint = FindTipPoint([249, 101, 27, 340]);
        if (hasTipPoint)
        {
            RandomPress([hasTipPoint.x - 200, hasTipPoint.y, 200, 40]);
            let hasItemTipPoint = FindTipPoint([468, 166, 199, 47]);
            if (hasItemTipPoint)
            {
                RandomPress([hasItemTipPoint.x - 40, hasItemTipPoint.y, 40, 40], 3);
                PressBlank();
                console.log("领取奖励成功");
            }
        }
        else
        {
            console.log("没有可领取奖励，退出 ");
            break;
        }
    }
    PageBack();
    return true;
};
const LoginProps = (type) =>
{
    console.log("fn：开始道具记录");
    if (!OpenMenu())
    {
        return false;
    }
    else
    {
        Sleep();
        if (!FindTipPoint([1229, 93, 26, 32]))
        {
            console.log("没有可记录道具，退出");
            return false;
        }
    }
    EnterMenuItemPage("propsLogin");

    type = type || "partial";
    const CanPressLoginBtn = () => FindGreenBtn([1089, 508, 171, 47]);

    const SetLoginSetting = () =>
    {
        if (FindGoldBtn([62, 656, 134, 44]))
        {
            console.log("只登录白色装备和绿色装备");
            RandomPress([82, 665, 100, 23]);
            WaitUntil(() => HasPopupClose([1044, 160, 43, 43]));

            if (!FindCheckMark([401, 269, 35, 38]))
            {
                RandomPress([451, 279, 62, 16]);
            }
            if (!FindCheckMark([564, 271, 38, 38]))
            {
                RandomPress([610, 279, 71, 19]);
            }
            if (FindBlueBtn([657, 491, 198, 65]))
            {
                RandomPress([681, 503, 154, 37]);
                console.log("确定搜索记录设置");
            }
            for (let i = 0; i < 10; i++)
            {
                if (HasPopupClose([1045, 157, 39, 43]))
                {
                    if (!FindCheckMark([401, 269, 35, 38]))
                    {
                        RandomPress([451, 279, 62, 16]);
                    }
                    if (!FindCheckMark([564, 271, 38, 38]))
                    {
                        RandomPress([610, 279, 71, 19]);
                    }
                    if (FindBlueBtn([657, 491, 198, 65]))
                    {
                        RandomPress([681, 503, 154, 37]);
                    }
                }
                if (HasPageback())
                {
                    break;
                }
                Sleep();
            }
        }

    };

    for (let i = 0; i < 2; i++)
    {
        if (HasSkip())
        {
            ClickSkip();
        }
        else if (HasPageback())
        {
            break;
        }
        Sleep();
    }
    if (!HasPageback())
    {
        console.log("未进入图鉴页面，退出");
        return false;
    }
    console.log("进入到道具记录页面");
    let hasTipPoint;
    let loginCount = null;
    let hasItemToLogin = 0;
    hasItemToLogin = FindNumber("combatPower", [209, 73, 62, 38]);
    if (hasItemToLogin == null)
    {
        console.log("没有可登录道具，退出");
        PageBack();
        return true;
    }
    else
    {
        console.log("可记录道具数量：" + hasItemToLogin);
    }

    out: for (let i = 0; i < 15; i++)
    {
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
            hasItemToLogin = FindNumber("combatPower", [209, 73, 62, 38]);
            console.log("剩余可记录道具数量：" + hasItemToLogin);
            if (!hasItemToLogin)
            {
                break out;
            }
            SwipeSlowly([243, 549, 423, 35], [255, 157, 374, 29], 3);
        }
    }
    PageBack();
    console.log("道具记录完毕，记录数量为: " + loginCount);
    return loginCount;
};

const ShopBuy = () =>
{
    console.log("开始商城购买");
    let hadDailyShop = false;
    for (let i = 0; i < 30; i++)
    {
        if (HasMenu())
        {
            RandomPress([971, 19, 34, 33], 6)
        }
        if (FindBlueBtn([540, 445, 201, 63]))
        {
            console.log("发现服务器异常弹窗，稍后再试 1");
            RandomPress([568, 457, 150, 35], 3);
            hadDailyShop = true;
            break;
        }
        if (HasPageback())
        {
            console.log("进入商城页面");
            break;
        }
        ClearPage()
        Sleep()
    }

    const NotCheckedColorList = [
        ["#303030", [[5, 0, "#303030"], [11, 1, "#303030"], [-2, 7, "#303030"], [7, 7, "#303030"]]]
    ];

    const IsNotCheck = (region) => FindMultiColors(NotCheckedColorList, region);

    if (FindBlueBtn([44, 641, 192, 69]))
    {
        RandomPress([87, 658, 119, 31], 3);
    }
    if (HasPopupClose([1013, 73, 59, 56]))
    {
        for (let i = 0; i < 5; i++)
        {
            if (IsNotCheck([234, 144 + i * 85, 56, 62]))
            {
                RandomPress([250, 162 + i * 85, 21, 22]);
            }
            Sleep()
        }
        if (FindBlueBtn([652, 556, 238, 78])) // confirm button
        {
            RandomPress([679, 574, 191, 41], 3);
            PressBlank();
            console.log("购买成功，点击空白");
            hadDailyShop = true;
        }
        else if (FindRedBtn([383, 560, 240, 65]))
        {
            console.log("点击取消购买");
            hadDailyShop = true;
            RandomPress([414, 574, 184, 33]); //cancel button
        }
    }

    PageBack();

    for (let i = 0; i < 300; i++)
    {
        if (FindBlueBtn([540, 441, 203, 69]))
        {
            console.log("发现服务器异常弹窗，稍后再试 2");
            RandomPress([568, 457, 150, 35]);
            hadDailyShop = true;
        }
        else if (FindRedBtn([383, 560, 240, 65]))
        {
            console.log("点击取消购买 2");
            hadDailyShop = true;
            RandomPress([414, 574, 184, 33]); //cancel button
        }
        else if (HasMenu())
        {
            break;
        }
        PageBack()
        Sleep();
    }

    console.log("商城购买完毕，是否成功购买: " + hadDailyShop);

    if (hadDailyShop)
    {
        const config = ReadConfig();
        config.daily.dailyShop = true;
        RewriteConfig(config);
    }
    return hadDailyShop;
};

const ShopExchange = () =>
{
    console.log("开始交换活动物品");
    let haveEnterShopPage = false;
    for (let i = 0; i < 30; i++)
    {
        if (HasMenu())
        {
            RandomPress([971, 19, 34, 33], 6)
        }
        if (FindBlueBtn([540, 445, 201, 63]))
        {
            console.log("发现服务器异常弹窗，稍后再试 1");
            RandomPress([568, 457, 150, 35], 3);
            haveEnterShopPage = false;
            break;
        }
        if (HasPageback())
        {
            console.log("进入商城页面");
            haveEnterShopPage = true;
            break;
        }
        ClearPage()
        Sleep()
    }
    if (!haveEnterShopPage)
    {
        console.log("未打开商店，退出");
    }
    else
    {
        console.log("成功打开商店");
        const sellout = LoadImgList("page/shop/sellout")
        Sleep(5)
        RandomPress([198, 77, 59, 24]) //exchange page
        const itemPos = [
            [281, 191, 235, 145],
            [578, 201, 248, 134],
            [893, 194, 232, 139],
            [282, 473, 236, 139],
            [589, 474, 233, 136]
        ]
        const selloutRegion = [
            [344, 300, 112, 65],
            [662, 303, 72, 54],
            [958, 302, 84, 62],
            [353, 581, 93, 56],
            [657, 582, 84, 54]
        ]
        for (let i = 0; i < 5; i++)
        {
            if (FindImgInList(sellout, selloutRegion[i]))
            {
                console.log("已经售完，下一个");
                continue;
            }
            RandomPress(itemPos[i])
            if (WaitUntil(() => HasPopupClose([932, 89, 52, 44]), 1000, 10))
            {
                if (FindBlueBtn([658, 561, 236, 63]))
                {
                    RandomPress([527, 487, 50, 18])
                    RandomPress([682, 576, 186, 33])
                    console.log("点击确认购买");
                }
            }
            if (FindBlueBtn([539, 438, 202, 73]))
            {
                console.log("发现然后再试的确认弹窗，点击确认");
                RandomPress([570, 459, 147, 34])
                break;
            }
            else if (HasPopupClose([932, 103, 53, 54]))
            {
                RandomPress([947, 118, 30, 28])
            }
            else if (HasPopupClose([933, 87, 54, 46]))
            {
                RandomPress([933, 87, 54, 46])
            }
            else if (FindBlueBtn([656, 538, 236, 65]))
            {
                RandomPress([689, 555, 180, 31])
            }
            Sleep()
        }
        RecycleImgList(sellout)
        PageBack()
    }

    for (let i = 0; i < 100; i++)
    {
        if (HasMenu())
        {
            break;
        }
        if (HasPopupClose([932, 103, 53, 54]))
        {
            RandomPress([947, 118, 30, 28])
        }
        if (HasPopupClose([933, 87, 54, 46]))
        {
            RandomPress([933, 87, 54, 46])
        }
        if (FindBlueBtn([539, 438, 202, 73]))
        {
            console.log("发现然后再试的确认弹窗，点击确认 2");
            RandomPress([570, 459, 147, 34])
        }
        Sleep()
    }
}

const IncreaseWeaponFeatures = () =>
{
    console.log("fn: 开始增加武器特性");
    if (!EnterMenuItemPage("weaponFeatures"))
    {
        console.log("enter weapon features page failed!");
        return false;
    }
    const activateImgList = LoadImgList("page/weaponFeature/activate");

    const IsActivated = (region) => FindImgInList(activateImgList, region);

    const RecogPos = [
        [[528, 191, 105, 104], [416, 277, 119, 128], [403, 401, 67, 103]],
        [[534, 179, 107, 120], [422, 284, 112, 121], [414, 401, 42, 99]],
        [[535, 190, 98, 112], [513, 296, 42, 93], [520, 407, 35, 97]],
        [[534, 179, 107, 120], [422, 284, 112, 121], [414, 401, 42, 99]],
        [[534, 179, 107, 120], [422, 284, 112, 121], [414, 401, 42, 99]],
    ];
    const PressPos = [
        [[527, 285, 21, 21], [421, 387, 24, 22], [422, 493, 22, 21]],
        [[526, 284, 19, 21], [421, 387, 24, 24], [421, 492, 24, 22]],
        [[525, 282, 21, 22], [525, 388, 24, 21], [526, 493, 21, 20]],
        [[526, 284, 19, 21], [421, 387, 24, 24], [421, 492, 24, 22]],
        [[526, 284, 19, 21], [421, 387, 24, 24], [421, 492, 24, 22]],
    ];
    const lv = FindNumber("lv", [203, 160, 62, 61]);
    console.log("武器特性，当前玩家等级为：" + lv);
    const config = ReadConfig();
    config.game.lv = lv;
    RewriteConfig(config);
    let skillNumber = lv >= 45 ? 5 : 3;
    let clickSkillTime = lv >= 45 ? 4 : 3;

    const ActivateSkill = (i, j) =>
    {
        if (!IsActivated(RecogPos[i][j]))
        {
            console.log("not activated! :" + i + " " + j);
            if (j == 0)
            {
                console.log("click first");
                RandomPress([629, 180, 25, 20]);
                if (FindBlueBtn([992, 632, 215, 74]))
                {
                    RandomPress([1019, 653, 155, 31]);
                }
                RandomPress(PressPos[i][j]);
                if (FindBlueBtn([992, 632, 215, 74]))
                {
                    RandomPress([1019, 653, 155, 31]);
                }
                if (!FindBlueBtn([530, 643, 222, 67]))
                {
                    return false;
                }
            }
            else
            {
                RandomPress(PressPos[i][j]);
                if (FindBlueBtn([992, 632, 215, 74]))
                {
                    RandomPress([1019, 653, 155, 31]);
                }
            }
        }
    };
    for (let i = 0; i < 3; i++)
    {
        RandomPress([197, 300 + i * 82, 146, 40]);

        for (let j = 0; j < 3; j++)
        {
            ActivateSkill(i, j);
        }

    }
    // if (skillNumber >= 5)
    // {
    //     SwipeSlowly([280, 580, 40, 10], [280, 310, 40, 10], 1);
    //     SwipeSlowly([280, 580, 40, 10], [280, 310, 40, 10], 1);
    //     for (let i = 0; i < skillNumber - 4; i++)
    //     {
    //         RandomPress([197, 300 + i * 82, 146, 40]);

    //         for (let j = 0; j < 3; j++)
    //         {
    //             ActivateSkill(i + 4, j);
    //         }

    //     }
    // }
    PageBack();
    RecycleImgList(activateImgList);
    return true;
};

const StrengthenHorseEquipment = () =>
{
    console.log("开始强化坐骑装备");
    let isStrengthened = false;
    const hasEnter = EnterMenuItemPage("horse");
    if (!hasEnter)
    {
        console.log("enter horse failed!");
        return false;
    }
    if (FindGoldBtn([869, 653, 171, 63]))
    {
        RandomPress([888, 669, 135, 31]);
        if (FindBlueBtn([870, 654, 353, 62]))
        {
            console.log("点击启用");
            RandomPress([919, 672, 272, 28]);
        }
        if (FindBlueBtn([655, 445, 199, 63]))
        {
            console.log("确认启用");
            RandomPress([683, 462, 150, 28], 3);
        }
    }
    else
    {
        console.log("未发现强化坐骑装备按钮，退出强化操作");
        return PageBack();
    }
    const horseEquipmentRegion = [
        [1033, 156, 28, 29],
        [976, 208, 32, 33],
        [1089, 213, 28, 27]
    ];
    Sleep();
    for (let i = 0; i < 3; i++)
    {
        console.log("强化第 " + (i + 1) + " 号坐骑装备");
        RandomPress(horseEquipmentRegion[i], 3);
        if (FindBlueBtn([869, 652, 354, 64]))
        {
            console.log("可以强化此装备：" + (i + 1));
            RandomPress([926, 671, 249, 26], 3);
            if (FindBlueBtn([655, 445, 199, 63]))
            {
                console.log("确认启用");
                RandomPress([683, 462, 150, 28], 3);
            }
            isStrengthened = true;
        }
    }
    console.log("强化坐骑流程结束，是否强化：" + isStrengthened);
    PageBack();
    return isStrengthened;
};

const UpgradeAbilityLevel = () =>
{
    console.log("开始升级能力等级");
    const hasEntered = EnterMenuItemPage("ability");
    if (!hasEntered)
    {
        console.log("enter failed");
        return false;
    }
    const CanUpgrade = () => FindBlueBtn([1020, 598, 199, 69]);
    const PressUpgradeDetailBtn = () => RandomPress([1011, 661, 175, 28]);
    const PressUpgradeBtn = () => RandomPress([1049, 620, 156, 27]);

    const PressPositionList = [
        [130, 166, 38, 33],
        [225, 168, 25, 28],
        [402, 166, 30, 28],
        [492, 168, 25, 28],
        [670, 167, 32, 31],
        [757, 168, 30, 26]
    ];
    for (let i = 0; i < 6; i++)
    {
        RandomPress(PressPositionList[i]);
        PressUpgradeDetailBtn();
        if (CanUpgrade())
        {
            PressUpgradeBtn();
            for (let i = 0; i < 10; i++)
            {
                if (FindBlueBtn([537, 586, 208, 77]))
                {
                    RandomPress([567, 609, 151, 31]);
                    break;
                }
                Sleep();
            }
        }
        else
        {
            if (HasPopupClose([1184, 55, 42, 39]))
            {

                RandomPress([1198, 65, 15, 19]);
            }
        }
    }
    for (let i = 0; i < 10; i++)
    {
        if (HasPopupClose([1185, 52, 44, 46]))
        {
            RandomPress([1195, 65, 19, 20]);
        }
        if (HasPageback())
        {
            PageBack();
            break;
        }
        Sleep();
    }
};
const ChangeAbility = (changeList) =>
{
    console.log("开始改变能力配置，默认配置为战斗，防御，咒术");
    const hasEnter = EnterMenuItemPage("ability");
    if (!hasEnter)
    {
        console.log("enter ability failed");
        return false;
    }
    const isNotMatchingColorList = [
        ["#f64f4e", [[3, 4, "#f75050"], [3, 11, "#f9564b"], [3, 41, "#fa5454"], [-2, 54, "#f85050"]]]
    ];
    changeList = changeList || [[0, 0, 0], [0, 1, 1], [3, 1, 2], [3, 0, 3], [2, 1, 4], [2, 0, 5]];

    const typePosArr = [
        [318, 226, 106, 31],
        [457, 227, 98, 32],
        [594, 229, 96, 27],
        [729, 227, 99, 29],
        [861, 227, 104, 29],
        [319, 281, 103, 27],
        [456, 282, 105, 28],
        [592, 284, 103, 25]
    ];
    const equipedPosArr = [
        [130, 166, 38, 33],
        [225, 168, 25, 28],
        [402, 166, 30, 28],
        [492, 168, 25, 28],
        [670, 167, 32, 31],
        [757, 168, 30, 26]
    ];
    const optionPosArr = [
        [84, 350, 85, 95],
        [222, 343, 81, 115],
        [356, 349, 85, 116],
        [353, 348, 90, 112],
        [491, 338, 84, 123],
        [631, 343, 84, 122],
        [762, 343, 83, 119],
    ];
    const TapClear = () =>
    {
        console.log("clear");
        if (FindGoldBtn([836, 459, 146, 68]))
        {
            RandomPress([854, 478, 109, 27]);
        }
    };
    const TapConfirm = () =>
    {
        console.log("tap confirm");
        if (FindBlueBtn([532, 527, 215, 71]))
        {
            RandomPress([567, 546, 156, 31]);
        }
    };
    const TapSelect = () =>
    {
        console.log("tap select");
        if (FindGoldBtn([18, 646, 139, 60]))
        {
            RandomPress([64, 658, 75, 33]);
        }
    };

    const MatchingAbility = () =>
    {
        for (let i = 0; i < changeList.length; i++)
        {
            let type = changeList[i][0];
            let optionPos = changeList[i][1];
            let equipPos = changeList[i][2];
            if (i % 2 == 0)
            {
                TapSelect();
                TapClear();
                RandomPress(typePosArr[type]);
                TapConfirm();
            }

            RandomPress(optionPosArr[optionPos]);
            RandomPress(optionPosArr[optionPos]);
            RandomPress(equipedPosArr[equipPos]);
            Sleep(4);
            TapBlankToContinue();

        }
    };
    MatchingAbility();
    let isMatchingWrong = FindMultiColors(isNotMatchingColorList, [138, 132, 594, 100]);
    if (isMatchingWrong)
    {
        console.log("配置错误，重新配置");
        MatchingAbility();
    }
    PageBack();
    if (!HasMenu())
    {
        CloseBackpack();
        CloseMenu();
        CloseBackpack();
        CloseMenu();
    }
    PullDownSkill([1060, 650]);
    PullDownSkill([1130, 650]);
    PullDownSkill([1190, 650]);
    console.log("finish change ability");
};
const UpgradeHolyRelics = () =>
{
    console.log("开始升级圣物");
    const hasEnter = EnterMenuItemPage("holyRelics");
    if (!hasEnter)
    {
        console.log("enter failed ");
        return false;
    }
    const blackColorList = [
        ["#070707", [[3, 0, "#070707"], [1, 6, "#070707"], [1, 15, "#070707"], [2, 31, "#070707"]]]
    ];
    const IsUnlocked = () => FindMultiColors(blackColorList, [1093, 644, 25, 56]);

    const holyPosition = [
        [57, 86, 194, 69],
        [49, 192, 198, 68],
        [53, 299, 205, 69],
        [48, 407, 226, 68]
    ]
    for (let j = 0; j < 4; j++)
    {
        RandomPress(holyPosition[j], 2)
        if (!IsUnlocked())
        {
            console.log("解锁此圣物栏")
            if (FindBlueBtn([948, 640, 317, 66]))
            {
                RandomPress([976, 656, 259, 33], 2);
                if (FindBlueBtn([657, 402, 197, 62]))
                {
                    RandomPress([679, 415, 156, 35], 5);
                    if (!IsUnlocked())
                    {
                        console.log("无法解锁，下一个")
                        continue;
                    }
                }
            }
        }
        for (let i = 0; i < 7; i++)
        {
            if (FindBlueBtn([1106, 644, 158, 58]))
            {
                RandomPress([1124, 658, 119, 28], 3);
                if (FindBlueBtn([656, 490, 198, 65]))
                {
                    RandomPress([691, 505, 133, 34], 5);
                    console.log("升级圣物次数：" + i)
                }
            }
            else
            {
                console.log("无法升级。下一格")
                break;
            }
            Sleep()
        }
    }
    PageBack()
    for (let i = 0; i < 10; i++)
    {
        let shot = captureScreen()
        if (HasMenu())
        {
            break;
        }
        if (FindBlueBtn([657, 493, 199, 62], shot)) //确定升级按钮
        {
            RandomPress([681, 505, 148, 33])
        }
        if (FindRedBtn([431, 491, 194, 62], shot)) //取消按钮
        {
            RandomPress([459, 504, 140, 37])
        }
        if (FindBlueBtn([656, 400, 200, 66], shot)) //解锁圣物按钮。
        {
            RandomPress([682, 414, 152, 35])
        }
        if (HasPopupClose([823, 168, 46, 40], shot))
        {
            RandomPress([835, 178, 21, 18])
        }
        PageBack()
        Sleep()
    }
    console.log("fn:强化圣物结束。")
};
const AddAttributePoint = () =>
{
    ClearPage();
    const abilityPointPlus = LoadImgList("backpack/abilityPointPlus");

    if (!FindImgInList(abilityPointPlus, [620, 467, 40, 40]))
    {
        console.log("未发现属性点加号，退出");
    }
    else
    {
        console.log("开始点击属性点");
        RandomPress([632, 479, 19, 20]);
        console.log("等到属性点窗口出现...");
        WaitUntil(() => HasPopupClose([717, 96, 57, 56]));
        for (let i = 0; i < 10; i++)
        {
            RandomPress([523, 170, 91, 22]); // dex 
            RandomPress([695, 349, 25, 21]); //max dex
            if (FindGoldBtn([564, 644, 200, 56]))
            {
                RandomPress([589, 659, 155, 26]);
                console.log("确认提升该属性");
                if (HasPopupClose([37, 107, 33, 33]))
                {
                    RandomPress([45, 112, 21, 21]);
                    console.log("__提升属性结束");
                    break;
                }
            }
            Sleep(1);
        }
    }
    RecycleImgList(abilityPointPlus);
};

const IsExchangeUnLock = () =>
{
    console.log("检查交易所是否解开");
    const hasEnterTrade = EnterMenuItemPage("trade");
    if (!hasEnterTrade)
    {
        console.log("进入交易所失败");
        return false;
    }
    Sleep();
    const config = ReadConfig();
    const lockImgList = LoadImgList("icon/lock");
    let hadUnlocked = FindImgInList(lockImgList, [402, 72, 86, 52]);
    RecycleImgList(lockImgList);
    if (!hadUnlocked)
    {
        console.log("交易所已解开");
        config.gameMode = "instance";
        config.unlockTrade = true;
        specialConfig.gameMode = "instance"
        specialConfig.initGameMode = "instance"
        RewriteConfig(config);
        GetSettlement()
    }
    else
    {
        console.log("交易所未解开");
        PageBack();
        config.gameMode = "mainStory";
        config.unlockTrade = false;
        RewriteConfig(config);
        return false;
    }
};
const JoinGuild = () =>
{
    console.log("开始加入公会流程");
    if (!EnterMenuItemPage("guild"))
    {
        if (FindBlueBtn([511, 646, 259, 67]))
        {
            console.log("已经在公会页面");
        }
        else
        {
            console.log("进入公会页面失败");
            return false;
        }
    }
    let isSuccess = false;
    const RightOnJoinGuildImg = ReadImg('icon/font/rightNow');
    const applyToJoinImgList = LoadImgList("icon/font/guild/applyToJoin");
    const FindStraightAwayBtn = () => FindImg(RightOnJoinGuildImg, [1136, 199, 54, 353]);
    const FindAndClickStraightBtn = () =>
    {
        let hasStrBtn = false;

        for (let i = 0; i < 15; i++)
        {
            hasStrBtn = FindStraightAwayBtn();
            if (!hasStrBtn)
            {
                SwipeSlowly([492, 516, 76, 27], [496, 210, 70, 25], 4);
            }
            else
            {
                console.log("发现立即加入的按钮" + hasStrBtn);
                RandomPress([1130, hasStrBtn.y, 100, 20], 3);
                PressBlank();
                break;
            }
            Sleep(0.5);
        }
    };
    FindAndClickStraightBtn();
    if (FindBlueBtn([181, 646, 166, 61]))
    {
        isSuccess = true;
        console.log("加入公会成功");
    }
    else
    {
        console.log("加入公会失败，重新加入");
        FindAndClickStraightBtn();
    }
    RandomPress([1225, 21, 38, 25]);
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        if (FindImgInList(applyToJoinImgList, [433, 443, 193, 63]))
        {
            RandomPress([459, 459, 141, 31]);
        }
        Sleep();
    }
    RightOnJoinGuildImg.recycle();
    RecycleImgList(applyToJoinImgList);
    console.log("加入公会流程结束");
    return isSuccess;
};
const GuildDonation = () =>
{
    console.log("公会捐献");

    if (!EnterMenuItemPage("guild"))
    {
        console.log("进入公会失败");
        return false;
    }
    const Donate = () =>
    {
        console.log("开始捐献");
        RandomPress([221, 666, 96, 25]); //公会捐献按钮
        WaitUntil(() => HasPopupClose([918, 80, 52, 45]));
        const donationTimesOverImgList = LoadImgList("icon/font/guild/donationTimesOver");
        for (let i = 0; i < 10; i++)
        {
            if (FindBlueBtn([363, 496, 243, 85]))
            {
                RandomPress([409, 518, 157, 38], 2); //确认捐献
                PressBlank();
                console.log("捐献成功:" + (i + 1) + "次");
            }
            else
            {
                if (FindImgInList(donationTimesOverImgList, [686, 595, 75, 57]))
                {
                    console.log("今日捐献已完成。");
                    RandomPress([932, 90, 23, 24]);

                    const config = ReadConfig();
                    config.daily.guildDonation = true;
                    RewriteConfig(config);
                    break;
                }
            }
            Sleep();
        }
        RecycleImgList(donationTimesOverImgList);
    };
    if (FindBlueBtn([182, 650, 165, 57]))
    {
        Donate();
    }
    else
    {
        console.log("没有加入公会，开始加入");
        JoinGuild();
        if (FindBlueBtn([182, 651, 164, 52]))
        {
            Donate();
        }
    }
    for (let i = 0; i < 10; i++)
    {
        PageBack();
        if (HasMenu())
        {
            console.log("公会捐献流程结束");
            break;
        }
        if (HasPopupClose([917, 76, 50, 51]))
        {
            RandomPress([934, 92, 20, 21]);
        }
        ClearPage();
        Sleep();
    }

};
const FriendshipDonation = () =>
{
    const CanDonate = () => FindBlueBtn([1063, 208, 200, 71]);
    const PressDonationBtn = () => RandomPress([1090, 227, 151, 32]);
    const PressConfirmBtn = () => RandomPress([668, 559, 136, 29]);
    console.log("今日未捐献");
    if (!EnterMenuItemPage('friendlinessLevel'))
    {
        console.log("进入友好度失败");
        return false;
    }
    let haveDonated = false;

    const stage_0 = LoadImgList("icon/font/friendshipStage/0");
    const stage_1 = LoadImgList("icon/font/friendshipStage/1");
    if (FindImgInList(stage_0, [117, 485, 44, 52]))
    {
        console.log("优先四号友好度商人");
        RandomPress([67, 465, 227, 56]); // 四号位置
        for (let i = 0; i < 2; i++)
        {
            if (CanDonate())
            {
                PressDonationBtn();
                if (WaitUntil(() => FindRedBtn([456, 541, 183, 67])))
                {
                    RandomPress([613, 408, 60, 24]); //+100
                    PressConfirmBtn();
                    haveDonated = true;
                }
            }
            if (FindImgInList(stage_1, [117, 485, 44, 52]))
            {
                console.log("一阶段友好度已捐满，退出");
                break;
            }
        }
    }
    else if (FindImgInList(stage_0, [109, 266, 60, 67]))
    {
        console.log("其次二号友好度商人");
        RandomPress([54, 244, 252, 70]); // 四号位置
        for (let i = 0; i < 2; i++)
        {
            if (CanDonate())
            {
                PressDonationBtn();
                if (WaitUntil(() => FindRedBtn([456, 541, 183, 67])))
                {
                    RandomPress([613, 408, 60, 24]); //+100
                    PressConfirmBtn();
                    haveDonated = true;
                }
            }
            if (FindImgInList(stage_1, [117, 485, 44, 52]))
            {
                console.log("一阶段友好度已捐满，退出");
                break;
            }
        }
    }

    else if (FindImgInList(stage_1, [117, 485, 44, 52]))
    {
        console.log("友好度一级都完成，捐献第三个友好度商人");
        RandomPress([57, 142, 238, 59]);
        if (CanDonate())
        {
            PressDonationBtn();
            if (WaitUntil(() => FindRedBtn([456, 541, 183, 67])))
            {
                RandomPress([708, 409, 57, 24]);
                PressConfirmBtn();
                haveDonated = true;
            }
        }
    }
    RecycleImgList(stage_0);
    RecycleImgList(stage_1);

    if (haveDonated)
    {
        const config = ReadConfig();
        config.daily.friendshipDonation = true;
        console.log("友好度捐献完成");
        RewriteConfig(config);
    }

    for (let i = 0; i < 10; i++)
    {
        PageBack();
        if (HasMenu())
        {
            console.log("友好度捐献结束");
            break;
        }
        if (FindBlueBtn([646, 546, 178, 58]))
        {
            RandomPress([804, 118, 23, 24]);
        }
        else if (FindRedBtn([459, 542, 176, 64]))
        {
            RandomPress([804, 118, 23, 24]);
        }
        ClearPage();
        Sleep();
    }
};
const FriendShipShop = () =>
{
    const hasFriendshipNPC = GoToTheNPC("friend");
    if (!hasFriendshipNPC)
    {
        return false;
    }
    const cannotPurchaseImgList = LoadImgList("icon/font/cannotPurchase");
    const PressMax = () => RandomPress([756, 407, 53, 24]);
    const PressPurchaseBtn = () => RandomPress([676, 558, 125, 28]);

    const PurchaseItem = (position) =>
    {
        let hadPurchase = false;
        RandomPress(position, random(1, 3));
        for (let i = 0; i < 10; i++)
        {
            if (FindBlueBtn([647, 543, 174, 62]))
            {
                PressMax();
                PressPurchaseBtn();
                hadPurchase = true;
                break;
            }
            else
            {
                if (FindImgInList(cannotPurchaseImgList, [643, 95, 98, 56]))
                {
                    console.log("无法购买");
                    hadPurchase = false;
                    break;
                }
            }
            Sleep(0.5);
        }
        return hadPurchase;
    };
    RandomPress([19, 286, 34, 36]);
    PurchaseItem([157, 97, 148, 34]); //黑色奥雷
    RandomPress([24, 153, 27, 30]);
    PurchaseItem([157, 97, 148, 34]); //炼金术催化剂
    PageBack();
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        if (FindRedBtn([459, 544, 175, 57]))
        {
            RandomPress([803, 118, 26, 30]);
        }
        ClearPage();
        Sleep();
    }
    const config = ReadConfig();
    config.daily.friendshipShop = true;
    RewriteConfig(config);
    console.log("友好度商人购买结束");
};
const GetCurrentDiamond = (sort) =>
{
    sort = sort || false;
    if (!OpenBackpack("gold", sort))
    {
        console.log("打开背包失败，返回0");
        return 0;
    }
    const diamond = FindNumber("backpackProperty", [1122, 242, 65, 45]);
    CloseBackpack();
    return diamond;
};
const getOriginDate = () =>
{
    const arr = new Date().toJSON().split('T');
    arr[1] = arr[1].slice(0, 8);
    return arr.join(' ')
}
const GetSettlement = () =>
{
    console.log("fn: 开始结算");
    const beforeSettleDiamond = GetCurrentDiamond(true);
    let hadSettled = false;
    if (OpenMenu())
    {
        if (!FindTipPoint([875, 182, 29, 30]))
        {
            console.log("没有可结算物品退出。");
            hadSettled = false;
        }
        else
        {
            if (!EnterMenuItemPage("trade"))
            {
                console.log("进入交易所失败");
            }
            else
            {
                RandomPress([338, 77, 73, 21]); //贩售明细
            }
            if (FindBlueBtn([1076, 644, 196, 64]))
            {
                RandomPress([1103, 661, 148, 31]);
                console.log("点击全部结算");
                hadSettled = true;
            }
            //是否有需要重新登录的
            const hasReloginItem = FindBlueBtn([912, 654, 175, 57]);
            if (hasReloginItem)
            {
                console.log("有上架过期的商品，取消上架");
                let hadRelogin;
                //取消贩售失败的商品
                for (let i = 0; i < 5; i++)
                {
                    let shot = captureScreen();
                    for (let j = 0; j < 5; j++)
                    {
                        hadRelogin = FindGoldBtn([878, 177, 190, 463], shot);
                        if (hadRelogin)
                        {
                            RandomPress([1100, hadRelogin.y, 130, 30]);
                            console.log("下架此过期商品");
                            shot = captureScreen();
                        }
                    }
                    SwipeSlowly([450, 600, 10, 10], [450, 300, 10, 10], 1);
                }
            }
            PageBack();
        }
    }

    beforeSettleDiamond = beforeSettleDiamond ? beforeSettleDiamond : 0;
    let afterSettleDiamond = beforeSettleDiamond;
    if (hadSettled)
    {
        afterSettleDiamond = GetCurrentDiamond();
        afterSettleDiamond = afterSettleDiamond ? afterSettleDiamond : 0;
    }

    console.log("结算前钻石数量：" + beforeSettleDiamond);

    console.log("结算后钻石：" + afterSettleDiamond);

    if (beforeSettleDiamond == 0 && afterSettleDiamond == 0)
    {
        ClearPage()
        if (!HasMenu())
        {
            console.log('不在游戏页面，退出')
            return false;
        }
    }

    let settlement = afterSettleDiamond - beforeSettleDiamond;

    settlement = settlement > 0 ? settlement : 0;
    console.log("此次结算钻石为：" + settlement);

    const tradeRecord = ReadTradeRecord()

    tradeRecord[getOriginDate()] = [settlement, beforeSettleDiamond, afterSettleDiamond];

    UpdateTradeRecord(tradeRecord)


    let monthlyIncome = 0;

    const thisMonth = new Date().toJSON().slice(0, 7)

    const currentMonthData = Object.keys(tradeRecord).filter(key =>
    {
        if (key.startsWith(thisMonth))
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    currentMonthData.map(key => monthlyIncome += tradeRecord[key][0]);

    monthlyIncome = monthlyIncome ? monthlyIncome : 0;

    const config = ReadConfig();

    config.game.vm = config.game.vm.replace(/\n/g, '');

    if (!config.game.serverName || config.game.serverName.toString() == "999")
    {
        console.log("server name error")
        config.game.serverName = GetServerName();
    }

    if (!config.game.lv || config.game.lv < 30)
    {
        console.log("等级信息错误");
        const lv = GetCharacterLv();
        if (lv != null)
        {
            config.game.lv = lv;
        }
        else
        {
            config.game.lv = 0;
        }
    }

    if (!config.game.combatPower)
    {
        console.log("战力识别错误");
        config.game.combatPower = 0;
    }

    let totalDiamond = 0;
    config.game.diamond = config.game.diamond ? config.game.diamond : 0
    if (afterSettleDiamond == 0)
    {
        console.log("结算后数字0，返回上次结果")
        totalDiamond = config.game.diamond;
    }
    else
    {
        totalDiamond = afterSettleDiamond;
        config.game.diamond = afterSettleDiamond;
    }
    config.game.dailyDiamond = config.game.dailyDiamond ? config.game.dailyDiamond : 0;

    config.game.monthlyIncome = monthlyIncome;
    config.game.diamond = totalDiamond;
    config.game.dailyDiamond += settlement;

    const postData = {
        vm: config.game.vm,
        serverName: config.game.serverName,
        lv: config.game.lv,
        combatPower: config.game.combatPower,
        diamond: totalDiamond,
        monthlyIncome: monthlyIncome,
        dailyDiamond: config.game.dailyDiamond,
        historyDealRecord: JSON.stringify(tradeRecord),
        config: JSON.stringify(config)
    };

    try
    {
        console.log("发送数据给后台");
        const res = http.post("http://47.76.112.107:8001/devices", postData);
        // const res = http.post("http://10.6.130.129:8001/devices", postData);
        if (res.statusCode == 200)
        {
            console.log("发送数据成功");
            config.game.tradingTimes++;
        }
    } catch (error)
    {
        console.log(error);
    }
    console.log(JSON.stringify(config))
    RewriteConfig(config);

};

const TradeGoods = () =>
{
    console.log("开始流程：物品上架");
    const hasEnter = EnterMenuItemPage("trade");
    if (!hasEnter)
    {
        console.log("进入交易所失败");
        return false;
    }
    const lockImgList = LoadImgList("icon/lock");
    const config = ReadConfig();
    if (FindImgInList(lockImgList, [401, 69, 55, 57]))
    {
        console.log("交易所暂未解开，退出");
        config.unlockTrade = false;
        specialConfig.gameMode = "instance";
        specialConfig.initGameMode = "mainStory";
        config.gameMode = "mainStory";
        RewriteConfig(config);
        RecycleImgList(lockImgList);
        PageBack();
        return false;
    }
    else
    {
        config.unlockTrade = true;
        RewriteConfig(config);
    }

    const sellText = LoadImgList("icon/font/trade/sell");
    const shelfMaxImgList = LoadImgList("icon/font/trade/shelfMax");
    const tradableImgList = LoadImgList("page/trade/tradable")
    let isShelfMax = false;
    let loginCount = 0;
    Sleep();
    //网格的横纵间隔均为66像素 格子大小为57x57

    const CloseSellPopup = () => 
    {
        if (HasPopupClose([956, 186, 50, 57]))
        {
            RandomPress([970, 203, 21, 22]);
        }
    };

    const LoginMaterial = () =>
    {
        let hasSellText;
        for (let i = 0; i < tradableImgList.length; i++)
        {
            CloseSellPopup();
            let haveTradable = FindImg(tradableImgList[i], [995, 147, 280, 288])
            if (haveTradable)
            {
                RandomPress([haveTradable.x, haveTradable.y, 30, 30]);
                hasSellText = FindImgInList(sellText, [930, 584, 80, 61]);
                if (hasSellText)
                {
                    RandomPress([915, 599, 115, 28]); //贩售按钮
                    WaitUntil(() => FindBlueBtn([549, 467, 182, 57]));

                    if (FindNumber("sellPrice", [916, 254, 50, 35]) <= 10)
                    {
                        console.log("<<< 10");
                        CloseSellPopup();
                        continue;
                    }

                    RandomPress([577, 481, 126, 29]);
                    if (WaitUntil(() => FindBlueBtn([547, 525, 186, 62])))
                    {
                        RandomPress([573, 542, 132, 27]);
                        if (FindImgInList(shelfMaxImgList, [536, 96, 188, 55]))
                        {
                            console.log("上架数量已满");
                            isShelfMax = true;
                            return false;
                        }
                        else
                        {
                            console.log("上架物品成功");
                            loginCount++;
                        }
                    }
                }
            }

        }
    };
    const LoginEquipment = () =>
    {
        let hasSellText;
        let currentColor = 'blue'
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                for (let n = 0; n < 5; n++)
                {
                    if (IsEmpty([1006 + j * 66, 164 + i * 66, 57, 57]))
                    {
                        console.log("遍历完毕，退出上架");
                        return true;
                    }
                    CloseSellPopup();
                    if (currentColor == "blue")
                    {
                        RandomPress([1016 + j * 66, 175 + i * 66, 38, 36]);
                        currentColor = getItemColor([750, 162, 142, 93])
                    }

                    if (currentColor == "blue" || random(1, 100) < 4)
                    {

                        hasSellText = FindImgInList(sellText, [930, 584, 80, 61]);
                        if (hasSellText)
                        {
                            RandomPress([915, 599, 115, 28]); //贩售按钮
                            WaitUntil(() => FindBlueBtn([549, 467, 182, 57]));

                            RandomPress([577, 481, 126, 29]);
                            if (WaitUntil(() => FindBlueBtn([547, 525, 186, 62])))
                            {
                                RandomPress([573, 542, 132, 27]);
                                if (FindImgInList(shelfMaxImgList, [536, 96, 188, 55]))
                                {
                                    console.log("上架数量已满");
                                    isShelfMax = true;
                                    return false;
                                }
                                else
                                {
                                    console.log("上架物品成功");
                                    loginCount++;
                                }
                            }
                        }
                    }
                    else 
                    {
                        console.log("鉴定失败：下一个");
                        CloseSellPopup();
                        if (HasPopupClose([1000, 111, 49, 44]))
                        {
                            RandomPress([1015, 121, 21, 25])
                        }
                        break
                    }
                }
            }
        }
    };
    //先上架材料
    RandomPress([1192, 121, 55, 27]);
    LoginMaterial();
    //然后上架武器
    if (!isShelfMax)
    {
        RandomPress([1106, 120, 51, 28]);
        LoginEquipment();
    }
    PageBack();
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        CloseSellPopup();
        if (HasPopupClose([791, 124, 41, 49]))
        {
            RandomPress([801, 134, 24, 25]);
        }
        Sleep();
    }
    console.log("上架物品数量为：" + loginCount);
    RecycleImgList(sellText);
    RecycleImgList(shelfMaxImgList);
    RecycleImgList(lockImgList);
    RecycleImgList(tradableImgList)
    return loginCount;
};
const PutOnSale = () =>
{
    console.log("开始进行物品上架");
    if (!HasMenu())
    {
        console.log("没有发现菜单按钮，退出上架")
        return false;
    }
    GetSettlement();//结算过期上架物品
    if (random(1, 100) > 50)
    {
        LoginProps();
    }
    else
    {
        console.log("鉴定失败，不图鉴装备");
    }
    if (random(1, 100) > 50)
    {
        DecomposeEquipment("partial");
    }
    else
    {
        console.log("鉴定失败，不分解装备");
    }

    TradeGoods();
    if (random(1, 100) > 99)
    {
        console.log("5%概率执行，上架后鉴定与分解装备");
        LoginProps("total");
    }
    globalTimePlay.lastTimeClearBackpack_haltMode = new Date().getTime()

    console.log("__物品上架结束");
};

const GetCommonAward = () =>
{
    GetEmail();
    if (random(1, 100) > 50)
    {
        console.log("领取奖励鉴定成功");
        GetPassAward();
        GetActivitiesAward();
        GetMonsterKnowledgeAward();
        GetTravelLogAward();
        GetAchievement();
    }
};
const DailyQuest = () =>
{
    console.log("fn:" + "每日固定操作：领取奖励与捐献购买");
    GetCommonAward();
    const config = ReadConfig();

    if (random(1, 100) > 50 && !config.daily.guildDonation)
    {
        GuildDonation();
    }
    if (random(1, 100) > 50 && !config.daily.friendshipDonation)
    {
        FriendshipDonation();
    }
    if (random(1, 100) > 50 && !config.daily.dailyShop)
    {
        ShopBuy();
        const date = new Date()
        if (date.getMonth() + 1 == 1 && date.getDate() >= 8)
        {
            console.log("活动已过期，退出");
        }
        else
        {
            ShopExchange()
        }
    }
    if (random(1, 100) > 50 && !config.daily.friendshipShop)
    {
        FriendShipShop();
    }
};
const FusionSuit = () =>
{
    console.log("fn: 合成时装");
    if (!EnterMenuItemPage("suit"))
    {
        console.log("进入时装页面失败");
        return false;
    }
    RandomPress([177, 77, 97, 24]);
    if (FindGoldBtn([849, 656, 189, 58]))
    {
        console.log("点击自动登录");
        RandomPress([873, 670, 144, 30]);
    }
    if (FindBlueBtn([540, 653, 198, 61]))
    {
        console.log("点击合成");
        RandomPress([563, 666, 151, 34], 2);
        console.log("点击跳过");
        RandomPress([1199, 663, 37, 24]);
    }
    for (let i = 0; i < 30; i++)
    {
        if (FindBlueBtn([539, 647, 204, 66]))
        {
            RandomPress([568, 664, 148, 34]);
        }
        if (HasPageback())
        {
            break;
        }
        Sleep(2);
    }
    PageBack();
    console.log("end: 合成时装结束");
};
const MakeMaterial = () =>
{
    console.log("fn: 制作材料");
    const haveEntered = EnterMenuItemPage("manufacture");
    if (!haveEntered)
    {
        console.log("进入制作页面失败，退出");
        return false;
    }
    const PressToManufacture = (region) =>
    {
        RandomPress(region);
        if (FindBlueBtn([1012, 647, 265, 60]))
        {
            RandomPress([835, 612, 48, 28]);
            RandomPress([1041, 659, 215, 33]);
            if (WaitUntil(() => HaveToTapBlank(558, 636, 160, 64)))
            {
                RandomPress([532, 515, 235, 167]);
                return true;
            }
        }
        return false;
    };
    const materialImg = LoadImgList("page/manufacture/material");
    const manufacture_material = LoadImgList("page/manufacture/manufacture_material");
    const greenBlackOle = LoadImgList("page/manufacture/greenBlackOle");

    const horseImg = LoadImgList("page/manufacture/horse");
    const horseStrengtheningMaterial = LoadImgList("page/manufacture/horseStrengtheningMaterial");
    const horseArmorImg = LoadImgList("page/manufacture/horseArmor");

    let ole = null;
    let horseArmor = null;
    for (let i = 0; i < 4; i++)
    {
        SwipeSlowly([140, 600, 5, 5], [140, 300, 5, 5], 1);
        let haveMaterial = FindImgInList(materialImg, [6, 343, 68, 312]);
        if (haveMaterial)
        {
            console.log("点击材料");
            RandomPress([haveMaterial.x, haveMaterial.y, 100, 20]);
        }
        let haveManufacture_material = FindImgInList(manufacture_material, [8, 344, 145, 304]);
        if (haveManufacture_material)
        {
            console.log("点击制作材料");
            RandomPress([haveManufacture_material.x, haveManufacture_material.y, 150, 10]);
        }
        ole = FindImgInList(greenBlackOle, [240, 204, 76, 73]);
        if (ole)
        {
            console.log("发现奥雷");
            break;
        }
        Sleep(2);
    }
    if (ole)
    {
        PressToManufacture([323, 217, 132, 49]);
        PressToManufacture([326, 377, 118, 49]);
        PressToManufacture([321, 459, 136, 42]);
    }
    for (let i = 0; i < 4; i++)
    {
        let haveHorse = FindImgInList(horseImg, [6, 108, 81, 548]);
        if (haveHorse)
        {
            console.log("点击材料");
            RandomPress([haveHorse.x, haveHorse.y, 100, 20]);
        }
        let haveHorseStrengtheningMaterial = FindImgInList(horseStrengtheningMaterial, [8, 289, 156, 352]);
        if (haveHorseStrengtheningMaterial)
        {
            console.log("点击制作材料");
            RandomPress([haveHorseStrengtheningMaterial.x, haveHorseStrengtheningMaterial.y, 150, 10]);
        }
        horseArmor = FindImgInList(horseArmorImg, [723, 233, 80, 75]);
        if (horseArmor)
        {
            console.log("find horse armor");
            break;
        }
        SwipeSlowly([140, 600, 5, 5], [140, 300, 5, 5], 1);
        Sleep(2);
    }
    if (horseArmor)
    {
        PressToManufacture([325, 218, 117, 201]);
    }
    RecycleImgList(materialImg);
    RecycleImgList(manufacture_material);
    RecycleImgList(greenBlackOle);
    RecycleImgList(horseImg);
    RecycleImgList(horseStrengtheningMaterial);
    RecycleImgList(horseArmorImg);
    PageBack();
};
const UnSealEngraving = () =>
{
    console.log("fn: 启用刻印");
    const config = ReadConfig();
    if (config.game.lv < 50 && config.game["engraving_0"])
    {
        console.log("一级刻印，已启用，退出");
        return true;
    }
    else if (config.game.lv > 50 && config.game["engraving_1"])
    {
        console.log("二级刻印已启用。退出");
        return true;
    }
    if (!EnterMenuItemPage("mark"))
    {
        console.log("打开页面失败，退出");
        return false;
    }
    const greenColorList = [
        ["#96f847", [[0, 1, "#99fe48"], [0, 2, "#96f947"]]],
        ["#97f847", [[0, 1, "#97f847"], [0, 2, "#96f847"]]],
        ["#96f847", [[0, 1, "#98fc48"], [0, 2, "#93f446"]]],
        ["#99fe49", [[0, 1, "#99fd48"], [0, 2, "#8ce943"]]],
        ["#99fd48", [[0, 1, "#99ff49"], [0, 2, "#99ff49"]]]
    ];
    const goldenColorList = [
        ["#efcd45", [[0, 1, "#efcd45"], [0, 2, "#efcd45"]]],
        ["#f1cf46", [[0, 1, "#f7d447"], [0, 2, "#f9d647"]]],
        ["#fad647", [[0, 1, "#fbd748"], [0, 2, "#fbd748"]]],
        ["#f6d447", [[0, 1, "#fcd848"], [0, 2, "#f7d447"]]],
        ["#f8d54a", [[1, 0, "#f8d54b"], [2, 0, "#f8d54b"]]],
        ["#d7ba45", [[0, 1, "#d7ba45"], [0, 2, "#d8ba46"]]]
    ];

    const arrow = LoadImgList("page/engraving/arrow");
    const exclude = LoadImgList("page/engraving/exclude");

    const engravingIndex = [
        [23, 89, 26, 32],
        [22, 155, 29, 34]
    ];

    const unseal = (index) =>
    {
        RandomPress(engravingIndex[index]);
        for (let i = 0; i < 12; i++)
        {
            let haveArrow = FindImgInList(arrow, [898, 99, 61, 532]);
            if (haveArrow)
            {
                for (let j = 0; j < 10; j++)
                {
                    let shot = captureScreen();
                    if (FindImgInList(exclude, [995, haveArrow.y - 5, 157, 50], shot))
                    {
                        console.log("排除项目");
                        if (FindBlueBtn([997, 646, 200, 61], shot))
                        {
                            console.log("切换");
                            RandomPress([1031, 662, 142, 29], 3.5);
                        }
                    }
                    else if (FindMultiColors(greenColorList, [1180, haveArrow.y - 5, 70, 50], shot, 12))
                    {
                        console.log("稀有，下一格");
                        break;
                    }
                    else if (FindMultiColors(goldenColorList, [1180, haveArrow.y - 5, 70, 50], shot, 12))
                    {
                        console.log("金色属性，下一格");
                        break;
                    }
                    else
                    {
                        if (FindBlueBtn([997, 646, 200, 61], shot))
                        {
                            console.log("切换或开放");
                            RandomPress([1031, 662, 142, 29], 3.5);
                        }
                    }
                }
                if (haveArrow.y > 580)
                {
                    console.log("最后一格，结束");
                    config.game[`engraving_${index}`] = true;
                    RewriteConfig(config);
                    break;
                }
                else
                {
                    console.log("下一格");
                    RandomPress([1005, haveArrow.y + 43, 146, 15]);
                }
            }
        }
    };
    if (config.game.lv < 50)
    {
        unseal(0);
    }
    else
    {
        unseal(0);
        unseal(1);
    }
    RecycleImgList(arrow);
    RecycleImgList(exclude);
    PageBack();
};
const needWearEquipment = () =>
{
    const config = ReadConfig();
    if (!config.equipments)
    {
        console.log("需要穿装备");
        return true;
    }
    else
    {
        const colorList = ["blue", "purple"];
        for (let key in config.equipments)
        {
            if (config.equipments[key] == null)
            {
                return true;
            }
            if (!colorList.includes(config.equipments[key][0]))
            {
                console.log("需要穿装备");
                return true;
            }
        }
        console.log("@不需要穿装备");
        return false;
    }
};
const needBuyCloak = () =>
{
    const config = ReadConfig()
    if (!config.equipments)
    {
        console.log("异常情况，退出");
        return false;
    }
    else if (config.game.diamond < 100)
    {
        console.log("钻石数量小于100,暂不购买")
        return false;
    }
    else
    {
        const cloak = config.equipments.cloak;
        if (cloak)
        {
            if (cloak[0] == 'blue')
            {
                console.log("已经购买了披风")
                return false;
            }
            else
            {
                console.log("可以购买披风")
                return true;
            }
        }
        console.log("异常，不购买披风")
        return false;
    }
}
const ComprehensiveImprovement = () =>
{
    console.log("开始综合提升");

    if ((new Date().getTime() - lastComprehensiveImproveTime) / 3600000 < 1)
    {
        console.log("提升结束: 两次提升间隔较短，暂不操作");
        return true;
    }

    const isBackpackFull = IsBackpackFull(captureScreen());
    if (isBackpackFull)
    {
        console.log("提升：背包是满的，需要先清理背包");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment("partial");
    }

    DailyQuest()

    OpenAllBox() && OpenAllBox() && OpenAllBox()

    if (!isBackpackFull)
    {
        console.log("backpack is not full");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }

    IncreaseWeaponFeatures();
    UpgradeHolyRelics();
    StrengthenHorseEquipment();
    const config = ReadConfig();
    if (config.game.lv <= 40 || config.game.lv == null)
    {
        console.log(`角色等级为${config.game.lv}，改变符文配置`);
        ChangeAbility();
    }

    UpgradeAbilityLevel();

    WearBestSuit();
    CheckSkillAutoRelease();
    AddAttributePoint();
    console.log("综合提升结束");
    IsExchangeUnLock();
    lastComprehensiveImproveTime = new Date().getTime();

    return true;
};
const ComprehensiveImprovement_Instance = () =>
{
    const config = ReadConfig();

    if (config.game.tradingTimes >= 1)
    {
        if (random(1, 100) < 50)
        {
            console.log("鉴定失败，暂不提升");
            return true;
        }
    }

    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    if (random(1, 100) < 10)
    {
        DailyQuest();
    }
    const isBackpackFull = IsBackpackFull(captureScreen());
    if (isBackpackFull)
    {
        console.log("副本提升：背包是满的，需要先清理背包");
        if (random(1, 100) > 50)
        {
            LoginProps();
        }
        DecomposeEquipment();
    }
    const date = new Date();
    const today = date.getDate();

    if ((today == config.manufacture[0] || today == config.manufacture[1]) && config.game.tradingTimes == 1)
    {
        console.log("半月制作一次");
        IncreaseWeaponFeatures();
        MakeMaterial();
        // console.log("半月，切换模式为主线。")
        ChangeGameSetting()
    }

    OpenAllBox();
    if (needBuyCloak())
    {
        WearEquipments()
        if (needBuyCloak())
        {
            BuyCloak()
            haveOpenedBox = true;
        }
    }
    if (needWearEquipment())
    {
        WearEquipments()
        StrengthenEquipment()
    }

    PutOnSale();
    console.log("副本模式下综合提升");

    //降低执行频率
    if (date.getDay() == config.randomDayOfTheWeek)
    {
        console.log("@每周随机一天执行。");
        UpgradeHolyRelics();
        StrengthenHorseEquipment();
        FusionSuit();
        WearBestSuit();
        ChangeRecoverPotionPercentToNormal()
        UpgradeAbilityLevel()
        ChangeRecoverPotionPercentToNormal();
        let isSuccess = UnAutoPotion();
        if (isSuccess)
        {
            console.log("关闭自动使用药水成功");
            config.game.autoPotion = false;
            RewriteConfig(config);
        }
    }

    AddAttributePoint();
    UnSealEngraving();

    // CheckSkillAutoRelease();
    // if (config.game.lv > 45)
    // {
    //     SwipeSlowly([610, 680, 5, 2], [610, 640, 5, 3], 1);
    //     SwipeSlowly([670, 680, 5, 2], [670, 640, 5, 3], 1);
    // }
    console.log("副本：综合提升结束");

    return true;
};

module.exports = {
    ChangeAbility, GetEmail, GetAchievement, GetMonsterKnowledgeAward, LoginProps, DailyQuest, needWearEquipment,
    ShopBuy, ComprehensiveImprovement, ComprehensiveImprovement_Instance, StrengthenHorseEquipment, IncreaseWeaponFeatures, GuildDonation,
};

