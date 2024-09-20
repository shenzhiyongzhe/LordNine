
const { WearEquipments, StrengthenEquipment, OpenAllBox, UseHolyGrail, DecomposeEquipment, WearBestSuit } = require("./Backpack.js");
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu, EnterMenuItemPage, CloseBackpack,
    PageBack,
    WaitUntilPageBack,
    SwipeSlowly,
    FindBlueBtn, FindTipPoint, FindCheckMark, FindRedBtn, FindGoldBtn,
    HasPopupClose,
    PressBlank, WaitUntil,
    HasMenu,
    HasPageback, IsBackpackFull,
    TapBlankToContinue,
    PullDownSkill, FindNumber, ReadConfig, RewriteConfig,

} = require("./utils.js");

let lastComprehensiveImproveTime = 1726208812345;
let character_lv = 0;
const GetEmail = () =>
{
    console.log("开始领取邮件");
    const hasOpenMenu = OpenMenu();
    const hasEmailPoint = FindTipPoint([1054, 520, 25, 27]);
    if (!hasOpenMenu)
    {
        console.log("没有发现菜单按钮，退出");
        return false;
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
    console.log("邮件领取完毕");
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
    console.log("领取成就奖励完毕");
    PageBack();
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
    if (FindBlueBtn([131, 651, 115, 63]))
    {
        RandomPress([161, 670, 61, 27]);
        Sleep();
        PressBlank();
        Sleep();
    }
    PageBack();
    console.log("领取怪物图鉴奖励完毕");

};

const LoginProps = () =>
{
    console.log("开始道具记录");
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
    const LoginBtnColorList = [
        ["#283735", [[18, -1, "#283735"], [113, 0, "#283735"], [0, 16, "#283735"], [128, 15, "#283735"]]]
    ];

    const CanPressLoginBtn = () => FindMultiColors(LoginBtnColorList, [1088, 506, 170, 50]);

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
        RandomPress([176, 76, 74, 24]);
        for (let j = 0; j < 10; j++)
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
        }
        RandomPress([43, 75, 80, 23]);
        if (!FindTipPoint([511, 122, 421, 494]))
        {
            break;
        }
    }
    PageBack();
    console.log("道具记录完毕，记录数量为: " + loginCount);
};

