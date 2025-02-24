
const {
    specialConfig,
    ClickSkip, CloseMenu, CloseBackpack, ClearPage,
    EnterMenuItemPage, ExitHaltMode,
    FindBlueBtn, FindTipPoint, FindCheckMark, FindRedBtn, FindGoldBtn, FindGreenBtn, FindNumber, FindImgInList, FindFloatNumber, FindImg,
    GetDateTime, GoToTheNPC, GetServerName, GetCharacterLv, getOriginDate,
    HasMenu, HasPageback, HasPopupClose, HasSkip, HasMenuClose, HasTip, HaveToTapBlank,
    IsBackpackFull, IsHaltMode, IsInCity,
    FindMultiColors,
    LoadImgList,

    WaitUntilPageBack,
    SwipeSlowly, Sleep,

    PressBlank, WaitUntil,
    TapBlankToContinue, PullDownSkill, ReadConfig, RewriteConfig, PageBack,
    OpenBackpack, OpenMenu,
    ReadDealRecord, RecycleImgList, ReadDailyDiamondRecord, ReadTradeRecord, ReadImg, RandomPress, ReturnHome,
    UpdateTradeRecord,
    ChangeRecoverPotionPercentToNormal,
    ChangeGameSetting,
    GetRandom,
    updateDeviceData,
    RecognizePage,
    generateRandomArray,
    http_post,
    WaitUntilMenu,
} = require("./utils.js");

const { IsEmpty, WearEquipments, StrengthenEquipment, OpenAllBox, UseHolyGrail, DecomposeEquipment, WearBestSuit, CheckSkillAutoRelease, BuyCloak, UnAutoPotion, getItemColor, AutoPotion } = require("./Backpack.js");

let lastComprehensiveImproveTime = 1726208812345;

