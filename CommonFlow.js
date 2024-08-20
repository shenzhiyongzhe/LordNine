
const { WearEquipment, StrengthenEquipment, OpenAllBox, UseHolyGrail } = require("./Backpack.js");
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, OpenMenu, CloseMenu,
    PageBack,
    WaitUntilPageBack,
    SwipeSlowly,
    FindBlueBtn, FindTipPoint, FindCheckMark, FindRedBtn, FindGoldBtn,
    HasPopupClose,
    PressBlank, WaitUntil,
} = require("./utils.js");

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
    const LoginBtnColorList = [
        ["#283735", [[18, -1, "#283735"], [113, 0, "#283735"], [0, 16, "#283735"], [128, 15, "#283735"]]]
    ];
    const NoMoreLoginItemColorList = [
        ["#1f1e1e", [[2, 0, "#1f1e1e"], [4, 0, "#1e1e1e"], [6, 0, "#1e1e1e"], [8, 0, "#1e1e1e"], [0, 2, "#1f1f1e"],
        [2, 2, "#1f1e1e"], [4, 2, "#1f1e1e"], [6, 2, "#1e1e1e"], [8, 2, "#1e1e1e"], [8, 4, "#1e1e1e"], [6, 4, "#1f1e1e"],
        [4, 4, "#1f1e1e"], [2, 4, "#1f1f1e"], [0, 4, "#201f1e"], [0, 6, "#21201e"], [2, 6, "#201f1e"], [4, 6, "#1f1f1e"], [6, 6, "#1f1e1e"], [8, 6, "#1f1e1e"]]]
    ];
    const IsNoMoreLoginItem = () => FindMultiColors(NoMoreLoginItemColorList, [102, 88, 8, 6]);
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

    const NotCheckedColorList = [
        ["#303030", [[5, 0, "#303030"], [11, 1, "#303030"], [-2, 7, "#303030"], [7, 7, "#303030"]]]
    ];
    const IsNotCheck = (region) => FindMultiColors(NotCheckedColorList, region);

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



const CrucifixColorList = [
    ["#bcaa51", [[19, 0, "#bba950"], [10, -10, "#eed967"], [9, 18, "#bca952"], [9, 0, "#1a1d1a"]]],
    ["#f0dc69", [[-11, 11, "#baa850"], [8, 11, "#b8a64f"], [-1, 28, "#bdab53"], [0, 28, "#bdab53"]]]
];

const HasCrucifixIcon = () => FindMultiColors(CrucifixColorList, [327, 60, 40, 43]);

const PickUpAbilityPoint = () =>
{
    console.log("pick up ability point");
    RandomPress([337, 73, 21, 23]);
    if (WaitUntil(() => HasPopupClose([38, 102, 36, 38])))
    {
        if (FindBlueBtn([142, 602, 214, 70]))
        {
            RandomPress([167, 619, 162, 37]);
            if (HasPopupClose([38, 102, 36, 38]))
            {
                RandomPress([44, 108, 24, 25]);
            }
        }
    }
};

const IncreaseWeaponAbility = () =>
{
    console.log("increase weapon skill ability");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("open menu faild");
        return false;
    }
    RandomPress([911, 117, 32, 33]);
    const hasEnter = WaitUntilPageBack();
    if (!hasEnter)
    {
        console.log("enter weapon ability page faild");
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
    for (let i = 0; i < 3; i++)
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
};

