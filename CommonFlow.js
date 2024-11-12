
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu, EnterMenuItemPage, CloseBackpack, ClearPage,
    HasMenu, HasPageback, IsBackpackFull, HasTip,
    WaitUntilPageBack,
    SwipeSlowly,
    FindBlueBtn, FindTipPoint, FindCheckMark, FindRedBtn, FindGoldBtn, FindGreenBtn, FindNumber, FindImgInList, FindFloatNumber,
    HasPopupClose,
    PressBlank, WaitUntil,
    TapBlankToContinue, PullDownSkill, ReadConfig, RewriteConfig, PageBack,

    OpenBackpack,
    LoadImgList,


    RecycleImgList,
    IsHaltMode,
    ExitHaltMode,
    HasSkip,
    ClickSkip,
    GetDateTime,
    ReadDealRecord, ReadAccountFile,
    UpdateDealRecord,
    IsInCity,
    ReturnHome,
    GoToTheNPC,
    HasMenuClose,
    GetServerName,
    GetCharacterLv,

} = require("./utils.js");

const { IsEmpty, WearEquipments, StrengthenEquipment, OpenAllBox, UseHolyGrail, DecomposeEquipment, WearBestSuit, CheckSkillAutoRelease } = require("./Backpack.js");

let lastComprehensiveImproveTime = 1726208812345;
let character_lv = 0;
const GetEmail = () =>
{
    console.log("开始领取邮件");
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
    console.log("已进入邮件页面，点击全部领取");
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

    console.log("邮件领取完毕");
    return true;
};