const GetEmail = () =>
{
    console.log("领取邮件");
    if (RecognizePage() != "email")
    {
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
    if (RecognizePage() != "achievement")
    {
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
        if (!WaitUntilPageBack())
        {
            console.log("进入成就界面失败，退出");
            return false;
        }
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
    console.log("领取怪物图鉴奖励");
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
    console.log("领取通行证奖励");
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
    else
    {
        console.log("已进入通行证页面");
    }
    if (FindBlueBtn([749, 244, 202, 72]))
    {
        RandomPress([770, 265, 158, 31], 5);
        PressBlank();
    }
    if (FindTipPoint([445, 75, 28, 27]))
    {
        RandomPress([282, 86, 172, 33])
        if (FindBlueBtn([749, 244, 202, 72]))
        {
            RandomPress([770, 265, 158, 31], 5);
            PressBlank();
        }
    }
    if (random(1, 100) > 70)
    {
        RandomPress([520, 84, 171, 33])
        if (FindBlueBtn([749, 244, 202, 72]))
        {
            RandomPress([770, 265, 158, 31], 5);
            PressBlank();
        }
    }
    PageBack();
    return false;
};

const GetActivitiesAward = () =>
{
    console.log("领取活动奖励");
    let hadPickAward = false;
    if (RecognizePage() != "activity")
    {
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
    }

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
                    pageShot = captureScreen();
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
                    pageShot = captureScreen();
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
    console.log("领取日志奖励");
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
    console.log("商城购买");
    let hadDailyShop = false;
    if (RecognizePage() != "shop")
    {
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

const IncreaseWeaponFeatures = () =>
{
    console.log("增加武器特性");
    if (!EnterMenuItemPage("weaponFeature"))
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
    if (skillNumber >= 5)
    {
        SwipeSlowly([280, 580, 40, 10], [280, 310, 40, 10], 1);
        SwipeSlowly([280, 580, 40, 10], [280, 310, 40, 10], 1);
        for (let i = 0; i < skillNumber - 4; i++)
        {
            RandomPress([197, 300 + i * 82, 146, 40]);

            for (let j = 0; j < 3; j++)
            {
                ActivateSkill(i + 4, j);
            }

        }
    }
    PageBack();
    RecycleImgList(activateImgList);
    return true;
};

const StrengthenHorseEquipment = () =>
{
    console.log("强化坐骑装备");
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
    console.log("升级能力等级");
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
        [674, 168, 35, 34],
        [766, 167, 22, 29],
        [675, 303, 31, 28],
        [766, 302, 23, 26],
        [674, 434, 33, 33],
        [761, 434, 32, 32]
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
    PageBack()
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        if (FindBlueBtn([533, 589, 213, 71]))
        {
            RandomPress([565, 607, 156, 36])
        }
        if (HasPopupClose([1185, 52, 44, 46]))
        {
            RandomPress([1195, 65, 19, 20]);
        }
        RandomPress([579, 545, 140, 76])
        Sleep();
    }
};
const ChangeAbility = (changeList) =>
{
    console.log("改变能力配置，默认配置为战斗，防御，咒术");
    const hasEnter = EnterMenuItemPage("ability");
    if (!hasEnter)
    {
        console.log("enter ability failed");
        return false;
    }
    const isNotMatchingColorList = [
        ["#f64f4e", [[3, 4, "#f75050"], [3, 11, "#f9564b"], [3, 41, "#fa5454"], [-2, 54, "#f85050"]]]
    ];
    // 第一个参数是类型，第二个参数是主技能位置，第三个是被动技能位置。
    changeList = changeList || [[0, 0, 0], [0, 1, 1], [3, 1, 2], [3, 0, 3], [2, 1, 4], [2, 0, 5]];

    const typePosArr = [//筛选能力弹窗的选项位置。
        [323, 227, 102, 29],
        [458, 228, 102, 31],
        [593, 228, 103, 29],
        [727, 227, 102, 29],

        [859, 227, 105, 28],
        [319, 282, 105, 26],
        [458, 282, 99, 26],
        [591, 280, 102, 29]
    ];
    const equipedPosArr = [ //能力图标装备栏的位置
        [674, 168, 35, 34],
        [766, 167, 22, 29],
        [675, 303, 31, 28],
        [766, 302, 23, 26],
        [674, 434, 33, 33],
        [761, 434, 32, 32]
    ];
    const optionPosArr = [
        [44, 163, 87, 101],
        [180, 166, 87, 116],
        [312, 161, 91, 115],
        [455, 158, 79, 108],

        [45, 325, 83, 108],
        [182, 327, 85, 107],
        [316, 331, 85, 108],
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
    let isMatchingWrong = FindMultiColors(isNotMatchingColorList, [703, 142, 67, 336]);
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
    console.log("完成能力配置");
};

const UpgradeHolyRelics = () =>
{
    console.log("升级圣物");
    if (!EnterMenuItemPage("holyRelics"))
    {
        console.log("进入圣物页面失败，退出 ");
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
    ]
    const randomArray = generateRandomArray(holyPosition.length)
    for (let i = 0; i < randomArray.length; i++)
    {
        RandomPress(holyPosition[randomArray[i]], 2)
        if (!IsUnlocked())
        {
            console.log("解锁此圣物栏")
            if (FindBlueBtn([948, 640, 317, 66]))
            {
                RandomPress([976, 656, 259, 33], 2);
                if (FindBlueBtn([657, 402, 197, 62]))
                {
                    RandomPress([679, 415, 156, 35], 5);
                }
            }
        }
        if (FindBlueBtn([1105, 643, 158, 59]))
        {
            console.log("点击全部强化");
            RandomPress([1125, 655, 122, 34])
            WaitUntil(() => FindBlueBtn([651, 485, 208, 77]))
            RandomPress([805, 388, 22, 19])
            RandomPress([678, 506, 156, 33], 4)
            break;
        }
        else if (FindBlueBtn([945, 644, 160, 60]))
        {
            console.log("部分强化");
            RandomPress([969, 657, 117, 31])
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
};
const AddAttributePoint = () =>
{
    console.log("配置属性点");
    ClearPage();
    const abilityPointPlus = LoadImgList("backpack/abilityPointPlus");

    if (!FindImgInList(abilityPointPlus, [620, 467, 40, 40]))
    {
        console.log("未发现属性点加号，退出");
    }
    else
    {
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
    console.log("加入公会流程");
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
    console.log("友好度捐献");
    const CanDonate = () => FindBlueBtn([1063, 208, 200, 71]);
    const PressDonationBtn = () => RandomPress([1090, 227, 151, 32]);
    const PressConfirmBtn = () => RandomPress([668, 559, 136, 29]);
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

    if (config.game.serverName.toString() == "999" || config.game.serverName.toString().includes("null") || GetRandom() > 95)
    {
        console.log("server name error")
        config.game.serverName = GetServerName();
    }

    if (!config.game.lv || config.game.lv < 30 || GetRandom() > 95)
    {
        console.log("获取最新的等级信息");
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

    const data = {
        id: config.accountInfo.id,
        vm: config.accountInfo.instance,
        serverName: config.game.serverName,
        lv: config.game.lv,
        combatPower: config.game.combatPower,
        diamond: totalDiamond,
        monthlyIncome: monthlyIncome,
        dailyDiamond: 20,
        historyDealRecord: JSON.stringify(tradeRecord),
        config: JSON.stringify(config)
    };

    const isUpdateSuccess = updateDeviceData(data)
    if (isUpdateSuccess)
    {
        config.game.tradingTimes++;
        config.daily.dailyTrading = true;
        console.log("发送数据成功。交易次数增加一次");
    }

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

    const sellText = LoadImgList("page/trade/sell");
    const shelfMaxImgList = LoadImgList("page/trade/shelfMax");
    const tradableImgList_100p = LoadImgList("page/trade/tradable_100p")
    const tradableImgList_30p = LoadImgList("page/trade/tradable_30p")
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

    const LoginMaterial = (imgList, probability) =>
    {
        let hasSellText;
        for (let i = 0; i < imgList.length; i++)
        {
            CloseSellPopup();
            let randomMaterialIndex = random(1, 100)
            if (randomMaterialIndex < probability)
            {
                let haveTradable = FindImg(imgList[i], [995, 147, 280, 288])
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
            CloseSellPopup();
        }
    };
    const LoginEquipment = () =>
    {
        let hasSellText;
        let currentColor = 'blue'
        for (let i = 0; i < 6; i++)
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
                    let randomIndex = random(1, 100)
                    if (currentColor == "blue" || randomIndex < 30)
                    {
                        RandomPress([1016 + j * 66, 175 + i * 66, 38, 36]);
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

    LoginMaterial(tradableImgList_100p, 80);
    LoginMaterial(tradableImgList_30p, 30);
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
    RecycleImgList(tradableImgList_100p)
    RecycleImgList(tradableImgList_30p)
    return loginCount;
};

const setSoldPrice = (num) =>
{
    const position = [
        [594, 510, 39, 25],

        [520, 340, 30, 30],
        [590, 340, 30, 30],
        [660, 340, 30, 30],

        [520, 400, 30, 30],
        [590, 400, 30, 30],
        [660, 400, 30, 30],

        [520, 450, 30, 30],
        [590, 450, 30, 30],
        [660, 450, 30, 30],
    ]
    let digitsArray = num.toString().split('').map(Number);
    console.log("设置的金额为：" + num);
    RandomPress([670, 511, 20, 23]) //clear
    for (let i = 0; i < digitsArray.length; i++)
    {
        RandomPress(position[digitsArray[i]])
    }

    if (FindBlueBtn([639, 547, 172, 64]))
    {
        RandomPress([665, 564, 121, 28])
    }
}

const sendOrder = (params) =>
{
    try
    {
        const res = http_post(`order/create`, params)
        console.log("发送订单返回结果: " + res.body.string());
    } catch (error)
    {
        console.log("发送订单数据错误：" + error);
    }
}

const getOrderList = () =>
{
    try
    {
        const config = ReadConfig()
        const serverName = config.game.serverName;
        const res = http_post(`order/findAll`, { serverName, state: "已上架" })

        const body = JSON.parse(res.body.string());
        if (body.code == 0)
        {
            console.log("获取订单信息成功");
            const list = body.result;
            if (list)
            {
                return list;
            }
        }
        return []

    } catch (error)
    {
        console.log(error);
        return [];
    }

}

const BuyEpicEquipment = (equipmentType) =>
{
    console.log("购买紫色装备");
    const config = ReadConfig()
    if (config.game.diamond < 200)
    {
        console.log("当前钻石不足200，退出");
        return false;
    }
    else if (config.game.diamond > 10000)
    {
        console.log("当前钻石已经累计超过10000，暂不操作，退出");
        return false;
    }

    const shopList = {
        "helmet": [
            { name: "賽勒畢斯頭盔", englishName: "SaiLeBiSiTouKui", identified: false, },
            { name: "賽拉特帽子", englishName: "SaiLaTeMaoZi", identified: false, },
            { name: "灰光破曉帽子", englishName: "HuiGuangPoXiaoMaoZi", identified: false, },
            { name: "賽拉特頭巾", englishName: "SaiLaTeTouJin", identified: false, },
            { name: "賽勒畢斯頭巾", englishName: "SaiLeBiSiTouJin", identified: false, },
        ],

        "tops": [
            { name: "賽拉特背心", englishName: "SaiLaTeBeiXin", identified: false, },
            { name: "賽拉特長袍", englishName: "SaiLaTeChangPao", identified: false, },
            { name: "灰光破曉長袍", englishName: "HuiGuangPoXiaoChangPao", identified: false, },
            { name: "灰光破曉背心", englishName: "HuiGuangPoXiaoBeiXin", identified: false, },

            { name: "賽勒畢斯背心", englishName: "SaiLeBiSiBeiXin", identified: false, },
            { name: "灰光破曉盔甲", englishName: "HuiGuangPoXiaoKuiJia", identified: false, },
            { name: "賽勒畢斯盔甲", englishName: "SaiLeBiSiKuiJia", identified: false, },
            { name: "賽拉特盔甲", englishName: "SaiLaTeKuiJia", identified: false, },

        ],

        "underClothes": [
            { name: "賽拉特皮褲", englishName: "SaiLaTePiKu", identified: false, },
            { name: "灰光破曉布褲子", englishName: "HuiGuangPoXiaoBuKuZi", identified: false, },
            { name: "賽勒畢斯布褲子", englishName: "SaiLeBiSiBuKuZi", identified: false, },

            { name: "賽拉特布褲子", englishName: "SaiLaTeBuKuZi", identified: false, },
            { name: "灰光破曉皮褲", englishName: "HuiGuangPoXiaoPiKu", identified: false, },
            { name: "賽勒畢斯皮褲", englishName: "SaiLeBiSiPiKu", identified: false, },
        ],

        "gloves": [
            { name: "灰光破曉護手", englishName: "HuiGuangPoXiaoHuShou", identified: false, },
            { name: "灰光破曉手套", englishName: "HuiGuangPoXiaoShouTao", identified: false, },
            { name: "黑色荊棘護手", englishName: "HeiSeJingJiHuShou", identified: false, },

            { name: "賽勒畢斯護手", englishName: "SaiLeBiSiHuShou", identified: false, },
            { name: "灰光破曉手甲", englishName: "HuiGuangPoXiaoShouJia", identified: false, },
            { name: "賽勒畢斯手甲", englishName: "SaiLeBiSiShouJia", identified: false, },
        ],

        "shoes": [
            { name: "賽拉特長靴", englishName: "SaiLaTeChangXue", identified: false, },
            { name: "黑色荊棘短靴", englishName: "HeiSeJingJiDuanXue", identified: false, },
            { name: "灰光破曉短靴", englishName: "HuiGuangPoXiaoDuanXue", identified: false, },

            { name: "賽勒畢斯短靴", englishName: "SaiLeBiSiDuanXue", identified: false, },
            { name: "賽拉特短靴", englishName: "SaiLaTeDuanXue", identified: false, },
        ],
    }
    if (!equipmentType)
    {
        const equipmentTypes = Object.keys(shopList)
        const randomType = random(0, equipmentTypes.length - 1)
        equipmentType = equipmentTypes[randomType]
    }
    const instancedArr = []

    if (!EnterMenuItemPage("trade"))
    {
        console.log("进入交易所失败");
        return false;
    }
    const purchaseInfo = {}

    let canPurchase = false;
    let imgList = null;

    for (let i = 0; i < 10; i++)
    {
        let itemIndex = Math.floor(random(0, shopList[equipmentType].length - 1))

        let instancedIndex = `${equipmentType}-${itemIndex}`

        if (instancedArr.includes(instancedIndex))
        {
            console.log("已经生成该装备，重新生成");
            continue;
        }
        else
        {
            instancedArr.push(instancedIndex)
        }

        let { name, englishName, identified } = shopList[equipmentType][itemIndex]
        console.log(`部位：${equipmentType}，索引：${itemIndex}，名字：${name}，英文名：${englishName}是否鉴定：${identified}`);

        if (FindGoldBtn([7, 650, 228, 58]))
        {
            RandomPress([277, 667, 206, 24])//search input
            setText(name)
            let hasKeyboardConfirm = text("确定").findOne(5000)
            if (hasKeyboardConfirm)
            {
                Sleep(random(2, 5))
                RandomPress([261, 520, 68, 12], random(3, 6))
            }
        }

        imgList = LoadImgList(`page/trade/goods/${equipmentType}/${englishName}_${identified ? 1 : 0}`)
        let hasImg = FindImgInList(imgList, [301, 202, 100, 185])
        if (hasImg)
        {
            let currentPrice = FindNumber("goodsPrice", [400, hasImg.y + 25, 100, 30])
            console.log("当前紫装价格为：" + currentPrice);
            let epicEquipmentBudget = config.game.epicEquipmentBudget;
            if (!epicEquipmentBudget)
            {
                epicEquipmentBudget = 150;
            }
            console.log(`紫色装备限价为：${epicEquipmentBudget}钻`);
            if (currentPrice <= epicEquipmentBudget && currentPrice > 30)
            {
                console.log("可以购买此紫装");
                RandomPress([425, hasImg.y, 465, 50])
                canPurchase = true;
                purchaseInfo.equipmentType = equipmentType;
                purchaseInfo.equipmentName = name;
                purchaseInfo.englishName = englishName;
                purchaseInfo.identified = identified;
                purchaseInfo.purchasePrice = currentPrice;
                break;
            }
            else
            {
                console.log("价格过高，随机下一次");
            }
        }
    }

    if (canPurchase)
    {
        console.log("开始购买流程");
        if (WaitUntil(() => FindImgInList(imgList, [299, 203, 84, 82])))
        {
            let purchasePrice = FindNumber("goodsPrice", [874, 204, 66, 57])
            if (purchasePrice == purchaseInfo.purchasePrice)
            {
                RandomPress([415, 227, 504, 42])
                if (WaitUntil(() => FindBlueBtn([709, 594, 187, 62])))
                {
                    RandomPress([740, 609, 128, 31])
                    if (WaitUntil(() => FindBlueBtn([544, 403, 195, 65])))
                    {
                        RandomPress([577, 422, 131, 27])
                        console.log("购买成功");
                        // purchaseInfo.buyingTime = new Date()
                    }
                }
            }
        }
    }

    RecycleImgList(imgList)
    return purchaseInfo;
}

const SellEpicEquipment = (purchaseInfo) =>
{
    console.log("上架紫色时装");
    OpenBackpack("all", true)

    if (!EnterMenuItemPage("trade"))
    {
        return false;
    }
    const config = ReadConfig()
    const imgList = LoadImgList(`page/trade/goods/${purchaseInfo.equipmentType}/${purchaseInfo.englishName}_${purchaseInfo.identified ? 1 : 0}`)
    const sellImg = LoadImgList("page/trade/sell")

    let haveEquipment = FindImgInList(imgList, [994, 155, 275, 141])
    if (haveEquipment)
    {
        console.log("发现刚刚购买的紫色装备 " + haveEquipment);
        RandomPress([haveEquipment.x, haveEquipment.y, 20, 20])
        if (FindImgInList(sellImg, [927, 587, 83, 52]))
        {
            RandomPress([919, 601, 109, 23])
            console.log("点击贩售");
            if (HasPopupClose([961, 189, 43, 51]))
            {
                const soldPrice = Math.floor(random(450, 500))
                purchaseInfo.soldPrice = soldPrice;
                RandomPress([852, 263, 105, 17])
                setSoldPrice(soldPrice)
                if (WaitUntil(() => FindBlueBtn([544, 463, 193, 68])))
                {
                    RandomPress([573, 481, 138, 28])
                    console.log("点击登录贩售");
                }
                if (WaitUntil(() => FindBlueBtn([546, 522, 190, 68])))
                {
                    RandomPress([573, 541, 138, 29])
                    console.log("上架紫色装备成功,发送数据给后台");
                    console.log("purchaseInfo: " + JSON.stringify(purchaseInfo));

                    const params = {
                        id: `${config.accountInfo.id}-${new Date().getTime()}`,
                        recipient: config.accountInfo.id,
                        serverName: config.game.serverName,
                        equipmentType: purchaseInfo.equipmentType,
                        equipmentName: purchaseInfo.equipmentName,
                        englishName: purchaseInfo.englishName,
                        identified: purchaseInfo.identified,
                        purchasePrice: purchaseInfo.purchasePrice,
                        soldPrice: purchaseInfo.soldPrice,
                        state: "已上架"
                    }
                    console.log("发送订单的参数为：" + JSON.stringify(params));
                    sendOrder(params)
                }
            }
        }
    }
    RecycleImgList(imgList)
    RecycleImgList(sellImg)
    PageBack()
}
const ReceiveDiamond = () =>
{
    console.log("收取钻石,检查是否有上架失败的紫装");

    const purchaseInfo = BuyEpicEquipment()
    if (purchaseInfo.purchasePrice)
    {
        SellEpicEquipment(purchaseInfo)
    }
}

const updateOrderInfo = (params) =>
{
    try
    {
        console.log("更新订单信息" + JSON.stringify(params));
        const res = http_post(`order/create`, params)
        console.log("发送订单返回结果: " + res.body.string());
    } catch (error)
    {
        console.log("更新订单错误：" + error);
    }
}

const ReleaseDiamond = () =>
{
    console.log("出钻石");
    const config = ReadConfig()
    if (config.diamond < 600)
    {
        console.log("当前钻石小于600钻，暂不出钻");
        return false;
    }
    if (!EnterMenuItemPage("trade"))
    {
        console.log("进入交易所页面失败，退出");
        return false;
    }
    const orderList = getOrderList()
    const baseImgUrl = "page/trade/goods/"
    out: for (let i = 0; i < orderList.length; i++)
    {
        if (FindGoldBtn([8, 647, 226, 63]))
        {
            RandomPress([281, 669, 216, 20])
            let { equipmentName, englishName, equipmentType, identified, soldPrice } = orderList[i]
            setText(equipmentName);
            Sleep(random(2, 5))
            RandomPress([257, 518, 81, 16], random(2, 5))
            let imgList = LoadImgList(`${baseImgUrl}/${equipmentType}/${englishName}_${identified ? 1 : 0}`)
            let haveFoundImg = FindImgInList(imgList, [294, 194, 101, 202])
            if (!haveFoundImg)
            {
                console.log("未发现需要购买的装备，not find the img");
                return false;
            }

            console.log("发现需要购买的装备: " + haveFoundImg);
            RandomPress([420, haveFoundImg.y, 470, 50], random(2, 5))

            if (!WaitUntil(() => FindImgInList(imgList, [300, 200, 82, 193])))
            {
                console.log("未发现上架详情，退出");
                return false;
            }

            RandomPress([857, 166, 61, 17])
            console.log("发现装备上架详情物品列，点击价格从高到低排序");
            let haveTheItem = false;

            for (let j = 0; j < 4; j++)
            {
                haveTheItem = FindImgInList(imgList, [298, 196 + j * 99, 90, 99])
                if (haveTheItem)
                {
                    let currentPrice = FindNumber("goodsPrice", [715, 197 + j * 100, 74, 71])
                    if (currentPrice == soldPrice)
                    {
                        console.log("发现需要购买的装备和价格，当前物品价格为：" + currentPrice);
                        RandomPress([390, 212 + j * 99, 553, 68])
                        if (!WaitUntil(() => FindBlueBtn([704, 591, 197, 70])))
                        {
                            console.log("未发现购买按钮，退出");
                            return false;
                        }
                        console.log("点击购买按钮");
                        RandomPress([735, 610, 139, 28])
                        if (WaitUntil(() => FindBlueBtn([549, 404, 186, 63])))
                        {
                            console.log("发现确定购买弹窗");
                            let finalConfirmPrice = FindNumber("goodsPrice", [688, 347, 65, 47])
                            if (finalConfirmPrice == soldPrice)
                            {
                                console.log("点击确定购买");
                                RandomPress([573, 421, 137, 28])
                                const updatedParams = orderList[i]
                                updatedParams.sender = config.accountInfo.id
                                updatedParams.state = "已完成"
                                updateOrderInfo(updatedParams)
                                break out;
                            }
                        }

                    }
                }
            }
        }
    }
}

const PutOnSale = () =>
{
    console.log("开始进行物品上架");
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            break;
        }
        ClearPage()
    }
    if (!HasMenu())
    {
        console.log("没有发现菜单按钮，退出上架")
        return false;
    }
    GetSettlement();//结算过期上架物品

    const config = ReadConfig()
    if (config.game.RoR)
    {
        if (config.game.RoR == "receive")
        {
            console.log("配置为收取钻石的大号，开始执行收钻流程");
            ReceiveDiamond()
        }
        else if (config.game.RoR == "release")
        {
            console.log("配置为小号出钻石，开始执行出钻流程");
            ReleaseDiamond()
        }
    }

    else
    {
        console.log("鉴定失败，不图鉴装备");
    }
    if (GetRandom() > 90)
    {
        console.log("鉴定成功，分解装备");
        DecomposeEquipment("partial");
    }
    else
    {
        console.log("鉴定失败，不分解装备");
    }

    TradeGoods();

    console.log("__物品上架结束");
};

const GetCommonAward = () =>
{
    GetActivitiesAward();
    GetEmail();
    const commonAwardQuest = [GetPassAward, GetAchievement, GetMonsterKnowledgeAward, GetTravelLogAward,]
    for (let i = 0; i < commonAwardQuest.length; i++)
    {
        let rand = random(1, 100)
        if (rand > 50)
        {
            console.log("领取奖励鉴定成功");
            commonAwardQuest[i]()
        }
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

const needBuyCloak = () =>
{
    console.log("判断是否需要购买蓝色披风");
    const config = ReadConfig()
    if (config.game.diamond < 100)
    {
        console.log("钻石数量小于100,暂不购买")
        return false;
    }

    const cloak = config.equipments.cloak;
    if (cloak)
    {
        if (cloak == 'blue')
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
const needBuyPurpleEquipment = () =>
{
    console.log("判断是否需要购买紫色装备");
    const config = ReadConfig()
    if (config.game.diamond < 150)
    {
        console.log("钻石数量小于100,暂不购买")
        return false;
    }

    const equipments = config.equipments;
    const needBuyItemArr = []
    const purpleEquipments = ["helmet", "tops", "underClothes", "gloves", "shoes"]
    for (let key in equipments)
    {
        if (purpleEquipments.includes(key))
        {
            if (equipments[key] != "purple")
            {
                needBuyItemArr.push(key)
            }
        }

    }
    if (needBuyItemArr.length == 0)
    {
        console.log("不需要购买紫色装备，退出");
        return false;
    }
    const randomIndex = Math.floor(random(0, needBuyItemArr.length - 1))
    const randomItem = needBuyItemArr[randomIndex]
    console.log("随机购买的紫色装备类型是：" + randomItem);
    return randomItem;
}

const needBuyOrnament = () =>
{
    console.log("判断是否需要购买蓝色饰品");
    const config = ReadConfig()
    if (config.game.diamond < 150)
    {
        console.log("钻石数量小于100,暂不购买")
        return false;
    }

    const equipments = config.equipments;
    const needBuyItemArr = []
    for (let key in equipments)
    {
        if (equipments[key] != "blue")
        {
            console.log(key);
            needBuyItemArr.push(key)
        }
    }
    if (needBuyItemArr.length == 0)
    {
        console.log("不需要购买蓝色饰品，退出");
        return false;
    }
    const randomIndex = Math.floor(random(0, needBuyItemArr.length - 1))
    const randomItem = needBuyItemArr[randomIndex]
    console.log("随机购买的蓝色饰品是：" + randomItem);
    return randomItem;

}

const BuyBlueOrnament = (equipmentType) =>
{
    console.log("购买蓝色饰品");
    const config = ReadConfig()
    if (config.game.diamond < 200)
    {
        console.log("当前钻石不足200，退出");
        return false;
    }
    else if (config.game.diamond > 10000)
    {
        console.log("当前钻石已经累计超过10000，暂不操作，退出");
        return false;
    }
    if (!EnterMenuItemPage("trade"))
    {
        console.log("进入交易所失败");
        return false;
    }

    const shopList = {
        "necklace": [
            { name: "墮落信念項鍊", englishName: "DuoLuoXinNianXiangLian", identified: true, },
            { name: "藍色月光項鍊", englishName: "LanSeYueLiangXiangLian", identified: true, },
            { name: "深邃虛空項鍊", englishName: "ShenSuiXuKongXiangLian", identified: true, },
            { name: "束縛者項鍊", englishName: "ShuFuZheXiangLian", identified: true, },
        ],
        "earring": [
            { name: "墮落信念耳環", englishName: "DuoLuoXinNianErHuan", identified: true, },
            { name: "藍色月光耳環", englishName: "LanSeYueLiangErHuan", identified: true, },
            { name: "深邃虛空耳環", englishName: "ShenSuiXuKongErHuan", identified: true, },
            { name: "束縛者耳環", englishName: "ShuFuZheErHuan", identified: true, },
        ],
        "bracelet": [
            { name: "墮落信念手鐲", englishName: "DuoLuoXinNianShouZhuo", identified: true, },
            { name: "藍色月光手鐲", englishName: "LanSeYueLiangShouZhuo", identified: true, },
            { name: "深邃虛空手鐲", englishName: "ShenSuiXuKongShouZhuo", identified: true, },
            { name: "束縛者手鐲", englishName: "ShuFuZheShouZhuo", identified: true, },
        ],

        "ring": [
            { name: "墮落信念戒指", englishName: "DuoLuoXinNianJieZhi", identified: true, },
            { name: "藍色月光戒指", englishName: "LanSeYueLiangJieZhi", identified: true, },
            { name: "深邃虛空戒指", englishName: "ShenSuiXuKongJieZhi", identified: true, },
            { name: "束縛者戒指", englishName: "ShuFuZheJieZhi", identified: true, },
        ],

        "belt": [
            { name: "墮落信念腰帶", englishName: "DuoLuoXinNianYaoDai", identified: true, },
            { name: "藍色月光腰帶", englishName: "LanSeYueLiangYaoDai", identified: true, },
            { name: "深邃虛空腰帶", englishName: "ShenSuiXuKongYaoDai", identified: true, },
            { name: "束縛者腰帶", englishName: "ShuFuZheYaoDai", identified: true, },
        ],
    }

    const instancedArr = []

    const purchaseInfo = {}

    let canPurchase = false;
    let imgList = null;

    for (let i = 0; i < 10; i++)
    {
        let itemIndex = Math.floor(random(0, shopList[equipmentType].length - 1))

        let instancedIndex = `${equipmentType}-${itemIndex}`

        if (instancedArr.includes(instancedIndex))
        {
            console.log("已经生成该装备，重新生成");
            continue;
        }
        else
        {
            instancedArr.push(instancedIndex)
        }

        let { name, englishName, identified } = shopList[equipmentType][itemIndex]
        console.log(`部位：${equipmentType}，索引：${itemIndex}，名字：${name}，英文名：${englishName}是否鉴定：${identified}`);

        if (FindGoldBtn([7, 650, 228, 58]))
        {
            RandomPress([277, 667, 206, 24])//search input
            setText(name)
            let hasKeyboardConfirm = text("确定").findOne(5000)
            if (hasKeyboardConfirm)
            {
                Sleep(random(2, 5))
                RandomPress([261, 520, 68, 12], random(3, 6))
            }
        }

        imgList = LoadImgList(`page/trade/goods/${equipmentType}/${englishName}_${identified ? 1 : 0}`)
        let hasImg = FindImgInList(imgList, [290, 187, 112, 123])
        if (hasImg)
        {
            let currentPrice = FindNumber("goodsPrice", [400, hasImg.y + 25, 100, 30])
            console.log("当前饰品价格为：" + currentPrice);
            let ornamentBudget = config.game.ornamentBudget;
            if (!ornamentBudget)
            {
                ornamentBudget = 80;
            }
            console.log(`蓝色饰品限价为：${ornamentBudget}钻`);
            if (currentPrice <= ornamentBudget && currentPrice > 10)
            {
                console.log("可以购买此饰品");
                RandomPress([425, hasImg.y, 465, 50])
                canPurchase = true;
                purchaseInfo.equipmentType = equipmentType;
                purchaseInfo.equipmentName = name;
                purchaseInfo.englishName = englishName;
                purchaseInfo.identified = identified;
                purchaseInfo.purchasePrice = currentPrice;
                break;
            }
            else
            {
                console.log("价格不在区间，随机下一次");
            }
        }
        else
        {
            console.log("未发现商品");
        }
    }

    if (canPurchase)
    {
        console.log("开始购买流程");
        if (WaitUntil(() => FindImgInList(imgList, [299, 203, 84, 82])))
        {
            let purchasePrice = FindNumber("goodsPrice", [874, 204, 66, 57])
            if (purchasePrice == purchaseInfo.purchasePrice)
            {
                RandomPress([415, 227, 504, 42])
                if (WaitUntil(() => FindBlueBtn([709, 594, 187, 62])))
                {
                    RandomPress([740, 609, 128, 31])
                    if (WaitUntil(() => FindBlueBtn([544, 403, 195, 65])))
                    {
                        RandomPress([577, 422, 131, 27])
                        console.log("购买成功");
                        // purchaseInfo.buyingTime = new Date()
                    }
                }
            }
        }
    }

    RecycleImgList(imgList)
    return purchaseInfo;
}
const needBuyEquipment = () =>
{
    let needCloak = needBuyCloak()
    let needOrnament = needBuyOrnament()
    let needPurpleEquipment = needBuyPurpleEquipment()
    let isBuySuccess = false;
    if (needCloak || needOrnament || needPurpleEquipment)
    {
        WearEquipments()
        needCloak = needBuyCloak()
        needOrnament = needBuyOrnament()
        needPurpleEquipment = needBuyPurpleEquipment()
    }
    if (needCloak)
    {
        isBuySuccess = BuyCloak()
    }
    else if (needOrnament)
    {
        isBuySuccess = BuyBlueOrnament(needOrnament)
    }
    else if (needPurpleEquipment)
    {
        isBuySuccess = BuyEpicEquipment(needPurpleEquipment)
    }
    else
    {
        console.log("不需要购买装备");
    }
    if (isBuySuccess)
    {
        WearEquipments()
        StrengthenEquipment()
    }
}

const addPropsToQuickItem = () =>
{
    console.log("点击添加物品到快捷栏");
    if (!OpenBackpack("auto"))
    {
        console.log("打开背包失败，退出");
        return false;
    }
    const randomNumber = random(1, 3);
    const itemPosList = []
    const selectedPosList = []
    const quickItemPosList = [[719, 653, 33, 30], [783, 652, 31, 35], [843, 651, 33, 34]]

    const shot = captureScreen()
    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (IsEmpty([935 + j * 62, 160 + i * 62, 60, 60], shot))
            {
                break;
            }
            itemPosList.push([950 + j * 62, 175 + i * 62, 30, 30])
        }
    }
    for (let i = 0; i < 100; i++)
    {
        let randomIndex = Math.floor(random(0, itemPosList.length - 1))
        if (selectedPosList.includes(itemPosList[randomIndex]))
        {
            continue
        }
        selectedPosList.push(itemPosList[randomIndex])

        if (selectedPosList.length >= randomNumber)
        {
            break;
        }
    }
    for (let i = 0; i < selectedPosList.length; i++)
    {
        RandomPress(selectedPosList[i])
        RandomPress(quickItemPosList[i])
        if (GetRandom() > 50)
        {
            PullDownSkill([735 + i * 62, 650])
            RandomPress(quickItemPosList[i])
        }
    }
    const config = ReadConfig()
    config.game.setQuickItem = true
    RewriteConfig(config)
}
const shopExchange = () =>
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
        Sleep(5)
        RandomPress([198, 77, 59, 24]) //exchange page
        const randomExchangeNumber = random(1, 5)
        for (let i = 0; i < randomExchangeNumber; i++)
        {
            if (GetRandom() > 60)
            {
                SwipeSlowly([1100, 330, 20, 50], [440, 330, 20, 50], 1)
            }
            RandomPress([305, 142, 811, 504]) //第一页区域
            if (WaitUntil(() => FindRedBtn([379, 535, 255, 73]), 1000, 10))
            {
                if (FindBlueBtn([649, 535, 249, 71]))
                {
                    RandomPress([687, 555, 182, 33])
                    console.log("点击确认购买");
                }
            }
            if (FindBlueBtn([539, 438, 202, 73]))
            {
                console.log("发现然后再试的确认弹窗，点击确认");
                RandomPress([570, 459, 147, 34])
                break;
            }
            if (FindBlueBtn([649, 535, 249, 71]))
            {
                RandomPress([687, 555, 182, 33])
                console.log("点击确认购买");
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
const CheckNotification = () =>
{
    console.log("查看通知");
    if (!HasMenu())
    {
        return false;
    }
    if (!HasPopupClose([1150, 84, 43, 57]))
    {
        RandomPress([1212, 89, 24, 19])
        WaitUntil(() => HasPopupClose([1147, 90, 48, 45]))
    }

    const notificationList = []
    for (let i = 0; i < 4; i++)
    {
        let hasNotice = HasPopupClose([1120, 148 + i * 77, 68, 66])
        if (hasNotice)
        {
            notificationList.push(hasNotice)
            console.log("添加通知事件到队列");
        }
    }
    if (notificationList.length > 0)
    {
        const randomIndex = Math.floor(random(0, notificationList.length - 1))
        const { y } = notificationList[randomIndex]
        RandomPress([899, y, 224, 30], random(3, 6))
    }
    else
    {
        console.log("没有通知，退出");
        if (HasPopupClose([1141, 85, 57, 52]))
        {
            RandomPress([1161, 99, 26, 28])
            return;
        }
    }
    for (let i = 0; i < 5; i++)
    {
        if (HasPageback() || HasPopupClose([1142, 59, 40, 46]))
        {
            break;
        }
        ClickSkip()
        RandomPress([130, 459, 168, 163])
        console.log("查看通知，随机点击空白");
    }
    const pageName = RecognizePage()
    if (pageName == "activity")
    {
        GetActivitiesAward()
    }
    else if (pageName == "achievement")
    {
        GetAchievement()
    }
    else if (pageName == "email")
    {
        GetEmail()
    }
    else if (pageName == "trade")
    {
        GetSettlement()
    }
    else if (pageName == "guild")
    {
        GuildDonation()
    }
    else if (pageName == "shop")
    {
        ShopBuy()
    }
    else if (pageName == "holyRelics")
    {
        UpgradeHolyRelics()
    }
    else if (pageName == "friendlinessLevel")
    {
        FriendshipDonation()
    }

}
const GoTrialOfTower = () =>
{
    console.log("挑战考验之塔");
    if (!EnterMenuItemPage("trialOfTower"))
    {
        console.log("进入考验之塔失败，退出");
        return false;
    }
    if (GetRandom() > 96)
    {
        console.log("查看全部奖励并退出");
        RandomPress([48, 664, 121, 29])
        const swipeTimes = random(1, 3)
        for (let i = 0; i < swipeTimes; i++)
        {
            SwipeSlowly([580, 280, 10, 10], [580, 520, 10, 10], 2)
        }
        RandomPress([922, 133, 32, 31])
        PageBack()
        return;
    }
    if (FindBlueBtn([950, 639, 327, 71]))
    {
        console.log("点击入场");
        RandomPress([982, 657, 267, 38])
        console.log("等待进入试炼场");
        if (!WaitUntilMenu())
        {
            return;
        }
        console.log("进入试炼场成功");
    }
    const leaveImgList = LoadImgList("page/trialOfTower/leave")
    const nextLevelImgList = LoadImgList("page/trialOfTower/nextLevel")
    const bossFlagIcon = LoadImgList("icon/bossFlagIcon")
    let shot = captureScreen()
    let lastTimeOfUsingSkill = 1726208812345
    for (let i = 0; i < 450; i++)
    {
        shot = captureScreen()
        if (FindImgInList(nextLevelImgList, [635, 281, 155, 68], shot))
        {
            console.log("进入下一层");
            if (GetRandom() > 10)
            {
                RandomPress([659, 301, 113, 29])
            }
            else
            {
                console.log("随机到离开");
                if (GetRandom() > 80)
                {
                    RandomPress([516, 301, 112, 25])
                    console.log("点击离开");
                }
                else
                {
                    console.log("等待自动离开");
                    Sleep(33)
                }
                break;
            }
        }
        else if (FindImgInList(leaveImgList, [512, 284, 107, 62], shot))
        {
            console.log("挑战失败");
            if (GetRandom() > 70)
            {
                console.log("重新挑战");
                RandomPress([659, 301, 113, 29])
            }
            else if (GetRandom() > 40)
            {
                console.log("点击离开");
                RandomPress([516, 301, 112, 25])
            }
            else
            {
                console.log("等待自动离开");
                Sleep(33)
            }
            break;
        }
        if (FindImgInList(bossFlagIcon, [457, 38, 77, 75], shot))
        {
            console.log("正在攻击长剑守护者，点击雷达查看是否有红色蜗牛");
            Sleep(5)
            if ((new Date().getTime() - lastTimeOfUsingSkill) / 3600000 > 40)
            {
                console.log("点击无敌技能");
                RandomPress([1021, 507, 28, 30])
                lastTimeOfUsingSkill = new Date().getTime()
            }
        }
        Sleep(1)
    }
    RecycleImgList(leaveImgList)
    RecycleImgList(nextLevelImgList)
    RecycleImgList(bossFlagIcon)
    console.log("考验之塔结束");
}
const ChangeWeaponFeature = () =>
{
    console.log("修改武器特性");
    const resetNumber = random(0, 3)
    console.log("随机重置特性个数为：" + resetNumber);
    if (resetNumber == 0)
    {
        return;
    }
    if (!EnterMenuItemPage("weaponFeature"))
    {
        return false;
    }


    const skillPos = [
        [200, 301, 144, 50],
        [195, 391, 153, 47],
        [192, 476, 153, 52],
        [193, 563, 159, 46]
    ]
    const pointsList = [
        //第一个技能
        [
            [
                [524, 283, 27, 23],
                [420, 385, 26, 26],
                [421, 492, 22, 22]
            ],
            [
                [629, 282, 25, 25],
                [629, 386, 27, 24],
                [628, 490, 26, 24]
            ],
            [
                [734, 283, 24, 24],
                [839, 384, 24, 29],
                [838, 490, 25, 26]
            ]
        ],
        //第二个技能
        [
            [
                [526, 283, 22, 23],
                [418, 386, 29, 25],
                [421, 492, 24, 22]
            ],
            [
                [525, 281, 24, 25],
                [522, 386, 29, 25],
                [525, 492, 25, 20]
            ],
            [
                [734, 284, 25, 25],
                [840, 387, 23, 25],
                [780, 439, 221, 82]
            ]
        ],
        //第三个技能
        [
            [
                [526, 283, 21, 22],
                [522, 386, 27, 23],
                [526, 492, 21, 21]
            ],
            [
                [735, 283, 25, 22],
                [734, 386, 25, 24],
                [732, 492, 27, 21]
            ],
        ],
        //第四个技能。
        [
            [
                [524, 282, 24, 25],
                [418, 384, 28, 27],
                [420, 491, 25, 23]
            ],
            [
                [629, 283, 25, 25],
                [629, 386, 26, 25],
                [629, 491, 25, 23]
            ],
            [
                [734, 285, 23, 20],
                [839, 386, 25, 25],
                [839, 492, 24, 22],
            ],
        ]
    ]

    const openWeaponSkill = (skill) =>
    {
        if (FindBlueBtn([534, 641, 209, 69]))
        {
            RandomPress([563, 657, 152, 35])
        }
        if (FindBlueBtn([654, 442, 203, 68]))
        {
            RandomPress([679, 458, 157, 35])
        }
        RandomPress([628, 177, 26, 25])
        if (FindBlueBtn([994, 635, 208, 70]))
        {
            RandomPress([1021, 651, 158, 38], 2)
        }

        const randomFeature = random(0, 2)
        console.log("随机的分支为：" + randomFeature);
        for (let i = 0; i < skill[randomFeature].length; i++)
        {
            RandomPress(skill[randomFeature][i])
            if (FindBlueBtn([994, 635, 208, 70]))
            {
                RandomPress([1021, 651, 158, 38], 2)
            }
        }
    }

    for (let i = 0; i < resetNumber; i++)
    {
        RandomPress(skillPos[i])
        openWeaponSkill(pointsList[i])
    }
    PageBack()
    for (let i = 0; i < 10; i++)
    {
        if (HasPopupClose([818, 206, 50, 55]))
        {
            RandomPress([836, 220, 23, 23])
        }
        if (HasMenu())
        {
            break;
        }
        Sleep()
    }
    console.log("修改武器特性结束");
}
const FireRandomEvent = () =>
{
    console.log("触发随机事件")
    const eventList = [
        { event: AutoPotion, probability: 2 },

        { event: ChangeRecoverPotionPercentToNormal, probability: 2 },
        { event: ChangeGameSetting, probability: 2 },
        { event: CheckSkillAutoRelease, probability: 2 },

        { event: DecomposeEquipment, probability: 12 },

        { event: FriendShipShop, probability: 2 },
        { event: FriendshipDonation, probability: 2 },
        { event: FusionSuit, probability: 2 },

        { event: GetAchievement, probability: 2 },
        { event: GetActivitiesAward, probability: 11 },
        { event: GetEmail, probability: 11 },
        { event: GetMonsterKnowledgeAward, probability: 2 },
        { event: GetPassAward, probability: 2 },
        { event: GetTravelLogAward, probability: 2 },
        { event: GuildDonation, probability: 2 },

        { event: IncreaseWeaponFeatures, probability: 2 },

        { event: LoginProps, probability: 2 },

        { event: MakeMaterial, probability: 2 },

        { event: OpenAllBox, probability: 2 },

        { event: addPropsToQuickItem, probability: 2 },
        // { event: shopExchange, probability: 2 },

        { event: ShopBuy, probability: 2 },
        { event: StrengthenHorseEquipment, probability: 2 },

        { event: WearEquipments, probability: 2 },
        { event: WearBestSuit, probability: 2 },

        { event: UpgradeHolyRelics, probability: 2 },
        { event: UpgradeAbilityLevel, probability: 2 },
        { event: UnSealEngraving, probability: 2 },

        { event: CheckNotification, probability: 12 },
        { event: needBuyEquipment, probability: 2 },
        { event: ChangeWeaponFeature, probability: 2 },
    ]

    const eventNumber = random(0, 8);
    const eventQueue = []

    const getProbability = () =>
    {
        let probabilityPool = Array.from({ length: 100 }, (_, index) => index);
        for (let i = 0; i < eventList.length; i++)
        {
            let arr = []
            for (let j = 0; j < eventList[i]["probability"]; j++)
            {
                if (probabilityPool.length == 0)
                {
                    break;
                }
                arr.push(probabilityPool[j])
            }
            eventList[i]["probabilityArea"] = arr;
            probabilityPool.splice(0, eventList[i]["probability"])
        }
    }
    const instanceEventQueue = () =>
    {
        for (let i = 0; i < eventNumber; i++)
        {
            let index = random(0, 99)
            for (let j = 0; j < eventList.length; j++)
            {
                if (eventList[j]["probabilityArea"].includes(index))
                {
                    eventQueue.push(eventList[j]["event"])
                }
            }
        }
    }
    getProbability()
    instanceEventQueue()
    eventQueue.map(fn => fn())
}

const ComprehensiveImprovement = () =>
{
    console.log("开始主线阶段的综合提升");

    if ((new Date().getTime() - lastComprehensiveImproveTime) / 60000 < 20)
    {
        console.log("暂不操作: 两次提升间隔较短，");
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
    if (random(1, 100) > 50)
    {
        UpgradeHolyRelics();
    }
    if (random(1, 100) > 50)
    {
        StrengthenHorseEquipment();
    }
    const config = ReadConfig();
    if (config.game.lv <= 40 || config.game.lv == null)
    {
        if (random(1, 100) > 60)
        {
            console.log(`角色等级为${config.game.lv}，改变符文配置`);
            ChangeAbility();
        }

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
    let config = ReadConfig();

    if (config.daily.dailyTrading && config.game.tradingTimes >= config.daily.dailyTradingTimes)
    {
        console.log("今日已达交易次数，暂不交易");
        Sleep(61)
        return true;
    }

    if (IsHaltMode())
    {
        ExitHaltMode();
    }

    const isBackpackFull = IsBackpackFull(captureScreen());
    if (isBackpackFull)
    {
        console.log("副本提升：背包是满的，需要先清理背包");
        if (GetRandom() > 70)
        {
            LoginProps();
        }
        DecomposeEquipment();
    }

    if (GetRandom() > 70)
    {
        needBuyEquipment()
        console.log("随机到购买装备");
    }
    else
    {
        FireRandomEvent()
    }
    PutOnSale();

    console.log("副本模式下综合提升");

    if (config.game.combatPower < 24000 && config.game.tradingTimes == 1)
    {
        UpgradeHolyRelics();
    }

    AddAttributePoint();
    if (GetRandom() > 60)
    {
        UnSealEngraving();
    }

    console.log("副本：综合提升结束");

    return true;
};

module.exports = {
    ChangeAbility, GetEmail, GetAchievement, GetMonsterKnowledgeAward, LoginProps, DailyQuest, GetCommonAward,
    ShopBuy, ComprehensiveImprovement, ComprehensiveImprovement_Instance, StrengthenHorseEquipment, IncreaseWeaponFeatures, GuildDonation,
    FireRandomEvent,
};