const ShopBuy = () =>
{
    //buy strengthening stone 
    console.log("开始商城购买");
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
    console.log("entered shop page");
    Sleep(3);
    const NotCheckedColorList = [
        ["#303030", [[5, 0, "#303030"], [11, 1, "#303030"], [-2, 7, "#303030"], [7, 7, "#303030"]]]
    ];
    const IsNotCheck = (region) => FindMultiColors(NotCheckedColorList, region);

    let isSuccess = false;
    if (FindBlueBtn([146, 632, 89, 79]))
    {
        RandomPress([166, 657, 45, 34]);

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
    console.log("商城购买完毕，是否成功购买 " + isSuccess);
};


const CrucifixColorList = [
    ["#bcaa51", [[19, 0, "#bba950"], [10, -10, "#eed967"], [9, 18, "#bca952"], [9, 0, "#1a1d1a"]]],
    ["#f0dc69", [[-11, 11, "#baa850"], [8, 11, "#b8a64f"], [-1, 28, "#bdab53"], [0, 28, "#bdab53"]]]
];

const HasCrucifixIcon = () => FindMultiColors(CrucifixColorList, [327, 60, 40, 43]);

const PickUpAbilityPoint = () =>
{
    console.log("开始恢属性力点");
    RandomPress([337, 73, 21, 23]);
    if (WaitUntil(() => HasPopupClose([34, 94, 46, 53])))
    {
        if (FindBlueBtn([142, 602, 214, 70]))
        {
            RandomPress([167, 619, 162, 37]);
            if (HasPopupClose([38, 102, 36, 38]))
            {
                RandomPress([44, 108, 24, 25]);
            }
            console.log("finish pick up ability point");

        }
        else
        {
            console.log("use out of recover time");
            RandomPress([365, 263, 16, 17]);
            RandomPress([123, 547, 98, 43]);
            if (FindBlueBtn([138, 604, 216, 66]))
            {
                RandomPress([170, 622, 157, 30]);
            }
            console.log("finish pick up ability point");
        }
    }
    if (HasPopupClose([34, 94, 46, 53]))
    {
        console.log("finish");
        RandomPress([47, 109, 20, 21]);
    }
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
    console.log("当前玩家等级为：" + lv);
    const config = ReadConfig();
    config.game.lv = lv;
    character_lv = lv;
    RewriteConfig("game", config.game);
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
const AddAttributePoint = () =>
{
    console.log("开始添加属性点");

    const PlusAbilityIcon = [
        ["#8f7f4f", [[14, 0, "#ab995f"], [6, -7, "#b19d62"], [7, 0, "#af9c62"], [7, 6, "#b7a366"]]],
        ["#86774a", [[3, 0, "#90804f"], [15, 0, "#b4a165"], [9, -6, "#e8cf84"], [8, 6, "#928251"]]],
        ["#86774a", [[7, 0, "#978754"], [14, 0, "#b09d62"], [9, -6, "#e8cf84"], [9, 5, "#b4a165"]]],
        ["#8e7e4e", [[6, 0, "#837448"], [13, 0, "#b7a366"], [7, -7, "#f0d789"], [7, 6, "#b6a266"]]]
    ];
    if (!FindMultiColors(PlusAbilityIcon, [615, 461, 57, 58]))
    {
        console.log("未找到加属性图标");
        return false;
    }
    RandomPress([632, 479, 19, 20]);
    console.log("等到属性点窗口出现...");
    WaitUntil(() => HasPopupClose([32, 96, 47, 54]));

    RandomPress([522, 171, 98, 22]); // dex 
    RandomPress([695, 349, 25, 21]); //max dex
    if (FindGoldBtn([580, 657, 167, 29]))
    {
        RandomPress([587, 659, 161, 28]);
    }
    if (HasPopupClose([37, 107, 33, 33]))
    {
        RandomPress([45, 112, 21, 21]);
    }

};
const StrengthenHorseEquipment = () =>
{
    console.log("开始强化坐骑装备");
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
            RandomPress([919, 672, 272, 28]);
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
        RandomPress(horseEquipmentRegion[i]);
        Sleep();
        if (FindBlueBtn([869, 652, 354, 64]))
        {
            console.log("可以强化此装备：" + i);
            RandomPress([926, 671, 249, 26]);
            if (FindBlueBtn([655, 445, 199, 63]))
            {
                console.log("启用坐骑装备");
                RandomPress([683, 462, 150, 28]);
                Sleep(3);
            }
            Sleep(4);
        }
    }
    console.log("finish horse equipment");
    PageBack();
};

const GetPassAward = () =>
{
    console.log("开始领取通行证奖励");
    if (!FindTipPoint([882, 2, 19, 20]))
    {
        console.log("no award could get");
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
        RandomPress([770, 265, 158, 31]);
        Sleep();
        PressBlank();
        PageBack();
    }
    console.log("finished pass award");
};
const GetActivitiesAward = () =>
{
    console.log("开始领取活动奖励");
    const CanPickUpAwardHighGoldenColorList = [
        ["#cdb646", [[2, 0, "#d0ba47"], [3, 0, "#d1ba47"], [5, 0, "#cfb946"], [8, 0, "#c6af43"]]],
        ["#c4af47", [[1, 0, "#cbb54a"], [3, 0, "#d6be4a"], [8, 0, "#e0c74f"], [11, 0, "#dcc34e"]]],
        ["#b5a03f", [[3, 0, "#bfab43"], [5, 0, "#c3af45"], [7, 0, "#c3ae44"], [12, 0, "#b4a03e"]]]
    ];
    if (!FindTipPoint([942, 3, 17, 19]))
    {
        console.log("no award could get");
        return false;
    }
    RandomPress([917, 18, 27, 28]);
    if (!WaitUntil(() => HasPopupClose([1145, 63, 36, 36])))
    {
        console.log("enter failed");
        return false;
    }
    Sleep(5);
    const shot = captureScreen();
    let hasTip = false;
    let hasGoldenLight = false;
    for (let i = 0; i < 9; i++)
    {
        hasTip = FindTipPoint([284, 157 + 47 * i, 27, 20], shot);
        if (hasTip)
        {
            RandomPress([hasTip.x - 180, hasTip.y, 180, 30]);
            Sleep();
            for (let j = 0; j < 3; j++)
            {
                hasTip = FindTipPoint([345, 265, 820, 378]);
                if (hasTip)
                {
                    console.log("hasTip: " + hasTip);
                    hasGoldenLight = FindMultiColors(CanPickUpAwardHighGoldenColorList, [hasTip.x - 70, hasTip.y + 50, 70, 30]);
                    console.log("hasGoldenLight: " + hasGoldenLight);
                    if (hasGoldenLight)
                    {
                        console.log("pick award...");
                        RandomPress([hasGoldenLight.x - 10, hasGoldenLight.y - 30, 20, 30]);
                        PressBlank();
                    }
                    else
                    {
                        RandomPress([hasTip.x - 40, hasTip.y + 10, 20, 30]);
                        PressBlank();
                    }
                    if (HasPopupClose([745, 97, 46, 47]))
                    {
                        RandomPress([760, 108, 19, 20]);
                    }
                }
            }
        }
    }

    for (let i = 0; i < 30; i++)
    {
        if (HasPopupClose([745, 97, 46, 47]))
        {
            RandomPress([760, 108, 19, 20]);
        }
        else if (HasPopupClose([1143, 55, 42, 51]))
        {
            RandomPress([1157, 74, 14, 18]);
        }
        else if (HasMenu())
        {
            break;
        }
        Sleep();
    }
    console.log("finish: get activities award");
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
    // WaitUntil(() => FindBlueBtn([552, 451, 204, 72]));
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
                RandomPress([hasItemTipPoint.x - 40, hasItemTipPoint.y, 40, 40]);
                Sleep(3);
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
    WaitUntil(() => HasPageback());
    PageBack();
    return true;
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
    if (HasPopupClose([1184, 55, 42, 39]))
    {

        RandomPress([1198, 65, 15, 19]);
    }
    PageBack();
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
            RandomPress([39, 662, 96, 27]);
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


const ComprehensiveImprovement = () =>
{
    console.log("开始综合提升");

    let isImprovement = false;

    if ((lastComprehensiveImproveTime - new Date().getTime()) / 3600000 >= 1)
    {
        console.log("finish: 两次提升间隔较短，暂不操作");
        return true;
    }
    lastComprehensiveImproveTime = new Date().getTime();

    HasCrucifixIcon() && PickUpAbilityPoint();

    const isBackpackFull = IsBackpackFull(captureScreen());
    if (isBackpackFull)
    {
        console.log("背包是满的，需要先清理背包");
        WearEquipments();
        StrengthenEquipment();
        LoginProps();
        DecomposeEquipment();
    }

    GetPassAward();
    GetActivitiesAward();
    GetMonsterKnowledgeAward();
    GetEmail();
    GetAchievement();
    GetTravelLogAward();
    // first open all box
    OpenAllBox();

    UseHolyGrail();

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

    if (character_lv <= 40 || character_lv == null)
    {
        console.log(`角色等级为${character_lv}，改变符文配置`);
        ChangeAbility();
    }

    UpgradeAbilityLevel();
    let isExcuted = ShopBuy();
    AddAttributePoint();

    WearBestSuit();
    console.log("finish");


    return isExcuted;
};


module.exports = {
    ChangeAbility, GetEmail, GetAchievement, GetMonsterKnowledgeAward, LoginProps, HasCrucifixIcon,
    ShopBuy, PickUpAbilityPoint, AddAttributePoint, ComprehensiveImprovement, StrengthenHorseEquipment
};
// WearEquipments();

// GetActivitiesAward();
// ComprehensiveImprovement();
// OpenAllBox();
// GetActivitiesAward();
// StrengthenHorseEquipment();
// WearEquipments();
// StrengthenEquipment();
// LoginProps();
// WearBestSuit();
// DecomposeEquipment();
// AddAttributePoint();
// console.log(FindTipPoint([416, 370, 42, 45]));
// GetEmail();