const AddAttributePoint = () =>
{
    console.log("start add attribute point");
    const ZeroPointColorList = [
        ["#5d5b54", [[-3, 2, "#a19d91"], [-3, 4, "#c7c2b5"], [-3, 6, "#c6c1b3"], [-3, 9, "#c7c2b5"], [0, 12, "#646158"], [3, 11, "#bfbbae"], [4, 9, "#c7c2b5"], [3, 8, "#aca89b"], [3, 6, "#aba69b"], [4, 4, "#c7c2b5"]]]
    ];
    RandomPress([62, 27, 234, 24]);
    WaitUntil(() => HasPopupClose([37, 107, 33, 33]));

    RandomPress([283, 360, 16, 19]); // plus btn
    RandomPress([522, 171, 98, 22]); // dex 
    for (let i = 0; i < 10; i++)
    {
        let isZero = FindMultiColors(ZeroPointColorList, [589, 264, 17, 23]);
        if (!isZero)
        {
            RandomPress([686, 350, 20, 18]);
        }
        else
        {
            break;
        }
    }
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
    console.log("Start Strengthen horse equipment");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("open menu failed");
        return false;
    }
    RandomPress([1088, 116, 29, 28]);
    if (!WaitUntilPageBack())
    {
        console.log("enter horse page failed");
        return false;
    }
    if (FindGoldBtn([869, 653, 171, 63]))
    {
        RandomPress([888, 669, 135, 31]);
        WaitUntil(() => FindBlueBtn([870, 654, 353, 62]));
    }

    for (let i = 0; i < 3; i++)
    {
        RandomPress([899, 666, 301, 36]);
        if (FindBlueBtn([650, 439, 211, 73]))
        {
            RandomPress([680, 459, 154, 33]);
        }
        Sleep(3);
    }
    RandomPress([1089, 209, 31, 32]);
    for (let i = 0; i < 3; i++)
    {
        RandomPress([899, 666, 301, 36]);
        if (FindBlueBtn([650, 439, 211, 73]))
        {
            RandomPress([680, 459, 154, 33]);
        }
        Sleep(3);
    }
    RandomPress([976, 209, 32, 35]);
    for (let i = 0; i < 3; i++)
    {
        RandomPress([899, 666, 301, 36]);
        if (FindBlueBtn([650, 439, 211, 73]))
        {
            RandomPress([680, 459, 154, 33]);
        }
        Sleep(3);
    }
    PageBack();
};

// ComprehensiveImprovement();
// AddAttributePoint();
// IncreaseWeaponAbility();
// console.log(FindRedBtn([992, 641, 212, 58]));
const GetPassAward = () =>
{
    console.log("start to get pass award");
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
    const CanPickUpAwardHighGoldenColorList = [
        ["#cdb646", [[2, 0, "#d0ba47"], [3, 0, "#d1ba47"], [5, 0, "#cfb946"], [8, 0, "#c6af43"]]],
        ["#c4af47", [[1, 0, "#cbb54a"], [3, 0, "#d6be4a"], [8, 0, "#e0c74f"], [11, 0, "#dcc34e"]]],
        ["#b5a03f", [[3, 0, "#bfab43"], [5, 0, "#c3af45"], [7, 0, "#c3ae44"], [12, 0, "#b4a03e"]]]
    ];
    console.log("start get daily award");
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
    Sleep();
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
                }
            }
        }
    }
    // special award
    RandomPress([121, 353, 180, 29]);
    if (FindCheckMark([1077, 477, 39, 40]))
    {
        console.log("special already get");
    }
    else
    {
        for (let i = 0; i < 2; i++)
        {
            for (let j = 0; j < 7; j++)
            {
                if (FindCheckMark([367 + j * 116, 354 + i * 117, 57, 57]))
                {
                    continue;
                }
                else
                {
                    RandomPress([382 + j * 116, 371 + i * 117, 29, 21]);
                    PressBlank();
                }
                if (HasPopupClose([748, 100, 41, 36]))
                {
                    RandomPress([760, 110, 19, 22]);
                }
            }
        }
    }
    //````````````````````````
    const hasPopupClose = HasPopupClose([746, 98, 46, 47]);
    if (hasPopupClose)
    {
        RandomPress([hasPopupClose.x, hasPopupClose.y, 15, 15]);
    }
    if (HasPopupClose([1139, 62, 45, 42]))
    {
        RandomPress([1153, 74, 17, 17]);
    }
};

const ComprehensiveImprovement = () =>
{
    console.log("start comprehensive improvement");
    HasCrucifixIcon() && PickUpAbilityPoint();
    GetPassAward();
    GetActivitiesAward();
    GetMonsterKnowledgeAward();
    GetEmail();
    GetAchievement();
    // first open all box
    OpenAllBox();
    UseHolyGrail();
    // next wear equipment
    WearEquipment();
    // strengthen equipment
    StrengthenEquipment();
    IncreaseWeaponAbility();

    ShopBuy();
};



module.exports = { GetEmail, GetAchievement, GetMonsterKnowledgeAward, LoginProps, HasCrucifixIcon, ShopBuy, PickUpAbilityPoint, AddAttributePoint, ComprehensiveImprovement, StrengthenHorseEquipment };
// ComprehensiveImprovement();
// console.log(HasPopupClose([690, 80, 162, 111]));
// GetMonsterKnowledgeAward();
// console.log(FindTipPoint([1150, 405, 27, 32]));
// console.log(HasPopupClose([748, 101, 39, 35]));
// console.log(FindCheckMark([839, 359, 52, 53]));