const GetAchievement = () =>
{
    console.log("开始领取成就奖励");
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
    console.log("已经进入领取成就奖励页面");
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
    console.log("领取成就奖励完毕");
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
    console.log("领取怪物图鉴奖励完毕");

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
        console.log("enter failed");
        return false;
    }
    Sleep(3);
    let hasAvaluableItem;
    for (let i = 0; i < 10; i++)
    {
        let hasTipPoint = FindTipPoint([286, 113, 35, 403]);
        if (hasTipPoint)
        {
            RandomPress([hasTipPoint.x - 150, hasTipPoint.y, 150, 20]);
            let pageShot = captureScreen();
            for (let i = 0; i < 7; i++)
            {
                hasAvaluableItem = FindTipPoint([425 + i * 116, 265, 45, 260], pageShot);
                if (hasAvaluableItem)
                {
                    console.log("发现可领取物品，点击领取");
                    RandomPress([hasAvaluableItem.x - 50, hasAvaluableItem.y, 50, 50], 3);
                    PressBlank();
                    hadPickAward = true;
                    if (HasPopupClose([746, 97, 44, 48]))
                    {
                        RandomPress([848, 287, 269, 293]);
                    }
                    break;
                }
            }
            let hasBar = FindTipPoint([727, 315, 35, 282]);
            if (hasBar)
            {
                RandomPress([hasBar.x - 100, hasBar.y + 10, 100, 30]);
                PressBlank();
            }
            let hasBar_2 = FindTipPoint([1151, 319, 30, 274]);
            if (hasBar_2)
            {
                RandomPress([hasBar_2.x - 100, hasBar_2.y + 10, 100, 20]);
                PressBlank();
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
    console.log("开始道具记录");
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

    if (type == "partial")
    {
        SetLoginSetting();
    }

    out: for (let i = 0; i < 20; i++)
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
    //buy strengthening stone 
    console.log("开始商城购买");
    let hadDailyShop = false;
    const hasOpenMenu = HasMenu();
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
    console.log("已进入商城页面");
    Sleep(3);
    const NotCheckedColorList = [
        ["#303030", [[5, 0, "#303030"], [11, 1, "#303030"], [-2, 7, "#303030"], [7, 7, "#303030"]]]
    ];
    const IsNotCheck = (region) => FindMultiColors(NotCheckedColorList, region);

    if (FindBlueBtn([44, 641, 192, 69]))
    {
        RandomPress([87, 658, 119, 31], 3);
        for (let i = 0; i < 20; i++)
        {
            if (FindBlueBtn([540, 445, 201, 63]))
            {
                console.log("发现服务器异常弹窗，稍后再试");
                RandomPress([568, 457, 150, 35]);
            }
            if (FindBlueBtn([651, 556, 242, 81]))
            {
                break;
            }
            Sleep();
        }
        for (let i = 0; i < 5; i++)
        {
            if (IsNotCheck([234, 144 + i * 85, 56, 62]))
            {
                RandomPress([250, 162 + i * 85, 21, 22]);
            }
        }
        if (FindBlueBtn([652, 556, 238, 78])) // comfirm button
        {
            RandomPress([679, 574, 191, 41], 3);
            PressBlank();
            hadDailyShop = true;
        }
        else if (FindRedBtn([383, 560, 240, 65]))
        {
            RandomPress([414, 574, 184, 33]); //cancel button
        }
    }

    for (let i = 0; i < 5; i++)
    {
        if (FindBlueBtn([540, 445, 201, 63]))
        {
            console.log("发现服务器异常弹窗，稍后再试");
            RandomPress([568, 457, 150, 35]);
        }
        PageBack();
        if (HasMenu())
        {
            break;
        }
        Sleep();
    }
    console.log("商城购买完毕，是否成功购买: " + hadDailyShop);
    if (hadDailyShop)
    {
        const config = ReadConfig();
        config.game.dailyShop = true;
        RewriteConfig(config);
    }
    return hadDailyShop;
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
        RandomPress(position, 0.5);
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
    RandomPress([20, 83, 34, 38]);
    PurchaseItem([156, 177, 150, 38]);//实验室传送卷轴
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
    config.game.friendshipShop = true;
    RewriteConfig(config);
    console.log("友好度商人购买结束");
};

const IncreaseWeaponFeatures = () =>
{
    console.log("开始增加武器特性");
    console.log("顺便获取当前玩家等级。");
    const hasEntered = EnterMenuItemPage("weaponFeatures");
    if (!hasEntered)
    {
        console.log("enter weapon features page failed!");
        return false;
    }
    const ActivatedColorList = [
        ["#2c9892", [[-5, 4, "#2f9e99"], [-21, 20, "#25817e"], [-39, 41, "#268481"], [-54, 53, "#268783"]]],
        ["#2e9b94", [[-13, 13, "#288b88"], [-24, 24, "#268682"], [-42, 41, "#298e89"], [-58, 58, "#1d6c66"]]],
        ["#24807b", [[-1, 12, "#24807c"], [-1, 23, "#227974"], [0, 32, "#2b928f"], [0, 46, "#298d89"]]]
    ];
    const IsActivated = (region) => FindMultiColors(ActivatedColorList, region);

    const RecogPos = [
        [[536, 177, 96, 131], [426, 287, 110, 131], [409, 402, 46, 101]],
        [[536, 186, 98, 108], [444, 292, 84, 99], [417, 405, 34, 95]],
        [[550, 201, 81, 89], [516, 302, 41, 92], [519, 411, 37, 81]]
    ];
    const PressPos = [
        [[527, 285, 21, 21], [421, 387, 24, 22], [422, 493, 22, 21]],
        [[526, 284, 19, 21], [421, 387, 24, 24], [421, 492, 24, 22]],
        [[525, 282, 21, 22], [525, 388, 24, 21], [526, 493, 21, 20]]
    ];
    const lv = FindNumber("lv", [46, 468, 61, 51]);
    console.log("武器特性，当前玩家等级为：" + lv);
    const config = ReadConfig();
    config.game.lv = lv;
    character_lv = lv;
    RewriteConfig(config);
    out: for (let i = 0; i < 3; i++)
    {
        RandomPress([197, 300 + i * 82, 146, 46]);

        for (let j = 0; j < 3; j++)
        {

            if (!IsActivated(RecogPos[i][j]))
            {
                console.log("not activated!");
                if (j == 0)
                {
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
                        continue out;
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
            console.log(i + " " + j);
        }

    }
    PageBack();
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
    for (let i = 0; i < 10; i++)
    {
        //is up to lv20
        if (FindBlueBtn([1105, 641, 163, 64]))
        {
            RandomPress([1126, 657, 119, 32]);
            if (FindBlueBtn([657, 442, 195, 70]))
            {
                RandomPress([679, 458, 154, 36]);
                Sleep(5);
            }
        }
        else
        {
            break;
        }
    }
    RandomPress([38, 187, 257, 80]);
    let secondUnlocked = false;
    if (!IsUnlocked())
    {
        if (FindBlueBtn([946, 641, 317, 66]))
        {
            RandomPress([972, 657, 268, 32]);
            if (FindBlueBtn([655, 443, 201, 70]))
            {
                RandomPress([674, 460, 162, 32]);
                Sleep(3);
                if (IsUnlocked())
                {
                    secondUnlocked = true;
                }
            }
        }
    }
    else
    {
        secondUnlocked = true;
    }

    if (secondUnlocked)
    {
        Sleep();
        for (let i = 0; i < 10; i++)
        {
            //is up to lv20
            if (FindBlueBtn([1105, 641, 163, 64]))
            {
                RandomPress([1126, 657, 119, 32]);
                if (FindBlueBtn([657, 442, 195, 70]))
                {
                    RandomPress([679, 458, 154, 36]);
                    Sleep(5);
                }
            }
            else
            {
                break;
            }
        }
    }
    RandomPress([66, 306, 216, 60]);
    let thirdUnlocked = false;
    if (!IsUnlocked())
    {
        if (FindBlueBtn([946, 641, 317, 66]))
        {
            RandomPress([972, 657, 268, 32]);
            if (FindBlueBtn([655, 443, 201, 70]))
            {
                RandomPress([674, 460, 162, 32]);
                Sleep(3);
                if (IsUnlocked())
                {
                    secondUnlocked = true;
                }
            }
        }
    }
    else
    {
        thirdUnlocked = true;
    }

    if (thirdUnlocked)
    {
        Sleep();
        for (let i = 0; i < 10; i++)
        {
            //is up to lv20
            if (FindBlueBtn([1105, 641, 163, 64]))
            {
                RandomPress([1126, 657, 119, 32]);
                if (FindBlueBtn([657, 442, 195, 70]))
                {
                    RandomPress([679, 458, 154, 36]);
                    Sleep(5);
                }
            }
            else
            {
                break;
            }
        }
    }
    PageBack();
};
const AddAttributePoint = () =>
{
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
    const lockImgList = LoadImgList("icon/lock");
    let hadUnlocked = FindImgInList(lockImgList, [402, 72, 86, 52]);
    if (!hadUnlocked)
    {
        console.log("交易所已解开");
        alert("成号", "交易所已解开");
        engines.stopAllAndToast();
    }
    else
    {
        console.log("交易所未解开");
        PageBack();
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
                    config.game.guildDonation = true;
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

    let haveDonated = false;
    const config = ReadConfig();
    if (!config.game.friendshipDonation)
    {
        console.log("今日未捐献");
        if (!EnterMenuItemPage('friendlinessLevel'))
        {
            console.log("进入友好度失败");
            return false;
        }
        else
        {
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

            if (FindImgInList(stage_1, [117, 485, 44, 52]))
            {
                console.log("友好度一级完成，捐献第二个友好度商人");
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
        }

        if (haveDonated)
        {
            config.game.friendshipDonation = true;
            console.log("友好度捐献完成");
            RewriteConfig(config);
        }
    }
    else
    {
        console.log("今日已捐献友好证书");
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
const GetCurrentDiamond = () =>
{
    if (!OpenBackpack("gold"))
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
    console.log("开始结算");
    const beforeSettleDiamond = GetCurrentDiamond();
    console.log("结算前钻石数量：" + beforeSettleDiamond);
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
                for (let i = 0; i < 8; i++)
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
    let afterSettleDiamond = beforeSettleDiamond;
    if (hadSettled)
    {
        afterSettleDiamond = GetCurrentDiamond();
    }
    console.log("结算后钻石：" + afterSettleDiamond);

    if (!beforeSettleDiamond)
    {
        beforeSettleDiamond = 0;
    }
    if (!afterSettleDiamond)
    {
        afterSettleDiamond = 0;
    }

    let settlement = afterSettleDiamond - beforeSettleDiamond;

    settlement = settlement > 0 ? settlement : 0;
    console.log("此次结算钻石为：" + settlement);

    //查看总钻石并保存数据至脚本
    const dealRecord = ReadDealRecord();
    const config = ReadConfig();

    dealRecord.deal.push([GetDateTime(), settlement]);

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const currentMonthData = dealRecord.deal.filter(dailyIncome =>
    {
        let time = dailyIncome[0].split("_");
        if (year == time[0] && month == time[1])
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    let monthlyIncome = 0;
    currentMonthData.map(item => monthlyIncome += item[1]);

    if (!config.game.vm)
    {
        const account = ReadAccountFile();
        config.game.vm = account[3];
    }
    config.game.vm = config.game.vm.replace(/\n/g, '');

    if (!config.game.serverName)
    {
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

    if (!monthlyIncome)
    {
        monthlyIncome = "null";
    }
    const postData = {
        vm: config.game.vm,
        serverName: config.game.serverName,
        lv: config.game.lv,
        combatPower: config.game.combatPower,
        diamond: afterSettleDiamond,
        monthlyIncome: monthlyIncome,
        historyDealRecord: JSON.stringify(dealRecord)
    };
    console.log("postData: " + JSON.stringify(postData));
    RewriteConfig(config);

    UpdateDealRecord(dealRecord);

    try
    {
        console.log("发送数据给后台");
        const res = http.post("http://47.76.112.107:8001/devices", postData);
        console.log(res);
    } catch (error)
    {
        console.log(error);
    }
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
    const sellText = LoadImgList("icon/font/trade/sell");
    const shelfMaxImgList = LoadImgList("icon/font/trade/shelfMax");

    let isShelfMax = false;
    Sleep();
    //网格的横纵间隔均为66像素 格子大小为57x57

    const calculateNumber = [
        [590, 511, 30, 27],//0
        [518, 346, 28, 26],//1
        [592, 345, 27, 27],//2
        [661, 341, 35, 32],//3
        [518, 397, 30, 29],//4
        [589, 399, 34, 28],//5
        [666, 397, 29, 32],//6
        [666, 397, 29, 32],//7
        [592, 453, 30, 30],//8
        [665, 454, 29, 28]//9
    ];
    const splitToDigit = num => (num + "").split('').map(Number);
    const CloseSellPopup = () => 
    {
        if (HasPopupClose([956, 186, 50, 57]))
        {
            RandomPress([970, 203, 21, 22]);
        }
    };
    const MeetTheListingRequirement = (type) =>
    {
        let currentLowestLoginPrice = 0;
        let maxItemNumber = 1;
        let totalSellPrice = 0;

        currentLowestLoginPrice = FindFloatNumber("sellPrice", [538, 366, 78, 36]);

        console.log("当前最低价格：" + currentLowestLoginPrice);
        if (currentLowestLoginPrice == null || currentLowestLoginPrice == 0)
        {
            if (type == "material")
            {
                console.log("未识别到价格，材料不上架");
                return false;
            }
            else if (type == "weapon")
            {
                console.log("未识别到价格，装备默认上架");
                return true;
            }
        }
        if (type == "material")
        {
            RandomPress([874, 301, 93, 18]); //数量输入框
            if (FindBlueBtn([643, 550, 162, 57]))
            {
                RandomPress([733, 517, 37, 12]); //max
                RandomPress([665, 562, 122, 33]); //confirm
                maxItemNumber = FindFloatNumber("sellPrice", [906, 291, 86, 35]);
                console.log("材料数量为：" + maxItemNumber);
            }
        }
        totalSellPrice = Math.floor(currentLowestLoginPrice * maxItemNumber);

        if (totalSellPrice < 10)
        {
            console.log("低于10钻石，不上架");
            return false;
        }
        else if (totalSellPrice > 1000)
        {
            console.log("上架价格异常，暂不上架");
            return false;
        }

        else if (totalSellPrice >= 10)
        {
            if (type == "weapon" && FindFloatNumber("sellPrice", [892, 333, 73, 39]) == totalSellPrice)
            {
                console.log("不需要设置价格，默认上架");
            }
            else
            {
                console.log("手动设置总价：" + totalSellPrice);
                let totalPriceNumberArr = splitToDigit(totalSellPrice);
                RandomPress([851, 265, 127, 13]); //设置总价
                if (FindBlueBtn([645, 548, 161, 62]))
                {
                    for (let i = 0; i < totalPriceNumberArr.length; i++)
                    {
                        RandomPress(calculateNumber[totalPriceNumberArr[i]]);
                    }
                    RandomPress([642, 550, 165, 58]); //confirm total price
                }
            }
            return true;
        }
    };
    const ConfirmToLogin = () =>
    {
        if (FindBlueBtn([551, 465, 182, 62]))
        {
            console.log("确定登录价格");
            RandomPress([575, 482, 131, 25]);
            WaitUntil(() => FindBlueBtn([549, 522, 185, 66]));
            if (FindBlueBtn([549, 522, 185, 66]))
            {
                RandomPress([570, 539, 144, 31], 1);
                console.log("确定登录");
                for (let i = 0; i < 6; i++)
                {
                    if (FindImgInList(shelfMaxImgList, [536, 96, 188, 55]))
                    {
                        console.log("上架数量已满");
                        isShelfMax = true;
                        return false;
                    }
                    sleep(500);
                }
                console.log("上架物品成功！");
                return true;
            }
        }
        return false;
    };
    const LoginItem = (itemPos, type) =>
    {
        console.log("上架物品: " + itemPos + " type: " + type);

        let hasSellText = false;
        let loginSuccess = false;
        for (let i = 0; i < 10; i++)
        {
            if (IsEmpty([itemPos[0] - 10, itemPos[1] - 10, 57, 57]))
            {
                break;
            }
            RandomPress(itemPos);
            hasSellText = FindImgInList(sellText, [930, 584, 80, 61]);
            if (hasSellText)
            {
                break;
            }
            CloseSellPopup();
            if (FindRedBtn([477, 548, 160, 59]))
            {
                console.log("关闭价格键盘");
                RandomPress([494, 561, 123, 33]);
            }
            Sleep(1);
        }
        if (hasSellText)
        {
            RandomPress([915, 599, 115, 28]); //贩售按钮
            WaitUntil(() => FindBlueBtn([549, 467, 182, 57]));
            let isMeetRequirement = MeetTheListingRequirement(type);
            if (isMeetRequirement)
            {
                loginSuccess = ConfirmToLogin();

            }
        }
        CloseSellPopup();
        return loginSuccess;
    };
    const IteratingLoginIteem = (type) =>
    {
        let loginItemSuccessfully = false;

        out: for (let i = 0; i < 7; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                for (let n = 0; n < 24; n++)
                {
                    loginItemSuccessfully = LoginItem([1016 + j * 66, 175 + i * 66, 38, 36], type);
                    if (isShelfMax == true)
                    {
                        console.log("上架数量已满，退出上架");
                        return true;
                    }
                    if (IsEmpty([1006 + j * 66, 164 + i * 66, 57, 57]))
                    {
                        console.log("遍历完毕，退出上架");
                        return true;
                    }
                    if (loginItemSuccessfully)
                    {
                        console.log("上架成功，继续上架");
                        loginItemSuccessfully = LoginItem([1016 + j * 66, 175 + i * 66, 38, 36], type);
                    }
                    if (!loginItemSuccessfully)
                    {
                        console.log("下一格");
                        break;
                    }
                }

            }
        }
        return loginItemSuccessfully;
    };
    //先上架材料
    RandomPress([1192, 121, 55, 27]);
    let loginRes = IteratingLoginIteem("material");

    //然后上架武器
    if (!isShelfMax)
    {
        RandomPress([1106, 120, 51, 28]);
        loginRes = IteratingLoginIteem("weapon");
    }

    PageBack();
    return loginRes;
};
const PutOnSale = () =>
{
    console.log("开始进行物品上架");
    GetSettlement();//结算过期上架物品
    LoginProps();
    DecomposeEquipment("partial");
    TradeGoods();
    LoginProps("total");
    DecomposeEquipment("total");
    console.log("__物品上架结束");
};

const GetCommonAward = () =>
{
    GetEmail();
    GetPassAward();
    GetActivitiesAward();
    GetMonsterKnowledgeAward();
    GetTravelLogAward();
    GetAchievement();
};
const DailyQuest = () =>
{
    GetCommonAward();
    const config = ReadConfig();
    const today = new Date().getDate();
    if (config.game.today != today)
    {

        GuildDonation();
        FriendshipDonation();
        ShopBuy();
        FriendShipShop();
    }
    else if (config.game.today == today)
    {
        if (!config.game.guildDonation)
        {
            GuildDonation();
        }
        if (!config.game.friendshipDonation)
        {
            FriendshipDonation();
        }
        if (!config.game.dailyShop)
        {
            ShopBuy();
        }
        if (!config.game.friendshipShop)
        {
            FriendShipShop();
        }
    }

};
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
        DecomposeEquipment("total");
    }

    GetPassAward();
    GetActivitiesAward();
    GetMonsterKnowledgeAward();
    GetTravelLogAward();
    GetAchievement();
    GetEmail();
    // first open all box
    OpenAllBox();

    if (!isBackpackFull)
    {
        console.log("backpack is not full");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment("total");
    }
    ClearPage();
    IncreaseWeaponFeatures();
    UpgradeHolyRelics();
    StrengthenHorseEquipment();

    if (character_lv <= 40 || character_lv == null)
    {
        console.log(`角色等级为${character_lv}，改变符文配置`);
        ChangeAbility();
    }

    UpgradeAbilityLevel();

    let isExcuted = ShopBuy();

    WearBestSuit();
    CheckSkillAutoRelease();
    AddAttributePoint();
    console.log("综合提升结束");
    IsExchangeUnLock();
    GuildDonation();
    lastComprehensiveImproveTime = new Date().getTime();

    return isExcuted;
};
const ComprehensiveImprovement_Instance = () =>
{
    if (IsHaltMode())
    {
        ExitHaltMode();
    }
    const isBackpackFull = IsBackpackFull(captureScreen());
    if (isBackpackFull)
    {
        console.log("副本提升：背包是满的，需要先清理背包");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }
    PutOnSale();
    console.log("副本模式下综合提升");

    // first open all box
    OpenAllBox();
    if (!isBackpackFull && new Date().getHours() > 14)
    {
        console.log("背包不是满的，领取奖励后开始整理背包");
        WearEquipments();
        StrengthenEquipment();

    }
    ClearPage();
    //降低执行频率
    if (new Date().getDay() % 3 == 0)
    {
        IncreaseWeaponFeatures();
        UpgradeHolyRelics();
        StrengthenHorseEquipment();
    }

    WearBestSuit();
    AddAttributePoint();

    console.log("副本：综合提升结束");

    return true;
};



module.exports = {
    ChangeAbility, GetEmail, GetAchievement, GetMonsterKnowledgeAward, LoginProps, DailyQuest,
    ShopBuy, ComprehensiveImprovement, ComprehensiveImprovement_Instance, StrengthenHorseEquipment, IncreaseWeaponFeatures, GuildDonation,
};

// GetSettlement();
// DecomposeEquipment();
// GetCommonAward();
// GetEmail();
// PutOnSale()
// console.log(GetCharacterLv());
